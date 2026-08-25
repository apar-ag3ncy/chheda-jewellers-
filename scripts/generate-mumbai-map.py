#!/usr/bin/env python3
"""
Regenerate public/media/map/mumbai-network.svg from OpenStreetMap.

The Branches section hangs a map poster of Greater Mumbai. This builds it:
fetches the road and rail network from Overpass, projects it into the same
coordinate space as src/lib/mumbai-geo.ts, simplifies it, and writes one
static SVG. Nothing here runs at build time - run it by hand when the map
needs refreshing, and commit the result.

    python3 scripts/generate-mumbai-map.py

Output is roughly 450 KB raw / 185 KB gzipped. It is deliberately a separate
file rather than inline markup: that much path data has no business in the
homepage's HTML, and as an asset it is cached and lazily fetched.

Map data (c) OpenStreetMap contributors, ODbL. The credit rendered in
Branches.tsx is required - do not remove it.
"""
import json, math, os, sys, urllib.parse, urllib.request

OVERPASS = "https://overpass-api.de/api/interpreter"
OUT = "public/media/map/mumbai-network.svg"

# Must match src/lib/mumbai-geo.ts exactly, or the pins drift off their streets.
W, H = 420.0, 776.0
WEST, EAST, SOUTH, NORTH, KX = 72.76401, 72.99375, 18.88016, 19.28148, 0.945058
BBOX = f"{SOUTH},{WEST},{NORTH},{EAST}"
SCALE = 3  # emit integer coords at 3x, so ~19 m of precision survives rounding

# layer            overpass filter                                        tol  min-span
LAYERS = [
    ("texture",  '["highway"~"^(residential|unclassified|living_street)$"]', 1.20, 0.9),
    ("fabric",   '["highway"~"^(secondary|tertiary)$"]',                     0.35, 0.8),
    ("rail",     '["railway"="rail"]["service"!~"."]',                       0.18, 0.5),
    ("arterial", '["highway"~"^(motorway|trunk|primary)$"]',                 0.16, 0.4),
]

BEIGE, OFFWHITE, GOLD_LIGHT, GOLD = "#e8ddc7", "#f7f3ec", "#f0cfaa", "#c68d61"
# Stroke weights are tuned for the plate's real display width (~430-610 px),
# not for print. Thinner and the residential texture drops below one device
# pixel and the land reads as empty green.
STYLE = {"texture": (1.9, 0.40), "fabric": (2.7, 0.55), "arterial": 4.0, "rail": 2.6}


def project(lat, lng):
    dw, dh = (EAST - WEST) * KX, NORTH - SOUTH
    return (((lng - WEST) * KX / dw) * W, ((NORTH - lat) / dh) * H)


def simplify(pts, tol):
    """Douglas-Peucker, iterative - some coastal ways are deep enough to blow
    a recursive implementation's stack."""
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        if b <= a + 1:
            continue
        ax, ay = pts[a]
        bx, by = pts[b]
        dx, dy = bx - ax, by - ay
        den = dx * dx + dy * dy
        best, bi = -1.0, -1
        for i in range(a + 1, b):
            px, py = pts[i]
            if den == 0:
                d = math.hypot(px - ax, py - ay)
            else:
                t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / den))
                d = math.hypot(px - (ax + t * dx), py - (ay + t * dy))
            if d > best:
                best, bi = d, i
        if best > tol:
            keep[bi] = True
            stack += [(a, bi), (bi, b)]
    return [p for p, k in zip(pts, keep) if k]


def fetch(filt):
    q = f"[out:json][timeout:400];(way{filt}({BBOX}););out geom;"
    req = urllib.request.Request(
        OVERPASS,
        data=urllib.parse.urlencode({"data": q}).encode(),
        headers={"User-Agent": "chheda-jewellers-map/1.0"},
    )
    with urllib.request.urlopen(req, timeout=420) as r:
        return json.loads(r.read())


def layer(name, filt, tol, min_span):
    data = fetch(filt)
    parts, ways = [], 0
    for e in data.get("elements", []):
        g = e.get("geometry")
        if not g or e.get("type") != "way":
            continue
        pts = [project(n["lat"], n["lon"]) for n in g if n]
        pts = [p for p in pts if -20 <= p[0] <= W + 20 and -20 <= p[1] <= H + 20]
        if len(pts) < 2:
            continue
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        if max(xs) - min(xs) < min_span and max(ys) - min(ys) < min_span:
            continue
        ip, last = [], None
        for x, y in simplify(pts, tol):
            q = (round(x * SCALE), round(y * SCALE))
            if q != last:
                ip.append(q)
                last = q
        if len(ip) < 2:
            continue
        # Absolute moveto per subpath, relative linetos inside it. A lowercase
        # 'm' here would make every way relative to the previous way's end.
        px, py = ip[0]
        deltas = []
        for x, y in ip[1:]:
            deltas.append(f"{x - px},{y - py}")
            px, py = x, y
        parts.append(f"M{ip[0][0]},{ip[0][1]}l" + " ".join(deltas))
        ways += 1
    d = "".join(parts)
    print(f"  {name:<9} {ways:>6} ways  {len(d) // 1024:>4} KB")
    return d


def main():
    built = {n: layer(n, f, t, s) for n, f, t, s in LAYERS}
    vw, vh = int(W * SCALE), int(H * SCALE)
    tw, to = STYLE["texture"]
    fw, fo = STYLE["fabric"]
    aw, rw = STYLE["arterial"], STYLE["rail"]
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw} {vh}" role="img"'
        f' aria-label="Street map of Greater Mumbai">'
        f"<title>Greater Mumbai - road and rail network</title>"
        f"<desc>Map data (c) OpenStreetMap contributors, ODbL.</desc>"
        f'<defs><radialGradient id="g" cx="46%" cy="33%" r="80%">'
        f'<stop offset="0%" stop-color="#17573f"/>'
        f'<stop offset="42%" stop-color="#0d4030"/>'
        f'<stop offset="100%" stop-color="#04170f"/></radialGradient></defs>'
        f'<rect width="{vw}" height="{vh}" fill="url(#g)"/>'
        f'<g fill="none" stroke-linecap="round" stroke-linejoin="round">'
        f'<path d="{built["texture"]}" stroke="{BEIGE}" stroke-width="{tw}" opacity="{to}"/>'
        f'<path d="{built["fabric"]}" stroke="{BEIGE}" stroke-width="{fw}" opacity="{fo}"/>'
        # three passes on the arterials: a wide dim halo, a mid body, a hot core
        f'<path d="{built["arterial"]}" stroke="{GOLD}" stroke-width="{aw * 5.6:.1f}" opacity="0.12"/>'
        f'<path d="{built["arterial"]}" stroke="{GOLD}" stroke-width="{aw * 2.2:.1f}" opacity="0.26"/>'
        f'<path d="{built["arterial"]}" stroke="{GOLD_LIGHT}" stroke-width="{aw}" opacity="0.95"/>'
        f'<path d="{built["rail"]}" stroke="{OFFWHITE}" stroke-width="{rw}" opacity="0.7"/>'
        f"</g></svg>"
    )
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        f.write(svg)
    print(f"\n  wrote {OUT} - {os.path.getsize(OUT) // 1024} KB")


if __name__ == "__main__":
    sys.exit(main())

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
CACHE = ".cache/osm"          # gitignored; delete a file to force a refetch
OUT = "public/media/map/mumbai-network.svg"
OUT_HOT = "public/media/map/mumbai-network-hot.svg"
OUT_TRACE = "src/lib/mumbai-arterials.ts"

# The RENDER frame. Must match src/lib/mumbai-geo.ts exactly, or the pins
# drift off their streets.
#
# Centred on the midpoint of the two shops (19.09270 N, 72.88005 E) so they
# sit dead centre of the plate, then widened symmetrically to 16:10. Because
# the shops are only ~10 km from the west coast, centring them in a landscape
# frame necessarily puts open sea on the left - about a third of the width.
# That is real geography, and the Arabian Sea reads as deliberate negative
# space against the density on the right.
W, H = 1242.0, 776.0
WEST, EAST, SOUTH, NORTH, KX = 72.56044, 73.19966, 18.90392, 19.28148, 0.945058

# The FETCH window is deliberately larger and independent of the frame: it is
# the Overpass query and the cache key, so re-framing the map costs nothing.
# Everything outside the render frame is clipped at projection time, and the
# sea west of 72.70 has no ways to lose.
F_SOUTH, F_WEST, F_NORTH, F_EAST = 18.88016, 72.70, 19.28148, 73.38
BBOX = f"{F_SOUTH},{F_WEST},{F_NORTH},{F_EAST}"
SCALE = 3  # emit integer coords at 3x, so ~19 m of precision survives rounding

# layer            overpass filter                                        tol  min-span
LAYERS = [
    # Tolerance and min-span are set for the landscape frame: the wider bbox
    # tripled the residential network, and at full-city display scale the
    # extra vertices are invisible - they only cost wire weight.
    ("texture",  '["highway"~"^(residential|unclassified|living_street)$"]', 1.9, 1.6),
    ("fabric",   '["highway"~"^(secondary|tertiary)$"]',                     0.35, 0.8),
    ("rail",     '["railway"="rail"]["service"!~"."]',                       0.18, 0.5),
    ("arterial", '["highway"~"^(motorway|trunk|primary)$"]',                 0.16, 0.4),
]

BEIGE, OFFWHITE, GOLD_LIGHT, GOLD = "#e8ddc7", "#f7f3ec", "#f0cfaa", "#c68d61"
GOLD_HOT = "#ffeacb"   # the lit arterial under the cursor torch
TRACE_COUNT = 16       # longest arterials inlined for the animated trace
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


def fetch(name, filt):
    """Overpass, cached on disk. These four queries take minutes and the data
    changes on the scale of months, so a re-run should not hit the API."""
    os.makedirs(CACHE, exist_ok=True)
    # The bbox is part of the key: widening the frame must invalidate the
    # portrait-era responses, or the new map silently loses the new east.
    path = os.path.join(CACHE, f"{name}-{BBOX.replace(',', '_')}.json")
    if os.path.exists(path):
        with open(path) as f:
            return json.load(f)
    q = f"[out:json][timeout:400];(way{filt}({BBOX}););out geom;"
    req = urllib.request.Request(
        OVERPASS,
        data=urllib.parse.urlencode({"data": q}).encode(),
        headers={"User-Agent": "chheda-jewellers-map/1.0"},
    )
    with urllib.request.urlopen(req, timeout=420) as r:
        data = json.loads(r.read())
    with open(path, "w") as f:
        json.dump(data, f)
    return data


def layer(name, filt, tol, min_span, collect=None):
    data = fetch(name, filt)
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
        path = f"M{ip[0][0]},{ip[0][1]}l" + " ".join(deltas)
        parts.append(path)
        if collect is not None:
            collect.append(ip)
        ways += 1
    d = "".join(parts)
    print(f"  {name:<9} {ways:>6} ways  {len(d) // 1024:>4} KB")
    return d



def polyline_length(pts):
    return sum(math.hypot(b[0] - a[0], b[1] - a[1]) for a, b in zip(pts, pts[1:]))


def encode(pts):
    """Absolute moveto, relative linetos - same encoding as the layers."""
    px, py = pts[0]
    out = []
    for x, y in pts[1:]:
        out.append(f"{x - px},{y - py}")
        px, py = x, y
    return f"M{pts[0][0]},{pts[0][1]}l" + " ".join(out)


def chain(ways, snap=3):
    """Stitch OSM ways into continuous routes.

    OSM splits a highway wherever a tag changes, so the Western Express arrives
    as dozens of fragments a few hundred units long. Animating those gives
    sixteen unrelated flickers; animating the stitched route gives light
    running the length of the city, which is the entire point of the layer.

    Greedy: take the longest unused fragment, then keep extending both ends
    with any unused fragment whose endpoint lands in the same snap bucket.
    """
    def key(pt):
        return (round(pt[0] / snap), round(pt[1] / snap))

    ends = {}
    for i, w in enumerate(ways):
        for pt in (w[0], w[-1]):
            ends.setdefault(key(pt), []).append(i)

    used = [False] * len(ways)
    routes = []
    for start in sorted(range(len(ways)), key=lambda i: -polyline_length(ways[i])):
        if used[start]:
            continue
        used[start] = True
        route = list(ways[start])
        # extend forward, then backward off the same loop by reversing
        for _ in range(2):
            while True:
                nxt = None
                for cand in ends.get(key(route[-1]), []):
                    if used[cand]:
                        continue
                    w = ways[cand]
                    if key(w[0]) == key(route[-1]):
                        nxt = (cand, w[1:])
                    elif key(w[-1]) == key(route[-1]):
                        nxt = (cand, w[-2::-1])
                    if nxt:
                        break
                if not nxt:
                    break
                used[nxt[0]] = True
                route.extend(nxt[1])
            route.reverse()
        routes.append(route)
    routes.sort(key=polyline_length, reverse=True)
    return routes


def main():
    arterial_ways = []
    built = {}
    for n, f, t, sp in LAYERS:
        built[n] = layer(n, f, t, sp, collect=arterial_ways if n == "arterial" else None)
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
        f'<stop offset="100%" stop-color="#06241b"/></radialGradient></defs>'
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
    def render(hot: bool) -> str:
        """hot=True is the layer revealed under the cursor torch: same geometry,
        the arterials lit and the fabric raised, so moving the pointer over the
        plate lights the roads instead of just brightening a picture."""
        a_glow, a_mid, a_hot = (0.30, 0.55, 1.0) if hot else (0.12, 0.26, 0.95)
        a_col = GOLD_HOT if hot else GOLD_LIGHT
        t_op = to * (2.0 if hot else 1.0)
        f_op = fo * (1.7 if hot else 1.0)
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw} {vh}" role="img"'
            f' aria-label="Street map of Greater Mumbai">'
            f"<title>Greater Mumbai - road and rail network</title>"
            f"<desc>Map data (c) OpenStreetMap contributors, ODbL.</desc>"
            + (
                ""
                if hot
                else f'<defs><radialGradient id="g" cx="46%" cy="33%" r="80%">'
                f'<stop offset="0%" stop-color="#17573f"/>'
                f'<stop offset="42%" stop-color="#0d4030"/>'
                f'<stop offset="100%" stop-color="#06241b"/></radialGradient></defs>'
                f'<rect width="{vw}" height="{vh}" fill="url(#g)"/>'
            )
            + f'<g fill="none" stroke-linecap="round" stroke-linejoin="round">'
            # The hot layer is roads only. It stacks ON the base under a cursor
            # mask, so repeating the 320 KB of texture and fabric would double
            # the payload to relight strokes the base already draws.
            + (
                ""
                if hot
                else f'<path d="{built["texture"]}" stroke="{BEIGE}" stroke-width="{tw}" opacity="{t_op:.2f}"/>'
                f'<path d="{built["fabric"]}" stroke="{BEIGE}" stroke-width="{fw}" opacity="{f_op:.2f}"/>'
                # A dark offset copy under the arterials: the roads sit ON the
                # city rather than in it, which is most of what reads as relief.
                f'<path d="{built["arterial"]}" stroke="#04170f" stroke-width="{aw * 1.5:.1f}"'
                f' opacity="0.55" transform="translate(0,{aw * 0.5:.1f})"/>'
            )
            + f'<path d="{built["arterial"]}" stroke="{GOLD}" stroke-width="{aw * 5.6:.1f}" opacity="{a_glow}"/>'
            f'<path d="{built["arterial"]}" stroke="{GOLD}" stroke-width="{aw * 2.2:.1f}" opacity="{a_mid}"/>'
            f'<path d="{built["arterial"]}" stroke="{a_col}" stroke-width="{aw}" opacity="{a_hot}"/>'
            f'<path d="{built["rail"]}" stroke="{OFFWHITE}" stroke-width="{rw}" opacity="{0.9 if hot else 0.7}"/>'
            f"</g></svg>"
        )

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    for path, hot in ((OUT, False), (OUT_HOT, True)):
        with open(path, "w") as f:
            f.write(render(hot))
        print(f"  wrote {path} - {os.path.getsize(path) // 1024} KB")

    # ---- the trace overlay -------------------------------------------------
    # The longest arterials only. These get inlined into the page and animated,
    # so the budget is a few KB, not the 40 KB the whole arterial layer costs.
    routes = chain(arterial_ways)
    traces = [encode(r) for r in routes[:TRACE_COUNT]]
    print(f"  stitched {len(arterial_ways)} ways into {len(routes)} routes")
    print(f"  trace lengths: {[int(polyline_length(r)) for r in routes[:TRACE_COUNT]]}")
    body = ",\n".join(f'  "{t}"' for t in traces)
    with open(OUT_TRACE, "w") as f:
        f.write(
            "/**\n"
            " * The city's longest arterial roads, in the same coordinate space as\n"
            " * public/media/map/mumbai-network.svg.\n"
            " *\n"
            " * These are inlined into the Branches poster and animated, so the map\n"
            " * reads as a living network rather than a picture of one. Only the\n"
            f" * longest {TRACE_COUNT} ways are here - the full arterial layer is ten times\n"
            " * the bytes and none of the extra detail survives at display size.\n"
            " *\n"
            " * GENERATED by scripts/generate-mumbai-map.py - do not hand-edit.\n"
            " * Map data (c) OpenStreetMap contributors, ODbL.\n"
            " */\n\n"
            f"export const MAP_TRACE_VIEW = {{ w: {vw}, h: {vh} }} as const;\n\n"
            f"export const MAP_TRACES: readonly string[] = [\n{body},\n];\n"
        )
    print(f"  wrote {OUT_TRACE} - {os.path.getsize(OUT_TRACE) // 1024} KB, {len(traces)} traces")


if __name__ == "__main__":
    sys.exit(main())

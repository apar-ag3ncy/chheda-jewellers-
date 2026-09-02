import numpy as np

def label_runs(mask):
    """Connected components (8-connectivity) via run-length encoding + union-find.
    Fast enough in pure numpy/python because there are far fewer runs than pixels."""
    h, w = mask.shape
    runs = []                      # (row, start, end_exclusive)
    row_runs = []
    for y in range(h):
        r = mask[y]
        if not r.any():
            row_runs.append((len(runs), len(runs))); continue
        d = np.diff(r.astype(np.int8))
        starts = list(np.flatnonzero(d == 1) + 1)
        ends = list(np.flatnonzero(d == -1) + 1)
        if r[0]: starts.insert(0, 0)
        if r[-1]: ends.append(w)
        a = len(runs)
        for s, e in zip(starts, ends): runs.append((y, s, e))
        row_runs.append((a, len(runs)))

    parent = list(range(len(runs)))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]; x = parent[x]
        return x
    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb: parent[max(ra, rb)] = min(ra, rb)

    for y in range(1, h):
        a0, a1 = row_runs[y - 1]; b0, b1 = row_runs[y]
        i, j = a0, b0
        while i < a1 and j < b1:
            _, s1, e1 = runs[i]; _, s2, e2 = runs[j]
            if s1 < e2 and s2 < e1: union(i, j)      # overlap (8-conn via -1/+1 below)
            if e1 <= e2: i += 1
            else: j += 1
        # diagonal touches
        i, j = a0, b0
        while i < a1 and j < b1:
            _, s1, e1 = runs[i]; _, s2, e2 = runs[j]
            if s1 - 1 < e2 and s2 - 1 < e1: union(i, j)
            if e1 <= e2: i += 1
            else: j += 1

    lab = np.zeros((h, w), np.int32)
    for idx, (y, s, e) in enumerate(runs):
        lab[y, s:e] = find(idx) + 1
    return lab

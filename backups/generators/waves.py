"""Split the bloom cluster <svg> into layers so phones can bloom it as a few GPU waves instead of ~300 in-SVG transitions.
   leaves + buds (bottom) -> wave 3 (arm tips) -> wave 2 -> wave 1 (corner, on top); every other leaf gets .fl-leaf--extra
   (hidden on phones). Desktop still runs the per-petal transitions inside each layer, so it looks the same there.
Usage: python3 waves.py <index.html> <indent>   (indent of the <svg> lines inside the figure, S = space)"""
import re, sys, math
p = sys.argv[1]; ind = sys.argv[2].replace('S', ' ')
h = open(p).read()
OPEN = '<svg class="ink-art__deco ink-art__flower" viewBox="0 0 640 480" aria-hidden="true">'
i = h.index(OPEN); j = h.index('</svg>', h.index('</defs>', i))
body = h[i + len(OPEN):j]
defs_end = body.index('</defs>') + len('</defs>')
defs, rest = body[:defs_end], body[defs_end:]

def top_level_groups(s):
    out, depth, start = [], 0, None
    for m in re.finditer(r'<g\b[^>]*?(/?)>|</g>', s):
        if m.group(0) == '</g>':
            depth -= 1
            if depth == 0: out.append(s[start:m.end()])
        elif not m.group(1):
            if depth == 0: start = m.start()
            depth += 1
    assert ''.join(out) == s, 'unexpected content between groups'
    return out

C = (630, 458)
def corner_dist(x, y): return abs(y - C[1]) if abs(x - C[0]) < abs(y - C[1]) else abs(x - C[0])
leaves, w1, w2, w3 = [], [], [], []
n_leaf = 0
for g in top_level_groups(rest):
    if 'class="fl-leaf' in g:
        if n_leaf % 2: g = g.replace('class="fl-leaf', 'class="fl-leaf--extra fl-leaf', 1)
        n_leaf += 1; leaves.append(g)
    elif 'class="fl-bud"' in g: leaves.append(g)
    else:
        x, y = map(float, re.match(r'<g transform="translate\(([\d.]+) ([\d.]+)\)', g).groups())
        d = corner_dist(x, y)
        (w1 if d < 45 else w2 if d < 100 else w3).append(g)
lay = lambda mod, inner: f'<svg class="ink-art__deco ink-art__flower fl-layer fl-layer--{mod}" viewBox="0 0 640 480" aria-hidden="true">{inner}</svg>'
new = (lay('leaves', defs + ''.join(leaves)) + '\n' + ind + lay('w3', ''.join(w3)) + '\n' + ind +
       lay('w2', ''.join(w2)) + '\n' + ind + lay('w1', ''.join(w1)))
h = h[:i] + new + h[j + len('</svg>'):]
open(p, 'w').write(h)
print(f'leaves {n_leaf} (extra {n_leaf // 2}), buds {len(leaves) - n_leaf}, waves {len(w1)}/{len(w2)}/{len(w3)}')

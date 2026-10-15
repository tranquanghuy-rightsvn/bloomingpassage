"""Split the painting's animated parts into their own <svg> layers so their idle sway can be a CSS rotate on the
whole layer (GPU compositor) instead of a transform inside the SVG (full repaint every frame).
  bamboo  -> .ink-art__branch (stem + joints + leaves; painted first) + the stalks layer
  flowers -> cluster (static) + .ink-art__flower--small + .ink-art__flower--main (on top)
Usage: python3 layers.py <index.html> <figure-closing-indent>"""
import re, sys
p = sys.argv[1]; ind = sys.argv[2].replace('S', ' ')
h = open(p).read()
# ---- bamboo
m = re.search(r'<svg class="ink-art__deco ink-art__bamboo" viewBox="0 0 640 480" aria-hidden="true">(<svg [^>]*>)<defs>(<clipPath id="bb-grow">.*?</clipPath>)(<clipPath id="bb-rise">.*?</clipPath>)</defs><g transform="translate\(0 366\)">(<g transform="translate\(589\.2 -555\.8\) scale\(1\.800\)">.*?)(<g transform="translate\(-302\.6 4\.4\) scale\(3\.4\)">.*?</g></g>)</g></svg></svg>', h, re.S)
assert m, 'bamboo'
inner, grow, rise, branch, stalks = m.groups()
assert branch.count('class="bb-branch"') == 1 and stalks.count('bb-stalks') == 1
new_b = (f'<svg class="ink-art__deco ink-art__bamboo ink-art__branch" viewBox="0 0 640 480" aria-hidden="true">{inner}<defs>{grow}</defs><g transform="translate(0 366)">{branch}</g></svg></svg>'
         f'<svg class="ink-art__deco ink-art__bamboo" viewBox="0 0 640 480" aria-hidden="true">{inner}<defs>{rise}</defs><g transform="translate(0 366)">{stalks}</g></svg></svg>')
h = h[:m.start()] + new_b + h[m.end():]
# ---- flowers: undo an earlier combined "--top" layer if present, then split main / small
h = re.sub(r'</svg>\s*<svg class="ink-art__deco ink-art__flower ink-art__flower--top" viewBox="0 0 640 480" aria-hidden="true">', '', h)
m = re.search(r'(<svg class="ink-art__deco ink-art__flower" viewBox="0 0 640 480" aria-hidden="true">.*?)(<g transform="translate\(642 370\) scale\(0\.55\)">.*?)(<g transform="translate\(606 426\) scale\(1\)">.*)</svg>', h, re.S)
assert m, 'flowers'
cluster, small, main = m.groups()
open_tag = lambda mod: f'<svg class="ink-art__deco ink-art__flower ink-art__flower--{mod}" viewBox="0 0 640 480" aria-hidden="true">'
new_f = cluster + '</svg>\n' + ind + open_tag('small') + small + '</svg>\n' + ind + open_tag('main') + main + '</svg>'
h = h[:m.start()] + new_f + h[m.end():]
open(p, 'w').write(h)
print('layers ok')

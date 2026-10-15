"""Bloom cluster for the home 'about' photo: flowers of many sizes crowding into a mirrored L (⅃) in the
bottom-right corner. The horizontal arm runs left along the bottom edge; the vertical arm climbs the
right edge and is 1/3 as tall as the arm is long. The original large flower keeps its exact place and
markup and is painted last (on top). Everything else uses <use> of shared petal/heart symbols to keep the HTML small."""
import math, random, sys

R = random.Random(int(sys.argv[2]) if len(sys.argv) > 2 else 7)
def f(v): return f'{v:.1f}'.rstrip('0').rstrip('.')

PETAL = 'M0 0C-13-6-21-24-15-35C-10-43 3-45 10-38C19-28 14-8 0 0Z'
VEIN = 'M0-3C-1-14-1-24 1-34'
def stamens():
    out = ''
    for i in range(9):
        a = (i * 40 + 10) * math.pi / 180; r = 8 + (i % 3) * 1.6
        x, y = f(math.cos(a) * r), f(math.sin(a) * r)
        out += f'<path d="M0 0L{x} {y}"/><circle cx="{x}" cy="{y}" r="1.3"/>'
    return out

DEFS = ('<defs>'
        f'<g id="flp"><path d="{PETAL}" fill="#fff" stroke="#d8c3a5" stroke-width="1.1" stroke-linejoin="round"/><path d="{VEIN}" fill="none" stroke="#eadbc6" stroke-linecap="round"/></g>'
        f'<g id="flp2"><path d="{PETAL}" fill="#fbf4e8" stroke="#d3bb98" stroke-width="1.2" stroke-linejoin="round"/><path d="{VEIN}" fill="none" stroke="#e6d3b9" stroke-linecap="round"/></g>'
        f'<g id="flh"><circle r="5.5" fill="#e8892b"/><g fill="#f2a23a" stroke="#e07b22" stroke-width="1.1" stroke-linecap="round">{stamens()}</g></g>'
        f'<g id="flh2"><circle r="5" fill="#ef9a3c"/><g fill="#f6b555" stroke="#e58a2f" stroke-width="1.1" stroke-linecap="round">{stamens()}</g></g>'
        '</defs>')

# ---- the L ----
C = (630, 458)            # outer corner (bottom-right)
LEN = 140                 # horizontal arm length (to x = 490): a little longer than the height, so it isn't too symmetrical
HGT = 100                 # vertical arm height (to y = 358)
MAIN = (606, 426, 1.0)    # existing large flower (x, y, scale)
SMALL = (642, 370, 0.55)  # existing small flower, now crowning the vertical arm

def along(t):
    """t in [0,1] over the whole L: 0 = top of the vertical arm, HGT/(HGT+LEN) = corner, 1 = left end."""
    total = HGT + LEN; s = t * total
    if s <= HGT: return (C[0], C[1] - HGT + s), s, 'v'
    return (C[0] - (s - HGT), C[1]), s, 'h'

def corner_dist(p):  # distance travelled along the L from the corner
    return abs(p[1] - C[1]) if abs(p[0] - C[0]) < abs(p[1] - C[1]) else abs(p[0] - C[0])

flowers = []  # (x, y, scale, rot, back?, distance from corner)
placed = [(MAIN[0], MAIN[1], 43 * MAIN[2]), (SMALL[0], SMALL[1], 43 * SMALL[2])]
def try_add(x, y, scale, back=None, slack=0.55):
    r = 43 * scale
    if any(math.hypot(x - px, y - py) < slack * (r + pr) for px, py, pr in placed): return False
    if x + r * 0.55 > 672 or y + r * 0.45 > 494: return False
    placed.append((x, y, r))
    flowers.append((x, y, scale, R.uniform(0, 72), R.random() < 0.45 if back is None else back, corner_dist((x, y))))
    return True
# focal blooms: a rhythm of medium flowers along both arms, shrinking towards the tips
for x, y, sc in [(560, 446, .6), (534, 460, .38), (500, 455, .26), (646, 402, .5), (622, 380, .36), (664, 446, .5), (582, 470, .42)]:
    try_add(x + R.uniform(-4, 4), y + R.uniform(-3, 3), sc * R.uniform(.92, 1.08), back=False, slack=0.5)
# then crowd the gaps with smaller blooms
tries = 0
while len(flowers) < 40 and tries < 40000:
    tries += 1
    (x, y), s, arm = along(R.random())
    d = corner_dist((x, y))
    k = min(1, d / (LEN * 1.5 if arm == 'h' else HGT * 1.5))
    band = 36 - 24 * k
    off = (R.random() * 2 - 1) * band
    if arm == 'h': y += off * 0.85 - 6
    else: x += off * 0.8 - 4
    u = (C[0] - x) / LEN if arm == 'h' else 0           # 0 at the corner, 1 at the tip of the horizontal arm
    if u > 0.5 and R.random() < (u - 0.5) * 1.6: continue  # thin the blooms out towards the tip
    try_add(x, y, (0.4 - 0.24 * k) * R.uniform(0.55, 1.1), slack=0.55 + 0.35 * max(0, u - 0.4))

# buds at the tips and a few in the gaps
buds = []
for (bx, by), rot in [((488, 454), -100), ((634, 352), -10), ((652, 362), 25), ((618, 360), -35), ((575, 438), -110), ((600, 474), -60)]:
    buds.append((bx + R.uniform(-4, 4), by + R.uniform(-3, 3), rot + R.uniform(-12, 12), R.uniform(0.75, 1.1)))

# leaves peeking out behind the cluster
leaves = []
for i in range(14):  # along the horizontal arm, alternating above / below the row
    x = C[0] - 30 - i * 9.5 + R.uniform(-4, 4)
    up = i % 2 == 0
    k = min(1, (C[0] - x) / (LEN * 1.5))
    y = C[1] - (24 - 14 * k) if up else C[1] + 12
    rot = R.uniform(-150, -110) if up and i % 4 == 0 else (R.uniform(-70, -30) if up else R.uniform(-100, -80) + (30 if i % 3 else -30))
    if not up and y + 10 > 492: rot = R.choice([-170, -10]) + R.uniform(-8, 8)
    leaves.append(((x, y), rot, R.uniform(24, 40) * (1 - .4 * k)))
for j in range(11):  # along the vertical arm, pointing out to the right / up
    y = C[1] - 24 - j * 9.5 + R.uniform(-4, 4)
    leaves.append(((C[0] + 18 + R.uniform(-4, 4), y), R.uniform(-30, 30) - (60 if j > 4 else 0), R.uniform(22, 34)))
leaves.append(((616, 352), -100, 30)); leaves.append(((640, 346), -60, 26))
for j in range(5):  # left side of the vertical arm, leaning out over the photo
    leaves.append(((C[0] - 34 + R.uniform(-4, 4), C[1] - 40 - j * 13), R.uniform(-170, -130), R.uniform(20, 30)))
for _ in range(17):  # tucked in between the blooms, so green peeks through the gaps
    (x, y), _s, arm = along(R.random())
    k = min(1, corner_dist((x, y)) / (LEN * 1.5))
    leaves.append(((x + R.uniform(-10, 10), y + R.uniform(-12, 8)), R.uniform(-180, 0), R.uniform(18, 30) * (1 - .35 * k)))

def leaf_path(L):
    w = L * 0.24
    return f'M0 0C{f(-w)} {f(-L*.25)} {f(-w*.8)} {f(-L*.7)} 0 {f(-L)}C{f(w*.8)} {f(-L*.7)} {f(w)} {f(-L*.25)} 0 0Z'

out = [f'<svg class="ink-art__deco ink-art__flower" viewBox="0 0 640 480" aria-hidden="true">{DEFS}']
total = HGT + LEN
for (lx, ly), rot, L in leaves:
    d = 3.3 + 0.7 * corner_dist((lx, ly)) / total
    out.append(f'<g transform="translate({f(lx)} {f(ly)}) rotate({f(rot + 90)})"><path class="fl-leaf{" fl-leaf--light" if R.random() < .4 else ""}" style="--d:{d:.2f}s" d="{leaf_path(L)}"/></g>')
# buds (with their green sepals) sit behind every flower too
for bx, by, rot, sc in buds:
    d = 3.6 + 1.3 * corner_dist((bx, by)) / total
    out.append(f'<g transform="translate({f(bx)} {f(by)}) rotate({f(rot + 90)}) scale({sc:.2f})"><g class="fl-bud" style="--d:{d:.2f}s"><path d="M0 0C-5-5-6-13 0-20C6-13 5-5 0 0Z" fill="#fff" stroke="#d8c3a5" stroke-width="1"/><path d="M0 0C-4-2-5-6-4-9C-1-6 1-6 4-9C5-6 4-2 0 0Z" fill="#6b8a3a"/></g></g>')
# back to front: small/far flowers first, bigger ones later, so the larger blooms overlap the smaller
for x, y, sc, rot, back, d in sorted(flowers, key=lambda q: q[2]):
    d0 = 3.5 + 1.25 * d / total + R.uniform(0, 0.15)
    sym = '#flp2' if back else '#flp'
    petals = ''.join(f'<g transform="rotate({f(rot + i * 72)})"><use class="fl-petal" href="{sym}" style="--d:{d0 + i * 0.07:.2f}s"/></g>' for i in range(5))
    sway = f' fl-head--sway" style="animation-delay:-{R.uniform(0, 7):.1f}s' if R.random() < 0.35 else ''
    out.append(f'<g transform="translate({f(x)} {f(y)}) scale({sc:.2f})"><g class="fl-head fl-head--bg{sway}">{petals}<g class="fl-heart" style="--d:{d0 + 0.45:.2f}s"><use href="{"#flh2" if back else "#flh"}"/></g></g></g>')
out.append('@@ORIGINAL@@</svg>')
print(''.join(out))
print(len(flowers), file=sys.stderr)

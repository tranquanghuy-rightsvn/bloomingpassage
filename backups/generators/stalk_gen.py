"""Redraws the two bamboo stalks (+ the little leaf sprigs at their nodes) as smooth vector shapes,
in the same 460x800 space as the old auto-traced path, so it drops into the existing transform/clip/animation."""
import math, sys

def f(v): return f'{v:.1f}'.rstrip('0').rstrip('.')

def bez(p0, p1, p2, p3, t):
    u = 1 - t
    return tuple(u**3*a + 3*u*u*t*b + 3*u*t*t*c + t**3*d for a, b, c, d in zip(p0, p1, p2, p3))

class Stalk:
    """Centreline = cubic Bézier, sampled densely so we can look x up by y."""
    def __init__(self, p0, p1, p2, p3, w_top, w_bot):
        self.pts = [bez(p0, p1, p2, p3, i / 400) for i in range(401)]
        self.y0, self.y1, self.wt, self.wb = p0[1], p3[1], w_top, w_bot
    def cx(self, y):
        for (xa, ya), (xb, yb) in zip(self.pts, self.pts[1:]):
            if ya <= y <= yb: return xa + (xb - xa) * (y - ya) / ((yb - ya) or 1)
        return self.pts[-1][0] if y > self.y1 else self.pts[0][0]
    def w(self, y): return self.wt + (self.wb - self.wt) * (y - self.y0) / (self.y1 - self.y0)

def smooth(points):
    """Catmull-Rom through points -> cubic Bézier segments (open curve), returns 'C ...' commands."""
    out = []
    P = [points[0]] + points + [points[-1]]
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        out.append(f'C{f(c1[0])} {f(c1[1])} {f(c2[0])} {f(c2[1])} {f(p2[0])} {f(p2[1])}')
    return ' '.join(out)

def segment(s, ya, yb, cut=None, r=2.6, flare=1.7):
    """One internode: straight-ish sides that swell slightly into the node at each end, softly rounded corners.
    cut = (dy_left, dy_right): slanted top for the first segment (left corner higher)."""
    n = max(6, int((yb - ya) / 8))
    def half(y):
        d = min(y - ya, yb - y)
        return s.w(y) / 2 + flare * math.exp(-d / 5)
    ys = [ya + r + (yb - ya - 2 * r) * i / n for i in range(n + 1)]
    left = [(s.cx(y) - half(y), y) for y in ys]
    right = [(s.cx(y) + half(y), y) for y in reversed(ys)]
    if cut:  # slanted cut: each side starts where the cut line meets it (drop points above it)
        dl, dr = cut
        left = [(s.cx(ya + dl) - half(ya + dl), ya + dl)] + [p for p in left if p[1] > ya + dl + 4]
        right = [p for p in right if p[1] > ya + dr + 4] + [(s.cx(ya + dr) + half(ya + dr), ya + dr)]
    lt, lb, rb, rt = left[0], left[-1], right[0], right[-1]
    d = f'M{f(lt[0])} {f(lt[1])} ' + smooth(left)
    # bottom: rounded corners with a very slightly convex end
    d += f' Q{f(lb[0])} {f(yb)} {f(lb[0] + r)} {f(yb)} L{f(rb[0] - r)} {f(yb)} Q{f(rb[0])} {f(yb)} {f(rb[0])} {f(rb[1])} '
    d += smooth(right)
    if cut:
        d += f' Q{f(rt[0] - 0.4)} {f(rt[1] - 2.2)} {f(rt[0] - 2.4)} {f(rt[1] - 2.2)} L{f(lt[0] + 2)} {f(lt[1] - 0.4)} Q{f(lt[0])} {f(lt[1])} {f(lt[0])} {f(lt[1] + 2)}Z'
    else:
        d += f' Q{f(rt[0])} {f(ya)} {f(rt[0] - r)} {f(ya)} L{f(lt[0] + r)} {f(ya)} Q{f(lt[0])} {f(ya)} {f(lt[0])} {f(lt[1])}Z'
    return d

def stalk_path(s, nodes, top_cut, gap=5.0):
    ys = [s.y0] + nodes + [s.y1]
    parts = []
    for i in range(len(ys) - 1):
        a = ys[i] + (gap / 2 if i else 0)
        b = ys[i + 1] - (gap / 2 if i < len(ys) - 2 else 0)
        parts.append(segment(s, a, b, cut=top_cut if i == 0 else None))
    return ' '.join(parts)

def leaf(base, tip, width, bend=0.12):
    """Bamboo leaf: widest about a third of the way out, long tapering point, gentle curve."""
    bx, by = base; tx, ty = tip
    dx, dy = tx - bx, ty - by; L = math.hypot(dx, dy)
    ux, uy = dx / L, dy / L; px, py = -uy, ux
    bc = bend * L  # sideways sag of the midrib
    def at(t, side):  # point at fraction t along, offset 'side' * width
        return (bx + ux * L * t + px * (side + bc * 4 * t * (1 - t)), by + uy * L * t + py * (side + bc * 4 * t * (1 - t)))
    a1 = at(0.07, width * 0.3); a2 = at(0.24, width * 0.62); a3 = at(0.7, width * 0.3)
    b1 = at(0.7, -width * 0.28); b2 = at(0.24, -width * 0.6); b3 = at(0.07, -width * 0.28)
    return (f'M{f(bx)} {f(by)} C{f(a1[0])} {f(a1[1])} {f(a2[0])} {f(a2[1])} {f(at(0.5, width * .42)[0])} {f(at(0.5, width * .42)[1])} '
            f'C{f(a3[0])} {f(a3[1])} {f(at(0.93, width * .05)[0])} {f(at(0.93, width * .05)[1])} {f(tx)} {f(ty)} '
            f'C{f(at(0.93, -width * .04)[0])} {f(at(0.93, -width * .04)[1])} {f(b1[0])} {f(b1[1])} {f(at(0.5, -width * .4)[0])} {f(at(0.5, -width * .4)[1])} '
            f'C{f(b2[0])} {f(b2[1])} {f(b3[0])} {f(b3[1])} {f(bx)} {f(by)}Z')

# --- geometry measured from the old artwork ---
B = Stalk((351, 36), (344, 320), (240, 600), (258, 1000), 30, 37)   # tall stalk at the back
A = Stalk((230.5, 217), (228, 420), (248, 550), (247, 1000), 29, 37)  # short stalk in front
B_nodes = [168, 322, 476, 620, 772, 896]
A_nodes = [319, 432, 549, 661, 774, 888]

stalk_B = stalk_path(B, B_nodes, top_cut=(0, 25))
stalk_A = stalk_path(A, A_nodes, top_cut=(0, 22))

sprigs = [
    # B node at y 168, hanging to the left
    leaf((328, 166), (296, 146), 10.9, -0.06), leaf((327, 168), (290, 168), 12.3, 0.05), leaf((327, 170), (311, 192), 10.2, 0.08), leaf((329, 170), (338, 201), 9.4, -0.1),
    # A node at y 432, to the left
    leaf((216, 431), (178, 422), 9.4, -0.05), leaf((216, 433), (181, 450), 13.0, 0.06), leaf((217, 435), (206, 466), 10.2, 0.1), leaf((216, 429), (207, 406), 6.5, -0.08),
    # B node at y 476, to the right
    leaf((317, 477), (360, 467), 6.5, -0.05), leaf((317, 479), (358, 501), 11.6, 0.06), leaf((316, 480), (325, 516), 10.2, -0.08), leaf((314, 479), (282, 514), 12.3, 0.07),
    # between the stalks, A node at y 549
    leaf((260, 546), (304, 537), 6.1, -0.05), leaf((261, 548), (301, 562), 10.2, 0.08), leaf((259, 550), (268, 584), 9.4, -0.07), leaf((258, 549), (227, 579), 11.6, 0.06), leaf((263, 594), (262, 620), 4.2, 0.05),
    # big spray on the left from the bottom node of A (y 661)
    leaf((226, 659), (166, 630), 7.0, 0.04), leaf((168, 630), (106, 620), 9.4, -0.06), leaf((168, 632), (90, 659), 13.8, 0.07),
    leaf((170, 633), (135, 671), 11.6, 0.08), leaf((172, 626), (180, 565), 9.4, -0.07), leaf((169, 627), (147, 592), 7.2, 0.06),
]

def markup():
    leaves = ' '.join(sprigs)
    return (f'<g class="bb-stalks" clip-path="url(#bb-rise)">'
            f'<mask id="bb-front" maskUnits="userSpaceOnUse" x="0" y="0" width="460" height="1020"><rect width="460" height="1020" fill="#fff"/>'
            f'<path d="{stalk_A}" fill="#000" stroke="#000" stroke-width="6" stroke-linejoin="round"/></mask>'
            f'<path class="bb-stalk" mask="url(#bb-front)" d="{stalk_B}"/>'
            f'<path class="bb-stalk" d="{stalk_A}"/>'
            f'<path class="bb-stalk bb-sprig" stroke="#fff" stroke-width="1.3" stroke-linejoin="round" paint-order="stroke" d="{leaves}"/></g>')

if __name__ == '__main__':
    m = markup()
    if len(sys.argv) > 1 and sys.argv[1] == 'preview':
        old = open(sys.argv[2]).read()
        print(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 1020" width="920" height="1020"><rect width="920" height="1020" fill="#f5f2ea"/>'
              f'<g fill="#4f6b2a">{old}</g><g transform="translate(460 0)" fill="#4f6b2a">{m.replace("clip-path=\"url(#bb-rise)\"", "")}</g></svg>')
    else:
        print(m)

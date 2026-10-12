import bpy, math, json, os
import numpy as np
from mathutils import Vector, Matrix
from bpy_extras.object_utils import world_to_camera_view

D = math.radians
sc = bpy.context.scene
O = bpy.data.objects
CHAR = r"C:\APPS\portfolio-antonio\design\character"
OUT = os.path.join(CHAR, "layers")
POSES = json.load(open(os.path.join(CHAR, "poses", "poses.json"), encoding="utf-8"))["poses"]

NAMES = ["Bunny_Head", "Bunny_Ear_L", "Bunny_Ear_R", "Bunny_Arm_L", "Bunny_Arm_R"]
REST = {n: O[n].matrix_basis.copy() for n in NAMES}
PIV = Vector((0, 0, 1.0))

BODY = ["Bunny_Body", "Bunny_Tail", "Bunny_Headphones"]
HEAD = ["Bunny_Head", "Bunny_Nose", "Bunny_Headphones_Head"]   # auriculares puestos: solo visibles en "headphones": "head"
HP_NECK, HP_HEAD = "Bunny_Headphones", "Bunny_Headphones_Head"
HP_ON = False
EARS = ["Bunny_Ear_L", "Bunny_Ear_R"]
EYES = ["Bunny_Eye_L", "Bunny_Eye_R"]
BLINK = ["Bunny_Blink_L", "Bunny_Blink_R"]
ARMS = ["Bunny_Arm_L", "Bunny_Arm_R"]
PIECES = BODY + HEAD + EARS + EYES + BLINK


def set_headphones(on):
    """Auriculares al cuello (False) o puestos en la cabeza (True)."""
    global HP_ON
    HP_ON = bool(on)
    O[HP_NECK].hide_render = HP_ON
    O[HP_HEAD].hide_render = not HP_ON


def pose_arm(side, up, fwd):
    s = 1 if side == "L" else -1
    sh = REST[f"Bunny_Arm_{side}"].translation
    O[f"Bunny_Arm_{side}"].matrix_basis = Matrix.Translation(sh) @ Matrix.Rotation(D(-s * fwd), 4, 'Z') @ Matrix.Rotation(D(-s * up), 4, 'Y')


def reset():
    for n in NAMES:
        O[n].matrix_basis = REST[n].copy()
    set_headphones(False)
    bpy.context.view_layer.update()


def apply(p):
    reset()
    if "head" in p:
        yaw, roll, lift = p["head"][:3]
        pitch = p["head"][3] if len(p["head"]) > 3 else 0
        R = Matrix.Rotation(D(yaw), 4, 'Z') @ Matrix.Rotation(D(pitch), 4, 'X') @ Matrix.Rotation(D(roll), 4, 'Y')
        O["Bunny_Head"].matrix_basis = Matrix.Translation(PIV + Vector((0, 0, lift))) @ R @ Matrix.Translation(-PIV) @ REST["Bunny_Head"]
    for e, d in p.get("ears", {}).items():
        O[e].matrix_basis = O[e].matrix_basis @ Matrix.Rotation(D(d), 4, 'Y')
    for e, d in p.get("ears_x", {}).items():
        O[e].matrix_basis = O[e].matrix_basis @ Matrix.Rotation(D(d), 4, 'X')
    if "arm" in p:
        pose_arm(*p["arm"])
    for a in p.get("arms", []):       # varios brazos a la vez (baile)
        pose_arm(*a)
    set_headphones(p.get("headphones") == "head")
    bpy.context.view_layer.update()


ARM_REST_UP = 14   # el brazo en reposo cuelga a 14° (rotación Y del reposo)


def interp(p, t):
    """Pose intermedia entre el reposo (t=0) y la pose p (t=1). Interpolación lineal de parámetros."""
    q = {}
    if "head" in p:
        q["head"] = [v * t for v in p["head"]]
    for key in ("ears", "ears_x"):
        if key in p:
            q[key] = {e: d * t for e, d in p[key].items()}
    if "arm" in p:
        side, up, fwd = p["arm"]
        q["arm"] = [side, ARM_REST_UP + (up - ARM_REST_UP) * t, fwd * t]
    if "arms" in p:
        q["arms"] = [[s, ARM_REST_UP + (u - ARM_REST_UP) * t, f * t] for s, u, f in p["arms"]]
    if p.get("headphones") == "head" and t >= 0.5:
        q["headphones"] = "head"      # los auriculares no se interpolan: cambian a mitad de camino
    return q


def lerp_pose(a, b, t):
    """Pose intermedia entre dos poses cualesquiera (t=0 → a, t=1 → b). Sirve para transiciones
    directas entre poses vecinas sin pasar por el reposo."""
    q = {}
    ha = (a.get("head", [0, 0, 0, 0]) + [0])[:4]
    hb = (b.get("head", [0, 0, 0, 0]) + [0])[:4]
    q["head"] = [x + (y - x) * t for x, y in zip(ha, hb)]
    for key in ("ears", "ears_x"):
        ea, eb = a.get(key, {}), b.get(key, {})
        names = set(ea) | set(eb)
        if names:
            q[key] = {e: ea.get(e, 0) + (eb.get(e, 0) - ea.get(e, 0)) * t for e in names}
    arms = {}
    for p in (a, b):
        if "arm" in p:
            arms[p["arm"][0]] = None
    if arms:
        side = next(iter(arms))   # transiciones con un solo brazo en juego
        rest_arm = [side, ARM_REST_UP, 0]
        aa = a.get("arm", rest_arm) if a.get("arm", [side])[0] == side else rest_arm
        ab = b.get("arm", rest_arm) if b.get("arm", [side])[0] == side else rest_arm
        q["arm"] = [side, aa[1] + (ab[1] - aa[1]) * t, aa[2] + (ab[2] - aa[2]) * t]
    return q


def clashes():
    """Intersecciones cabeza↔accesorio, cabeza↔hombros y brazos↔accesorio en la pose actual."""
    from mathutils.bvhtree import BVHTree
    bpy.context.view_layer.update()
    dg = bpy.context.evaluated_depsgraph_get()

    def bvh(o, zmax=None):
        oe = o.evaluated_get(dg)
        m = oe.to_mesh()
        vs = [oe.matrix_world @ v.co for v in m.vertices]
        fs = [tuple(pl.vertices) for pl in m.polygons
              if zmax is None or sum(vs[i].z for i in pl.vertices) / len(pl.vertices) < zmax]
        tree = BVHTree.FromPolygons(vs, fs)
        oe.to_mesh_clear()
        return tree
    H = bvh(O["Bunny_Head"])
    n = len(H.overlap(bvh(O["Bunny_Body"], zmax=0.86)))
    hp = O[HP_HEAD] if HP_ON else O[HP_NECK]
    HP = bvh(hp)
    if not HP_ON:
        n += len(H.overlap(HP))
    for e in ("Bunny_Ear_L", "Bunny_Ear_R"):
        if HP_ON:
            n += len(bvh(O[e]).overlap(HP))
    for a in ARMS:
        A = bvh(O[a])
        n += len(A.overlap(HP)) + len(A.overlap(H))
        for e in ("Bunny_Ear_L", "Bunny_Ear_R"):
            n += len(A.overlap(bvh(O[e])))
    return n


def set_visibility(camera_set, eyes="open", floor=False, holdout=()):
    """camera_set: piezas que ve la cámara. El resto sigue proyectando sombras.
    holdout: piezas que la cámara ve como recorte transparente (tapan lo que hay detrás)."""
    for n in PIECES:
        o = O[n]
        o.visible_camera = n in camera_set or n in holdout
        o.is_holdout = n in holdout
        o.hide_render = False
    for n in ARMS:
        O[n].hide_render = True          # los brazos van fundidos en Bunny_Body
    for n in EYES:
        O[n].hide_render = eyes not in ("open",)
    for n in BLINK:
        O[n].hide_render = eyes != "blink"
    O[HP_NECK].hide_render = HP_ON
    O[HP_HEAD].hide_render = not HP_ON
    O["Floor"].visible_camera = floor


def restore_visibility():
    for n in PIECES:
        O[n].visible_camera = True
        O[n].is_holdout = False
        O[n].hide_render = n in BLINK
    for n in ARMS:
        O[n].hide_render = True
    set_headphones(False)
    O["Floor"].visible_camera = True


def render_to(name):
    os.makedirs(OUT, exist_ok=True)
    p = os.path.join(OUT, name + ".png")
    tmp = os.path.join(OUT, "_tmp_" + name + ".png")
    sc.render.filepath = tmp
    bpy.ops.render.render(write_still=True)
    os.replace(tmp, p)
    return p


def render_head(name, camera_set, eyes):
    """Cabeza: color del render normal (reflejos correctos) + alfa del render con el
    cuerpo como máscara (el cuello tapa la parte inferior de la cabeza)."""
    set_visibility(camera_set, eyes=eyes)
    color = render_to("_c_" + name)
    set_visibility(camera_set, eyes=eyes, holdout=BODY)
    samples = sc.cycles.samples
    sc.cycles.samples = 64
    try:
        mask = render_to("_m_" + name)
    finally:
        sc.cycles.samples = samples
    img_c = bpy.data.images.load(color, check_existing=False)
    img_m = bpy.data.images.load(mask, check_existing=False)
    for i in (img_c, img_m):
        i.colorspace_settings.name = 'Non-Color'
        i.alpha_mode = 'STRAIGHT'
    w, h = img_c.size
    c = np.array(img_c.pixels[:], np.float32).reshape(h, w, 4)
    m = np.array(img_m.pixels[:], np.float32).reshape(h, w, 4)
    c[..., 3] = np.minimum(c[..., 3], m[..., 3])
    out = bpy.data.images.new("layer", w, h, alpha=True)
    out.colorspace_settings.name = 'Non-Color'
    out.alpha_mode = 'STRAIGHT'
    out.pixels[:] = c.ravel()
    p = os.path.join(OUT, name + ".png")
    out.filepath_raw = p
    out.file_format = 'PNG'
    out.save()
    for i in (img_c, img_m, out):
        bpy.data.images.remove(i)
    os.remove(color)
    os.remove(mask)
    return p


def load_rgba(p):
    img = bpy.data.images.load(p, check_existing=False)
    img.colorspace_settings.name = 'Non-Color'
    w, h = img.size
    a = np.array(img.pixels[:], np.float32).reshape(h, w, 4)
    bpy.data.images.remove(img)
    return a[::-1]  # fila 0 = arriba


def save_rgb(rgb_top_first, q):
    rgb = rgb_top_first[::-1]
    h, w = rgb.shape[:2]
    o_ = bpy.data.images.new("prev", w, h, alpha=False)
    o_.colorspace_settings.name = 'Non-Color'
    o_.pixels[:] = np.concatenate([rgb, np.ones((h, w, 1), np.float32)], axis=2).ravel()
    o_.filepath_raw = q
    o_.file_format = 'PNG'
    o_.save()
    bpy.data.images.remove(o_)


def px(world):
    cam = sc.camera
    v = world_to_camera_view(sc, cam, Vector(world))
    w = sc.render.resolution_x
    h = sc.render.resolution_y
    return [round(v.x * w, 1), round((1 - v.y) * h, 1)]


def bbox(a):
    m = a[..., 3] > 0.004
    if not m.any():
        return None
    ys, xs = np.where(m)
    return [int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1]

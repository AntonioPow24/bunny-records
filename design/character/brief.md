# Brief del personaje — Bunny Studio (C1)

> **Estado:** v1 aprobada (2026-10-11). Decisiones de §7 cerradas; las medidas se pueden ajustar en el blockout (C2).
> Lo marcado con **❓** es una decisión tuya; el resto es mi propuesta y puedes corregirla.
> Fuentes: `PLAN-IMAGENES.md` §4, `BUNNY-RECORDS.md` §2 y §4, `design/logo/bunny-logo.svg`, `idea/fino1–4`.

---

## 1. En una frase

La **versión "figura de colección" del logo**: un conejo de vinilo mate marfil, con una cabeza grande y ancha como la del logo, la cara `+ ▬ +` en negro, un cuerpo pequeño y sencillo y un único toque teal.

## 2. Qué tomamos de cada referencia

| Referencia | Tomamos | Dejamos |
|---|---|---|
| **fino4** (Momo) | Conejo de vinilo y orejas largas y blandas; un único accesorio de color | Ojos con pupila, boca, mejillas rosas y la bufanda roja |
| **fino2** (furu) | Material marfil mate, sombras muy suaves, cabeza grande y ancha sobre un cuerpo pequeño, brazos que cuelgan y piernas cortas | El casco, las mejillas y los ojos ovalados |
| **fino3** | Vistas limpias de frente, perfil y espalda para aprobar | — |
| **fino1** | Piezas claramente separadas (ideal para animar por capas) | Las formas exageradas |

## 3. Proporciones

Unidad de trabajo en Blender: **altura total sin orejas = 2,0 m**. Es un tamaño cómodo para modelar; el tamaño real no importa porque solo se renderiza.

### 3.1 Medidas sacadas del logo (cabeza)

Medidas sobre `bunny-logo.svg` (cabeza marfil sin orejas ≈ 630 × 410 unidades):

| Medida | Logo | En 3D |
|---|---|---|
| Ancho ÷ alto de la cabeza | 1,54 | **1,45** (algo menos ancha: en 3D se ve más ancha por el volumen) |
| Línea de ojos (desde arriba de la cabeza) | 50 % | **52 %** |
| Separación entre los centros de los ojos ÷ ancho de la cabeza | 0,58 | **0,55** (la curvatura de la cabeza los separa a la vista) |
| Tamaño del `+` ÷ ancho de la cabeza | 0,10 | **0,10** |
| Grosor del trazo del `+` ÷ tamaño del `+` | 0,38 | **0,38**, puntas redondeadas |
| Nariz: ancho ÷ ancho de la cabeza | 0,195 | **0,18** |
| Nariz: alto ÷ ancho | 0,33 (píldora) | **0,33** |
| Nariz: centro (desde arriba de la cabeza) | 67 % | **68 %** |
| Largo de las orejas ÷ alto de la cabeza | ≈1,0 | **❓ 0,9** (ver §7) |

### 3.2 Cuerpo

| Parte | Propuesta | Referencia |
|---|---|---|
| **Cabeza** | **48 %** de la altura sin orejas (≈0,96 m) | Proporción chibi: cabeza ≈ cuerpo |
| Profundidad de la cabeza | 0,8 × su alto. Un "bollo" achatado, no una esfera | furu |
| **Torso** | Forma de pera o judía, ≈0,62 m de alto y 0,55 m de ancho; sin cuello visible (la cabeza se apoya encima) | furu, Momo |
| **Piernas** | Dos cápsulas cortas, ≈0,42 m, ligeramente separadas, con un pie redondeado que asoma un poco hacia delante | furu |
| **Brazos** | Cápsulas que cuelgan pegadas al cuerpo, sin dedos (manopla redondeada), la punta a la altura de la cadera | furu |
| **Cola** | Bolita marfil pequeña, solo visible de perfil y de espalda | ❓ |
| **Orejas** | Cápsulas largas y aplanadas, más anchas en el centro y con la punta redondeada. Abiertas en V como en el logo (≈15° hacia fuera cada una), con una inclinación ligera hacia atrás | Logo, Momo |

## 4. Cara

- **Ojos `+`:** en negro `#080A0D`, en **relieve muy sutil** (≈1 % del ancho de la cabeza) y con las puntas redondeadas, igual que el logo. Sin pupilas.
- **Parpadeo `−`:** la barra horizontal del `+`, sola. Es un objeto aparte para poder cambiar de uno a otro.
- **Nariz píldora:** en negro y en relieve sutil.
- **Sin boca, sin cejas y sin mejillas.** La expresión sale de la cabeza y las orejas, no de la cara.

## 5. Color y material

| Parte | Color (sRGB) | Material |
|---|---|---|
| Cabeza, cuerpo, brazos, piernas, orejas y cola | Soft Ivory `#F4F4F2`, con sombras cálidas, nunca grises | Vinilo mate: rugosidad ≈0,55, *subsurface* muy leve para que la luz "entre" en los bordes |
| Ojos y nariz | Ink Black `#080A0D` | Satinado: rugosidad ≈0,35, un reflejo pequeño para que no parezcan agujeros |
| Accesorio teal | Signature Teal `#329DA8` y Deep Teal `#267B84` para las sombras o piezas secundarias | Vinilo mate, como el cuerpo |

Ningún color fuera de la paleta: nada de rosa en las mejillas ni de gris en las sombras.

## 6. Luz y presentación

- **Principal:** suave, arriba a la izquierda (como la luz que sugiere la sombra teal del logo, abajo a la izquierda).
- **Relleno:** suave, desde la derecha, para que el marfil no se ensucie.
- **Contraluz teal:** desde atrás a la derecha. Es la traducción 3D de la sombra teal del logo y separa al conejo del fondo oscuro.
- **Fondo de prueba:** Midnight `#0C111C`, más una **sombra de contacto** suave bajo los pies.
- **Cámara para la web:** perspectiva con teleobjetivo (≈85 mm, poca deformación), a la altura del pecho y mirando ligeramente hacia arriba para dar presencia. Lienzo de **1200 × 1600 px** (ya configurado en `bunny.blend`).
- **Cámara para la hoja de personaje (C4):** ortográfica, para el frente, el perfil y la espalda.

## 7. Decisiones abiertas ❓

1. **Auriculares: ¿dónde están en reposo?**
   - **(a) Colgados del cuello**, como la bufanda de Momo. El teal está presente en todas las poses y en Escucha se suben a la cabeza. *Es mi recomendación: sin ellos, el conejo en reposo es todo marfil y negro y pierde el vínculo con Records.*
   - (b) Solo en la pose Escucha; en reposo, nada teal salvo la contraluz.
2. **Interior de las orejas:** (a) marfil, como el logo, o (b) un teal suave. *Recomiendo marfil y dejar el teal para los auriculares.* Un solo acento es más limpio.
3. **Largo de las orejas:** 0,8, 0,9 o 1,0 × el alto de la cabeza. El logo usa ≈1,0; en 3D, con la cabeza grande, propongo **0,9**. Lo veremos en el blockout de C2, que es barato de cambiar.
4. **Cola:** ¿sí o no? Solo se ve de perfil y de espalda. *Recomiendo que sí, pequeña.*
5. **Orejas:** ¿rectas (como en el logo) o una con la punta doblada (más carácter, al estilo Momo)? *Recomiendo rectas*: es lo que dice la identidad ("orejas largas, rectas y ligeramente separadas"), y el doblez puede venir de la animación.
6. **Imágenes de concepto con IA (opcional):** ¿quieres 1–3 de frente como inspiración antes de modelar, o pasamos directamente al blockout? *Recomiendo el blockout directo*: ya tenemos las medidas y el blockout es la mejor "imagen de concepto".

### Decisiones tomadas (2026-10-11)

1. **(a)** Auriculares colgados del cuello en reposo; en Escucha se suben a la cabeza.
2. **(a)** Interior de las orejas en marfil.
3. Largo de las orejas: **0,9 ×** el alto de la cabeza.
4. Cola: **sí**, pequeña.
5. Orejas **rectas**.
6. Sin imágenes de concepto: **directo al blockout (C2)**.

### Ajustes del blockout (2026-10-11)

- Piernas 0,08 m más cortas (más chibi). Altura sin orejas: **1,92 m**; la cabeza pasa a ser el **50 %**. Lo demás (cabeza, orejas, brazos, torso) aprobado tal cual en la v3.
- Material elegido: **A, vinilo mate marfil** en el cuerpo y **auriculares de gomita teal translúcida** (transmisión y volumen teal/Deep Teal).
- Cuello y hombros (en el clon, pendiente de pasar al original): la cabeza baja 0,06 m y se apoya sobre los hombros; el torso se estrecha menos arriba, tiene un cuello oculto que entra en la cabeza (para cuando se incline) y los hombros metidos en el torso. Altura sin orejas: **1,86 m**; cabeza ≈ **52 %**. Los auriculares se rehicieron: copas sobre las clavículas y banda apoyada en los hombros, por detrás del cuello.
- Cuerpo de una sola pieza (en el clon): torso, cuello, piernas y pies fundidos (remallado por vóxeles + suavizado), sin uniones visibles. Brazos, cabeza y cola siguen separados para animar. Los brazos nacen más abajo (hombro a z 0,74) para que el torso tenga hombros propios. Auriculares: copas de 0,10 m de radio, banda como tubo continuo apoyado sobre la superficie y **0 intersecciones** comprobadas con el cuerpo, la cabeza y los brazos.
- Hombros (en el clon): se quitaron los casquetes redondos porque parecían hombreras. Ahora los brazos se **funden en vivo** con el cuerpo: `Bunny_Body` lleva el modificador Geometry Nodes `Bunny_FuseArms` (une `Bunny_Arm_L/R`), luego Remesh por vóxeles (0,007) y Smooth (30). El hombro pasa al brazo sin línea, y si se mueve un brazo, la fusión lo sigue. Los objetos de brazo quedan como alambre y ocultos en el render; sirven para posar. Torso con costados más rectos (superelipse lateral 2,5; ancho 0,29 m) para no esconder los brazos; hombro a z 0,75 (+1 cm). **Brazos (estado v9, elegido por el usuario):** torso de 0,29 m de ancho, hombro en x 0,265, inclinación de 14°, brazo de **0,38 m** (2 cm más corto, pedido después) y radio 0,08, fusión completa del brazo. El brazo está en parte metido en el torso, así que el antebrazo interno se funde un poco con él. El usuario lo prefiere así antes que las alternativas: la A (brazo colgando aparte, torso más estrecho y hombros más abiertos) no le gustó, y la B (manga en el hombro) dejaba un anillo visible. Los brazos-esqueleto están ocultos en la vista (`hide_set`) y la fusión sigue funcionando. **Para C6:** al separar el brazo en una capa, habrá que renderizar el cuerpo sin ese brazo (sacándolo de la fusión). La banda de los auriculares sube y rodea la nuca a z ≈ 0,87, justo bajo la cabeza; ya no cuelga por la espalda.

## 8. Estructura en Blender (para C2)

Cada pieza es un objeto aparte con su **origen en la articulación**, para animar por capas sin tocar la geometría:

| Objeto | Origen (punto de giro) |
|---|---|
| `Bunny_Body` (torso + piernas) | Entre los pies, en el suelo |
| `Bunny_Head` | Base del cuello |
| `Bunny_Ear_L` / `Bunny_Ear_R` | Base de cada oreja |
| `Bunny_Eye_L` / `Bunny_Eye_R` (`+`) y `Bunny_Blink_L` / `Bunny_Blink_R` (`−`) | Centro de cada ojo; hijos de la cabeza |
| `Bunny_Nose` | Centro; hija de la cabeza |
| `Bunny_Arm_L` / `Bunny_Arm_R` | Hombro |
| `Bunny_Tail` | Base; hija del cuerpo |
| `Bunny_Headphones` | Según la decisión 1 |

Colecciones: `Bunny` (personaje), `Lights`, `Cameras`. Escala aplicada en todos los objetos y nombres en inglés para que `pivots.json` salga limpio.

## 9. Aprobación

- [ ] Proporciones (§3)
- [ ] Cara (§4)
- [ ] Color y material (§5)
- [ ] Luz y cámara (§6)
- [ ] Decisiones abiertas (§7)

Con tu visto bueno paso a **C2: blockout** y te mando capturas de frente, 3/4 y perfil.

---
name: creativos
description: Produce y organiza activos creativos generados con IA (imagenes, video, audio) con carpetas fijas, nombres espejo, un INDEX que mapea cada pieza a su job_id, control anti-slop y aprobacion previa obligatoria porque gasta credito. Usala al crear creativos para anuncios, contenido o catalogo, o cuando haya que ordenar piezas ya generadas.
argument-hint: [producto-o-tema]
---

# Produccion de creativos

Dos problemas que esta metodologia resuelve y que se manifiestan tarde: **piezas que se pierden** (generaste algo bueno hace un mes y no lo encuentras) y **piezas que no deberian haberse publicado** (el modelo invento una reseña o un descuento que no existe).

## Regla que va primero

**Generar gasta credito pagado. Nunca se genera sin aprobacion previa con el costo por delante** (regla 12). Antes de la primera llamada: cuantas piezas, con que modelo, cuanto cuesta aproximadamente. Y esperar el OK.

## 1. Carpetas

```
60-crecimiento/creativos/{slug}/
├── README.md      ficha: identificacion, IDs de configuracion, receta validada, estado
├── INDEX.md       toda pieza ↔ job_id ↔ estado ↔ como recuperarla
├── producto/      referencias reales del producto (fotos, recortes limpios)
├── finales/       SOLO las que de verdad se usan
├── backup/        generadas bien pero no elegidas, o versiones superadas
├── descartes/     generadas mal (el sufijo dice por que) — NO se borran
└── videos/
```

**Nada se borra.** Los descartes son la memoria de que no funciona con este modelo y este producto; sin ellos se repite el mismo error de prompt en tres meses.

Cuando una version queda superada, la anterior **se mueve** a `backup/`. En `finales/` vive una sola version por creativo, o el naming espejo deja de ser univoco.

## 2. Nombres

```
{slug}_{tipo}_{concepto}_{modelo}_{version}[_{nota}].{ext}
```

- **tipo**: `producto` · `ugc` · `dtc` · `video`
- **concepto**: el angulo o formato (`oficina-A`, `antes-despues`, `oferta`)
- **modelo**: cual lo genero, para poder repetir lo que funciono
- **nota**: solo en `descartes/`, el motivo (`manos`, `texto-falso`, `sin-producto`)

`producto-x_ugc_oficina-A_soul_v2.png` → anuncio `a1-ugc-oficina-v2`. Ese es el naming espejo de la regla 9.

## 3. El INDEX (lo que salva meses de trabajo)

Una fila por pieza: archivo → modelo → concepto → **job_id** → estado → nota.

**Se llena en el momento de generar, no despues.** Despues nunca llega, y sin el `job_id` la plataforma de generacion se vuelve un pozo donde sabes que hay algo bueno pero no cual.

Incluye tambien una seccion de **errores**: las llamadas que fallaron no producen archivo pero si consumen tiempo y a veces credito, y saber que ese prompt revienta vale.

En el `README.md` van los IDs de configuracion que se reusan: kit de marca, identificadores de producto en la plataforma, referencias subidas, estilos que funcionaron. Se crean una vez y se reusan en todos los productos — recrearlos es gasto puro.

## 4. Con higgsfield (o cualquier proveedor de generacion)

Las skills `higgsfield-*` cubren generacion de imagen, video, audio, foto de producto y entrenamiento de identidad. Lo que esta metodologia agrega es el orden alrededor:

- **Un espacio de trabajo, un kit de marca**, creado una vez y reusado. Verificalo antes de crear uno nuevo.
- **Todo `job_id` al INDEX en el momento.** Es lo que hace recuperable el historial completo.
- Si la plataforma tiene carpetas propias, son opcionales: el INDEX local es la fuente de verdad, no el panel del proveedor.
- **Prefiere referencias reales.** Una foto real del producto recortada limpia produce mejores resultados que describirlo, y ademas evita que el modelo lo invente.

## 5. Anti-slop: mirar cada pieza

Regla 2. **Ninguna pieza se da por buena sin verla.** Lo que se revisa, en orden de frecuencia con la que falla:

- **Manos, dedos y articulaciones.** Sigue siendo el fallo mas comun.
- **Texto renderizado.** Si el modelo escribe, casi siempre escribe mal. Dale el texto exacto, con tildes, y verifica letra por letra.
- **El producto.** Que sea el producto real y no una version imaginada. Es el fallo mas caro: publicas algo que no es lo que vendes.
- **Coherencia de escena.** Sombras, reflejos, objetos que se funden entre si.
- **Representacion.** Que la gente se parezca a tu publico real, sin caer en estereotipos.

Itera hasta que este limpia. Una pieza mediocre que se publica cuesta mas que tres iteraciones.

## 6. La regla que evita un problema legal

**El modelo inventa datos si le dejas el hueco.** Los formatos con espacio para reseñas, calificaciones o descuentos se rellenan solos con estrellas, "+2500 clientes" o "-30%" que no existen.

- Dile **explicitamente** que no invente reseñas, calificaciones, cifras ni descuentos.
- Pasale el **dato real** cuando exista.
- **Verifica mirando la pieza final**, no confiando en la instruccion.
- Si aparece un dato inventado, esa pieza va a `descartes/` con el sufijo del motivo. **Nunca a `finales/`.**

Publicar una reseña inventada no es un problema estetico: es publicidad engañosa.

## 7. Cerrar

Al terminar, el `README.md` queda con la receta validada — que modelo, que referencia, que instruccion produjo lo bueno — para que el proximo producto arranque de ahi y no de cero.

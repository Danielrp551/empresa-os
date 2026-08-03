---
name: revision
description: Ejecuta un checkpoint de una unidad de trabajo (campana, test, proyecto, tramite) jalando los numeros reales, escribiendo el archivo fechado en revisiones/ y dejando la linea-resumen en el TABLERO. Usala cuando toque revisar como va algo que esta corriendo, cuando el usuario pregunte "como va la campana" o cuando la metodologia marque un checkpoint.
argument-hint: "[unidad-de-trabajo] [checkpoint]"
---

# Checkpoint de una unidad de trabajo

Un checkpoint no es "mirar como va". Es **traer los numeros reales, compararlos contra umbrales escritos de antemano, y dejar constancia de lo que se decidio y por que**.

## 1. Antes de mirar nada

Abre el `TABLERO.md` de la unidad y lee **los criterios que ya estaban escritos**. Esto va primero, siempre.

Si el tablero no tiene criterios escritos, **dilo y detente ahi**. Escribirlos ahora, ya viendo los datos, es exactamente lo que la regla 8 prohibe. Lo honesto es: fijarlos ahora, dejar constancia de que se fijaron tarde, y tenerlo en cuenta al leer el resultado.

Confirma tambien: que checkpoint toca segun la metodologia, y que se decidio en el anterior.

## 2. Traer los numeros

De la fuente, no de memoria ni de estimacion (regla 1). API, panel, exportacion. **Cita la fuente y la fecha de cada bloque de datos.**

Dos cosas que salvan mucho dolor:
- **Cruza fuentes cuando existan dos.** Lo que dice la plataforma de anuncios y lo que dice tu sistema de pedidos casi nunca coincide, y esa diferencia suele ser el hallazgo.
- **Al nivel que importa.** Si la decision es por anuncio, los numeros van por anuncio. Un promedio a nivel campana esconde justo lo que necesitas ver.

## 3. Escribir la revision

`{unidad}/revisiones/YYYY-MM-DD-{checkpoint}.md`. Plantilla en `plantillas/documentos/revision.md`.

```markdown
# {Checkpoint} — YYYY-MM-DD

**Fuente:** <de donde salieron los numeros, con fecha y hora>
**Periodo:** <que rango cubren>

## Numeros
<tabla al nivel de decision>

## Lectura
<que dicen los numeros contra los umbrales escritos. Explicito: cual se cruzo
y cual no. Si la muestra es chica, dilo: n=3 no es una conclusion.>

## Acciones tomadas
| Que | Por que | Quien |

## Acciones propuestas (pendientes de OK)
| Que | Por que | Que pasa si no se hace |

## Que vigilar hasta el proximo checkpoint
```

**Separa tomadas de propuestas.** Lo que gasta, publica o es irreversible se propone; no se ejecuta (regla 12).

## 4. Actualizar el tablero

**Una linea** con el enlace, mas los numeros clave:

```markdown
**Control (dia 7):** ejecutado 2026-08-10 → [`revisiones/2026-08-10-control.md`](revisiones/2026-08-10-control.md)
Resumen: gasto acumulado X, N conversiones, costo por conversion Y (umbral: Z). Sin violaciones de kill.
```

Y agrega al log de decisiones lo que se haya decidido, con fecha y razon (regla 5).

**No metas el detalle en el tablero.** Un tablero que crece deja de leerse, y un tablero que no se lee deja de actualizarse. Ese es el orden en que muere el sistema.

## 5. Capturar evidencia

Capturas del panel a `{unidad}/evidencia/YYYY-MM-DD-{que-es}.png`. Regla 2: lo que se aprueba mirando, se guarda mirado. El dia que discutas una cifra con una plataforma, la captura fechada es lo unico que tienes.

## Los tres errores que arruinan un checkpoint

1. **Actuar en el arranque.** El checkpoint de +24 h es solo observar. Optimizar con veinte visitas de muestra es tomar decisiones sobre ruido.
2. **Mover el umbral.** Si el criterio decia matar por debajo de X y esta por debajo de X, se mata. Cambiar el umbral porque "va a mejorar" es como se pierde el presupuesto entero.
3. **Editar lo que funciona.** En muchas plataformas, editar un objeto activo reinicia su fase de aprendizaje. Si hay que cambiar algo que rinde, se crea una version nueva con la version en el nombre.

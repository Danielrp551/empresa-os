---
name: brief-sesion
description: Prepara un brief autocontenido para delegar un tramo de trabajo a otra sesion, a un subagente o a otra persona, con contexto, restricciones reales, entregables exactos y limites de lo que no debe tocar. Usala cuando el usuario quiera abrir una sesion aparte para un tema, delegar una pieza grande, o cuando el trabajo por hacer no cabe bien en la sesion actual.
argument-hint: [tema-a-delegar]
---

# Brief para delegar un tramo de trabajo

Un brief bien hecho es la diferencia entre delegar y volver a explicar todo. Quien lo reciba **no tiene tu contexto**: no vio la conversacion, no sabe que ya se descarto, no sabe que restricciones son reales y cuales son preferencias.

## Cuando conviene

- El trabajo es grande y especializado (identidad de marca, una investigacion a fondo, un modulo tecnico).
- El contexto actual esta cargado de material que no le sirve a esa tarea.
- Se puede avanzar en paralelo.
- Quieres una mirada fresca, sin el sesgo de la conversacion previa.

**Cuando no:** si la tarea es corta o depende de decidir sobre la marcha. El costo de escribir el brief supera al de hacerlo.

## Qué lleva

`{area}/BRIEF-{TEMA}.md`. Plantilla en `plantillas/documentos/brief-sesion.md`.

```markdown
# BRIEF — {tema}

**Para la sesion que trabaje esto:** este documento es tu fuente de verdad.
Preparado por <quien> el YYYY-MM-DD. Lee tambien <enlaces minimos>.

## 1. Contexto de negocio
<Lo que hay que saber para no diseñar contra el negocio. No rediseñes esto:
diseña PARA esto.>

## 2. Estado actual
<Que existe ya, que funciona y que es el punto debil que motiva el encargo.>

## 3. Restricciones REALES
<Verificadas, no supuestas. Cada una con su porque. Las tecnicas son las mas
importantes: "el sistema deriva todo el color de 4 variables" evita que te
entreguen una paleta de 12 colores que no se puede aplicar.>

## 4. Entregables EXACTOS
| Archivo | Que es | Formato |
<Rutas y nombres concretos. Sin esto vuelve algo parecido a lo que pediste,
en el sitio equivocado.>

## 5. Limites: que NO tocar
- No toques <sistemas en produccion>
- No uses credenciales ni leas secrets/
- No reabras <lo que ya esta decidido>
- No publiques nada hacia afuera

## 6. Si algo entra en conflicto
Documenta la duda en <archivo> en vez de asumir. Regla 1.

## 7. Al terminar
<Que archivo produce, y la frase exacta que el usuario dira para retomar.>
```

## Las tres secciones que deciden si funciona

**Restricciones reales.** La causa numero uno de trabajo delegado inservible es que lo entregado no se puede aplicar. Verifica las restricciones antes de escribirlas: miralas en el sistema, no las recuerdes.

**Entregables exactos.** Nombres de archivo y rutas literales. "Un logo" vuelve como cinco cosas distintas; `logo.svg` horizontal con fondo transparente, `logo-cuadrado.png` de 1024×1024 y `favicon.png` de 512×512 legible a 32px, vuelve como lo que necesitas.

**Limites.** Lo que NO debe tocar importa tanto como lo que si. Especialmente: nada de credenciales, nada de produccion, y nada de reabrir decisiones ya cerradas — una sesion fresca sin limites reabre el naming, garantizado.

## Reglas

- **Autocontenido.** Si hace falta la conversacion anterior para entenderlo, no esta terminado.
- **Enlaces minimos.** Dos o tres documentos, no diez. Enlazar de mas es no priorizar.
- **Restricciones con su porque.** Una restriccion sin razon se ignora en cuanto estorba.
- **Que no reabra lo decidido.** Nombralo explicitamente.
- **Como avisa.** Una frase corta que el usuario diga al volver, para retomar sin releerlo todo.

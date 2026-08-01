---
name: cierre
description: Cierra una unidad de trabajo con su veredicto y los aprendizajes que alimentan la siguiente ronda, y actualiza la metodologia con lo aprendido. Usala cuando termine una campana, un test, un proyecto o un tramite, o cuando el usuario diga "ya esta, cerremos esto" o pregunte que aprendimos.
argument-hint: [unidad-de-trabajo]
---

# Cerrar un ciclo

Regla 10: ningun ciclo cierra sin veredicto. Un test que termina sin cierre es dinero gastado sin comprar informacion — y tres tests seguidos asi son tres veces el mismo test.

## 1. Reunir todo

Lee el `TABLERO.md` completo, **todas** las revisiones en orden cronologico, y la evidencia. Te interesa la trayectoria, no solo el numero final: donde se decidio que, y si esa decision resulto acertada a la luz de lo que vino despues.

## 2. El veredicto

Tres respuestas, y las tres son distintas:

- **Del objeto:** ¿el producto, canal o proyecto se escala, se itera o se mata? Con la metrica economica real, no con la de vanidad.
- **De la ejecucion:** ¿que funciono y por que? Que angulo, que mensaje, que proveedor, que decision.
- **Del metodo:** ¿que hay que cambiar en la metodologia para la proxima?

La tercera es la que casi nadie escribe y es la unica que hace que el sistema mejore.

## 3. Escribir el CIERRE.md

`{unidad}/CIERRE.md`. Plantilla en `plantillas/documentos/cierre.md`.

```markdown
# Cierre — {unidad}

**Periodo:** YYYY-MM-DD a YYYY-MM-DD
**Inversion total:** <lo que costo, todo incluido>

## Veredicto
**Del objeto:** escalar | iterar | matar — <razon en una frase>
**De la ejecucion:** <que funciono y por que>
**Del metodo:** <que cambia en la metodologia>

## Resultado contra lo que se esperaba
| Metrica | Umbral fijado antes | Resultado | Cumple |

## Que aprendimos
1. <aprendizaje concreto y transferible, no "hay que probar mas">

## A donde va cada aprendizaje
| Aprendizaje | Entra a |
|---|---|
| <cual> | <metodologia X seccion Y / proxima ronda / ADR NNNN> |

## Lo que no sabemos
<Honesto. Que quedo sin responder y por que. Un cierre que finge certeza
hace que la proxima ronda parta de una base falsa.>
```

## 4. Propagar

Esta es la parte que hace que el cierre valga algo:

- **Actualiza la metodologia** con lo aprendido del metodo, ahora. Si esperas, no pasa.
- **Si cambio el rumbo**, abre un ADR con `/decision`.
- **Si aparecio un proceso nuevo**, corre `/metodologia-nueva`.
- **Deja la referencia** en el `ESTADO.md` o en la siguiente ronda, para que empiece sabiendo esto.

## Un aprendizaje util

Un aprendizaje sirve si es **concreto**, **transferible** y **tiene destino**.

- Malo: *"el video funciono mejor"*.
- Bueno: *"el formato vertical con la demostracion en los primeros 3 segundos duplico la tasa de clic frente al estatico, en las tres variantes. Entra a la metodologia de creativos como formato por defecto para tope de embudo."*

## Cuando el resultado es malo

Se escribe igual, con la misma disciplina. Un cierre de un fracaso vale mas que uno de un exito: un exito puede ser suerte, un fracaso bien diagnosticado es un filtro que te ahorra la proxima.

Y la causa raiz se busca en el proceso, no en la persona. "Nos equivocamos al elegir" no es una causa raiz; "elegimos sin verificar la demanda porque la metodologia no tenia ese gate" si lo es, y ademas se arregla.

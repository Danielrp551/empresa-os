---
name: incidente
description: Documenta un incidente operativo como postmortem sin culpa, con linea de tiempo, impacto, causa raiz sistemica y acciones con dueño y fecha. Usala cuando algo se rompa hacia afuera: un cobro mal hecho, un pedido que no llego, el sitio caido, un dato expuesto, un reclamo de cliente que revela una falla del proceso.
argument-hint: [que-paso]
---

# Postmortem de un incidente

El formato viene de [Google SRE](https://sre.google/sre-book/postmortem-culture/). La disciplina central: **la causa raiz esta en el sistema, no en la persona**.

En una operacion de una persona esto no es cortesia — es lo unico que produce accion. "Me equivoque" no genera ninguna correccion. "El proceso no tenia forma de detectar esto antes de que llegara al cliente" genera una.

## Cuando escribir uno

Cuando algo salio mal **hacia afuera** o costo dinero: un cobro incorrecto, un pedido perdido, el sitio caido, un dato expuesto, un proveedor que fallo, un reclamo que revela un hueco del proceso.

Errores internos que se detectaron y corrigieron antes de que llegaran a alguien no necesitan postmortem — salvo que hayan estado cerca, y entonces el postmortem es sobre por que estuvieron cerca.

## 1. Primero contener, despues documentar

Si el incidente sigue vivo: contener es lo primero. El postmortem se escribe **despues**, con calma. Un postmortem a medias durante la crisis roba atencion de la crisis.

Excepcion: **ir anotando la hora de cada cosa mientras pasa**. La linea de tiempo es lo primero que se pierde y lo mas dificil de reconstruir a posteriori.

## 2. Escribir

`50-operacion/incidentes/YYYY-MM-DD-{slug}.md`. Plantilla en `plantillas/documentos/incidente.md`.

```markdown
# Incidente — {que paso}

**Fecha:** YYYY-MM-DD
**Detectado:** HH:MM · por <como se detecto>
**Contenido:** HH:MM
**Resuelto:** HH:MM
**Severidad:** alta | media | baja

## Impacto
<A cuantos afecto, cuanto costo, que se rompio. Numeros, no adjetivos.>

## Linea de tiempo
| Hora | Que paso |

## Causa raiz
<Por que fue posible. Baja hasta el sistema: que control faltaba, que
verificacion no existia, que supuesto era falso. Si tu causa raiz nombra a una
persona, no llegaste al fondo todavia.>

## Que funciono
<Que salio bien de la respuesta. Se refuerza a proposito: si el postmortem
solo lista fallas, la proxima vez nadie quiere escribir uno.>

## Acciones
| Accion | Dueño | Para cuando | Estado |
```

## 3. Llegar a la causa raiz de verdad

Cinco "por que", encadenados hasta llegar a algo que se pueda arreglar:

> Al cliente le cobraron el envio dos veces.
> — ¿Por que? El sistema aplico el cargo en dos pasos distintos.
> — ¿Por que? Se configuro en dos lugares sin saber que se sumaban.
> — ¿Por que? Nadie probo un pedido real despues de configurar.
> — ¿Por que? La metodologia de configuracion no tenia paso de prueba end-to-end.
> — **Causa raiz:** falta un gate de "pedido de prueba real" antes de abrir al publico.

La causa raiz siempre termina en un **cambio de proceso**, no en "hay que tener mas cuidado". Tener mas cuidado no es una accion: no se puede verificar y no sobrevive a un dia malo.

## 4. Acciones que valen

Cada accion con **dueño**, **fecha** y **verificable**.

- Mala: *"revisar mejor los envios"*.
- Buena: *"agregar a la metodologia de montaje el paso 'hacer un pedido real de prueba y verificar el cobro total antes de abrir'. Dueño: yo. Para: antes del proximo producto."*

## 5. Propagar

- **Actualiza la metodologia** que fallo. Es el punto entero del ejercicio.
- **Si hubo dinero de por medio**, refleja el costo en el cierre mensual.
- **Si expuso un secreto**, revoca primero y documenta despues (regla 13).
- **Si cambia una decision**, abre el ADR.

Un postmortem cuya accion no llega a ninguna metodologia es un desahogo con formato.

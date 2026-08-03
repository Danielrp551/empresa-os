---
name: cierre-mensual
description: "Ejecuta el cierre mensual de la empresa: numeros reales del mes, unit economics contra lo que se creia, obligaciones y vencimientos, y archivo de comprobantes. Usala el primer dia habil del mes, cuando el usuario pida cerrar el mes, o cuando haya que saber si el negocio gano o perdio plata."
disable-model-invocation: true
---

# Cierre mensual

Una vez al mes, la pregunta que no se puede responder con sensaciones: **¿este negocio gana o pierde plata, y por que?**

## 1. Los numeros del mes

De la fuente. Ingresos por canal, costos por categoria, margen de contribucion, caja al cierre.

Dos distinciones que definen el cierre:

- **Cobrado, no vendido.** Un pedido facturado y no cobrado no es ingreso todavia. En negocios con entrega o credito de por medio, esa diferencia es el negocio entero.
- **Costo total por unidad**, no el costo de la mercaderia. Producto, envio, comisiones, devoluciones, publicidad prorrateada, plataformas. El costo que se olvida siempre es el de lo que **no** se cobro.

## 2. Unit economics contra lo que se creia

| | Supuesto | Real del mes | Diferencia |
|---|---|---|---|
| Ingreso por cliente | | | |
| Costo variable por cliente | | | |
| Margen de contribucion | | | |
| Costo de adquisicion | | | |
| **Contribucion neta** | | | |

**La linea que decide:** ¿el costo de adquisicion cabe dentro del margen de contribucion? Si no, o el precio esta mal, o el canal esta mal, o el producto esta mal. No hay una cuarta opcion, y ninguna se arregla con mas volumen.

Si el supuesto y lo real se separan mes tras mes, el supuesto esta mal: actualizalo en `30-finanzas/unit-economics.md` y deja constancia de cuando cambio.

## 3. Obligaciones y vencimientos

Del modulo de jurisdiccion que aplique (por ejemplo `/pais-peru`), mas lo propio: declaraciones, pagos de impuestos, renovaciones de dominio o plataformas, contratos que vencen, seguros.

Para cada una: **que vence, cuando, cuanto y quien lo hace**. Presentar ante el Estado y pagar son **solo-humano** — el agente prepara todo hasta el ultimo clic.

## 4. Archivo

`30-finanzas/cierres/YYYY-MM/` con el resumen, los comprobantes y las constancias. El dia que necesites demostrar algo, la carpeta ordenada por mes es la diferencia entre diez minutos y una tarde.

## 5. El veredicto del mes

Cinco lineas en el cierre y **una** en `ESTADO.md`:

```markdown
## Cierre {mes}
**Resultado:** <gano o perdio, cuanto>
**Que lo explica:** <la causa principal, una frase>
**Que cambia el proximo mes:** <decision concreta, o "nada, sostener">
**Alerta:** <lo que si sigue asi se vuelve problema>
```

## 6. Propagar

- Si el resultado cambia una decision → `/decision`.
- Si aparecio un gasto recurrente que nadie habia previsto → a `30-finanzas/` y al supuesto de unit economics.
- Si hubo un incidente con costo → que el costo quede reflejado aca, no solo en el postmortem.

## Errores comunes

- **Contar vendido como cobrado.** Infla el mes y esconde el problema real, que suele ser de cobranza y no de ventas.
- **Olvidar los costos chicos recurrentes.** Suscripciones, comisiones, redondeos. Sumados cambian el margen y nadie los ve porque cada uno es insignificante.
- **Cerrar sin comparar contra el supuesto.** Sin esa comparacion el cierre es contabilidad; con ella es aprendizaje.
- **Dejar la declaracion para el ultimo dia.** Las plataformas del Estado se caen justo el dia del vencimiento, en todos los paises.

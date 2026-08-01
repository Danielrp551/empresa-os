---
name: decision
description: Registra una decision que cambia el rumbo como ADR numerado en 90-decisiones, con las alternativas descartadas y las consecuencias. Usala cuando se elija plataforma, proveedor, modelo de precios, estructura legal, entrar o salir de un canal, o cuando el usuario diga "decidimos X" o "al final vamos por Y".
argument-hint: [titulo-de-la-decision]
---

# Registrar una decision (ADR)

Regla 6: una decision no registrada no es una decision. Dentro de dos meses la vas a volver a discutir desde cero, y lo peor es que puede que llegues a la contraria sin saber por que descartaste esta.

## Que merece un ADR

Lo que seria **caro de revertir** o lo que **alguien va a volver a preguntar**: plataforma, proveedor, estructura legal, modelo de precios, entrar o salir de un canal, cambio de etapa del ciclo de vida, adoptar una herramienta que va a sostener un proceso.

Lo que se deshace en diez minutos, no. Si dudas: *¿alguien va a preguntar "por que hicimos esto asi"?* Si la respuesta es si, ADR.

## Como se escribe

Archivo: `90-decisiones/NNNN-titulo-en-kebab.md`, correlativo. El siguiente numero sale de mirar la carpeta.

**El titulo es el problema resuelto, no el tema.** `0007-usar-contraentrega-en-vez-de-pasarela.md`, no `0007-decision-sobre-pagos.md`. Un titulo-tema obliga a abrir el archivo para saber que dice.

```markdown
# NNNN — <Titulo: la decision, no el tema>

- **Estado:** aceptada
- **Fecha:** YYYY-MM-DD
- **Decide:** <quien>

## Contexto
<Que problema hay que resolver y que restricciones son reales. Sin esto, la
decision parece arbitraria dentro de un año. Incluye lo que se sabia y lo que
no se sabia en ese momento.>

## Decision
<Que se hace. Una o dos frases, en presente.>

## Alternativas descartadas
### <Alternativa A>
Por que no: <razon concreta>

### <Alternativa B>
Por que no: <razon concreta>

## Consecuencias
**A favor:** <lo que gana>
**En contra:** <lo que cuesta — obligatorio, no lo dejes vacio>
**Nos ata a:** <de que se vuelve dificil salir>

## Como sabremos si estuvo mal
<Que señal concreta indicaria que hay que revisar esto. Con eso, el ADR se
puede auditar en vez de solo archivar.>
```

## Las dos secciones que la gente se salta

**Alternativas descartadas.** Es donde vive el valor. Un ADR sin alternativas solo documenta lo que hiciste; con alternativas, documenta lo que ya no hace falta volver a pensar. Si de verdad no evaluaste ninguna, escribe eso: *"no se evaluaron alternativas por urgencia"* es informacion util y honesta.

**Consecuencias en contra.** Toda decision cuesta algo. Un ADR que solo lista ventajas es propaganda, y ademas no sirve el dia que aparezca el costo: nadie va a saber si era esperado o si algo salio mal.

## Inmutable

**Un ADR aceptado no se edita.** Si cambia la decision, se escribe uno nuevo:

- El nuevo lleva `**Supersede:** 0007`.
- El viejo cambia **solo** su linea de estado a `superada por 0012` y nada mas.

El historial de decisiones vale precisamente porque muestra lo que se creia antes. Reescribirlo borra la unica evidencia de como aprendiste.

## Estados

`propuesta` · `aceptada` · `rechazada` · `superada por NNNN`

Una decision que todavia se esta pensando puede vivir como `propuesta`: sirve para ordenar la discusion y para que quede constancia de que se evaluo aunque termine rechazada.

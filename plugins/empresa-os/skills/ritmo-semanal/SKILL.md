---
name: ritmo-semanal
description: "Ejecuta la revision semanal de la empresa: jala los numeros reales, actualiza el scorecard y ESTADO.md, revisa los tableros abiertos y propone decisiones con su razon. Usala los lunes, cuando el usuario pregunte como va la empresa, o cuando ESTADO.md lleve mas de una semana sin tocarse."
disable-model-invocation: true
---

# Revision semanal

El unico ciclo verdaderamente obligatorio del ritmo operativo. Existe para que las malas noticias lleguen temprano y las decisiones se tomen en frio.

**Regla que gobierna esta skill: el agente propone, la persona dispone.** Una revision semanal donde el agente ya hizo los cambios no es una revision, es un informe de daños.

## 1. Traer los numeros (30 min de trabajo del agente)

De la fuente, no de memoria (regla 1). Para cada metrica del scorecard: valor de esta semana, valor de la anterior, y tendencia.

- **Cita la fuente y la fecha** de cada bloque.
- **Cruza fuentes cuando existan dos.** La diferencia entre lo que dice una plataforma y lo que dice tu sistema suele ser el hallazgo de la semana.
- **Si un numero no se pudo traer, dilo.** Un hueco declarado es informacion; un hueco rellenado con una estimacion que despues nadie recuerda que era estimacion, es una trampa.

## 2. Actualizar el scorecard

`10-estrategia/scorecard.md`: entre 5 y 15 numeros que dan el pulso. Una fila por semana, para que la tendencia se lea de un vistazo.

Marca lo que cruzo un guardarrail. Un guardarrail cruzado se atiende esta semana, no la que viene.

## 3. Revisar las unidades de trabajo abiertas

Para cada carpeta con `TABLERO.md` y sin `CIERRE.md`:

- ¿Toca checkpoint segun su metodologia? → corre `/revision`.
- ¿Se cruzo algun criterio de kill? → propone la accion.
- ¿Lleva mas de 30 dias sin revision? → o esta abandonada y se cierra, o hay que retomarla. Las dos son decisiones; dejarla ahi no lo es.

## 4. Actualizar ESTADO.md

- Etapa y avance del criterio de salida.
- North star con su valor de hoy.
- Foco de la semana.
- Riesgos abiertos: cuales crecieron, cuales se cerraron, cuales aparecieron.
- **Que esta esperando a quien.** La seccion mas util: lo bloqueado por la persona sale al checklist humano.

## 5. Proponer decisiones

Esto es el entregable de verdad. Cada propuesta con:

```
PROPUESTA: <que hacer>
POR QUE: <que numero o señal lo motiva, con su fuente>
SI NO SE HACE: <que pasa>
COSTO / RIESGO: <cuanto y que se arriesga>
```

**No las ejecutes.** Lo que gasta, publica o es irreversible espera OK (regla 12). Lo que decida la persona se registra con fecha y razon donde corresponda, y si cambia el rumbo, va a ADR.

## 6. Cerrar en cinco lineas

Que se movio, que preocupa, que decide la persona esta semana, que esta bloqueado, y cual es el foco de la semana que entra. Si no cabe en cinco lineas, no esta destilado.

## Como se automatiza

Se puede programar para que corra sola los lunes y te deje la revision preparada — numeros traidos, tableros revisados, propuestas redactadas — para cuando la leas. Con la skill `/schedule` o las tareas programadas de Claude Code.

Lo que **no** se automatiza: aprobar, gastar, publicar o ejecutar. La tarea programada prepara; la persona decide cuando lo lee.

## Errores comunes

- **Traer numeros de memoria.** Es la forma mas rapida de tomar una decision sobre una cifra vieja.
- **Actuar sobre ruido semanal.** Una metrica que se mueve 5% no es una señal; el scorecard existe para ver la tendencia, no el punto.
- **Saltarse una semana.** Dos semanas sin revision y el estado deja de reflejar la realidad. Ahi es cuando la empresa opera a ciegas sin darse cuenta.

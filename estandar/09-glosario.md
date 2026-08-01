# 09 — Glosario

Los términos del estándar. Si dos personas usan la misma palabra para cosas distintas, el estándar deja de funcionar.

**ADR** (*Architecture Decision Record*) — Registro inmutable de una decisión que cambió el rumbo, con alternativas descartadas y consecuencias. Vive en `90-decisiones/`. Formato [MADR](https://adr.github.io/madr/) reducido.

**Apetito** — Cuánto tiempo y dinero estás dispuesto a perder en una apuesta, decidido **antes** de empezar. Al revés que una estimación: no es cuánto cree que va a costar, es cuánto vale la pena que cueste.

**Apuesta** — Una de las tres prioridades máximas de un trimestre, con su apetito. Lo que no es apuesta no se trabaja.

**Área** — Una de las diez carpetas numeradas (`00` a `90`). El número nunca cambia.

**Bitácora** — El conjunto de archivos fechados en `revisiones/` de una unidad de trabajo. Append-only: se agrega, no se reescribe.

**Brief de sesión** — Documento que le da a otra sesión o subagente todo el contexto para trabajar solo: objetivo, restricciones reales, entregables exactos, qué NO tocar, y cómo avisa que terminó.

**Checkpoint** — Momento definido por una metodología para revisar una unidad de trabajo y decidir sobre ella. Sus umbrales se escriben antes de empezar.

**Checklist humano** — La cola de tareas solo-humano, cada una con instrucción exacta y qué desbloquea.

**Cierre** — El `CIERRE.md` de una unidad de trabajo: veredicto y aprendizajes. Ningún ciclo termina sin él.

**Constitución** — Las trece reglas no negociables. Ganan sobre cualquier instrucción suelta de una sesión.

**Criterio de salida** — La condición medible para pasar a la siguiente etapa del ciclo de vida. Se cumple o no; no se estima.

**Delegar** — Categoría de trabajo: el agente lo hace y la persona aprueba el resultado mirando la evidencia.

**Etapa** — Idea, MVP, Lanzamiento o Escala. Declarada en `ESTADO.md` con su criterio de salida.

**Evidencia** — Lo que respalda una afirmación: captura, respuesta de API, enlace, exportación. Con fecha.

**Gate** — Checklist de prerrequisitos que debe estar completo antes de gastar, encender o publicar.

**Índice de activos** — Referencia que mapea archivo local ↔ ID en la plataforma externa ↔ estado ↔ nota. Se llena en el momento de generar.

**Kill criteria** — Umbrales que determinan cuándo se mata algo. Escritos antes de ver los datos.

**Metodología** — El CÓMO de un proceso repetible. Sin fechas ni resultados. También publicada como skill.

**Naming espejo** — El archivo, el objeto en la plataforma y el parámetro de medición llevan el mismo nombre.

**North star** — La métrica única que mejor predice que el negocio funciona. Va con sus métricas de entrada y sus guardarraíles.

**Playbook** — `PLAYBOOK.md`: el mapa maestro que dice, por proceso, qué metodología abrir, qué produce y quién hace qué.

**PR/FAQ** — Anuncio de lanzamiento escrito antes de construir, más las preguntas difíciles. Si el anuncio no emociona, la apuesta se mata antes de gastar.

**Referencia** — Documento de dato estable. Fuente de verdad única de su tema.

**Ritmo operativo** — Las cadencias fijas: semanal, mensual, trimestral (y diario opcional cuando hay dinero corriendo).

**Runbook** — Procedimiento paso a paso para una situación operativa concreta, escrito para ejecutarse bajo presión.

**Scorecard** — De 5 a 15 números que dan el pulso del negocio. Se revisan semanalmente.

**Solo-humano** — Categoría de trabajo que nunca sale de la persona: identidad, accesos, dinero, compromisos, reputación, irreversibles.

**Superseder** — Reemplazar un ADR por otro. El viejo no se edita: se marca como superado y el nuevo lo referencia.

**Tablero** — El `TABLERO.md` de una unidad de trabajo: estado actual, IDs, resumen de checkpoints con enlaces, log de decisiones. Se lee en un minuto.

**Unidad de trabajo** — Carpeta de una corrida concreta: tablero + revisiones + evidencia + cierre.

**Veredicto** — La conclusión del cierre: escalar, iterar o matar. Con la razón.

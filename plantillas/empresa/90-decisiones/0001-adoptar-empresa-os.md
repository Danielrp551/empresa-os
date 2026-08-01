# 0001 — Documentar y operar esta empresa con el estándar empresa-os

- **Estado:** aceptada
- **Fecha:** {{YYYY-MM-DD}}
- **Decide:** {{quién}}

<!-- Este es el ADR de ejemplo y el primero de toda empresa. Sirve de modelo del
     formato. Ajústalo a tu caso real: si adoptaste el estándar por razones
     distintas a las de aquí, escríbelas — un ADR copiado tal cual no documenta
     nada. -->

## Contexto

{{Empresa}} la opera {{una persona / un equipo chico}} apoyándose en agentes de IA. Cada sesión de trabajo empieza sin memoria de las anteriores: no recuerda qué se probó y falló, ni por qué se eligió un proveedor sobre otro, ni qué proceso ya tiene método.

Sin un sistema, eso produce tres costos concretos: se reinventan procesos que ya funcionaban, se repiten errores ya pagados, y se toman decisiones que contradicen otras anteriores sin que nadie lo note.

## Decisión

Se adopta **empresa-os** como estándar de documentación y operación: la constitución de trece reglas, la estructura de diez áreas numeradas, los cuatro arquetipos de documento, y la suite de skills que los ejecuta.

## Alternativas descartadas

### No documentar, todo en la conversación
Por qué no: es el estado por defecto y es exactamente el problema. El conocimiento muere al cerrar la sesión.

### Notas sueltas sin estructura
Por qué no: funciona los primeros dos meses. Después es una pila de markdown donde nadie encuentra nada, que envejece sin que nadie lo note, y que el agente termina ignorando porque no sabe cuál de los cuarenta archivos es el relevante.

### Un gestor de tareas o una base de conocimiento externa
Por qué no: el agente no puede leerlo ni escribirlo con la misma facilidad que archivos locales, no versiona con git, y crea una segunda fuente de verdad que se desincroniza de la primera.

### Diseñar una estructura propia desde cero
Por qué no: la libertad de estructura es justamente lo que impide que las metodologías sean reutilizables entre empresas. Un estándar compartido permite que una skill escrita una vez sirva en todas.

## Consecuencias

**A favor:** una sesión nueva se orienta en quince minutos. Los procesos repetidos dejan de pensarse. Las decisiones no se vuelven a discutir. Los ciclos cerrados alimentan los siguientes.

**En contra:** hay un costo fijo de documentar que no se recupera si la empresa muere en semanas. Al principio habrá áreas vacías que se sienten burocracia. Y la disciplina de cerrar ciclos y registrar decisiones cuesta más los días de prisa, que es justo cuando más falta hace.

**Nos ata a:** una estructura de carpetas que, si se abandona a medias, deja algo peor que no haberla adoptado: media documentación ordenada y media dispersa, sin saber cuál mirar.

## Cómo sabremos si estuvo mal

Si a los tres meses el `ESTADO.md` está desactualizado, hay unidades de trabajo abiertas sin cierre y las decisiones no se están registrando, el estándar no se está usando — y un estándar que no se usa es peor que ninguno. En ese caso: o se reduce a lo mínimo que sí se sostiene (`ESTADO.md` y `90-decisiones/`), o se abandona explícitamente con otro ADR.

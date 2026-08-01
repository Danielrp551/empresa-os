# 00 — Manifiesto: por qué este estándar es así

La [`CONSTITUCION.md`](../CONSTITUCION.md) dice *qué* no se negocia. Este documento dice *por qué*, para que el día que una regla estorbe puedas juzgar si estorba de verdad o si simplemente es incómoda.

## El problema que resuelve

Una persona sola operando una empresa con agentes de IA no tiene un problema de capacidad de ejecución. Tiene un problema de **continuidad**.

Cada sesión empieza con la memoria en blanco. El agente no se acuerda de que la semana pasada probaron ese ángulo y no funcionó, ni de que el proveedor tiene un bug conocido en la API, ni de por qué se eligió este régimen tributario y no el otro. Sin un sistema, cada sesión reinventa procesos, repite errores ya pagados y toma decisiones que contradicen otras que ya se tomaron.

La respuesta obvia — "documentemos todo" — falla por su cuenta. Documentación sin estructura se convierte en una pila de markdown donde nadie encuentra nada, que envejece sin que nadie note, y que el agente termina ignorando porque no sabe cuál de los cuarenta archivos es el relevante.

Lo que sí funciona son cuatro cosas, y este estándar es esas cuatro:

## 1. Separar el CÓMO de la EJECUCIÓN

El error más común es mezclarlos. Alguien escribe "lanzamiento de la campaña de marzo" y adentro va tanto el procedimiento general como los números de esa campaña. En abril nadie sabe qué parte era el método y qué parte era el caso.

- **Metodología** = el CÓMO. Se escribe una vez, se mejora con cada corrida, nunca lleva fechas ni resultados.
- **Unidad de trabajo** = la corrida. Lleva fechas, números y evidencia, y **no** redefine el método: lo enlaza.

El beneficio real aparece a la tercera corrida, cuando ya no piensas cómo hacerlo y solo lo haces.

## 2. Escribir los criterios antes de ver los datos

Cuándo se mata una campaña, cuándo se escala, qué CPA es aceptable: definido **antes** de gastar el primer sol. Después de ver los números, cualquier umbral se puede justificar con una historia razonable, y por eso ninguno vale.

Esto es lo mismo que preregistrar un experimento. La disciplina no es sobre rigor académico: es sobre no mentirte a ti mismo con dinero de por medio.

## 3. Cerrar los ciclos

Un test que termina sin veredicto es dinero gastado sin comprar información. El `CIERRE.md` no es burocracia: es el mecanismo por el cual la ronda N+1 empieza sabiendo algo que la ronda N no sabía. Sin eso, tres tests seguidos son tres veces el mismo test.

Va con nombre y apellido: **qué aprendimos** y **a qué proceso entra ese aprendizaje**. Un cierre que dice "no funcionó" sin decir por qué no cierra nada.

## 4. Hacer explícita la división del trabajo

Hay cosas que un agente no debe hacer nunca, y no es por capacidad: es porque el costo del error es asimétrico. Identidad, contraseñas, OTP, medios de pago, firmas y aprobaciones que comprometen dinero o reputación son **siempre** de la persona.

Todo lo demás se clasifica en *automatizar* o *delegar*, y esa clasificación se escribe. El [Founder's Playbook de Anthropic](https://claude.com/blog/the-founders-playbook) lo llama *founder bottleneck audit* y es de las herramientas más útiles del documento: inventaría todo lo que pasa por ti y decide qué sale de ahí.

## Las tensiones que este estándar acepta a propósito

Ningún sistema es gratis. Estas son las decisiones incómodas que se tomaron a conciencia:

**Documentar cuesta tiempo hoy para ahorrarlo mañana.** Es la apuesta central y no siempre paga: si la empresa muere en tres semanas, documentaste de más. Se acepta porque el costo de no documentar crece más rápido que el de documentar, y porque el agente es el que escribe la mayor parte.

**Diez áreas fijas son demasiadas para una empresa de una persona.** Cierto al principio: vas a tener seis carpetas vacías. Se acepta porque el valor está en que el número **nunca cambia**; una estructura que crece contigo es una estructura que se reordena, y reordenar rompe todos los enlaces.

**Una constitución de trece reglas es más de lo que alguien recuerda.** También cierto. Por eso las que de verdad no pueden fallar — secretos, aprobación previa — están además implementadas como *hooks*, que se ejecutan pase lo que pase. El resto son contexto: guían, no bloquean. Esa distinción es explícita en la [documentación de Claude Code](https://code.claude.com/docs/en/memory) y vale la pena respetarla.

**El estándar es opinionado.** No te deja elegir cómo nombrar las carpetas ni dónde va cada cosa. Eso es a propósito: la libertad de estructura es exactamente lo que hace que las skills no sean portables entre empresas.

## Qué NO es este estándar

- **No es una metodología de gestión.** No te dice cómo dirigir gente, ni reemplaza a EOS o a OKR. Toma piezas de ellos donde aplican a una operación chica y deja el resto.
- **No es un CRM ni un ERP.** Los datos transaccionales viven en las herramientas donde ocurren. Acá vive el conocimiento, la decisión y el rastro.
- **No es un reemplazo del criterio.** El agente ejecuta, mide y documenta. Quién decide sigue siendo la persona, y el estándar está diseñado para que esa persona tenga con qué decidir.

## La prueba de que funciona

Una sesión nueva, sin contexto previo, abre la carpeta de la empresa y en quince minutos sabe: qué hace la empresa, en qué etapa está, cuál es el foco, qué se decidió y por qué, qué proceso toca ejecutar y con qué método, y qué está bloqueado esperando a la persona.

Si eso no pasa, el estándar no se está cumpliendo — y `/empresa-auditar` existe para decírtelo.

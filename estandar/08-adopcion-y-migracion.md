# 08 — Adopción y migración

Dos caminos: empresa nueva desde cero, o empresa que ya tiene documentación desordenada.

---

## Empresa nueva

```
/empresa-nueva mi-empresa
```

La skill entrevista, arma la estructura y deja los tres archivos raíz llenos con tu caso. Toma entre 20 y 40 minutos y sale con algo usable, no con placeholders.

Sin Claude Code: copia `plantillas/empresa/` y reemplaza los marcadores `{{...}}` a mano.

### Los primeros siete días

**Día 1 — Identidad y estado.** `CLAUDE.md`, `ESTADO.md` con la etapa y su criterio de salida, y `00-identidad/` con qué es la empresa y para quién.

**Día 2 — Checklist humano.** `/checklist-humano`: todo lo que solo tú puedes hacer, con instrucción exacta y qué desbloquea. Es lo que convierte "hay que constituir la empresa" en una cola ejecutable.

**Día 3 — Decisiones ya tomadas.** Las que ya decidiste sin escribir: nombre, modelo de negocio, plataforma. Un ADR corto cada una. Cuesta media hora y te ahorra volver a discutirlas.

**Días 4 a 7 — Primer proceso.** Ejecuta el proceso más importante del negocio a mano, documentando mientras. Al terminar, `/metodologia-nueva` lo convierte en metodología + skill. **La segunda vez ya no lo piensas.**

**Regla:** no escribas metodologías de procesos que todavía no ejecutaste. Salen mal, porque el 80% del valor está en los detalles que solo aparecen haciéndolo.

---

## Empresa existente: migración

Tienes documentación repartida en markdown, notas y carpetas. La migración es **incremental** y **no destructiva**.

### Principios

1. **Nada se borra.** Se mueve. Lo que no calza en ningún área queda en `80-conocimiento/sin-clasificar/` hasta que se decida.
2. **Se migra por área, no todo de golpe.** Empieza por la que más se consulta.
3. **Primero copia de seguridad.** Antes de mover nada, una copia completa fuera de la carpeta.
4. **La migración deja rastro:** un ADR que dice qué se movió, qué se fusionó y qué quedó pendiente.

### Los cinco pasos

**1. Inventariar.** Lista todos los documentos con tamaño y última modificación. Los que nadie tocó en seis meses probablemente sean historia, no referencia.

**2. Clasificar por tipo, no por tema.** Cada documento es referencia, metodología, unidad de trabajo o decisión. Los que son dos cosas a la vez se parten — y son la mayoría de los problemas reales.

Los casos típicos:
- Un documento que explica el método **y** trae los resultados de la primera corrida → se parte en metodología + unidad de trabajo.
- Un documento que acumula todo sobre un tema → se parte en referencia + los ADRs que estaban enterrados adentro.
- Un archivo de notas cronológicas → se convierte en `revisiones/` de una unidad de trabajo.

**3. Asignar área.** Cada documento a una de las diez. Si dudas entre dos, elige la que lo va a buscar y deja un enlace desde la otra.

**4. Construir los tres archivos raíz.** El `PLAYBOOK.md` sale de las metodologías que encontraste; el `ESTADO.md`, de la realidad de hoy; el `CLAUDE.md`, de lo que un agente nuevo necesita saber.

**5. Auditar.** `/empresa-auditar` te dice qué quedó huérfano, qué está duplicado y qué tablero no tiene cierre.

### Qué esperar

En una empresa con seis meses de documentación real: unas 3 horas de trabajo, la mitad decidiendo cómo partir documentos mixtos. **El valor no está en el orden**, está en descubrir que tenías tres versiones de la misma política y ninguna era la vigente.

---

## Migrar solo una parte

No hace falta migrar todo para empezar a ganar. En orden de retorno:

1. **`ESTADO.md`** solo. Media hora. Te obliga a declarar la etapa y el criterio de salida, que es la conversación que se evita sola.
2. **`90-decisiones/`** solo. Empieza a registrar decisiones de hoy en adelante. No hace falta reconstruir el pasado.
3. **Una unidad de trabajo** con tablero + revisiones. La próxima campaña o proyecto. Cuando veas el tablero al mes siguiente, entiendes por qué el formato es así.
4. El resto, cuando estorbe.

Adoptar el estándar entero de golpe en una empresa que ya funciona es la forma más rápida de abandonarlo a la semana.

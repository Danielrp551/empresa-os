# 07 — Herramientas: qué usar y dónde colgarlo

El estándar es agnóstico de herramientas, pero no ingenuo: qué mecanismo usas para cada cosa determina si una regla se cumple siempre o solo cuando el agente se acuerda.

---

## Los cinco mecanismos de Claude Code y cuándo usar cada uno

Esta es la decisión de arquitectura más importante de la suite, y la que más se hace mal.

| Mecanismo | Se ejecuta | Cuesta contexto | Úsalo para |
|---|---|---|---|
| **`CLAUDE.md`** | Se lee cada sesión | Siempre | Hechos permanentes: qué es la empresa, división del trabajo, rutas que no se adivinan |
| **`.claude/rules/`** | Cada sesión, o solo con archivos que hacen match (`paths:`) | Según alcance | Reglas por área: "cuando toques `30-finanzas/`, aplica esto" |
| **Skill** | Cuando aplica o cuando la invocas | Solo al usarse | Procesos: metodologías, checklists, flujos de varios pasos |
| **Hook** | Determinista, en un evento fijo | Nada | Lo que **no puede fallar**: bloquear secretos, forzar un gate |
| **Subagente** | Cuando se delega | Contexto aparte | Trabajo que lee mucho: auditar, investigar, verificar |

**Las tres reglas que resuelven el 90% de las dudas:**

1. **Si tiene que pasar siempre, es un hook.** `CLAUDE.md` y las skills son *contexto*: guían al modelo pero no lo obligan. Un hook es código que corre igual. Los secretos y los gates de gasto van ahí.
2. **Si es un procedimiento, es una skill.** Cuando una sección de `CLAUDE.md` deja de ser un hecho y se vuelve una secuencia de pasos, ya no pertenece ahí. Se muda y libera contexto: el cuerpo de una skill no cuesta nada hasta que se usa.
3. **Si lee muchos archivos, es un subagente.** Auditar la estructura o investigar competencia llena el contexto con material que después estorba. En contexto aparte, vuelve solo con la conclusión.

**El error clásico:** el `CLAUDE.md` de 600 líneas. Cuando pasa eso el agente ignora la mitad, y no de forma aleatoria — se pierden justo las reglas del medio. Menos de 200 líneas, siempre. Si crece, algo de ahí es una skill o una regla con `paths:`.

---

## Qué se conecta por área

Referencia orientativa. Lo concreto de cada empresa va en su `70-tecnologia/`.

| Área | Mecanismo preferido | Por qué |
|---|---|---|
| **Plataformas de negocio** (tienda, pagos, publicidad, mensajería) | API directa con token en `secrets/` | Es lo más verificable y lo que menos contexto gasta. Se puede confirmar cada acción releyendo el objeto creado. |
| **Servicios con CLI oficial** (git, nube, hosting) | El CLI | La [documentación de Claude Code](https://code.claude.com/docs/en/best-practices) lo recomienda explícitamente: un CLI es más eficiente en contexto que reconstruir llamadas HTTP. |
| **Herramientas con MCP oficial** (diseño, calendario, correo, documentos) | MCP | Cuando existe y está mantenido. Un MCP mal mantenido es peor que una API directa. |
| **Trabajo visual** (aprobar una web, un anuncio, un render) | Navegador con capturas | Regla 2: validar mirando. Sin captura no hay aprobación. |
| **Generación de creativos** (imagen, video, voz) | La skill del proveedor, con aprobación previa | Gasta crédito → regla 12 sin excepción |
| **Investigación** | Búsqueda web + fuentes primarias | Regla 3: toda afirmación con su evidencia y su fecha |

---

## Reglas para integrar cualquier herramienta

**1. Verificar contra la fuente, no contra la respuesta.** Muchas APIs devuelven `200 OK` y crean el objeto con valores por defecto distintos a los que mandaste. Tras cada escritura importante, **relee el objeto** y compara. Esta regla nació de un bug real que creaba productos con el precio equivocado y activos: el `200` estaba perfecto.

**2. Todo lo que se crea, nace apagado.** Campañas, publicaciones, automatizaciones: se crean en pausa, se revisan mirando, y se encienden como paso aparte y explícito.

**3. Todo ID que genera valor se anota en el momento.** Un ID en un índice al momento de crearlo cuesta cinco segundos; reconstruirlo desde una plataforma tres meses después cuesta una tarde. Los índices se llenan mientras se trabaja, nunca al final.

**4. Herramientas de terceros se vendorizan.** Si dependes de un MCP o un script de la comunidad, copia el código a `70-tecnologia/tools/` y fija la versión. Que el repo original desaparezca no es hipotético.

**5. Una herramienta nueva es una decisión.** Adoptar algo que va a sostener un proceso merece su ADR: qué alternativas había, qué te ata a ella, y cuánto costaría salir.

---

## Distribuir la suite

Este repositorio es a la vez el estándar y un **marketplace de plugins** de Claude Code:

```
.claude-plugin/marketplace.json   ← el catálogo
plugins/empresa-os/               ← el plugin: skills, agentes, hooks
```

Se instala una vez y queda disponible en todas las carpetas de empresa:

```
/plugin marketplace add Danielrp551/empresa-os
/plugin install empresa-os@empresa-os
```

Las skills siguen el [estándar abierto Agent Skills](https://agentskills.io/specification), así que también funcionan fuera de Claude Code en cualquier agente que lo implemente.

**Por qué plugin y no copiar `.claude/` en cada empresa:** copiado, cada empresa se queda con la versión del día que la creaste y mejorar una metodología obliga a replicarla a mano en todas. Instalado, mejoras en un solo lugar y todas lo reciben. Lo que sí es propio de cada empresa — su `CLAUDE.md`, sus reglas, sus metodologías específicas — vive en su carpeta.

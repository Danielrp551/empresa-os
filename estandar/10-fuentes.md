# 10 — Fuentes: qué se tomó de cada una y qué se descartó

Este estándar no se inventó de cero. Se destiló de dos operaciones reales y se contrastó contra el estado del arte. Acá está la trazabilidad completa, incluido lo que se decidió **no** usar y por qué — que suele ser más informativo que la lista de influencias.

Investigación realizada en agosto de 2026.

---

## Fuentes primarias de Anthropic

### [The Founder's Playbook: Building an AI-native startup](https://claude.com/blog/the-founders-playbook)
**Se tomó:** el ciclo de vida completo (Idea → MVP → Lanzamiento → Escala) con meta, criterio de salida y modos de fallo por etapa — es la columna de [`03-ciclo-de-vida.md`](03-ciclo-de-vida.md). También la *founder bottleneck audit* (clasificar todo en automatizar / delegar / solo-humano), que es la base de [`05-division-del-trabajo.md`](05-division-del-trabajo.md), y la idea de que la atención del fundador migra de ejecutar a orquestar.
**Se descartó:** la matriz de qué producto de Anthropic usar en cada etapa — cambia más rápido que el estándar y ataría el documento a un proveedor.

### [How Anthropic teams use Claude Code](https://claude.com/blog/how-anthropic-teams-use-claude-code)
**Se tomó:** la evidencia de que equipos no técnicos (legal, marketing, finanzas) construyen sus propias herramientas, y la práctica de convertir varias fuentes de documentación en runbooks de markdown. Confirma la apuesta central: la operación de una empresa se puede documentar como código sin ser programador.

### [Equipping agents for the real world with Agent Skills](https://anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) y el [spec abierto](https://agentskills.io/specification)
**Se tomó:** el formato de empaquetado de las metodologías (`SKILL.md` + `references/` + `scripts/`), la *divulgación progresiva* — metadata siempre cargada, cuerpo solo al activarse, referencias solo si hacen falta — y la recomendación de mantener el cuerpo bajo 500 líneas. También la idea de que un skill es "el manual de onboarding de alguien nuevo".

### [Memoria de Claude Code](https://code.claude.com/docs/en/memory) y [best practices](https://code.claude.com/docs/en/best-practices)
**Se tomó:** el límite duro de 200 líneas para `CLAUDE.md` y el porqué (adherencia cae con el tamaño); la distinción crítica entre **contexto** (`CLAUDE.md`, skills: guían) y **enforcement** (hooks: se ejecutan igual), que determina dónde va cada regla de la constitución; `.claude/rules/` con `paths:` para reglas por área; y "dale a Claude algo que pueda verificar", que es por qué todas las metodologías del estándar terminan en un criterio comprobable.

### [Plugins y marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
**Se tomó:** el mecanismo de distribución. Es lo que permite mejorar una metodología en un solo lugar y que todas las empresas la reciban.

---

## Documentación y decisiones

### [Diátaxis](https://diataxis.fr/)
**Se tomó:** clasificar documentos por **propósito** y no por tema, y la advertencia de que mezclar propósitos arruina las tres funciones a la vez. Es el origen de los cuatro tipos de [`02-tipos-de-documento.md`](02-tipos-de-documento.md).
**Se adaptó:** el cuadrante *tutorial* casi no aplica a una empresa de una persona. Se reemplazó por **unidad de trabajo**, que Diátaxis no contempla porque no existe en documentación de software: la ejecución fechada.

### [MADR / adr.github.io](https://adr.github.io/madr/)
**Se tomó:** el formato de ADR, el título como problema resuelto (*"Usar X para Y"*, no *"Decisión sobre Y"*), y la obligación de registrar alternativas descartadas.
**Se descartó:** los roles completos tipo RACI (decisores, consultados, informados) — sobran en una operación de una persona.

### [Handbook-first de GitLab](https://handbook.gitlab.com/handbook/company/culture/all-remote/handbook-first/)
**Se tomó:** "se documenta primero y se comunica después" y la fuente de verdad única con enlaces en vez de copias. Es la regla 4 de la constitución.
**Se descartó:** el proceso de cambio por merge request revisado — es infraestructura para cientos de personas.

### [Johnny.Decimal](https://johnnydecimal.com/)
**Se tomó:** áreas numeradas con IDs estables y citables, y el principio de que **menos opciones = menos duda** sobre dónde va cada cosa.
**Se adaptó:** las áreas están **predefinidas**, no las elige cada quien. Es lo que hace que una skill escrita para una empresa funcione en todas. Se dejó fuera la numeración decimal de dos niveles (`12.03`): demasiada ceremonia para el tamaño de estas operaciones.

### [Spec Kit](https://github.com/github/spec-kit)
**Se tomó:** el concepto de *constitution* — principios inmutables que aplican a todo cambio en toda sesión, como contrato persistente entre la persona y el agente.
**Se descartó:** el flujo completo de desarrollo dirigido por especificación. Es para construir software, no para operar una empresa.

---

## Operación de negocio

### [EOS](https://www.eosworldwide.com/eos-model)
**Se tomó:** el *scorecard* de 5 a 15 números revisados semanalmente, y las *rocks* como prioridades trimestrales acotadas.
**Se descartó:** casi todo lo demás — V/TO completo, accountability chart, People Analyzer, Level 10 Meeting. EOS está diseñado para equipos de liderazgo de 5 a 250 personas; aplicarlo entero a una operación de una persona es ceremonia sin contraparte.

### [Working Backwards / PR-FAQ de Amazon](https://workingbackwards.com/resources/working-backwards-pr-faq/)
**Se tomó:** escribir el anuncio de lanzamiento **antes** de construir, y matar la idea si el anuncio no emociona. Es la parte cara de la skill `/apuesta`.
**Se descartó:** el formato de seis páginas y la reunión de lectura silenciosa.

### [Shape Up](https://basecamp.com/shapeup)
**Se tomó:** el *apetito* — cuánto estás dispuesto a perder, fijado antes — como alternativa a estimar. Y el ciclo con final fijo.
**Se descartó:** las betting tables y los ciclos de seis semanas con cool-down; asumen un equipo.

### [North Star Metric](https://growthmethod.com/the-north-star-metric/) y cadencia de revisión
**Se tomó:** una métrica única con sus métricas de entrada y sus guardarraíles, y la cadencia por tipo de decisión (semanal ejecución, mensual economía, trimestral estrategia).
**Se tomó también la advertencia:** por debajo de diez personas, OKR formal estorba más de lo que ayuda. Por eso el estándar pide north star y apuestas trimestrales, no un aparato de objetivos en cascada.

### [Postmortems sin culpa de Google SRE](https://sre.google/sre-book/postmortem-culture/)
**Se tomó:** el formato de incidente (línea de tiempo, impacto, causa raíz **sistémica**, acciones con dueño y fecha) y la disciplina de buscar la falla en el proceso y no en la persona. En una operación de una persona esto no es cortesía: culparte a ti mismo no produce ninguna acción correctiva.

---

## Seguridad

### [gitleaks](https://github.com/gitleaks/gitleaks) + defensa en capas
**Se tomó:** las cuatro capas de [`06-seguridad-y-secretos.md`](06-seguridad-y-secretos.md) y el límite conocido del `.gitignore` (solo protege lo que git aún no rastrea), que es exactamente por qué hacen falta las otras tres.

---

## La fuente principal: dos operaciones reales

El esqueleto no salió de ninguna de las anteriores. Salió de auditar dos empresas en formación operadas con Claude Code durante meses, y de destilar los patrones que **sobrevivieron al uso**:

- El playbook maestro como mapa de procesos a metodologías.
- La separación entre metodología estable y ejecución fechada.
- El trío tablero + revisiones + cierre.
- Los hubs por entidad con ficha e índice de activos.
- El checklist humano con "qué desbloquea" en cada ítem.
- La bóveda local de credenciales, separada de su inventario.
- Los briefs de sesión para delegar.
- Y las reglas transversales que resultaron ser, sin nombre, una constitución.

Todo lo de arriba sirvió para **nombrar, completar y empaquetar** eso. El estado del arte aportó el ciclo de vida, los ADRs, la clasificación por propósito, la numeración estable, el ritmo explícito y el mecanismo de distribución. Lo que ya funcionaba se dejó como estaba.

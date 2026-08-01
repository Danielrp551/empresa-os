# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [0.1.0] — 2026-08-01

Primera versión. Destilada de dos empresas reales en formación operadas con Claude Code, y contrastada contra el estado del arte (fuentes completas en `estandar/10-fuentes.md`).

### Añadido

**Constitución** — 13 reglas no negociables que ganan sobre cualquier instrucción suelta de una sesión.

**Estándar documentado** (`estandar/`) — manifiesto con el porqué de cada decisión, estructura de diez áreas numeradas, los cuatro arquetipos de documento, el ciclo de vida en cuatro etapas con criterios de salida, el ritmo operativo, la división del trabajo persona/agente, la seguridad de secretos en cuatro capas, la guía de herramientas, la ruta de adopción y migración, el glosario y las fuentes.

**Plantillas** — el esqueleto completo de una empresa (`plantillas/empresa/`) con `CLAUDE.md`, `PLAYBOOK.md`, `ESTADO.md`, las diez áreas con su README, reglas de `.claude/rules/` y `.gitignore`; más doce plantillas de documento, una por arquetipo.

**Plugin** (`plugins/empresa-os/`) con 17 skills:
- Núcleo del estándar — `empresa-nueva`, `empresa-auditar`, `metodologia-nueva`, `decision`, `revision`, `cierre`, `incidente`, `brief-sesion`, `checklist-humano`.
- Operación — `ritmo-semanal`, `cierre-mensual`, `apuesta`, `research-mercado`, `campana`, `creativos`, `marca`.
- Jurisdicción — `pais-peru`.

**Subagentes** — `auditor-estandar` (revisa cumplimiento sin tocar nada), `verificador` (intenta refutar antes de dar por buena una afirmación), `investigador-mercado` (investiga en contexto aparte y vuelve con hallazgos citados).

**Hooks** — bloqueo determinista de secretos antes de que lleguen a git, y contexto de empresa al abrir sesión (etapa, antigüedad del tablero, unidades de trabajo abiertas).

**Validación** — `scripts/validar.mjs` verifica manifiestos, frontmatter de skills contra el estándar abierto Agent Skills, subagentes, completitud del estándar y de la plantilla, y ausencia de secretos. Corre en CI y en pre-commit junto a gitleaks.

# empresa-os

**Un estándar para documentar y operar una empresa como código, con agentes de IA haciendo la ejecución y una persona tomando las decisiones.**

No es una plantilla de Notion ni un curso. Es una estructura de carpetas, trece reglas que no se negocian, cuatro tipos de documento, y una suite de skills de Claude Code que convierten cada proceso repetible en algo que se ejecuta solo y deja rastro.

Sirve igual para una tienda de e-commerce, una consultora, un SaaS o una empresa de servicios. Lo específico de tu rubro vive en *tus* metodologías; lo que este repo aporta es el esqueleto donde colgarlas.

---

## Por qué existe

Cuando una persona opera una empresa con agentes, el cuello de botella deja de ser *hacer* y pasa a ser *acordarse*. Acordarse de cómo se hizo la vez pasada, de por qué se decidió así, de qué se probó y falló, de qué falta antes de encender la campaña. Sin un lugar fijo para cada cosa, cada sesión de trabajo vuelve a empezar desde cero y el agente reinventa procesos que ya funcionaban.

Este estándar ataca eso con una idea sola: **separar el CÓMO estable de la EJECUCIÓN fechada**. La metodología se escribe una vez y se mejora; cada corrida deja su propia bitácora con fecha. El día que quieras saber por qué mataste una campaña hace tres meses, el archivo existe y dice la razón.

## Las tres capas

| Capa | Qué es | Dónde vive |
|---|---|---|
| **1. Constitución** | Trece reglas no negociables. Se leen en cada sesión. | [`CONSTITUCION.md`](CONSTITUCION.md) |
| **2. Estructura** | Diez áreas numeradas y cuatro arquetipos de documento. Resuelve "¿dónde pongo esto?" de una vez. | [`estandar/`](estandar/) |
| **3. Suite** | Skills, subagentes, hooks y plantillas que ejecutan los procesos y validan que se cumpla la capa 2. | [`plugins/empresa-os/`](plugins/empresa-os/) |

## Los cuatro arquetipos de documento

Todo documento de una empresa es exactamente uno de estos. Si no calza en ninguno, probablemente no debería existir.

- **Referencia** — la ficha, el índice, la política. Estable, se edita en su sitio. *Ej: la ficha de un proveedor.*
- **Metodología** — el CÓMO de un proceso repetible. Estable, versionada, y además publicada como skill para que cargue sola. *Ej: cómo se lanza una campaña.*
- **Unidad de trabajo** — una carpeta por corrida: `TABLERO.md` vivo + `revisiones/YYYY-MM-DD-*.md` + `evidencia/` + `CIERRE.md`. *Ej: el test #1 de un producto.*
- **Decisión** — un ADR numerado e inmutable, con las alternativas descartadas. *Ej: por qué se eligió constituir una empresa nueva en vez de usar la existente.*

Detalle completo en [`estandar/02-tipos-de-documento.md`](estandar/02-tipos-de-documento.md).

## La estructura de una empresa

```
mi-empresa/
├── CLAUDE.md              contexto permanente (< 200 líneas)
├── PLAYBOOK.md            mapa maestro: proceso → metodología → artefactos → quién
├── ESTADO.md              el tablero: etapa, north star, foco, riesgos
├── 00-identidad/          qué es, para quién, marca, dominios
├── 10-estrategia/         visión, apuestas, scorecard
├── 20-legal-y-fiscal/     constitución legal, obligaciones, contratos
├── 30-finanzas/           unit economics, precios, cierres
├── 40-oferta/             producto o servicio, catálogo, research
├── 50-operacion/          procesos diarios, proveedores, runbooks, incidentes
├── 60-crecimiento/        canales, campañas, creativos, contenido
├── 70-tecnologia/         sistemas, integraciones, scripts
├── 80-conocimiento/       investigación numerada, aprendizajes
├── 90-decisiones/         ADRs
└── secrets/               nunca versionado
```

Diez áreas, ni una más. El número no cambia nunca, así que `60-crecimiento/campanas/` sigue estando ahí dentro de dos años. Ver [`estandar/01-estructura.md`](estandar/01-estructura.md).

## Instalación

```bash
# en Claude Code
/plugin marketplace add Danielrp551/empresa-os
/plugin install empresa-os@empresa-os
```

Eso te deja disponibles las skills en cualquier carpeta. Después:

```bash
/empresa-nueva mi-empresa
```

Te entrevista, arma la estructura y deja `CLAUDE.md`, `PLAYBOOK.md` y `ESTADO.md` llenos con tu caso — no con placeholders.

Sin Claude Code también funciona: `plantillas/empresa/` es una carpeta que puedes copiar a mano.

## Qué trae la suite

**Núcleo del estándar** — `empresa-nueva`, `empresa-auditar`, `metodologia-nueva`, `decision`, `revision`, `cierre`, `incidente`, `brief-sesion`, `checklist-humano`.

**Operación** — `ritmo-semanal`, `cierre-mensual`, `apuesta`, `research-mercado`, `campana`, `creativos`, `marca`.

**Módulos de jurisdicción** — `pais-peru` (SUNAT, regímenes, Indecopi, facturación electrónica). Se agregan más como módulos independientes.

**Subagentes** — `auditor-estandar` (revisa cumplimiento sin tocar nada), `verificador` (intenta refutar una afirmación antes de que la des por buena), `investigador-mercado`.

**Hooks** — bloqueo de secretos antes de que lleguen a git, y recordatorio de contexto al abrir sesión.

## Cómo se usa el día a día

1. **Lunes** — `/ritmo-semanal`: jala los números, actualiza `ESTADO.md`, propone decisiones.
2. **Cuando algo se repite dos veces** — `/metodologia-nueva`: se convierte en metodología + skill. La tercera vez ya no se piensa.
3. **Cuando cambias de rumbo** — `/decision`: queda el ADR con alternativas.
4. **Cuando algo se rompe** — `/incidente`: postmortem sin culpa, con acción y dueño.
5. **Cuando termina un ciclo** — `/cierre`: veredicto y aprendizaje que alimenta la siguiente ronda.
6. **Cada tanto** — `/empresa-auditar`: te dice qué documentos están huérfanos, qué tablero lleva dos semanas sin tocarse y qué decisión se tomó sin registrar.

## Sobre qué está construido

Destilado de dos empresas reales en formación y contrastado con: el [Founder's Playbook de Anthropic](https://claude.com/blog/the-founders-playbook), [cómo los equipos de Anthropic usan Claude Code](https://claude.com/blog/how-anthropic-teams-use-claude-code), el [estándar abierto Agent Skills](https://agentskills.io/specification), [Diátaxis](https://diataxis.fr/), [MADR](https://adr.github.io/madr/), el [handbook-first de GitLab](https://handbook.gitlab.com/handbook/company/culture/all-remote/handbook-first/), [Johnny.Decimal](https://johnnydecimal.com/), la *constitution* de [Spec Kit](https://github.com/github/spec-kit), el [PR/FAQ de Amazon](https://workingbackwards.com/resources/working-backwards-pr-faq/), [EOS](https://www.eosworldwide.com/eos-model) y los [postmortems sin culpa de Google SRE](https://sre.google/sre-book/postmortem-culture/).

Las fuentes completas, con qué se tomó de cada una y qué se descartó, están en [`estandar/10-fuentes.md`](estandar/10-fuentes.md).

## Licencia

MIT. Úsalo, cámbialo, véndelo. Si te sirve, cuéntalo.

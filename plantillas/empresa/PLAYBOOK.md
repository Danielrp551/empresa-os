<!-- PLANTILLA empresa-os. El mapa maestro de procesos.
     Regla: antes de ejecutar cualquier proceso, se abre este archivo y se sigue
     el enlace de su etapa. Asi no se reinventa ni se sufre. -->

# PLAYBOOK — {{Empresa}}

**Para que sirve:** el mapa maestro. Cada vez que toque repetir un proceso, aqui esta que metodologia abrir, que archivos produce cada etapa y quien hace que.

**Regla de oro: antes de ejecutar cualquier proceso, abrir este archivo y seguir el enlace de su etapa.**

## El ciclo principal

<!-- Empieza con pocas filas y esta bien. Se llena cuando cada proceso se
     ejecuta por primera vez. NO inventes metodologias de procesos que nadie
     ejecuto todavia: salen mal, porque el valor esta en los detalles que solo
     aparecen haciendolo. -->

| # | Etapa | Metodologia (el COMO) | Produce | Quien |
|---|---|---|---|---|
| 1 | {{ej: Investigar y decidir que ofrecer}} | `/research-mercado` → `80-conocimiento/research/` | `RONDA-YYYY-MM-DD.md` con el embudo y el GO/NO-GO | Agente ejecuta, persona decide el GO |
| 2 | {{ej: Montar la oferta}} | `40-oferta/METODOLOGIA-{{X}}.md` | {{archivos}} | |
| 3 | {{ej: Producir creativos}} | `/creativos` | `60-crecimiento/creativos/{slug}/` completo | Agente genera CON aprobacion, ambos validan mirando |
| 4 | {{ej: Lanzar}} | `/campana` | `60-crecimiento/campanas/{unidad}/TABLERO.md` | Agente ejecuta, persona da el go |
| 5 | {{ej: Seguir}} | `/revision` en cada checkpoint | `revisiones/YYYY-MM-DD-*.md` | Agente jala numeros y propone, persona decide |
| 6 | {{ej: Cerrar}} | `/cierre` | `CIERRE.md` | Ambos |

## Ritmo operativo

| Cuando | Que | Skill |
|---|---|---|
| Lunes | Revision semanal | `/ritmo-semanal` |
| Dia 1 del mes | Cierre mensual | `/cierre-mensual` |
| Inicio de trimestre | Apuestas | `/apuesta` |

## Procesos transversales

| Situacion | Que hacer |
|---|---|
| Se decidio algo que cambia el rumbo | `/decision` → ADR en `90-decisiones/` |
| Algo se rompio hacia afuera | `/incidente` → postmortem en `50-operacion/incidentes/` |
| Un proceso se repitio por segunda vez | `/metodologia-nueva` |
| Hay que delegar un tramo grande | `/brief-sesion` |
| El agente esta bloqueado esperando algo humano | `/checklist-humano` |
| Revisar que el orden se este cumpliendo | `/empresa-auditar` |

## Infraestructura (montada, solo mantener)

| Sistema | Doc de referencia |
|---|---|
| {{sistema}} | `70-tecnologia/{{doc}}.md` |
| Credenciales | `70-tecnologia/credenciales.md` (inventario) + `secrets/` (valores) |

## Reglas transversales

Las trece de la constitucion del estandar, mas lo especifico de esta empresa que este en `CLAUDE.md`. Las que mas se rompen en la practica:

1. **Nunca asumir** — validar contra API, documentacion oficial o la pantalla.
2. **Validar mirando** — capturas y previews reales antes de aprobar cualquier cosa visual.
3. **Gates antes de gastar** — nada se enciende sin su checklist en verde.
4. **Los criterios se escriben antes de ver los numeros.**
5. **Ningun ciclo cierra sin veredicto**, y el aprendizaje viaja a la siguiente ronda.

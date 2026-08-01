---
name: research-mercado
description: Investiga mercado, competencia, demanda o proveedores con un embudo de gates y evidencia citada, y termina en una decision GO o NO-GO documentada. Usala antes de lanzar un producto, entrar a un canal, elegir proveedor o validar que un problema existe de verdad.
argument-hint: [que-investigar]
---

# Research con gates

Investigar sin criterio de corte produce una carpeta llena de material y ninguna decision. Esta metodologia es un **embudo**: cada etapa tiene un gate, y lo que no pasa se descarta con su razon escrita.

## Estructura

Una ronda por sesion de investigacion: `80-conocimiento/research/RONDA-YYYY-MM-DD.md`. La ronda documenta el embudo completo, **incluidos los descartes**. Los descartes son la mitad del valor: evitan volver a evaluar lo mismo dentro de tres meses.

## El embudo

### Etapa 1 — Descubrir (amplio, barato)
Reunir candidatos: competidores, proveedores, productos, canales. Sin evaluar todavia.

**Gate:** ¿hay al menos N candidatos reales? Si no los hay, esa es ya una conclusion.

### Etapa 2 — Filtrar (criterios duros, rapidos)
Criterios binarios que se verifican en minutos: ¿existe en tu mercado?, ¿esta dentro del rango de precio?, ¿es legal?, ¿lo puedes atender con lo que tienes?

**Gate:** pasa o no pasa. Sin promediar. Un criterio duro que no se cumple no se compensa con otro que si.

### Etapa 3 — Evaluar (scorecard, con evidencia)
Los sobrevivientes contra un scorecard escrito **antes** de mirarlos.

```markdown
| Criterio | Peso | Como se mide | Fuente |
|---|---|---|---|
| Demanda demostrable | 3 | <señal concreta y observable> | <donde se mira> |
| Margen viable | 3 | <umbral> | <calculo> |
| Saturacion del canal | 2 | <cuantos ya lo hacen> | <donde se mira> |
| Dificultad operativa | 2 | <que hace falta> | <evaluacion> |
```

**Gate:** puntaje minimo **y** ningun criterio de peso 3 por debajo del umbral.

### Etapa 4 — Verificar (el mas importante)
Los finalistas se verifican **mirando**, no leyendo (regla 2): la pagina real del competidor, el precio real en el checkout, el anuncio real corriendo, el producto real en la mano si aplica.

Aca es donde se cae la mitad de lo que parecia bueno en la etapa 3. Es el gate que mas dinero ahorra.

**Gate:** ¿la evidencia directa confirma lo que decia la evidencia indirecta?

### Etapa 5 — GO / NO-GO
Decision explicita, con razon, en la ronda. Si es GO, abre la unidad de trabajo. Si es NO-GO, escribe **por que** — eso es lo que evita reevaluarlo.

## Reglas

1. **Toda afirmacion con fuente y fecha** (regla 3). Precios, cupos y normativa caducan.
2. **Tres fuentes independientes** para lo que sostenga una decision cara. Tres notas que citan el mismo comunicado son una fuente, no tres.
3. **Busca activamente la contra.** Quien intento esto y le fue mal, y por que. Si solo encuentras evidencia a favor, no buscaste bien.
4. **El agente no valida tu idea.** Si le pides que confirme, confirma. Pidele explicitamente la lista de evidencia en contra — es el modo de fallo numero uno de la etapa Idea segun el [Founder's Playbook](https://claude.com/blog/the-founders-playbook).
5. **Los criterios se escriben antes de ver los candidatos** (regla 8).
6. **Comportamiento pasado, no intencion futura.** "¿Usarias esto?" no predice nada. "¿Que hiciste la ultima vez que te paso?" si.

## Delegar

Para barridos amplios, usa el subagente `investigador-mercado`: trabaja en contexto aparte y vuelve con hallazgos citados en vez de con el material crudo.

Para verificar una afirmacion concreta antes de decidir sobre ella, usa `verificador`: llega sin el sesgo de haber producido la conclusion.

## Cerrar la ronda

La ronda termina con: candidatos evaluados, cuantos pasaron cada gate, el GO/NO-GO con su razon, y **que aprendimos sobre el metodo** — que criterio resulto inutil, cual falto, que fuente no sirvio. Eso mejora la metodologia para la ronda siguiente.

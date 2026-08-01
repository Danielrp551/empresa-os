# 04 — Ritmo operativo

Una empresa sin cadencia fija revisa los números cuando algo se siente mal, que es siempre demasiado tarde. El ritmo existe para que las malas noticias lleguen temprano y las decisiones se tomen en frío.

Cuatro ciclos. Para una operación de una persona, esto es el mínimo que funciona y el máximo que se sostiene.

---

## Semanal — la revisión (30 a 45 min)

El único ciclo verdaderamente obligatorio. Todo lo demás se puede saltar una vez; este no.

**Qué pasa:**
1. El agente jala los números reales por API — no de memoria, no de estimación.
2. Actualiza el scorecard en `10-estrategia/scorecard.md` y el `ESTADO.md`.
3. Revisa los tableros de las unidades de trabajo abiertas: qué checkpoint toca, qué criterio se cruzó.
4. Lista lo que está bloqueado esperando a la persona.
5. **Propone decisiones con su razón.** No las ejecuta: las propone.
6. La persona decide. Cada decisión queda con fecha y por qué en el tablero que corresponda.

**Regla de oro:** el agente propone, la persona dispone. Un ritmo semanal donde el agente ya hizo los cambios no es una revisión, es un informe de daños.

Skill: `/ritmo-semanal`

---

## Mensual — el cierre (1 a 2 h)

**Qué pasa:**
1. Cierre de números reales del mes: ingresos, costos, margen de contribución, caja.
2. Obligaciones del mes: declaraciones, pagos, renovaciones, vencimientos. Del módulo de jurisdicción que corresponda.
3. Revisión de unit economics contra lo que se creía: ¿el costo de adquisición aguanta el margen?
4. Archivo de la evidencia (comprobantes, constancias) en `30-finanzas/cierres/YYYY-MM/`.
5. Una línea en `ESTADO.md` con el veredicto del mes.

Skill: `/cierre-mensual`

---

## Trimestral — las apuestas (2 a 3 h)

De dónde sale: la lógica de *apetito* de [Shape Up](https://basecamp.com/shapeup) más las *rocks* de [EOS](https://www.eosworldwide.com/eos-model), sin el aparato de ninguno de los dos.

**Qué pasa:**
1. Cierre del trimestre anterior: qué se apostó, qué salió, qué se aprendió.
2. Revisión de etapa del ciclo de vida: ¿se cumplió el criterio de salida?
3. **Tres apuestas como máximo** para el trimestre. Cada una con su *apetito* — cuánto tiempo y dinero estás dispuesto a perder — decidido **antes** de empezar.
4. Lo que no entra en las tres, no entra. Que algo sea buena idea no lo hace prioritario.
5. Para apuestas grandes: un PR/FAQ. Escribes el anuncio de lanzamiento como si ya hubiera pasado. Si el anuncio no emociona, la apuesta se mata antes de gastar. ([Working Backwards](https://workingbackwards.com/concepts/working-backwards-pr-faq-process/))

Skill: `/apuesta`

---

## Diario — opcional, solo con algo encendido

Solo cuando hay dinero corriendo (una campaña activa, un lanzamiento, un incidente abierto). Cinco minutos: los números de ayer contra los umbrales ya escritos, y nada más.

**No se toman decisiones aquí.** El ruido diario es casi todo varianza; la decisión vive en el checkpoint que la metodología definió. Este ciclo existe para detectar lo roto, no para optimizar.

---

## Los checkpoints de una unidad de trabajo

Distintos del ritmo de la empresa: los define **la metodología** de cada proceso, y son los momentos en que se decide sobre esa corrida concreta.

Un patrón que funciona para cualquier cosa con dinero en juego:

| Checkpoint | Cuándo | Qué se mira | Decisión posible |
|---|---|---|---|
| **Arranque** | +24 h | Que esté entregando, sin errores | Solo observar. No tocar. |
| **Kill técnico** | día 3-4 | Señales de tope de embudo | Matar lo que no muestra señal |
| **Control** | día 7 | Señales de fondo de embudo | Rebalancear presupuesto |
| **Veredicto** | día 14-21 | La métrica económica real | Escalar, iterar o matar |

Dos cosas hacen que esto funcione y sin ellas no sirve:

- **Los umbrales se escriben antes de empezar** (regla 8). Después de ver los datos, todo umbral es negociable.
- **Arranque significa no tocar.** La tentación de optimizar en el día 1 con muestras de veinte visitas es la forma más común de arruinar un test.

---

## Automatizar el ritmo

Claude Code puede disparar el ritmo solo con [tareas programadas](https://code.claude.com/docs/en/scheduled-tasks). El patrón:

```
Lunes 8:00   → /ritmo-semanal
Día 1 del mes → /cierre-mensual
```

Se configuran con la skill `/schedule` de Claude Code, o desde la interfaz de tareas programadas. La tarea **prepara** la revisión — jala números, actualiza tableros, redacta las propuestas — y te deja el resultado listo. Las decisiones siguen siendo tuyas cuando lo leas.

Lo que **no** se programa: nada que gaste, publique o comprometa. Regla 12.

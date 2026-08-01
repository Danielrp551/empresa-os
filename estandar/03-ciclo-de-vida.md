# 03 — Ciclo de vida de la empresa

`ESTADO.md` empieza declarando en qué etapa está la empresa. No es decorativo: la etapa determina qué es urgente, qué es prematuro y **cuál es el criterio para pasar a la siguiente**.

Las cuatro etapas y sus criterios de salida están tomados del [Founder's Playbook de Anthropic](https://claude.com/blog/the-founders-playbook) y adaptados a operaciones chicas, no solo a software.

El error que más cuesta no es ir lento: es **operar como si estuvieras en la etapa siguiente**. Escalar antes de validar quema dinero; industrializar procesos antes de tener demanda quema tiempo.

---

## Etapa 1 — Idea

**Meta.** Confirmar que el problema es real, específico y de alguien concreto — antes de construir nada.

**Criterios de salida** (los tres):
1. El problema está enunciado con nombre y apellido: quién lo tiene, cuándo le duele, qué hace hoy en vez de tu solución.
2. Hay señal de gente real, no de tu red cercana diciéndote que suena bien.
3. La solución que imaginas ataca el problema validado, no uno adyacente que es más fácil de construir.

**Modos de fallo:**
- **Confundir prototipo con validación.** Que puedas construirlo en un fin de semana no dice nada sobre si alguien lo quiere.
- **Sesgo de confirmación asistido.** Si le pides a un modelo que valide tu idea, la va a validar. Pídele explícitamente que la ataque, y que te dé la lista de evidencia en contra.
- **Entrevistas sobre el futuro.** "¿Usarías esto?" no predice nada. Pregunta por comportamiento pasado: qué hiciste la última vez que te pasó, cuánto pagaste, qué te frenó.

**Qué produce esta etapa.** `00-identidad/`, la investigación en `80-conocimiento/`, y el primer ADR con la decisión de seguir o no.

---

## Etapa 2 — MVP

**Meta.** El camino más corto a evidencia real de que la solución sirve.

**Criterios de salida:**
1. Un segmento identificable muestra retención, ingreso o recomendación — no solo interés.
2. La demanda no viene solo de tu red.
3. Sabes cuánto cuesta servir a un cliente y cuánto deja.

**Modos de fallo:**
- **Deuda técnica y de proceso por agente.** Cuando cada sesión vuelve a decidir cosas que ya se decidieron, el sistema deriva. El antídoto es exactamente este estándar: `CLAUDE.md`, ADRs, y bitácora al cerrar cada sesión de trabajo.
- **PMF falso.** Amigos y conocidos comprando por afecto se parece mucho a demanda real durante unas semanas.
- **Scope creep.** Cada agregado es defendible solo; el conjunto es un desastre. El antídoto es escribir los **no-objetivos** y exigir evidencia de usuario para tocarlos.
- **Huecos de seguridad.** Autenticación, sesiones, validación de entrada, dependencias. Revisión antes de abrir al público, no después.

**Qué produce.** `40-oferta/` con la propuesta concreta, `30-finanzas/` con unit economics de verdad, y el marco de medición **escrito antes** de lanzar.

---

## Etapa 3 — Lanzamiento

**Meta.** Convertir tracción en una máquina repetible.

**Criterios de salida:**
1. El crecimiento es repetible y por canal: conoces el costo de adquisición, el valor del cliente y en cuánto tiempo recuperas.
2. La operación aguanta el volumen real, no el de la demo.
3. **La operación corre sin que tú seas el cuello de botella.** Procesos documentados y automatizados donde se pueda.

**Modos de fallo:**
- **El fundador como cuello de botella.** Todo pasa por ti, las decisiones se ralentizan y la cola de atención se acumula. Acá entra la *auditoría de cuello de botella* de [`05-division-del-trabajo.md`](05-division-del-trabajo.md).
- **La deuda aparece con tráfico real.** Lo que aguantaba diez pedidos no aguanta doscientos.
- **Cumplimiento que pasa de teórico a existencial.** Tributario, protección de datos, garantías: barato de atender antes, caro después.
- **Expandir antes de estabilizar.** Nuevo mercado o nuevo producto mientras el original todavía no camina solo.

**Qué produce.** `50-operacion/` con runbooks reales, `60-crecimiento/` con canales medidos, y el ritmo operativo funcionando.

---

## Etapa 4 — Escala

**Meta.** Crecimiento defendible por profundidad acumulada, no por esfuerzo.

**Criterios de salida:** rentabilidad sostenible sin capital externo, o listo para lo que sea que quieras que siga (venta, socios, inversión).

**Modos de fallo:**
- **Delegar demasiado rápido o demasiado tarde.** Las dos versiones del mismo error: falta de criterio explícito sobre qué requiere tu contexto.
- **El cliente grande pide más que producto.** Documentación, acuerdos de nivel de servicio, respuesta a incidentes.
- **El empuje personal toca techo.** Lo que funcionaba con tu energía necesita volverse sistema con segmentación y playbooks.

**Qué produce.** Conocimiento del dominio externalizado a `80-conocimiento/` — la jerga, las trampas regulatorias, los casos borde. Eso que hoy solo está en tu cabeza es, a esta altura, el activo.

---

## Cómo se usa esto en la práctica

En `ESTADO.md`:

```markdown
## Etapa: MVP  (desde 2026-08-01)

**Criterio de salida:** 20 clientes recurrentes fuera de la red cercana,
con margen de contribución positivo verificado en el cierre mensual.

**Estado:** 6 de 20. Margen verificado en el cierre de julio: sí.
**Riesgo principal:** los 6 vienen de un solo canal.
```

El ritmo semanal revisa esa línea. Cuando el criterio se cumple, se abre un ADR que declara el cambio de etapa y qué cambia en la operación a partir de ahí.

**Regla:** no se avanza de etapa por sensación. Se avanza por criterio cumplido y registrado.

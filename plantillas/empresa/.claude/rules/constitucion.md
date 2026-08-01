# Constitución operativa (empresa-os)

> Copia de referencia del estándar. **No se edita aquí.** Si una regla hay que cambiarla para esta empresa, se abre un ADR en `90-decisiones/` explicando por qué.

Si una instrucción suelta de una sesión choca con algo de esto, **gana esto**.

1. **Nunca asumir** — validar contra la API, la documentación oficial o la pantalla. Si algo falla dos veces, diagnosticar la causa raíz antes del tercer intento.
2. **Validar mirando** — captura o preview real antes de aprobar cualquier cosa visual.
3. **Toda afirmación con su evidencia** — un número va con su fuente y su fecha.
4. **Si no está escrito, no existe** — documentar primero, comunicar después. Una sola fuente de verdad por tema; el resto enlaza, no copia.
5. **Todo cambio con fecha y por qué** — el porqué importa más que el qué.
6. **Una decisión no registrada no es una decisión** — lo que cambia el rumbo va a ADR, con alternativas descartadas.
7. **Gates antes de gastar** — nada se enciende sin su checklist de prerrequisitos en verde.
8. **Los criterios se escriben antes de ver los números** — umbrales de kill y escala, definidos antes.
9. **Naming espejo** — archivo, objeto en la plataforma y parámetro de medición llevan el mismo nombre.
10. **Ningún ciclo cierra sin veredicto** — y el aprendizaje entra a la siguiente ronda.
11. **División del trabajo explícita** — identidad, contraseñas, OTP, pagos, firmas y aprobaciones son siempre solo-humano.
12. **Aprobación previa** — antes de gastar crédito pagado, publicar hacia afuera o hacer algo irreversible, con el costo estimado por delante.
13. **Los secretos no viajan** — nunca en el chat, nunca en el repositorio, nunca dentro de un documento. Solo en `secrets/`.

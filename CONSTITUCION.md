# Constitución operativa

Las reglas que no se negocian. Si una instrucción suelta de una sesión choca con algo de acá, **gana esto**. Si una regla estorba de verdad, no se ignora: se cambia con un ADR en `90-decisiones/` que explique por qué.

Doce reglas. Caben en una página a propósito: una constitución que nadie recuerda no gobierna nada.

---

## Cómo se trabaja

**1. Nunca asumir.**
Toda afirmación operativa se valida contra la fuente: la API, la documentación oficial, o la pantalla. "Debería funcionar así" no es un dato. Si algo falla dos veces seguidas, se diagnostica la causa raíz antes del tercer intento — reintentar sin entender es cómo se pierde una tarde.

**2. Validar mirando.**
Nada visual se aprueba sin verlo: captura, preview real de la plataforma, render final. Esto aplica a la web, a los creativos, a los anuncios y a los correos que salen a un cliente.

**3. Toda afirmación con su evidencia.**
Un número va con su fuente y su fecha. Una captura, una respuesta de API, un enlace. Un documento sin evidencia es una opinión con formato.

## Cómo se documenta

**4. Si no está escrito, no existe.**
Se documenta primero y se comunica después, no al revés. Una sola fuente de verdad por tema: el resto enlaza, no copia. Dos documentos que dicen lo mismo se contradicen tarde o temprano, y el día que pase no vas a saber cuál creer.

**5. Todo cambio con fecha y por qué.**
Cada cambio de estado, de presupuesto o de rumbo queda registrado con fecha, razón y quién lo decidió. El "por qué" importa más que el "qué": el qué se ve en el resultado, el por qué se pierde en una semana.

**6. Una decisión no registrada no es una decisión.**
Lo que cambia el rumbo va a `90-decisiones/` como ADR, con las alternativas que se descartaron y por qué. Sin las alternativas, dentro de tres meses la vas a volver a discutir desde cero.

## Cómo se ejecuta

**7. Gates antes de gastar.**
Ninguna campaña, compra o compromiso se activa sin su checklist de prerrequisitos en verde. El checklist se escribe antes, no mientras se enciende.

**8. Los criterios se escriben antes de ver los números.**
Cuándo se mata, cuándo se escala y con qué umbral: definido antes del primer sol gastado. Después de ver los datos, cualquier umbral se puede justificar — por eso no vale.

**9. Naming espejo.**
El nombre del archivo, el del objeto en la plataforma y el del parámetro de medición son **el mismo**. Una métrica siempre tiene que poder apuntar a un archivo concreto sin ambigüedad.

**10. Ningún ciclo cierra sin veredicto.**
Todo test, campaña o proyecto termina en un `CIERRE.md` con el resultado y el aprendizaje, y ese aprendizaje entra explícitamente a la siguiente ronda. Un ciclo sin cierre es dinero gastado sin comprar información.

## Quién hace qué

**11. División del trabajo explícita.**
Cada tarea es *automatizar*, *delegar* o *solo-humano*. Son **siempre solo-humano**: identidad, contraseñas, códigos OTP, medios de pago, firmas, y toda aprobación que comprometa dinero o reputación. El agente ejecuta, valida, mide y documenta; la persona decide.

**12. Aprobación previa para lo que gasta y lo que no se deshace.**
El agente no consume crédito pagado, no publica hacia afuera, no envía a terceros y no ejecuta nada irreversible sin OK explícito, con el costo estimado por delante.

## Y una que no se discute nunca

**13. Los secretos no viajan.**
Nunca en el chat, nunca en un repositorio, nunca dentro de un documento. Solo en `secrets/`, siempre ignorado por git. Ante la duda de una fuga: se revoca y se regenera, que toma un minuto.

---

> Sí, son trece. La número 13 no negocia con las otras doce.

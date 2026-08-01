---
name: apuesta
description: Define las apuestas del trimestre con su apetito, y para las grandes escribe el PR/FAQ que las mata antes de gastar si no convencen. Usala al empezar un trimestre, cuando haya que decidir en que enfocarse, o cuando el usuario tenga varias ideas y necesite elegir.
argument-hint: [nombre-de-la-apuesta]
---

# Apuestas del trimestre

Tres como maximo. Lo que no es apuesta, no se trabaja. Que algo sea buena idea no lo hace prioritario, y una lista de ocho prioridades es una lista de cero.

## 1. Cerrar el trimestre anterior

Antes de apostar de nuevo: que se apostó, cuanto costó de verdad, que salió y que se aprendió. Sin esto, se repite la misma apuesta con otro nombre.

Revisa tambien la etapa del ciclo de vida: ¿se cumplió el criterio de salida? Si si, el cambio de etapa merece un ADR y cambia lo que es prioritario.

## 2. Elegir tres

Cada candidata en una frase que diga **el resultado**, no la actividad:
- Actividad: *"mejorar la web"*.
- Resultado: *"que la web convierta el doble de visitas en pedidos"*.

Criterios para elegir:
- ¿Mueve el north star o quita un bloqueo del criterio de salida de la etapa?
- ¿Es abordable en un trimestre, o es una direccion que nunca termina?
- ¿Que pasa si no se hace? Si la respuesta es "nada grave", no es apuesta.

## 3. El apetito

Lo que hace que esto funcione, y viene de [Shape Up](https://basecamp.com/shapeup). **No estimes cuanto va a costar: decide cuanto estas dispuesto a perder.**

```markdown
### Apuesta: <resultado esperado>
**Apetito:** 3 semanas de trabajo y hasta $X de gasto directo.
**Se corta si:** al llegar al apetito no hay <señal concreta>.
```

La diferencia es enorme. Una estimacion se estira; un apetito se cumple o se corta. Y decidirlo antes te ahorra la conversacion de "ya invertimos tanto que sigamos" — que es como se pierden los trimestres.

## 4. PR/FAQ para las apuestas grandes

Si la apuesta es cara o irreversible (producto nuevo, mercado nuevo, cambio de modelo), se escribe **antes de construir** ([Working Backwards](https://workingbackwards.com/concepts/working-backwards-pr-faq-process/)):

```markdown
# {Nombre} — anuncio de lanzamiento

## El anuncio (como si ya hubiera pasado)
<Una pagina, en el lenguaje del cliente, no en el tuyo. Que problema resuelve,
para quien, y por que le importa. Sin jerga interna y sin adjetivos vacios.>

## Preguntas dificiles
- ¿Cual es exactamente el problema del cliente y como sabemos que existe?
- ¿Que hace hoy en vez de esto?
- ¿Por que nosotros y no otro?
- ¿Que tiene que ser cierto para que funcione? ¿Lo verificamos o lo suponemos?
- ¿Que es lo mas probable que salga mal?
- ¿Como sabremos en 90 dias si funciono? Numero concreto.
- ¿Cuanto cuesta salirnos si no funciona?
```

**Si el anuncio no emociona, la apuesta se mata acá.** Ese es el punto entero: cuesta una tarde y ahorra un trimestre. Un PR/FAQ que hay que "vender" al escribirlo ya te dio la respuesta.

## 5. Registrar

`10-estrategia/apuestas-{YYYY}-Q{N}.md` con las tres, su apetito y su señal de corte. Cada apuesta grande abre su unidad de trabajo con `TABLERO.md`.

En `ESTADO.md`, el foco del trimestre en una linea.

## 6. Durante el trimestre

- El ritmo semanal revisa el avance contra el apetito, no contra el plan.
- **Al llegar al apetito sin la señal, se corta.** Sin excepciones, y por eso se escribe antes.
- Lo que quedo fuera se queda fuera. Si algo nuevo es tan urgente que entra, algo tiene que salir — y eso es una decision, con su ADR.

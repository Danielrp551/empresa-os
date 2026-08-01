---
name: checklist-humano
description: Genera la cola de tareas que solo puede hacer la persona (identidad, accesos, pagos, firmas, tramites), cada una con instruccion exacta y que desbloquea. Usala al arrancar una empresa, antes de un lanzamiento, cuando el usuario pregunte "que necesitas de mi" o cuando el trabajo del agente este bloqueado esperando algo humano.
argument-hint: [para-que]
---

# Checklist de lo que solo puede hacer la persona

El artefacto mas subestimado del estandar. Convierte "hay que hacer un monton de tramites" en una cola ejecutable donde cada item tiene consecuencia visible.

## Que entra

Solo lo **solo-humano** (ver `estandar/05-division-del-trabajo.md`): identidad, contraseñas y OTP, medios de pago, firmas y compromisos, publicaciones hacia afuera, e irreversibles.

Todo lo que el agente pueda hacer, **no entra**. Un checklist inflado con cosas que no requieren a la persona se abandona a la mitad.

## Estructura de cada item

Tres cosas, y las tres son obligatorias:

```markdown
## C. Cuenta bancaria del negocio (15 min + espera del banco)
> Desbloquea: los retiros del proveedor logistico, y con eso el flujo de caja.

1. Entra a {banco} → Cuenta Negocios → "Ábrela online"
2. Necesitas a mano: {documento fiscal}, {documento de identidad}
3. Debe quedar a tu nombre — es requisito del proveedor para poder retirar
4. Si te rechazan por {motivo tipico}, la alternativa es {banco B}

Al terminar dime: "banco listo" + con que banco quedo.
```

**1. Instruccion exacta.** La ruta de menus, el dato literal a poner, y que hacer si el menu cambio de nombre. "Date de alta en la plataforma" no es una instruccion: es un recordatorio.

**2. Que desbloquea.** La linea mas importante del item. Convierte un tramite aburrido en algo con consecuencia. Sin ella, el checklist se ordena por pereza en vez de por impacto.

**3. Como avisar.** Una frase corta que la persona escribe al terminar, para que el agente sepa que continuar sin tener que preguntar.

## Ordenar por desbloqueo, no por dificultad

Primero lo que libera mas trabajo. Un checklist ordenado por facilidad deja lo critico para el final, que es cuando ya no queda tiempo.

Al final, la tabla que hace visible la cadena:

```markdown
| Tu terminas | Yo ejecuto (sin que hagas nada mas) |
|---|---|
| E (dominio) | Compro el dominio y dejo el DNS configurado |
| G (credenciales de la tienda) | Construyo la tienda completa: tema, paginas legales, menus, envios |
| D + H (linea + cuenta) | Sesion conjunta de 30 min y queda el bot desplegado y probado |
```

Es lo que hace que la persona vea el checklist como una palanca y no como una lista de deberes.

## Reglas duras

- **Nunca pidas contraseñas, claves ni codigos** "para tenerlos". Regla 13. Si un paso los necesita, se hace en el momento, en la pantalla correcta, por la persona.
- **Los tokens de API no van al chat**: se guardan en `secrets/{servicio}.env` y el agente los lee de ahi. Di el nombre exacto del archivo y el formato de las lineas.
- **Marca lo que tiene costo** con el monto estimado, antes de que lo haga.
- **Marca lo que tiene espera** (verificaciones, revisiones de plataforma) para que se arranque temprano y no bloquee al final.
- **Marca lo irreversible** de forma visible.

## Mantenerlo vivo

Se actualiza en el momento en que se completa un item, no despues: marca hecho con la fecha y una nota de lo que quedo (numero de tramite, nombre de la cuenta, que salio distinto de lo previsto). Esa nota vale meses despues, cuando haya que renovar o repetir.

Vive en `50-operacion/CHECKLIST-{proposito}.md`. El de arranque, en la raiz de la empresa mientras esta abierto: se consulta demasiado como para esconderlo.

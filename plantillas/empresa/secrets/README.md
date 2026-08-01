# secrets/ — bóveda local

**Esta carpeta NUNCA se versiona.** Está en `.gitignore` y ahí se queda. Regla 13 de la constitución.

## Qué va aquí

Archivos `.env` con tokens de API, uno por servicio:

```
{{servicio-a}}.env
{{servicio-b}}.env
```

El agente los lee de aquí cuando los necesita. Así no quedan pegados en ninguna conversación.

## Qué NO va aquí — ni aquí ni en ningún archivo

- Claves de acceso a portales del Estado, de banca o de identidad.
- Contraseñas personales y PIN de tarjetas.
- Códigos OTP.

Eso se escribe en el momento, en la pantalla correcta, por la persona. Si un proceso lo necesita, es un paso **solo-humano** del checklist.

## Reglas

1. Nunca se sube a ningún repositorio ni servicio.
2. Nunca se pega en el chat, ni "para confirmar que es el correcto". Un secreto en una conversación queda en el historial de esa conversación: se trata como filtrado.
3. Ante cualquier duda de fuga: **revocar y regenerar primero**, investigar después. Toma un minuto.
4. El inventario de qué credenciales existen, para qué sirven y cada cuánto rotan vive en `70-tecnologia/credenciales.md` — nombres, nunca valores.

## Ejemplos

Deja un `{{servicio}}.env.ejemplo` versionado con el formato de las líneas y sin ningún valor real, para saber qué se espera:

```
SERVICIO_API_KEY=
SERVICIO_API_SECRET=
```

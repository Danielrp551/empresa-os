# 06 — Seguridad y secretos

La regla 13 es la única que no negocia con las otras doce: **los secretos no viajan**.

Este documento explica el mecanismo. No es paranoia: una carpeta de empresa operada por agentes toca tokens de pago, de publicidad y de plataformas donde un secreto filtrado se traduce en dinero de otro en minutos.

---

## El modelo en una frase

Los **valores** viven en `secrets/`, que nunca se versiona. El **inventario** vive en `70-tecnologia/credenciales.md`, que sí se versiona y solo dice qué existe, para qué sirve y dónde se regenera.

```
mi-empresa/
├── 70-tecnologia/
│   └── credenciales.md      ← SÍ se versiona. Nombres, propósito, rotación. Cero valores.
└── secrets/                 ← NUNCA se versiona.
    ├── README.md            ← qué archivos van acá (este sí se versiona)
    ├── plataforma-a.env
    └── plataforma-b.env
```

## Las cuatro capas de defensa

Cuatro, porque cada una falla de una forma distinta y ninguna alcanza sola.

**1. `.gitignore`.** `secrets/` y todo `*.env` ignorados desde el primer commit. *Límite conocido:* solo protege archivos que git todavía no rastrea. Si un secreto ya entró al historial, el `.gitignore` no lo saca.

**2. Hook de bloqueo.** Un `PreToolUse` intercepta el `git add` y el `git commit` y los bloquea si hay rutas de secretos en juego. A diferencia de una instrucción en `CLAUDE.md`, un hook **se ejecuta pase lo que pase** — no depende de que el agente se acuerde. Esa distinción está explícita en la [documentación de Claude Code](https://code.claude.com/docs/en/memory) y es la razón de que las reglas críticas se implementen como hooks y no como texto.

**3. Escaneo con [gitleaks](https://github.com/gitleaks/gitleaks).** Detecta secretos por patrón y por entropía, con reglas para más de 160 tipos de credencial. Corre en `pre-commit` local y en CI. Atrapa lo que las dos capas anteriores no vieron porque el secreto estaba pegado dentro de un markdown.

**4. Rotación.** Ante cualquier duda de fuga: se revoca y se regenera. Toma un minuto en cualquier plataforma seria y evita la conversación de "seguro no pasó nada".

## Qué nunca entra a `secrets/` tampoco

Hay un escalón por encima de los tokens de API, y ahí no llega ni el agente ni ningún archivo:

- Claves de acceso a portales del Estado, de banca, o de identidad.
- Contraseñas personales y PIN de tarjetas.
- Códigos OTP.

Esos se escriben en el momento, en la pantalla correcta, por la persona. Si un proceso los necesita, es un paso **solo-humano** del checklist y así queda documentado.

## El inventario de credenciales

`70-tecnologia/credenciales.md` es una referencia y se ve así:

```markdown
| Credencial | Para qué | Dónde se genera | Rota | Archivo |
|---|---|---|---|---|
| Token de tienda | Leer pedidos y publicar productos | Panel → Apps → Desarrollar | Anual | `secrets/tienda.env` |
| Token de anuncios | Leer métricas de campañas | Portal de desarrolladores | 60 días | `secrets/ads.env` |
```

Qué existe, para qué, dónde se regenera, cada cuánto caduca, en qué archivo vive. **Ningún valor.** Este documento es lo que te salva el día que un token expira un domingo.

## Cuando el agente necesita un secreto

1. Lo lee del archivo de `secrets/` en el momento de usarlo.
2. **No lo imprime, no lo repite y no lo pega en el chat** — ni "para confirmar que es el correcto".
3. Si el archivo no existe, dice qué archivo falta y con qué formato, y espera. No pide que se lo dicten en el chat.

Un secreto pegado en una conversación queda en el historial de esa conversación. Se trata como filtrado: se revoca.

## Si un secreto se filtra

En este orden, sin saltarse el primero:

1. **Revocar primero, investigar después.** Cada minuto cuenta y la investigación no urge.
2. Generar el reemplazo y actualizar `secrets/`.
3. Si llegó a un repositorio, revocar **igual** aunque borres el commit: si el repo es público, asume que ya fue leído por un escáner automático.
4. Registrar un incidente en `50-operacion/incidentes/` con la causa raíz sistémica: qué falló del proceso, no quién se equivocó.

## En un repositorio público

Este mismo repositorio es público, así que la regla se aplica sobre sí misma. Nunca entra:

- Identificadores fiscales, razones sociales, direcciones, teléfonos.
- IDs de cuentas, de campañas, de píxeles, de tiendas.
- Cifras reales de negocio.
- Nombres de clientes o proveedores concretos.

Todos los ejemplos del estándar son ficticios, y eso es una decisión, no un descuido: un ejemplo real es una filtración con formato de documentación.

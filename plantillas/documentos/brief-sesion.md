# BRIEF — {{tema}}

**Para la sesión que trabaje esto:** este documento es tu fuente de verdad.
Preparado por {{quién}} el {{YYYY-MM-DD}}. Lee también: {{2 o 3 enlaces, no más}}.

## 1. Contexto de negocio

{{Lo que hay que saber para no diseñar contra el negocio. No rediseñes esto:
diseña PARA esto.}}

## 2. Estado actual

{{Qué existe ya, qué funciona, y cuál es el punto débil que motiva este encargo.}}

## 3. Restricciones REALES

<!-- Verificadas, no supuestas. Cada una con su porqué: una restricción sin
     razón se ignora en cuanto estorba. -->

1. {{restricción}} — {{por qué}}
2.

## 4. Entregables EXACTOS

<!-- Rutas y nombres literales. Sin esto vuelve algo parecido a lo que pediste,
     en el sitio equivocado. -->

| Archivo | Qué es | Formato |
|---|---|---|
| `{{ruta}}` | | |

## 5. Límites: qué NO tocar

- No toques {{sistemas en producción}}
- No uses credenciales ni leas `secrets/`
- No reabras {{lo que ya está decidido}}
- No publiques nada hacia afuera

## 6. Si algo entra en conflicto

Documenta la duda en `{{archivo}}` en vez de asumir. Regla 1.

## 7. Al terminar

Produce {{archivo}} y avisa. El usuario dirá **"{{frase exacta}}"** para retomar
en la sesión principal.

# INDEX — {{tema}}

Mapa de cada pieza a su origen en la plataforma. **Se llena en el momento de
generar, no después** — después nunca llega, y sin esto la plataforma se vuelve
un pozo donde sabes que hay algo bueno pero no cuál.

**Cómo recuperar:** {{cómo se busca por ID en la plataforma que corresponda}}
**Convención de nombres:** `{{slug}}_{{tipo}}_{{concepto}}_{{modelo}}_{{version}}[_{{nota}}].{{ext}}`

## finales/ — las que de verdad se usan

<!-- Una sola versión por creativo. Si una queda superada, la anterior se MUEVE
     a backup/ (no se deja aquí, o el naming espejo deja de ser unívoco). -->

| Archivo | Modelo | Concepto | ID de origen |
|---|---|---|---|
| `{{archivo}}` | {{modelo}} | {{qué es}} | `{{job_id}}` |

## backup/ — válidas, superadas o no elegidas

| Archivo | Modelo | ID de origen | Nota |
|---|---|---|---|

## descartes/ — generadas pero no usables (no se borran: son aprendizaje)

| Archivo | Modelo | ID de origen | Por qué |
|---|---|---|---|

## producto/ — referencias reales

| Archivo | Origen | ID |
|---|---|---|

## Errores

<!-- Llamadas que fallaron: no producen archivo pero sí consumen tiempo y a
     veces crédito. Saber qué prompt revienta vale. -->

| Fecha | Qué se intentó | Error | Qué se aprendió |
|---|---|---|---|

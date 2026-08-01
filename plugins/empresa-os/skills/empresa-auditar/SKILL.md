---
name: empresa-auditar
description: Audita una carpeta de empresa contra el estandar empresa-os y reporta que esta roto, huerfano, duplicado o abandonado, con arreglos priorizados. Usala cuando el usuario pida revisar el orden de la documentacion, saber si se esta cumpliendo el estandar, o antes de retomar una empresa despues de semanas sin tocarla.
argument-hint: [ruta-de-la-empresa]
---

# Auditar una empresa contra el estandar

Un estandar que nadie verifica se degrada solo. Esta skill es la verificacion.

## Como corre

Delega en el subagente `auditor-estandar`, que trabaja en contexto aparte y vuelve con los hallazgos. Auditar implica leer decenas de archivos y no tiene sentido que eso llene el contexto principal.

Si el subagente no esta disponible, audita inline siguiendo la misma lista.

## Que se revisa

**Bloqueantes** (cuestan dinero o informacion):
- Secretos versionados o fuera de `secrets/`. **Se reporta primero, siempre.** Regla 13.
- Unidades de trabajo con `TABLERO.md`, sin `CIERRE.md`, y con mas de 30 dias desde su ultima revision.
- Tableros de unidades activas sin criterios de kill/escala escritos. Regla 8.
- `ESTADO.md` con mas de 14 dias sin actualizar.

**Graves** (el sistema pierde confiabilidad):
- Metodologias contaminadas con fechas y resultados de una corrida concreta.
- Unidades de trabajo que redefinen la metodologia en vez de enlazarla.
- Dos documentos peleando por ser fuente de verdad del mismo tema.
- Cambios de rumbo visibles en tableros o en el historial de git sin su ADR.
- ADRs sin alternativas descartadas.
- `CLAUDE.md` de mas de 200 lineas.

**Menores** (friccion que se acumula):
- Documentos huerfanos, sin enlace desde ningun indice ni desde el playbook.
- Nombres fuera de convencion, fechas que no son `YYYY-MM-DD`.
- Areas sin `README.md`.
- Indices de activos incompletos: piezas en disco sin fila en el indice.

## Comprobaciones que conviene correr

```bash
# Secretos que git NO esta ignorando (lo mas importante)
git status --porcelain --untracked-files=all | grep -Ei 'secrets?/|\.env$|\.(pem|key|p12)$'

# Que hay versionado que no deberia
git ls-files | grep -Ei 'secrets?/|\.env$|\.(pem|key)$'

# Unidades de trabajo abiertas
find . -name TABLERO.md -not -path '*/node_modules/*' | while read t; do
  [ -f "$(dirname "$t")/CIERRE.md" ] || echo "abierta: $(dirname "$t")"
done

# Tamano del CLAUDE.md
wc -l CLAUDE.md
```

Adapta al shell disponible. En Windows sin Git Bash, el equivalente con `Select-String` y `Get-ChildItem`.

## Que entregas

Hallazgos ordenados por consecuencia, cada uno con ruta, prueba y arreglo concreto. Cierra con:

- **Veredicto**: cumple / cumple con reservas / no cumple.
- **Las tres cosas** que arreglaria primero, en orden.
- **Lo que esta bien**, nombrado explicitamente.

## Despues de auditar

**No arregles nada por tu cuenta.** Presenta los hallazgos y pregunta cuales atacar. Mover archivos sin permiso rompe enlaces que no ves.

Excepcion unica: si encuentras un secreto versionado, dilo de inmediato y con prioridad sobre todo lo demas — y recuerda que el arreglo empieza por **revocar la credencial**, no por borrar el archivo. Si estuvo en un repositorio publico, asume que ya fue leido.

# 01 — Estructura de carpetas

## La regla que gobierna todo

**Un lugar por cosa, y ese lugar no se mueve nunca.** Los números de área existen para eso: `60` es crecimiento hoy, mañana y dentro de tres años. Puedes decir "está en 60/campanas" y la otra persona — o tu yo de dentro de seis meses, o un agente que abre la carpeta por primera vez — llega directo.

La idea viene de [Johnny.Decimal](https://johnnydecimal.com/): pocas opciones, cero duda sobre dónde va cada cosa. La diferencia es que acá las áreas están **predefinidas**, no las eliges: si todas las empresas usan las mismas diez, una skill escrita para una funciona en todas.

## Las diez áreas

| # | Área | Qué vive acá | Qué NO vive acá |
|---|---|---|---|
| `00` | **identidad** | Qué es la empresa, a quién sirve, marca, tono de voz, logo, dominios, redes, naming | La estrategia (va en 10) |
| `10` | **estrategia** | Visión, apuestas del trimestre, PR/FAQ, scorecard, north star, OKR | Los números reales del mes (van en 30) |
| `20` | **legal-y-fiscal** | Constitución legal, régimen tributario, obligaciones, contratos, políticas públicas (privacidad, devoluciones) | Los pagos de impuestos ejecutados (van en 30) |
| `30` | **finanzas** | Unit economics, política de precios, cierres mensuales, tesorería, presupuesto | La proyección estratégica (va en 10) |
| `40` | **oferta** | El producto o servicio: catálogo, fichas, especificaciones, research de producto | Cómo se promociona (va en 60) |
| `50` | **operacion** | Procesos del día a día, proveedores, runbooks, incidentes, atención al cliente, logística | Los procesos de adquisición (van en 60) |
| `60` | **crecimiento** | Canales, campañas, creativos, contenido, ventas, alianzas | El producto en sí (va en 40) |
| `70` | **tecnologia** | Sistemas, integraciones, APIs, scripts, arquitectura, inventario de credenciales (nombres, no valores) | Los valores de las credenciales (van en `secrets/`) |
| `80` | **conocimiento** | Investigación numerada, aprendizajes acumulados, referencias externas, glosario del rubro | Decisiones (van en 90) |
| `90` | **decisiones** | ADRs numerados | Todo lo demás |

Un área que todavía no aplica se queda vacía con su `README.md` explicando qué irá ahí. **No se borra ni se renumera**: el número reservado es la mitad del valor.

## Los tres archivos de la raíz

```
mi-empresa/
├── CLAUDE.md      ← el contexto que el agente lee en cada sesión
├── PLAYBOOK.md    ← el mapa maestro de procesos
└── ESTADO.md      ← el tablero de la empresa
```

**`CLAUDE.md`** — menos de 200 líneas, siempre. Qué es la empresa en tres líneas, la división del trabajo, los comandos y rutas que el agente no puede adivinar, y los enlaces al PLAYBOOK y a la constitución. Todo lo que el agente pueda deducir leyendo la carpeta, **fuera**: cada línea de más es una línea que compite con las que sí importan. Regla de poda: *"¿si borro esta línea, el agente se equivoca?"* Si no, se borra.

**`PLAYBOOK.md`** — la tabla que dice, para cada proceso: qué metodología abrir, qué archivos produce y quién hace qué. Es el documento que se abre **antes** de ejecutar cualquier proceso, para no reinventarlo. Si un proceso no está en el playbook, o no existe todavía o alguien lo está haciendo a ojo.

**`ESTADO.md`** — el tablero. En qué etapa del ciclo de vida está la empresa y cuál es su criterio de salida, el north star con su número de hoy, el foco de este trimestre, los riesgos abiertos y qué está esperando a quién. Se actualiza en cada ritmo semanal. Si tiene más de dos semanas sin tocarse, la empresa está operando a ciegas.

## Dentro de un área: las unidades de trabajo

Un área tiene documentos sueltos (referencias y metodologías) y **carpetas de unidad de trabajo**, que es donde ocurre la ejecución:

```
60-crecimiento/
├── METODOLOGIA-CAMPANAS.md         ← el CÓMO, estable, se mejora
├── canales.md                       ← referencia
└── campanas/
    └── lanzamiento-t1/              ← una unidad de trabajo
        ├── TABLERO.md               ← estado actual. Corto. Siempre al día.
        ├── revisiones/
        │   ├── 2026-08-03-arranque.md
        │   ├── 2026-08-06-kill-tecnico.md
        │   └── 2026-08-10-control.md
        ├── evidencia/               ← capturas, exports, previews
        └── CIERRE.md                ← veredicto y aprendizajes
```

Esta es la pieza más importante del estándar y la que más se rompe si no se respeta. **El tablero se lee en un minuto; el detalle histórico vive en `revisiones/`.** Cada revisión deja su archivo con fecha y el tablero solo guarda una línea-resumen con el enlace. Si metes todo el detalle en el tablero, en tres semanas nadie lo lee y deja de actualizarse.

## Convenciones de nombres

| Qué | Cómo | Ejemplo |
|---|---|---|
| Carpetas de área | `NN-nombre-en-kebab` | `60-crecimiento` |
| Metodologías | `METODOLOGIA-TEMA.md` en mayúsculas | `METODOLOGIA-CAMPANAS.md` |
| Documentos de referencia | `kebab-case.md` | `politica-de-precios.md` |
| Unidades de trabajo | `{tema}-{iteración}` | `corrector-t1`, `rediseno-web-v2` |
| Revisiones | `YYYY-MM-DD-{checkpoint}.md` | `2026-08-06-kill-tecnico.md` |
| Decisiones | `NNNN-titulo-en-kebab.md` | `0007-usar-cod-en-vez-de-pasarela.md` |
| Investigación | `NN-tema.md` | `03-competencia-directa.md` |
| Evidencia | `YYYY-MM-DD-{qué-es}.png` | `2026-08-06-ads-manager.png` |

Fechas siempre `YYYY-MM-DD`: ordenan solas y no se confunden entre formatos.

## Naming espejo (regla 9 de la constitución)

Cuando un archivo local representa algo que existe en una plataforma externa, **los tres nombres son el mismo**: el archivo, el objeto en la plataforma y el parámetro de medición.

```
archivo    creativos/producto-x/finales/producto-x_ugc_oficina-A_v2.png
anuncio    a1-ugc-oficina-v2
medición   utm_content=a1-ugc-oficina-v2
```

Sin esto, dentro de dos semanas tienes una fila en un reporte que dice que algo funcionó y ningún modo confiable de saber cuál de los ocho archivos era.

## Qué NO se versiona

`secrets/` está en `.gitignore` y ahí se queda (regla 13). El área `70-tecnologia` sí lleva el **inventario** de credenciales: qué credencial existe, para qué sirve, dónde se genera, cada cuánto rota y en qué archivo de `secrets/` vive. Los nombres, nunca los valores.

Ver [`06-seguridad-y-secretos.md`](06-seguridad-y-secretos.md).

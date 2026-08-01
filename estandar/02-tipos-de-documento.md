# 02 — Los cuatro tipos de documento

Todo documento de una empresa es exactamente **uno** de estos cuatro tipos. Si no calza en ninguno, casi siempre es porque está mezclando dos, y hay que partirlo.

La idea de clasificar por *propósito* y no por *tema* viene de [Diátaxis](https://diataxis.fr/): un documento que intenta enseñar, guiar la ejecución y servir de consulta al mismo tiempo, falla en las tres. Acá está adaptado a una empresa en vez de a documentación de software.

| Tipo | Responde a | Cambia | Lleva fechas | Equivalente Diátaxis |
|---|---|---|---|---|
| **Referencia** | ¿Qué es / cuánto es / dónde está? | Se edita en su sitio | No | Reference |
| **Metodología** | ¿Cómo se hace esto? | Se mejora con cada corrida | No | How-to guide |
| **Unidad de trabajo** | ¿Cómo va esta corrida? | Crece con la ejecución | Sí, obligatorio | — |
| **Decisión (ADR)** | ¿Por qué elegimos esto? | Nunca. Se supersede | Sí, la de la decisión | Explanation |

Hay un quinto que no es documento sino carpeta: **conocimiento** (`80-`), la investigación numerada. Es Explanation pura y se comporta como referencia.

---

## 1. Referencia

**Qué es.** El dato estable: la ficha de un proveedor, la política de precios, el inventario de credenciales, el índice de activos de un producto, los términos y condiciones.

**Reglas.**
- Es **la** fuente de verdad de su tema. Si el dato aparece en dos sitios, uno de los dos está mal — y no vas a saber cuál.
- Se edita **en su sitio**, no se versiona con copias. El historial lo lleva git.
- Neutral y factual. Si te encuentras explicando *por qué* algo es así, eso es una decisión y va a `90-`.
- Fecha de última verificación cuando el dato caduca (precios, cupos, normativa).

**Sub-tipo importante: el índice de activos.** Cuando generas piezas con una herramienta externa (imágenes, videos, documentos), el índice mapea *archivo local ↔ ID en la plataforma ↔ estado ↔ nota*. Se llena **en el momento de generar**, no después — después nunca llega. Es lo que te deja recuperar cualquier pieza meses más tarde, y sin él la plataforma externa se vuelve un pozo.

Plantilla: [`../plantillas/documentos/ficha-entidad.md`](../plantillas/documentos/ficha-entidad.md) · [`indice-activos.md`](../plantillas/documentos/indice-activos.md)

---

## 2. Metodología

**Qué es.** El CÓMO de un proceso repetible. Cómo se lanza una campaña, cómo se evalúa un proveedor, cómo se hace el cierre mensual.

**Reglas.**
- **Cero fechas y cero resultados.** Si aparece "en marzo probamos", eso es una unidad de trabajo, no una metodología.
- Escrita para ser ejecutada, no leída. Pasos numerados, gates explícitos, criterios medibles.
- Dice **quién hace qué**: qué ejecuta el agente y qué requiere a la persona.
- Se mejora después de cada corrida, y la mejora se nota: el `CIERRE.md` de la corrida dice qué hay que cambiar en la metodología.
- **Se publica además como skill**, para que se cargue sola cuando el trabajo la necesita en vez de depender de que alguien se acuerde de abrirla. Eso lo hace `/metodologia-nueva`.

**Cuándo escribir una.** A la segunda vez que haces algo. La primera es exploración; la segunda ya es un patrón; la tercera sin metodología es desperdicio.

Plantilla: [`../plantillas/documentos/metodologia.md`](../plantillas/documentos/metodologia.md)

---

## 3. Unidad de trabajo

**Qué es.** Una carpeta por corrida concreta: un test de producto, una campaña, un trámite, un rediseño, una ronda de research. Es donde vive la ejecución.

```
{unidad}/
├── TABLERO.md      estado actual. Corto. Siempre al día.
├── revisiones/     YYYY-MM-DD-{checkpoint}.md — el detalle histórico
├── evidencia/      capturas, exports, previews
└── CIERRE.md       veredicto y aprendizajes (al terminar)
```

**Reglas.**
- El **tablero se lee en un minuto**: estado, IDs, tabla resumen de checkpoints con enlaces, y el log de decisiones. Nada más.
- Cada checkpoint genera **su archivo** en `revisiones/` con los números completos, la lectura y las acciones tomadas con su razón. En el tablero queda solo una línea con el enlace.
- Los **criterios de kill y escala se escriben en el tablero antes de empezar** (regla 8 de la constitución).
- La unidad **enlaza** su metodología, no la copia.
- No termina sin `CIERRE.md`.

**Por qué tablero + revisiones y no un solo archivo.** Un archivo único crece hasta que nadie lo lee, y cuando nadie lo lee deja de actualizarse. Partirlo mantiene el resumen legible y el detalle navegable por fecha. Es la estructura que sobrevive al mes tres.

Plantillas: [`tablero.md`](../plantillas/documentos/tablero.md) · [`revision.md`](../plantillas/documentos/revision.md) · [`cierre.md`](../plantillas/documentos/cierre.md)

---

## 4. Decisión (ADR)

**Qué es.** El registro inmutable de algo que cambió el rumbo. Formato [MADR](https://adr.github.io/madr/) reducido.

**Reglas.**
- Numerado correlativo, `NNNN-titulo-en-kebab.md`, en `90-decisiones/`.
- Título como problema resuelto: *"Usar contraentrega en vez de pasarela de pago"*, no *"Decisión sobre pagos"*.
- **Obligatorio: las alternativas descartadas y por qué.** Un ADR sin alternativas no sirve — el valor está justamente en no volver a discutir lo ya discutido.
- **Nunca se edita el contenido.** Si cambia la decisión, se escribe una nueva que dice `Supersede: 0007` y la vieja pasa a `Estado: superada por 0012`.
- Consecuencias, incluidas las malas. Una decisión sin costo declarado es propaganda.

**Qué merece un ADR.** Lo que sería caro revertir o lo que alguien va a volver a preguntar: elección de plataforma, régimen legal, modelo de precios, entrar o salir de un canal, cambiar de proveedor. Lo que se deshace en diez minutos, no.

Plantilla: [`../plantillas/documentos/decision.md`](../plantillas/documentos/decision.md)

---

## Casos especiales

**Incidente.** Un postmortem sin culpa cuando algo se rompe hacia afuera: se cobró de más, se cayó el sitio, un pedido no llegó. Vive en `50-operacion/incidentes/`. Formato de [Google SRE](https://sre.google/sre-book/postmortem-culture/): línea de tiempo, impacto, causa raíz sistémica (no "fulano se equivocó"), y acciones con dueño y fecha. Plantilla: [`incidente.md`](../plantillas/documentos/incidente.md)

**Brief de sesión.** Cuando delegas un tramo de trabajo a otra sesión o a un subagente, este documento es su única fuente de verdad: contexto, restricciones reales, entregables exactos, límites de lo que NO debe tocar, y cómo avisa que terminó. Plantilla: [`brief-sesion.md`](../plantillas/documentos/brief-sesion.md)

**Checklist humano.** La lista de pasos que solo puede hacer la persona, cada uno con instrucción exacta y **qué desbloquea**. Ese "qué desbloquea" es lo que lo hace funcionar: convierte una lista de trámites aburridos en una cola de tareas con consecuencia visible. Plantilla: [`checklist-humano.md`](../plantillas/documentos/checklist-humano.md)

---

## El error más frecuente

Escribir una metodología con los datos de la primera corrida adentro. Se siente eficiente y arruina las dos cosas: la metodología queda atada a un caso y la corrida queda sin bitácora propia.

Cuando dudes: **¿esto va a seguir siendo cierto en la corrida N+1?** Sí → metodología. No → unidad de trabajo.

# empresa-os — trabajar en este repositorio

Este repo **es el estándar**: la documentación, las plantillas y el plugin que lo ejecuta. Las empresas reales viven fuera de aquí, cada una en su carpeta o repo propio.

## Qué es cada cosa

| Ruta | Qué es |
|---|---|
| `CONSTITUCION.md` | Las 13 reglas. Cambiarlas requiere un motivo escrito. |
| `estandar/` | La documentación: el porqué, la estructura, los tipos de documento, el ciclo de vida. |
| `plantillas/empresa/` | El esqueleto que se copia para una empresa nueva. |
| `plantillas/documentos/` | Una plantilla por arquetipo de documento. |
| `plugins/empresa-os/` | El plugin: 17 skills, 3 subagentes, 2 hooks. |
| `.claude-plugin/marketplace.json` | El catálogo para instalarlo. |
| `scripts/validar.mjs` | El validador. Corre en CI y en pre-commit. |

## Antes de dar por terminado cualquier cambio

```bash
node scripts/validar.mjs
```

Valida el manifiesto del plugin, el frontmatter de cada skill contra el estándar abierto Agent Skills, los subagentes, que existan los diez documentos del estándar y las diez áreas de la plantilla, y que no haya rastro de secretos. **Si no pasa, el cambio no está terminado.**

## Reglas de este repositorio

**Es público.** No entra ni un dato real: nada de identificadores fiscales, razones sociales, IDs de cuentas, cifras de negocio ni nombres de clientes o proveedores concretos. Todos los ejemplos son ficticios, y eso es una decisión, no un descuido.

**Coherencia sobre novedad.** Antes de agregar un concepto nuevo, comprueba que no exista ya con otro nombre. El glosario (`estandar/09-glosario.md`) es la lista de términos válidos: si usas una palabra que no está ahí, o la agregas o usas la que ya existe.

**Una sola fuente de verdad.** Si un concepto está explicado en `estandar/`, las skills lo **enlazan**, no lo repiten. Dos explicaciones del mismo concepto se contradicen tarde o temprano.

**Los datos que caducan van con fecha y fuente.** Sobre todo en los módulos de jurisdicción: normativa, tasas y plazos cambian. Se verifican contra la fuente oficial antes de escribirlos.

## Al agregar una skill

1. `plugins/empresa-os/skills/{nombre}/SKILL.md`, con `name` igual al directorio.
2. La `description` decide si se dispara o no: debe decir **qué hace** y **cuándo usarla**, con las palabras que usaría alguien de verdad.
3. Cuerpo por debajo de 500 líneas. El detalle largo a `references/`.
4. Si gasta, publica o es irreversible → `disable-model-invocation: true`.
5. Actualizar el conteo en `README.md` y en la descripción del plugin.

## Al cambiar la constitución

Es la capa que gobierna todo lo demás. Un cambio ahí toca las skills, la plantilla de reglas y el manifiesto. Si de verdad hace falta: cámbialo en `CONSTITUCION.md`, propágalo a `plantillas/empresa/.claude/rules/constitucion.md`, y anótalo en el `CHANGELOG.md` con el porqué.

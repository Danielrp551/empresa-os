# Módulos de jurisdicción

Un módulo de país encapsula lo que cambia entre jurisdicciones: estructura legal, régimen tributario, obligaciones periódicas, facturación, registro de marca y protección al consumidor.

El estándar es agnóstico de país. Todo lo específico vive en un módulo, y una empresa carga el que le toca.

## Perú

El contenido vive en la skill, no aquí — [regla 4: una sola fuente de verdad](../../CONSTITUCION.md):

- [`plugins/empresa-os/skills/pais-peru/SKILL.md`](../../plugins/empresa-os/skills/pais-peru/SKILL.md) — regímenes, obligaciones, comprobantes electrónicos y SIRE, Indecopi, protección al consumidor.
- [`references/tramites.md`](../../plugins/empresa-os/skills/pais-peru/references/tramites.md) — el detalle operativo de cada trámite.

Se invoca con `/pais-peru`.

## Cómo agregar un país

1. Crea `plugins/empresa-os/skills/pais-{codigo}/SKILL.md` siguiendo la estructura del de Perú.
2. Cubre, en este orden: estructura legal, regímenes tributarios, obligaciones periódicas, comprobantes y libros, registro de marca, protección al consumidor.
3. **Verifica cada cifra y cada plazo contra la fuente oficial** y anota la fecha de verificación. La regla 1 aplica con más fuerza aquí que en ningún otro sitio: un plazo equivocado es una multa.
4. Empieza con la advertencia de que esto cambia y que hay que verificar contra la fuente antes de actuar. No es un descargo de responsabilidad: es cierto, y quien lo lea tiene que saberlo.
5. Deja claro qué es **solo-humano** — casi todo lo que sea presentar ante el Estado o pagar lo es, porque requiere claves personales que nunca se comparten.
6. Añade el puntero en este README.

**Lo que un módulo de país nunca lleva:** datos de un contribuyente concreto. Ni identificadores fiscales, ni razones sociales, ni domicilios. El módulo describe las reglas; los datos de una empresa viven en su propia carpeta, en `20-legal-y-fiscal/`.

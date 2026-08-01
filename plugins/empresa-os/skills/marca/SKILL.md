---
name: marca
description: Define o renueva la identidad de una empresa (paleta, tipografias, logo, tono de voz) dentro de las restricciones tecnicas reales del sistema donde se va a aplicar, y produce entregables con nombres y formatos exactos. Usala al crear una marca, rediseñar la identidad, o cuando el logo y los colores actuales sean un placeholder.
argument-hint: [empresa]
---

# Identidad de marca

Vive en `00-identidad/`. El error que arruina este trabajo casi siempre: **diseñar una identidad preciosa que el sistema donde va a aplicarse no puede expresar**.

## 1. Antes de diseñar: las restricciones reales

Verificarlas **mirando el sistema**, no suponiendo (regla 1). Las que mas cuestan cuando se ignoran:

- **Cuantas variables de color acepta el tema o plantilla realmente.** Muchos sistemas derivan todo de tres o cuatro variables. Si es asi, una paleta de doce colores no se puede aplicar y hay que rehacerla.
- **Que tipografias estan disponibles** en la biblioteca de la plataforma. Proponer una fuente de pago o un archivo custom que el sistema no acepta es trabajo perdido.
- **Donde aparece el logo y en que tamaños.** El header, el favicon de 32px, la miniatura de un anuncio, el perfil de una red. Un logo que solo funciona en grande no sirve.
- **Presupuesto.** Si es cero, se diseña con lo disponible y se dice desde el principio.

## 2. Contexto de negocio: diseñar PARA esto, no rediseñar esto

Antes de tocar nada, escribir en el brief:

- **A quien le habla** y desde donde compra (movil casi siempre, y eso cambia todo).
- **Contra que compite la marca.** A veces no compite contra otras marcas sino contra la **desconfianza**. Si es asi, la metrica de exito es confianza y legibilidad, no sofisticacion — y son objetivos distintos que producen diseños distintos.
- **De donde viene el nombre** y que promete. Si el nombre promete algo concreto, la identidad tiene que sostenerlo.
- **Señales de formalidad reales** que se puedan mostrar. En mercados donde la desconfianza es la barrera, valen mas que cualquier decision estetica.

## 3. Entregables exactos

Nombres y formatos literales. Sin esto vuelve "un logo" y no sirve:

| Archivo | Que es |
|---|---|
| `identidad.md` | Paleta con **mapeo explicito** a las variables del sistema, tipografias con nombre exacto de la biblioteca, tono de voz, reglas de uso |
| `logo.svg` | Principal, horizontal, fondo transparente, vectorial limpio (no un raster incrustado) |
| `logo-cuadrado.png` | 1024×1024, para perfiles |
| `favicon.png` | 512×512, **legible a 32px** |
| `moodboard.md` | Referencias y por que se eligio esta direccion (opcional) |

## 4. Verificaciones que no se saltan

- **Contraste WCAG AA** en boton primario y en texto sobre fondo. **Se verifica calculando**, no estimando a ojo.
- **El favicon a 32px de verdad.** Reduce y mira. La mayoria de los logos se vuelven una mancha.
- **El logo sobre fondo claro y oscuro.**
- **La miniatura de un anuncio.** Si la marca no se reconoce ahi, no funciona donde mas se ve.

## 5. Proceso

1. Referentes del rubro y del mercado — que hacen los que ya tienen la confianza del cliente.
2. **Dos o tres direcciones** distintas, no variaciones de la misma.
3. Elegir una **con justificacion escrita** contra el contexto de negocio.
4. Producir los entregables.
5. Verificar (paso 4) y aplicar.

Para explorar conceptos visuales, las skills `higgsfield-*` sirven bien para moodboards y direcciones. El SVG final debe ser vectorial de verdad.

## 6. Delegar

Es un caso ideal para `/brief-sesion`: trabajo especializado, contexto acotado, entregables exactos. En el brief, los limites importan tanto como el encargo:

- **No tocar sistemas en produccion** ni usar credenciales.
- **No reabrir el naming** si ya esta decidido y registrado. Sin este limite, una sesion fresca reabre el nombre — garantizado.
- Ante conflicto entre el brief y lo que encuentre, **documentar la duda** en vez de asumir.

## 7. Aplicar y cerrar

La aplicacion al sistema real la hace quien tiene las credenciales, no la sesion de diseño. Al terminar, `identidad.md` es la fuente de verdad y todo lo demas (creativos, plantillas, correos) se alinea a el.

Si la identidad cambia algo ya decidido, va con su ADR.

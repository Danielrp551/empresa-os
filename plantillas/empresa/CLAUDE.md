<!-- PLANTILLA empresa-os. Reemplaza los {{marcadores}} y borra este comentario.
     LIMITE DURO: 200 lineas. Poda con la pregunta "¿si borro esta linea, el agente se equivoca?"
     Lo que sea un procedimiento va a una skill, no aca. -->

# {{Empresa}}

{{Una a tres lineas: que hace, para quien, y como gana dinero. Concreto.
Mal: "plataforma para pymes". Bien: "facturacion electronica para restaurantes
de 1 a 5 locales en {{pais}}, por suscripcion mensual".}}

**Etapa:** {{Idea | MVP | Lanzamiento | Escala}} · estado y criterio de salida en `ESTADO.md`
**Estandar:** empresa-os. La constitucion gana sobre cualquier instruccion suelta de una sesion.

## Antes de ejecutar cualquier proceso

Abre `PLAYBOOK.md` y sigue el enlace de su etapa. No reinventes un proceso que ya tiene metodologia.

## Division del trabajo

- **{{Nombre}}:** identidad, contraseñas, OTP, medios de pago, firmas, y toda aprobacion que comprometa dinero o reputacion.
- **Agente:** ejecucion por API, validacion, medicion y documentacion.
- **Aprobacion previa obligatoria** antes de gastar credito pagado, publicar hacia afuera o hacer algo irreversible. Con el costo estimado por delante.

## Reglas que mas se rompen en esta empresa

<!-- Solo las especificas de aqui. Las generales ya estan en la constitucion. -->
- {{Ej: tras cada importacion de producto, verificar precio y estado por API — el proveedor los crea con valores por defecto equivocados.}}
- {{Ej: nunca publicar cifras de reseñas o descuentos que no existan; el modelo las inventa si le dejas el hueco.}}

## Lo que no se adivina

| Que | Donde |
|---|---|
| Credenciales | `secrets/` — inventario en `70-tecnologia/credenciales.md` |
| {{Sistema principal}} | {{como se accede, que script o comando}} |
| {{Comando frecuente}} | `{{comando}}` |

## Estructura

Diez areas numeradas (`00` a `90`). Detalle en el estandar. Unidades de trabajo = carpeta con `TABLERO.md` + `revisiones/` + `evidencia/` + `CIERRE.md`.

## Jurisdiccion

{{pais}} — usa la skill `/{{modulo-de-pais}}` para obligaciones y tramites.

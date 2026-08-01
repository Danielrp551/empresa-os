# 05 — División del trabajo: persona y agente

La regla 11 de la constitución dice que cada tarea es *automatizar*, *delegar* o *solo-humano*. Este documento dice cómo se decide y qué hacer con el resultado.

El marco viene de la *founder bottleneck audit* del [Founder's Playbook de Anthropic](https://claude.com/blog/the-founders-playbook): inventaría todo lo que hoy pasa por ti, clasifícalo, y saca de tu cola las dos primeras categorías.

---

## Las tres categorías

### Solo-humano — nunca sale de ti

No es una lista de cosas que el agente no *puede* hacer. Es una lista de cosas donde **el costo de un error es asimétrico**: barato si sale bien, catastrófico o irreversible si sale mal.

| Categoría | Ejemplos |
|---|---|
| **Identidad** | Documentos personales, verificaciones biométricas, firmas |
| **Acceso** | Contraseñas, códigos OTP, autenticación de dos factores, claves de banca |
| **Dinero** | Cargar un medio de pago, aprobar un gasto, retirar fondos, fijar un precio |
| **Compromiso** | Firmar un contrato, aceptar términos, presentar un trámite ante el Estado |
| **Reputación** | Publicar hacia afuera, responder una queja pública, hablar con un cliente molesto |
| **Irreversible** | Borrar datos, cancelar una cuenta, cerrar un servicio, migrar en producción |

El agente puede *preparar* todo eso hasta el último clic: dejar el formulario listo, redactar el mensaje, calcular el monto, armar el instructivo pantalla por pantalla. **El clic es tuyo.**

### Delegar — el agente lo hace, tú apruebas el resultado

Trabajo con criterio donde el error se detecta mirando: redacción, diseño, análisis, propuestas de decisión, investigación.

Regla: el agente entrega **con evidencia** (la captura, la corrida, la fuente) y tú apruebas mirando, no confiando. Es la regla 2 de la constitución.

### Automatizar — corre sin ti y sin aprobación por vez

Trabajo determinista y verificable: jalar números de una API, actualizar un tablero, generar un reporte, validar que un checklist esté completo, chequear que un documento tenga su índice.

Regla: automatizado significa que **hay una verificación automática**. Si nadie puede saber si salió bien sin revisarlo a mano, no está automatizado — está delegado sin supervisión, que es peor que las dos cosas.

---

## Cómo se hace la auditoría

Una vez al empezar, y de nuevo cada vez que cambies de etapa del ciclo de vida.

1. **Inventaría una semana real.** Todo lo que pasó por ti, incluidas las interrupciones chicas. Sin filtrar: lo chico es lo que más se acumula.
2. **Clasifica cada ítem** en las tres categorías. Ante la duda entre *delegar* y *solo-humano*, pregúntate: *si sale mal y nadie lo revisa, ¿cuánto cuesta y se puede deshacer?*
3. **Para cada *automatizar*:** ¿existe la metodología? ¿existe la verificación? Si falta alguna, esa es la tarea real.
4. **Para cada *delegar*:** ¿existe el brief y el criterio de aprobación? Delegar sin criterio explícito termina en revisar todo a mano.
5. **Para cada *solo-humano*:** ¿está en el checklist humano con instrucción exacta y qué desbloquea?
6. **Escribe el resultado** en `50-operacion/division-del-trabajo.md` y refléjalo en `CLAUDE.md` en tres líneas.

La skill `/checklist-humano` produce el paso 5 completo.

---

## El checklist humano

El artefacto más subestimado del estándar. Es la cola de tareas de la persona, y funciona porque cada ítem trae tres cosas:

1. **Instrucción exacta.** No "date de alta en la plataforma", sino la ruta de menús, el dato exacto a poner, y qué hacer si el menú cambió de nombre.
2. **Qué desbloquea.** "Al terminar esto, yo puedo construir la tienda completa." Convierte un trámite aburrido en algo con consecuencia visible.
3. **Cómo avisar.** Una frase corta que la persona escribe cuando termina, y el agente sabe qué hacer a continuación.

```markdown
## C. Cuenta bancaria del negocio (15 min + espera)
Desbloquea: los retiros del proveedor, y por tanto el flujo de caja.

1. Entra a {banco} → Cuenta Negocios → "Ábrela online"
2. Necesitas: {documento fiscal} + {documento de identidad}
3. Debe estar a tu nombre — es requisito del proveedor para retirar.

Al terminar dime: "banco listo" + el nombre del banco.
```

Nunca pide contraseñas, códigos ni datos sensibles "para que el agente los tenga". Regla 13.

---

## Aprobación previa: cuándo el agente se detiene

El agente **para y pregunta**, con el costo estimado por delante, antes de:

- Consumir crédito pagado (generación de imágenes o video, APIs con costo por llamada, publicidad).
- Publicar hacia afuera: sitio web, redes, correo a clientes, cualquier cosa que salga de tu máquina.
- Ejecutar algo irreversible: borrar, cancelar, migrar, enviar.
- Comprometer dinero o reputación de cualquier forma.

"Aprobación previa" significa **antes**, con el número: *"Esto genera 6 imágenes, cuesta aproximadamente X créditos. ¿Voy?"*. Avisar después de gastar no es aprobación, es notificación.

---

## Cómo se ve esto en `CLAUDE.md`

Tres líneas, no más:

```markdown
## División del trabajo
- **Tú:** identidad, contraseñas, OTP, pagos, firmas y toda aprobación de gasto o publicación.
- **Yo:** ejecución por API, validación, medición y documentación.
- **Aprobación previa obligatoria** antes de gastar crédito, publicar o hacer algo irreversible.
```

El detalle vive en `50-operacion/division-del-trabajo.md`. El `CLAUDE.md` solo lleva lo que el agente necesita tener presente siempre.

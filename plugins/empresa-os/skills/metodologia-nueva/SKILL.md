---
name: metodologia-nueva
description: Convierte un proceso que se acaba de ejecutar a mano en una metodologia reutilizable y, si conviene, en una skill que se cargue sola la proxima vez. Usala cuando algo se haya hecho por segunda vez, cuando el usuario diga "esto ya lo hicimos parecido" o "documentemos como se hace esto", o al cerrar un ciclo que dejo un procedimiento que sirve.
argument-hint: [nombre-del-proceso]
---

# Capturar un proceso como metodologia

El momento correcto para escribir una metodologia es **justo despues de ejecutar el proceso por segunda vez**. Antes salen mal — el 80% del valor esta en los detalles que solo aparecen haciendolo. Despues se olvidan los detalles que importan.

## 1. Reconstruir lo que realmente paso

Del historial de la conversacion, del tablero y de las revisiones. Te interesa sobre todo:

- **Los pasos en el orden real**, no en el orden ideal.
- **Donde se atoro.** Los errores son la parte mas valiosa: una metodologia sin las trampas conocidas es un tutorial optimista.
- **Que hubo que verificar y contra que.** Regla 1: nunca asumir.
- **Que requirio al humano** y en que momento exacto.
- **Que decision se tomo con que criterio.**

Si algo no lo tienes claro, pregunta. Una metodologia con un paso inventado es peor que ninguna: la proxima vez se ejecuta con confianza y falla.

## 2. Escribir la metodologia

En el area que corresponde, como `METODOLOGIA-{TEMA}.md`. Plantilla en `plantillas/documentos/metodologia.md`. Secciones:

1. **Para que sirve y cuando se usa** — dos lineas.
2. **Prerrequisitos (el gate)** — que tiene que estar listo antes de empezar. Regla 7.
3. **Los pasos**, numerados, con quien hace cada uno.
4. **Trampas conocidas** — lo que fallo la primera vez y como se detecta.
5. **Criterios de decision** — umbrales y checkpoints, con la regla de que se escriben antes de ver los datos.
6. **Que produce** — los archivos exactos, con sus rutas.
7. **Como se verifica que salio bien** — la comprobacion concreta. Sin esto, la metodologia no cierra.

**Prohibido adentro:** fechas, numeros de una corrida, nombres de un caso concreto. Eso vive en la unidad de trabajo. Si te encuentras escribiendo "en julio probamos", eso no va aca.

## 3. Decidir si ademas se vuelve skill

Se vuelve skill si se cumplen las tres:
- Se va a ejecutar mas de tres veces.
- Tiene pasos que el agente puede hacer solo.
- Olvidar abrirla tiene consecuencia real.

Si no las cumple, se queda como documento y se enlaza desde el `PLAYBOOK.md`. **No conviertas todo en skill**: cada skill ocupa espacio en el listado que el agente lee al arrancar, y un listado lleno de skills que nadie usa hace que las utiles se pierdan.

Si si: `.claude/skills/{nombre}/SKILL.md` en la carpeta de la empresa (o en el plugin, si sirve para cualquier empresa).

```yaml
---
name: nombre-en-kebab
description: Que hace y cuando usarla. Con las palabras que el usuario usaria de verdad.
---
```

Reglas de la skill:
- La `description` es lo unico que el agente ve hasta que la activa. Que diga **que hace** y **cuando** — sin eso, no se dispara nunca o se dispara siempre.
- Cuerpo por debajo de 500 lineas; el detalle largo a `references/`.
- Si tiene efectos que gastan o publican, `disable-model-invocation: true` para que solo se dispare a mano.

## 4. Registrar en el playbook

Una fila en `PLAYBOOK.md`: proceso, que metodologia abrir, que produce, quien hace que. **Una metodologia que no esta en el playbook no existe** — nadie la va a encontrar cuando la necesite.

## 5. Cerrar el circulo

Al final de cada corrida futura, el `CIERRE.md` responde: *¿que hay que cambiar en la metodologia?* Ese es el mecanismo por el que mejora. Una metodologia que no cambia en cinco corridas o es perfecta o nadie la esta usando, y casi siempre es lo segundo.

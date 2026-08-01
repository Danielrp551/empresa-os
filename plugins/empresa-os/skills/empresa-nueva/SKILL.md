---
name: empresa-nueva
description: Crea una carpeta de empresa completa siguiendo el estandar empresa-os, entrevistando primero para que salga llena con el caso real y no con plantillas vacias. Usala cuando el usuario quiera arrancar una empresa nueva, montar la estructura de un negocio, o decir "empecemos con {nombre}". Deja listos CLAUDE.md, PLAYBOOK.md, ESTADO.md, las diez areas y el primer ADR.
argument-hint: [nombre-de-la-empresa]
disable-model-invocation: true
---

# Arrancar una empresa nueva

Objetivo: en 20 a 40 minutos, una carpeta que un agente sin contexto puede abrir y entender.

**Regla que gobierna esta skill: no generas placeholders.** Una carpeta llena de `{{TODO}}` es peor que no tener carpeta, porque parece que existe algo. Si un dato no lo sabes, preguntas; si el usuario tampoco lo sabe todavia, lo escribes como pregunta abierta con fecha en `ESTADO.md`.

## 1. Entrevista (antes de crear nada)

Usa `AskUserQuestion` y **para cuando tengas lo suficiente, no cuando termines la lista**. Si el usuario ya explico algo, no lo vuelvas a preguntar.

Lo minimo indispensable:

1. **Que hace y para quien.** Empuja hasta lo especifico: "software para pymes" no sirve; "facturacion electronica para restaurantes de 1 a 5 locales" si.
2. **Etapa** (Idea / MVP / Lanzamiento / Escala) **y su criterio de salida**. Si el usuario no sabe la etapa, deducela de lo que te conto y confirmala.
3. **Como gana dinero.** Aunque sea una hipotesis. Marcala como hipotesis si lo es.
4. **North star candidato.** El numero que mejor predice que esto funciona. Uno solo.
5. **Que existe ya** — dominio, cuentas, entidad legal, clientes, producto — y que no.
6. **Que lo bloquea hoy.** Esto define el primer checklist humano y suele ser lo mas valioso de toda la entrevista.
7. **Jurisdiccion**, si hay obligaciones legales o fiscales de por medio.
8. **Que areas NO aplican todavia.** Se crean igual con su README, pero conviene saberlo.

Preguntas que **no** haces: nada que puedas deducir del contexto, y nada sobre preferencias de formato — el formato lo pone el estandar.

## 2. Crear la estructura

Copia `plantillas/empresa/` del repositorio de empresa-os a `./{nombre}/` y reemplaza los marcadores. Si no tienes el repositorio a mano, crea el arbol segun `estandar/01-estructura.md`:

```
{nombre}/
├── CLAUDE.md  PLAYBOOK.md  ESTADO.md  .gitignore
├── .claude/rules/
├── 00-identidad/ 10-estrategia/ 20-legal-y-fiscal/ 30-finanzas/ 40-oferta/
├── 50-operacion/ 60-crecimiento/ 70-tecnologia/ 80-conocimiento/ 90-decisiones/
└── secrets/README.md
```

Cada area lleva su `README.md` con **una frase** de que va ahi y que NO va ahi. Las areas que todavia no aplican tambien: el numero reservado es la mitad del valor.

## 3. Llenar los tres archivos raiz

**`CLAUDE.md`** — menos de 200 lineas. Que es la empresa en tres lineas, la division del trabajo, las rutas y comandos que no se adivinan, y los enlaces al playbook y a la constitucion. Poda con la pregunta: *"¿si borro esta linea, el agente se equivoca?"*

**`ESTADO.md`** — etapa con su criterio de salida y donde esta hoy, north star con su valor actual (o "sin medir" si no hay), foco de este trimestre, riesgos abiertos, y que esta esperando a quien.

**`PLAYBOOK.md`** — la tabla de procesos. Al inicio va a tener pocas filas y esta bien: se llena a medida que los procesos se ejecutan por primera vez. Lo que **no** haces es inventar metodologias de procesos que nadie ejecuto todavia — salen mal, porque el valor esta en los detalles que solo aparecen haciendolo.

## 4. Primer ADR

`90-decisiones/0001-adoptar-empresa-os.md`: por que se adopta el estandar, que alternativas habia (no documentar, notas sueltas, un gestor de tareas) y que cuesta.

Si en la entrevista salieron decisiones **ya tomadas** — el nombre, el modelo de negocio, la plataforma — cada una merece su ADR corto. Media hora ahora evita volver a discutirlas en dos meses.

## 5. Checklist humano

Corre `/checklist-humano` con lo que salio de la pregunta 6. Es lo que convierte "hay que constituir la empresa" en una cola ejecutable con instrucciones exactas.

## 6. Cierre

Muestra el arbol creado y di, en tres lineas: cual es el siguiente paso concreto, que esta esperando al usuario, y que va a pasar cuando lo entregue.

**No corras `git init` ni crees repositorios sin pedirlo.** Es una decision del usuario, y si la empresa va a llevar datos de clientes, tambien es una decision de privacidad.

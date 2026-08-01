---
name: campana
description: Monta y opera una campana de adquisicion en cualquier plataforma de anuncios con naming espejo, medicion consistente, gate previo al gasto y checkpoints con criterios de kill escritos de antemano. Usala al lanzar publicidad, montar un test de canal, o cuando el usuario quiera promocionar algo con presupuesto.
argument-hint: [producto] [numero-de-test]
---

# Campanas de adquisicion

Independiente de plataforma: la jerarquia campana → conjunto → anuncio es la misma en todas, y la convencion se calca tal cual entre managers.

## 1. Nomenclatura de tres niveles

Minusculas, guion como separador dentro del nivel, doble guion entre niveles.

| Nivel | Formato | Ejemplo |
|---|---|---|
| Campana | `{producto}-t{N}-{objetivo}` | `producto-x-t1-ventas` |
| Conjunto | `{campana}--{angulo}[-{audiencia}]` | `producto-x-t1-ventas--a-oficina` |
| Anuncio | `{angulo}{n}-{tipo}-{concepto}-{version}` | `a1-ugc-oficina-v2` |

**La plataforma NO va en el nombre.** Dentro de cada manager es redundante; la distingue el parametro de origen en la medicion. Asi el mismo test puede correr en dos plataformas con la misma nomenclatura y sumarse en un solo veredicto.

## 2. Naming espejo (regla 9)

```
archivo    60-crecimiento/creativos/producto-x/finales/producto-x_ugc_oficina-A_v2.png
anuncio    a1-ugc-oficina-v2
medicion   utm_content=a1-ugc-oficina-v2
```

Los tres iguales. Sin esto, en dos semanas tienes una fila en un reporte que dice que algo funciono y ninguna forma confiable de saber cual de los ocho archivos era.

Parametros de medicion, espejo del nombre y nada mas:
```
?utm_source={plataforma}&utm_medium=paid&utm_campaign={campana}&utm_content={anuncio}
```

## 3. Archivos

```
60-crecimiento/campanas/{producto}-t{N}/
├── TABLERO.md      estado, IDs, umbrales, resumen de checkpoints, log de decisiones
├── revisiones/     YYYY-MM-DD-{checkpoint}.md
├── evidencia/      capturas del manager y previews
└── CIERRE.md       veredicto
```

Un test = una carpeta, aunque corra en varias plataformas: una seccion por plataforma en el mismo tablero, y el veredicto economico se toma sumando canales.

## 4. El gate antes de gastar (regla 7)

Nada se enciende sin esto completo y verificado **mirando**:

- [ ] Creativos finales aprobados, con nombre espejo.
- [ ] Copy aprobado, sin datos inventados ni promesas que no puedas cumplir.
- [ ] Destino funcionando: se puede completar una compra o registro **de verdad**, probado de punta a punta.
- [ ] Medicion verificada: el evento de conversion **dispara**, comprobado con una conversion real de prueba.
- [ ] Metodo de pago y datos fiscales cargados en la plataforma (en muchos paises, sin datos fiscales te cargan impuesto de mas).
- [ ] Umbrales de kill y escala escritos en el tablero.
- [ ] Presupuesto diario y tope total definidos.
- [ ] Preview de **cada** anuncio revisado visualmente en el manager.

**Se crea todo en pausa**, se revisa, y encender es un paso aparte y explicito.

## 5. Checkpoints

| Checkpoint | Cuando | Que se mira | Decision |
|---|---|---|---|
| Arranque | +24 h | Que entregue, sin errores de revision | **Solo observar** |
| Kill tecnico | dia 3-4 | Señales de tope de embudo, por anuncio | Matar lo que no muestra señal |
| Control | dia 7 | Señales de fondo de embudo | Rebalancear presupuesto |
| Veredicto | dia 14-21 | La metrica economica real | Escalar, iterar o matar |

**Siempre al nivel anuncio.** El promedio a nivel campana esconde que un anuncio se esta comiendo el presupuesto de otro que rinde mejor.

**La metrica que manda es la economica real**: costo por conversion **entregada y cobrada** contra la contribucion. No la conversion registrada por la plataforma, que en negocios con entrega o cobranza posterior puede estar muy lejos de la realidad.

Cada checkpoint corre con `/revision`.

## 6. Reglas operativas

- **No editar un anuncio que rinde.** En muchas plataformas reinicia el aprendizaje. Se crea `v2` como anuncio nuevo, con la version en el nombre.
- **Un test = una campana.** Iteraciones grandes del mismo producto son `t2`, `t3`: campana nueva, no reciclar.
- **El creativo ES la segmentacion.** Con audiencias amplias, quien decide a quien le habla el anuncio es el anuncio. Los angulos van en conjuntos separados para poder leerlos por separado.
- **Capturas del manager en cada checkpoint.** Evidencia de la decision, y respaldo si algun dia hay que discutir una cifra con la plataforma.

## 7. Cerrar

`/cierre` con las tres respuestas: del producto, de la publicidad y del metodo. Los aprendizajes entran a la siguiente ronda de research y al proximo test.

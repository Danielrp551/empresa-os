#!/usr/bin/env node
/**
 * Valida el repositorio empresa-os.
 *
 * Comprueba que el plugin cargue, que cada skill cumpla el estandar abierto
 * Agent Skills (agentskills.io/specification), que los subagentes esten bien
 * formados, que la documentacion del estandar este completa y que no haya
 * rastros de secretos.
 *
 * Uso:  node scripts/validar.mjs
 * Sale con codigo 1 si hay errores. Los avisos no rompen el build.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errores = [];
const avisos = [];
const err = (m) => errores.push(m);
const avi = (m) => avisos.push(m);

const leerJson = (ruta) => {
  try {
    return JSON.parse(readFileSync(ruta, "utf8"));
  } catch (e) {
    err(`${ruta}: JSON invalido — ${e.message}`);
    return null;
  }
};

/**
 * Frontmatter YAML minimo: solo pares clave: valor de primer nivel.
 *
 * No monta un parser YAML completo (el repo corre sin dependencias), pero si
 * rechaza lo que un parser real rechaza. Leer el valor con una regex permisiva
 * no vale: cuando el YAML no parsea, Claude Code carga la skill con metadata
 * vacia y se le cae la description, asi que deja de dispararse sin avisar.
 */

/** Caracteres que YAML nunca deja abrir un escalar plano. */
const INDICADORES = ["&", "*", "!", "|", ">", "%", "@", "`", ",", "#"];
/** Estos solo actuan de indicador si les sigue un espacio o acaba la linea. */
const INDICADORES_CON_ESPACIO = ["-", "?", ":"];

/** Devuelve el motivo por el que un escalar sin comillas no parsea, o null. */
function motivoEscalarInvalido(v) {
  if (v === "") return null;
  if (v[0] === "[" || v[0] === "{") {
    const cierre = v[0] === "[" ? "]" : "}";
    const tipo = v[0] === "[" ? "lista" : "mapa";
    if (!v.endsWith(cierre) || v.slice(1, -1).includes(cierre))
      return `abre con '${v[0]}', asi que YAML lo lee como ${tipo} en flujo y no cierra limpio — entrecomillalo`;
    return null;
  }
  if (INDICADORES.includes(v[0]))
    return `empieza por '${v[0]}', que YAML lee como indicador — entrecomillalo`;
  if (INDICADORES_CON_ESPACIO.includes(v[0]) && (v.length === 1 || /\s/.test(v[1])))
    return `empieza por '${v[0]}' y un espacio, que YAML lee como indicador — entrecomillalo`;
  if (/:(\s|$)/.test(v))
    return "lleva ':' seguido de espacio o de fin de linea, y ahi YAML corta el valor — entrecomillalo";
  if (/\s#/.test(v))
    return "lleva ' #', que YAML toma como comienzo de comentario y descarta el resto — entrecomillalo";
  return null;
}

/**
 * Lee el valor de un par del frontmatter.
 * Devuelve { valor, motivo }: motivo != null significa que YAML no lo acepta.
 */
function leerValor(v) {
  const q = v[0];
  if (q !== '"' && q !== "'") return { valor: v, motivo: motivoEscalarInvalido(v) };
  if (v.length < 2 || !v.endsWith(q))
    return { valor: v, motivo: `abre con ${q} y nunca cierra` };
  const cuerpo = v.slice(1, -1);
  if (q === '"') {
    if (/(?:^|[^\\])(?:\\\\)*"/.test(cuerpo))
      return { valor: cuerpo, motivo: 'lleva una comilla doble sin escapar dentro de comillas dobles' };
    return { valor: cuerpo.replace(/\\(["\\])/g, "$1"), motivo: null };
  }
  if (/(?:^|[^'])'(?:[^']|$)/.test(cuerpo))
    return { valor: cuerpo, motivo: "lleva una comilla simple sin duplicar dentro de comillas simples" };
  return { valor: cuerpo.replace(/''/g, "'"), motivo: null };
}

function frontmatter(texto, etiqueta) {
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const datos = {};
  const lineas = m[1].split(/\r?\n/);
  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i];
    const donde = `${etiqueta}: frontmatter, linea ${i + 2}`;
    if (linea.trim() === "" || linea.trimStart().startsWith("#")) continue;
    if (/^\s/.test(linea)) {
      err(`${donde}: va indentada; aqui solo caben pares 'clave: valor' de primer nivel`);
      continue;
    }
    const mm = linea.match(/^([A-Za-z0-9_-]+):(?:[ \t]+(.*))?$/);
    if (!mm) {
      err(`${donde}: no es un par 'clave: valor' valido; YAML falla y el archivo carga con metadata vacia`);
      continue;
    }
    const { valor, motivo } = leerValor((mm[2] ?? "").trim());
    if (motivo) err(`${donde}: el valor de '${mm[1]}' ${motivo}`);
    datos[mm[1]] = valor;
  }
  return datos;
}

// ---------------------------------------------------------------- marketplace
const rutaMarket = join(raiz, ".claude-plugin", "marketplace.json");
if (!existsSync(rutaMarket)) err("Falta .claude-plugin/marketplace.json");
else {
  const mk = leerJson(rutaMarket);
  if (mk) {
    if (!mk.name) err("marketplace.json: falta 'name'");
    if (!mk.owner?.name) err("marketplace.json: falta 'owner.name'");
    if (!Array.isArray(mk.plugins) || !mk.plugins.length)
      err("marketplace.json: 'plugins' vacio");
    // 'pluginRoot' esta en el esquema pero el CLI no lo aplica al resolver: deja
    // las rutas a medio camino y el plugin no instala. Se resuelve contra la raiz.
    if (mk.metadata?.pluginRoot)
      err("marketplace.json: 'metadata.pluginRoot' no lo aplica el CLI al resolver; pon la ruta completa en cada 'source'");
    for (const p of mk.plugins ?? []) {
      if (!p.name) err("marketplace.json: una entrada de plugin no tiene 'name'");
      if (!p.source) err(`marketplace.json: el plugin ${p.name} no tiene 'source'`);
      else if (typeof p.source === "string") {
        // El esquema exige ^\./ para la forma ruta. Sin el './' el CLI aborta con
        // "source type your Claude Code version does not support".
        if (!p.source.startsWith("./"))
          err(`marketplace.json: el 'source' de ${p.name} es la ruta '${p.source}' y debe empezar por './' — tal cual, el plugin no instala`);
        const dir = join(raiz, p.source);
        if (!existsSync(dir)) err(`marketplace.json: la fuente de ${p.name} no existe: ${dir}`);
      }
    }
  }
}

// -------------------------------------------------------------------- plugin
const dirPlugin = join(raiz, "plugins", "empresa-os");
if (!existsSync(dirPlugin)) err("Falta plugins/empresa-os/");
else {
  const rutaManifiesto = join(dirPlugin, ".claude-plugin", "plugin.json");
  if (!existsSync(rutaManifiesto)) err("Falta plugins/empresa-os/.claude-plugin/plugin.json");
  else {
    const pj = leerJson(rutaManifiesto);
    if (pj && !pj.name) err("plugin.json: falta 'name' (unico campo obligatorio)");
    if (pj && !pj.version) avi("plugin.json: sin 'version' en semver; el CLI acaba mostrando el hash del commit");
    if (pj?.hooks) {
      const rel = String(pj.hooks).replace(/^\.\//, "");
      // hooks/hooks.json se carga solo. Declararlo ademas lo carga dos veces, y
      // eso no rompe los hooks: tumba el plugin entero con "failed to load".
      if (rel === "hooks/hooks.json")
        err("plugin.json: 'hooks' no debe apuntar a ./hooks/hooks.json — esa ruta ya se carga sola y declararla duplica la carga y tumba el plugin entero");
      else {
        const h = join(dirPlugin, rel);
        if (!existsSync(h)) err(`plugin.json: 'hooks' apunta a un archivo inexistente: ${h}`);
        else leerJson(h);
      }
    }
    // El hooks.json que se autocarga tiene que existir y parsear igual.
    const hAuto = join(dirPlugin, "hooks", "hooks.json");
    if (existsSync(hAuto)) leerJson(hAuto);
  }

  // Los componentes NO pueden vivir dentro de .claude-plugin/
  for (const comp of ["skills", "agents", "hooks", "scripts", "commands"]) {
    if (existsSync(join(dirPlugin, ".claude-plugin", comp)))
      err(`plugins/empresa-os/.claude-plugin/${comp}/ esta mal ubicado: los componentes van en la raiz del plugin`);
  }

  // ------------------------------------------------------------------ skills
  const dirSkills = join(dirPlugin, "skills");
  let nSkills = 0;
  if (!existsSync(dirSkills)) err("Falta plugins/empresa-os/skills/");
  else {
    for (const e of readdirSync(dirSkills, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      nSkills++;
      const ruta = join(dirSkills, e.name, "SKILL.md");
      if (!existsSync(ruta)) {
        err(`skills/${e.name}: falta SKILL.md`);
        continue;
      }
      const texto = readFileSync(ruta, "utf8");
      const fm = frontmatter(texto, `skills/${e.name}`);
      if (!fm) {
        err(`skills/${e.name}: SKILL.md sin frontmatter YAML`);
        continue;
      }
      if (!fm.name) err(`skills/${e.name}: falta 'name'`);
      else {
        if (fm.name !== e.name)
          err(`skills/${e.name}: 'name' (${fm.name}) debe coincidir con el directorio`);
        if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.name))
          err(`skills/${e.name}: 'name' debe ser minusculas, numeros y guiones simples`);
        if (fm.name.length > 64) err(`skills/${e.name}: 'name' supera 64 caracteres`);
      }
      if (!fm.description) err(`skills/${e.name}: falta 'description'`);
      else {
        if (fm.description.length > 1024)
          err(`skills/${e.name}: 'description' supera 1024 caracteres`);
        if (fm.description.length < 40)
          avi(`skills/${e.name}: 'description' muy corta (${fm.description.length}) — debe decir QUE hace y CUANDO usarla, o no se dispara`);
      }
      const lineas = texto.split(/\r?\n/).length;
      if (lineas > 500)
        avi(`skills/${e.name}: SKILL.md tiene ${lineas} lineas (recomendado <500; mueve el detalle a references/)`);
    }
  }
  if (nSkills === 0) err("plugins/empresa-os/skills/ no tiene ninguna skill");

  // ----------------------------------------------------------------- agentes
  const dirAgentes = join(dirPlugin, "agents");
  if (existsSync(dirAgentes)) {
    for (const f of readdirSync(dirAgentes)) {
      if (!f.endsWith(".md")) continue;
      const fm = frontmatter(readFileSync(join(dirAgentes, f), "utf8"), `agents/${f}`);
      if (!fm) err(`agents/${f}: sin frontmatter`);
      else {
        if (!fm.name) err(`agents/${f}: falta 'name'`);
        if (!fm.description) err(`agents/${f}: falta 'description'`);
        if (fm.name && fm.name !== f.replace(/\.md$/, ""))
          avi(`agents/${f}: 'name' (${fm.name}) no coincide con el nombre del archivo`);
      }
    }
  }

  // ------------------------------------------------------------------ hooks
  for (const s of ["proteger-secretos.mjs", "contexto-empresa.mjs"]) {
    if (!existsSync(join(dirPlugin, "scripts", s))) err(`Falta el script de hook: ${s}`);
  }
}

// ------------------------------------------------------------ documentacion
for (const f of ["README.md", "CONSTITUCION.md", "LICENSE", ".gitignore"]) {
  if (!existsSync(join(raiz, f))) err(`Falta ${f} en la raiz`);
}
for (let i = 0; i <= 10; i++) {
  const pref = String(i).padStart(2, "0") + "-";
  const dir = join(raiz, "estandar");
  if (!existsSync(dir) || !readdirSync(dir).some((f) => f.startsWith(pref)))
    err(`Falta el documento estandar/${pref}*.md`);
}

// -------------------------------------------------------------- plantillas
const plEmpresa = join(raiz, "plantillas", "empresa");
for (const f of ["CLAUDE.md", "PLAYBOOK.md", "ESTADO.md", ".gitignore"])
  if (!existsSync(join(plEmpresa, f))) err(`Falta plantillas/empresa/${f}`);

const areas = ["00-identidad","10-estrategia","20-legal-y-fiscal","30-finanzas","40-oferta",
               "50-operacion","60-crecimiento","70-tecnologia","80-conocimiento","90-decisiones"];
for (const a of areas) {
  if (!existsSync(join(plEmpresa, a))) err(`Falta el area plantillas/empresa/${a}/`);
  else if (!existsSync(join(plEmpresa, a, "README.md")))
    err(`El area ${a} no tiene README.md explicando que va ahi`);
}

// --------------------------------------------------------------- secretos
// Repositorio publico: no puede haber ni un valor real.
const patronesRuta = [/(^|[\/\\])secrets?[\/\\]/i, /\.env$/i, /\.(pem|key|p12|pfx)$/i];
const patronesTexto = [
  { re: /\b(sk|pk)-[A-Za-z0-9]{20,}/, que: "posible clave de API" },
  { re: /\bgh[pousr]_[A-Za-z0-9]{30,}/, que: "token de GitHub" },
  { re: /\bEAA[A-Za-z0-9]{60,}/, que: "token de Meta" },
  { re: /\bshp(at|ss|ca|pa)_[a-f0-9]{32}/, que: "token de Shopify" },
  { re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/, que: "clave privada" },
];

function recorrer(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git" || e.name === "node_modules") continue;
    const p = join(dir, e.name);
    const rel = p.slice(raiz.length + 1);
    if (e.isDirectory()) {
      recorrer(p); // dentro de secrets/ solo se permite README y .ejemplo (se valida abajo)
      continue;
    }
    const enSecrets = /(^|[\/\\])(secrets?|secretos)[\/\\]/i.test(rel);
    const permitidoEnSecrets = /(^|[\/\\])README\.md$/.test(rel) || /\.(ejemplo|example)$/.test(rel);
    if (enSecrets && !permitidoEnSecrets)
      err(`Archivo versionado dentro de una carpeta de secretos: ${rel} (solo se permiten README.md y *.ejemplo)`);
    if (!enSecrets && patronesRuta.some((r) => r.test(rel)) && !/\.(ejemplo|example)$/.test(rel))
      err(`Archivo de secretos versionado: ${rel}`);
    if (statSync(p).size > 512 * 1024) continue;
    if (!/\.(md|json|mjs|js|yml|yaml|txt|env|ejemplo)$/i.test(e.name)) continue;
    // El propio validador y el hook contienen los patrones a proposito.
    if (/validar\.mjs$|proteger-secretos\.mjs$/.test(rel)) continue;
    const t = readFileSync(p, "utf8");
    for (const { re, que } of patronesTexto)
      if (re.test(t)) err(`Posible secreto (${que}) en ${rel}`);
  }
}
recorrer(raiz);

// ------------------------------------------------------------------ salida
for (const a of avisos) console.log(`  aviso   ${a}`);
for (const e of errores) console.log(`  ERROR   ${e}`);

if (errores.length) {
  console.log(`\n${errores.length} error(es), ${avisos.length} aviso(s). Validacion FALLIDA.`);
  process.exit(1);
}
console.log(`\nValidacion OK. ${avisos.length} aviso(s).`);

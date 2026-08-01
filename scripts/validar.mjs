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

/** Frontmatter YAML minimo: solo pares clave: valor de primer nivel. */
function frontmatter(texto) {
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const datos = {};
  for (const linea of m[1].split(/\r?\n/)) {
    const mm = linea.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (mm) datos[mm[1]] = mm[2].trim().replace(/^["']|["']$/g, "");
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
    for (const p of mk.plugins ?? []) {
      if (!p.name) err("marketplace.json: una entrada de plugin no tiene 'name'");
      if (!p.source) err(`marketplace.json: el plugin ${p.name} no tiene 'source'`);
      const dir = join(raiz, mk.metadata?.pluginRoot ?? ".", String(p.source));
      if (!existsSync(dir)) err(`marketplace.json: la fuente de ${p.name} no existe: ${dir}`);
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
    if (pj?.hooks) {
      const h = join(dirPlugin, String(pj.hooks).replace(/^\.\//, ""));
      if (!existsSync(h)) err(`plugin.json: 'hooks' apunta a un archivo inexistente: ${h}`);
      else leerJson(h);
    }
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
      const fm = frontmatter(texto);
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
      const fm = frontmatter(readFileSync(join(dirAgentes, f), "utf8"));
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

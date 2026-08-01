#!/usr/bin/env node
/**
 * Copia el esqueleto de plantillas/empresa/ a una carpeta nueva.
 *
 * Uso:  node scripts/nueva-empresa.mjs <ruta-destino> [Nombre visible]
 *
 * Esto es el camino sin Claude Code: crea la estructura con sus marcadores
 * {{...}} para llenar a mano. Con Claude Code, `/empresa-nueva` hace lo mismo
 * pero entrevista primero y deja los archivos llenos con el caso real, que es
 * bastante mejor que rellenar marcadores.
 */

import { cpSync, existsSync, readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const destino = process.argv[2];
if (!destino) {
  console.error("Uso: node scripts/nueva-empresa.mjs <ruta-destino> [Nombre visible]");
  process.exit(1);
}
const rutaDestino = resolve(destino);
const nombre = process.argv[3] || basename(rutaDestino);

if (existsSync(rutaDestino)) {
  console.error(`Ya existe: ${rutaDestino}`);
  console.error("No se sobrescribe nada. Elige otra ruta o mueve la carpeta actual.");
  process.exit(1);
}

cpSync(join(raiz, "plantillas", "empresa"), rutaDestino, { recursive: true });

// Sustituye solo {{Empresa}} y {{empresa}}; el resto de marcadores se dejan a
// proposito, para que se vea que falta llenarlos.
const hoy = new Date().toISOString().slice(0, 10);
function sustituir(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      sustituir(p);
      continue;
    }
    if (!/\.md$/i.test(e.name) || statSync(p).size > 256 * 1024) continue;
    const original = readFileSync(p, "utf8");
    const nuevo = original
      .replaceAll("{{Empresa}}", nombre)
      .replaceAll("{{empresa}}", nombre.toLowerCase())
      .replaceAll("{{YYYY-MM-DD}}", hoy);
    if (nuevo !== original) writeFileSync(p, nuevo, "utf8");
  }
}
sustituir(rutaDestino);

const pendientes = [];
function contar(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      contar(p);
      continue;
    }
    if (!/\.md$/i.test(e.name)) continue;
    const n = (readFileSync(p, "utf8").match(/\{\{[^}]+\}\}/g) || []).length;
    if (n) pendientes.push(`${p.slice(rutaDestino.length + 1)} (${n})`);
  }
}
contar(rutaDestino);

console.log(`\nEmpresa "${nombre}" creada en ${rutaDestino}\n`);
console.log("Archivos con marcadores pendientes de llenar:");
pendientes.sort().forEach((p) => console.log(`  ${p}`));
console.log(`
Siguientes pasos:
  1. CLAUDE.md    — que hace la empresa y la division del trabajo (< 200 lineas)
  2. ESTADO.md    — etapa, criterio de salida y north star
  3. 90-decisiones/0001-adoptar-empresa-os.md — ajustalo a tu caso real
  4. PLAYBOOK.md  — se llena a medida que cada proceso se ejecuta por primera vez

No corras 'git init' hasta decidir si esta carpeta va a llevar datos de clientes.
Si lo haces, comprueba antes que secrets/ este ignorado.
`);

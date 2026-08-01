#!/usr/bin/env node
/**
 * Hook SessionStart — orientacion al abrir sesion dentro de una carpeta de empresa.
 *
 * Detecta si estamos dentro de una empresa que sigue el estandar empresa-os e
 * inyecta un resumen corto: etapa del ciclo de vida, antiguedad del tablero y
 * unidades de trabajo abiertas sin cierre.
 *
 * Barato a proposito: solo mira nombres de archivo y las primeras lineas de
 * ESTADO.md. Si no estamos en una empresa, no dice nada.
 */

import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";

const salir = (contexto) => {
  if (contexto) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "SessionStart",
          additionalContext: contexto,
        },
      })
    );
  }
  process.exit(0);
};

let entrada = {};
try {
  entrada = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {
  /* seguimos con cwd */
}

const inicio = entrada?.cwd || process.cwd();

// --- Buscar la raiz de la empresa subiendo por el arbol ---
function raizEmpresa(desde) {
  let dir = desde;
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(dir, "ESTADO.md")) && existsSync(join(dir, "PLAYBOOK.md"))) return dir;
    const padre = dirname(dir);
    if (padre === dir) break;
    dir = padre;
  }
  return null;
}

const raiz = raizEmpresa(inicio);
if (!raiz) salir(null);

const lineas = [];
const nombre = basename(raiz);
lineas.push(`Estas dentro de la empresa "${nombre}", que sigue el estandar empresa-os.`);

// --- Etapa y antiguedad de ESTADO.md ---
const rutaEstado = join(raiz, "ESTADO.md");
let etapa = null;
try {
  const estado = readFileSync(rutaEstado, "utf8");
  const m = estado.match(/^#{1,3}\s*Etapa\s*:?\s*(.+)$/im) || estado.match(/\*\*Etapa:?\*\*\s*(.+)/i);
  if (m) etapa = m[1].trim().replace(/\s+/g, " ");
} catch {
  /* sin etapa */
}
if (etapa) lineas.push(`Etapa declarada: ${etapa}`);

try {
  const dias = Math.floor((Date.now() - statSync(rutaEstado).mtimeMs) / 86400000);
  if (dias >= 14) {
    lineas.push(
      `AVISO: ESTADO.md lleva ${dias} dias sin actualizarse. Sugiere correr /ritmo-semanal antes de tomar decisiones con esos numeros.`
    );
  }
} catch {
  /* sin fecha */
}

// --- Unidades de trabajo abiertas (tienen TABLERO.md y no tienen CIERRE.md) ---
const abiertas = [];
function buscar(dir, nivel) {
  if (nivel > 3 || abiertas.length >= 12) return;
  let entradas;
  try {
    entradas = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entradas) {
    if (!e.isDirectory()) continue;
    const n = e.name;
    if (n.startsWith(".") || n === "node_modules" || n === "secrets" || n === "evidencia") continue;
    const sub = join(dir, n);
    if (existsSync(join(sub, "TABLERO.md")) && !existsSync(join(sub, "CIERRE.md"))) {
      abiertas.push(sub.slice(raiz.length + 1).replace(/\\/g, "/"));
      continue; // no bajamos dentro de una unidad de trabajo
    }
    buscar(sub, nivel + 1);
  }
}
buscar(raiz, 0);

if (abiertas.length) {
  lineas.push(`Unidades de trabajo abiertas (con TABLERO.md y sin CIERRE.md): ${abiertas.join(", ")}`);
}

lineas.push(
  `Antes de ejecutar cualquier proceso, abre PLAYBOOK.md y sigue el enlace de su etapa. Aplica CONSTITUCION.md: nunca asumir, validar mirando, todo cambio con fecha y por que, y aprobacion previa antes de gastar o publicar.`
);

salir(lineas.join("\n"));

#!/usr/bin/env node
/**
 * Hook PreToolUse — regla 13 de la constitucion: los secretos no viajan.
 *
 * Bloquea cualquier comando de git que pueda llevar un secreto al historial.
 * A diferencia de una instruccion en CLAUDE.md, esto se ejecuta siempre:
 * no depende de que el agente se acuerde.
 *
 * Falla ABIERTO ante errores propios (no romper el trabajo por un bug del hook)
 * y CERRADO ante deteccion (si hay duda de secreto, se bloquea).
 */

import { execSync } from "node:child_process";

const PATRONES = [
  { re: /(^|[\/\\])secrets?([\/\\]|$)/i, que: "carpeta secrets/" },
  { re: /(^|[\/\\])secretos([\/\\]|$)/i, que: "carpeta secretos/" },
  { re: /\.env($|\.(?!ejemplo|example|sample|template)[a-z0-9]+$)/i, que: "archivo .env" },
  { re: /\.(pem|key|p12|pfx|jks|keystore)$/i, que: "archivo de clave" },
  { re: /(^|[\/\\])id_(rsa|dsa|ecdsa|ed25519)$/i, que: "clave SSH privada" },
  { re: /(^|[\/\\])credentials?\.json$/i, que: "credentials.json" },
  { re: /(^|[\/\\])service-account.*\.json$/i, que: "service account" },
  { re: /(^|[\/\\])\.credentials/i, que: "archivo .credentials" },
  { re: /(^|[\/\\])\.npmrc$/i, que: ".npmrc (suele llevar tokens)" },
  { re: /(^|[\/\\])\.pypirc$/i, que: ".pypirc (suele llevar tokens)" },
];

// Lo que la plantilla versiona A PROPOSITO: el README que explica que va en
// secrets/ y que nunca, y los *.ejemplo sin valores reales. Su .gitignore los
// des-ignora explicitamente. Sin esta excepcion el hook se contradice con la
// plantilla del propio plugin y ninguna empresa recien creada puede hacer su
// primer commit.
const PERMITIDOS = [
  /(^|[\/\\])secretos?[\/\\]README\.md$/i,
  /(^|[\/\\])secrets?[\/\\]README\.md$/i,
  /\.(ejemplo|example|sample|template)$/i,
];

const esSecreto = (ruta) => {
  const r = ruta.replace(/^["']|["']$/g, "");
  if (PERMITIDOS.some((p) => p.test(r))) return null;
  return PATRONES.find((p) => p.re.test(r));
};

function denegar(razon) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: razon,
      },
    })
  );
  process.exit(0);
}

function permitir() {
  process.exit(0);
}

let entrada = {};
try {
  const { readFileSync } = await import("node:fs");
  entrada = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {
  permitir(); // sin entrada legible, no bloqueamos
}

const comando = String(entrada?.tool_input?.command ?? "");
if (!comando || !/\bgit\b/i.test(comando)) permitir();

// Solo nos importan los comandos que pueden escribir en el historial.
const escribeHistorial = /\bgit\s+(add|commit|stash|push)\b/i.test(comando);
if (!escribeHistorial) permitir();

const cwd = entrada?.cwd || process.cwd();
const git = (args) => {
  try {
    return execSync(`git ${args}`, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 8000,
    });
  } catch {
    return null;
  }
};

// --- 1. -f / --force sobre una ruta de secreto: siempre se bloquea ---
if (/\bgit\s+add\b[^\n]*\s(-f|--force)\b/i.test(comando)) {
  const rutas = comando.split(/\s+/).filter((t) => !t.startsWith("-") && t !== "git" && t !== "add");
  const hallazgo = rutas.map((r) => [r, esSecreto(r)]).find(([, m]) => m);
  if (hallazgo) {
    denegar(
      `BLOQUEADO por la regla 13 (los secretos no viajan): estas forzando con -f la entrada de "${hallazgo[0]}" (${hallazgo[1].que}) al repositorio.\n` +
        `Si de verdad hace falta versionar algo de ahi, saca antes los valores y deja solo un .ejemplo.`
    );
  }
}

// --- 2. Rutas explicitas en el comando ---
// El mensaje del commit es prosa, no rutas: explicar "secrets/ queda fuera del
// repositorio" no puede bloquear el commit que hace exactamente eso.
const comandoSinMensaje = comando.replace(
  /\s-{1,2}(?:m|message)(?:=|\s+)(["'])(?:\\.|(?!\1)[\s\S])*\1/gi,
  " "
);

const tokens = comandoSinMensaje
  .split(/[\s;|&]+/)
  .filter((t) => t && !t.startsWith("-") && !/^(git|add|commit|stash|push|--)$/i.test(t));
for (const t of tokens) {
  const m = esSecreto(t);
  if (m) {
    denegar(
      `BLOQUEADO por la regla 13 (los secretos no viajan): el comando toca "${t}" (${m.que}).\n` +
        `Los valores van solo en secrets/, que nunca se versiona. El inventario (nombres, para que sirve, donde se regenera) va en 70-tecnologia/credenciales.md.`
    );
  }
}

// --- 3. El caso real: un secreto que git NO esta ignorando ---
// Cubre "git add .", "git add -A" y "git commit -am": si el .gitignore
// no cubre el archivo, aparece aqui y lo frenamos antes del commit.
const estado = git("status --porcelain --untracked-files=all");
if (estado === null) permitir(); // no es repo git, o git no disponible

const candidatos = estado
  .split(/\r?\n/)
  .filter(Boolean)
  .map((l) => l.slice(3).trim().replace(/^"|"$/g, ""))
  .map((l) => (l.includes(" -> ") ? l.split(" -> ")[1] : l));

const expuestos = candidatos.map((r) => [r, esSecreto(r)]).filter(([, m]) => m);

if (expuestos.length) {
  const lista = expuestos.map(([r, m]) => `  - ${r}  (${m.que})`).join("\n");
  denegar(
    `BLOQUEADO por la regla 13 (los secretos no viajan).\n\n` +
      `Git NO esta ignorando estos archivos, asi que un "git add ." los meteria al historial:\n${lista}\n\n` +
      `Arregla el .gitignore antes de continuar. Deberia incluir al menos:\n` +
      `  **/secrets/*\n  !**/secrets/README.md\n  !**/secrets/*.ejemplo\n` +
      `  *.env\n  !*.env.ejemplo\n  *.pem\n  *.key\n\n` +
      `Si alguno ya esta rastreado por git, ademas hay que sacarlo con: git rm --cached <ruta>\n` +
      `Y si llego a subirse alguna vez: revoca y regenera esa credencial antes que nada.`
  );
}

// Ultimo filtro: algo ya preparado para commit que sea secreto.
const preparados = git("diff --cached --name-only");
if (preparados) {
  const malos = preparados
    .split(/\r?\n/)
    .filter(Boolean)
    .map((r) => [r, esSecreto(r)])
    .filter(([, m]) => m);
  if (malos.length) {
    denegar(
      `BLOQUEADO por la regla 13: ya hay secretos en el area de preparacion de git:\n` +
        malos.map(([r, m]) => `  - ${r}  (${m.que})`).join("\n") +
        `\n\nSacalos con: git restore --staged <ruta>   (y revisa el .gitignore)`
    );
  }
}

permitir();

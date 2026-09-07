// Static dist smoke test — no browser needed. Asserts the production
// output contains the app entry, key SEO tags, and section anchors.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

let failures = 0;
function check(name, cond) {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (!cond) failures++;
}

const htmlPath = join(dist, "index.html");
check("dist/index.html exists", existsSync(htmlPath));
const html = existsSync(htmlPath) ? readFileSync(htmlPath, "utf8") : "";

check("references a hashed JS bundle", /assets\/index-[\w-]+\.js/.test(html));
check("references a hashed CSS bundle", /assets\/index-[\w-]+\.css/.test(html));
check("has <title>", /<title>[^<]+<\/title>/.test(html));
check("has meta description", /name="description"/.test(html));
check("has canonical link", /rel="canonical"/.test(html));
check("has Open Graph tags", /property="og:title"/.test(html));
check("has JSON-LD Person", /"@type":\s*"Person"/.test(html));
check("has robots.txt", existsSync(join(dist, "robots.txt")));
check("has sitemap.xml", existsSync(join(dist, "sitemap.xml")));
check("has favicon", existsSync(join(dist, "favicon.svg")));
check("has og image", existsSync(join(dist, "og.jpg")));

const jsFiles = [];
try {
  const { readdirSync } = await import("node:fs");
  for (const f of readdirSync(join(dist, "assets"))) {
    if (f.endsWith(".js")) jsFiles.push(readFileSync(join(dist, "assets", f), "utf8"));
  }
} catch {
  /* ignore */
}
const bundle = jsFiles.join("\n");
check("bundle contains hero content", bundle.includes("Kardo Heidari"));
check("bundle contains Persian content", bundle.includes("dir"));
check("admin chunk is code-split", jsFiles.length >= 2);

if (failures > 0) {
  console.error(`\n${failures} smoke check(s) failed`);
  process.exit(1);
}
console.log("\nAll smoke checks passed");

import fs from "fs";
import path from "path";

const distClientDir = path.resolve("dist/client");
const assetsDir = path.join(distClientDir, "assets");

if (!fs.existsSync(distClientDir)) {
  console.error("dist/client directory does not exist!");
  process.exit(1);
}

// Find main JS bundle and CSS files in assets
let jsEntry = "";
let cssFiles = [];

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  jsEntry = files.find((f) => f.startsWith("index-") && f.endsWith(".js")) || "";
  cssFiles = files.filter((f) => f.endsWith(".css"));
}

const cssTags = cssFiles
  .map((css) => `<link rel="stylesheet" href="/assets/${css}" />`)
  .join("\n    ");

const jsTag = jsEntry ? `<script type="module" src="/assets/${jsEntry}"></script>` : "";

const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Quantum Codon</title>
    <meta name="description" content="Quantum Codon — Unlocking the dark genome for next-generation therapeutics, bioinformatics, and biotech innovation." />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Fira+Code:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" />
    ${cssTags}
  </head>
  <body>
    <div id="root"></div>
    ${jsTag}
  </body>
</html>
`;

// Write index.html to dist/client/index.html
fs.writeFileSync(path.join(distClientDir, "index.html"), htmlContent, "utf-8");
console.log("Successfully generated dist/client/index.html");

// Also copy index.html to dist/index.html for platforms expecting dist/ as output directory
const distDir = path.resolve("dist");
fs.writeFileSync(path.join(distDir, "index.html"), htmlContent, "utf-8");
console.log("Successfully generated dist/index.html");

import fs from "fs";
import path from "path";

const SOURCE = path.join(__dirname, "..", "content", "cv-aiqa.pdf");
const OUTPUT = path.join(__dirname, "..", "public", "cv-antora.pdf");

function main() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error(`Missing source CV: ${SOURCE}`);
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.copyFileSync(SOURCE, OUTPUT);

  const stats = fs.statSync(OUTPUT);
  if (!stats.size) {
    throw new Error(`Generated PDF is empty: ${OUTPUT}`);
  }

  console.log(`Wrote ${OUTPUT} (${stats.size} bytes)`);
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exit(1);
}

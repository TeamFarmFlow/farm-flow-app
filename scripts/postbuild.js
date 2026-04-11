import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');

function setVersion() {
  const pkgJsonPath = path.resolve(ROOT, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString('utf-8'));
  const distVersionPath = path.resolve(ROOT, 'dist', 'version.json');
  const distVersion = JSON.stringify({ version: pkgJson.version });

  fs.writeFileSync(distVersionPath, distVersion, 'utf-8');
}

setVersion();

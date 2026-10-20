// Erzeugt alle Website-Bilder in public/img/ als responsive WebP (640/1080/1800 px) + JPEG-Fallback.
// Quellen: echte Originalfotos (assets/images/originale), Editorial-Shooting (assets/images/ai-png/08-editorial),
// Hero-Freisteller (assets/images/freigestellt/hero-portrait.png, aus dem Kamera-Original freigestellt, s. tools/hero-cutout.mjs).
// Aufruf: node tools/build-images.mjs
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = "public/img";
const WIDTHS = [640, 1080, 1800];
const O = "assets/images/originale";
const E = "assets/images/ai-png/08-editorial";

// [Quelle, Name, Optionen]
const PHOTOS = [
  // Echte Fotos
  [`${O}/01-portrait/portrait-bambus-lachend_IMG_0576.jpg`, "bambus"],
  [`${O}/01-portrait/nacht-laterne-farbig_IMG_5247.jpg`, "nacht-farbig"],
  [`${O}/01-portrait/nacht-laterne-sw_IMG_9584.png`, "nacht-sw"],
  [`${O}/01-portrait/nacht-laterne-sw-lachend_IMG_9585.png`, "nacht-sw-lachend"],
  [`${O}/02-lifestyle/berge-fotografiert-mit-handy_IMG_5187.jpg`, "berge"],
  [`${O}/03-medien-arbeit/praesentation-am-laptop_IMG_0607.jpg`, "praesentation", { brighten: 1.55 }],
  [`${O}/03-medien-arbeit/jimdo-07-social-media-workshop-vortrag.jpg`, "workshop"],
  [`${O}/03-medien-arbeit/jimdo-21-srf-kids-schreibend.png`, "srf"],
  [`${O}/04-eiskunstlauf/jimdo-15-zwei-laeuferinnen-medaillen.jpg`, "eis-jubel"],
  [`${O}/04-eiskunstlauf/jimdo-19-vier-laeuferinnen.jpg`, "eis-vier"],
  [`${O}/04-eiskunstlauf/jimdo-20-laeuferinnen-in-bewegung.jpg`, "eis-bewegung"],
  [`${O}/04-eiskunstlauf/jimdo-13-team-auf-eis-sw.jpg`, "eis-formation"],
  [`${O}/04-eiskunstlauf/jimdo-18-team-auf-eis.jpg`, "eis-team"],
  [`${O}/04-eiskunstlauf/jimdo-17-pokal-medaillen.jpg`, "eis-pokal"],
  [`${O}/04-eiskunstlauf/jimdo-06-medaillen-haende.jpg`, "eis-medaillen"],
  [`${O}/04-eiskunstlauf/jimdo-14-team-kathedrale.jpg`, "eis-reise"],
  [`${O}/05-grafiken/jimdo-09-make-it-click-workshop.png`, "make-it-click", { flatten: true }],
  [`${O}/05-grafiken/jimdo-08-visitenkarte-monogramm.png`, "visitenkarte", { flatten: true }],
  [`${O}/05-grafiken/jimdo-10-kennenlern-bingo-swisscom.png`, "bingo", { flatten: true }],
  // Editorial-Shooting
  [`${E}/hero-cinematic-bordeaux-16x9.png`, "ed-wide"],
  [`${E}/portrait-kinn-bordeaux-2x3.png`, "ed-kinn"],
  [`${E}/portrait-sw-blazer-schulter-2x3.png`, "ed-blazer"],
  [`${E}/sitzend-boden-bordeaux-2x3.png`, "ed-sitzend"],
  [`${E}/filmkamera-bordeaux-4x5.png`, "ed-kamera"],
  [`${E}/closeup-sw-4x5.png`, "ed-close"],
  // Textur
  ["assets/images/ai-png/07-texturen/beton-schatten-3x2.png", "beton"],
];

// Freisteller mit Transparenz (WebP mit Alpha + PNG-Fallback)
// hero-portrait.png: aus dem Kamera-Original freigestellt und mit tools/hero-cutout.mjs bereinigt
const CUTOUTS = [["assets/images/freigestellt/hero-portrait.png", "hero-portrait", [700, 1100, 1600]]];

await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(OUT, { recursive: true });
const manifest = {};

for (const [src, name, opt = {}] of PHOTOS) {
  let base = sharp(src).rotate();
  if (opt.brighten) base = base.modulate({ brightness: opt.brighten }).gamma(1.1);
  if (opt.flatten) base = base.flatten({ background: "#ffffff" });
  const buf = await base.toBuffer();
  const meta = await sharp(buf).metadata();
  const widths = WIDTHS.filter((w) => w < meta.width).concat(Math.min(meta.width, 1800)).filter((v, i, a) => a.indexOf(v) === i);
  for (const w of widths) await sharp(buf).resize({ width: w }).webp({ quality: 78 }).toFile(`${OUT}/${name}-${w}.webp`);
  const fw = Math.min(meta.width, 1080);
  await sharp(buf).resize({ width: fw }).jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(`${OUT}/${name}.jpg`);
  manifest[name] = { w: meta.width, h: meta.height, widths };
  console.log(`${name}: ${meta.width}×${meta.height} → ${widths.join("/")}`);
}

for (const [src, name, widths] of CUTOUTS) {
  const meta = await sharp(src).metadata();
  for (const w of widths) await sharp(src).resize({ width: w }).webp({ quality: 86, alphaQuality: 95, smartSubsample: true }).toFile(`${OUT}/${name}-${w}.webp`);
  await sharp(src).resize({ width: 900 }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(`${OUT}/${name}.png`);
  manifest[name] = { w: meta.width, h: meta.height, widths, alpha: true };
  console.log(`${name}: ${meta.width}×${meta.height} (Freisteller)`);
}

await fs.writeFile("lib/images.json", JSON.stringify(manifest, null, 2));
const total = (await fs.readdir(OUT)).length;
console.log(`${total} Dateien in ${OUT}`);

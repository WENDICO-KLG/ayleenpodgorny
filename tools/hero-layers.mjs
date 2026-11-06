// Hero-Ebenen für den Tiefen-Effekt (Foto hinten, Name, Ayleen vorne).
// Erzeugt zwei deckungsgleiche Bilder in derselben Grösse:
//   hero-foto.jpg    Hintergrund hell, warm und weich, Ayleen unverändert darauf
//   hero-person.png  nur Ayleen (Freisteller), liegt im Browser über dem Namen
//
//   swiftc -O tools/freistellen.swift -o /tmp/freistellen
//   /tmp/freistellen person-full assets/images/originale/01-portrait/jimdo-01-portrait-bambus.jpg /tmp/person-full.png
//   node tools/hero-layers.mjs assets/images/originale/01-portrait/jimdo-01-portrait-bambus.jpg /tmp/person-full.png assets/images/freigestellt
//   node tools/build-images.mjs
import sharp from "sharp";

const [, , photo, person, outDir] = process.argv;
if (!photo || !person || !outDir) throw new Error("Aufruf: node tools/hero-layers.mjs <foto> <person-full.png> <ausgabeordner>");

// Ausschnitt: oben etwas Himmel weg, damit der Kopf im oberen Drittel vor dem Namen steht
const meta = await sharp(photo).rotate().metadata();
const top = Math.round(meta.height * 0.17);
const crop = { left: 0, top, width: meta.width, height: meta.height - top };

const cut = await sharp(person).extract(crop).ensureAlpha().png().toBuffer();
// Kante minimal einziehen, damit kein Hintergrundsaum über dem Namen steht
const { data, info } = await sharp(cut).raw().toBuffer({ resolveWithObject: true });
for (let i = 3; i < data.length; i += 4) data[i] = Math.round(255 * Math.min(1, Math.max(0, (data[i] / 255 - 0.12) / 0.83)));
const personPng = await sharp(data, { raw: info }).png().toBuffer();

const { width, height } = info;
const cream = { r: 243, g: 235, b: 225, alpha: 0.42 };
const bg = await sharp(photo).rotate().extract(crop)
  .blur(3)
  .modulate({ saturation: 0.32, brightness: 1.08 })
  .composite([{ input: { create: { width, height, channels: 4, background: cream } } }])
  .toBuffer();

await sharp(bg).composite([{ input: personPng }])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(`${outDir}/hero-foto.jpg`);
await sharp(personPng).png({ compressionLevel: 9 }).toFile(`${outDir}/hero-person.png`);
console.log(`hero-foto.jpg + hero-person.png ${width}x${height}`);

// Hero-Freisteller aufbereiten (Eingabe: `freistellen.swift person …`):
// grünen Bambus-Saum entfernen, Lichtsaum an der Kante abdunkeln und leicht einziehen,
// dezent schärfen und graden, damit das Foto auf dem dunklen Weinrot sauber steht.
//   swiftc -O tools/freistellen.swift -o /tmp/freistellen
//   /tmp/freistellen person assets/images/originale/01-portrait/jimdo-01-portrait-bambus.jpg /tmp/person.png
//   node tools/hero-cutout.mjs /tmp/person.png assets/images/freigestellt/hero-portrait.png
import sharp from "sharp";

const [, , input, output] = process.argv;
const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const px = info.width * info.height;
for (let i = 0; i < px; i++) {
  const o = i * 4;
  let r = data[o], g = data[o + 1], b = data[o + 2];
  let a = data[o + 3] / 255;
  // Kante leicht einziehen: schwacher Schleier (Hintergrundlicht) verschwindet
  a = Math.min(1, Math.max(0, (a - 0.14) / 0.8));
  // Grünstich entfernen: Grün nie über Rot (Haut, Haare, Pullover sind warm)
  const lim = Math.max(r * 0.98, b);
  if (g > lim) g = lim;
  // halbtransparente Kante: aufgehelltes Hintergrundlicht abdunkeln
  if (a < 1) { const k = 0.5 + 0.5 * a; r *= k; g *= k; b *= k; }
  data[o] = r; data[o + 1] = g; data[o + 2] = b; data[o + 3] = Math.round(a * 255);
}
await sharp(data, { raw: info })
  .recomb([[1.03, 0, 0], [0, 1, 0], [0, 0, 0.95]])
  .modulate({ saturation: 0.94, brightness: 0.95 })
  .linear(1.1, -14)
  .sharpen({ sigma: 0.8, m1: 0.6, m2: 1.8 })
  .png({ compressionLevel: 9 })
  .toFile(output);
console.log(output, info.width, info.height);

// Freistellen von Bildern als transparente PNGs (macOS 14+).
//
//   swift tools/freistellen.swift info    <bild>
//   swift tools/freistellen.swift subject <bild> <ausgabe.png> [all|largest|1,2,...] [--shrink px] [--erase x,y,w,h] [--fade y0,y1]
//   swift tools/freistellen.swift logo    <bild> <ausgabe.png>
//   swift tools/freistellen.swift person  <bild> <ausgabe.png>
//
// subject: Apple Vision Foreground-Instance-Mask (wie "Motiv anheben" in Fotos),
//          auf das Motiv zugeschnitten, mit 3 % transparentem Rand.
// person:  Apple Vision Personen-Segmentierung (Qualität "accurate"), Maske kantenerhaltend
//          am Originalbild hochgerechnet (CIEdgePreserveUpsample): saubere Haarkanten.
// logo:    zweifarbige Grafik (Logo auf einfarbigem Grund): Hintergrundfarbe wird aus den
//          Ecken gelesen und mit weicher Kante in Transparenz umgerechnet.

import AppKit
import CoreImage
import Vision

setvbuf(stdout, nil, _IONBF, 0)
let args = CommandLine.arguments
func fail(_ msg: String) -> Never { FileHandle.standardError.write((msg + "\n").data(using: .utf8)!); exit(1) }
guard args.count >= 3 else { fail("Usage: freistellen.swift info|subject|logo <bild> [ausgabe] [instanzen]") }

let mode = args[1]
let input = URL(fileURLWithPath: args[2])
let ctx = CIContext(options: [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!])
let srgb = CGColorSpace(name: CGColorSpace.sRGB)!

func writePNG(_ image: CIImage, to path: String, padding: CGFloat = 0.03) {
    let pad = max(image.extent.width, image.extent.height) * padding
    let extent = image.extent.insetBy(dx: -pad, dy: -pad).integral
    let canvas = image.composited(over: CIImage(color: .clear).cropped(to: extent))
    do {
        try ctx.writePNGRepresentation(of: canvas, to: URL(fileURLWithPath: path), format: .RGBA8, colorSpace: srgb)
    } catch { fail("PNG schreiben fehlgeschlagen: \(error)") }
    print("\(path) \(Int(extent.width))x\(Int(extent.height))")
}

func instanceAreas(_ obs: VNInstanceMaskObservation) -> [Int: Int] {
    let buf = obs.instanceMask
    CVPixelBufferLockBaseAddress(buf, .readOnly); defer { CVPixelBufferUnlockBaseAddress(buf, .readOnly) }
    let w = CVPixelBufferGetWidth(buf), h = CVPixelBufferGetHeight(buf), row = CVPixelBufferGetBytesPerRow(buf)
    let base = CVPixelBufferGetBaseAddress(buf)!.assumingMemoryBound(to: UInt8.self)
    var areas: [Int: Int] = [:]
    for y in 0..<h { for x in 0..<w { let l = Int(base[y * row + x]); if l > 0 { areas[l, default: 0] += 1 } } }
    return areas
}

func foreground() -> (VNImageRequestHandler, VNInstanceMaskObservation) {
    let handler = VNImageRequestHandler(url: input)
    let req = VNGenerateForegroundInstanceMaskRequest()
    do { try handler.perform([req]) } catch { fail("Vision fehlgeschlagen: \(error)") }
    guard let obs = req.results?.first else { fail("Kein Vordergrund-Motiv gefunden: \(input.path)") }
    return (handler, obs)
}

switch mode {
case "info":
    let (_, obs) = foreground()
    let areas = instanceAreas(obs)
    let total = areas.values.reduce(0, +)
    for (label, a) in areas.sorted(by: { $0.key < $1.key }) {
        print("instanz \(label): \(String(format: "%.1f", Double(a) * 100 / Double(total))) %")
    }

case "subject":
    guard args.count >= 4 else { fail("Ausgabepfad fehlt") }
    let (handler, obs) = foreground()
    // Optionen: --shrink <px> (Kante nach innen ziehen gegen Halos, Standard 1.5)
    //           --erase x,y,w,h (Bereich entfernen; relativ 0–1, Ursprung oben links, mehrfach möglich)
    var shrink = 1.5
    var erase: [CGRect] = []
    var fade: (Double, Double)? = nil   // --fade y0,y1: nach unten weich ausblenden (relativ, oben = 0)
    var positional: [String] = []
    var k = 4
    while k < args.count {
        if args[k] == "--shrink", k + 1 < args.count { shrink = Double(args[k + 1]) ?? shrink; k += 2 }
        else if args[k] == "--fade", k + 1 < args.count {
            let v = args[k + 1].split(separator: ",").compactMap { Double($0) }
            if v.count == 2 { fade = (v[0], v[1]) }
            k += 2
        }
        else if args[k] == "--erase", k + 1 < args.count {
            let v = args[k + 1].split(separator: ",").compactMap { Double($0) }
            if v.count == 4 { erase.append(CGRect(x: v[0], y: v[1], width: v[2], height: v[3])) }
            k += 2
        } else { positional.append(args[k]); k += 1 }
    }
    let choice = positional.first ?? "all"
    var instances = obs.allInstances
    if choice == "largest" {
        let areas = instanceAreas(obs)
        instances = IndexSet(integer: areas.max(by: { $0.value < $1.value })!.key)
    } else if choice != "all" {
        instances = IndexSet(choice.split(separator: ",").compactMap { Int($0) })
    }
    do {
        let buf = try obs.generateMaskedImage(ofInstances: instances, from: handler, croppedToInstancesExtent: true)
        let img = CIImage(cvPixelBuffer: buf)
        let e = img.extent
        // Alpha als Graustufen-Maske, erodieren und minimal weichzeichnen
        var mask = img.applyingFilter("CIColorMatrix", parameters: [
            "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 1), "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 1),
            "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 1), "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0),
            "inputBiasVector": CIVector(x: 0, y: 0, z: 0, w: 1)])
        if shrink > 0 {
            mask = mask.applyingFilter("CIMorphologyMinimum", parameters: ["inputRadius": shrink])
                .applyingFilter("CIGaussianBlur", parameters: ["inputRadius": 0.7]).cropped(to: e)
        }
        for r in erase {
            let rect = CGRect(x: e.minX + r.minX * e.width, y: e.maxY - r.maxY * e.height,
                              width: r.width * e.width, height: r.height * e.height)
            mask = CIImage(color: .black).cropped(to: rect).composited(over: mask).cropped(to: e)
        }
        if let (y0, y1) = fade {
            let g = CIFilter(name: "CILinearGradient", parameters: [
                "inputPoint0": CIVector(x: e.midX, y: e.maxY - y0 * e.height), "inputColor0": CIColor.white,
                "inputPoint1": CIVector(x: e.midX, y: e.maxY - y1 * e.height), "inputColor1": CIColor.black])!
                .outputImage!.cropped(to: e)
            mask = mask.applyingFilter("CIMultiplyCompositing", parameters: ["inputBackgroundImage": g]).cropped(to: e)
        }
        let refined = img.applyingFilter("CIBlendWithMask", parameters: [
            "inputBackgroundImage": CIImage(color: .clear).cropped(to: e), "inputMaskImage": mask]).cropped(to: e)
        // nach dem Radieren auf die verbleibenden Pixel zuschneiden
        var finalImg = refined
        if !erase.isEmpty || fade != nil, let cg = ctx.createCGImage(refined, from: e) {
            let w = cg.width, h = cg.height
            var px = [UInt8](repeating: 0, count: w * h * 4)
            let c = CGContext(data: &px, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
                              space: srgb, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
            c.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))
            var minX = w, minY = h, maxX = 0, maxY = 0
            for y in 0..<h { for x in 0..<w where px[(y * w + x) * 4 + 3] > 8 {
                minX = min(minX, x); maxX = max(maxX, x); minY = min(minY, y); maxY = max(maxY, y) } }
            finalImg = refined.cropped(to: CGRect(x: e.minX + CGFloat(minX), y: e.minY + CGFloat(h - 1 - maxY),
                                                  width: CGFloat(maxX - minX + 1), height: CGFloat(maxY - minY + 1)))
        }
        writePNG(finalImg, to: args[3])
    } catch { fail("Maske fehlgeschlagen: \(error)") }

case "person":
    guard args.count >= 4 else { fail("Ausgabepfad fehlt") }
    guard let img = CIImage(contentsOf: input, options: [.applyOrientationProperty: true]) else { fail("Bild nicht lesbar") }
    print("Bild \(Int(img.extent.width))x\(Int(img.extent.height))")
    let req = VNGeneratePersonSegmentationRequest()
    req.qualityLevel = .accurate
    req.outputPixelFormat = kCVPixelFormatType_OneComponent8
    let handler = VNImageRequestHandler(ciImage: img)
    do { try handler.perform([req]) } catch { fail("Vision fehlgeschlagen: \(error)") }
    print("Segmentierung fertig")
    guard let buf = req.results?.first?.pixelBuffer else { fail("Keine Person gefunden") }
    let e = img.extent
    let raw = CIImage(cvPixelBuffer: buf)
    let small = raw.applyingFilter("CIColorMatrix", parameters: [
        "inputRVector": CIVector(x: 1, y: 0, z: 0, w: 0), "inputGVector": CIVector(x: 1, y: 0, z: 0, w: 0),
        "inputBVector": CIVector(x: 1, y: 0, z: 0, w: 0), "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputBiasVector": CIVector(x: 0, y: 0, z: 0, w: 1)]).cropped(to: raw.extent)
    print("Maske \(Int(small.extent.width))x\(Int(small.extent.height)) → \(Int(e.width))x\(Int(e.height))")
    let mask = img.applyingFilter("CIEdgePreserveUpsampleFilter", parameters: [
        "inputSmallImage": small, "inputSpatialSigma": 3.0, "inputLumaSigma": 0.12]).cropped(to: e)
    let cut = img.applyingFilter("CIBlendWithMask", parameters: [
        "inputBackgroundImage": CIImage(color: .clear).cropped(to: e), "inputMaskImage": mask]).cropped(to: e)
    // auf das Motiv zuschneiden
    guard let cg = ctx.createCGImage(mask, from: e) else { fail("Maske nicht renderbar") }
    let w = cg.width, h = cg.height
    var px = [UInt8](repeating: 0, count: w * h * 4)
    let c = CGContext(data: &px, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
                      space: srgb, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    c.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))
    var minX = w, minY = h, maxX = 0, maxY = 0
    for y in 0..<h { for x in 0..<w where px[(y * w + x) * 4] > 20 {
        minX = min(minX, x); maxX = max(maxX, x); minY = min(minY, y); maxY = max(maxY, y) } }
    writePNG(cut.cropped(to: CGRect(x: e.minX + CGFloat(minX), y: e.minY + CGFloat(h - 1 - maxY),
                                     width: CGFloat(maxX - minX + 1), height: CGFloat(maxY - minY + 1))), to: args[3], padding: 0.01)

case "logo":
    guard args.count >= 4 else { fail("Ausgabepfad fehlt") }
    guard let rep = NSBitmapImageRep(data: try! Data(contentsOf: input)),
          let cg = rep.cgImage else { fail("Bild nicht lesbar") }
    let w = cg.width, h = cg.height
    var px = [UInt8](repeating: 0, count: w * h * 4)
    let bctx = CGContext(data: &px, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
                         space: srgb, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    bctx.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))
    func rgb(_ i: Int) -> (Double, Double, Double) { (Double(px[i]), Double(px[i + 1]), Double(px[i + 2])) }
    func dist(_ a: (Double, Double, Double), _ b: (Double, Double, Double)) -> Double {
        let d0 = a.0 - b.0, d1 = a.1 - b.1, d2 = a.2 - b.2; return (d0 * d0 + d1 * d1 + d2 * d2).squareRoot()
    }
    // Hintergrund = Mittel der vier Ecken, Vordergrund = Mittel der am weitesten entfernten Pixel
    let corners = [0, (w - 1) * 4, (h - 1) * w * 4, ((h - 1) * w + w - 1) * 4].map(rgb)
    let bg = (corners.map(\.0).reduce(0, +) / 4, corners.map(\.1).reduce(0, +) / 4, corners.map(\.2).reduce(0, +) / 4)
    var maxD = 0.0
    for i in stride(from: 0, to: px.count, by: 4) { maxD = max(maxD, dist(rgb(i), bg)) }
    var fg = (0.0, 0.0, 0.0), n = 0.0
    for i in stride(from: 0, to: px.count, by: 4) where dist(rgb(i), bg) > maxD * 0.85 {
        let c = rgb(i); fg = (fg.0 + c.0, fg.1 + c.1, fg.2 + c.2); n += 1
    }
    fg = (fg.0 / n, fg.1 / n, fg.2 / n)
    let span = dist(fg, bg)
    var out = [UInt8](repeating: 0, count: w * h * 4)
    for i in stride(from: 0, to: px.count, by: 4) {
        // weiche Kante: 0–12 % Abstand = transparent, ab 88 % = voll deckend
        let t = min(1, max(0, (dist(rgb(i), bg) / span - 0.12) / 0.76))
        let a = t * 255
        out[i] = UInt8(fg.0 * t); out[i + 1] = UInt8(fg.1 * t); out[i + 2] = UInt8(fg.2 * t); out[i + 3] = UInt8(a)
    }
    let octx = CGContext(data: &out, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
                         space: srgb, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    let img = CIImage(cgImage: octx.makeImage()!)
    // auf deckende Pixel zuschneiden
    var minX = w, minY = h, maxX = 0, maxY = 0
    for y in 0..<h { for x in 0..<w where out[(y * w + x) * 4 + 3] > 8 {
        minX = min(minX, x); maxX = max(maxX, x); minY = min(minY, y); maxY = max(maxY, y) } }
    // CGContext-Zeile 0 = oben, CIImage y = unten
    let crop = CGRect(x: minX, y: h - 1 - maxY, width: maxX - minX + 1, height: maxY - minY + 1)
    writePNG(img.cropped(to: crop), to: args[3], padding: 0.06)

default:
    fail("Unbekannter Modus: \(mode)")
}

// Rebuilds public/images/me-cutout.{png,avif} for the hero.
//
// Keeps the owner's own background removal (public/no_background.png, 1896x2400): its alpha is
// scaled up to the original photo's resolution (2022x2560) and applied to the original's sharper
// pixels. Nothing is re-segmented. Then crops to the approved framing and adds a light sharpen.
//
// usage (macOS, from the project root):
//   swiftc -O scripts/photo/build-hero-cutout.swift -o /tmp/build-hero-cutout
//   /tmp/build-hero-cutout <original.jpg> public/no_background.png public/images
//
// The cut-out must be an exact scale of the original (checked: 0 px offset, 0.56/255 mean RGB error).
import Foundation
import CoreImage
import ImageIO
import UniformTypeIdentifiers

let (cx, cy, cw, ch) = (192, 387, 1638, 1618)   // approved framing, in original-photo pixels
let args = CommandLine.arguments
guard args.count == 4 else { print("usage: build-hero-cutout <original.jpg> <no_background.png> <outdir>"); exit(1) }
let (srcPath, maskPath, outDir) = (args[1], args[2], args[3])
let srgb = CGColorSpace(name: CGColorSpace.sRGB)!
let ctx = CIContext(options: [.workingColorSpace: srgb])
let src = CIImage(contentsOf: URL(fileURLWithPath: srcPath))!
let user = CIImage(contentsOf: URL(fileURLWithPath: maskPath))!

// User alpha -> grey mask, scaled to the original's size.
let alphaAsGrey = user.applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 1), "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 1),
    "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 1), "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0),
    "inputBiasVector": CIVector(x: 0, y: 0, z: 0, w: 1)])
let k = src.extent.height / user.extent.height
let mask = alphaAsGrey.clampedToExtent()
    .applyingFilter("CILanczosScaleTransform", parameters: [kCIInputScaleKey: k, kCIInputAspectRatioKey: (src.extent.width/user.extent.width)/k])
    .cropped(to: src.extent)
    .applyingFilter("CIColorClamp")

let sharp = src.applyingFilter("CIUnsharpMask", parameters: [kCIInputRadiusKey: 1.4, kCIInputIntensityKey: 0.3]).cropped(to: src.extent)
let clear = CIImage(color: .clear).cropped(to: src.extent)
let cut = sharp.applyingFilter("CIBlendWithMask", parameters: [kCIInputBackgroundImageKey: clear, kCIInputMaskImageKey: mask])
let rect = CGRect(x: cx, y: Int(src.extent.height) - cy - ch, width: cw, height: ch)   // CI origin is bottom-left
let cg = ctx.createCGImage(cut, from: rect, format: .RGBA8, colorSpace: srgb)!

func write(_ name: String, _ type: String, _ props: [CFString: Any]) {
    let d = CGImageDestinationCreateWithURL(URL(fileURLWithPath: name) as CFURL, type as CFString, 1, nil)!
    CGImageDestinationAddImage(d, cg, props as CFDictionary); CGImageDestinationFinalize(d)
    let size = (try? FileManager.default.attributesOfItem(atPath: name)[.size] as? Int) ?? 0
    print("wrote \(name) \(cg.width)x\(cg.height) \(size/1024) KB")
}
write("\(outDir)/me-cutout.png", UTType.png.identifier, [:])
write("\(outDir)/me-cutout.avif", "public.avif", [kCGImageDestinationLossyCompressionQuality: 0.8])

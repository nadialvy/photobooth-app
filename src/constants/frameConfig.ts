// ===================== FRAME CONFIGURATION =====================
// Author: Nadia Lovely
// Date: 2023-10-02
// Description:
// This configuration maps a photo frame from Figma design into actual
// canvas coordinates used in the photo booth web app. It ensures that the photo
// is correctly positioned within the visible area ("photo hole") of the polaroid frame.
//
// The convertFigmaToCanvasArea() function scales Figma coordinates to match
// the canvas resolution used during rendering (e.g. 3000x4000).
//
// How to use:
// 1. Make sure the frame PNG you use has no extra transparent padding
//    on any side (top, left, bottom, right). Crop precisely.
//    Example: 'single-frame-1.png'
// 2. Measure the "photo hole" inside your polaroid using Figma (in the original Figma scale):
//    - `x`: Distance from the left side of the canvas to the start of the photo hole
//    - `y`: Distance from the top to the start of the photo hole
//    - `width`: Width of the hole
//    - `height`: Height of the hole
// 3. Enter those Figma values into convertFigmaToCanvasArea()
//    along with the original Figma frame size and the target canvas size (used for rendering)
//
// Example measurement used below:
//    Figma Frame Size: 1706 x 2282
//    Canvas Render Size: 3000 x 4000
//    Photo Hole (in Figma): x: 117, y: 163, width: 1469, height: 1644
//
// Resulting frameConfig will provide accurate placement during render via html2canvas
// ==============================================================

import { convertFigmaToCanvasArea } from "@/lib/scaleUtils";

export const frameConfig = {
  polaroid1: {
    id: "polaroid1",
    path: "/images/polaroid-frame/single-frame-1.png",
    canvasSize: { width: 3000, height: 4000 },
    photoArea: convertFigmaToCanvasArea(
      { x: 117, y: 163, width: 1469, height: 1644 }, // measurement from Figma
      { width: 1706, height: 2282 }, // original Figma frame size
      { width: 3000, height: 4000 } // target canvas size. always use 3000 x 4000
    )
  }
};

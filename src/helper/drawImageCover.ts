export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  areaX: number,
  areaY: number,
  areaWidth: number,
  areaHeight: number
) {
  ctx.save();

  // Step 1: Buat clip area
  ctx.beginPath();
  ctx.rect(areaX, areaY, areaWidth, areaHeight);
  ctx.clip();
  

  // Step 2: Rasio
  const imgRatio = img.width / img.height;
  const areaRatio = areaWidth / areaHeight;

  let drawWidth, drawHeight;

  if (imgRatio > areaRatio) {
    // Foto terlalu lebar → crop sisi kiri-kanan
    drawHeight = areaHeight;
    drawWidth = areaHeight * imgRatio;
  } else {
    // Foto terlalu tinggi → crop atas-bawah
    drawWidth = areaWidth;
    drawHeight = areaWidth / imgRatio;
  }

  // Step 3: Hitung offset buat center
  const offsetX = areaX - (drawWidth - areaWidth) / 2;
  const offsetY = areaY - (drawHeight - areaHeight) / 2;

  // Step 4: Gambar!
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  ctx.restore();

}

function calculate() {
  const widthFt = parseFloat(document.getElementById('width').value);
  const heightFt = parseFloat(document.getElementById('height').value);
  const pixelPitch = parseFloat(document.getElementById('pixelPitch').value);
  const cabinetSize = document.getElementById('cabinetSize').value;

  if (!widthFt || !heightFt) {
    alert("Please enter both width and height.");
    return;
  }

  // Convert feet to millimeters
  const widthMm = widthFt * 304.8;
  const heightMm = heightFt * 304.8;

  // Resolution calculation
  const widthPx = Math.floor(widthMm / pixelPitch);
  const heightPx = Math.floor(heightMm / pixelPitch);
  const totalPixels = widthPx * heightPx;

  // Aspect Ratio (not simplified)
  const aspectRatio = `${widthPx}:${heightPx}`;

  // Cabinet logic
  const [cabinetW, cabinetH] = cabinetSize.split('x').map(Number);
  const cabinetsHoriz = Math.ceil(widthMm / cabinetW);
  const cabinetsVert = Math.ceil(heightMm / cabinetH);
  const totalCabinets = cabinetsHoriz * cabinetsVert;

  // Show results
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h2>Results</h2>
    <p><strong>Width:</strong> ${widthPx} px</p>
    <p><strong>Height:</strong> ${heightPx} px</p>
    <p><strong>Total Pixels:</strong> ${totalPixels.toLocaleString()}</p>
    <p><strong>Aspect Ratio:</strong> ${aspectRatio}</p>
    <hr/>
    <p><strong>Cabinets (WxH):</strong> ${cabinetW}mm x ${cabinetH}mm</p>
    <p><strong>Cabinet Layout:</strong> ${cabinetHoriz} x ${cabinetVert}</p>
    <p><strong>Total Cabinets:</strong> ${totalCabinets}</p>
  `;
}

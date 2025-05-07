function calculate() {
  const widthFt = parseFloat(document.getElementById('width').value);
  const heightFt = parseFloat(document.getElementById('height').value);
  const pixelPitch = parseFloat(document.getElementById('pixelPitch').value);
  const cabinetSize = document.getElementById('cabinetSize').value;

  if (!widthFt || !heightFt || !pixelPitch || !cabinetSize) {
    alert("Please fill in all fields (Width, Height, Pixel Pitch, Cabinet Size).");
    return;
  }

  // Convert feet to millimeters
  const widthMm = widthFt * 304.8;
  const heightMm = heightFt * 304.8;

  // Pixel calculations
  const widthPx = Math.floor(widthMm / pixelPitch);
  const heightPx = Math.floor(heightMm / pixelPitch);
  const totalPixels = widthPx * heightPx;
  const aspectRatio = `${widthPx}:${heightPx}`;

  // Cabinet layout calculations
  const [cabinetW, cabinetH] = cabinetSize.split('x').map(Number);
  const cabinetsHoriz = Math.ceil(widthMm / cabinetW);
  const cabinetsVert = Math.ceil(heightMm / cabinetH);
  const totalCabinets = cabinetsHoriz * cabinetsVert;

  // Preview Grid
  const cabinetPreview = document.getElementById('cabinetPreview');
  cabinetPreview.innerHTML = '';
  cabinetPreview.style.gridTemplateColumns = `repeat(${cabinetsHoriz}, 1fr)`;
  cabinetPreview.style.gridTemplateRows = `repeat(${cabinetsVert}, 1fr)`;

  for (let i = 0; i < totalCabinets; i++) {
    const div = document.createElement('div');
    div.className = 'cabinet';
    div.innerText = `Cabinet ${i + 1}`;
    div.style.aspectRatio = `${cabinetW} / ${cabinetH}`; // Optional: for visual proportion
    cabinetPreview.appendChild(div);
  }

  // Power calculation
  const powerPerCabinet = 160;
  const totalPower = totalCabinets * powerPerCabinet;

  // Resolution tier
  let resolutionTier = '';
  if (totalPixels < 921600) {
    resolutionTier = 'SD (Standard Definition)';
  } else if (totalPixels < 1280000) {
    resolutionTier = 'HD Ready (720p)';
  } else if (totalPixels < 2100000) {
    resolutionTier = 'Full HD (1080p)';
  } else if (totalPixels < 8300000) {
    resolutionTier = '2K / 4K UHD';
  } else {
    resolutionTier = '8K UHD';
  }

  // Output results
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h2>Results</h2>
    <p><strong>Width:</strong> ${widthPx} px</p>
    <p><strong>Height:</strong> ${heightPx} px</p>
    <p><strong>Total Pixels:</strong> ${totalPixels.toLocaleString()}</p>
    <p><strong>Aspect Ratio:</strong> ${aspectRatio}</p>
    <hr/>
    <p><strong>Cabinets (WxH):</strong> ${cabinetW}mm x ${cabinetH}mm</p>
    <p><strong>Cabinet Layout:</strong> ${cabinetsHoriz} x ${cabinetsVert}</p>
    <p><strong>Total Cabinets:</strong> ${totalCabinets}</p>
    <p><strong>Estimated Power Consumption:</strong> ${totalPower} W</p>
    <p><strong>Resolution Tier:</strong> ${resolutionTier}</p>
  `;
}

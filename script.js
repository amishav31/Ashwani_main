function calculate() { 
  const widthFt = parseFloat(document.getElementById('width').value);
  const heightFt = parseFloat(document.getElementById('height').value);
  const pixelPitch = parseFloat(document.getElementById('pixelPitch').value);
  const cabinetSize = document.getElementById('cabinetSize').value;

  if (!widthFt || !heightFt) {
    alert("Please enter both width and height.");
    return;
  }

  const widthMm = widthFt * 304.8;
  const heightMm = heightFt * 304.8;

  const widthPx = Math.floor(widthMm / pixelPitch);
  const heightPx = Math.floor(heightMm / pixelPitch);
  const totalPixels = widthPx * heightPx;

  const aspectRatio = `${widthPx}:${heightPx}`;

  const [cabinetW, cabinetH] = cabinetSize.split('x').map(Number);
  const cabinetsHoriz = Math.ceil(widthMm / cabinetW);
  const cabinetsVert = Math.ceil(heightMm / cabinetH);
  const totalCabinets = cabinetsHoriz * cabinetsVert;
  // Draw cabinet grid
const cabinetPreview = document.getElementById('cabinetPreview');
cabinetPreview.innerHTML = ''; // Clear previous
cabinetPreview.style.gridTemplateColumns = `repeat(${cabinetsHoriz}, 1fr)`;
cabinetPreview.style.gridTemplateRows = `repeat(${cabinetsVert}, 1fr)`;

for (let i = 0; i < cabinetsVert * cabinetsHoriz; i++) {
    const div = document.createElement('div');
    div.className = 'cabinet';
    div.innerText = `Cabinet ${i + 1}`;
    cabinetPreview.appendChild(div);
}


  // Estimate power consumption
  const powerPerCabinet = 160; // in Watts
  const totalPower = totalCabinets * powerPerCabinet;

  // Determine resolution tier
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

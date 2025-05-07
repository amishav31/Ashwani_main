function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("opacity-0");
  toast.classList.add("opacity-100");

  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0");
  }, 3000);
}

function calculate() {
  const widthFt = parseFloat(document.getElementById('width').value);
  const heightFt = parseFloat(document.getElementById('height').value);
  const pixelPitch = parseFloat(document.getElementById('pixelPitch').value);
  const cabinetSize = document.getElementById('cabinetSize').value;

  if (!widthFt || !heightFt || !pixelPitch || !cabinetSize) {
    showToast("Please fill in all fields (Width, Height, Pixel Pitch, Cabinet Size).");
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

  // Cabinet layout preview
  const cabinetPreview = document.getElementById('cabinetPreview');
  cabinetPreview.innerHTML = '';
  cabinetPreview.className = 'grid gap-1';
  cabinetPreview.style.gridTemplateColumns = `repeat(${cabinetsHoriz}, minmax(0, 1fr))`;

  for (let i = 0; i < totalCabinets; i++) {
    const div = document.createElement('div');
    div.className = 'bg-blue-500 text-white text-xs font-semibold flex items-center justify-center rounded shadow aspect-square';
    div.textContent = `#${i + 1}`;
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

  // Display results with fade-in animation
  const resultDiv = document.getElementById('result');
  resultDiv.style.opacity = '0'; // reset
  resultDiv.innerHTML = `
    <h2 class="text-xl font-semibold mb-2">Results</h2>
    <ul class="space-y-1 text-sm">
      <li><strong>Width:</strong> ${widthPx} px</li>
      <li><strong>Height:</strong> ${heightPx} px</li>
      <li><strong>Total Pixels:</strong> ${totalPixels.toLocaleString()}</li>
      <li><strong>Aspect Ratio:</strong> ${aspectRatio}</li>
      <hr class="my-2"/>
      <li><strong>Cabinets (WxH):</strong> ${cabinetW}mm x ${cabinetH}mm</li>
      <li><strong>Cabinet Layout:</strong> ${cabinetsHoriz} x ${cabinetsVert}</li>
      <li><strong>Total Cabinets:</strong> ${totalCabinets}</li>
      <li><strong>Estimated Power Consumption:</strong> ${totalPower} W</li>
      <li><strong>Resolution Tier:</strong> ${resolutionTier}</li>
    </ul>
  `;

  // Animate fade-in
  setTimeout(() => {
    resultDiv.style.opacity = '1';
  }, 50);
}

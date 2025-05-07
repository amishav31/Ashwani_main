function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("opacity-0");
  toast.classList.add("opacity-100");

  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0");
  }, duration);
}

function calculate() {
  const widthFt = parseFloat(document.getElementById('width').value);
  const heightFt = parseFloat(document.getElementById('height').value);
  const pixelPitch = parseFloat(document.getElementById('pixelPitch').value);
  const cabinetSize = document.getElementById('cabinetSize').value;

  if (isNaN(widthFt) || isNaN(heightFt) || isNaN(pixelPitch) || !cabinetSize) {
    showToast("Please enter valid values for all fields.");
    return;
  }

  if (widthFt <= 0 || heightFt <= 0 || pixelPitch <= 0) {
    showToast("Values must be greater than zero.");
    return;
  }

  const [cabinetW, cabinetH] = cabinetSize.split('x').map(Number);
  if (isNaN(cabinetW) || isNaN(cabinetH) || cabinetW <= 0 || cabinetH <= 0) {
    showToast("Invalid cabinet size.");
    return;
  }

  // Convert feet to mm
  const widthMm = widthFt * 304.8;
  const heightMm = heightFt * 304.8;

  // Pixel resolution
  const widthPx = Math.floor(widthMm / pixelPitch);
  const heightPx = Math.floor(heightMm / pixelPitch);
  const totalPixels = widthPx * heightPx;

  // Calculate aspect ratio (rounded to nearest integer ratio)
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(widthPx, heightPx);
  const aspectRatio = `${Math.round(widthPx / divisor)}:${Math.round(heightPx / divisor)}`;

  // Cabinet layout
  const cabinetsHoriz = Math.ceil(widthMm / cabinetW);
  const cabinetsVert = Math.ceil(heightMm / cabinetH);
  const totalCabinets = cabinetsHoriz * cabinetsVert;

  // Cabinet preview
  const cabinetPreview = document.getElementById('cabinetPreview');
  cabinetPreview.innerHTML = '';
  cabinetPreview.style.gridTemplateColumns = `repeat(${cabinetsHoriz}, minmax(0, 1fr))`;

  for (let i = 0; i < totalCabinets; i++) {
    const div = document.createElement('div');
    div.className = 'bg-blue-500 text-white text-xs font-semibold flex items-center justify-center rounded shadow aspect-square';
    div.textContent = `#${i + 1}`;
    cabinetPreview.appendChild(div);
  }

  // Power consumption (Wattage)
  const powerPerCabinet = 160;
  const totalPower = totalCabinets * powerPerCabinet;

  // Resolution tier classification
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

  // Display results
  const resultDiv = document.getElementById('result');
  resultDiv.style.opacity = '0';
  resultDiv.innerHTML = `
    <h2 class="text-xl font-semibold mb-2">Results</h2>
    <ul class="space-y-1 text-sm">
      <li><strong>Width:</strong> ${widthPx.toLocaleString()} px</li>
      <li><strong>Height:</strong> ${heightPx.toLocaleString()} px</li>
      <li><strong>Total Pixels:</strong> ${totalPixels.toLocaleString()}</li>
      <li><strong>Aspect Ratio:</strong> ${aspectRatio}</li>
      <hr class="my-2"/>
      <li><strong>Cabinet Size:</strong> ${cabinetW} mm x ${cabinetH} mm</li>
      <li><strong>Layout (H × V):</strong> ${cabinetsHoriz} × ${cabinetsVert}</li>
      <li><strong>Total Cabinets:</strong> ${totalCabinets}</li>
      <li><strong>Estimated Power Usage:</strong> ${totalPower} W</li>
      <li><strong>Resolution Tier:</strong> ${resolutionTier}</li>
    </ul>
  `;
  setTimeout(() => {
    resultDiv.style.opacity = '1';
  }, 50);
}

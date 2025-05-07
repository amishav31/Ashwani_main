function calculate() {
  const widthFt = parseFloat(document.getElementById('width').value);
  const heightFt = parseFloat(document.getElementById('height').value);
  const pixelPitch = parseFloat(document.getElementById('pixelPitch').value);

  if (!widthFt || !heightFt) {
    alert("Please enter both width and height.");
    return;
  }

  // Convert ft to mm (1 ft = 304.8 mm)
  const widthMm = widthFt * 304.8;
  const heightMm = heightFt * 304.8;

  // Calculate resolution
  const widthPx = Math.floor(widthMm / pixelPitch);
  const heightPx = Math.floor(heightMm / pixelPitch);
  const totalPixels = widthPx * heightPx;

  // Display the result
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h2>Results</h2>
    <p><strong>Width:</strong> ${widthPx} px</p>
    <p><strong>Height:</strong> ${heightPx} px</p>
    <p><strong>Total Pixels:</strong> ${totalPixels.toLocaleString()}</p>
    <p><strong>Aspect Ratio:</strong> ${widthPx}:${heightPx}</p>
  `;
}

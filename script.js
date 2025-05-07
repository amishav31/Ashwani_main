document.getElementById('calculateBtn').addEventListener('click', function () {
    const widthFt = parseFloat(document.getElementById('width').value);
    const heightFt = parseFloat(document.getElementById('height').value);
    const pixelPitch = parseFloat(document.getElementById('pixelPitch').value);
    const cabinetSize = document.getElementById('cabinetSize').value.split('x').map(Number);
    const cabinetWidthMM = cabinetSize[0];
    const cabinetHeightMM = cabinetSize[1];

    if (isNaN(widthFt) || isNaN(heightFt) || isNaN(pixelPitch)) {
        alert("Please enter valid numeric values.");
        return;
    }

    const mmPerFoot = 304.8;
    const widthMM = widthFt * mmPerFoot;
    const heightMM = heightFt * mmPerFoot;

    const widthPx = Math.round(widthMM / pixelPitch);
    const heightPx = Math.round(heightMM / pixelPitch);
    const totalPixels = widthPx * heightPx;

    const cabinetsX = Math.ceil(widthMM / cabinetWidthMM);
    const cabinetsY = Math.ceil(heightMM / cabinetHeightMM);
    const totalCabinets = cabinetsX * cabinetsY;

    const aspectRatio = `${widthPx}:${heightPx}`;

    // Estimated power consumption
    const powerPerCabinet = 160; // Watts
    const totalPower = totalCabinets * powerPerCabinet;

    // Resolution tier based on totalPixels
    let resolutionTier = '';
    if (totalPixels < 921600) {
        resolutionTier = 'SD (Standard Definition)';
    } else if (totalPixels < 1000000) {
        resolutionTier = 'HD Ready (720p)';
    } else if (totalPixels < 2100000) {
        resolutionTier = 'Full HD (1080p)';
    } else if (totalPixels < 2300000) {
        resolutionTier = '2K';
    } else if (totalPixels < 8300000) {
        resolutionTier = '4K UHD';
    } else {
        resolutionTier = '8K UHD';
    }

    const resultsHTML = `
        <h3>Results</h3>
        <p><strong>Width:</strong> ${widthPx} px</p>
        <p><strong>Height:</strong> ${heightPx} px</p>
        <p><strong>Total Pixels:</strong> ${totalPixels.toLocaleString()}</p>
        <p><strong>Aspect Ratio:</strong> ${aspectRatio}</p>
        <hr>
        <p><strong>Cabinets (WxH):</strong> ${cabinetWidthMM}mm x ${cabinetHeightMM}mm</p>
        <p><strong>Cabinet Layout:</strong> ${cabinetsX} x ${cabinetsY}</p>
        <p><strong>Total Cabinets:</strong> ${totalCabinets}</p>
        <p><strong>Estimated Power Consumption:</strong> ${totalPower} W</p>
        <p><strong>Resolution Tier:</strong> ${resolutionTier}</p>
    `;

    document.getElementById('results').innerHTML = resultsHTML;
});

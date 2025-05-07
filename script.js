const indoorCabinetSize = 576; // in mm
const outdoorCabinetSize = 960; // in mm

document.getElementById("type").addEventListener("change", function() {
    const type = this.value;
    const pixelInput = document.getElementById("pixel");
    if (type === "indoor") {
        pixelInput.placeholder = "P1.8 - P4";
        pixelInput.disabled = false;
    } else {
        pixelInput.placeholder = "P5 - P10";
        pixelInput.disabled = false;
    }
});

function calculate() {
    const length = parseInt(document.getElementById("length").value);
    const width = parseInt(document.getElementById("width").value);
    const type = document.getElementById("type").value;
    const pixelPitch = parseFloat(document.getElementById("pixel").value);

    let cabinetSize, viewingDistance;

    if (type === "indoor") {
        cabinetSize = indoorCabinetSize;
        viewingDistance = 3;
    } else {
        cabinetSize = outdoorCabinetSize;
        viewingDistance = 10;
   }

    const totalArea = length * width;
    const cabinetArea = cabinetSize * cabinetSize;
    const totalCabinets = Math.ceil(totalArea / cabinetArea);

    document.getElementById("total-cabinets").innerText = totalCabinets;
    document.getElementById("total-area").innerText = totalArea + " mm²";

    createPreview(totalCabinets, length, width, cabinetSize);
}

function createPreview(cabinets, length, width, cabinetSize) {
    let previewDiv = document.getElementById("preview");
    previewDiv.innerHTML = '';

    const rows = Math.ceil(length / cabinetSize);
    const cols = Math.ceil(width / cabinetSize);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const div = document.createElement("div");
            div.className = "cabinet";
            previewDiv.appendChild(div);
        }
    }
}

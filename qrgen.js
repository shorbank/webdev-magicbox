document.getElementById("generateButton").addEventListener("click", () => {
  const textInput = document.getElementById("textInput").value.trim();
  if (!textInput) {
    alert("Bitte einen Text eingeben!");
    return;
  }

  // Clean up the input text for the file name
  let sanitizedText = textInput
    .replace(/[<>:"/\\|?*.,]/g, "_") // Removes unauthorised characters
    .replace(/_+/g, "_") // Replaces several consecutive `_` with a single `_`
    .replace(/^_|_$/g, "");

  const qrCodeContainer = document.getElementById("qrCodeContainer");
  qrCodeContainer.className = "qrContent";
  qrCodeContainer.innerHTML = "";
  qrCodeContainer.style.display = "block";

  // Create QR code canvas
  new QRCode(qrCodeContainer, {
    text: textInput,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  document.getElementById("buttonContainer").style.display = "block";
});

document.getElementById("textInput").addEventListener("input", () => {
  const textInput = document.getElementById("textInput").value.trim();
  const qrCodeContainer = document.getElementById("qrCodeContainer");
  const buttonContainer = document.getElementById("buttonContainer");
  const hintBox = document.getElementById("hintBox");

  qrCodeContainer.innerHTML = "";
  qrCodeContainer.style.display = "none";
  buttonContainer.style.display = "none";
  
  // Reload QRCode.js script to avoid canvas bug
  const oldScript = document.querySelector('script[src*="qrcode.js"]');
  if (oldScript) {
    const newScript = document.createElement('script');
    newScript.src = oldScript.src;
    oldScript.remove();
    document.body.appendChild(newScript);
  }

  // Hint box based on the length of the text
  if (textInput.length > 30) {
    hintBox.style.display = "block";
  } else {
    hintBox.style.display = "none";
  }
});

// Save as PNG
document.getElementById("savePngButton").onclick = () => {
  const textInput = document.getElementById("textInput").value.trim();
  let sanitizedText = textInput
    .replace(/[<>:"/\\|?*.,]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  const qrCodeContainer = document.getElementById("qrCodeContainer");
  const canvas = qrCodeContainer.querySelector("canvas");
  if (canvas) {
    const link = document.createElement("a");
    link.download = "QR_" + sanitizedText + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } else {
    alert("Fehler: Canvas nicht gefunden!");
  }
};

// Save as SVG
document.getElementById("saveSvgButton").onclick = () => {
  const textInput = document.getElementById("textInput").value.trim();
  let sanitizedText = textInput
    .replace(/[<>:"/\\|?*.,]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  const tempContainer = document.createElement("div");
  new QRCode(tempContainer, {
    text: textInput,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
    useSVG: true,
  });

  const svg = tempContainer.querySelector("svg");
  if (svg) {
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svg)], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.download = "QR_" + sanitizedText + ".svg";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  } else {
    alert("Fehler: SVG konnte nicht generiert werden!");
  }
};
document.addEventListener("DOMContentLoaded", function () {
    const keyGenerateButton = document.getElementById("keyGenerateButton");
    const keyInput = document.getElementById("keyInput");
    const keyOutputContainer = document.getElementById("keyOutputContainer");
  
    const downloadButtonContainer = document.createElement("div");
    downloadButtonContainer.id = "downloadButtonContainer";
    downloadButtonContainer.style.marginTop = "20px";
    keyOutputContainer.insertAdjacentElement("afterend", downloadButtonContainer);
  
    const radioSort = document.createElement("div");
    radioSort.className = "radioSort";
    radioSort.innerHTML = `
      <label>
        <input type="radio" name="sortOption" value="original" checked>
        Original Reihenfolge
      </label>
      <label>
        <input type="radio" name="sortOption" value="alphabetical">
        Alphabetisch sortiert
      </label>
    `;
    downloadButtonContainer.appendChild(radioSort);
  
    const downloadTxtButton = document.createElement("button");
    downloadTxtButton.className = "downloadBtn";
    downloadTxtButton.innerHTML = `
      <img src="/img/FileDownload.svg" style="width: 16px;">
      <p>Download als .txt</p>
    `;
    downloadTxtButton.style.marginTop = "10px";
    downloadButtonContainer.appendChild(downloadTxtButton);
  
    const downloadCsvButton = document.createElement("button");
    downloadCsvButton.className = "downloadBtn";
    downloadCsvButton.innerHTML = `
      <img src="/img/FileDownload.svg" style="width: 16px;">
      <p>Download als .csv</p>
    `;
    downloadCsvButton.style.marginTop = "10px";
    downloadButtonContainer.appendChild(downloadCsvButton);
  
    function generateIndividualCode() {
      const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // without I, O, J
      const numbers = '123456789'; // without 0
      let code = '';
  
      // First Character must be a letter
      code += letters.charAt(Math.floor(Math.random() * letters.length));
  
      // Remaining 5 characters
      const characters = letters + numbers;
      for (let i = 0; i < 5; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
  
      // Make sure that at least one number is included
      if (!/\d/.test(code)) {
        const randomIndex = Math.floor(Math.random() * (code.length - 1)) + 1;
        code =
          code.substring(0, randomIndex) +
          numbers.charAt(Math.floor(Math.random() * numbers.length)) +
          code.substring(randomIndex + 1);
      }
  
      return code;
    }
  
    function generateUniqueCodes(numCodes) {
      const generatedCodes = new Set();
  
      while (generatedCodes.size < numCodes) {
        const newCode = generateIndividualCode();
        generatedCodes.add(newCode);
      }
  
      return Array.from(generatedCodes);
    }
  
    keyGenerateButton.addEventListener("click", function (event) {
      event.stopPropagation();
  
      const number = parseInt(keyInput.value, 10);
  
      if (isNaN(number) || number <= 0) {
        alert("Bitte eine gültige Zahl größer als 0 eingeben!");
        return;
      }
  
      keyOutputContainer.innerHTML = "";
      keyOutputContainer.className = "keyOutputContainer";
  
      const codes = generateUniqueCodes(number);
  
      codes.forEach((code) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = code;
        keyOutputContainer.appendChild(paragraph);
      });
  
      // TXT-Download
      downloadTxtButton.onclick = function (event) {
        event.stopPropagation();
  
        const sortOption = document.querySelector(
          'input[name="sortOption"]:checked'
        ).value;
        const codesToDownload =
          sortOption === "alphabetical" ? codes.sort() : codes;
  
        const blob = new Blob([codesToDownload.join("\n")], {
          type: "text/plain;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement("a");
        link.href = url;
        link.download = "key-codes.txt";
        link.click();
  
        URL.revokeObjectURL(url);
      };
  
      // CSV-Download
      downloadCsvButton.onclick = function (event) {
        event.stopPropagation();
  
        const sortOption = document.querySelector(
          'input[name="sortOption"]:checked'
        ).value;
        const codesToDownload =
          sortOption === "alphabetical" ? codes.sort() : codes;
  
        const csvContent =
          "data:text/csv;charset=utf-8," +
          codesToDownload.map((code) => `"${code}"`).join("\n");
  
        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = "key-codes.csv";
        link.click();
      };
    });
  
    const radioButtons = document.querySelectorAll('input[name="sortOption"]');
    radioButtons.forEach((radioButton) => {
      radioButton.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });
  });
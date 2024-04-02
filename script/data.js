"use strict";

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

// Bật sự kiện nhấn vào nút Export
btnExport.addEventListener("click", function () {
  const isExport = confirm("Bạn có chắc muốn Export?");
  if (isExport) {
    saveStaticDataToFile();
  }
});

// Hàm: lưu dữ liệu xuống file
function saveStaticDataToFile() {
  // tạo dữ liệu để lưu xuống file
  const blob = new Blob([JSON.stringify(petArr, null, 2)], {
    type: "application/json",
  });

  // lưu file
  saveAs(blob, "petData.json");
  //Dùng thư viện FileSave.js
}

// Bắt sự kiện nhấn vào Import
btnImport.addEventListener("click", function () {
  if (fileInput.files.length > 0) {
    var reader = new FileReader();
    reader.readAsText(fileInput.files[0], "UTF-8");
    reader.onload = function (evt) {
      const data = JSON.parse(evt.target.result);
      for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id != data[i].id) return (petArr = data.concat(petArr));
        else return data && alert("import thành công !");
      }
    };
    reader.onerror = function (evt) {
      alert("error reading file");
    };
  } else {
    alert("Xin vui lòng chọn file Json!");
  }
});

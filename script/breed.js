"use strict";

const submitBtn = document.getElementById("submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");

// check xem có bị trùng Breed và type hay ko
function checkUnique(breed, type) {
  for (let i = 0; i < breedArr.length; i++) {
    if (breedArr[i].breed == breed && breedArr[i].type == type) {
      alert("Breed must be Unique!");
      return false;
    }
  }
  return true;
}

// hiện cảnh báo khi chưa điền Breed
function checkBreed(data) {
  if (data.breed == "Input Breed") {
    alert("Please input Breed!");
    return false;
  }
  return true;
}

// check xem đã chọn Type chưa
function checkType(data) {
  if (data.type == "Select Type") {
    alert("Please select Type!");
    return false;
  }
  return true;
}

// điều kiện để nhập dữ liệu
function validateData(data) {
  if (checkBreed(data) && checkType(data) && checkUnique(data.breed, data.type))
    return true;
  return false;
}

function renderTableBreed() {
  tableBodyEl.innerHTML = "";
  for (var i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    var breedItem = breedArr[i];
    row.innerHTML = `
    <td scope="col">${i + 1}</td>
    <td scope="col">${breedItem.breed}</td>
    <td scope="col">${breedItem.type}</td>
    <button class="btn btn-danger" onclick="deleteBreed('${
      breedItem.breed
    }')">Delete</button>
  `;
    tableBodyEl.appendChild(row);
  }
}

const deleteBreed = (breed) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr.length; i++)
      if (breedArr[i].breed == breed) {
        breedArr.splice(i, 1);
        // //Lưu vao localStorage
        saveToStorage("breedArr", breedArr);
        renderTableBreed(breedArr);
        break;
      }
  }
};

function clearInputBreed() {
  typeInput.value = "Select Type";
  breedInput.value = "";
}

//nut submit
submitBtn.addEventListener("click", function (e) {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  // validate giữ liệu
  const validate = validateData(data);
  if (validate) {
    breedArr.push(data);
    clearInputBreed();
    // //Lưu vao localStorage
    saveToStorage("breedArr", breedArr);
    renderTableBreed(breedArr);
  }
});
renderTableBreed(breedArr);

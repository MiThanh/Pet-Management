"use strict";
const formEl = document.getElementById("container-form");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  const check = "bi bi-check-circle-fill";
  const noncheck = "bi bi-x-circle-fill";
  for (var i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    var pet = petArr[i];
    row.innerHTML = `<th scope="row">${pet.id} </th>
                    <td>${pet.name}</td>
                    <td>${pet.age} y</td>
                    <td>${pet.type}</td>
                    <td>${pet.weight} kg</td>
                    <td>${pet.length} cm</td>
                    <td>${pet.breed}</td>
                    <td>
                      <i class="bi bi-square-fill" style="color:${
                        pet.color
                      }"></i>
                    </td>
                    <td><i class="${
                      pet.healthyPet.vaccinated ? check : noncheck
                    }"></i></td>
                    <td><i class="${
                      pet.healthyPet.dewormed ? check : noncheck
                    }"></i></td>
                    <td><i class="${
                      pet.healthyPet.sterilized ? check : noncheck
                    }"></i></td>
                    <td>01/03/2022</td>
                    <button class="btn btn-warning" onclick="editPet('${
                      pet.id
                    }')">Edit</button>
                    </td>`;
    tableBodyEl.appendChild(row);
  }
}
// renderTableData(petArr);
// Hàm Edit
function editPet(id) {
  formEl.classList.remove("hide");
  //Tìm đén thú cưng cần Edit
  const pet = petArr.find((petItem) => petItem.id === id);
  //  hiện thị những thông tin thú cưng lên form nhập
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  breedInput.value = pet.breed;
  vaccinatedInput.checked = pet.healthyPet.vaccinated;
  dewormedInput.checked = pet.healthyPet.dewormed;
  sterilizedInput.checked = pet.healthyPet.sterilized;

  renderBreed();
  breedInput.value = `${pet.breed}`;
}

typeInput.addEventListener("click", renderBreed);

function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  const BreedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
  const BreedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");

  // nếu type là Dog
  if (typeInput.value === "Dog") {
    BreedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
  // Neu type la Cat
  else if (typeInput.value === "Cat") {
    BreedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

function checkUnique(id) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id == id) {
      alert("ID must be Unique!");
      return false;
    }
  }
  return true;
}

function checkInput(data) {
  if (data.id == "") {
    alert("please input for ID");
    return false;
  }
  return true;
}

function checkType(data) {
  if (data.type == "Select Type") {
    alert("Please select Type!");
    return false;
  }
  return true;
}

function checkBreed(data) {
  if (data.breed == "Select Breed") {
    alert("Please select Breed!");
    return false;
  }
  return true;
}

function checkBetween(val, min, max) {
  if (val >= min && val <= max) {
    return true;
  }
  alert(`Age must be between ${min} and ${max}!`);
  return false;
}

function validateData(data) {
  if (
    checkInput(data) &&
    checkBetween(data.age, 1, 15) &&
    checkBetween(data.weight, 1, 15) &&
    checkBetween(data.length, 1, 100) &&
    checkType(data) &&
    checkBreed(data)
  )
    return true;
  return false;
}

submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    healthyPet: {
      vaccinated: vaccinatedInput.checked,
      dewormed: dewormedInput.checked,
      sterilized: sterilizedInput.checked,
    },
  };

  function clearInput() {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select type";
    weightInput.value = "";
    lengthInput.value = "";
    breedInput.value = "Select Breed";
    colorInput.value = "#000000";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
  }

  const validate = validateData(data);
  if (validate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    // giữ ngày thêm thú cưng như cũ
    data.date = petArr[index].date;
    // cập nhật lại dữ liệu thú cưng đang Edit
    petArr[index] = data;

    saveToStorage("petArr", petArr);
    // ẩn form đi
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});

renderTableData(petArr);

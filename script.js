"use strict";

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

// const healthybtn = document.getElementById("healthy-btn");
const btnHealthyPet = document.getElementById("healthy-btn");
const btnBMI = document.getElementById("BMI-btn");

let healthyPetArr = [];

// const healthyPetArr = [];

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
    checkUnique(data.id) &&
    checkBetween(data.age, 1, 15) &&
    checkBetween(data.weight, 1, 15) &&
    checkBetween(data.length, 1, 100) &&
    checkType(data) &&
    checkBreed(data)
  )
    return true;
  return false;
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

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  const check = "bi bi-check-circle-fill";
  const noncheck = "bi bi-x-circle-fill";
  for (var i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    var pet = petArr[i];
    row.innerHTML = `<th scope="row">${pet.id} </th>
                    <td>${pet.name}</td>
                    <td>${pet.age} y </td>
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
                    <td>${pet.BMI}</td>
                    <td>01/03/2022</td>
                    <button class="btn btn-danger" onclick="deletePet('${
                      pet.id
                    }')">Delete</button>
                    </td>`;
    tableBodyEl.appendChild(row);
  }
}

const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++)
      if (petArr[i].id == petId) {
        petArr.splice(i, 1);
        // cập nhật lại dữ liệu dưới Local Starage
        saveToStorage("petArr", petArr);
        // Gọi lại hàm hiển thị
        renderTableData(petArr);
        break;
      }
  }
};

submitBtn.addEventListener("click", function (e) {
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
    BMI: "?",
    date: new Date(),
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
    petArr.push(data);
    clearInput();
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
    if (
      data.healthyPet.vaccinated &&
      data.healthyPet.sterilized &&
      data.healthyPet.dewormed
    )
      healthyPetArr.push(data);
  }
});
renderTableData(petArr);

// Hien thi cac thu cung khoe manh
btnHealthyPet.addEventListener("click", function () {
  if (btnHealthyPet.textContent === "Show All Pet") {
    renderTableData(petArr);
    btnHealthyPet.textContent = "Show Healthy Pet";
  } else {
    healthyPet();
    btnHealthyPet.textContent = "Show All Pet";
  }
});

const healthyPet = function () {
  for (let i = 0; i < petArr.length; i++) {
    if (
      petArr[i].vaccinated === true &&
      petArr[i].dewormed === true &&
      petArr[i].sterilized === true
    ) {
      petArr.push(healthyPetArr);
    }
    renderTableData(healthyPetArr);
    break;
  }
};
// tinh chi số BMI
btnBMI.addEventListener("click", function () {
  BMICalculate();
  renderTableData(petArr);
});

function BMICalculate() {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type == "Dog")
      petArr[i].BMI = (petArr[i].weight * 703) / petArr[i].length ** 2;
    if (petArr[i].type == "Cat")
      petArr[i].BMI = (petArr[i].weight * 886) / petArr[i].length ** 2;
  }
}

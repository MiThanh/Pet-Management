"use strict";
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");

const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

// Hàm hiển thị danh sách thú cưng
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
                    
                    <td>01/03/2022</td>
                    
                    </td>`;
    tableBodyEl.appendChild(row);
  }
}

// Hiên toan bo thu cung
renderTableData(petArr);

findBtn.addEventListener("click", function () {
  let petArrFind = petArr;
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }

  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }

  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }

  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.healthyPet.vaccinated === true);
  }

  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.healthyPet.dewormed === true);
  }

  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.healthyPet.sterilized === true);
  }
  renderTableData(petArrFind);
});

// Ham hien thi Breed
renderBreed();

function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}

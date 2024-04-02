"use strict";
const sidebarEl = document.getElementById("sidebar");

sidebarEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

const petArr = getFromStorage("petArr") || [];
const breedArr = getFromStorage("breedArr") || [];

// Lấy dữ liệu từ LocalStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Lưu vào LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

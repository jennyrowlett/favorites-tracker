import { data } from "./data.js";

/*** CONSTANTS ***/
const gridContainer = document.getElementById("grid");
const monthlyView = document.getElementById("monthlyView");
const bookView = document.getElementById("book-btn");
const songView = document.getElementById("song-btn");
const movieView = document.getElementById("movie-btn");

// renders months
let gridHTML = "";
for (let i = 0; i < data.length; i++) {
  gridHTML += `
    <div class="grid-item" id="${data[i].name}">${data[i].name}</div>`;
}
gridContainer.innerHTML = gridHTML;

// filter elements for view
function getElements(elementType) {
  let elementHTML = "";
  const collection = document.getElementsByClassName(elementType);
  for (let i = 0; i < collection.length; i++) {
    elementHTML += `<div class="grid-item">${collection[i].outerHTML}</div>`;
  }
  gridContainer.innerHTML = elementHTML;
}

//save element to storage
function saveElement(month, type, title) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].compareMonth(month)) {
      //if found the correct month
      if (type === "book") {
        data[i].book = title;
      } else if (type === "movie") {
        data[i].movie = title;
      } else {
        data[i].song = title;
      }
    }
  }
}

function renderElement(month) {
  const monthEl = document.getElementById(month);
  let gridItemHTML = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i].compareMonth(month)) {
      if (data[i].book) {
        gridItemHTML += `<div>Book: ${data[i].book}</div>`;
      }
      if (data[i].movie) {
        gridItemHTML += `<div>Movie: ${data[i].movie}</div>`;
      }
      if (data[i].song) {
        gridItemHTML += `<div>Song: ${data[i].song}</div>`;
      }
    }
  }
  monthEl.innerHTML = `${month}${gridItemHTML}`;
}

/*** EVENT LISTENERS ***/
// puts form entry into data storage
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault(); //prevents page refresh
  const selectedMonth = document.getElementById("month").value;
  const selectedElement = document.getElementById("item").value.toLowerCase();
  const itemTitle = document.getElementById("title").value;
  saveElement(selectedMonth, selectedElement, itemTitle);
  renderElement(selectedMonth);
});

bookView.addEventListener("click", () => getElements("book"));
songView.addEventListener("click", () => getElements("song"));
movieView.addEventListener("click", () => getElements("movie"));

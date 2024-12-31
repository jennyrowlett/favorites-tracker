import { data } from "./data.js";

/*** CONSTANTS ***/
const gridContainer = document.getElementById("grid");
const monthlyView = document.getElementById("monthly-btn");
const bookView = document.getElementById("book-btn");
const songView = document.getElementById("song-btn");
const movieView = document.getElementById("movie-btn");

// render grid
const renderGrid = () => {
  const gridHTML = data
    .map(
      (item) => `<div class="grid-item" id="${item.name}">${item.name}</div>`
    )
    .join("");
  gridContainer.innerHTML = gridHTML;
};

// filter elements for view
function getElements(elementType) {
  let elementHTML = "";
  for (let i = 0; i < data.length; i++) {
    let month = data[i];
    if (month[elementType])
      elementHTML += `<div class="grid-item" id="${month.name}">${month[elementType]}</div>`;
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
        gridItemHTML += `<div class="book">Book: ${data[i].book}</div>`;
      }
      if (data[i].movie) {
        gridItemHTML += `<div class="movie">Movie: ${data[i].movie}</div>`;
      }
      if (data[i].song) {
        gridItemHTML += `<div class="song">Song: ${data[i].song}</div>`;
      }
    }
  }
  monthEl.innerHTML = `${month}${gridItemHTML}`;
  console.log(monthEl);
}

function getMonthly() {
  console.log("inside monthly function", data);
  renderGrid();
  let gridItemHTML = "";
  for (let i = 0; i < data.length; i++) {
    renderElement(data[i].name);
  }
}

/*** EVENT LISTENERS ***/
// puts form entry into data storage
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault(); //prevents page refresh
  const selectedMonth = document.getElementById("month").value;
  const selectedElement = document.getElementById("item").value.toLowerCase();
  const itemTitle = document.getElementById("title").value;
  saveElement(selectedMonth, selectedElement, itemTitle);
  console.log(data);
  renderElement(selectedMonth);
});

bookView.addEventListener("click", () => getElements("book"));
songView.addEventListener("click", () => getElements("song"));
movieView.addEventListener("click", () => getElements("movie"));
console.log(monthlyView);
monthlyView.addEventListener("click", () => getMonthly());

renderGrid();

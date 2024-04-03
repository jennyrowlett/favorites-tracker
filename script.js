var months = {
  January: "1",
  February: "2",
  March: "3",
  April: "4",
  May: "5",
  June: "6",
  July: "7",
  August: "8",
  September: "9",
  October: "10",
  November: "11",
  December: "12",
};

// Add values to dropdown
const subjectSel = document.getElementById("subject");
Object.keys(months).forEach((month) => {
  const newOption = document.createElement("option");
  newOption.value = month;
  newOption.text = month;
  subjectSel.appendChild(newOption);
});

// Add grid
const gridContainer = document.getElementById("grid-container");
Object.keys(months).forEach((key, index) => {
  const newDiv = document.createElement("div");
  newDiv.className = "grid-item";
  newDiv.id = index + 1;
  newDiv.innerHTML = "<strong>" + key + "</strong>";
  gridContainer.appendChild(newDiv);
  console.log(newDiv);
});

function add_book() {
  const book = document.getElementById("book").value;
  if (book == "") {
    alert("Please enter a title");
    return false;
  }
  const month = months[subjectSel.value];
  const currDiv = document.getElementById(month);
  var text = document.createElement("p");
  text.innerText = "Favorite book: " + book;
  currDiv.appendChild(text);
}

function add_movie() {
  const movie = document.getElementById("movie").value;
  if (movie == "") {
    alert("Please enter a title");
    return false;
  }
  const month = months[subjectSel.value];
  const currDiv = document.getElementById(month);
  var text = document.createElement("p");
  text.innerText = "Favorite movie: " + movie;
  currDiv.appendChild(text);
}

function add_song() {
  const song = document.getElementById("song").value;
  if (song == "") {
    alert("Please enter a title");
    return false;
  }
  const month = months[subjectSel.value];
  const currDiv = document.getElementById(month);
  var text = document.createElement("p");
  text.innerText = "Favorite song: " + song;
  currDiv.appendChild(text);
}

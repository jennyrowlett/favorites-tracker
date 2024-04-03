const months = {
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

// Get current month for dropdown menu
const today = new Date();
const currMonth = today.getMonth() + 1;

// Add values to dropdown
const subjectSel = document.getElementById("subject");

Object.keys(months).forEach((month) => {
  const newOption = document.createElement("option");
  newOption.text = month;
  subjectSel.appendChild(newOption);
});

subjectSel.selectedIndex = currMonth - 1;

// Add grid
const gridContainer = document.getElementById("grid-container");
Object.keys(months).forEach((key, index) => {
  const newDiv = document.createElement("div");
  newDiv.className = "grid-item";
  newDiv.id = index + 1;
  newDiv.innerHTML = "<strong>" + key + "</strong>";
  gridContainer.appendChild(newDiv);
});

function add(val) {
  const item = document.getElementById(val).value;
  document.getElementById(val).value = "";
  if (item == "") {
    alert("Please enter a title");
    return false;
  }
  const month = months[subjectSel.value];
  const currDiv = document.getElementById(month);
  const newDiv = document.createElement("div");
  var text = document.createElement("p");
  text.id = "Favorite-" + val + "-" + month;
  text.innerText = "Favorite " + val + ": " + item;
  newDiv.append(text);
  const [edit, done] = add_button(val, month);
  console.log(edit);
  newDiv.append(edit);
  newDiv.append(done);
  currDiv.appendChild(newDiv);
  console.log(text);
}

function book_func(func) {
  add("book");
}

function movie_func(func) {
  add("movie");
}
function song_func(func) {
  add("song");
}

function add_button(val, month) {
  const edit = document.createElement("button");
  edit.type = "submit";
  edit.id = "edit-" + val + "-" + month;
  edit.innerText = "Edit";
  console.log("inside", edit);
  const done = document.createElement("button");
  done.type = "submit";
  done.id = "done-" + val + "-" + month;
  done.innerText = "Done";
  return [edit, done];
}
//Get edit button
// const edit_button = document.getElementById("edit-editing");

// edit_button.addEventListener("click", function () {
//   paragraph.contentEditable = true;
//   paragraph.style.backgroundColor = "#dddbdb";
// });

document.addEventListener("click", editButton);
document.addEventListener("click", doneButton);

function editButton(event) {
  var element = event.target;
  if (element.id == "edit-book-4") {
    const paragraph = document.getElementById("Favorite-book-4");
    paragraph.contentEditable = true;
    paragraph.style.backgroundColor = "#F4F4F4";
  }
}

function doneButton(event) {
  var element = event.target;
  if (element.id == "done-book-4") {
    const paragraph = document.getElementById("Favorite-book-4");
    paragraph.contentEditable = false;
    paragraph.style = null;
  }
}

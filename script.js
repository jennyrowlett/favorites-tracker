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
const subjectSel = document.getElementById("month");

Object.keys(months).forEach((month) => {
  const newOption = document.createElement("option");
  newOption.text = month;
  subjectSel.appendChild(newOption);
});

subjectSel.selectedIndex = currMonth - 1;

// Get favorite dropdown
const favoriteSel = document.getElementById("item-type");

// Favorite dropdown values
const itemTypes = ["Book", "Movie", "Song"];
for (let i = 0; i < itemTypes.length; i++) {
  const newOption = document.createElement("option");
  newOption.text = itemTypes[i];
  favoriteSel.appendChild(newOption);
}

// Add grid
const gridContainer = document.getElementById("grid-container");
Object.keys(months).forEach((key, index) => {
  const newDiv = document.createElement("div");
  newDiv.className = "grid-item";
  newDiv.id = index + 1;
  newDiv.innerHTML = "<strong>" + key + "</strong>";
  gridContainer.appendChild(newDiv);
});

// Get input
const input = document.getElementById("title");

// Event listener
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleAdd();
  }
});

function add_button(val, month) {
  const btn = document.createElement("button");
  btn.type = "submit";
  btn.id = "btn-" + val + "-" + month;
  btn.innerText = "Edit";
  btn.edit = false;
  btn.addEventListener("click", handleEdit);
  return btn;
}

function handleAdd() {
  const favorite = favoriteSel.value;
  add(favorite);
}

function handleEdit(event) {
  const element = event.target;
  const divTarget = "Favorite-" + element.id.substring(4);
  if (element.edit == false) {
    const paragraph = document.getElementById(divTarget);
    paragraph.contentEditable = true;
    paragraph.style.backgroundColor = "#F4F4F4";
    element.innerText = "Done";
    element.edit = true;
  } else {
    const paragraph = document.getElementById(divTarget);
    paragraph.contentEditable = false;
    paragraph.style = null;
    element.innerText = "Edit";
    element.edit = false;
  }
}

// Add favorite to grid
function add(val) {
  //Get month
  const month = months[subjectSel.value];
  const currDiv = document.getElementById(month);

  //Get input value
  const item = input.value;

  console.log(item);
  //Set input to blank
  document.getElementById("title").value = "";

  //Check if the item is empty
  if (item == "") {
    alert("Please enter a title");
    return false;
  }

  //Check if month already has 3 favorites
  if (currDiv.children.length == 4) {
    alert("Favorite number has been reached");
    return false;
  }

  const newDiv = document.createElement("div");
  var itemText = document.createElement("p");
  var text = document.createElement("p");
  itemText.innerText = "Favorite " + val + ": ";
  text.id = "Favorite-" + val + "-" + month;
  text.innerText = item;
  newDiv.append(itemText);
  newDiv.append(text);
  const btn = add_button(val, month);
  newDiv.append(btn);
  currDiv.appendChild(newDiv);
}

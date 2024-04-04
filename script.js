const favoritesData = {
  January: { id: "1", data: new Map() },
  February: { id: "2", data: new Map() },
  March: { id: "3", data: new Map() },
  April: { id: "4", data: new Map() },
  May: { id: "5", data: new Map() },
  June: { id: "6", data: new Map() },
  July: { id: "7", data: new Map() },
  August: { id: "8", data: new Map() },
  September: { id: "9", data: new Map() },
  October: { id: "10", data: new Map() },
  November: { id: "11", data: new Map() },
  December: { id: "12", data: new Map() },
};

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

const gridContainer = document.getElementById("grid-container");

Object.keys(favoritesData).forEach((key, index) => {
  const newDiv = document.createElement("div");
  newDiv.className = "grid-item";
  newDiv.id = index + 1;
  newDiv.innerHTML += "<strong>" + key + "</strong>";
  if (localStorage.getItem(newDiv.id) != null) {
    const childDivs = JSON.parse(localStorage.getItem(newDiv.id));
    newDiv.innerHTML += childDivs;
    const divs = newDiv.getElementsByTagName("div");
    for (i = 0; i < divs.length; i++) {
      favoritesData[key].data.set(divs[i].id, divs[i]);
      reload_button(divs[i].getElementsByTagName("button")[0]);
    }
  }
  gridContainer.appendChild(newDiv);
});

// Get input
const input = document.getElementById("title");

// Event listener for adding an item
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleAdd();
  }
});

function reload_button(btn) {
  btn.innerText = "Edit";
  btn.edit = false;
  btn.addEventListener("click", handleEdit);
}

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

function handleClear() {
  localStorage.clear();
  location.reload();
}

// Add favorite to grid
function add(val) {
  //Get month
  const month = months[subjectSel.value];
  const currDiv = document.getElementById(month);

  //Get input value
  const item = input.value;

  //   console.log(item);

  //Set input to blank
  document.getElementById("title").value = "";

  //Check if the item is empty
  if (item == "") {
    alert("Please enter a title");
    return false;
  }

  // // Check if month already has 3 favorites
  // if (currDiv.children.length == 4) {
  //   alert("Favorite number has been reached");
  //   return false;
  // }

  const newDiv = document.createElement("div");
  newDiv.id = val + "-" + month;

  var itemText = document.createElement("p");
  itemText.innerText = "Favorite " + val + ": ";
  newDiv.append(itemText);

  var text = document.createElement("p");
  text.id = "Favorite-" + val + "-" + month;
  text.innerText = item;
  newDiv.append(text);

  if (favoritesData[subjectSel.value].data.has(text.id)) {
    alert("Favorite " + val.toLowerCase() + " already added for this month");
  } else {
    const btn = add_button(val, month);

    newDiv.append(btn);

    favoritesData[subjectSel.value].data.set(text.id, newDiv);

    currDiv.appendChild(newDiv);
    const childDivHTML = reorder_divs(currDiv);
    localStorage.setItem(currDiv.id, JSON.stringify(childDivHTML));
  }
}

function reorder_divs(currDiv) {
  var childDivHTML = "";
  var divs = currDiv.getElementsByTagName("div");
  var listitems = [];
  for (i = 0; i < divs.length; i++) {
    listitems.push(divs.item(i));
  }
  listitems.sort(function (a, b) {
    var compA = a.getAttribute("id");
    var compB = b.getAttribute("id");
    return compA < compB ? -1 : compA > compB ? 1 : 0;
  });
  for (i = 0; i < listitems.length; i++) {
    currDiv.appendChild(listitems[i]);
    childDivHTML += listitems[i].outerHTML;
  }
  return childDivHTML;
}

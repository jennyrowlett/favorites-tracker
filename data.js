const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const data = {};

months.forEach((month) => {
  data[month] = {
    book: {
      title: "",
      author: "",
      image: "",
    },
    movie: {
      title: "",
      author: "",
      image: "",
    },
    song: {
      title: "",
      author: "",
      image: "",
    },
  };
});

export function addItem(month, category, title, author = null, image = null) {
  // Check if the month and category exist in the data structure
  if (data[month] && data[month][category]) {
    data[month][category].title = title;

    // If author is provided, set it
    if (author !== null) {
      data[month][category].author = author;
    }

    // If image is provided, set it
    if (image !== null) {
      data[month][category].image = image;
    }
  } else {
    console.log(`Invalid month or category: ${month}, ${category}`);
  }
}

export function removeItem(month, category) {
  // Check if the month and category exist
  if (data[month] && data[month][category]) {
    // Remove the item data by setting it to empty strings
    data[month][category] = {
      title: "",
      author: "",
      image: "",
    };
    console.log(`${category} removed from ${month}.`);
  } else {
    console.log(`Invalid month or category: ${month}, ${category}`);
  }
}

export function saveJSON(data, filename) {
  const jsonData = JSON.stringify(data, null, 2); // Convert data to a JSON string with indentation for readability

  // Create a Blob from the JSON data
  const blob = new Blob([jsonData], { type: "application/json" });

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob); // Create a URL for the Blob
  link.download = filename; // Set the file name for the download

  // Programmatically trigger a click event to start the download
  link.click();
}

export { data };

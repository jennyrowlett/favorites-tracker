import { data, addItem } from "./data.js";

/*** CONSTANTS ***/
const credentialsFilePath = "credentials.json";
const gridContainer = document.getElementById("grid");
const monthlyView = document.getElementById("monthly-btn");
const bookView = document.getElementById("book-btn");
const songView = document.getElementById("song-btn");
const movieView = document.getElementById("movie-btn");
const form = document.getElementById("form");

/*** HELPER FUNCTIONS ***/

// Helper function to get book image based on title using Google Books API
const getBookImage = async (title, author) => {
  let query = "";
  if (title) query += `intitle:${title}`;
  if (author) query += `+inauthor:${author}`;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&maxResults=1&key=${googleBooksAPI}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const bookThumbnail = data.items
      ? data.items[0]?.volumeInfo?.imageLinks?.thumbnail
      : null;
    return bookThumbnail;
  } catch (error) {
    console.error("Error fetching book image:", error);
    return "";
  }
};

// Renders a grid item for a specific element (book, song, movie) type
const renderElementsByType = async (elementType) => {
  const promises = Object.entries(data).map(async ([month, details]) => {
    let itemHTML = "";

    if (details[elementType] && details[elementType].title) {
      itemHTML = `<div class="grid-item" id="${month}">${details[elementType].title}`;

      if (elementType === "book") {
        let bookImage = details[elementType]["image"];

        if (!bookImage) {
          // Fetch the book image asynchronously if it's not present
          bookImage = await getBookImage(details[elementType].title);
          details[elementType]["image"] = bookImage; // Store the fetched image in the details
          console.log("fetched book");
        }

        // Append the image to the itemHTML
        itemHTML += `<br/><img src="${bookImage}" alt="Book cover" />`;
      }
      itemHTML += `</div>`;
    }
    return itemHTML; // Ensure each iteration returns a valid HTML string
  });

  // Wait for all promises to resolve and join the results into a single string
  const gridHTML = (await Promise.all(promises)).join("");
  gridContainer.innerHTML = gridHTML;
};

// Render detailed information (book, song, movie) for a specific month
const renderMonthDetails = (monthName) => {
  const monthEl = document.getElementById(monthName);
  const monthData = data[monthName];
  if (monthData) {
    let gridItemHTML = "";
    if (monthData.book?.title) {
      gridItemHTML += `<div class="book">Book: ${monthData.book.title}</div>`;
    }
    if (monthData.movie?.title) {
      gridItemHTML += `<div class="movie">Movie: ${monthData.movie.title}</div>`;
    }
    if (monthData.song?.title) {
      gridItemHTML += `<div class="song">Song: ${monthData.song.title}</div>`;
    }

    monthEl.innerHTML = `${monthName}${gridItemHTML}`;
  }
};

// Render the full monthly view (grid + month details)
const renderMonthlyView = () => {
  //Render grid
  gridContainer.innerHTML = Object.keys(data)
    .map((month) => {
      return `<div class="grid-item" id="${month}">${month}</div>`;
    })
    .join("");

  // After rendering the grid, render details for each month
  Object.keys(data).map((month) => renderMonthDetails(month));
};

/*** EVENT HANDLERS ***/

// Form submission handler (save book, song, or movie)
const handleFormSubmit = (event) => {
  event.preventDefault(); // Prevent page refresh

  const selectedMonth = document.getElementById("month").value;
  const selectedElement = document.getElementById("item").value.toLowerCase();
  const itemTitle = document.getElementById("title").value;
  const itemAuthor = document.getElementById("author").value;

  addItem(selectedMonth, selectedElement, itemTitle, itemAuthor);
  renderMonthDetails(selectedMonth);
};

// Button click handlers to filter grid by element type (book, movie, song)
const handleFilterByType = (type) => {
  return () => renderElementsByType(type);
};

/*** EVENT LISTENERS ***/

// Form listener for saving elements
form.addEventListener("submit", handleFormSubmit);

// View-type button listeners
bookView.addEventListener("click", handleFilterByType("book"));
songView.addEventListener("click", handleFilterByType("song"));
movieView.addEventListener("click", handleFilterByType("movie"));
monthlyView.addEventListener("click", renderMonthlyView);

/*** INITIAL SETUP ***/

// Load the credentials
const googleBooksAPI = await fetch("credentials.json")
  .then((response) => response.json()) // Parse the JSON response
  .then((data) => {
    const googleBooksAPI = data.googleBooksAPI; // Use the API key from JSON
    console.log("Loaded API key:", googleBooksAPI);
    return googleBooksAPI;
  })
  .catch((error) => console.error("Error loading credentials:", error));

// Initially render the full monthly view (grid + month details)
renderMonthlyView();

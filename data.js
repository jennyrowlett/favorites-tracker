export class Month {
  constructor(name = "") {
    this._name = name;
    this._book = null;
    this._movie = null;
    this._song = null;
  }

  set name(newName) {
    this._name = newName;
  }

  get name() {
    return this._name;
  }

  compareMonth = function (otherMonth) {
    if (otherMonth === this.name) {
      return true;
    }
  };
  set book(newBook) {
    this._book = newBook;
  }

  get book() {
    return this._book;
  }

  set movie(newMovie) {
    this._movie = newMovie;
  }

  get movie() {
    return this._movie;
  }

  set song(newSong) {
    this._song = newSong;
  }

  get song() {
    return this._song;
  }
}

//Array for backend data
let data = [];

//Function to create data
const createData = () => {
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
  for (let i = 0; i < months.length; i++) {
    data.push(new Month(months[i]));
  }
};

createData();
export { data };

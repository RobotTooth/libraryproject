// Parent class
class Media {
  constructor(title) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  get title() {
    return this._title;
  }

  get isCheckedOut() {
    return this._isCheckedOut;
  }

  get ratings() {
    return this._ratings;
  }

  set isCheckedOut(status) {
    this._isCheckedOut = status;
  }

  /*getAverageRating() {
    let sum = 0;
    for (let i = 0; i < this.ratings.length; i++) {
      sum += this.ratings[i];
    }
    return sum / this.ratings.length;
  }*/

  getAverageRating() {
    let sum = this.ratings.reduce(
      (accumulator, current) => accumulator + current
    );
    return sum / this.ratings.length;
  }

  toggleCheckOutStatus() {
    this.isCheckedOut = !this.isCheckedOut;
  }

  addRating(newRating) {
    if (newRating > 0 && newRating < 6) {
      this.ratings.push(newRating);
    }
  }
}
// Child class'
class Book extends Media {
  constructor(author, title, pages) {
    super(title);
    this._author = author;
    this._pages = pages;
  }

  get author() {
    return this._author;
  }

  get pages() {
    return this._pages;
  }
}

class Movie extends Media {
  constructor(director, title, runTime) {
    super(title);
    this._director = director;
    this._runTime = runTime;
    this._movieCast = [];
  }

  get director() {
    return this._director;
  }

  get runTime() {
    return this._runTime;
  }

  get movieCast() {
    return this._movieCast;
  }

  set movieCast(cast) {
    this._movieCast = cast;
  }

  addCastMembers(...castMember) {
    this.movieCast.push(...castMember);
  }

  listCastMembers() {
    for (let castMember in this.movieCast) {
      console.log(this.movieCast[castMember]);
    }
  }
}
class Cd extends Media {
  constructor(artist, title) {
    super(title);
    this._artist = artist;
    this._songs = [];
  }
  get artist() {
    return this._artist;
  }

  get songs() {
    return this._songs;
  }

  set songs(song) {
    this._songs = song;
  }

  addSong(...song) {
    this.songs.push(...song);
  }

  listSongs() {
    for (let song in this.songs) {
      console.log(this.songs[song]);
    }
  }
  shuffle() {
    let shuffledSongs = [];
    for (let song = 0; song < this.songs.length; song++) {
      let songIndex = Math.floor(Math.random() * this.songs.length);
      if (shuffledSongs.includes(this.songs[songIndex])) {
        --song;
      } else if (songIndex < this.songs.length) {
        shuffledSongs.push(this.songs[songIndex]);
      }
    }
    for (let song in shuffledSongs) {
      console.log(shuffledSongs[song]);
    }
  }
}

// Catalog class

class Catalog {
  constructor() {
    this._catalog = [];
  }

  get media() {
    return this._catalog;
  }

  set media(media) {
    this._catalog = media;
  }

  addToCatalog(...item) {
    this.media.push(...item);
  }

  listCatalogItems() {
    for (let item in this.media) {
      // Display CD details
      if (this.media[item] instanceof Cd) {
        console.log(
          `CD:\nTitle: ${this.media[item].title}\nArtist: ${this.media[item].artist}\nSongs:`
        );
        let trackNum = 1;
        for (let song = 0; song < this.media[item].songs.length; song++) {
          console.log(`${trackNum} - ${this.media[item].songs[song]}`);
          trackNum++;
        }
        console.log("");
      }
      // Display book details
      if (this.media[item] instanceof Book) {
        console.log(
          `Book:\nAuthor: ${this.media[item].author}\nTitle: ${this.media[item].title}\nPages: ${this.media[item].pages}\n`
        );
      }
      // Display movie details
      if (this.media[item] instanceof Movie) {
        console.log(
          `Movie:\nDirector: ${this.media[item].director}\nTitle: ${this.media[item].title}\nRun Time: ${this.media[item].runTime}\nCast:`
        );
        // Display actors
        for (
          let actor = 0;
          actor < this.media[item].movieCast.length;
          actor++
        ) {
          console.log(`${this.media[item].movieCast[actor]}`);
        }
        // Display average rating
        /*for (
          let ratingIndex = 0;
          ratingIndex < this.media[item].ratings.length;
          ratingIndex++
        ) {
          let sum = this.media[item].ratings[ratingIndex].reduce(
            (accumulator, current) => accumulator + current
          );
          return sum / this.media[item].ratings.length;
        }

        console.log(`Average Rating: ${this.media[item].ratings}`);*/

        console.log("");
      }
    }
  }
}

const bryson = new Book(
  "Bill Bryson",
  "A Short History of Nearly Everyting",
  544
);

const froom = new Book("K Kirkwood", "Daisies Flown Overland", 446);
froom.addRating(5, 4, 3, 2, 4, 1, 4, 4);

const bont = new Movie("Jan de Bont", "Speed", 116);
bont.addCastMembers(
  "Keaneu Reeve",
  "Sandra Bullock",
  "Dennis Hopper",
  "Jeff Daniels"
);
const hort = new Movie("Jeremy Ramierez", "Juniper Falls", 127);
hort.addRating(5, 5, 6, 3, 2, 4, 2, 3, 5, 5, 5);

hort.addCastMembers(
  "James Murphy",
  "Henry Murphy",
  "Felicity Murphy",
  "Flow Murphy"
);

const them = new Cd("Houses", "Grinding To The Moon");
them.addSong(
  "friend",
  "foe",
  "demon",
  "daemond",
  "fertile",
  "horrible",
  "luke warm",
  "smelly",
  "aches"
);

them.addRating(5, 2, 3, 2, 2, 2, 5, 5, 5, 5, 5, 5, 4, 3);

const mediaCatalog = new Catalog();
mediaCatalog.addToCatalog(them, hort, froom, bont, bryson);

mediaCatalog.listCatalogItems();
//hort.listCastMembers();

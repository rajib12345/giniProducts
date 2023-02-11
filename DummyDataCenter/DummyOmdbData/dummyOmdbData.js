const omdbApiUrl = 'http://www.omdbapi.com/?s=Batman&page=2&apiKey=c0022528';
const omdbPosterApiUrl = 'http://img.omdbapi.com/?apikey=c0022528&s=Batman';

const omdbApiByImdbIdUrl = 'http://www.omdbapi.com/?i=tt4853102&apiKey=c0022528';
const omdbApiUrlResponse = {
  "Search": [
    {
      "Title": "Batman: The Killing Joke",
      "Year": "2016",
      "imdbID": "tt4853102",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Batman: The Dark Knight Returns, Part 2",
      "Year": "2013",
      "imdbID": "tt2166834",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYTEzMmE0ZDYtYWNmYi00ZWM4LWJjOTUtYTE0ZmQyYWM3ZjA0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    },
    {
      "Title": "Batman: Mask of the Phantasm",
      "Year": "1993",
      "imdbID": "tt0106364",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BODE0YTBiMjQtNWQyZC00YTNjLWJmYjAtMWUwNzI4NGVlZTAzL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Batman: Assault on Arkham",
      "Year": "2014",
      "imdbID": "tt3139086",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZDU1ZGRiY2YtYmZjMi00ZDQwLWJjMWMtNzUwNDMwYjQ4ZTVhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Batman: Year One",
      "Year": "2011",
      "imdbID": "tt1672723",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNTJjMmVkZjctNjNjMS00ZmI2LTlmYWEtOWNiYmQxYjY0YWVhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Batman: The Movie",
      "Year": "1966",
      "imdbID": "tt0060153",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMmM1OGIzM2UtNThhZS00ZGNlLWI4NzEtZjlhOTNhNmYxZGQ0XkEyXkFqcGdeQXVyNTkxMzEwMzU@._V1_SX300.jpg"
    },
    {
      "Title": "Batman: Gotham Knight",
      "Year": "2008",
      "imdbID": "tt1117563",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BM2I0YTFjOTUtMWYzNC00ZTgyLTk2NWEtMmE3N2VlYjEwN2JlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Batman: Arkham City",
      "Year": "2011",
      "imdbID": "tt1568322",
      "Type": "game",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZDE2ZDFhMDAtMDAzZC00ZmY3LThlMTItMGFjMzRlYzExOGE1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Superman/Batman: Apocalypse",
      "Year": "2010",
      "imdbID": "tt1673430",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjk3ODhmNjgtZjllOC00ZWZjLTkwYzQtNzc1Y2ZhMjY2ODE0XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Batman Beyond",
      "Year": "1999–2001",
      "imdbID": "tt0147746",
      "Type": "series",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYTBiZjFlZDQtZjc1MS00YzllLWE5ZTQtMmM5OTkyNjZjMWI3XkEyXkFqcGdeQXVyMTA1OTEwNjE@._V1_SX300.jpg"
    }
  ],
  "totalResults": "366",
  "Response": "True"
}

const omdbApiUrlResponse1 = {
  "Search": [
    {
      "Title": "Sultan",
      "Year": "2016",
      "imdbID": "tt4832640",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDc0OTU3M2MtMGFhMi00ZGVlLWI4YmItODA1ZTc0OGY0NmJlXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg"
    },
    {
      "Title": "Sultan",
      "Year": "1978",
      "imdbID": "tt0264051",
      "Type": "movie",
      "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BYmM5MGNiYWEtZTY3MS00ODQ2LTgwNzQtNmRkMTEwZWFhYzA0XkEyXkFqcGdeQXVyMjExNjgyMTc@._V1_SX300.jpg"
    },
    {
      "Title": "Angelique and the Sultan",
      "Year": "1968",
      "imdbID": "tt0061357",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTQxNjU5MTc0MV5BMl5BanBnXkFtZTcwNTU2MzQyMQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Malkoçoglu - Cem Sultan",
      "Year": "1969",
      "imdbID": "tt0182881",
      "Type": "movie",
      "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BYzQxYmZkMTItMDdlNS00Yjg4LWE5MjgtNmE1ODJjOTM3NjUwXkEyXkFqcGdeQXVyMjExNjgyMTc@._V1_SX300.jpg"
    },
    {
      "Title": "Sultan: The Saviour",
      "Year": "2018",
      "imdbID": "tt8396262",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZDk3N2JjNGItYjk3Ni00NzhiLTk0OGEtMzRkMDZhYTBhM2EzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
    },
    {
      "Title": "Mahpeyker - Kösem Sultan",
      "Year": "2010",
      "imdbID": "tt1754166",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZmJmNjc2OWYtYWEyNS00ZjMxLTljOGUtNzM1ZTE2MmNhMDVmXkEyXkFqcGdeQXVyMjc0MjUzMzU@._V1_SX300.jpg"
    },
    {
      "Title": "Sultan gelin",
      "Year": "1973",
      "imdbID": "tt0264052",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYzU4MDFlMzAtNmU2Zi00M2Q2LTlmMGMtMjQ0YTI2YjAxMWI3XkEyXkFqcGdeQXVyMjExNjgyMTc@._V1_SX300.jpg"
    },
    {
      "Title": "Hürrem Sultan",
      "Year": "2003–",
      "imdbID": "tt0424656",
      "Type": "series",
      "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYzMzM2Njk4Nl5BMl5BanBnXkFtZTYwNDg3Mjc2._V1_SX300.jpg"
    },
    {
      "Title": "Razia Sultan",
      "Year": "1983",
      "imdbID": "tt0152148",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZDZhOGJhOTYtNzYxNC00ZTk2LWE4ODUtMWFmZTI0ZDYxNWE0XkEyXkFqcGdeQXVyMzU0NzkwMDg@._V1_SX300.jpg"
    },
    {
      "Title": "Sultan Makami",
      "Year": "2003–",
      "imdbID": "tt0381809",
      "Type": "series",
      "Poster": "N/A"
    }
  ],
  "totalResults": "87",
  "Response": "True"
}

const omdbApiByImdbIdUrlResponse = {
  "Title": "Batman: The Killing Joke",
  "Year": "2016",
  "Rated": "R",
  "Released": "25 Jul 2016",
  "Runtime": "76 min",
  "Genre": "Animation, Action, Crime, Drama, Thriller",
  "Director": "Sam Liu",
  "Writer": "Brian Azzarello, Brian Bolland (based on the graphic novel illustrated by), Bob Kane (Batman created by), Bill Finger (Batman created by)",
  "Actors": "Kevin Conroy, Mark Hamill, Tara Strong, Ray Wise",
  "Plot": "As Batman hunts for the escaped Joker, the Clown Prince of Crime attacks the Gordon family to prove a diabolical point mirroring his own fall into madness.",
  "Language": "English",
  "Country": "USA",
  "Awards": "1 win & 2 nominations.",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "6.5/10"
    },
    {
      "Source": "Rotten Tomatoes",
      "Value": "39%"
    }
  ],
  "Metascore": "N/A",
  "imdbRating": "6.5",
  "imdbVotes": "43,387",
  "imdbID": "tt4853102",
  "Type": "movie",
  "DVD": "02 Aug 2016",
  "BoxOffice": "$442,331",
  "Production": "The Answer Studio",
  "Website": "N/A",
  "Response": "True"
};


module.exports.omdbApiUrlResponse = omdbApiUrlResponse;
module.exports.omdbApiByImdbIdUrlResponse = omdbApiByImdbIdUrlResponse;

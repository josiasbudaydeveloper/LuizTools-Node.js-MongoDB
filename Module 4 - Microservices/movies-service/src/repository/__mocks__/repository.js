const movies = [{
  "_id": "62f6a740fd44cfd408cc7633",
  "titulo": "Os Vingadores: Ultimato",
  "sinopse": "Os heróis mais poderosos da Terra enfrentando o Thanos. De novo.",
  "duracao": 181,
  "dataLancamento": new Date(1556150400000),
  "imagem": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "categorias": [
    "Aventura",
    "Ação"
  ]
},{
  "_id": "62f6a740fd44cfd408cc7634",
  "titulo": "Os Vingadores: Guerra Infinita",
  "sinopse": "Os heróis mais poderosos da Terra enfrentando o Thanos",
  "duracao": 149,
  "dataLancamento": new Date(1524700800000),
  "imagem": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "categorias": [
    "Aventura",
    "Ação"
  ]
},{
  "_id": "62f6a740fd44cfd408cc7635",
  "titulo": "Os Vingadores: Era de Ultron",
  "sinopse": "Os heróis mais poderosos da Terra enfrentando o Ultron",
  "duracao": 141,
  "dataLancamento": new Date(1429747200000),
  "imagem": "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "categorias": [
    "Aventura",
    "Ação"
  ]
},{
  "_id": "62f6a740fd44cfd408cc7636",
  "titulo": "Os Vingadores",
  "sinopse": "Os heróis mais poderosos da Terra enfrentando o Loki",
  "duracao": 143,
  "dataLancamento": new Date(1335484800000),
  "imagem": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "categorias": [
    "Aventura",
    "Ação"
  ]
}];

async function getAllMovies() {
  return movies;
}

async function getMovieById(id) {
  if (id === -1) return null;

  const movie = movies.find((movie) => movie._id === id);
  return movie;
}

async function getMoviesPremieres() {
  const monthAgo = new Date('2019-04-25T00:00:00.000+00:00');
  monthAgo.setMonth(monthAgo.getMonth() -1);
  const moviesPremieres = [];
  for (let movie of movies) {
    if (movie.dataLancamento >= monthAgo) {
      moviesPremieres.push(movie);
    }
  }

  return moviesPremieres;
}

async function addMovie(movie) {
  return movie;
}

async function deleteMovie(id) {
  return true;
}

module.exports = { getAllMovies, getMovieById, getMoviesPremieres, addMovie, deleteMovie };
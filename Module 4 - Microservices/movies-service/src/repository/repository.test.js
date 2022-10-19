const repository = require('./repository');
const database = require('../config/database');

/* Preparing tests */
let testMovieId = null
let movie = {
  "titulo": "Teste movie", 
  "sinopse": "Teste movie", 
  "duracao": 120, 
  "dataLancamento": new Date(), 
  "imagem": "http://image.jpg", 
  "categorias": ["Aventura"]
}
beforeAll(async () => {
  const movies = await repository.getAllMovies();
  testMovieId = movies[0]._id;
})
afterEach(async () => {
  await database.disconnect();
})

test('Getting all movies', async function() {
  const movies = await repository.getAllMovies();
  expect(Array.isArray(movies)).toBeTruthy();
  expect(movies.length).toBeTruthy();
});

test('Getting a movie by Id', async function() {
  const movie = await repository.getMovieById(testMovieId);
  expect(movie).toBeTruthy();
});

test('Getting a movie by Id ERROR', async function() {
  const movie = await repository.getMovieById(-1);
  expect(movie).toBeFalsy();
});

test('Getting premiere movies', async function() {
  const monthAgo = new Date('2019-04-25T00:00:00.000+00:00');
  monthAgo.setMonth(monthAgo.getMonth() -1);

  const movies = await repository.getMoviesPremieres();
  expect(Array.isArray(movies)).toBeTruthy();
  expect(movies[0].dataLancamento.getTime()).toBeGreaterThanOrEqual(monthAgo.getTime());
});

test('addMovie', async () => {
  const result = await repository.addMovie(movie);
  expect(result.acknowledged).toBeTruthy();

  const db = await database.connect();
  await db.collection('movies').deleteOne(movie);
});

test('deleteMovie', async () => {
  let movieId = await repository.addMovie(movie);
  movieId = movieId.insertedId;

  const result = await repository.deleteMovie(movieId);
  expect(result.deletedCount).toEqual(1);
});
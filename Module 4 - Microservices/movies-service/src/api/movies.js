const { 
  validateToken, 
  validateMovie, 
  validateAdmin 
} = require('../middlewares/validation-middleware');
const logger = require('../config/logger');

module.exports = (app, repository) => {
  // Returning all premiere movies
  app.get('/movies/premieres', validateToken, async (req, res, next) => {
    const movies = await repository.getMoviesPremieres();

    return res.json(movies);
  });

  // Returning movies by id
  app.get('/movies/:id', validateToken, async (req, res, next) => {
    const movie = await repository.getMovieById(req.params.id);
    if(!movie) return res.sendStatus(404);

    return res.json(movie);
  });

  // Returning all movies
  app.get('/movies', validateToken, async (req, res, next) => {
    const movies = await repository.getAllMovies();

    return res.json(movies);
  });

  // Posting a movie
  app.post('/movies', validateToken, validateAdmin, validateMovie, async (req, res, next) => {
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    const duracao = parseInt(req.body.duracao);
    const dataLancamento = new Date(req.body.dataLancamento);
    const imagem = req.body.imagem;
    const categorias = req.body.categorias;

    const result = await repository.addMovie({titulo, sinopse, duracao, dataLancamento, imagem, categorias});

    logger.info(`The user ${res.locals.userId} added the move ${result.insertedId} at ${new Date()}`);
    return res.status(201).json(result);
  });

  // Deleting a movie
  app.delete('/movies/:id', validateToken, validateAdmin, async (req, res, next) => {
    const id = req.params.id

    const result = await repository.deleteMovie(id);

    logger.info(`The user ${res.locals.userId} removed the move ${id} at ${new Date()}`);
    return res.status(204).json(result);
  });

}
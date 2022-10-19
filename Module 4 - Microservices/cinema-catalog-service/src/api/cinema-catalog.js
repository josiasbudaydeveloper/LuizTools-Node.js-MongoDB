const { validateToken } = require('../middlewares/validation-middleware');

module.exports = (app, repository) => {
  // Returning all movie sessions in a specific city
  app.get('/cities/:cityId/movies/:movieId', validateToken, async (req, res, next) => {
    const cityId = req.params.cityId;
    const movieId = req.params.movieId;
    
    const movieSessions = await repository.getMovieSessionsByCityId(movieId, cityId);
    if (!movieSessions) return res.sendStatus(404);
    
    return res.json(movieSessions);
  });

    // Returning all movies in a specific city
    app.get('/cities/:cityId/movies', validateToken, async (req, res, next) => {
      const cityId = req.params.cityId;
      const movies = await repository.getMoviesByCityId(cityId);
      if (!movies) return res.sendStatus(404);
  
      return res.json(movies);
    });

  // Returning all cinemas in a specific city
  app.get('/cities/:cityId/cinemas', validateToken, async (req, res, next) => {
    const cityId = req.params.cityId;

    const cinemas = await repository.getCinemasByCityId(cityId);
    if (!cinemas) return res.sendStatus(404);
    
    return res.json(cinemas);
  });

    // Returning all cities we have cinemas
    app.get('/cities', validateToken, async (req, res, next) => {
      const cities =  await repository.getAllCities();
  
      return res.json(cities);
    });

  // Returning all movie sessions in a specific cinema
  app.get('/cinemas/:cinemaId/movies/:movieId', validateToken, async (req, res, next) => {
    const cinemaId = req.params.cinemaId;
    const movieId = req.params.movieId;

    const movieSessions = await repository.getMovieSessionsByCinemaId(movieId, cinemaId);
    if (!movieSessions) return res.sendStatus(404);

    return res.json(movieSessions);
  });

  // Returning all movies in specific cinema
  app.get('/cinemas/:cinemaId/movies', validateToken, async (req, res, next) => {
    const cinemaId = req.params.cinemaId;

    const movies = await repository.getMoviesByCinemaId(cinemaId);
    if (!movies) return res.sendStatus(404);
    
    return res.json(movies);
  });
}
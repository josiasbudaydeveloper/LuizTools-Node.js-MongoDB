const { ObjectID } = require('bson');
const database = require('../config/database');

async function getAllCities() {
  const db = await database.connect();
  
  // returning cidade, uf e pais from cinemaCatallog.
  // Ps: value 1 represents the fields we need to get, and 0, the fields we don't need to get,
  // ex: find({}, { cinemas: 0 }) // we get all fields, except cinemas.
  return db.collection('cinemaCatalog').find()
    .project({ cidade: 1, uf: 1 , pais: 1 })
    .toArray();
}

async function getCinemasByCityId(cityId) {
  const objectCityId = ObjectID(cityId);
  const db = await database.connect();

  const city = await db.collection('cinemaCatalog').findOne(
    { _id: objectCityId },
    { projection: { cinemas: 1 } }
    );

  return city.cinemas;
}

/**
* getMoviesByCinemaId - Returns a list of movies being shown in a specific cinema
*
* @param {string} cinemaId - ID of the cinema
* @return {Array} - Array of objects with the movie ID and title
*/
async function getMoviesByCinemaId(cinemaId) {
  const objectCinemaId = ObjectID(cinemaId);
  const db = await database.connect();
  
  const group = await db.collection('cinemaCatalog').aggregate([
    { $match: { "cinemas._id": objectCinemaId }},
    { $unwind: "$cinemas" },
    { $unwind: "$cinemas.salas" },
    { $unwind: "$cinemas.salas.sessoes" },
    { $group: { _id: {_id: "$cinemas.salas.sessoes.idFilme", titulo: "$cinemas.salas.sessoes.filme" }}}
  ]).toArray();

  return group.map(g => g._id);
}

async function getMoviesByCityId(cityId) {
  const objectCityId = ObjectID(cityId);
  const db = await database.connect();
  
  const group = await db.collection('cinemaCatalog').aggregate([
    { $match: { "_id": objectCityId }},
    { $unwind: "$cinemas" },
    { $unwind: "$cinemas.salas" },
    { $unwind: "$cinemas.salas.sessoes" },
    { $group: { _id: {_id: "$cinemas.salas.sessoes.idFilme", titulo: "$cinemas.salas.sessoes.filme" }}}
  ]).toArray();

  return group.map(g => g._id);  
}

async function getMovieSessionsByCityId(movieId, cityId) {
  const objectCityId = ObjectID(cityId);
  const objectMovieId = ObjectID(movieId);
  const db = await database.connect();

  const group = await db.collection('cinemaCatalog').aggregate([
    { $match: { "_id": objectCityId }},
    { $unwind: "$cinemas" },
    { $unwind: "$cinemas.salas" },
    { $unwind: "$cinemas.salas.sessoes" },
    { $match: { "cinemas.salas.sessoes.idFilme": objectMovieId }},
    { $group: { _id: {
      _id: "$cinemas.salas.sessoes.idFilme", 
      titulo: "$cinemas.salas.sessoes.filme",
      cinema: "$cinemas.nome",
      sala: "$cinemas.salas.nome",
      sessao: "$cinemas.salas.sessoes"
    }}}
  ]).toArray();

  return group.map(g => g._id);
}

async function getMovieSessionsByCinemaId(movieId, cinemaId) {
  const objectCinemaId = ObjectID(cinemaId);
  const objectMovieId = ObjectID(movieId);
  const db = await database.connect();

  const group = await db.collection('cinemaCatalog').aggregate([
    { $match: { "cinemas._id": objectCinemaId }},
    { $unwind: "$cinemas" },
    { $unwind: "$cinemas.salas" },
    { $unwind: "$cinemas.salas.sessoes" },
    { $match: { "cinemas.salas.sessoes.idFilme": objectMovieId }},
    { $group: { _id: {
      _id: "$cinemas.salas.sessoes.idFilme", 
      titulo: "$cinemas.salas.sessoes.filme",
      cinema: "$cinemas.nome",
      sala: "$cinemas.salas.nome",
      sessao: "$cinemas.salas.sessoes"
    }}}
  ]).toArray();

  return group.map(g => g._id);
}

module.exports = { 
  getAllCities,
  getCinemasByCityId, 
  getMoviesByCinemaId, 
  getMoviesByCityId, 
  getMovieSessionsByCityId,
  getMovieSessionsByCinemaId
};

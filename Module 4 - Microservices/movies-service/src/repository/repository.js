const { ObjectID } = require('bson');
const database = require('../config/database');

async function getAllMovies() {
  const db = await database.connect();
  return db.collection('movies').find().toArray();
}

async function getMovieById(id) {
  try {
    const db = await database.connect();  
    return db.collection('movies').findOne({_id: new ObjectID(id)});
  }
  catch(err) {
    return null;
  }
}

async function getMoviesPremieres() {
  const monthAgo = new Date('2019-04-25T00:00:00.000+00:00');
  monthAgo.setMonth(monthAgo.getMonth() -1);

  const db = await database.connect();  
  return db.collection('movies').find({dataLancamento: {$gte: monthAgo }}).toArray();
}

async function addMovie(movie) {
  const db = await database.connect();
  return db.collection('movies').insertOne(movie);
}

async function deleteMovie(id) {
  const db = await database.connect();
  return db.collection('movies').deleteOne({ _id: new ObjectID(id)});
}

module.exports = { getAllMovies, getMovieById, getMoviesPremieres, addMovie, deleteMovie };
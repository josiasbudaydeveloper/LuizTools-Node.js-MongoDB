const request = require('supertest');
const server = require('../server/server');
const movies = require('./movies');
const repositoryMock = require('../repository/__mocks__/repository');

const adminToken = '1';
const guestToken = '2';

jest.mock('../node_modules/jsonwebtoken', () => {
  return {
      verify: (token) => {
          if (token === adminToken) return { userId: 1, profileId: 1 };//ADMIN
          else if (token === guestToken) return { userId: 2, profileId: 2 };//GUEST
          else throw new Error('Invalid token!');
      }
  }
})

let app = null;
beforeAll(async () => {
  app = await server.start(movies, repositoryMock);
});
afterAll(async () => {
  await server.stop();
});

test('GET /movies 200 OK', async () => {
  const response = await request(app).get('/movies')
    .set('authorization', `Bearer ${adminToken}`);
  expect(response.status).toEqual(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body.length).toBeTruthy();
});

test('GET /movies 401 UNAUTHORIRED', async () => {
  const response = await request(app).get('/movies');
  expect(response.status).toEqual(401);
});

test('GET /movies/:id 200 OK', async () => {
  let idTest = await repositoryMock.getAllMovies();
  idTest = idTest[0]._id

  const response = await request(app).get(`/movies/${idTest}`)
    .set('authorization', `Bearer ${adminToken}`);
  expect(response.status).toEqual(200);
  expect(response.body).toBeTruthy();
});

test('GET /movies/:id 401 UNAUTHORIZED', async () => {
  let idTest = await repositoryMock.getAllMovies();
  idTest = idTest[0]._id

  const response = await request(app).get(`/movies/${idTest}`);
  expect(response.status).toEqual(401);
});

test('GET /movies/:id 404 NOT FOUND', async () => {
  let idTest = -1;

  const response = await request(app).get(`/movies/${idTest}`)
  .set('authorization', `Bearer ${adminToken}`);
  expect(response.status).toEqual(404);
});

test('GET /movies/premieres 200 OK', async () => {
  const response = await request(app).get('/movies/premieres')
    .set('authorization', `Bearer ${adminToken}`);
  expect(response.status).toEqual(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body.length).toBeTruthy();
});

test('GET /movies/premieres 401 UNAUTHORIZED', async () => {
  const response = await request(app).get('/movies/premieres');
  expect(response.status).toEqual(401);
});

test('POST /movies 201 CREATED', async () => {
  const movie = {
    titulo: 'Teste movie', 
    sinopse: 'Teste movie', 
    duracao: 120, 
    dataLancamento: new Date(), 
    imagem: 'http://image.jpg', 
    categorias: ['Aventura']
  };
  const response = await request(app)
    .post('/movies')
    .set('Content-Type','application/json')
    .set('authorization', `Bearer ${adminToken}`)
    .send(movie);
  
  expect(response.status).toEqual(201);
  expect(response.body).toBeTruthy();
});

test('POST /movies 401 UNAUTHORIZED', async () => {
  const movie = {
    titulo: 'Teste movie', 
    sinopse: 'Teste movie', 
    duracao: 120, 
    dataLancamento: new Date(), 
    imagem: 'http://image.jpg', 
    categorias: ['Aventura']
  };
  const response = await request(app)
    .post('/movies')
    .set('Content-Type','application/json')
    .send(movie);
  
  expect(response.status).toEqual(401);
});

test('POST /movies 422 UNPROCESSABLE ENTITY', async () => {
  const movie = {};

  const response = await request(app)
    .post('/movies')
    .set('Content-Type','application/json')
    .set('authorization', `Bearer ${adminToken}`)
    .send(movie);
  
  expect(response.status).toEqual(422);
});

test('POST /movies 403 FORBIDDEN', async () => {
  const movie = {};

  const response = await request(app)
    .post('/movies')
    .set('Content-Type','application/json')
    .set('authorization', `Bearer ${adminToken}`)
    .send(movie);
  
  expect(response.status).toEqual(422);
});

test('DELETE /movies/:id 204 NO CONTENT', async () => {
  const response = await request(app)
    .delete(`/movies/1`)
    .set('authorization', `Bearer ${adminToken}`);

  expect(response.status).toEqual(204);
});

test('DELETE /movies/:id 401 UNAUTHORIZED', async () => {
  const response = await request(app)
    .delete(`/movies/1`)
    .set('authorization', `Bearer ${guestToken}`);

  expect(response.status).toEqual(401);
});

test('DELETE /movies/:id 401 UNAUTHORIZED (Invalid Token)', async () => {
  const response = await request(app)
    .delete(`/movies/1`)
    .set('authorization', `Bearer 3`);

  expect(response.status).toEqual(401);
});

test('DELETE /movies/:id 403 FORBIDDEN', async () => {
  const response = await request(app)
    .delete(`/movies/1`)
    .set('authorization', `Bearer ${guestToken}`);

  expect(response.status).toEqual(403);
});
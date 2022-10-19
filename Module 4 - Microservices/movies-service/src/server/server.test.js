const request = require('supertest');
const server = require('./server');

const apiMock = jest.fn((app, repository) => {
  app.get('/error', (req, res, next) => {
      throw new Error('Mock Error');
  })
});

test('Server start', async () => {
  const app = await server.start(apiMock);
  expect(app).toBeTruthy();
  
  await server.stop();
});

test('Health check', async () => {
  const app = await server.start(apiMock);
  const response = await request(app).get('/health');
  expect(response.status).toEqual(200);

  await server.stop();
});

test('Error check', async () => {
  const app = await server.start(apiMock);
  const response = await request(app).get('/error');
  expect(response.status).toEqual(500);

  await server.stop();
});

test('Server stop', async () => {
  const isStopped = await server.stop();
  expect(isStopped).toBeTruthy();
});
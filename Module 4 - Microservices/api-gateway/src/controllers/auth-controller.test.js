const request = require('supertest');
const server = require('../server/index');
const database = require('../config/database');

const login = {
  email: "guest@test.com",
  password: "123123"
}

let token = null;
beforeAll(async () => {
  const response = await request(server)
    .post('/login')
    .send(login);
  token = response.body.token;

});
afterAll(async () => {
  server.close();
  database.disconnect();
});

test('POST /login 200 OK', async () => {
  const response = await request(server)
    .post('/login')
    .set('Content-Type', 'application/json')
    .send(login);

  expect(response.status).toEqual(200);
  expect(response.body.token).toBeTruthy();
  
});

test('POST /login 401 UNAUTHORIZED', async () => {
  const loginWrong = login;
  loginWrong.password += "1";

  const response = await request(server)
    .post('/login')
    .set('Content-Type', 'application/json')
    .send(loginWrong);

  expect(response.status).toEqual(401);
});

test('POST /logout 200 OK', async () => {
  const response = await request(server)
    .post('/logout')
    .set('Content-Type', 'application/json')
    .set('authorization', `Bearer ${token}`);

  expect(response.status).toEqual(200);
});

test('POST /logout 401 UNAUTHORIRED', async () => {
  const response = await request(server)
    .post('/logout')
    .set('Content-Type', 'application/json')
    .set('authorization', `Bearer ${token}1`);

  expect(response.status).toEqual(401);
});

test('POST /logout 401 UNAUTHORIZED (without token)', async () => {
  const response = await request(server)
    .post('/logout')
    .set('Content-Type', 'application/json');

  expect(response.status).toEqual(401);
});

test('POST /logout 401 BLACKLISTED', async () => {
  const response = await request(server)
    .post('/logout')
    .set('Content-Type', 'application/json')
    .set('authorization', `Bearer ${token}`);

  expect(response.status).toEqual(401);
});
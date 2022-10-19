const db = require('./database');

test('Connecting to database', async () => {
  const connection = await db.connect();

  expect(connection).toBeTruthy();
});

test('Disconnecting to database', async () => {
  const isDisconneted = await db.disconnect();

  expect(isDisconneted).toBeTruthy();
});

test('Disconnecting to database 2x', async () => {
  await db.disconnect();
  const isDisconneted = await db.disconnect();

  expect(isDisconneted).toBeTruthy();
});
const { MongoClient } = require('mongodb');
let client = null;

async function connect() {
  if (!client)
    client = new MongoClient(process.env.MONGODB_CONNECTION);
  
  return client.db(process.env.DATABASE);
}

async function disconnect() {
  if (!client) return true;

  await client.close();
  client = null;

  return true;
}

module.exports = { connect, disconnect }
const { MongoClient, ObjectId } = require('mongodb');
// useUnifiedTopology  
/* 
É uma recomendação da equipe do MongoDB e que permite um melhor monitoramento do sistema. 
Caso desativada, haverá um sinal de warning (aviso) no console.
*/
async function connect() {
  if(!global.connection) {
    try {
      const connection = await MongoClient.connect(process.env.MONGODB_CONNECTION, {
        useUnifiedTopology: true});
      
      global.connection = connection.db('local');
    }
    catch(err) {
      console.error(err);
      global.connection = null;
    }
  }
}

function findFamilyMembers() {
  connect();
  return global.connection.collection('family')
    .find({})
    .toArray();
}

function findFamilyMember(id) {
  connect();
  return global.connection.collection('family')
    .findOne({_id: ObjectId(id)});
}

function insertFamilyMember(member) {
  connect();
  return global.connection.collection('family')
    .insertOne(member);
}

function updateFamilyMember(id, member) {
  connect();
  return global.connection.collection('family')
    .updateOne({_id: ObjectId(id)}, {$set: member});
}

function deleteFamilyMember(id) {
  connect();
  return global.connection.collection('family')
    .deleteOne({_id: ObjectId(id)});
}

module.exports = { 
  findFamilyMembers,
  insertFamilyMember, 
  updateFamilyMember,
  deleteFamilyMember,
  findFamilyMember
};
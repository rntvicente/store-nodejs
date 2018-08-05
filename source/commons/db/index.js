const { MongoClient } = require('mongodb');

const Database = {};
const collections = [];

let db;

Database.connect = (uri, callback) => {
  console.log('Database tentando se conectar.');
  MongoClient.connect(uri, (err, _db) => {
    if (err) {
      console.log('Database falha na conexão. - ', err.message);
    } else {
      console.log('Database conectada.');
      db = _db;
    }
    return callback(err, db);
  });
};

Database.getCollection = (collectionName) => {
  let collection = collections[collectionName];

  if (!collection) {
    collection = db.collection(collectionName);
    collections[collectionName] = collection;
  }

  return collection;
};

Database.close = (callback) => {
  console.log('Database tentando desconectar');

  if (db) {
    db.close((err) => {
      if (err) {
        console.error('Error ao fechar database');
      } else {
        console.log('Database disconectada');
      }
      callback(err);
    });
  }
};

module.exports = Database;

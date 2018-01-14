const MongoClient = require('mongodb').MongoClient;

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
  logger.debug('Database tentando desconectar');

  if (db) {
    db.close((err) => {
      if (err) {
        console.log('Error ao fechar database');
      } else {
        console.log('Database disconectada');
      }
      callback(err);
    });
  }
};

module.exports = Database;
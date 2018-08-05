const db = require('../commons/db');

const find = (query, projection, callback) => {
  db.getCollection('products').find(query, projection).toArray((err, products) => {
    if (err) {
      return callback(err);
    }
    return callback(null, products);
  });
};

const findAsync = async (query, projection) => {
  const ret = await db.getCollection('products')
    .find(query, projection)
    .toArray();

  return ret;
};

const findOne = (query, projection, callback) => {
  db.getCollection('products').findOne(query, projection, (err, product) => {
    if (err) {
      return callback(err);
    }
    return callback(null, product);
  });
};

const insert = (product, callback) => {
  db.getCollection('products').insert(product, (err) => {
    if (err) {
      return callback(err);
    }
    return callback();
  });
};

const findOneAndUpdate = (query, body, callback) => {
  const set = {
    $set: {
      title: body.title,
      description: body.description,
      price: body.price,
      slug: body.slug,
    }
  };

  db.getCollection('products').findOneAndUpdate(query, set, (err, result) => {
    if (err) {
      return callback(err);
    }

    return callback(null, result.value);
  });
};

const findOneAndDelete = (query, body, callback) => {
  db.getCollection('products').findOneAndDelete(query, (err, result) => {
    if (err) {
      return callback(err);
    }

    return callback(null, result.value);
  });
};

module.exports = {
  insert,
  find,
  findAsync,
  findOne,
  findOneAndUpdate,
  findOneAndDelete,
};

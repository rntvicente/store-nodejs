const tv4 = require('tv4');
const productSchema = require('../models/schema/products-schema.json');

module.exports = (req, res, next) => {
  const { body } = req;

  const valid = tv4.validate(body, productSchema);

  if (!valid) {
    return res.status(400).send({ message: 'Formato de requisição inválido' });
  }

  return next();
};

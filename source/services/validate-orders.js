const tv4 = require('tv4');

const orderSchema = require('../models/schema/orders-schema.json');

module.exports = (req, res, next) => {
  console.log('VALIDATE');
  const { body } = req;

  const valid = tv4.validate(body, orderSchema);

  if (!valid) {
    return res.status(400).send({ message: 'Formato de requisição inválido' });
  }

  return next();
};

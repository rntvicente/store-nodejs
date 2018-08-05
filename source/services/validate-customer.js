const tv4 = require('tv4');
const customerSchema = require('../models/schema/customer-schema.json');

module.exports = (req, res, next) => {
  const { body } = req;
  const valid = tv4.validate(body, customerSchema);

  if (!valid) {
    return res.status(400).send({ message: 'Formato de requisição inválido' });
  }

  return next();
};

const guid = require('guid');
const orderRepository = require('../repositories/order-repository');
const { httpStatusCode, statusOrders } = require('../commons/utils')

const create = async (req, res) => {
  const order = {};
  const dateNow = new Date();

  order.number = guid.raw().substring(0, 6);
  order.customer = req.body.customer;
  order.createAt = dateNow;
  order.items = req.body.items;
  order.status = [{
    status: statusOrders.create,
    timestamp: dateNow,
  }];

  try {
    await orderRepository.create(order);

    return res.status(httpStatusCode.accept).send({
      message: 'Pedido cadastrado com sucesso.',
    });
  } catch (err) {
    return res.status(httpStatusCode.internalServerError).send({
      message: 'Falha ao cadastrar pedido: ',
      data: err.message,
    });
  }
};

const getAllAsync = async (req, res) => {
  try {
    const orders = await orderRepository.getAllAsync({}, {});

    res.status(httpStatusCode.ok).send(orders);
  } catch (e) {
    res.status(httpStatusCode.internalServerError).send({
      message: 'Falha ao processar sua requisição',
    });
  }
};

module.exports = { create, getAllAsync };

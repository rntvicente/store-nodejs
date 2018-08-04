const guid = require('guid');
const moment = require('moment');
const orderRepository = require('../repositories/order-repository');
const { httpStatusCode, statusOrders } = require('../commons/utils')

const create = async (req, res, next) => {
    console.log('congtroller');
    const order = {};

    order.number = guid.raw().substring(0, 6);
    order.customer = req.body.customer;
    order.createAt = moment().date();
    order.items = req.body.items;
    order.status = [{
        status: statusOrders.create,
        timestamp: moment().date()
    }];

    console.log(JSON.stringify(order, null, 2))
    try {
        await orderRepository.create(order);

        console.log('passou create');
        res.status(httpStatusCode.accept).send({
            message: "Pedido cadastrado com sucesso."
        });
    } catch (err) {
        return res.status(httpStatusCode.internalServerError).send({
            message: "Falha ao cadastrar pedido: ",
            data: err.message
        });
    }
};

const getAllAsync = async (req, res, next) => {
    try {
        var orders = await orderRepository
            .getAllAsync({}, {});
            
        res.status(httpStatusCode.ok).send(orders);
    } catch (e) {
        res.status(httpStatusCode.internalServerError).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

module.exports = { create, getAllAsync }
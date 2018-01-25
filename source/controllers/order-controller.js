const guid = require('guid');
const orderRepository = require('../repositories/order-repository');

const create = async (req, res, next) => {
    const order = {};
    order.number = guid.raw().substring(0, 6);
    order.customer = req.body.customer;
    order.items = req.body.items;

    try {
        await orderRepository
            .create(order);

        res.status(201).send({
            message: "Pedido cadastrado com sucesso."
        });
    } catch (err) {
        return res.status(500).send({
            message: "Falha ao cadastrar pedido: ",
            data: err.message
        });
    }
};

const getAll = async (req, res, next) => {
    try {
        var orders = await repository.get({});
        res.status(200).send(orders);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

module.exports = { create, getAll }
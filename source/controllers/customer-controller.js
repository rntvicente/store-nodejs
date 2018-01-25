'use strict'

const customerRepository = require('../repositories/customer-repository');
const validationContract = require('../validation/fluent-validation');

const create = async(req, res, next) => {
    const contract = new validationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        const customer = {};
        customer.name = req.body.name;
        customer.email = req.body.email;
        customer.password = req.body.password;

        await customerRepository.create(customer);

        res.status(201).send({
            message: "Cliente cadastrado com sucesso."
        });
    } catch (err) {
        return res.status(500).send({
            message: "Falha ao cadastrar cliente: ",
            data: err.message
        });
    }
};

module.exports = { create };
'use strict'

const mongo = require('mongodb');
const productModel = require('../models/product-model');
const validationContract = require("../validation/fluent-validation");

const projection = {
    title: true,
    description: true,
    price: true,
    slug: true,
    tags: true,
}

const get = (req, res, next) => {
    const query = {};

    query.active = true;

    productModel.find(query, projection, (err, products) => {
        if (err) {
            return res.status(500).send();
        }
        res.status(200).send(products);
    });
};

const getBySlug = (req, res, next) => {
    const query = {};

    query.active = true;
    query.slug = req.params.slug;

    productModel.findOne(query, projection, (err, product) => {
        if (err) {
            return res.status(500).send();
        }
        res.status(200).send(product);
    });
};

const getById = (req, res, next) => {
    const query = {};
    query._id = new mongo.ObjectID(req.params.id);

    productModel.findOne(query, projection, (err, product) => {
        if (err) {
            return res.status(500).send();
        }
        res.status(200).send(product);
    });
};

const getByTags = (req, res, next) => {
    const query = {};

    query.active = true;
    query.tags = req.params.tag;

    productModel.find(query, projection, (err, product) => {
        if (err) {
            return res.status(500).send();
        }
        res.status(200).send(product);
    });
};

const post = (req, res, next) => {
    const contract = new validationContract();
    contract.hasMinLen(req.body.title, 3, "O título deve ter pelo menos 3 caracteres.");
    contract.hasMinLen(req.body.slug, 3, "O slug deve ter pelo menos 3 caracteres.");
    contract.hasMinLen(req.body.description, 3, "O descrição deve ter pelo menos mínimo 3 caracteres.");

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    const body = req.body;

    productModel.insert(body, (err, product) => {
        if (err) {
            return res.status(400).send({
                message: "Falha ao cadastrar produto: ",
                data: err.message
            });
        }
        res.status(201).send({ message: "Produto cadastrado com sucesso." });
    });
};

const put = (req, res, next) => {
    const query = {};
    const set = {
        $set: {
            title: req.params.title,
            description: req.params.description,
            price: req.params.price,
            slug: req.params.slug
        }
    };

    query._id = new mongo.ObjectID(req.params.id);

    productModel.findOneAndUpdate(query, set, (err, product) => {
        if (err) {
            console.log("Falha ao atualizar produto: %s", err);
            return res.status(400).send({
                message: "Falha ao atualizar produto: ",
                data: err.message
            });
        }
        res.status(201).send({ message: "Produto atualizado com sucesso.", data: product });
    });
};

const remove = (req, res, next) => {
    const query = {};
    query._id = new mongo.ObjectID(req.body.id);

    productModel.findOneAndDelete(query, (err, result) => {
        if (err) {
            console.log("Falha ao excluir produto: %s", err);
            return res.status(400).send({
                message: "Falha ao excluir produto: ",
                data: err.message
            });
        }
        res.status(201).send({ message: "Produto excluido com sucesso.", data: product });
    });
};

module.exports = { get, getByTags, getBySlug, getById, post, put, remove };
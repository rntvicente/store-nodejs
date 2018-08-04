'use strict';
const db = require('../commons/db');

const getAllAsync = async (query, projection) => {
    const ret = await db.getCollection('orders')
        .find(query, projection)
        .toArray();

        return ret;
}

const create = async (data) => {
    await db.getCollection('orders')
        .insert(data);
}

module.exports = { getAllAsync, create };
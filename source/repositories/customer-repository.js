const db = require('../commons/db');

const create = async (customer) => {
    await db.getCollection('customers')
        .insert(customer);
};

module.exports = { create };
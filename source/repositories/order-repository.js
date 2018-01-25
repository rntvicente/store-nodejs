'use strict';
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

const getAll = async (query) => {
    var res = await Order
        .find(query, 'number status customer items')
        .populate('customer', 'name')
        .populate('items.product', 'title');
        
    return res;
}

const create = async (data) => {
    var order = new Order(data);
    await order.save();
}

module.exports = { getAll, create };
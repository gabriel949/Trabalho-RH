var mongoose = require('mongoose');

var orderItemSchema = mongoose.Schema({
    amount: Number,
    productId: String,
    orderId: String
});

var orderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = orderItem;
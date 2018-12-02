var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    ean: String,
    name: String,
    
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
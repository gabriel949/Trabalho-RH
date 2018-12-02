var mongoose = require('mongoose');

var clientSchema = mongoose.Schema({
    name: String,
    email: String,
    cod: String
});

var Client = mongoose.model('Client', clientSchema);

module.exports = Client;
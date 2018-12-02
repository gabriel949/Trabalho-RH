var mongoose = require('mongoose');

var projetoSchema = mongoose.Schema({
    cod: String,
    client: String,
    gerente: String,
    competencias: []
});

var Projeto = mongoose.model('Projeto', projetoSchema);

module.exports = Projeto;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ContaSchema = new Schema({
    id: Number,
    numero: String,
    agencia: String,
    nome: String,
    data_criacao: Date
});
 
module.exports = mongoose.model('Conta', ContaSchema);
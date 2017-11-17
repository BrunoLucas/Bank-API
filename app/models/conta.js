var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ContaSchema = new Schema({
    id: Number,
    numero: Number,
    agencia: String,
    nome: String,
    data_criacao: Date,
    saldo: Number
});
 
module.exports = mongoose.model('Conta', ContaSchema);
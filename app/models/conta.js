var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ContaSchema = new Schema({
    id: Number,
    numero: Number,
    agencia: String,
    nome: String,
    data_criacao: Date,
    valor_deposito_inicial: Number,
    saldo: Number
});
 
module.exports = mongoose.model('Conta', ContaSchema);
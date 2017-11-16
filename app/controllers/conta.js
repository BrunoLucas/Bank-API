var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ContaSchema = new Schema({
    id: Number,
    numero: Number,
    agencia: String,
    nome: String,
    saldo: Double,
    data_criacao: Date
});
 
module.exports = mongoose.model('Conta', ContaSchema);
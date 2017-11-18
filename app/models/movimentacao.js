var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var MovimentacaoSchema = new Schema({
    id: Number,
    numero_conta_remetente: String,
    agencia_remetente: String,
    tipo_movimentacao: String,
    numero_conta_destinatario: String,
    agencia_destinatario: String, 
    data_movimentacao: Date,
    valor_movimentacao: Number
});
 
module.exports = mongoose.model('Movimentacao', MovimentacaoSchema);
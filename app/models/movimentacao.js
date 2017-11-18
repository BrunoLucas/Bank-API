var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var MovimentacaoSchema = new Schema({
    id: Number,
    numero_conta_remetente: Number,
    agencia_remetente: String,
    tipo_movimentacao: String,
    numero_conta_destinatario: Number,
    agencia_destinatario: String, 
    data_movimentacao: Date,
    valor_movimentacao: Number
});
 
module.exports = mongoose.model('Movimentacao', MovimentacaoSchema);
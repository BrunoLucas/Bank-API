var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var TransferenciaSchema = new Schema({
    id: Number,
    numero_conta_remetente: String,
    agencia_remetente: String,
    tipo_transferencia: String,
    numero_conta_destinatario: String,
    agencia_destinatario: String, 
    data_transferencia: Date,
    valor_transferencia: Number
});
 
module.exports = mongoose.model('Transferencia', TransferenciaSchema);
var db = require('../db_config.js');
exports.listar = function(callback){

    db.Transferencia.find({}, function(error, conta){

        if(error){
            callback(error, 'Erro ao buscar transferencias');
        }else{
            callback(conta);
        }
    });
};

exports.transferir = function(contaRemetente, contaDestinatario, dadosTransferencia, callback){

    callback('eror', 'Ainda a ser implementado');
};

exports.depositar = function(contaRemetente, contaDestinatario, dadosTransferencia, callback){
    callback('eror', 'Ainda a ser implementado');
};
    

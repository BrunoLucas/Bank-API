var db = require('../db_config.js');
var contaController = require('./conta-controller.js');

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

    contaController.buscarPorNumeroContaEAgencia(contaRemetente.numero, contaRemetente.agencia, function(resp){
        if(!resp){
            throw new Error('Conta do remetente nao encontrada');
        }
    });
    contaController.buscarPorNumeroContaEAgencia(contaDestinatario.numero, contaDestinatario.agencia, function(resp){
        if(!resp){
            throw new Error('Conta do destinatario nao encontrada');
        }
    });

   var transferencia = new db.Transferencia();
    transferencia.save().then((resultadoTransferencia)=>{
        callback(transferencia);
    }).error(error =>{
        callback(error);
    });


};

exports.depositar = function(contaRemetente, valorADepositar, callback){
    contaController.buscarPorNumeroContaEAgencia(contaRemetente, valorADepositar,  function(resp){
        if(!resp){
            throw new Error('Conta do remetente nao encontrada');
        }
    });

    contaController.depositar(contaRemetente, valorADepositar, function(resp){

    });

    var transferencia = new db.Transferencia();
    transferencia.save().then((resultadoTransferencia)=>{
        callback(transferencia);
    }).error(error =>{
        callback(error);
    });


};
    

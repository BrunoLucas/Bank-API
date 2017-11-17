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
   transferencia.tipo_transferencia = dadosTransferencia.tipo_transferencia;
   transferencia.numero_conta_destinatario = dadosTransferencia.numero_conta_destinatario;
   transferencia.numero_conta_remetente = dadosTransferencia.numero_conta_remetente;
   transferencia.agencia_remetente = dadosTransferencia.agencia_remetente;
   transferencia.agencia_destinatario = dadosTransferencia.agencia_destinatario;
   transferencia.valor_transferencia = dadosTransferencia.valor_transferencia;

    transferencia.save().then((resultadoTransferencia)=>{
        console.log('resultadoTransferencia ' + resultadoTransferencia);
        callback(resultadoTransferencia);
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

    contaController.depositar((contaRemetente, valorADepositar)).then(resp=>{

    }).catch(error=>{
        throw new Error('Erro ao realizar deposito');
    });

    var transferencia = new db.Transferencia();
    transferencia.tipo_transferencia = 'DEP';
    transferencia.numero_conta_destinatario = contaRemetente.numero;
    transferencia.numero_conta_remetente = contaRemetente.numero;
    transferencia.agencia_remetente = contaRemetente.agencia;
    transferencia.agencia_destinatario = contaRemetente.agencia;
    transferencia.valor_transferencia = valorADepositar;

    transferencia.save().then((resultadoTransferencia)=>{
        callback(transferencia);
    }).error(error =>{
        callback(error);
    });


};
    

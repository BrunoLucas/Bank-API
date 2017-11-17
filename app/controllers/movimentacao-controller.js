var db = require('../db_config.js');
var contaController = require('./conta-controller.js');

exports.listar = function(callback){

    db.movimentacao.find({}, function(error, conta){

        if(error){
            callback(error, 'Erro ao buscar movimentacoes');
        }else{
            callback(conta);
        }
    });
};

exports.transferir = (contaRemetente, contaDestinatario, dadosMovimentacao)=>{

    return new Promise((resolve, reject)=>{
        contaController.buscarPorNumeroContaEAgencia(contaRemetente.numero, contaRemetente.agencia).catch(error=>{
            reject('Conta do remetente nao encontrada');
        });
        contaController.buscarPorNumeroContaEAgencia(contaDestinatario.numero, contaDestinatario.agencia).catch(error=>{
            reject('Conta do destinatario nao encontrada');
        });
        
        var movimentacao = new db.Movimentacao();
        movimentacao.tipo_movimentacao = dadosMovimentacao.tipo_movimentacao;
        movimentacao.numero_conta_destinatario = dadosMovimentacao.numero_conta_destinatario;
        movimentacao.numero_conta_remetente = dadosMovimentacao.numero_conta_remetente;
        movimentacao.agencia_remetente = dadosMovimentacao.agencia_remetente;
        movimentacao.agencia_destinatario = dadosMovimentacao.agencia_destinatario;
        movimentacao.valor_movimentacao = dadosMovimentacao.valor_movimentacao;
 
        movimentacao.save().then((resultadomovimentacao)=>{
             resolve(resultadomovimentacao);
         }).error(error =>{
             reject(error);
         });
    });
};

exports.depositar = (contaRemetente, valorADepositar)=>{

    return new Promise((resolve, reject)=>{        
        contaController.buscarPorNumeroContaEAgencia(contaRemetente.numero,contaRemetente.agencia).catch(error=>{
            reject('Conta do remetente nao encontrada');
        });       
        contaController.depositar(contaRemetente, valorADepositar).catch(error=>{
            reject('Erro ao realizar deposito ' + error);
        });
   
        var movimentacao = new db.Movimentacao();
        movimentacao.tipo_movimentacao = 'DEP';
        movimentacao.numero_conta_destinatario = contaRemetente.numero;
        movimentacao.numero_conta_remetente = contaRemetente.numero;
        movimentacao.agencia_remetente = contaRemetente.agencia;
        movimentacao.agencia_destinatario = contaRemetente.agencia;
        movimentacao.valor_movimentacao = valorADepositar;
    
        movimentacao.save().then((resultadomovimentacao)=>{
            resolve(movimentacao);
        }).error(error =>{
            reject(error);
        });

    });



};
    

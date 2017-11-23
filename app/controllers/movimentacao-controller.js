var db = require('../db_config.js');
var contaController = require('./conta-controller.js');
var emailController = require('./email-controller.js');
/**
 * DEP - Deposito para remetente
 * TRA - Transferencia entre remetente e destinatario
 * 
 */
exports.listar = function(callback){

    db.movimentacao.find({}, function(error, conta){

        if(error){
            callback(error, 'Erro ao buscar movimentacoes');
        }else{
            callback(conta);
        }
    });
};

exports.transferir = (( dadosMovimentacao)=>{

    return new Promise((resolve, reject)=>{
        let saldoAtualRemetente;
        Promise.all([
            obterDadosConta(dadosMovimentacao.numero_conta_remetente, dadosMovimentacao.agencia_remetente),
            obterDadosConta(dadosMovimentacao.numero_conta_destinatario, dadosMovimentacao.agencia_destinatario),
            this.obterSaldoAtualDeConta(dadosMovimentacao.numero_conta_remetente, dadosMovimentacao.agencia_remetente)
            ]).then(saldoAtualRemetente=>{
                enviarMovimento(dadosMovimentacao, saldoAtualRemetente).then(res=>{
                    emailController.sendMail(res);
                    resolve(res);
                }).catch(error =>{
                    reject(error);
                });
            }).catch(error=>{ 
                reject(error);
            });
        });
   
 

    function obterDadosConta(numero, agencia){
        return new Promise((resolve, reject)=>{
   
           contaController.buscarPorNumeroContaEAgencia(numero, agencia).then(conta=>{
               if(!conta){
                   throw new Error('Conta: '+ numero + ' Agencia: '+ agencia);
               }
              resolve(conta);
           }).catch(error=>{
               reject('Conta do remetente nao encontrada ' + error);
           });
        }).catch(error=>{
            throw new Error(error);
        });;
    }

    function enviarMovimento(dadosMovimentacao, saldoDisponivel){
        
        return new Promise((resolve, reject)=>{
            if(saldoDisponivel < dadosMovimentacao.valor_movimentacao){
                throw new Error('Saldo insuficiente');
            }
           var movimentacao = new db.Movimentacao();
           movimentacao.numero_conta_destinatario = dadosMovimentacao.numero_conta_destinatario;
           movimentacao.numero_conta_remetente = dadosMovimentacao.numero_conta_remetente;
           movimentacao.agencia_remetente = dadosMovimentacao.agencia_remetente;
           movimentacao.agencia_destinatario = dadosMovimentacao.agencia_destinatario;
           movimentacao.valor_movimentacao = dadosMovimentacao.valor_movimentacao;
           movimentacao.tipo_movimentacao = 'TRA';
           movimentacao.data_movimentacao = new Date();
           movimentacao.email_comprovante = dadosMovimentacao.email_comprovante;
           movimentacao.save().then((resultadomovimentacao)=>{
                resolve(resultadomovimentacao);
            }).error(error =>{
                reject(error);
            });
        }).catch(error =>{
            throw (error);
        });
    }

   
});

exports.obterHistoricoDeConta = (numero, agencia)=>{
    
            return new Promise((resolve, reject)=>{

                db.Movimentacao.find(
                    {$or:[ {numero_conta_remetente: numero,
                        agencia_remetente: agencia
                       }, {numero_conta_destinatario: numero,
                        agencia_destinatario: agencia
                    }]}
                   ).exec((function(error, movimentosRetornados){
                        if(error){
                            reject('Erro ao obter historico de conta' + error);
                        }else{
                            if(!movimentosRetornados){
                                reject('Erro ao obter historico de conta');
                            }
                            resolve(movimentosRetornados);
                        }
                    }));
               
            }).catch(error =>{
                reject(error);
            });
    }

    exports.obterHistoricoDeTodasAsContas = ()=>{
        
                return new Promise((resolve, reject)=>{
    
                    db.Movimentacao.find({}).exec((function(error, movimentosRetornados){
                            if(error){
                                reject('Erro ao obter historico de contas' + error);
                            }else{
                                if(!movimentosRetornados){
                                    reject('Erro ao obter historico de contas');
                                }
                                resolve(movimentosRetornados);
                            }
                        }));
                   
                }).catch(error =>{
                    reject(error);
                });
        }
  
exports.obterSaldoAtualDeConta = (numero, agencia)=>{
    return new Promise((resolve, reject)=>{

        let saldo = 0.00;
        this.obterHistoricoDeConta(numero, agencia).then(movimentos=>{
            movimentos.forEach(movimento=>{
                if(movimento.tipo_movimentacao === 'DEP'){
                    saldo += movimento.valor_movimentacao;
                }else if(movimento.numero_conta_remetente === numero 
                        && movimento.agencia_remetente === agencia){
                            saldo -= movimento.valor_movimentacao;
                        }
                else if(movimento.numero_conta_destinatario === numero 
                            && movimento.agencia_destinatario === agencia){
                                saldo += movimento.valor_movimentacao;
                }        
            });
            resolve(saldo);
        }).catch(error=>{
            reject(error);
        });
    });
}    
exports.depositar = (contaRemetente, valorADepositar)=>{

    return new Promise((resolve, reject)=>{        
        contaController.buscarPorNumeroContaEAgencia(contaRemetente.numero,contaRemetente.agencia).catch(error=>{
            reject('Conta do remetente nao encontrada');
        });       
   
        var movimentacao = new db.Movimentacao();
        movimentacao.tipo_movimentacao = 'DEP';
        movimentacao.numero_conta_destinatario = contaRemetente.numero;
        movimentacao.numero_conta_remetente = contaRemetente.numero;
        movimentacao.agencia_remetente = contaRemetente.agencia;
        movimentacao.agencia_destinatario = contaRemetente.agencia;
        movimentacao.valor_movimentacao = valorADepositar;
        movimentacao.data_movimentacao = new Date();
        movimentacao.save().then((resultadomovimentacao)=>{
            resolve(movimentacao);
        }).error(error =>{
            reject(error);
        });

    });

};

exports.obterMovimentoPor = (id)=>{
    let movimento = new db.Movimentacao();
    movimento._id = id;
    return new Promise((resolve, reject)=>{
        db.Movimentacao.findById(movimento).exec((error, movimentacao)=>{
            if(error || !movimentacao){
                reject('Erro ao obter movimento');
            }else{    
                resolve(movimentacao);
            }
        });
    });
 }
   
// return new Promise((resolve, reject)=>{ 
//     db.Conta.findOne({numero : numeroConta, agencia : agencia}).exec((function(error, conta){

//         if(error || !conta){
//             reject(error, 'Erro ao buscar conta e agencia');
//         }else{
//             resolve(conta);
//         }
//     }));
// });
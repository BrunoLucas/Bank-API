var db = require('../db_config.js');
exports.listar = () =>{

    return new Promise((resolve, reject)=>{

        db.Conta.find({}, (error, conta)=>{
            if(error){
                reject(error, 'Erro ao buscar');
            }else{
                resolve(conta);
            }
        });   
    });
};

exports.salvar = (dadosConta)=>{
    
    return new Promise((resolve, reject)=>{ 
        var conta = new db.Conta();
        conta.numero = dadosConta.numero;
        conta.agencia = dadosConta.agencia;
        conta.nome = dadosConta.nome;
        conta.data_criacao = new Date();
        conta.saldo = dadosConta.saldo;
        conta.save().then((contaCriada)=>{
            resolve(contaCriada);
        }).error(msg=>{
            reject(msg, 'Erro ao criar conta');
        });

    });
};

exports.depositar = (dadosConta, valor)=>{
    
    return new Promise((resolve, reject) =>{

        var conta = new db.Conta();
        conta.numero = dadosConta.numero;
        conta.agencia = dadosConta.agencia;
        conta.nome = dadosConta.nome;
        conta.data_criacao = new Date();
        conta.saldo = dadosConta.saldo;
      
        this.buscarPorNumeroContaEAgencia(conta.numero, conta.agencia).then((contaAtualizada)=>{
            resolve(contaAtualizada);
        }).catch(error =>{
            reject(error);
        });
    }) ;   

};

exports.buscarPorNumeroContaEAgencia = (numeroConta=0,agencia='') =>{
 
    return new Promise((resolve, reject)=>{ 
        db.Conta.findOne({numero : numeroConta, agencia : agencia}).exec((function(error, conta){

            if(error){
                reject(error, 'Erro ao buscar conta e agencia');
            }else{
                resolve(conta);
            }
        }));
    });       
};

exports.obter = function(){
    
};


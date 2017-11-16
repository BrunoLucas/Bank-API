var db = require('../db_config.js');
exports.listar = () =>{
    db.Conta.find({}, (error, conta)=>{
    
        return new Promise((resolve, reject)=>{

            if(error){
                reject(error, 'Erro ao buscar');
            }else{
                resolve(conta);
            }
        })   
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
      
        buscarPorNumeroContaEAgencia(conta.numero, conta.agencia).then((contaAtualizada)=>{
            resolve(contaAtualizada);
        }).catch(error =>{
            reject(error);
        });
    }) ;   

};

exports.buscarPorNumeroContaEAgencia = (numeroConta,agencia) =>{
    
    return new Promise((resolve, reject)=>{

        db.Conta.findOne().where("numero", numeroConta).and("agencia", agencia) .exec((function(error, conta){
            if(error){
                reject(error, 'Erro ao buscar historico de conta');
            }else{
                resolve(conta);
            }
        }));
    });       
};

exports.obter = function(){
    
};


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
        conta.save().then((contaCriada)=>{
            resolve(contaCriada);
        }).error(msg=>{
            reject(msg, 'Erro ao criar conta');
        });

    });
};


exports.buscarPorNumeroContaEAgencia = (numeroConta=0,agencia='') =>{
 
    return new Promise((resolve, reject)=>{ 
        db.Conta.findOne({numero : numeroConta, agencia : agencia}).exec((function(error, conta){

            if(!conta){
                console.log(conta);
                reject(error, 'Erro ao buscar conta e agencia');
            }else{
                resolve(conta);
            }
        }));
    });       
};

exports.obter = function(){
    
};


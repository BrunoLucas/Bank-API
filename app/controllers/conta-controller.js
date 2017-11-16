var db = require('../db_config.js');
exports.listar = function(callback){

    db.Conta.find({}, function(error, conta){

        if(error){
            callback(error, 'Erro ao buscar');
        }else{
            callback(conta);
        }
    });
};

exports.salvar = (dadosConta, callback)=>{
    
     
    var conta = new db.Conta();
    console.log('dadosConta ' + dadosConta);
    console.log('numero: ' + dadosConta.numero);
    conta.numero = dadosConta.numero;
    conta.agencia = dadosConta.agencia;
    conta.nome = dadosConta.nome;
    conta.data_criacao = new Date();
    conta.saldo = dadosConta.saldo;
    console.log(conta.numero);
    // callback('err');

    conta.save().then((contaCriada)=>{
       callback(contaCriada);
    }).error(msg=>{
        callback(msg, 'Erro ao criar conta');
    });
};

exports.depositar = (dadosConta, valor, callback)=>{
    
     
    var conta = new db.Conta();
    conta.numero = dadosConta.numero;
    conta.agencia = dadosConta.agencia;
    conta.nome = dadosConta.nome;
    conta.data_criacao = new Date();
    conta.saldo = dadosConta.saldo;

    console.log(conta.numero);
    // callback('err');

    buscarPorNumeroContaEAgencia(conta.numer, conta.agencia, function(contaRetornada){
        contaRetornada.save().then((contaAtualizada)=>{
            callback(contaAtualizada);
         }).error(msg=>{
             callback(msg, 'Erro ao depostar em conta');
         });
    });

   
};

exports.findById = function(id, callback){

    console.log(id);    
    db.Conta.findById(id, (error, conta)=>{
        if(error){
            callback(error, 'Erro ao buscar historico de conta');
        }else{
            callback(conta);
        }
    });
};

exports.buscarPorNumeroContaEAgencia = function(numeroConta,agencia ,callback){
    
        db.Conta.findOne().where("numero", numeroConta).and("agencia", agencia) .exec((function(error, conta){
            if(error){
                callback(error, 'Erro ao buscar historico de conta');
            }else{
                callback(conta);
            }
        }));
    };

exports.obter = function(){
    
};


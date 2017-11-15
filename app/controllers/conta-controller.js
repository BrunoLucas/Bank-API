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

exports.salvar = function(dadosConta, callback){
    
     
    var conta = new db.Conta();
    console.log('dadosConta ' + dadosConta);
    console.log('numero: ' + dadosConta.numero);
    conta.numero = dadosConta.numero;
    conta.agencia = dadosConta.agencia;
    conta.nome = dadosConta.nome;
    conta.data_criacao = new Date();

    console.log(conta.numero);
    conta.save().then((contaCriada)=>{
       callback(contaCriada);
    }).error(msg=>{
        callback(msg, 'Erro ao criar conta');
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

exports.buscarPorNumeroConta = function(numeroConta, callback){
    
        var query = "{numero : 123}";  
        db.Conta.findOne().where("numero", numeroConta).exec((function(error, conta){
            if(error){
                callback(error, 'Erro ao buscar historico de conta');
            }else{
                callback(conta);
            }
        }));
    };

exports.obter = function(){
    
};


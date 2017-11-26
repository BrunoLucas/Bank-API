var db = require('../db_config.js');

exports.list = () => {

    return new Promise((resolve, reject) => {

        db.Account.find({}, (error, account) => {
            if (error) {
                reject(error, 'Erro ao buscar');
            } else {
                resolve(account);
            }
        });

    });
};

exports.save = (accountData) => {

    return new Promise((resolve, reject) => {
        var account = new db.Account();
        account.number = accountData.number;
        account.agency = accountData.agency;
        account.name = accountData.name;
        account.creation_date = new Date();

        account.save().then((createdAccount) => {
            resolve(createdAccount);
        }).error(msg => {
            reject(msg, 'Erro ao criar conta');
        });


    });
};

exports.searchByAccountNumberAndAgency = (accountNumber=0,agency='') =>{
    
       return new Promise((resolve, reject)=>{
           
               db.Account.findOne({number : accountNumber, agency : agency}).exec((function(error, account){
   
                   if(account ==  undefined || account == null){
                       console.log(account);
                       reject('Erro ao buscar conta e agencia');
                   }else{
                       resolve(account);
                   }
               }));
           
       });       
   };


var loki = require('lokijs');
var db = require('../db_config.js');

exports.list = () => {

    return new Promise((resolve, reject) => {


        console.log('simulating accounts for test environment');
        // let accounts = [];
        // for(i=0;i< 10;i++){
        //     let account = {};
        //     account._id = i;
        //     account.name = 'Name Test';
        //     account.number = 123456+i;
        //     account.agency = '123'+i;
        //     account.opening_balance = 200.00;
        //     accounts.push(account);
        // }
        // resolve(accounts);

    });
};

exports.save = (accountMemory) => {

    return new Promise((resolve, reject) => {

        db.accountMemoryDB.insert({
            number: accountMemory.number,
            agency: accountMemory.agency,
            name: accountMemory.name,
            creation_date: accountMemory.creation_date,
            _id: accountMemory._id
        });
        resolve(accountMemory);
    });
};

exports.searchByAccountNumberAndAgency = (accountNumber = 0, agency = '') => {

    return new Promise((resolve, reject) => {

        console.log('test environment');
        const account = db.accountMemoryDB.find(
            {number:
             {$aeq :accountNumber}, agency : {$aeq : agency}
            });
        if(account){
            resolve(account[0]);
        }else{
            reject('Agencia e conta nao encontrados');
        }

    });
};
var accountController = require('../controllers/account-controller');
var emailController = require('../controllers/email-controller.js');
var testEnvironment = process.env.TEST;
var loki = require('lokijs');
var db = require('../db_config.js');

exports.list = () => {

    return new Promise((resolve, reject) => {
        db.Movement.find({}, function (error, account) {

            if (error) {
                reject(error, 'Erro ao buscar movimentacoes');
            } else {
                resolve(account);
            }
        });
    });
};



exports.transfer = ((movementData) => {

    return new Promise((resolve, reject) => {
        let currentSenderBalance;
        Promise.all([
            getAccountData(movementData.sender_account_number, movementData.sender_agency),
            getAccountData(movementData.recipient_account_number, movementData.recipient_agency),
            this.getCurrentAccountBalance(movementData.sender_account_number, movementData.sender_agency)
        ]).then(currentSenderBalance => {
            sendMovement(movementData, currentSenderBalance).then(res => {
                emailController.sendMail(res);
                resolve(res);
            }).catch(error => {
                reject(error);
            });
        }).catch(error => {
            reject(error);
        });
    });



    function getAccountData(number, agency) {
        return new Promise((resolve, reject) => {

            accountController.searchByAccountNumberAndAgency(number, agency).then(account => {
                if (!account) {
                    throw new Error('conta: ' + number + ' agencia: ' + agency);
                }
                resolve(account);
            }).catch(error => {
                reject('conta do remetente nao encontrada ' + error);
            });
        }).catch(error => {
            throw new Error(error);
        });;
    }

    function sendMovement(movementData, balanceDisponivel) {

        return new Promise((resolve, reject) => {


            console.log('test environment');
            db.movementMemoryDB.insert({
                recipient_account_number: movementData.recipient_account_number,
                recipient_agency: movementData.recipient_agency,
                sender_account_number: movementData.sender_account_number,
                sender_agency: movementData.sender_agency,
            });

            resolve(movementData);

        }).catch(error => {
            throw (error);
        });
    }


});



exports.getHistoryAllAccounts = () => {

    return new Promise((resolve, reject) => {

        console.log('test environment');

        const movements = db.movementMemoryDB.find({});
        resolve(movements);


    }).catch(error => {
        reject(error);
    });
}

exports.getCurrentAccountBalance = (number, agency) => {
    return new Promise((resolve, reject) => {

        let balance = 0.00;
        this.getAccountHistory(number, agency).then(movements => {
            movements.forEach(movement => {
                if (movement.type_account_movement === 'DEP') {
                    balance += movement.amount;
                } else if (movement.sender_account_number === number
                    && movement.sender_agency === agency) {
                    balance -= movement.amount;
                }
                else if (movement.recipient_account_number === number
                    && movement.recipient_agency === agency) {
                    balance += movement.amount;
                }
            });
            resolve(balance);
        }).catch(error => {
            reject(error);
        });
    });
}

exports.getAccountHistory = (number, agency) => {

    return new Promise((resolve, reject) => {

        console.log('test environment');

        const movements = db.movementMemoryDB.find(
            {
                sender_account_number: { $aeq: number },
                sender_agency: { $aeq: agency }
            }
        );
        resolve(movements);


    }).catch(error => {
        reject(error);
    });
}

exports.deposit = (senderAccount, amount) => {

    return new Promise((resolve, reject) => {
        accountController.searchByAccountNumberAndAgency(senderAccount.number, senderAccount.agency).catch(error => {
            reject('conta do remetente nao encontrada');
        });


        var movement = {};
        movement.type_account_movement = 'DEP';
        movement.recipient_account_number = senderAccount.number;
        movement.sender_account_number = senderAccount.number;
        movement.sender_agency = senderAccount.agency;
        movement.recipient_agency = senderAccount.agency;
        movement.amount = amount;
        movement.data_movement = new Date();
        db.movementMemoryDB.insert({
            type_account_movement: movement.type_account_movement,
            recipient_account_number: movement.recipient_account_number,
            sender_account_number: movement.sender_account_number,
            sender_agency: movement.sender_agency,
            recipient_agency: movement.recipient_agency,
            amount: movement.amount,
            data_movement: movement.data_movement
        });


    });

};

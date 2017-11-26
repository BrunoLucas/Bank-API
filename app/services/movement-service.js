var db = require('../db_config.js');
var accountController = require('../controllers/account-controller');
var emailController = require('../controllers/email-controller.js');
var testEnvironment = process.env.TEST;
var loki = require('lokijs');

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
                if (account == undefined || account == null) {
                    throw new Error('conta: ' + number + ' agencia: ' + agency);
                }
                resolve(account);
            }).catch(error => {
                process.on('unhandledRejection', r => console.log('aaaaaaa ' + r));
                reject('conta não encontrada ' + error);
            });
        }).catch(error => {
            throw new Error(error);
        });;
    }

    function sendMovement(movementData, balanceDisponivel) {

        return new Promise((resolve, reject) => {

            if (balanceDisponivel[2] < movementData.amount) {
                throw new Error('saldo insuficiente');
            }
            var movementAccount = new db.Movement();
            movementAccount.recipient_account_number = movementData.recipient_account_number;
            movementAccount.sender_account_number = movementData.sender_account_number;
            movementAccount.sender_agency = movementData.sender_agency;
            movementAccount.recipient_agency = movementData.recipient_agency;
            movementAccount.amount = movementData.amount;
            movementAccount.type_account_movement = 'TRA';
            movementAccount.date_movement = new Date();
            movementAccount.email = movementData.email;
            movementAccount.save().then((movementResult) => {
                resolve(movementResult);
            }).error(error => {
                reject(error);
            });

        }).catch(error => {
            throw (error);
        });
    }


});




exports.getHistoryAllAccounts = () => {

    return new Promise((resolve, reject) => {

        db.Movement.find({}).exec((function (error, returnedMovements) {
            if (error) {
                reject('Erro ao obter historico de contas' + error);
            } else {
                if (!returnedMovements) {
                    reject('Erro ao obter historico de contas');
                }
                resolve(returnedMovements);
            }
        }));

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

        db.Movement.find(
            {
                $or: [{
                    sender_account_number: number,
                    sender_agency: agency
                }, {
                    recipient_account_number: number,
                    recipient_agency: agency
                }]
            }
        ).exec((function (error, returnedMovements) {
            if (error) {
                reject('Erro ao obter historico de account' + error);
            } else {
                if (!returnedMovements) {
                    reject('Erro ao obter historico de account');
                }
                resolve(returnedMovements);
            }
        }));


    }).catch(error => {
        reject(error);
    });
}


exports.deposit = (senderAccount, amount) => {

    return new Promise((resolve, reject) => {
        accountController.searchByAccountNumberAndAgency(senderAccount.number, senderAccount.agency).catch(error => {
            reject('conta do remetente nao encontrada');
        });

        var movement = new db.Movement();
        movement.type_account_movement = 'DEP';
        movement.recipient_account_number = senderAccount.number;
        movement.sender_account_number = senderAccount.number;
        movement.sender_agency = senderAccount.agency;
        movement.recipient_agency = senderAccount.agency;
        movement.amount = amount;
        movement.data_movement = new Date();

        movement.save().then((movementResult) => {
            resolve(movement);
        }).error(error => {
            reject(error);
        });


    });

};

exports.getMovementBy = (id) => {
    let movement = new db.Movement();
    movement._id = id;
    return new Promise((resolve, reject) => {
        db.Movement.findById(movement).exec((error, movement) => {
            if (error || !movement) {
                reject('Erro ao obter movimento');
            } else {
                resolve(movement);
            }
        });
    });
}

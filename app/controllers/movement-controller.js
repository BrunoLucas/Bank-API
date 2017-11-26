var db = require('../db_config.js');
var accountController = require('./account-controller.js');
var emailController = require('./email-controller.js');
var testEnvironment = process.env.TEST;
var loki = require('lokijs');
var movementService = require('../services/movement-service');
var movementServiceTest = require('../services/movement-service-test');

/**
 * DEP - Deposito para remetente
 * TRA - Transferencia entre remetente e destinatario
 * 
 */
exports.list = () => {

    return new Promise(() => {
        if (testEnvironment === 'test') {

        } else {
            movementService.list()
                .then(resp => resolve(resp))
                .catch(error => error(error));
        }
    });
};


exports.transfer = (movementData) => {

    return new Promise((resolve, reject) => {
        if (testEnvironment === 'true') {
            movementServiceTest.transfer(movementData).then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        } else {
            movementService.transfer(movementData).then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        }
    })
};

exports.getAccountHistory = (number, agency) => {

    return new Promise((resolve, reject) => {

        if (testEnvironment === "true") {
            console.log('test environment');
            movementServiceTest.getAccountHistory(number, agency).then(resp => {
                resolve(resp);
            }).catch(error => reject(error));

        } else {
            movementService.getAccountHistory(number, agency).then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        }

    }).catch(error => {
        reject(error);
    });
}


exports.getHistoryAllAccounts = () => {

    return new Promise((resolve, reject) => {

        if (testEnvironment === "true") {
            movementServiceTest.getHistoryAllAccounts().then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        } else {
            movementService.getHistoryAllAccounts().then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        }

    }).catch(error => {
        reject(error);
    });
}

exports.getCurrentAccountBalance = (number, agency) => {
    return new Promise((resolve, reject) => {

        if (testEnvironment === 'true') {
            movementServiceTest.getCurrentAccountBalance(number, agency).then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        } else {
            movementService.getCurrentAccountBalance(number, agency).then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        }
    });
}
exports.deposit = (senderAccount, amount) => {

    return new Promise((resolve, reject) => {
        accountController.searchByAccountNumberAndAgency(senderAccount.number, senderAccount.agency).catch(error => {
            reject('conta do remetente nao encontrada');
        });


        if (testEnvironment === 'true') {
            movementServiceTest.deposit(senderAccount, amount).then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        } else {
            movementService.deposit(senderAccount, amount).then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        }

    });

};

exports.getMovementBy = (id) => {

    return new Promise((resolve, reject) => {


        if (testEnvironment === 'true') {
            movementServiceTest.getMovementBy(id).then(resp => {
                resolve(resp[0]);
            }).catch(error => reject(error));
        } else {
            movementService.getMovementBy(id).then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        }
    });
}

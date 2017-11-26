var db = require('../db_config.js');
var loki = require('lokijs');
var accountService = require('../services/account-service');
var accountServiceTest = require('../services/account-service-test');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./dbTest');
}

var testEnvironment = process.env.TEST;

exports.list = () => {

    return new Promise((resolve, reject) => {

        if (testEnvironment === "true") {
            console.log('simulating accounts for test environment');
            accountServiceTest.list().then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        } else {
            accountService.list().then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        }
    });
};

exports.save = (accountData) => {

    return new Promise((resolve, reject) => {

        if (testEnvironment === "true") {
            console.log('save in memory for test environment');
            var accountMemory = {};
            accountMemory.number = accountData.number;
            accountMemory.agency = accountData.agency;
            accountMemory.name = accountData.name;
            accountMemory.creation_date = new Date().toString();
            accountServiceTest.save(accountMemory).then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        } else {
            var account = new db.Account();
            account.number = accountData.number;
            account.agency = accountData.agency;
            account.name = accountData.name;
            account.creation_date = new Date();
            accountService.save(account).then(resp => {
                resolve(resp);
            }).catch(error => reject(error));;
        }
    });
};


exports.searchByAccountNumberAndAgency = (accountNumber = 0, agency = '') => {

    return new Promise((resolve, reject) => {

        if (testEnvironment === "true") {
            accountServiceTest.searchByAccountNumberAndAgency(accountNumber, agency)
                .then(resp => {
                    resolve(resp);
                }).catch(error => reject(error));
        }
        else {
            accountService.searchByAccountNumberAndAgency(accountNumber, agency)
            .then(resp => {
                resolve(resp);
            }).catch(error => reject(error));
        }
    });
};




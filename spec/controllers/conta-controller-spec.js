// import { fail } from 'assert';

var request = require('request');

var account = require('../../app/models/account.js');

describe('Teste de account Controller', function(){
 
        var accountController = require('../../app/controllers/account-controller.js');

        it('Lista de contas não deve estar vazia', function(){
            accountController.list(() =>{
            }).then(resp =>{
                expect(resp.length).toBeGreaterThan(0); 
            }).catch(error=>{
                fail('erro ao listar contas ' + error);
            });
            
        });

        it('Deve retornar uma conta pelo numero e agencia', function(){
            accountController.searchByAccountNumberAndAgency(123456,"1803").then(resp=>{
                expect(resp.number).toEqual(123456);
                expect(resp.agency).toEqual('1803');
            }).catch(error=>{
                fail('erro em retornar conta pelo numero e agencia ' + error);
            })
        });

        it('Não deve encontrar uma conta inexistente', function(){
            accountController.searchByAccountNumberAndAgency(1, 1803).then(resp=>{
                expect(resp).toBeUndefined();
            }).catch(error=>{
                expect(error).toBeDefined();
            })
        });


        function createAccount(){
            account = new account();
            account.number = 123456;
            account.agency = '1803';
            account.nome = 'account Teste 1';
            account.creation_date = new Date();
            return account;
        }
    });

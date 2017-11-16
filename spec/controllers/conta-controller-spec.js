var request = require('request');

describe('Teste de Conta Controller', function(){
 
        var contaController = require('../../app/controllers/conta-controller.js');

        it('Lista de contas não deve estar vazia', function(){
            contaController.listar(function(resp){
                expect(resp.length).toBeGreaterThan(0); 
            });
            
        });

        it('Deve retornar uma conta pelo numero e agencia', function(){
            contaController.buscarPorNumeroContaEAgencia(123456,1803, function(resp){
               console.log(resp);
                expect(resp.numero).toEqual(123456);
                expect(resp.agencia).toEqual(1803);
            });     
        });

        it('Não deve encontrar uma conta inexistente', function(){
            contaController.buscarPorNumeroContaEAgencia(1, 1803, function(resp){
                console.log('resp' + resp);
                expect(resp).toBeUndefined(); 
            });     
        });

        it('Deve depositar em conta existente', function(){
            // TODO 
            throw new Error('ainda nao implementado');
        });

    });

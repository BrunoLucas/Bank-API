var request = require("request");

describe("Teste de Conta Controller", function(){
    
    
        var paciente;
        var agendamentoDoRetorno;
        var contaController = require('../../app/controllers/conta-controller.js');

        it("Lista de contas não deve estar vazia", function(){
            contaController.listar(function(resp){
                expect(resp.length).toBeGreaterThan(0); 
            });
            
        });

        it("Deve retornar uma conta pelo numero", function(){
            contaController.buscarPorNumeroConta(123456,function(resp){
               console.log(resp);
                expect(resp.numero).toEqual('123456');
            });     
        });

        it("Não deve encontrar uma conta inexistente", function(){
            contaController.buscarPorNumeroConta(1,function(resp){
                console.log('resp' + resp);
                expect(resp).toBeUndefined(); 
            });     
        });
    });

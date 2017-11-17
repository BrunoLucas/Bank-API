// import { fail } from "assert";

var request = require("request");

describe("Teste de Conta Controller", function(){
 
        var contaController = require('../../app/controllers/conta-controller.js');

        it("Lista de contas não deve estar vazia", function(){
            contaController.listar(() =>{
            }).then(resp =>{
                expect(resp.length).toBeGreaterThan(0); 
            }).catch(error=>{
                fail('erro ao listar contas ' + error);
            });
            
        });

        it("Deve retornar uma conta pelo numero e agencia", function(){
            contaController.buscarPorNumeroContaEAgencia(123456,1803).then(resp=>{
                expect(resp.numero).toEqual(123456);
                expect(resp.agencia).toEqual('1803');
            }).catch(error=>{
                fail('erro em retornar conta pelo numero e agencia ' + error);
            })
        });

        it("Não deve encontrar uma conta inexistente", function(){
            contaController.buscarPorNumeroContaEAgencia((1, 1803)).then(resp=>{
                expect(resp).toBeNull();
            }).catch(error=>{
                fail('erro em buscar conta inexistente ' + error);
            })
        });

        it("Deve depositar em conta existente", function(){
            // TODO 
            fail('ainda nao implementado');
        });

    });

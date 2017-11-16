var request = require("request");
var transferenciaController = require('../../app/controllers/transferencia-controller.js');
var Conta = require('../../app/models/conta.js');
var Transferencia = require('../../app/models/transferencia.js');

describe("Teste de Transferencia Controller", function(){
  
    var conta1;
    var conta2;
    var transferencia;
    

        beforeEach(function(){

            conta1 = criarConta();

            conta2 = criarConta();
            conta2.numero = 123456;
            conta2.agencia = '1803';
            conta2.nome = 'Conta Teste 2';
            conta2.saldo = 100.00;
            conta2.data_criacao = new Date();

            transferencia = criarTransferencia();

        });

      
        it("Deve adicionar 100 para conta existente", function(){

            transferenciaController.transferir(conta1, conta2,transferencia, function(resp){
                
                    expect(resp).toBeDefined();
                    expect(resp.numero_conta_remetente) .toEqual( transferencia.numero_conta_remetente);
                    expect(resp.agencia_remetente) .toEqual(transferencia.agencia_remetente);
                    expect(conta1.saldo -  transferencia.valor_transferencia) .toEqual(conta1.saldo - 100.00);

                    expect(resp.numero_conta_destinatario) .toEqual( transferencia.numero_conta_destinatario);
                    expect(resp.agencia_destinatario) .toEqual(transferencia.agencia_destinatario);
                    expect(conta2.saldo +  transferencia.valor_transferencia) .toEqual(conta2.saldo + 100.00);
                    expect(resp.tipo_transferencia).toEqual('ADD');

            });
            
        });

        it("Deve depositar 90 para conta existente", function(){
            
                        transferencia.tipo_transferencia = 'DEP';
                        transferenciaController.depositar(conta1,transferencia, function(resp){

                    
                                expect(resp).toBeDefined();
                                expect(resp.numero_conta_remetente) .toEqual( transferencia.numero_conta_remetente);
                                expect(resp.agencia_remetente) .toEqual(transferencia.agencia_remetente);
                                expect(conta1.saldo +  transferencia.valor_transferencia) .toEqual(conta1.saldo + 90.00);
        
                                expect(resp.tipo_transferencia).toEqual('DEP');
            
                        });
                        
                    });
    });

    function criarConta() {
        conta = new Conta();
        conta.numero = 123456;
        conta.agencia = '1803';
        conta.nome = 'Conta Teste 1';
        conta.saldo = 300.00;
        conta.data_criacao = new Date();
        return conta;
    }

    function criarTransferencia(){
        
        transferencia = new Transferencia();
        transferencia.valor_transferencia = 100.00;
        transferencia.numero_conta_remetente = 123456;
        transferencia.agencia_remetente = 1803;
        transferencia.agencia_destinatario = 1803;
        transferencia.numero_conta_destinatario = 124567;
        transferencia.tipo_transferencia = 'ADD';
        
        return transferencia;
    }


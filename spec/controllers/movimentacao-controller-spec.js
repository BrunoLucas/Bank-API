var request = require("request");
var transferenciaController = require('../../app/controllers/movimentacao-controller.js');
var Conta = require('../../app/models/conta.js');
var Movimentacao = require('../../app/models/movimentacao.js');

describe("Teste de Movimentacao Controller", function(){
  
    var conta1;
    var conta2;
    var movimentacao;
    

        beforeEach(function(){

            conta1 = criarConta();

            conta2 = criarConta();
            conta2.numero = 123456;
            conta2.agencia = '1803';
            conta2.nome = 'Conta Teste 2';
            conta2.saldo = 100.00;
            conta2.data_criacao = new Date();

            movimentacao = criarTransferencia();

        });

      
        it("Deve transferir 100 para entre contas existentes", function(){

            transferenciaController.transferir(conta1, conta2,movimentacao, function(resp){
                    expect(resp).toBeDefined();
                    expect(resp.numero_conta_remetente) .toEqual( movimentacao.numero_conta_remetente);
                    expect(resp.agencia_remetente) .toEqual(movimentacao.agencia_remetente);
                    expect(conta1.saldo -  movimentacao.valor_transferencia) .toEqual(conta1.saldo - 100.00);

                    expect(resp.numero_conta_destinatario) .toEqual( movimentacao.numero_conta_destinatario);
                    expect(resp.agencia_destinatario) .toEqual(movimentacao.agencia_destinatario);
                    expect(conta2.saldo +  movimentacao.valor_transferencia) .toEqual(conta2.saldo + 100.00);
                    expect(resp.tipo_transferencia).toEqual('ADD');

            });
            
        });

        it("Deve depositar 90 para conta existente", function(){
                        movimentacao.tipo_transferencia = 'DEP';
                        const valor_transferencia = movimentacao.valor_transferencia;
                        conta1.numero = 123456;
                        conta1.agencia = '1803';
                        transferenciaController.depositar(conta1, valor_transferencia).then( (resp)=>{
                            expect(resp).toBeDefined();
                            expect(resp.numero_conta_remetente) .toEqual( movimentacao.numero_conta_remetente);
                            expect(resp.agencia_remetente) .toEqual(movimentacao.agencia_remetente);
                            expect(conta1.saldo +  movimentacao.valor_transferencia) .toEqual(conta1.saldo + 90.00);
                            expect(resp.tipo_transferencia).toEqual('DEP');
                    }).catch(error=>{
                        fail('Erro em deve depositar 90 para conta existente ' + error);
                    });
                        
        });

        it('Deve retornar historico de transferencias para numero e agencia', function(){
                let transferencia1 = criarTransferencia();
                let transferencia2 = criarTransferencia();
                let transferencia3 = criarTransferencia();
                transferencia3.tipo_transferencia = 'DEP';
                

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
        
        movimentacao = new Movimentacao();
        movimentacao.valor_transferencia = 100.00;
        movimentacao.numero_conta_remetente = 123456;
        movimentacao.agencia_remetente = 1803;
        movimentacao.agencia_destinatario = 1803;
        movimentacao.numero_conta_destinatario = 124567;
        movimentacao.tipo_transferencia = 'ADD';
        
        return movimentacao;
    }


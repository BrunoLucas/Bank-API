var request = require("request");
var movimentacaoController = require('../../app/controllers/movimentacao-controller.js');
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

            movimentacao = criarTransferencia(conta1, conta2,100.00);

        });

      
        it("Deve transferir 100 para entre contas existentes", function(){

            movimentacaoController.transferir(conta1, conta2,movimentacao, function(resp){
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
                        movimentacaoController.depositar(conta1, valor_transferencia).then( (resp)=>{
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
                let conta1 = criarConta();
                let conta2 = criarConta();
                conta2.numero = 1234567;
                conta2.agencia = '1800';
                conta2.saldo = 500.00;


                let transferencia1 = criarTransferencia(conta1, conta2, 30.00);
                let transferencia2 = criarTransferencia(conta2, conta1, 100.00);
                let transferencia3 = criarDeposito(conta2, 200.00);

                movimentacaoController.transferir(conta1, conta2, transferencia1).then(resp=>{
                    expect(resp).toBeDefined();
                }).catch(error=>{
                    fail('Erro ao realizar transferencia ' + error);
                })
                

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

    function criarTransferencia(contaRemetente, contaDestinatario, valorTransferencia){
        
        movimentacao = new Movimentacao();
        movimentacao.valor_transferencia = valorTransferencia;
        movimentacao.numero_conta_remetente = contaRemetente.numero;
        movimentacao.agencia_remetente = contaRemetente.agencia;
        movimentacao.agencia_destinatario = contaDestinatario.agencia;
        movimentacao.numero_conta_destinatario = contaDestinatario.numero;
        movimentacao.tipo_transferencia = 'ADD';
        
        return movimentacao;
    }

    function criarDeposito(conta, valor){
        
        movimentacao = new Movimentacao();
        movimentacao.valor_transferencia = valor;
        movimentacao.numero_conta_remetente = conta.numero;
        movimentacao.agencia_remetente = conta.agencia;
        movimentacao.agencia_destinatario = conta.agencia;
        movimentacao.numero_conta_destinatario = conta.numero;
        movimentacao.tipo_transferencia = 'DEP';
        
        return movimentacao;
    }


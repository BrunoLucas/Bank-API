var request = require('request');
var movimentacaoController = require('../../app/controllers/movimentacao-controller.js');
var Conta = require('../../app/models/conta.js');
var Movimentacao = require('../../app/models/movimentacao.js');

describe('Teste de Movimentacao Controller', function(){
  
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

            movimentacao = criarTransferencia(conta1, conta2, 100.00);

        });

      
        it('Deve transferir 100 para entre contas existentes', function(){

            movimentacaoController.transferir(movimentacao).then(resp=>{
                
                movimentacao.valor_movimentacao = 100.00;
                    expect(resp).toBeDefined();
                    expect(resp.numero_conta_remetente) .toEqual( movimentacao.numero_conta_remetente);
                    expect(resp.agencia_remetente) .toEqual(movimentacao.agencia_remetente);
                    expect(conta1.saldo -  movimentacao.valor_movimentacao) .toEqual(conta1.saldo - 100.00);
                    expect(resp.numero_conta_destinatario) .toEqual( movimentacao.numero_conta_destinatario);
                    expect(resp.agencia_destinatario) .toEqual(movimentacao.agencia_destinatario);
                    expect(conta2.saldo +  movimentacao.valor_movimentacao).toEqual(conta2.saldo + 100.00);
                    expect(resp.tipo_movimentacao).toEqual('ADD');

            }).catch(error=>{
                    fail('Erro ao transferir 100 entre contas existentes '+error);
            });
            
        });

        it('Deve depositar 90 para conta existente', function(){
                        movimentacao.tipo_transferencia = 'DEP';
                        const valor_movimentacao = 90.00;
                        conta1.numero = 123456;
                        conta1.agencia = '1803';
                        movimentacaoController.depositar(conta1, valor_movimentacao).then( (resp)=>{
                            expect(resp).toBeDefined();
                            expect(resp.numero_conta_remetente) .toEqual( movimentacao.numero_conta_remetente);
                            expect(resp.agencia_remetente) .toEqual(movimentacao.agencia_remetente);
                            expect(conta1.saldo +  valor_movimentacao) .toEqual(conta1.saldo + 90.00);
                            expect(resp.tipo_movimentacao).toEqual('DEP');
                    }).catch(error=>{
                        fail('Erro em deve depositar 90 para conta existente ' + error);
                    });
                        
        });

        it('Deve retornar historico de transferencias para numero e agencia', function(){
                conta2.numero = 123465;
                conta2.agencia = '1803';
                conta2.saldo = 500.00;


                let transferencia1 = criarTransferencia(conta1, conta2, 30.00);
                let transferencia2 = criarTransferencia(conta2, conta1, 100.00);
                let transferencia3 = criarDeposito(conta2, 200.00);

                movimentacaoController.transferir(transferencia1).then(resp=>{
                    expect(resp).toBeDefined();
                }).catch(error=>{
                    fail('Erro ao realizar transferencia ' + error);
                });
                movimentacaoController.obterHistoricoDeConta(conta1.numero, conta1.agencia).then(resp=>{
                    expect(resp).toBeDefined();
                }).catch(error=>{
                    fail('Erro ao tentar obter historico de conta');
                })
                

        });

        it('Deve ocorrer erro ao tentar transferir uma quantia maior que o saldo do remetente', function(){

                movimentacao.valor_movimentacao = 6000.00;
                movimentacaoController.transferir(movimentacao).then(resp=>{
                    fail('não deve conseguir realizar a transferência ' + resp);
                }).catch(error =>{
                    expect(error).toBeDefined();
                    expect(error).toEqual('Saldo insuficiente');
                })

        });

        it('Deve retornar movimento por id', function(){

            const id = '5a1411ea790c53357c152347';
            movimentacaoController.obterMovimentoPor(id).then(resp=>{
                expect(resp).toBeDefined();
                expect(resp.tipo_movimentacao).toEqual('ADD');
                expect(resp.valor_movimentacao).toEqual(200);
                expect(resp.agencia_destinatario).toEqual('1803');
                expect(resp.agencia_remetente).toEqual('1803');                
                expect(resp.numero_conta_destinatario).toEqual(123456);
                expect(resp.numero_conta_remetente).toEqual(123480);
            }).catch(error=>{
                fail(`nao conseguiu encontrar movimento. ${error}`);
            })
        });
        it('Deve retornar erro quando movimento não for encontrado', function(){
                        const id = 123;
                        movimentacaoController.obterMovimentoPor(id).then(resp=>{
                            fail(`nao deven encontrar movimento. ${resp}`);
                        }).catch(error=>{
                            expect(error).toBeDefined();
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
        movimentacao.valor_movimentacao = valorTransferencia;
        movimentacao.numero_conta_remetente = contaRemetente.numero;
        movimentacao.agencia_remetente = contaRemetente.agencia;
        movimentacao.agencia_destinatario = contaDestinatario.agencia;
        movimentacao.numero_conta_destinatario = contaDestinatario.numero;
        movimentacao.tipo_movimentacao = 'ADD';
        
        return movimentacao;
    }

    function criarDeposito(conta, valor){
        
        movimentacao = new Movimentacao();
        movimentacao.valor_movimentacao = valor;
        movimentacao.numero_conta_remetente = conta.numero;
        movimentacao.agencia_remetente = conta.agencia;
        movimentacao.agencia_destinatario = conta.agencia;
        movimentacao.numero_conta_destinatario = conta.numero;
        movimentacao.tipo_movimentacao = 'DEP';
        
        return movimentacao;
    }


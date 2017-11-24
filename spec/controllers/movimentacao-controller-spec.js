var request = require('request');
var movementController = require('../../app/controllers/movement-controller.js');
var account = require('../../app/models/account.js');
var movement = require('../../app/models/movement.js');

describe('Teste de movement Controller', function(){
  
    var account1;
    var account2;
    var movement;
    

        beforeEach(function(){

            account1 = createAccount();
            account2 = createAccount();
            account2.number = 123456;
            account2.agency = '1803';
            account2.nome = 'account Teste 2';
            account2.opening_balance = 100.00;
            account2.creation_date = new Date();

            movement = createTransfer(account1, account2, 100.00);

        });

      
        it('Deve transferir 100 para entre contas existentes', function(){

            movementController.transfer(movement).then(resp=>{
                
                movement.amount = 100.00;
                    expect(resp).toBeDefined();
                    expect(resp.sender_account_number) .toEqual( movement.sender_account_number);
                    expect(resp.sender_agency) .toEqual(movement.sender_agency);
                    // expect(account1.saldo -  movement.amount) .toEqual(account1.saldo - 100.00);
                    expect(resp.recipient_account_number) .toEqual( movement.recipient_account_number);
                    expect(resp.recipient_agency) .toEqual(movement.recipient_agency);
                    // expect(account2.saldo +  movement.amount).toEqual(account2.saldo + 100.00);
                    expect(resp.type_account_movement).toEqual('TRA');

            }).catch(error=>{
                    fail('Erro ao transferir 100 entre contas existentes '+error);
            });
            
        });

        it('Deve depositar 90 para conta existente', function(){
                        movement.type_account_movement = 'DEP';
                        const amount = 90.00;
                        account1.number = 123456;
                        account1.agency = '1803';
                        movementController.deposit(account1, amount).then( (resp)=>{
                            expect(resp).toBeDefined();
                            expect(resp.sender_account_number) .toEqual( movement.sender_account_number);
                            expect(resp.sender_agency) .toEqual(movement.sender_agency);
                            expect(resp.type_account_movement).toEqual('DEP');
                    }).catch(error=>{
                        fail('Erro em deve depositar 90 para conta existente ' + error);
                    });
                        
        });

        it('Deve retornar historico de transfers para numero e agencia', function(){
                account2.number = 24565;
                account2.agency = '1200';
                account2.opening_balance = 500.00;


                let transfer1 = createTransfer(account1, account2, 30.00);
                let transfer2 = createTransfer(account2, account1, 100.00);
                let transfer3 = createDepositMovement(account2, 200.00);

                movementController.transfer(transfer1).then(resp=>{
                    expect(resp).toBeDefined();
                }).catch(error=>{
                    fail('Erro ao realizar transferencia ' + error);
                });
                movementController.getAccountHistory(account1.number, account1.agency).then(resp=>{
                    expect(resp).toBeDefined();
                }).catch(error=>{
                    fail('Erro ao tentar obter historico de conta');
                })
                

        });

        it('Deve ocorrer erro ao tentar transfer uma quantia maior que o saldo do remetente', function(){

                movement.amount = 6000.00;
                movementController.transfer(movement).then(resp=>{
                    fail('não deve conseguir realizar a transferência ' + resp);
                }).catch(error =>{
                    expect(error).toBeDefined();
                    expect(error).toEqual('Saldo insuficiente');
                })

        });

        it('Deve retornar movimento por id', function(){

            const id = '5a1580ea4c676419dcb94b18';
            movementController.getMovementBy(id).then(resp=>{
                expect(resp).toBeDefined();
                expect(resp.type_account_movement).toEqual('TRA');
                expect(resp.amount).toEqual(40);
                expect(resp.recipient_agency).toEqual('1200');
                expect(resp.sender_agency).toEqual('1803');                
                expect(resp.recipient_account_number).toEqual(24565);
                expect(resp.sender_account_number).toEqual(123456);
            }).catch(error=>{
                fail(`nao conseguiu encontrar movimento. ${error}`);
            })
        });
        
        it('Deve retornar erro quando movimento não for encontrado', function(){
                        const id = 123;
                        movementController.getMovementBy(id).then(resp=>{
                            fail(`nao deven encontrar movimento. ${resp}`);
                        }).catch(error=>{
                            expect(error).toBeDefined();
                        })
        });

        it('Deve retornar saldo da account através dos movimentos', function (){
            
            movementController.getCurrentAccountBalance(123456,'1803').then(resp=>{
                expect(resp).toBeDefined();
            });
        });

    });

    function createAccount() {
        account = new account();
        account.number = 123456;
        account.agency = '1803';
        account.nome = 'account Teste 1';
        account.opening_balance = 300.00;
        account.creation_date = new Date();
        return account;
    }

    function createTransfer(accountSender, accountRecipient, amount){
        
        movement = new movement();
        movement.amount = amount;
        movement.sender_account_number = accountSender.number;
        movement.sender_agency = accountSender.agency;
        movement.recipient_agency = accountRecipient.agency;
        movement.recipient_account_number = accountRecipient.number;
        movement.type_account_movement = 'TRA';
        
        return movement;
    }

    function createDepositMovement(account, valor){
        
        movement = new movement();
        movement.amount = valor;
        movement.sender_account_number = account.number;
        movement.sender_agency = account.agency;
        movement.recipient_agency = account.agency;
        movement.recipient_account_number = account.number;
        movement.type_account_movement = 'DEP';
        
        return movement;
    }


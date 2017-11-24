var app = require('./app/app_config.js');

var validator = require('validator');

var accountController = require('./app/controllers/account-controller.js');

var movementController = require('./app/controllers/movement-controller.js');

var Account = require('./app/models/account.js');
var Movement = require('./app/models/movement.js');

app.get('/', function(req, res){
    console.log('rodando');
});

app.get('/api/v1/account', function(req, res){

    accountController.list(()=>{
        
    }).then(resp=>{
        res.status(200).json(resp);
    }).catch(error=>{
        res.status(500).json(error);
    });
}); 

app.get('/api/v1/account/:account/agency/:agency', function(req, res){
    
        var account = parseInt(req.params.account);
        var agency = req.params.agency;
        accountController.searchByAccountNumberAndAgency(account, agency).then(resp=>{
            movementController.getCurrentAccountBalance(account, agency).then(amount =>{
                console.log(amount);
               resp.opening_balance = amount;
               res.status(200).json(resp);
            });
        }).catch(error=>{
            res.status(500).json(error);
        });
    }); 

    

app.post('/api/v1/account',(req, res) =>{
    accountController.save(req.body).then(accountReturned => {
        movementController.deposit(accountReturned, req.body.opening_balance).catch(error=>{
            res.status(500).json(error);
        });
        res.status(201).json(accountReturned);
    }).catch(error =>{
        res.status(500).json(error);
    })
});

app.post('/api/v1/login',(req, res) =>{
    console.log(req.body);
    var account = parseInt(req.body.account);
    var agency = req.body.agency;
    accountController.searchByAccountNumberAndAgency(account, agency).then(accountReturned => {
        res.status(200).json(accountReturned);
    }).catch(error =>{
        res.status(500).json(error);
    })
});



app.get('/api/v1/account/:number/agency/:agency/historic', (req, res)=>{

    var number = validator.trim(validator.escape(req.params.number));
    var agency = validator.trim(validator.escape(req.params.agency));
    movementController.getAccountHistory(number, agency).then(movements =>{
        res.status(200).json(movements);
    }).catch(error=>{
        res.status(500).json(error);
    })
});
app.get('/api/v1/history', (req, res)=>{

    movementController.getHistoryAllAccounts().then(movements =>{
        res.status(200).json(movements);
    }).catch(error=>{
        res.status(500).json(error);
    })
});

app.get('/api/v1/account/:number/agency/:agency/amount', (req, res)=>{
    
        var number = validator.trim(validator.escape(req.params.number));
        var agency = validator.trim(validator.escape(req.params.agency));
        movementController.getCurrentAccountBalance(number, agency).then(amount =>{
            res.status(200).json(amount);
        }).catch(error=>{
            res.status(500).json(error);
        })
    });

app.post('/api/v1/account/transfer', (req, res)=>{
    var movement = new Movement();
    movement.sender_account_number = req.body.sender_account_number;
    movement.sender_agency = req.body.sender_agency;
    movement.recipient_account_number = req.body.recipient_account_number;
    movement.recipient_agency = req.body.recipient_agency;
    movement.amount = req.body.amount;
    movement.email = req.body.email;
    movementController.transfer(movement).then(result=>{
        return res.status(201).json(result);
    }).catch(error=>{
        return res.status(500).json(error.message);
    })
    
});

app.get('/api/v1/account/transfer/:id', (req, res)=>{
    const idMovement = req.params.id;

    
    movementController.getMovementBy(idMovement).then(result=>{
        return res.status(200).json(result);
    }).catch(error=>{
        return res.status(500).json(error.message);
    })
    
});
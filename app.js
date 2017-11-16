var app = require('./app/app_config.js');

var validator = require('validator');

var contaController = require('./app/controllers/conta-controller.js');

app.get('/', function(req, res){
    console.log('rodando');
});

app.get('/conta/', function(req, res){

    contaController.listar(function(resp){
        res.json(resp);
    });
});    

// login na conta
app.post('/conta/',(req, res) =>{

    contaController.salvar(req.body).then(contaRetornada => {
        res.status(201).json(contaRetornada);
    }).catch(error =>{
        res.status(500).json(error);
    })
});

app.get('/conta/:numero/agencia/:agencia', (req, res) =>{

    var numeroConta = validator.trim(validator.escape(req.params.numero));
    var agenciaConta = validator.trim(validator.escape(req.params.agencia));
    
    contaController.buscarPorNumeroContaEAgencia((numeroConta, agenciaConta), (conta)=>{
        res.json(conta);
    });
});

app.get('/conta/historico/:numero', (req, res)=>{

    var numero = validator.trim(validator.escape(req.params.numero));
    contaController.buscarPorNumeroConta(numero, function(resp){
        res.json(resp);
    });
});







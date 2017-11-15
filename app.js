var app = require('./app/app_config.js');

var validator = require('validator');

var contaController = require('./app/controllers/conta-controller.js');

app.get('/', function(req, res){
    console.log('rodando');
});

app.get('/conta', function(req, res){

    contaController.listar(function(resp){
        res.json(resp);
    });
});    

// login na conta
app.post('/conta/new', function(req, res){

    contaController.salvar(req.body, function(resp){
        res.json(resp);
    });
});

app.get('/conta/historico/:numero', function(req, res){

    var numero = validator.trim(validator.escape(req.params.numero));
    contaController.buscarPorNumeroConta(numero, function(resp){
        res.json(resp);
    });
});







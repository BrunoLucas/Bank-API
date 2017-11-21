var app = require('./app/app_config.js');

var validator = require('validator');

var contaController = require('./app/controllers/conta-controller.js');

var movimentoController = require('./app/controllers/movimentacao-controller.js');

var Conta = require('./app/models/conta.js');
var Movimentacao = require('./app/models/movimentacao.js');

app.get('/', function(req, res){
    console.log('rodando');
});

app.get('/conta', function(req, res){

    contaController.listar(()=>{
        
    }).then(resp=>{
        res.status(200).json(resp);
    }).catch(error=>{
        res.status(500).json(error);
    });
}); 

app.get('/conta/:conta/agencia/:agencia', function(req, res){
    
        var conta = parseInt(req.params.conta);
        var agencia = req.params.agencia;
        contaController.buscarPorNumeroContaEAgencia(conta, agencia).then(resp=>{
            res.status(200).json(resp);
        }).catch(error=>{
            res.status(500).json(error);
        });
    }); 

    

app.post('/conta',(req, res) =>{
    contaController.salvar(req.body).then(contaRetornada => {
        res.status(201).json(contaRetornada);
    }).catch(error =>{
        res.status(500).json(error);
    })
});

app.post('/conta/login',(req, res) =>{
    var conta = parseInt(req.params.conta);
    var agencia = req.params.agencia;
    contaController.buscarPorNumeroContaEAgencia(conta, agencia).then(contaRetornada => {
        res.status(200).json(contaRetornada);
    }).catch(error =>{
        res.status(500).json(error);
    })
});


app.get('/conta/historico/:numero', (req, res)=>{

    var numero = validator.trim(validator.escape(req.params.numero));
    contaController.buscarPorNumeroConta(numero, function(resp){
        res.json(resp);
    });
});

app.get('/conta/:numero/agencia/:agencia/historico', (req, res)=>{

    var numero = validator.trim(validator.escape(req.params.numero));
    var agencia = validator.trim(validator.escape(req.params.agencia));
    movimentoController.obterHistoricoDeConta(numero, agencia).then(movimentos =>{
        res.status(200).json(movimentos);
    }).catch(error=>{
        res.status(500).json(error);
    })
});

app.post('/conta/transfer', (req, res)=>{
    var movimentacao = new Movimentacao();
    movimentacao.numero_conta_remetente = validator.trim(validator.escape(req.body.numero_remetente));
    movimentacao.agencia_remetente = validator.trim(validator.escape(req.body.agencia_remetente));
    movimentacao.numero_conta_destinatario = validator.trim(validator.escape(req.body.numero_destinatario));
    movimentacao.agencia_destinatario = validator.trim(validator.escape(req.body.agencia_destinatario));
    movimentacao.valor_movimentacao = validator.trim(validator.escape(req.body.valor_transferencia));

    movimentoController.transferir(movimentacao).then(result=>{
        return res.status(201).json(result);
    }).catch(error=>{
        return res.status(500).json(error.message);
    })
    
});







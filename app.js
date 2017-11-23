var app = require('./app/app_config.js');

var validator = require('validator');

var contaController = require('./app/controllers/conta-controller.js');

var movimentoController = require('./app/controllers/movimentacao-controller.js');

var Conta = require('./app/models/conta.js');
var Movimentacao = require('./app/models/movimentacao.js');

app.get('/', function(req, res){
    console.log('rodando');
});

app.get('/api/v1/conta', function(req, res){

    contaController.listar(()=>{
        
    }).then(resp=>{
        res.status(200).json(resp);
    }).catch(error=>{
        res.status(500).json(error);
    });
}); 

app.get('/api/v1/conta/:conta/agencia/:agencia', function(req, res){
    
        var conta = parseInt(req.params.conta);
        var agencia = req.params.agencia;
        contaController.buscarPorNumeroContaEAgencia(conta, agencia).then(resp=>{
            movimentoController.obterSaldoAtualDeConta(conta, agencia).then(saldo =>{
                console.log(saldo);
               resp.saldo = saldo;
               res.status(200).json(resp);
            });
        }).catch(error=>{
            res.status(500).json(error);
        });
    }); 

    

app.post('/api/v1/conta',(req, res) =>{
    contaController.salvar(req.body).then(contaRetornada => {
        movimentoController.depositar(contaRetornada, req.body.valor_deposito_inicial).catch(error=>{
            res.status(500).json(error);
        });
        res.status(201).json(contaRetornada);
    }).catch(error =>{
        res.status(500).json(error);
    })
});

app.post('/api/v1/login',(req, res) =>{
    console.log(req.body);
    var conta = parseInt(req.body.conta);
    var agencia = req.body.agencia;
    contaController.buscarPorNumeroContaEAgencia(conta, agencia).then(contaRetornada => {
        res.status(200).json(contaRetornada);
    }).catch(error =>{
        res.status(500).json(error);
    })
});



app.get('/api/v1/conta/:numero/agencia/:agencia/historico', (req, res)=>{

    var numero = validator.trim(validator.escape(req.params.numero));
    var agencia = validator.trim(validator.escape(req.params.agencia));
    movimentoController.obterHistoricoDeConta(numero, agencia).then(movimentos =>{
        res.status(200).json(movimentos);
    }).catch(error=>{
        res.status(500).json(error);
    })
});
app.get('/api/v1/historico', (req, res)=>{

    movimentoController.obterHistoricoDeTodasAsContas().then(movimentos =>{
        res.status(200).json(movimentos);
    }).catch(error=>{
        res.status(500).json(error);
    })
});

app.get('/api/v1/conta/:numero/agencia/:agencia/saldo', (req, res)=>{
    
        var numero = validator.trim(validator.escape(req.params.numero));
        var agencia = validator.trim(validator.escape(req.params.agencia));
        movimentoController.obterSaldoAtualDeConta(numero, agencia).then(saldo =>{
            res.status(200).json(saldo);
        }).catch(error=>{
            res.status(500).json(error);
        })
    });

app.post('/api/v1/conta/transfer', (req, res)=>{
    var movimentacao = new Movimentacao();
    movimentacao.numero_conta_remetente = req.body.numero_conta_remetente;
    movimentacao.agencia_remetente = req.body.agencia_remetente;
    movimentacao.numero_conta_destinatario = req.body.numero_conta_destinatario;
    movimentacao.agencia_destinatario = req.body.agencia_destinatario;
    movimentacao.valor_movimentacao = req.body.valor_movimentacao;
    movimentacao.email_comprovante = req.body.email_comprovante;
    movimentoController.transferir(movimentacao).then(result=>{
        return res.status(201).json(result);
    }).catch(error=>{
        return res.status(500).json(error.message);
    })
    
});

app.get('/api/v1/conta/transfer/:id', (req, res)=>{
    const idMovimento = req.params.id;

    
    movimentoController.obterMovimentoPor(idMovimento).then(result=>{
        return res.status(200).json(result);
    }).catch(error=>{
        return res.status(500).json(error.message);
    })
    
});
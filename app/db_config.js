var db_string = 'mongodb://127.0.0.1/bank2';
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect(db_string,  { useMongoClient: true });

var db = mongoose.connection;

var Conta = require('./models/conta');

var Movimentacao = require('./models/movimentacao');

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));

exports.Conta = Conta;

exports.Movimentacao = Movimentacao;

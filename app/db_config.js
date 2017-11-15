var db_string = 'mongodb://127.0.0.1/bank';
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect(db_string,  { useMongoClient: true });

var db = mongoose.connection;

var User = require('./models/usuario');

var Conta = require('./models/conta');

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));

exports.Conta = Conta;

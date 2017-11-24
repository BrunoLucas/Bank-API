var db_string = 'mongodb://127.0.0.1/bank7';
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect(db_string,  { useMongoClient: true });

var db = mongoose.connection;

var Account = require('./models/account');

var Movement = require('./models/movement');

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));

exports.Account = Account;

exports.Movement = Movement;

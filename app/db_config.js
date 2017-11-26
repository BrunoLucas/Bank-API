var db_string = 'mongodb://localhost/bank10';
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect(db_string,  { useMongoClient: true });

var db = mongoose.connection;

var Account = require('./models/account');

var Movement = require('./models/movement');


db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));

exports.Account = Account;

exports.Movement = Movement;

var loki = require('lokijs');
var dbLoki = new loki('loki.json');
var accountMemoryDB = dbLoki.addCollection('account');
var movementMemoryDB = dbLoki.addCollection('movement');

exports.accountMemoryDB = accountMemoryDB;
exports.movementMemoryDB = movementMemoryDB;


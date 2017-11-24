var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var AccountSchema = new Schema({
    id: Number,
    number: Number,
    agency: String,
    name: String,
    creation_date: Date,
    opening_balance: Number
});
 
module.exports = mongoose.model('Account', AccountSchema);
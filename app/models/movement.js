var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var MovementSchema = new Schema({
    id: Number,
    sender_account_number: Number,
    sender_agency: String,
    type_account_movement: String,
    recipient_account_number: Number,
    recipient_agency: String, 
    date_movement: Date,
    amount: Number,
    email: String    
});
 
module.exports = mongoose.model('Movement', MovementSchema);
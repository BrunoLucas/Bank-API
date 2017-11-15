var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var UserSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    created_at: Date
});
 
module.exports = mongoose.model('User', UserSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    username: {type: String, lowercase: true, required: false, unique: true},
    password: {type: String, required: false},
    email: {type: String, lowercase: true, required: false, unique: true}
});

userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    })
})

module.exports = mongoose.model('User', userSchema);
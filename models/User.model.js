const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

//Hide the password to final user
userSchema.methods.toJSON = function() {
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;
    return userObjet;
}

module.exports = model('User', userSchema);
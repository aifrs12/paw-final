const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});


userchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userchema);

const mongoose= require('mongoose');

const itemSchema = mongoose.Shema({
  title: {String, required: true},
  content: {String, required: true},
});


module.exports = mongoose.model('Item',itemSchema);

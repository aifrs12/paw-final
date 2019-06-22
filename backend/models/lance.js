const mongoose = require('mongoose');

const lanceSchema = mongoose.Schema({
    user: { type: String, required: true },
    valor: { type: Number, required: true },
    estado: { type: ['processado', 'cancelado'], default: 'em processamento' },
});

module.exports = mongoose.model('Lance', lanceSchema);

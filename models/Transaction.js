const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Debes ingresar un nombre']
    },
    amount: {
        type: Number,
        required: [true, 'Debes ingresar un monto']
    },
    type: {
        type: String,
        trim: true,
        required: [true, 'Debes ingresar un tipo de transaccion']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('transaction', TransactionSchema);
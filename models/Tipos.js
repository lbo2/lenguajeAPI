const mongoose = require('mongoose');

const TiposSchema = new mongoose.Schema({
    idTipo: {
        type: Number,
        required: [true, 'Debes ingresar id de tipo']
    },
    tipoNombre: {
        type: String,
        trim: true,
        required: [true, 'Debes ingresar un nombre']
    }
},
{
  collection: 'tipos',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

module.exports = mongoose.model('tipos', TiposSchema);
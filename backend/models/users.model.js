const mongoose = require('mongoose');

// Definición del esquema del usuario
const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: false,
    },
    tipo_de_documento: {
        type: String,
        required: false,
    },
    documento: {
        type: String,
        required: false,
    },
    eps: {
        type: String,
        required: false,
    },
}, {
    timestamps: true, // Agrega campos de creación y actualización automáticamente
});

// Exporta el modelo
module.exports = mongoose.model('Users', userSchema);
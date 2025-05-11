const mongoose = require('mongoose');

// Definición del esquema del usuario
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    tipo_de_documento: { type: String, required: true },
    documento: { type: String, required: true },
    eps: { type: String, required: true },
    password: { type: String, required: true },
    telefono: { type: String, required: true },
}, {
    timestamps: true, // Agrega campos de creación y actualización automáticamente
});

// Exporta el modelo
module.exports = mongoose.model('Users', userSchema);
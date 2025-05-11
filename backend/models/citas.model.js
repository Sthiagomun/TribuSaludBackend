const mongoose = require('mongoose');

const citasSchema = new mongoose.Schema({
    paciente: { type: String, required: true },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    doctor: { type: String, required: true },
    especialidad: { type: String, required: true },
}, {
    timestamps: true, // Agrega campos de creación y actualización automáticamente
});

module.exports = mongoose.model('Citas', citasSchema);
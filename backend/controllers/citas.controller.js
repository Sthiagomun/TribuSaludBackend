const Citas = require('../models/citas.model');

const citasCtrl = {};

// Obtener todas las citas
citasCtrl.getCitas = async (req, res) => {
    try {
        const citas = await Citas.find(); // Obtiene todas las citas
        res.json(citas);
    } catch (error) {
        console.error('Error al obtener citas:', error);
        res.status(500).json({ message: 'Error al obtener citas' });
    }
};

// Crear una nueva cita
citasCtrl.createCita = async (req, res) => {
    try {
        const nuevaCita = new Citas(req.body); // Crea una nueva cita con los datos enviados
        await nuevaCita.save();
        res.status(201).json({ message: 'Cita creada exitosamente' });
    } catch (error) {
        console.error('Error al crear cita:', error);
        res.status(500).json({ message: 'Error al crear cita' });
    }
};

module.exports = citasCtrl;
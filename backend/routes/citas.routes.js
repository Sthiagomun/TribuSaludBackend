const express = require('express');
const router = express.Router();
const citasCtrl = require('../controllers/citas.controller');

// Ruta para obtener citas
router.get('/citas', citasCtrl.getCitas);

// Ruta para crear una nueva cita
router.post('/citas', citasCtrl.createCita);

module.exports = router;
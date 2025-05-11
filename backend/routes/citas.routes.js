const express = require('express');
const router = express.Router();
const citasCtrl = require('../controllers/citas.controller');

// Ruta para obtener todas las citas
router.get('/', citasCtrl.getCitas);
// Ruta para crear una nueva cita
router.post('/', citasCtrl.createCita);

module.exports = router;
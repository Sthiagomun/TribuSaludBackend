//Creacion de modulos
const express = require('express');
const router = express.Router();
const userCtlr = require('../controllers/users.controller');

// Define las rutas
router.get('/', userCtlr.getUsers); // Obtener todos los usuarios
router.post('/', userCtlr.createUsers); // Crear un nuevo usuario
router.get('/:id', userCtlr.getUnicoUsuario); // Obtener un usuario por ID
router.put('/:id', userCtlr.updateUser); // Actualizar un usuario
router.delete('/:id', userCtlr.deleteUser); // Eliminar un usuario

// Exporta el router
module.exports = router;
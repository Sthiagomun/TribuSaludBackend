const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db'); // Archivo que conecta a MongoDB
const User = require('./models/User'); // Modelo de usuario

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Para procesar JSON en las solicitudes

// Conexión a la base de datos
connectDB();

// Ruta para el login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca al usuario por correo electrónico
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verifica la contraseña (sin encriptación)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Responde con éxito
        res.status(200).json({ message: 'Login exitoso' });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
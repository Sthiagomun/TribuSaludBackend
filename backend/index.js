//Requerimientos de librerias
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

// Configuración del servidor
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Rutas
app.use('/api/users', require('./routes/users.routes'));

// Conexión a MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/users'; // Cambia esto según tu configuración
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor activo en el puerto: ${app.get('port')}`);
});
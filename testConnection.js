const connectDB = require('./db');

(async () => {
  await connectDB();
  console.log('Prueba de conexión completada');
})();
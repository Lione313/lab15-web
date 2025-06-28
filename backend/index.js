const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/producto.routes');
const sequelize = require('./db');

const app = express();

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://lab15-web-coral.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());

// Ruta de prueba para verificar si el backend está vivo
app.get('/', (req, res) => {
  res.send('✅ Backend API en funcionamiento');
});

// Rutas de productos
app.use('/api/productos', productosRoutes);

// Usa el puerto de entorno o 3001 por defecto
const PORT = process.env.PORT || 3001;

sequelize.sync()
  .then(() => {
    console.log('✅ Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al sincronizar base de datos:', err);
  });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Middleware para configurar los encabezados CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Rutas API
app.use('/api', routes);

// Puerto en el que el servidor escuchará las solicitudes
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor API a la espera de consultas en el puerto ${PORT}`);
});

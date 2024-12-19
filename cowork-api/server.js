const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const cors = require("cors");
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Cors
app.use(cors());

// Body parser
app.use(bodyParser.json());

//Routes
app.use('/', apiRoutes);


// Conectar a la base de datos y sincronizar modelos
const startServer = async () => {
    try {

        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        await sequelize.sync({force: true}); 
        console.log('Modelos sincronizados exitosamente.');

        // Iniciar el servidor
        app.listen(5000, () => {
            console.log('Servidor corriendo en http://localhost:5000');
        });
    } catch (error) {
        console.error('Error al conectarse a la base de datos:', error);
    }
};

startServer();
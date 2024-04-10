const mysql = require('mysql');
 
const connection = mysql.createConnection({
    host: 'srv1267.hstgr.io',
    user: 'u875834720_proyecto', // Corregido: Eliminado el espacio antes de 'root'
    password: 'Milaneso19', // Deja la contraseña vacía si no tienes una configurada
    database: 'u875834720_dietadvisordb'
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.error('Conexión a la base de datos exitosa');
});

module.exports = connection;

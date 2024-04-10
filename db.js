const mysql = require('mysql');
 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Corregido: Eliminado el espacio antes de 'root'
    password: '', // Deja la contraseña vacía si no tienes una configurada
    database: 'dietadvisordb'
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.error('Conexión a la base de datos exitosa');
});

module.exports = connection;

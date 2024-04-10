const express = require('express');
const router = express.Router();
const connection = require('./db');

// Obtener todos los usuarios
router.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ error: 'Error al obtener usuarios' });
            return;
        }
        res.json(results);
    });
});

// Obtener un usuario por su ID
router.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM usuarios WHERE id = ?', id, (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario', err);
            res.status(500).json({ error: 'Error al obtener el usuario' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Crear un nuevo usuario
router.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    connection.query('INSERT INTO usuarios SET ?', nuevoUsuario, (err, results) => {
        if (err) {
            console.error('Error al crear un nuevo usuario:', err);
            res.status(500).json({ error: 'Error al crear un nuevo usuario' });
            return;
        }
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    });
});

// Actualizar un usuario por su ID
router.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    connection.query('UPDATE usuarios SET ? WHERE id = ?', [datosActualizados, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            res.status(500).json({ error: 'Error al actualizar el usuario' });
            return;
        }
        res.json({ message: 'Usuario actualizado exitosamente' });
    });
});

// Eliminar un usuario por su ID
router.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM usuarios WHERE id = ?', id, (err, results) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            res.status(500).json({ error: 'Error al eliminar el usuario' });
            return;
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    });
});

module.exports = router;

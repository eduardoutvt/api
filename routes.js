const express = require('express');
const router = express.Router();
const connection = require('./db');

// Obtener todas las mediciones
router.get('/mediciones', (req, res) => {
    connection.query('SELECT * FROM mediciones', (err, results) => {
        if (err) {
            console.error('Error al obtener las mediciones:', err);
            res.status(500).json({ error: 'Error al obtener mediciones' });
            return;
        }
        res.json(results);
    });
});

// Obtener una medición por su ID
router.get('/mediciones/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM mediciones WHERE id = ?', id, (err, results) => {
        if (err) {
            console.error('Error al obtener la medición', err);
            res.status(500).json({ error: 'Error al obtener la medición' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Medición no encontrada' });
            return;
        }
        res.json(results[0]);
    });
});

// Crear una nueva medición
router.post('/mediciones', (req, res) => {
    const nuevaMedicion = req.body;
    connection.query('INSERT INTO mediciones SET ?', nuevaMedicion, (err, results) => {
        if (err) {
            console.error('Error al crear una nueva medición:', err);
            res.status(500).json({ error: 'Error al crear una nueva medición' });
            return;
        }
        res.status(201).json({ message: 'Medición creada exitosamente' });
    });
});

// Actualizar una medición por su ID
router.put('/mediciones/:id', (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    connection.query('UPDATE mediciones SET ? WHERE id = ?', [datosActualizados, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar la medición:', err);
            res.status(500).json({ error: 'Error al actualizar la medición' });
            return;
        }
        res.json({ message: 'Medición actualizada exitosamente' });
    });
});

// Eliminar una medición por su ID
router.delete('/mediciones/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM mediciones WHERE id = ?', id, (err, results) => {
        if (err) {
            console.error('Error al eliminar la medición:', err);
            res.status(500).json({ error: 'Error al eliminar la medición' });
            return;
        }
        res.json({ message: 'Medición eliminada exitosamente' });
    });
});

module.exports = router;

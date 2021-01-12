const express = require('express');
const app = express();

//!Importamos el usuario Schema
const Usuario = require('../models/usuario');







//? PETICIONES HTTP
app.get('/usuario', function(req, res) {
    res.json('Get usuario');
});






app.post('/usuario', function(req, res) {
    let body = req.body;


    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});






//* Se debe especificar el path con el /:id
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
});






app.delete('/usuario', function(req, res) {
    res.json('Delete usuario');
});


module.exports = app;
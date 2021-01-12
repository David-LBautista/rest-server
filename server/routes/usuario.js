const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

//!Importamos el usuario Schema
const Usuario = require('../models/usuario');







//? PETICIONES HTTP
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    //*===================================
    //* En los corchetes se indica mediante que filtro buscar ej: { google: true } 
    //* y despues de los corchetes entre '' se indica que campos mostrar ej: {google: true},'nombre email role estado'
    //*===================================

    Usuario.find({})
        .skip(desde)
        .limit(10)
        .exec((err, arregloUsuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //? Indica cuantos elementos hay en total
            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios: arregloUsuarios,
                    conteo
                });
            });
        });
});

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//* Se debe especificar el path con el /:id
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        delete body.password;
        delete body.google;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});






app.delete('/usuario', function(req, res) {
    res.json('Delete usuario');
});


module.exports = app;
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');


const Usuario = require('../models/usuario');




app.post('/login', (req, res) => {

    let body = req.body; //*Obtenemos el correo y password

    //*verificamos si el correo es valido
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        //* vERIFICAMOS que los correos sean iguales
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(Usuario) o contraseña incorrectos"
                }
            });
        }
        //* Verificamos que la contraseña introducida sea igual a la de la base de datos
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o (contraseña) incorrectos"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: '123abc'
        });
    });

});




module.exports = app;
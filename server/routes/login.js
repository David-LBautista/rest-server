const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

        //* Creamos el token con jwt
        let token = jwt.sign({
                //payload
                usuario: usuarioDB,
            },
            //secret
            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });


        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        });
    });

});




module.exports = app;
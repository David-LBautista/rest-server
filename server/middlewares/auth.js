const jwt = require('jsonwebtoken');

//* Verificacion del token
let verificaToken = (req, res, next) => {

    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};


//* Verifica ADMIN_ROLE
let verificaAdminRole = (req, res, next) => {

    if (req.usuario.role === 'ADMIN_ROLE') {

        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                err: 'El usuario no es Administrador'
            }
        });
    }



};


module.exports = {
    verificaToken,
    verificaAdminRole
};
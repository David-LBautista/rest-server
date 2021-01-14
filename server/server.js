require('./config/config');


const colors = require('colors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const express = require('express');
const app = express();

//! Body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));





//*Conexion a mONGOdb
mongoose.connect(process.env.urlDB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, res) => {

    if (err) throw err;
    console.log(`Database status:` + ' ONLINE'.green);

});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto:`, process.env.PORT.green);
});
//! Variables y constantes globales

//* ===========
//*   PUERTO
//* ===========
process.env.PORT = process.env.PORT || 3000;


//* ===========
//*   Entorno Produccion o desarrollo
//* ===========
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//* ===========
//*   Database
//* ===========
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}


process.env.urlDB = urlDB;
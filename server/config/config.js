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
    urlDB = 'mongodb+srv://regina:DZM2xyzs7Zh4bmSC@cluster0.ria0k.mongodb.net/<dbname>?retryWrites=true&w=majority';
}


process.env.urlDB = urlDB;
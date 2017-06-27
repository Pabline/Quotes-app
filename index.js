'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

//mongodb://localhost:27017/quotesDB
mongoose.connect(config.db, (err, res) => {
  if(err) {
    return console.log(`Error to connect to bbdd: ${err}`);
  };
  console.log('Conexion a la bbdd establecida');

  app.listen(config.port, () =>{
    console.log(`API REST running on http://localhost:${config.port}`);
  })
})

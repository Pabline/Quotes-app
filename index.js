'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/quotesDB', (err, res) => {
  if(err) {
    return console.log(`Error to connect to bbdd: ${err}`);
  };
  console.log('Conexion a la bbdd establecida');

  app.listen(port, () =>{
    console.log(`API REST running on http://localhost:${port}`);
  })
})

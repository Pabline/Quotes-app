'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Quote = require('./models/quote')

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/api/quote',(req, res)=> {

  Quote.find({}, (err, quotes) => {
    if(err) return res.status(500).send({message : `Error al realizar la peticion: ${err}`})
    if(!quotes) return res.status(404).send({message : `No existen productos`})

    res.send(200, { quotes })
  })
})

app.get('/api/quote/:quoteId', (req, res) => {
  let quoteId = req.params.quoteId

  Quote.findById(quoteId, (err, quote) => {
    if(err) return res.status(500).send({message : `Error al realizar la peticion: ${err}`})
    if(!quote) return res.status(404).send({message : `La frase no existe.`})

    res.status(200).send({ quote })
  })
})

app.post('/api/quote', (req, res) => {
  console.log('POST /api/quote');
  console.log(req.body);

  let quote = new Quote()

  quote.author = req.body.author
  quote.description = req.body.description

  req.body.tags = req.body.tags.replace(/\s/g, '').split(",").map(function(tag) {
    return { "name": tag };
  });
  console.log(req.body.tags);
  quote.tags = req.body.tags

  console.log("tags: "+quote.tags);

  quote.save((err, quoteStored) => {
    if(err) res.status(500).send({message : `Error al guardar en bbddd: ${err}`})

    res.status(200).send({quote : quoteStored})

  })
})

app.put('/api/quote/:quoteId', (req, res) => {

})

app.delete('/api/quote/:quoteId', (req, res) => {

})

app.get('/hola/:name', (req, res)=> {
  res.status(200).send({message: `Hello ${req.params.name}!`})
});

mongoose.connect('mongodb://localhost:27017/quotesDB', (err, res) => {
  if(err) {
    return console.log(`Error to connect to bbdd: ${err}`);
  };
  console.log('Conexion a la bbdd establecida');

  app.listen(port, () =>{
    console.log(`API REST running on http://localhost:${port}`);
  })
})

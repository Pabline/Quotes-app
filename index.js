'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/api/quote',(req, res)=> {
  res.status(200).send({quotes: []})
})

app.get('/api/quote/:quoteId', (req, res) => {

})

app.post('/api/quote', (req, res) => {
  console.log(req.body);
  res.status(200).send({message: 'Quote received'})
})

app.put('/api/quote/:quoteId', (req, res) => {

})

app.delete('/api/quote/:quoteId', (req, res) => {

})

app.get('/hola/:name', (req, res)=> {
  res.status(200).send({message: `Hello ${req.params.name}!`})
});

app.listen(port, () =>{
  console.log(`API REST running on http://localhost:${port}`);
})

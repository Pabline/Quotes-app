'use strict'

const Quote = require('../models/quote')

function getQuote(req, res){
  let quoteId = req.params.quoteId

  Quote.findById(quoteId, (err, quote) => {
    if(err) return res.status(500).send({message : `Error al realizar la peticion: ${err}`})
    if(!quote) return res.status(404).send({message : `La frase no existe.`})

    res.status(200).send({ quote })
  })
}

function getQuotes(req, res){
  Quote.find({}, (err, quotes) => {
    if(err) return res.status(500).send({message : `Error al realizar la peticion: ${err}`})
    if(!quotes) return res.status(404).send({message : `No existen frases`})

    res.send(200, { quotes })
  })

}

function getQuotesByAuthor(req, res){
  let authorName = req.params.authorName
  console.log("\/"+authorName+"\/");

  Quote.find({author: { $regex: '.*'+authorName+'.*'}}, (err, quotes) => {
    if(err) return res.status(500).send({message : `Error al realizar la peticion: ${err}`})
    if(!quotes) return res.status(404).send({message : `No existen frases`})

    res.send(200, { quotes })
  })

}

function getQuotesByDesc(req, res){
  let description = req.params.description
  console.log("\/"+description+"\/");

  Quote.find({description: { $regex: '.*'+description+'.*'}}, (err, quotes) => {
    if(err) return res.status(500).send({message : `Error al realizar la peticion: ${err}`})
    if(!quotes) return res.status(404).send({message : `No existen frases`})
  
    res.send(200, { quotes })
  })

}

function getQuotesByAll(req, res){
  let text = req.params.text
  console.log("\/"+text+"\/");

  Quote.find( { $or: [ { description: { $regex: '.*'+text+'.*'}},{author: { $regex: '.*'+text+'.*'}} ] }, (err, quotes) => {
    if(err) return res.status(500).send({message : `Error al realizar la peticion: ${err}`})
    if(!quotes) return res.status(404).send({message : `No existen frases`})
    quotes.reverse()
    res.send(200, { quotes })
  })

}

function saveQuote(req, res){
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
    if(err) res.status(500).send({message : `Error al guardar en bbddd: ${err}`, code:500})

    res.status(200).send({quote : quoteStored, code:200});

  })

}

function updateQuote(req, res){

  let quoteId = req.params.quoteId
  let update = req.body

  Quote.findByIdAndUpdate(quoteId, update, (err, quoteUpdated) => {
    if(err) res.status(500).send({message : `Error  al actualizar la frase ${err}`})

    res.status(200).send({quote : quoteUpdated})
  })

}

function deleteQuote(req, res){

  let quoteId = req.params.quoteId
  Quote.findById(quoteId, (err, quote) => {
    if(err) res.status(500).send({message : `Error al buscar la frase ${err}`})

    quote.remove(err => {
      if(err) res.status(500).send({message : `Error al borrar la frase ${err}`})
      res.status(200).send({message : 'La frase ha sido eliminada'})
    })

  })

}

module.exports = {
  getQuote,
  getQuotes,
  getQuotesByDesc,
  getQuotesByAuthor,
  getQuotesByAll,
  saveQuote,
  updateQuote,
  deleteQuote
}

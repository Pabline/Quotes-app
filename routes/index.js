'use strict'

const express = require('express')
const QuoteCtrl = require('../controllers/quote')
const api = express.Router()


api.get('/quote', QuoteCtrl.getQuotes)
api.get('/quote/:quoteId', QuoteCtrl.getQuote)
api.get('/quote/author/:authorName', QuoteCtrl.getQuotesByAuthor)
api.post('/quote', QuoteCtrl.saveQuote)
api.put('/quote/:quoteId', QuoteCtrl.updateQuote)
api.delete('/quote/:quoteId', QuoteCtrl.deleteQuote)

module.exports = api

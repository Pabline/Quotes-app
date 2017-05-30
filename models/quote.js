'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuoteSchema = Schema({
  author: String,
  description: String,
  tags: [
    { name: String }
  ]
})

module.exports = mongoose.model('Quote', QuoteSchema)

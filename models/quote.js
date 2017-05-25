'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuoteSchema = Schema({
  autor: String,
  description: String,
  tags: [
    { tag: String }
  ]
})

const express = require('express')

const checkPrice = require('../controllers/checkPrice')

const router = new express.Router()

router.get('/checkPrice',checkPrice)

module.exports =  router
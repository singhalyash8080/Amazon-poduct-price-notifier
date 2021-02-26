const express = require('express')

const checkPrice = require('../controllers/checkPrice')

const router = new express.Router()

router.post('/checkPrice',checkPrice)

module.exports =  router
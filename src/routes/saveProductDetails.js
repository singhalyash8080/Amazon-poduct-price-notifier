const express = require('express')

const saveProductDetails = require('../controllers/saveProductDetails')

const router = new express.Router()

router.post('/saveProductDetails',saveProductDetails)

module.exports =  router
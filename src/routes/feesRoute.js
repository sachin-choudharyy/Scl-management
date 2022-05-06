const express = require('express')
const Router = express.Router()
const feesctrl = require('../controller/fees')
const authToken = require('../middileware/auth')

Router.post('/createFees',authToken,feesctrl.create)
Router.get('/getdetails',authToken,feesctrl.getStdFees)
Router.get('/getStdById',authToken,feesctrl.getFeesById)
Router.patch('/updateFees',authToken,feesctrl.updateFees)

module.exports = Router;

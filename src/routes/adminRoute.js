

const express = require('express')
const Router = express.Router();
const adminctrl = require('../controller/adminctrl')
const authToken = require('../middileware/auth')

Router.post("/create",adminctrl.Create)
Router.post("/login",adminctrl.Login)

module.exports=Router; 

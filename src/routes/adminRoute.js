

const express = require('express')
const Router = express.Router();
const userctrl = require('../controller/userCtrl')
const authToken = require('../middileware/auth')

Router.post("/create",userctrl.Create)
Router.post("/login",userctrl.Login)

module.exports=Router; 

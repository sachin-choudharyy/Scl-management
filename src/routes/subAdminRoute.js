const express = require('express')
const Router = express.Router()
const subAdminctrl = require('../controller/subAdmin')
const upload = require('../middileware/upload')
const authToken = require('../middileware/auth')

Router.post('/create',authToken,upload.fields([{ name: 'AadharCard', maxCount: 1 },{
name: 'PanCard', maxCount: 1 
}]),subAdminctrl.create)
Router.get('/getSubAdmin',subAdminctrl.getSubAdmin)
Router.patch('/update/:id',subAdminctrl.update)
Router.get('/getstudent/:email',authToken,subAdminctrl.getstudent)
Router.post('/login',subAdminctrl.LoginSubAdmin)

module.exports=Router;
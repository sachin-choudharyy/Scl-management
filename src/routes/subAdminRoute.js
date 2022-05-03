const express = require('express')
const Router = express.Router()
const subAdminctrl = require('../controller/subAdmin')
const upload = require('../middileware/upload')

Router.post('/create',upload.fields([{ name: 'AadharCard', maxCount: 1 },{
    name: 'PanCard', maxCount: 1 
}]),subAdminctrl.create)
Router.get('/getSubAdmin',subAdminctrl.getSubAdmin)
Router.patch('/update/:id',subAdminctrl.update)

module.exports=Router;
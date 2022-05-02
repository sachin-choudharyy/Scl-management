const express = require('express')
const Router = express.Router()
const subAdminctrl = require('../controller/subAdmin')
Router.post('/create',subAdminctrl.create)
Router.get('/getSubAdmin',subAdminctrl.getSubAdmin)
Router.patch('/update/:id',subAdminctrl.update)

module.exports=Router;
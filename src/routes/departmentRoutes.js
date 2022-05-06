const express = require('express')
const Router = express.Router()
const department = require('../controller/department.js');
const auth = require('../middileware/auth.js')
Router.post('/create',auth,department.createDepartment);
Router.get('/getdepartment/:id',auth,department.getdepartment)
Router.get('/countdepartment/:id',auth,department.countDepartment)

module.exports = Router
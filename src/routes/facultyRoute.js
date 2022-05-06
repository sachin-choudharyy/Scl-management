const express = require('express')
const Router = express.Router();
const facultyctrl = require('../controller/faculty')
const authToken = require('../middileware/auth')

Router.post("/create",authToken,facultyctrl.create)
Router.get("/getdata",authToken,facultyctrl.getFaculty)
Router.get("/getdepartment",authToken,facultyctrl.getdepartment)
 
module.exports = Router;
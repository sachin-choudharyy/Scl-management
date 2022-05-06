const express = require('express')
const Router = express.Router();
const facultyctrl = require('../controller/faculty')
const authToken = require('../middileware/auth')

Router.post("/create",authToken,facultyctrl.create)
Router.get("/getdata",facultyctrl.getFaculty)
Router.patch("/update/:id",facultyctrl.update)
Router.get("/delete/:id",facultyctrl.delete)
module.exports = Router;
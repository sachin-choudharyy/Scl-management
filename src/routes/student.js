const express = require('express')
const Router = express.Router();
const studentCtrl = require('../controller/student')
const upload = require('../middileware/upload')
Router.post("/create",upload.single("Marksheet"),studentCtrl.Create)
Router.get("/getStudents",studentCtrl.getStudents)
Router.get("/getStudentById/:id",studentCtrl.getStudentsById)

module.exports=Router;

const express = require('express')
const Router = express.Router();
const studentCtrl = require('../controller/student')
const upload = require('../middileware/upload')
const s3 = require('../middileware/s3')
const authToken = require('../middileware/auth')

Router.post("/create",authToken,upload.single("Marksheet"), studentCtrl.Create)
// Router.post("/create",authToken,upload.single("Marksheet"),s3.uploadfilestoaws,studentCtrl.Create)
Router.get("/getStudents",studentCtrl.getStudents)
Router.get("/getStudentById/:id",studentCtrl.getStudentsById)
Router.patch("/update/:id",studentCtrl.updateStudent)
Router.get("/delete/:id",studentCtrl.delete)

module.exports=Router;





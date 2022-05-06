require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
// const  bodyParser = require('body-parser')
const studentRouter = require('./src/routes/student')
const adminRouter = require('./src/routes/adminRoute.js')
const subAdminRouter=require('./src/routes/subAdminRoute')
const facultyRouter = require('./src/routes/facultyRoute')
const departmentRouter = require('./src/routes/departmentRoutes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}));


const url = "mongodb://localhost:27017/SCL-Management"
mongoose.connect(url).then(() => {
    console.log("Database Connect Successfully")
}).catch(err => {
    console.log(err)
})



app.use('/student', studentRouter);
app.use('/admin', adminRouter);
app.use('/subadmin', subAdminRouter);
app.use('/faculty', facultyRouter);
app.use('/department',departmentRouter);


const port = process.env.PORT;
app.listen(port, () => {
    console.log("port running http://localhost:" + port);
})
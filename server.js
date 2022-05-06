require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
// const  bodyParser = require('body-parser')
const studentRouter = require('./src/routes/student')
const userRouter = require('./src/routes/adminRoute.js')
const subAdminRouter=require('./src/routes/subAdminRoute')
const facultyRouter = require('./src/routes/facultyRoute')
const feesRouter = require('./src/routes/feesRoute')

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



app.use('/user', userRouter);
app.use('/student', studentRouter);
app.use('/subadmin', subAdminRouter);
app.use('/faculty', facultyRouter);
app.use('/fees', feesRouter);


const port = process.env.PORT;
app.listen(port, () => {
    console.log("port running http://localhost:" + port);
})
const mongoose = require('mongoose');
const { schema } = require('./Admin');
const Schema = mongoose.Schema

const data = new Schema({
    Department_Name:{
        type:String,
        required:true
    },
    Faculty_Count:{
        type:mongoose.Types.ObjectId,
        ref:"faculty"
    },
})

const departmentModel = mongoose.model('department',data)
module.exports=departmentModel;
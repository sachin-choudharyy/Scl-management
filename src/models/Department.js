
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data = new Schema({
  
  DepartmentName:{
      type:String,
      required:true
  },
  totalFaculty:{
      type:Number,
  }
})    

var DepartmentModel = mongoose.model('department', data);
module.exports = DepartmentModel;

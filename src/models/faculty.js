
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data = new Schema({
   Name:{
      type:String,
      required:true
  },
   ContactNo:{
       type:Number,
       require:true
   },
   Department:{
       type:String,
       enum:[
           "Teaching",
           "Sports",
           "Laibrary",
           "Accountant"
         ]
  },
   Email:{
      type:String,
      required:true,
    
  },
  Password:{
      type:String,
      required:true
  },
  Education:{
      type:String,
      required:true
  },
  DateOfJoining:{
      type:Date,
      required:false
  },
  Sallery:{
      type:Number,
      required:true
  }
})    

const  facultyModel = mongoose.model('faculty', data);
module.exports = facultyModel;
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const studentData = new Schema({
  
  Name: { type:String, required: true}, // String is shorthand for {type: String}
  Email:{type:String,unique:true,required:true},
  Password:{type:String,required:true},
  FatherName:{type:String,required:true},
  Address:{type:String,required:true},
  Class:{type:Number,required:true},
  Birthdate:{type:Date,required:true},
  ContactNo:{type:Number,required:true},
  Grade:{type:String,
    enum:[
      "A-Grade",
      "B-Grade",
      "C-Grade"
    ],
    required:true
  },
   Marksheet:{type:Array,require:false},
  // isDeleted: { type: Boolean, default: false }
  
});


const  studentModel = mongoose.model('Student', studentData);
module.exports = studentModel;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data = new Schema({
  
  studentID:{
     type: mongoose.Types.ObjectId, ref: 'Student', required: true ,
     unique:true
  },
  paid:{
      type:Number,
      required:true
  },
  totalFees:{
      type:Number,
      required:true
  },
  remainingFees:{
    type:Number,
    required:true
  }
})    

var feesModel = mongoose.model('fees', data);
module.exports = feesModel;

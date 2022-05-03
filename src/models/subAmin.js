
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
   Category:{
       type:String,
       enum:[
           "A",
           "B",
           "C"
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
 
AadharCard:{
    type:Array
},
PanCard:{
    type:Array
},
  Education:{
      type:String,
      required:true
  },
  DateOfJoining:{
      type:Date,
      required:false
  }
})    

var subAdminModel = mongoose.model('subAdmin', data);
module.exports = subAdminModel;
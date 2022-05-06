const departmentModel = require('../models/Department.js');

module.exports={

        createDepartment:async (req,res)=>{
        try {
            const {Department_Name, Faculty_Count}=req.body
            const data = await new departmentModel({Department_Name,Faculty_Count})
            if (data) {
                await data.save()
                res.json({success:true,mes:"Department Created",data:data})
                
            }
        } catch (error) {
            console.log(error);
            res.json({success:false,mes:error.message})
            
        }
    },
    getdepartment:async(req,res)=>{
        try {
             
            const result = await departmentModel.find({_id:req.params.id})
            .populate({path:"Faculty_Count",select:{_id:0,Name:1,Department:1}})
            console.log(result);
            res.json({
                success:true,
                data:result
            })
        } catch (error) {
            res.json({success:false,mes:error.mes})
            
        }
    },
    countDepartment: async(req,res)=>{
        try {
                         
            const result = await departmentModel.find({_id:req.params.id}).count()
             
            res.json({
                success:true,
                Department:result
            })
        } catch (error) {
            res.json({
                success:false,
                mes:error.mes
            })
        }
    }
}
const facultyModel = require('../models/faculty')
const bcrypt = require('bcrypt');
const { get } = require('../routes/student');
module.exports = {
    create: async (req, res) => {
        try {
            console.log(req.decode.role);
            if (req.decode.role === "Admin") {
                const { Name, Email, Password,  Department, Sallery, DateOfJoining, ContactNo, Education } = req.body;
                 
                if (Name && Email && Password  && Department) {
                    const data = await new facultyModel({ Name, Email, Password, Department, Sallery, DateOfJoining, ContactNo, Education })
                    data.Password = await bcrypt.hash(data.Password, 10)
                    const stddata = await data.save();
                    res.status(200).json({
                        mesaage: "faculty create successfully",
                        data: stddata
                    })
                } else {
                    res.status(400).json({
                        mesaage: "feilds are required",
                        data: {}
                    })
                }
            } else {
                res.status(401).json({
                    mesaage: "you are not authorized to create faculty",
                    data: {}
                })
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                mesaage: "server not found",
                error: err
            })
        }
    },
    getFaculty: async (req, res) => {
        try {
            const getdata = await facultyModel.find()
            if (getdata) {
                res.status(200).json({
                    mesaage: "get faculty successfully",
                    data: getdata
                })
            } else {
                res.status(400).json({
                    mesaage: "faculty data is empty",
                    data: {}
                })
            }
        } catch (err) {
            res.status(500).json({
                mesaage: "server not found",
                error: err
            })
        }
    },
    update: async (req, res) => {
        try {
            console.log(req.body);
            const updatedata = await facultyModel.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    Name: req.body.Name,
                    Email: req.body.Email,
                    Password: req.body.Password,
                    ContactNo: req.body.ContactNo,
                    Department: req.body.Department,
                    Education: req.body.Education,
                    Role: req.body.Role,
                    DateOfJoining: req.body.DateOfJoining,
                    Sallery: req.body.Sallery
                }
            }, { new: true })
            if (updatedata) {

                res.status(200).json({
                    message: "update success"
                })
            } else {
                res.status(400).json({
                    message: "invalid id"
                })
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "server not found",
                error: err
            })
        }
    }, delete: async (req, res) => {
        try {
          const deletedata = await facultyModel.findByIdAndDelete({ _id: req.params.id })
          if (deletedata._id) {
            res.status(200).json({
              message: "delete success"
            })
          } else {
            res.status(400).json({
              message: "invalid userid"
            })
          }
        } catch (err) {
          res.status(400).json({
            message: "server not found",
            error: err
          })
        }
    
      },
      getdepartment :async(req,res)=>{
          try {
               
                const  Department  = req.query.Department;
             
             const aws = await facultyModel.find({Department}).count()          
                
                   
                  res.json({success:true,data:aws}) 
          } catch (error) {
              console.log(error);
              res.json({success:false,message:error.message}) 

          }
      }

}


const subAdminModel = require("../models/subAmin");
const studentModel = require("../models/StudentModel.js");
const jwt = require('jsonwebtoken')

module.exports = {
  create: async (req, res) => {
    
    try {
      if (req.decode.role === "Admin") {
        const {
          Name,
          Email,
          Password,
          Category,
          Education,
          DateOfJoining,
          ContactNo,
        } = req.body;
        const { AadharCard, PanCard } = req.files;
        const data = await new subAdminModel({
          Name,
          Email,
          Password,
          Category,
          Education,
          DateOfJoining,
          ContactNo,
          AadharCard: AadharCard,
          PanCard: PanCard,
          // AccountNO:Document.AccountNO
        });
        const result = await data.save();

        res.json({
          msg: "data crete",
          data: result,
        });
      } else {
        res.status(400).json({
          message: "you are not authorized to create sudAdmins",
          data: {},
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "failed to create",
        errpr: err,
      });
    }
  },
  getSubAdmin: async (req, res) => {
    try {
      const getdata = await subAdminModel.find();
      if (getdata) {
        res.status(200).json({
          message: "get subAdmin successfully",
          data: getdata,
        });
      }
    } catch (err) {
      res.status(400).json({
        message: " failed to get subAdmin",
        error: err,
      });
    }
  },
  update: async (req, res) => {
    try {
      const updatedata = await subAdminModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            Name: req.body.Name,
            Email: req.body.Email,
            Password: req.body.Password,
            ContactNo: req.body.ContactNo,
            Category: req.body.Category,
            DateOfJoining: req.body.DateOfJoining,
          },
        },
        { new: true }
      );
      if (updatedata) {
        res.status(200).json({
          message: "update successfully",
          data: updatedata,
        });
      } else {
        res.status(400).json({
          message: "invalid userId",
          data: {},
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "server not found",
        error: err,
      });
    }
  },

  Delete: async (req, res) => {
    try {
      const deletedata = await subAdminModel.findOneAndDelete({
        _id: req.params.id,
      });
      if (deletedata) {
        res.status(200).json({
          message: "delete successfully",
          data: deletedata,
        });
      } else {
        res.status(400).json({
          message: "invalid userId",
          data: {},
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "server not found",
        error: err,
      });
    }
  },
  getstudent: async (req, res) => {
    try {
       
         
         const result = await subAdminModel.findOne({Email:req.params.email})
        
          if (result) {
            
            
         if(result.Category==="A"){
           
             const dataA = await studentModel.find({Class:{$gte:1,$lte:4}});
             console.log(dataA);
        res.json({ success: true, subAdminA: dataA });
      };
          
            if(result.Category==="B"){  
    
          const dataB = await studentModel.find({Class:{$gte:5,$lte:8}});
        res.json({ success: true, subAdminB: dataB });
      };
     
        if(result.Category==="C"){  
        
    const dataC = await studentModel.find({Class:{$gte:9,$lte:12}})
        res.json({ success: true, subAdminC: dataC });
      };
     
    }
    } catch (error) {
      console.log(error);
      res.json({ success: false, mes: error.mes });
    }
  },

  LoginSubAdmin: async (req, res) => {
    try {
       
        const { Email, Password } = req.body;
        if (Email && Password) {
            const result = await subAdminModel.findOne({ Email: Email })
        
            if (result) {
                // const validpassword = await bcrypt.compare(Password, result.Password)
                const token = jwt.sign({ id: result._id, Password, category: result.Category}, "mySecretKey", { expiresIn: "9h" })
                if (token) {

                    return res.status(202).json({
                        success: true,
                        message: "SubAdmin LoggedIn",
                        data: result,token
                        
                    })
                }
                else {
                    res.status(400).json({
                        success: true,
                        message: "Password is Incorrect",
                        data: {}
                    })
                }
            }
            else {
                res.status(404).json({
                    success: true,
                    message: "you are not authorized to login",
                    data: {}
                })
            }
        }
        else {
            res.status(406).json({
                success: false,
                message: "Email and Password is Required",
                data: {}
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            err: err
        })
    }
},
};



const adminModel = require('../models/Admin')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

module.exports = {
    Create: async (req, res) => {
        try {
         const { Role, Email, Password } = req.body;
         const adminData = await new adminModel({ Role, Email, Password })
            if (adminData) {
                adminData.Password = await bcrypt.hash(adminData.Password, 10)
                await adminData.save();
                res.status(200).json({
                    message: "create admin successfully",
                    data: adminData
                })
            }
            else {
                res.status(400).json({
                    message: "plese check all fileds",
                    data: {}
                })
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "server not found",
                data: {}
            })

        }
    },
    
   
    Login: async (req, res) => {
        try {
           
            const { Email, Password } = req.body;
            if (Email && Password) {
                const result = await adminModel.findOne({ Email: Email })
            
                if (result) {
                    const validpassword = await bcrypt.compare(Password, result.Password)
                    const token = jwt.sign({ id: result._id, Password, role: result.Role}, "mySecretKey", { expiresIn: "9h" })
                    if (validpassword) {

                        return res.status(202).json({
                            success: true,
                            message: "User LoggedIn",
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

}




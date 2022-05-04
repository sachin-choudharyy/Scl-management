
const studentModel = require('../models/StudentModel');
const bcrypt = require('bcrypt');
const subAdmin = require('./subAdmin');

module.exports = {

  Create: async (req, res) => {
    try {
      const { Name, Email, Password, FatherName, Address, Class, Birthdate, ContactNo, Grade } = req.body;
      const Marksheet = req.url;

      if (req.decode.role === "Admin") {
        
         const studentdata = await new studentModel({ Name, Email, Password, FatherName, Address, Class, Birthdate, ContactNo, Grade, Marksheet })
        if (studentdata) {
          studentdata.Password = await bcrypt.hash(studentdata.Password, 10)
          await studentdata.save();
          res.status(200).json({
            message: "student data create successfully",
            data: studentdata
          })
        } else {
          res.json({
            message: "plese check all fields",
            data: {}
          })
        }
      } else {
        res.json({ msg: "unauthorized" })
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "failed to create",
        error: err
      })
    }
  },

  getStudents: async (req, res) => {
    try {
      const getdata = await studentModel.find()
      if (getdata) {
        res.status(200).json({
          message: "students get successfully",
          data: getdata
        })
      } else {
        res.status(400).json({
          message: "students not found",
          data: {}
        })
      }
    } catch (err) {
      res.status(500).json({
        message: "server not found",
        error: err
      })
    }
  },
  getStudentsById: async (req, res) => {
    try {
      const data = await studentModel.findOne({ _id: req.params.id })
      if (data) {
        res.status(200).json({
          message: "get student successfully",
          data: data
        })
      } else {
        res.status(400).json({
          message: "invalid userID",
          data: data
        })
      }
    } catch (err) {
      res.status(500).json({
        message: "server not found",
        error: err
      })
    }
  },
  updateStudent: async (req, res) => {
    try {
      console.log(req.body);
      const updatedata = await studentModel.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
          Name: req.body.Name,
          Email: req.body.Email,
          Password: req.body.Password,
          ContactNo: req.body.ContactNo,
          Address: req.body.Address,
          Birthdate: req.body.Birthdate,
          Class: req.body.Class,
          Grade: req.body.Grade,
          FatherName: req.body.FatherName,
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
  },
  delete: async (req, res) => {
    try {
      const deletedata = await studentModel.findByIdAndDelete({ _id: req.params.id })
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

  }
}

const studentModel = require('../models/StudentModel');
// const bcrypt = require('bcrypt');

module.exports = {

  Create: async (req, res) => {
    try {
  
      const { Name, Email, Password, FatherName, Address, Class, Birthdate, ContactNo, Grade } = req.body;
      const Marksheet=req.file.path;
      const studentdata = await new studentModel({ Name, Email, Password, FatherName, Address, Class, Birthdate, ContactNo, Grade,Marksheet })
      if (studentdata) {
        //  studentdata.Password = await bcrypt.hash(studentdata.Password, 10)
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

    } catch (err) {

    }
  },
  delete: async (req, res) => {
    try {
      const deletedata = await studentModel.findById({ _id: req.params.id })
      if (deletedata) {
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
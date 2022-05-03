
const subAdminModel = require('../models/subAmin')

module.exports = {
    create: async (req, res) => {
        try {
            const { Name,
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
                AadharCard,
                PanCard,
                // AccountNO:Document.AccountNO 
            })
            const result = await data.save()

            res.json({
                msg: "data crete",
                data: result
            })
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "failed to create",
                data: {}
            })
        }
    },
    getSubAdmin: async (req, res) => {
        try {
            const getdata = await subAdminModel.find();
            if (getdata) {
                res.status(200).json({
                    message: "get subAdmin successfully",
                    data: getdata
                })
            }
        } catch (err) {
            res.status(400).json({
                message: " failed to get subAdmin",
                error: err
            })
        }
    },
    update: async (req, res) => {
        try {
            const updatedata = await subAdminModel.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    Name: req.body.Name,
                    Email: req.body.Email,
                    Password: req.body.Password,
                    ContactNo: req.body.ContactNo,
                    Category: req.body.Category,
                    DateOfJoining: req.body.DateOfJoining
                }
            }, { new: true })
            if (updatedata) {
                res.status(200).json({
                    message: "update successfully",
                    data: updatedata
                })
            } else {
                res.status(400).json({
                    message: "invalid userId",
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

    Delete: async (req, res) => {
        try {
            const deletedata = await subAdminModel.findOneAndDelete({ _id: req.params.id })
            if (deletedata) {
                res.status(200).json({
                    message: "delete successfully",
                    data: deletedata
                })
            } else {
                res.status(400).json({
                    message: "invalid userId",
                    data: {}
                })
            }
        } catch (err) {
            res.status(500).json({
                message: "server not found",
                error: err
            })
        }
    }
}
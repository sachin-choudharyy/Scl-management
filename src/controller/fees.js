const feesModel = require('../models/feesModel')

module.exports = {
    create: async (req, res) => {
        try {
            if (req.decode.role == "Admin" || req.decode.role == "subAdmin") {
                const { studentID, paid, totalFees } = req.body;
                let remaning = totalFees - paid;
                console.log(remaning);
                if (studentID && paid && totalFees) {
                    const feesdata = await new feesModel({ studentID, paid, totalFees, remainingFees: remaning })
                    const data = await feesdata.save()
                    res.status(200).json({
                        message: "Data create successfully",
                        data: data
                    })

                } else {
                    res.status(400).json({
                        messsage: "all feilds required",
                        data: {}
                    })
                }

            } else {
                res.status(400).json({
                    message: "you are not authorized ",
                    data: {}
                })
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                messsage: "server NOt found",
                error: err
            })
        }

    },
    getStdFees: async (req, res) => {
        try {
            const data = await feesModel.find().populate({ path: 'studentID', select: ['Name', 'Class'] })
            if (data != "") {
                res.status(200).json({
                    msg: "get students fees",
                    data: data
                })
            } else {
                res.status(400).json({
                    msg: "students fees empty",
                    data: {}
                })
            }
        } catch (err) {
            res.status(400).json({
                msg: "server not found",
                error: err
            })
        }
    },
    getFeesById: async (req, res) => {
        try {
            const data = await feesModel.findOne({ studentID: req.query.id }).populate({ path: 'studentID', select: ['Name', 'Class'] })
            if (data) {
                res.status(200).json({
                    msg: "get student details successfully",
                    data: data
                })
            } else {
                res.status(400).json({
                    msg: "invalid StudentId",
                    data: {}
                })
            }
        } catch (err) {
            res.status(500).json({
                msg: "server not found",
                error: err
            })
        }
    },
    updateFees: async (req, res) => {
        try {
            if (req.decode.role === "Admin") {
                const updatedata = await feesModel.findOne({ studentID: req.query.id })
                if (updatedata.remainingFees != 0) {
                    if (req.body.payAmount > updatedata.remainingFees) {
                        res.status(200).json({
                            msg: "plese check payment",

                        })
                    } else {
                        const amount = req.body.payAmount;
                        const newPaidAmount = updatedata.paid + amount;
                        const newRemainingAmount = updatedata.totalFees - newPaidAmount;
                        await feesModel.updateOne({ studentID: req.query.id }, { $set: { paid: newPaidAmount, remainingFees: newRemainingAmount } });
                        if (updatedata) {
                            res.status(200).json({
                                message: "update success",
                                data: updatedata
                            })
                        } else {
                            res.status(400).json({
                                message: "invalid id"
                            })
                        }
                    }
                } else {
                    res.status(400).json({
                        msg: "fees completed"
                    })
                }
            } else {
                res.json({
                     msg: "you are not authorized "
                })
               }
        } catch (err) {
            console.log(err);
        }
    }

}


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admindata = new Schema({

	Role: {
		type: String,
		enum: [
			"Admin",
			"SubAdmin",
			"Student",
			"Faculty"
		],
		required: true
	},
	Email: {
		type: String,
		required: true,

	},
	Password: {
		type: String,
		required: true
	}
})

var AdminModel = mongoose.model('Admin', Admindata);
module.exports = AdminModel;
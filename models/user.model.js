require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
	uid: {
		type: String,
		required: true,
		unique: true
	},
	name: String,
	photo: String,
	recipes: [Number],
	madeit: [Number],
	likes: [Number]
});

module.exports = mongoose.model('User', UserSchema);
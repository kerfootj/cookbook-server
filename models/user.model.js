require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(
	`mongodb+srv://${process.env.MONGO_DB_USER}:${
		process.env.MONGO_DB_PASSWORD
	}@cookbook-db-6mqam.mongodb.net/cookbook?retryWrites=true&w=majority`,
	{ useNewUrlParser: true }
);

const UserSchema = Schema({
	uid: {
		type: String,
		required: true,
		unique: true
	},
	name: String,
	profilepic: String,
	madeit: [Number],
	likes: [Number]
});

module.exports = mongoose.model('User', UserSchema);

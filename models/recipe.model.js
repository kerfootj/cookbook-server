require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect(
	`mongodb+srv://${process.env.MONGO_DB_USER}:${
		process.env.MONGO_DB_PASSWORD
	}@cookbook-db-6mqam.mongodb.net/cookbook?retryWrites=true&w=majority`,
	{ useNewUrlParser: true }
);

autoIncrement.initialize(mongoose.connection);

const RecipeSchema = Schema({
	title: {
		type: String,
		required: true
	},
	description: String,
	ingredients: {
		type: [String],
		required: true
	},
	instructions: {
		type: [String],
		required: true
	},
	image: {
		id: {
			type: String
		},
		deleteHash: {
			type: String
		}
	},
	prep: {
		type: String,
		required: true
	},
	cook: {
		type: String,
		required: true
	},
	ready: {
		type: String,
		required: true
	},
	servings: {
		type: Number,
		required: true
	},
	private: {
		type: Boolean,
		required: true
	},
	uid: {
		type: String,
		required: true
	},
	madeit: Number,
	likes: Number
});

RecipeSchema.plugin(autoIncrement.plugin, 'Recipe');
module.exports = mongoose.model('Recipe', RecipeSchema);

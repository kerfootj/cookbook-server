const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect(
	'mongodb+srv://betty:Peach-p!3@cookbook-db-6mqam.mongodb.net/cookbook?retryWrites=true&w=majority',
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
	}
});

RecipeSchema.plugin(autoIncrement.plugin, 'Recipe');
module.exports = mongoose.model('Recipe', RecipeSchema);

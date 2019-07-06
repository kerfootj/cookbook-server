const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(
	'mongodb+srv://betty:Peach-p!3@cookbook-db-6mqam.mongodb.net/cookbook?retryWrites=true&w=majority',
	{ useNewUrlParser: true }
);

const RecipeSchema = Schema({
	title: {
		type: String,
		required: true
	},
	description: String,
	image: {
		id: {
			type: String,
			required: true
		},
		deleteHash: {
			type: String,
			required: true
		}
	}
});

module.exports = mongoose.model('Recipe', RecipeSchema);

const RecipeModel = require('../models/recipe.model');
const express = require('express');
const router = express.Router();

router.get('/recipe', (req, res) => {
	RecipeModel.find({})
		.then(document => res.json(document))
		.catch(error => res.status(500).json(error));
});

router.post('/recipe', (req, res) => {
	const model = new RecipeModel(req.body);
	model
		.save()
		.then(document => {
			res.json(document);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

module.exports = router;

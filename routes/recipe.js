const RecipeModel = require('../models/recipe.model');
const express = require('express');
const router = express.Router();

// Get all recipies without ingredients or instructions
router.get('/recipe', (req, res) => {
	RecipeModel.find({}, '-ingredients -instructions')
		.then(document => {
			res.json(document);
		})
		.catch(error => res.status(500).json(error));
});

// Get a recipe with the given recipe id
router.get('/recipe/:recipeId', (req, res) => {
	RecipeModel.findOne({
			_id: req.params.recipeId
		})
		.then(document => {
			res.json(document);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json(error);
		});
});


// Save a new recipe or update an existing one
router.post('/recipe', (req, res) => {
	if (req.body._id) {
		RecipeModel.findOneAndUpdate({
				_id: req.body._id
			},
			new RecipeModel(req.body), {
				upsert: true
			},
			(error, document) => {
				if (error) {
					res.status(500).json(error);
				} else {
					res.json(document);
				}
			}
		)
	} else {
		new RecipeModel(req.body)
			.save()
			.then(document => {
				res.json(document);
			})
			.catch(error => {
				console.log(error);
				res.status(500).json(error);
			});
	}
});

router.post('/recipe/madeit', (req, res) => {
	const id = req.query.id;
	const uid = req.query.uid;

	// TODO: verify that the user hasn't already clicked made it yet
	RecipeModel.findOneAndUpdate({
			_id: id
		}, {
			$inc: {
				madeit: 1
			}
		})
		.then(document => {
			res.json(document);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

router.delete('recipe/madeit', (req, res) => {
	const id = req.query.id;
	const uid = req.query.uid;

	// TODO: verify that the user has already clicked made it yet
	RecipeModel.findOneAndUpdate({
			_id: id
		}, {
			$inc: {
				madeit: -1
			}
		})
		.then(document => {
			res.json(document);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

module.exports = router;
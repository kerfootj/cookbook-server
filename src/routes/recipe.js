const RecipeModel = require('../models/recipe.model');
const express = require('express'); 
const router = express.Router();

// Get all recipies or recipies matching a search
router.get('/recipe', (req, res) => {
	const filter = { private: false };

	// If a search construct a filter
	if (req.query && req.query.search) {
		const { search } = req.query;
		filter.title = { $regex: search, $options: 'i' };
	}

	RecipeModel.find(filter, '-ingredients -instructions -uid')
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
			const { uid } = req.body;
			const recipe = JSON.parse(JSON.stringify(document));
			recipe.owner = document.uid === uid;
			recipe.uid = undefined;
			res.json(recipe);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});


// Save a new recipe or update an existing one
router.post('/recipe', (req, res) => {
	const { uid } = req.body;
	// User isn't logged in
	if (!uid) {
		res.status(401).send('Unauthorized')
		
	}
	// Update a recipe 
	else if (req.body._id) {
		// Check user owns the recipe
		RecipeModel.findById(req.body._id).then(document => {
			if (document.uid !== uid) {
				res.status(401).send('Unauthorized');
				return;
			}
			// Update if they do
			RecipeModel.findOneAndUpdate({
				_id: req.body._id,
				uid,
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
		}).catch(error => {
			res.status(500).json(error);
			return;
		});
		
	} 
	// Save new recipe
	else {
		new RecipeModel(req.body)
			.save()
			.then(document => {
				res.json(document);
			})
			.catch(error => {
				res.status(500).json(error);
			});
	}
});

// Delete a recipe
router.post('/recipe/delete/:recipeId', (req, res) => {
	const { uid } = req.body;
	RecipeModel.deleteOne({
		_id: req.params.recipeId,
		uid,
	}).then(() => {
		res.status(200).send('recipe deleted');
	}).catch(error => {
		res.status(500).json(error);
	});
});

module.exports = router;
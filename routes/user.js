const UserModel = require('../models/user.model');
const express = require('express');
const router = express.Router();

router.get('/user/:uid', (req, res) => {
	UserModel.findOne({ uid: req.params.recipeId })
		.then(document => {
			res.json(document);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

router.post('/user', (req, res) => {
	const model = new UserModel(req.body);
	model
		.save()
		.then(document => {
			res.json(document);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

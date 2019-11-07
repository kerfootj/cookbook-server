const UserModel = require('../models/user.model');
const express = require('express'); 
const router = express.Router();

router.get('/user', (req, res) => {
	UserModel.find({})
		.then(document => {
			res.json(document);
		})
		.catch(error => res.status(500).json(error));
});

router.get('/user/:uid', (req, res) => {
	UserModel.findOne({
			uid: req.params.uid
		})
		.then(document => {
			res.json(document);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

router.post('/user', (req, res) => {
	const query = {
			'uid': req.body.uid
		};
	const update = req.body;
	const options = {
			upsert: true,
			new: true,
			setDefaultsOnInsert: true
		};
	UserModel.findOneAndUpdate(query, update, options, (error, document) => {
		if (error) {
			return res.status(500).json(error);
		}
		return res.json(document);
	});
});

module.exports = router;
const UserModel = require('../models/user.model');
const express = require('express'); 
const router = express.Router();

router.get('/users', (req, res) => {
	UserModel.find({}, '-uid -_id')
		.then(document => {
			res.json(document);
		})
		.catch(error => res.status(500).json(error));
});

router.post('/user', (req, res) => {
	const { uid } = req.body;
	const query = { 'uid': uid };
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
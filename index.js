const data = require('./fakeData.json');
const express = require('express');
const cors = require('cors');
const app = express();

app.get('/api/recipes', cors(), (req, res) => res.json(data));

var server = app.listen(process.env.PORT || 8080, () => {
	var port = server.address().port;
	console.log('App now running on port', port);
});

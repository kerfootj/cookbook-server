const Express = require('express');
const recipeRoute = require('./routes/recipe');
const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const CONNECTION_URL =
	'mongodb+srv://betty:Peach-p!3@cookbook-db-6mqam.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = 'cookbook';

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 8080, () => {
	console.log('App running on port', server.address().port);
});

app.use(recipeRoute);

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
	res.status(404).send('THIS PAGE IS NOT FULLY ARMED AND OPERATIONAL');
});

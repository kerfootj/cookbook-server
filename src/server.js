const Express = require('express');
const recipeRoute = require('./routes/recipe');
const userRoute = require('./routes/user');
const BodyParser = require('body-parser');
const cors = require('cors');
const verifyToken = require('./firebase/token');

const app = Express();

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
	extended: true
}));
app.use('/', verifyToken);

const server = app.listen(process.env.PORT || 8080, () => {
	console.log('App running on port', server.address().port);
});

app.use(recipeRoute);
app.use(userRoute);

// Handler for 404 - Resource Not Found
app.use((req, res) => {
	res.status(404).send('THIS PAGE IS NOT FULLY ARMED AND OPERATIONAL');
});
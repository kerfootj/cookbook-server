const data = require('./fakeData.json');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.get('/', cors(), (req, res) => res.json(data));

app.listen(port, () => console.log(`listening on port: ${port}`));

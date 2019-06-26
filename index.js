const data = require('./fakeData.json');
const express = require('express');
const cors = require('cors');
const app = express();

app.get('/api/recipes', cors(), (req, res) => res.json(data));

app.listen(process.env.PORT || 8080, () => console.log(`listening on port: ${port}`));

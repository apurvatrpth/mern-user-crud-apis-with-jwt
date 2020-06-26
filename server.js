const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route');

const app = express();

require('dotenv').config();

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

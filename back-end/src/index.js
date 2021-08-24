const express = require('express');
const routes = require('./routes.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("SERVER IS RUNING OF PORT 3333");
});


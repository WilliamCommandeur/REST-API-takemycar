require('dotenv').config();
const debug = require('debug')('api:initialization');
const express = require('express');
const router = require('./app/router');

const app = express();

app.use(express.json());
app.use(router);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  debug(`lancement de l'api sur http://localhost:${PORT}`);
});

const express = require('express');
const Router = express.Router();
const aqlDatabaseController = require('./controllers/AqlDatabaseController');


Router.get('/', aqlDatabaseController.getAqls, (req, res) => {
  res.status(200).json(res.locals.data);
});

module.exports = Router;

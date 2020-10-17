const express = require('express');
const Router = express.Router();
const aqlDatabaseController = require('./controllers/AqlDatabaseController');


Router.get('/', aqlDatabaseController.getAqls, (req, res) => {
  res.status(200).json(res.locals.data);
});

Router.get('/user/:userToken', aqlDatabaseController.getUserData, (req, res) => {
  res.status(200).send(res.locals.userData);
});

module.exports = Router;

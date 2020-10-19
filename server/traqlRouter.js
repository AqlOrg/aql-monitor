const express = require('express');
const db = require('./model');
const traqlRouter = express.Router();
const traqlController = require('./controllers/traqlController');

traqlRouter.post('/', traqlController.addAqlsToTraql, (req, res) => {
  res.sendStatus(200);
});

module.exports = traqlRouter;
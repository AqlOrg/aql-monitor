const express = require('express');
const Router = express.Router();
const aqlDatabaseController = require('./controllers/AqlDatabaseController');

<<<<<<< HEAD
Router.get(
  '/',
  (req, res, next) => {
    const queryString = 'SELECT * FROM aql ORDER BY mutation_received_time DESC LIMIT 400';
    db.query(queryString, (err, data) => {
      // If error, console.log
      if (err) console.log('ERROR: ', err);
      // create a dataObj to add shaped data from calling helperFuncs
      const dataObj = {};
      dataObj.resolverStats = resolverStats(data);
      dataObj.subscriptionHistory = subscriptionHistory(data);
      // destructure mutations and errors from E.R. of mutations(data)
      const [mutationsArr, errors] = mutations(data);
      // add mutations prop with mutations as val
      // add errors prop
      dataObj.mutations = mutationsArr;
      dataObj.errors = errors;
      res.locals.data = dataObj;
      return next();
    });
  },
  (req, res) => {
    res.status(200).json(res.locals.data);
  }
);
=======

Router.get('/', aqlDatabaseController.getAqls, (req, res) => {
  res.status(200).json(res.locals.data);
});

Router.get('/user', aqlDatabaseController.getUserData, (req, res) => {
  res.status(200).send(res.locals.userData);
});
>>>>>>> 8af3d7a4b9262f0e9d0deb1712aac495352766d1

module.exports = Router;

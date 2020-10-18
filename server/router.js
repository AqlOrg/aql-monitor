const express = require('express');
const db = require('./model');
const Router = express.Router();
const {
  resolverStats,
  subscriptionHistory,
  mutations,
} = require('./helperFuncs');

Router.get(
  '/',
  (req, res, next) => {
    const queryString =
      'SELECT * FROM aql ORDER BY mutation_received_time DESC LIMIT 1000';
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

module.exports = Router;

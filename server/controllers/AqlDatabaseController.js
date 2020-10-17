const aqlDatabaseController = {};
const db = require('../model');
const {
  resolverStats,
  subscriptionHistory,
  mutations,
} = require('../helperFuncs');
const { query } = require('express');

aqlDatabaseController.getAqls = (req, res, next) => {
  const queryString = 'SELECT * FROM aql;';
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
}

aqlDatabaseController.getUserData = (req, res, next) => {
  // want username, avatar url
  // we're going to send on req.body the uuid and want to only receive row for that uuid
  const { userToken } = req.params;
  const queryString = `
  SELECT 
    username,
    github_id,
    avatar_url
  FROM users
  WHERE user_token = $1;
  `
  const tokenQuery = [userToken];
  db.query(queryString, tokenQuery)
  .then(userData => {
    res.locals.userData = userData.rows[0];
    return next();
  })
}

module.exports = aqlDatabaseController;

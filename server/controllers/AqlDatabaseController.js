const aqlDatabaseController = {};
const db = require('../model');
const {
  resolverStats,
  subscriptionHistory,
  mutations,
} = require('../helperFuncs');
const { query } = require('express');

// set post request for getAqls
// query will always be select everything AND mutation_received will be greater than and less than

//Analytics from Aql table
aqlDatabaseController.getAqls = (req, res, next) => {
  // console.log('req.body', req.body); // { start: 1601362800000, end: 1601449200000 }
  const userToken = req.headers.cookie;
  //use the mainUserToken to query the database
  const mainUserToken = [...userToken]
    .splice(10, [...userToken].length - 1)
    .join('');
  // const tokenQuery = [req.headers.cookie];
  const values = [mainUserToken, req.body.start, req.body.end];
  console.log('req.body', req.body);
  const queryString = `SELECT * FROM aql WHERE user_token = $1 AND mutation_received_time BETWEEN $2 AND $3;`;
  db.query(queryString, values, (err, data) => {
    // If error, console.log
    if (err) console.log('ERROR: ', err);
    // create a dataObj to add shaped data from calling helperFuncs
    const dataObj = {};
    if (data.rows.length > 0) {
      dataObj.resolverStats = resolverStats(data);
      dataObj.subscriptionHistory = subscriptionHistory(data);
      // destructure mutations and errors from E.R. of mutations(data)
      const [mutationsArr, errors] = mutations(data);
      // add mutations prop with mutations as val
      // add errors prop
      dataObj.mutations = mutationsArr;
      dataObj.errors = errors;
      res.locals.data = dataObj;
      console.log('dataObj', dataObj);
    } else {
      res.locals.data = { noDataFound: 'No Aqls Found For This Day' };
    }
    return next();
  });
};

//Querying user data from the database by user_token
aqlDatabaseController.getUserData = (req, res, next) => {
  const userToken = req.headers.cookie;
  const mainUserToken = [...userToken]
    .splice(10, [...userToken].length - 1)
    .join('');

  const queryString = `
  SELECT 
    username,
    github_id,
    avatar_url
  FROM users
  WHERE user_token = $1;
  `;
  const tokenQuery = [mainUserToken];
  db.query(queryString, tokenQuery).then((userData) => {
    res.locals.userData = userData.rows[0];
    return next();
  });
};

module.exports = aqlDatabaseController;

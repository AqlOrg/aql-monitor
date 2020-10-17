const aqlDatabaseController = {};
const db = require('../model');
const {
  resolverStats,
  subscriptionHistory,
  mutations,
} = require('../helperFuncs');

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

module.exports = aqlDatabaseController;

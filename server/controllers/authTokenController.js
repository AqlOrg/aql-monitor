const authToken = {};
const db = require('../model.js');

authToken.getToken = (req, res, next) => {
  const githubId = [req.user.id];
  const tokenQuery = `SELECT user_token FROM users WHERE github_id = $1;`
  db.query(tokenQuery, githubId)
  .then((token) => {
    res.locals.token = token.rows[0].user_token;
    console.log("TOKENNNNN", typeof res.locals.token)
    return next()
  })
};

module.exports = authToken;
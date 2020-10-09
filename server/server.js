const express = require('express');
const cors = require('cors');
const GitHubStrategy = require('passport-github').Strategy;
const app = express();
const PORT = 3000;

const router = require('./router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:8080', 'http://localhost:3000'] }));

app.use(express.static('public'));

app.use('/api', router);

// GitHub OAuth Section
passport.use(new GitHubStrategy({
  clientID: '',
  clientSecret: '',
  callbackURL: '',
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    return profile;
  }
))
// ====================

module.exports = app.listen(PORT, () => {
  console.log('Aql hears you loud and clear on port 3000');
});

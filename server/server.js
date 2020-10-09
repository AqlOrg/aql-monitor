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
app.use(passport.initialize());

passport.use(new GitHubStrategy({
  clientID: '',
  clientSecret: '',
  callbackURL: '',
},
  async (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    return profile;
  }
));

app.get('/githublogin', passport.authenticate('github', { session: true }));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { session: true }),
  (req, res) => {
    console.log(res);
    res.sendStatus(418);
  }
);
// ====================

module.exports = app.listen(PORT, () => {
  console.log('Aql hears you loud and clear on port 3000');
});

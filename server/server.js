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

// Initialize Passport
app.use(passport.initialize());

// Incorporating GitHub strategy with environment variables
passport.use(new GitHubStrategy({
  clientID: '', // process.env.GITHUB_CLIENT_ID
  clientSecret: '', // process.env.GITHUB_CLIENT_SECRET
  callbackURL: '', // callback URL from GitHub
},
  // Async callback function: params- tokens, GitHub profile, callback
  async (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    // profile._json => profile information
    return profile;
  }
));

// Setting up Express routing for POST request to login via OAuth
app.get('/githublogin', passport.authenticate('github', { session: true }));

// Callback with GitHub OAuth to eventually redirect users to dashboard
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

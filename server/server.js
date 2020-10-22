const express = require('express');
const cors = require('cors');
const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./model.js');
const { v4: uuidv4 } = require('uuid');
const authToken = require('./controllers/authTokenController.js');
const Cookies = require('js-cookie');
const path = require('path');

const router = require('./router');
const traqlRouter = require('./traqlRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:8080', 'http://localhost:3000'] }));
app.use(express.static('public'));
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/aqls', traqlRouter);
app.use('/api', router);

// ---------------------- GitHub OAuth Section ----------------------- //

// Initialize Passport
app.use(passport.initialize());

// Incorporating GitHub strategy with environment variables
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID, // process.env.GITHUB_CLIENT_ID
      clientSecret: process.env.GITHUB_CLIENT_SECRET, // process.env.GITHUB_CLIENT_SECRET
      callbackURL: 'https://aqls.herokuapp.com/auth/github/callback', // callback URL from GitHub
    },
    // Async callback function: params- tokens, GitHub profile, callback
    async (accessToken, refreshToken, profile, cb) => {
      // find profile in users table based on githubId
      const verifyUser = `SELECT * FROM users WHERE github_id = $1;`;
      const githubId = [profile.id];
      const aqlsUser = await db.query(verifyUser, githubId);

      //insert this data to user table
      const signupQuery = `
      INSERT into users (
        username,
        display_name,
        github_id,
        avatar_url,
        user_token
      )
      VALUES ($1, $2, $3, $4, $5);
    `;
      const singupArray = [
        profile.username,
        profile.displayName,
        profile.id,
        profile._json.avatar_url,
        uuidv4(),
      ];

      //if aqlsUser does not exist in the database insert user data into user table
      if (!aqlsUser.rows.length) {
        db.query(signupQuery, singupArray);
      }
      cb(null, profile);
    }
  )
);

// Setting up Express routing for POST request to login via OAuth
app.get('/githublogin', passport.authenticate('github', { session: false }));

// Callback with GitHub OAuth to eventually redirect users to dashboard
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { session: false }),
  authToken.getToken,
  (req, res) => {
    res.locals.username = req.user.username;
    res.locals.id = req.user.id;
    res.locals.avatar = req.user._json.avatar_url;
    res.cookie('userToken', res.locals.token);
    res.redirect('/');
  }
);

module.exports = app.listen(PORT, () => {
  console.log('Aql hears you loud and clear on port 3000');
});

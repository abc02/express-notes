var express = require('express');
var router = express.Router();
var passport = require('passport')
var GitHubStrategy = require('passport-github2').Strategy

// var GITHUB_CLIENT_ID = '6518df0434a4b048600a'
// var GITHUB_CLIENT_SECRET = '3eb372d7e9f89c7a68c9bfdac3f780c9b5dc706d'
// var CALLBACK_URL = "http://localhost:3030/auth/github/callback"


var GITHUB_CLIENT_ID = '503084ad3a85a84d51f6'
var GITHUB_CLIENT_SECRET = '4c68e1f15238a2cfe174f9e77f82a263d9b69852'
var CALLBACK_URL = "http://notes.abc02.info/auth/github/callback"


passport.serializeUser(function (user, done) {
    console.log('serializeUser   ...')
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    console.log('deserializeUser   ...')
    console.log(obj)
    done(null, obj);
});



// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...

        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        done(null, profile);
    }
));






// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
    //function (req, res) {
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
    //}
);

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function (req, res) {
        console.log('/github/callback  ...')
        console.log(req)
        req.session.user = {
            id: req.user.id,
            username: req.user.username,
            provider: req.user.provider,
            avatar_url: req.user._json.avatar_url,

        }
        res.redirect('/');
    });

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
})
module.exports = router
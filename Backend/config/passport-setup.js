const passport = require("passport");
const LinkedInStrategy = require("@sokratis/passport-linkedin-oauth2").Strategy;
const keys = require('./keys');

passport.initialize();
passport.session();
passport.use(new LinkedInStrategy({
    clientID: keys.linkedIn.clientID,
    clientSecret: keys.linkedIn.clientSecret,
    callbackURL: "http://localhost:3000/auth/linkedin/callback",
    profileFields: [
        "formatted-name",
        "headline",
        "id",
        "public-profile-url",
        "email-address",
        "location",
    ],
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, function(accessToken, refreshToken, profile, done) {
      console.log(profile)
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }));
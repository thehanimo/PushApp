var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/app/linkedin', passport.authenticate('linkedin', { state: 'state'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
});

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: 'pushapp://login/success',
  failureRedirect: 'pushapp://login/failure',
  session: false
}));

module.exports = router;

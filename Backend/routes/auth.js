var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/linkedin', passport.authenticate('linkedin', { state: 'state'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
});

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login',
  session: false
}));

module.exports = router;

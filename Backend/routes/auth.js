var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/app/linkedin', passport.authenticate('linkedin', { state: 'state'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
});

router.post('/linkedin/callback', passport.authenticate('linkedin', {
  session: false
}),
function(req, res) {
  res.json( {displayName:req.user.displayName} );
});

router.get('/linkedin/callback', (req,res) =>{
  res.redirect(`pushapp://login/${req._parsedOriginalUrl.search}`)
});
module.exports = router;

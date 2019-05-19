var express = require("express");
var router = express.Router();
const passport = require("passport");

router.get(
  "/app/linkedin",
  passport.authenticate("linkedin", { state: "state" }),
  function(req, res) {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  }
);

router.post(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    session: false
  }),
  function(req, res) {
    res.json({
      provider: req.user.provider,
      email: req.user.emails[0].value,
      id: req.user.id,
      firstName: req.user.name.givenName,
      lastName: req.user.name.familyName,
      photo:
        req.user.photos == []
          ? null
          : req.user.photos[req.user.photos.length - 1].value
    });
  }
);

router.get("/linkedin/callback", (req, res) => {
  res.redirect(`pushapp://login/${req._parsedOriginalUrl.search}`);
});

router.post("/register", (req, res) => {
  //Extract req.body and save to db here!!
  statusMessage = "Registered!";
  res.status(200).end();
});
module.exports = router;

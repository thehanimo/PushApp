var express = require("express");
var router = express.Router();
const passport = require("passport");
var https = require("https");

const interestsCollection = [
  {
    image: "https://picsum.photos/id/113/200",
    label: `Data Structures`,
    id: 1
  },
  {
    image: "https://picsum.photos/id/341/200",
    label: "Machine Learning",
    id: 2
  },
  {
    image: "https://picsum.photos/id/432/200",
    label: "Robotics",
    id: 3
  },
  {
    image: "https://picsum.photos/id/231/200",
    label: "Finance",
    id: 4
  },
  {
    image: "https://picsum.photos/id/76/200",
    label: "Technology",
    id: 5
  },
  {
    image: "https://picsum.photos/id/89/200",
    label: "Space",
    id: 6
  },
  {
    image: "https://picsum.photos/id/56/200",
    label: "Farming",
    id: 7
  },
  {
    image: "https://picsum.photos/id/90/200",
    label: "Literature",
    id: 8
  },
  {
    image: "https://picsum.photos/id/80/200",
    label: "Graphic Design",
    id: 9
  },
  {
    image: "https://picsum.photos/id/70/200",
    label: "Marketing",
    id: 10
  },
  {
    image: "https://picsum.photos/id/60/200",
    label: "Automobiles",
    id: 11
  },
  {
    image: "https://picsum.photos/id/63/200",
    label: "Medicine",
    id: 12
  },
  {
    image: "https://picsum.photos/id/46/200",
    label: "Health",
    id: 13
  },
  {
    image: "https://picsum.photos/id/27/200",
    label: "Fitness",
    id: 14
  },
  {
    image: "https://picsum.photos/id/198/200",
    label: "Wellness",
    id: 15
  },
  {
    image: "https://picsum.photos/id/190/200",
    label: "Web development",
    id: 16
  },
  {
    image: "https://picsum.photos/id/381/200",
    label: "App development",
    id: 17
  },
  {
    image: "https://picsum.photos/id/21/200",
    label: "Business",
    id: 18
  },
  {
    image: "https://picsum.photos/id/222/200",
    label: "Cooking",
    id: 19
  },
  {
    image: "https://picsum.photos/id/333/200",
    label: "eCommerce",
    id: 20
  }
];

router.get("/interests/:searchExp", function(req, res) {
  console.log(req.params.searchExp);
  var interests = [];
  interestsCollection.forEach(interest => {
    if (interest.label.includes(req.params.searchExp)) interests.push(interest);
  });
  res.json({
    interests: interests
  });
});

router.get("/interests/top/:num", function(req, res) {
  var interests = [];
  interestsCollection.forEach(interest => {
    if (interests.length >= req.params.num && interests.indexOf(interest) == -1)
      return;
    else {
      interests.push(interest);
    }
  });
  res.json({
    interests: interests
  });
});

module.exports = router;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const util = require("util");
const {
  getToken,
  getTweetsByHashtag,
  getTweetsByScreenName,
  filterTweets
} = require("./twitterReq.js");

const myGetToken = util.promisify(getToken);
const myGetTweetsByHashtag = util.promisify(getTweetsByHashtag);
const myGetTweetsByScreenName = util.promisify(getTweetsByScreenName);

const app = express();

const secrets = require("./secrets.json");

app.use(bodyParser.json());
app.use(cors());

app.get("/api/nasa", (req, res) => {
  axios
    .get(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=" +
        secrets.nasaKey
    )
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/api/twitter/hashtag", (req, res) => {
  myGetToken().then(token =>
    Promise.all([myGetTweetsByHashtag(token, "nerdypickuplines")])
      .then(responses => {
        console.log(responses);
        // responses = [...responses[0], ...responses[1]];
        // let responsesSorted = responses.sort(function(a, b) {
        //   return new Date(b.created_at) - new Date(a.created_at);
        // });
        // let filteredTweets = filterTweets(responsesSorted);
        res.json({
          links: responses
        });
      })
      .catch(err => {
        console.log(err);
      })
  );
});

app.get("/api/twitter/user", (req, res) => {
  myGetToken().then(token =>
    Promise.all([
      myGetTweetsByScreenName(token, "big_ben_clock"),
      myGetTweetsByScreenName(token, "nytimes")
    ])
      .then(responses => {
        console.log(responses);
        // responses = [...responses[0], ...responses[1]];
        res.json({
          bigBen: responses[0],
          nytimes: responses[1]
        });
      })
      .catch(err => {
        console.log(err);
      })
  );
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const util = require("util");
const {
    getToken,
    getTweetsByHashtag,
    getTweetsByScreenName
} = require("./twitterReq.js");

const myGetToken = util.promisify(getToken);
const myGetTweetsByHashtag = util.promisify(getTweetsByHashtag);
const myGetTweetsByScreenName = util.promisify(getTweetsByScreenName);

const app = express();

const secrets = process.env || require("./secrets.json");

app.use(bodyParser.json());
app.use(cors());

app.get("/api/meetup", (req, res) => {
    axios
        .get(
            "https://api.meetup.com/find/upcoming_events?photo-host=public&lon=13.390803&page=20&text=php&lat=52.467773&order=time&sign=true&key=" +
        secrets.meetupKey
        )
        .then(meetups => {
            let events = meetups.data.events.slice(0, 4);
            res.json(events);
        })
        .catch(err => {
            console.log("err in Meetup: ", err);
        });
});

app.get("/api/nasa", (req, res) => {
    axios
        .get(
            "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1097&page=1&api_key=" +
        secrets.nasaKey
        )
        .then(response => {
            res.json(response.data);
        })
        .catch(err => {
            console.log("err in NASA: ", err);
        });
});

app.get("/api/twitter/hashtag", (req, res) => {
    myGetToken().then(token =>
        Promise.all([myGetTweetsByHashtag(token, "nerdypickuplines")])
            .then(responses => {
                res.json({
                    links: responses
                });
            })
            .catch(err => {
                console.log("err in TWITTER hashtag: ", err);
            })
    );
});

app.get("/api/twitter/user", (req, res) => {
    myGetToken().then(token =>
        Promise.all([
            myGetTweetsByScreenName(token, "DevinCow"),
            myGetTweetsByScreenName(token, "nytimes")
        ])
            .then(responses => {
                res.json({
                    bigBen: responses[0],
                    nytimes: responses[1]
                });
            })
            .catch(err => {
                console.log("err in twitter user: ", err);
            })
    );
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + "/public"));
    app.get(/.*/, (req, res) => {
        res.sendFle(__dirname + "/public/index.html");
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

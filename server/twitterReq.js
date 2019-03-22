const secrets = process.env || require("./secrets.json");
const https = require("https");

module.exports.getToken = function getToken(cb) {
    //will go to twitter API and get bearer token
    let concatenatedCreds = secrets.consumerKey + ":" + secrets.consumerSecret;
    let encodedCreds = new Buffer(concatenatedCreds).toString("base64");

    let options = {
    //data twitter API needs from me
        method: "POST",
        host: "api.twitter.com",
        path: "/oauth2/token",
        headers: {
            Authorization: "Basic " + encodedCreds,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    };

    let callback = resp => {
        if (resp.statusCode != 200) {
            cb(resp.statusCode);
            return;
        } else {
            let body = "";
            resp.on("data", chunk => {
                body += chunk;
            });
            resp.on("end", () => {
                let parsedBody = JSON.parse(body);
                let bearerToken = parsedBody.access_token;
                cb(null, bearerToken);
            });
        }
    };

    const req = https.request(options, callback); //callback gonna run once we've had a response from the twitter api
    req.write("grant_type=client_credentials");
    req.end();
};

/////////////////////////////
module.exports.getTweetsByHashtag = function getTweets(btoken, hashTag, cb) {
    //will go to twitter API to get tweets from one source of my choice
    // console.log("bear token from get tweets", btoken);
    // let concatenatedCreds = secrets.consumerKey + ":" + secrets.consumerSecret;
    // let encodedCreds = new Buffer(concatenatedCreds).toString("base64");
    //
    let options = {
    //data twitter API needs from us
        method: "GET",
        host: "api.twitter.com",
        path: "/1.1/search/tweets.json?q=%23" + hashTag + "&result_type=recent",
        // "/1.1/statuses/user_timeline.json?screen_name="
        headers: {
            Authorization: "Bearer " + btoken
            // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    };
    //
    let callback = resp => {
        if (resp.statusCode != 200) {
            cb(resp.statusCode);
            return;
        } else {
            let body = "";
            resp.on("data", chunk => {
                body += chunk;
            });
            resp.on("end", () => {
                let parsedBody = JSON.parse(body);
                cb(null, parsedBody);
            });
        }
    };
    //
    const req = https.request(options, callback); //callback gonna run once we've had a response from the twitter api
    req.end();
};

module.exports.getTweetsByScreenName = function getTweets(
    btoken,
    screenName,
    cb
) {
    //will go to twitter API to get tweets from one source of my choice
    // console.log("bear token from get tweets", btoken);
    // let concatenatedCreds = secrets.consumerKey + ":" + secrets.consumerSecret;
    // let encodedCreds = new Buffer(concatenatedCreds).toString("base64");
    //
    let options = {
    //data twitter API needs from us
        method: "GET",
        host: "api.twitter.com",
        path:
      "/1.1/statuses/user_timeline.json?screen_name=" + screenName + "&count=1",
        headers: {
            Authorization: "Bearer " + btoken
        }
    };
    //
    let callback = resp => {
        if (resp.statusCode != 200) {
            cb(resp.statusCode);
            return;
        } else {
            let body = "";
            resp.on("data", chunk => {
                body += chunk;
            });
            resp.on("end", () => {
                let parsedBody = JSON.parse(body);
                cb(null, parsedBody);
            });
        }
    };
    //
    const req = https.request(options, callback); //callback gonna run once we've had a response from the twitter api
    req.end();
    // //another https request, options will be different, read the documentation
};

module.exports.filterTweets = function filterTweets(tweets) {
    var filteredTweets = [];

    for (var i = 0; i < tweets.length; i++) {
        if (tweets[i].entities.urls.length === 1) {
            let myObj = {};
            myObj.content =
        tweets[i].created_at +
        tweets[i].text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "") +
        "(" +
        tweets[i].user.name +
        ")";
            myObj.url = tweets[i].entities.urls[0].url;
            filteredTweets.push(myObj);
        } else {
            continue;
        }
    }
    console.log(filteredTweets);
    return filteredTweets;
    //gonna get passed a reponse from get tweets and gonna filter it down to just the tweets we want
    //read the response we got from twitter
};

const secrets =
  process.env.NODE_ENV === "production"
      ? process.env
      : require("./secrets.json");
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
};

module.exports.getTweetsByScreenName = function getTweets(
    btoken,
    screenName,
    cb
) {
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
    const req = https.request(options, callback);
    req.end();
};

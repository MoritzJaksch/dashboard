# Spaceboard

Created a Dashboard that shows weather, tweets, meet ups, the position of the ISS and pictures taken by curiosity on mars.



[click here](challenging-dashboard.herokuapp.com) for the live version



## Tech stack

The Frontend is built with vue.js on a node/express backend to handle API requests that couldn't be done from the frontend.



## API Access and local usage

To run the App on your local machine, you need access to some APIs:

* [Meetup API](https://secure.meetup.com/meetup_api/key/) - requires a standard Meetup account
* [NASA API](https://api.nasa.gov/) - requires some information (email, name, reason)
* [ISS API](<http://open-notify.org/Open-Notify-API/ISS-Location-Now/>) - Get the ISS position - free to use
* [Twitter API](<https://developer.twitter.com/en/docs.html>) - requires some research in the docs and sending around a bearer token
* [Apixu](<https://www.apixu.com/>) - Weather API. No log in required
* [BVG Rest API](https://1.bvg.transport.rest) - Public Transport API. No log in required
* [Quotes REST API](<https://quotes.rest/>) - some free features
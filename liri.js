// using dotenv package to get enviromment variables
require("dotenv").config();

// access spotify API key stored in keys.js
var keys = require("./keys.js");

// node-spotify-api NPM package 
var Spotify = require("node-spotify-api");

// access spotify with API keys
var spotify = new Spotify(keys.spotify);

// request npm package
var request = require("request");

// read/write FS package
var fs = require("fs");

// moment npm package - format dates
var moment = require("moment");

// create a function for `concert-this`command

var getEvents = function(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

      // Call API and get data
    request(queryURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            if (!data.length) {
                console.log("Sorry, we can't find event for this artist.");
                return;
            }
            console.log("-----" + artist + "-----");
            for (var i = 0; i < data.length; i++) {
                var event = data[i];
                console.log("#"+ parseInt(i + 1));
                console.log("Venue: " + event.venue.name);
                console.log("Location: " + event.venue.city + ", " + event.venue.country);
                console.log("Date: " + moment(event.datetime).format("MM/DD/YYYY"));
                console.log("------------------------------------------------");
            }
        }   
    });
};



// choose command line
var command = function(chosenCommand, keyword) {
    switch (chosenCommand) {
    case "concert-this":
      getEvents(keyword);
      break;
    case "spotify-this-song":
      getSongs(keyword);
      break;
    case "movie-this":
      getMovie(keyword);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI doesn't know that");
    }
};

//pass command argument into command function
command(process.argv[2], process.argv.slice(3).join(" "));
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
                var showEvent = "Sorry, we can't find event for this artist."
                console.log(showEvent);
                return;
            }
            console.log("-----" + artist + "-----");
            for (var i = 0; i < data.length; i++) {
                var event = data[i];
                // create a showEvent as a string containing all the data we will print to the console
                var showEvent= [
                  "\n#"+ parseInt(i + 1),
                  "Venue: " + event.venue.name,
                  "Location: " + event.venue.city + ", " + event.venue.country,
                  "Date: " + moment(event.datetime).format("MM/DD/YYYY"),
                  "------------------------------------------------"
                ].join("\n");
                // Append showEvent to log.txt, print showEvent to the console
                fs.appendFile("log.txt", showEvent, function(err) {
                  if (err) throw err;
                });
                console.log(showEvent);
            }
        }   
    });
};

// create a function for `spotify-this-song`command

// get artist name
function getArtists(artist){
    return artist.name;
  }
  
// Call API and generate terminal scripts  
var getSongs = function(songName) {
    //Default search (if no song generateCommand): "The Sign" by Ace of Base
    if (songName === '') {
      // Set up default parameter 
      defaultsong = '"The Sign" by Ace of Base'
      spotify.search(
        {
          type: "track",
          query: defaultsong,
        },
        function(err, data) {
          if (err) {
            console.log("Error occurred: " + err);
            return;
          }
          var songs = data.tracks.items;
          var showEvent= [
            "------------------------------",
            "Suggested song:",
            '"' + songs[0].name + '" by ' + songs[0].artists.map(getArtists),
            "Visit: " + songs[0].preview_url,
            "------------------------------"
          ].join("\n")
          // Append showEvent to log.txt, print showEvent to the console
          fs.appendFile("log.txt", showEvent, function(err) {
            if (err) throw err;
          });
          console.log(showEvent);
        }
      );
    } 
    // if song Command, set up input(songName) as the parameter 
    else {
      spotify.search(
        {
          type: "track",
          query: songName,
        },
        function(err, data) {
          if (err) {
            console.log("Error occurred: " + err);
            return;
          }
          var songs = data.tracks.items;
            console.log("------------------------------")
          for (var i = 0; i < songs.length; i++) {
            var showEvent= [
              i + 1,
              "Artist Name: " + songs[i].artists.map(getArtists),
              "Song: " + songs[i].name,
              "Visit: " + songs[i].preview_url,
              "Album: " + songs[i].album.name,
              "------------------------------"
            ].join("\n")
            // Append showEvent to log.txt, print showEvent to the console
            fs.appendFile("log.txt", showEvent, function(err) {
            if (err) throw err;
            });
          console.log(showEvent);
          }
        }
      );
    }
};

// create a function for `movie-this`command

var getMovie = function(movieName) {
    //Default search (if no movie generateCommand): 'Mr. Nobody.'
    if (movieName === "") {
      nomovie = "Mr Nobody";
      var urlHit =
      "http://www.omdbapi.com/?t=" + nomovie + "&y=&plot=full&tomatoes=true&apikey=trilogy";
      
      request(urlHit, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var jsonData = JSON.parse(body);
          var showEvent= [
            "If you haven't watched " + '"Mr. Nobody"'+  ", then you should visit: " + jsonData.Website,
            "It's on Netflix"
          ].join("\n")
          // Append showEvent to log.txt, print showEvent to the console
          fs.appendFile("log.txt", showEvent, function(err) {
            if (err) throw err;
          });
          console.log(showEvent);
        }
      });
    } 
    else {
      var urlHit =
      "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
      request(urlHit, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var jsonData = JSON.parse(body);
          var showEvent= [
            "Moive title: " + jsonData.Title,
            "Released Year: " + jsonData.Year,
            "IMDB Rating: " + jsonData.imdbRating,
            "Rotten Tomatoes Rating: " + jsonData.tomatoRating,
            "Country: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors: " + jsonData.Actors,
            "------------------------------"
          ].join("\n")
          // Append showEvent to log.txt, print showEvent to the console
          fs.appendFile("log.txt", showEvent, function(err) {
            if (err) throw err;
          });
          console.log(showEvent);
        }
      });
    }
  };

// creat a function for `do-what-it-says`command

var doWhatItSays = function() {
    //LIRI will take the text inside of random.txt 
    fs.readFile("random.txt", "utf8", function(error, data) {
      
      // Data from the text file
      var dataArr = data.split(",");
  
      //Getting command with keyword input
      if (dataArr.length === 2) {
        command(dataArr[0], dataArr[1]);
      } 
      //Getting command without keyword input
      else if (dataArr.length === 1) {
        command(dataArr[0]);
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
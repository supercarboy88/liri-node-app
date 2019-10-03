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
                var showError = "Sorry, we can't find event for this artist."
                console.log(showError);
                return;
            }
            console.log("-----" + artist + "-----");
            for (var i = 0; i < data.length; i++) {
                var event = data[i];
                var showEvent = [
                  "#"+ parseInt(i + 1),
                  "Venue: " + event.venue.name,
                  "Location: " + event.venue.city + ", " + event.venue.country,
                  "Date: " + moment(event.datetime).format("MM/DD/YYYY"),
                  "------------------------------------------------"
                ].join("\n");
                fs.appendFile("log.txt", showEvent, function(err) {
                  if (err) throw err;
                console.log(showEvent);
                });
            }
        }   
    });
};

// create a function for `spotify-this-song`command

// get artist name
function getArtists(artist){
    return artist.Name;
  }
  
// Call API and generate terminal scripts  
var getSongs = function(songName) {
    //Default search (if no song generateCommand): "The Sign" by Ace of Base
    if (songName === '') {
      // Set up default parameter 
      nosong = 'album:the+sign%20artist:ace+of+base'
      spotify.search(
        {
          type: "track",
          query: nosong,
        },
        function(err, data) {
          if (err) {
            console.log("Error occurred: " + err);
            return;
          }
          var songs = data.tracks.items;
          console.log("------------------------------")
          console.log("Suggested song:")
          console.log('"' + songs[0].name + '" by ' + songs[0].artists.map(getArtists));
          console.log("Visit: " + songs[0].preview_url )
          console.log("------------------------------")
        }
      );
    } 
    // if song generateCommand, set up input(songName) as the parameter 
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
            console.log(i + 1)
            console.log("Artist Name: " + songs[i].artists.map(getArtists));
            console.log("Song: " + songs[i].name);
            console.log("Visit: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log("------------------------------")
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
          console.log("If you haven't watched " + '"Mr. Nobody"'+  ", then you should visit: " + jsonData.Website);
          console.log("It's on Netflix")
        }
      });
    } 
    else {
      var urlHit =
      "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
      request(urlHit, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var jsonData = JSON.parse(body);
          console.log("------------------------------")
          console.log("Moive title: " + jsonData.Title);
          console.log("Released Year: " + jsonData.Year);
          console.log("IMDB Rating: " + jsonData.imdbRating);
          console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
          console.log("Country: " + jsonData.Country);
          console.log("Language: " + jsonData.Language);
          console.log("Plot: " + jsonData.Plot);
          console.log("Actors: " + jsonData.Actors);
          console.log("------------------------------")
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
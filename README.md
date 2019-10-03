# liri-node-app

### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Node packages used in this app: 
* [npm init](https://docs.npmjs.com/cli/init)
* [npm i require](https://www.npmjs.com/package/require)
* [npm i request](https://www.npmjs.com/package/request)
* [npm i moment](https://www.npmjs.com/package/moment)
* [npm i dotenv](https://www.npmjs.com/package/dotenv)
* [npm i node-spotify-api](https://www.npmjs.com/package/node-spotify-api)

## App design:
- LIRI will be a command line node app that takes in parameters and gives you back data.
- Users have to run *`node liri.js'* + one of the following commands in the terminal to interact with LIRI
   * `concert-this`
   * `spotify-this-song`
   * `movie-this`
   * `do-what-it-says`

## How does each LIRI command work?

## [CLICK HERE](https://supercarboy88.github.io/liri-node-app/DEMO-VIDEO.mp4) TO SEE DEMO VIDEO

### `concert-this`
* Run `node liri.js concert-this <artist/band name here>`
* LIRI will return *Bands in Town* search results for concerts


### `spotify-this-song`
* Run `node liri.js spotify-this-song <song name here>`
* LIRI will return *Spotify* search results for songs
  

### `movie-this`
* Run `node liri.js movie-this <movie name here>`
* LIRI will return *OMDB* search results for movies.

### `do-what-it-says`
* Run `node liri.js do-what-it-says`
* LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

### API used:
* [bandsintown](https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0)
* [Spotify](https://developer.spotify.com/documentation/web-api/)
* [OMDb API](https://www.omdbapi.com/)
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");
var fs = require("fs");
var keys = require('./keys.js');

var client = new Twitter(keys);

var command = process.argv[2];

function songSearch(song, pos){
spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
  if ( err ) {
      console.log('Error occurred: ' + err);
      return;
  }

  var artist = data.tracks.items[pos].artists[0].name;
  var song = data.tracks.items[pos].name;
  var link = data.tracks.items[pos].preview_url;
  var album = data.tracks.items[pos].album.name;

  var detail = {
    Artist: artist,
    Song: song,
    Preview_Link: link,
    Album: album
  }

  for(x in detail){
    console.log(x +": "+ detail[x]);
  }
});
}

if(command==='my-tweets'){
var twitId = process.argv[3];
var options = {screen_name: twitId, count: 21}

client.get('statuses/user_timeline', options, searchedData);
  function searchedData(err, data, response) {
    if(err){
      console.log(err);
    } else {
      for(var i=1; i<options.count; i++) {
      var tweetTime = JSON.stringify(data[i].created_at, null, 2);
      var tweets = JSON.stringify(data[i].text, null, 2);
      console.log(i+"." + tweetTime + tweets);
      }
    }
  }
}

else if(command==='spotify-this-song'){
  var song = process.argv[3];


 if(song===""){
   song2 = "the sign";
   songSearch(song2, 2);
 } else {
   songSearch(song, 0);
 }
}

else if(command==='movie-this'){
  var movie = process.argv[3];

  function movieDisplay(movie){
  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

  request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

  var title = JSON.parse(body).Title;
  var year = JSON.parse(body).Year;
  var rated = JSON.parse(body).Rated;
  var country = JSON.parse(body).Country;
  var language = JSON.parse(body).Language;
  var plot = JSON.parse(body).Plot;
  var actors = JSON.parse(body).Actors;
  var tomatoes = JSON.parse(body).Ratings[1].Value;
  }

  var detailMovie = {
    Title: title,
    Year: year,
    Rated: rated,
    Country: country,
    Language: language,
    Plot: plot,
    Actors: actors,
    RottenTomatoes: tomatoes
  }
  for(x in detailMovie){
    console.log(x +": "+ detailMovie[x]);
  }
});
}
  if(movie===""){
    movie2 = "mr nobody";
    movieDisplay(movie2);
  } else {
    movieDisplay(movie);
  }
}

else if(command==='do-what-it-says'){
  var fs = require("fs");

  fs.readFile("random.txt", "utf8", function(err, data) {

  var output = data.split(",");

    songSearch(output[1], 0);


});
}

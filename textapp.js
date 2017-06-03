//node app to search movies, twitter, songs and more

//instructions 
console.log("welcome to T.I.R.I - (text interface and recognition Interface");
console.log("---------------------------------------------------------------");
console.log("please enter a query in the following syntax:");
console.log("node tiri.js searchtype (movie, twitter, song, weather) search term");
console.log("---------------------------------------------------------------");


//request 
var request = require('request');
//spotify
var spotify = require('spotify');
// twitter
var twitter = require('twitter');
var weather = require('weather-js');
var twitterKeys = require('./keys.js');

//check what data type the user is searching
var searchType = process.argv[2];
//save the user's search terms
var searchTerm = process.argv[3];


if (searchType == "movie") {
	movie();
	console.log("movie selected: process request");
	if (searchTerm == null || searchTerm == "") {
		searchTerm = "mr nobody";
	}
}
else{}
////////////////////////////////////////////////////////////
 if (searchType == "twitter"){
	Twitter();
	console.log("twitter selected: processing request");
 }
 else{}
//////////////////////////////////////////////////////////// 	
 if (searchType == "song") {
	song();	
	console.log("song selected: processing request");
}
else{
}
/////////////////////////////////////////////////////////////
if (searchType == "weather") {
	Weather();
}

//movie function
function movie(){
	// console.log("movie function running");
	request("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=40e9cece", function(error, response,body ){	
		if (!error && response.statusCode === 200){
			console.log(searchTerm + " Year: " + JSON.parse(body).Year);
			console.log(searchTerm + " Staring: " + JSON.parse(body).Actors);
			console.log(searchTerm + " Plot: " + JSON.parse(body).Plot);
			console.log(searchTerm + " Rated: " + JSON.parse(body).Rated);
			// console.log(searchTerm + " IMDB: " + JSON.parse(body).Ratings.[0]Value);		
		}
	});
}

//twitter function
function Twitter(){
	var client = new Twitter({      //this is runnign infinetly and throwing an overflow error
  		consumer_key: twitterKeys.consumer_key,
  		consumer_secret: twitterKeys.consumer_secret,
  		access_token_key: twitterKeys.access_token,
  		access_token_secret: twitterKeys.access_token_secret,
	});
console.log("test linking js" + client.twitterKeys.consumer_key);
		var params = {screen_name: 'nodejs'};
		client.get('statuses/user_timeline',params, function(error, tweets, response) {
  			if (!error) {
    			console.log(tweets);
    			console.log("twitter call working");
  			}
		});
}

//spotify 			this is actually working - the api key just expires after 10 min
function song(){
		console.log("spotify function running");
//code here  
	spotify.search({ type: 'track', query:searchTerm}, function(err, data) {
    	if ( err ) {
    	    console.log('Error occurred: ' + err);
        	return;
    	}
    	for (var i = 0; i <= 20; i++) {
console.log("--------------------------------------------------------------------");    	 	
console.log(searchTerm + " Artist: " + data.tracks.items[i].album.artists[0].name);
console.log(searchTerm + " Title: " + data.tracks.items[i].album.name);
console.log(searchTerm + " preview: " + data.tracks.items[i].preview_url);
console.log("--------------------------------------------------------------------");
		}
	});
}
function Weather(){
weather.find({search: searchTerm, degreeType: 'F'}, function(err, result) {
  if(err) console.log(err);		//current is undefined *6/3*
 var currentTemp = result[0].current.temperature;
 var currentSky  = result[0].current.skytext;
  //console.log(JSON.stringify(result, null, 2));
console.log(searchTerm + " Temp is: " + currentTemp);
console.log(searchTerm + " weather is: " + currentSky);
});
}

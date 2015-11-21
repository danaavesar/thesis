console.log('Running node app.');
/*---------- BASIC SETUP ----------*/

var express = require('express'),
    bodyParser = require('body-parser');
var app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

//Express server
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    // See CORS at https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('incoming request from ---> ' + ip);
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);  // Show the URL user just hit by user
    next();
});

app.use('/', express.static(__dirname + '/public'));

/*-------------- APP --------------*/

/*----- Reading XML-----*/




 /*----- Alchemy -----*/
//alchemy
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

// Wrong!
// console.log(dataset);

//Document Sentiment
//var myText = "Whoa, AlchemyAPI's Node.js SDK is really great, I can't wait to build my APP!";
// alchemyapi.sentiment("text", textArray, {}, function(response){
//   console.log("Sentiment: " + response["docSentiment"]["type"]);
// });

function entities(passedHeadline, callback) {
  // for(var i=0; i< articles.length; i++){
  //     for(var j=0; j<articles[i].length; j++){
        var headline = passedHeadline;
        console.log(headline);
        alchemyapi.entities('text', headline,{ 'sentiment':1 }, function(response) {
          var entities = response['entities']; 
          console.log(response); 
          callback(entities);
        });
    //   }
    // }
  } 

function relations(passedHeadline, callback) {
  var headline = passedHeadline;
  console.log(headline);
  alchemyapi.relations('text', headline, {}, function(response) {
    var relations = response['relations'];
    console.log(response);
    callback(relations);
    
  });
}
 


/*
function concepts(){
  alchemyapi.concepts("text", textArray, {'sentiment': 1}, function(response){
    console.log('concepts' + response['concepts']);
  });
} 





function keywords(callback){
  alchemyapi.keywords("text", textArray, {'sentiment': 1}, function(response){
      var keyWords = response['keywords'];
      console.log(keyWords )
      callback(keyWords);
  }); 
}

  alchemyapi.keywords("text", textArray, {'sentiment': 1}, function(response){
      var keyWords = response['keywords'];
      console.log(keyWords.length )
  }); 
*/
/*----------- RESPOND -------------*/
app.post('/sendArticles', 
    function(request, response){
      var requestedHeadline = request.body['headline'];  
      var i = request.body['i'];
      relations(requestedHeadline, function(k){
          response.json({
            relations: k,
            i: i
          });

      });         
    }
);



/*---------- BASIC SETUP ----------*/
var PORT = 4000;
app.listen(PORT, function(){
  console.log('Express server is running at ' + PORT);
});
/*---------------------------------*/









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

/*-------------- SETUP LINK GRAMMAR --------------*/
var LinkGrammar = require(__dirname + "/build/index");
// Load module
var linkGrammar = new LinkGrammar();


 /*----- Alchemy -----*/
//alchemy
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();


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

// function concepts(){
//   alchemyapi.concepts("text", textArray, {'sentiment': 1}, function(response){
//     console.log('concepts' + response['concepts']);
//   });
// } 


function keywords(passedHeadline, callback){
  var headline = passedHeadline;
  alchemyapi.keywords("text", headline, {'sentiment': 1}, function(response){
      var keyWords = response['keywords'];
      console.log(keyWords);
      callback(keyWords);
  }); 
}
/*-------------- LINK GRAMMAR FUNCTION--------------*/
function getGrammar(headline, callback){

  //now we make the text into linkage object
  console.log(headline);
  var linkage = linkGrammar.parse(headline);
  //console.log(linkage.words);
  var tree = linkage.getTree();
  var subjects = linkage.linksByLabel('S'); //S+ connect subject nouns to their verbs: http://www.link.cs.cmu.edu/link/dict/section-S.html
  var links = linkage.getLinks();
  var words = linkage.getWords();
  
  // console.log(tree);
  // console.log(subjects);
  console.log(words);
  // console.log(tree);
  // for(var i=0; i< linkage.words.length; i++){
  //  //console.log(linkage.words[i].type);
  //  if(linkage.words[i].type == 'n'){
  //    var n = linkage.words[i].type;
  //    console.log(linkage.words[i].word);
  //  }
  // }
  callback(tree);


  //console.log(links.left);
}


/*----------- RESPOND -------------*/
app.post('/getRelations', 
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

app.post('/getKeywords', 
    function(request, response){
      var requestedHeadline = request.body['headline']; 
      var i = request.body['i']; 
      keywords(requestedHeadline, function(k){
          response.json({
            keyWords: k,
            i: i
          });
      });         
    }
);

app.post('/LinkGrammar', 
    function(request, response){
      var requestedHeadline = request.body['headline']; 
      var i = request.body['i']; 
      getGrammar(requestedHeadline, function(k){
          response.json({
            response: k,
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









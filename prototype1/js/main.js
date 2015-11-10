
var app = app || {};
var queryWords = [];
var headlines = [];

app.main = (function(){

	var attachEvents = function(){
		console.log('attaching events.');
		//change the value options in the input on keypress
		$('#select').keypress(function(key) {

		    if(key.charCode != 38 || key.charCode != 39){
		        return false; //dont let the user input anything in the input
		    }
		});
		var change = -1;
		var valueOptions = ['United States', 'Israel', 'Both']
		$("#up_arrow").click(function(){
				if(change > 2){ //go back to the first pos in the array once you reach the end
		    		change = 0;
				}
		    	change ++;
		    	$('#select').val(valueOptions[change]);    	
		});		
		$("#down_arrow").click(function(){
		    	change --;
		    	if(change < 0){
		    		change = 2;
				}
		    	$('#select').val(valueOptions[change]);
		});	
		$('#enter').click(function(){
			var wordQuery = $('#myQuery-box').val();
			var values = [] 
			getXML(change, wordQuery);
		});
		$('#compare').click(function(){
			comparison(wordQuery);
		});

		
	}

	
	var getXML = function(choice, _wordQuery){

		var sourceChoices = [ 		
		//american news this might be scewed depending on which feeds for each paper...
		 	{
				aljazeeraAmericaURL: "http://america.aljazeera.com/content/ajam/articles.rss",
				cnnURL: "http://rss.cnn.com/rss/cnn_topstories.rss",
				foxNews: "http://feeds.foxnews.com/foxnews/latest",
				huffPost: "http://www.huffingtonpost.com/feeds/news.xml",
				abcNews: "http://feeds.abcnews.com/abcnews/topstories",
				nyTimes: {world: "http://rss.nytimes.com/services/xml/rss/nyt/World.xml", US: "http://rss.nytimes.com/services/xml/rss/nyt/US.xml"}		

			},
		//israeli news
			{
				globesURL: "http://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=1725",
				haaretzURL: "http://www.haaretz.com/cmlink/1.263335",
				ynetURL: "http://www.ynet.co.il/Integration/StoryRss3082.xml",
				
			}
		]
		
		var countryChoice = sourceChoices[choice];
		var cleanedArray = [];
		var values;
		//iterate through all the keys of the selected object
		for(var newsSite in countryChoice){ //this loops makes the whole program run three times for each sourcechoice
			URL = countryChoice[newsSite];
			console.log('searching through: ' + URL);
			$.ajax({
				type: "GET",
				url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(URL),
				dataType: "json",
				error: function(){
	            	alert('Unable to load feed, Incorrect path or invalid feed');
	       		},
	        	success: function(xml){
	            	values = xml.responseData.feed.entries;
	            	 console.log(values);
	            	 
	            	parseData(values, _wordQuery);
	            	// countWords(queryWords);
	            	//cleanedArray.push(values);
	        	}
			});

			
			// console.log(cleanedArray);
		}

	};
	//get all the headlines and put them into an object, check for duplicates
	var parseData = function(values, wordQuery){
		var sourceHeadlines = [];
		//loop through every object in the response for that source
			for(var key in values){
				//loop through every key in the object(each object is an article)
				//defnie title and contentSnippet
				for(var key2 in values[key]){
					if(key2 == 'contentSnippet'){
						if(values[key][key2] != ""){
							var contentSnippet = (values[key][key2]).toString();
						}
					}
					if(key2 == 'title'){
						if(values[key][key2] != ""){
							var title = (values[key][key2]).toString();
						}
					}
					 if(key2 == 'publishedDate'){
					 	var date = values[key][key2];
					 }
				
					//take the longer one and set it equal to headline
					// if(contentSnippet.length > title.length){
					// 	var headline = contentSnippet;
					// }else{
					// 	headline = title;
					// }

				}
				// console.log(date);
					var headline = title;
					sourceHeadlines.push(headline);
				//insert all the headlines in an array
				

			} 
			
			//console.log('sourceHeadlines: '+ sourceHeadlines);
			searchWord(sourceHeadlines, wordQuery);
			//getWords(sourceHeadlines);
	};

	var searchWord = function(sourceHeadlines, wordQuery){
		for(var i=0; i<sourceHeadlines.length; i++){
			if(sourceHeadlines[i].indexOf(wordQuery) != -1){ //check to see if query is in headline
				var sourceHeadlinesQueryWords = sourceHeadlines[i].split(" ");
				queryWords.push(sourceHeadlinesQueryWords);
				 console.log(sourceHeadlinesQueryWords);			
			}
		}
		countWords(queryWords);

		// console.log(sourceHeadlinesQueryWords);
	};
	

	var countWords = function(queryWords){
		// console.log(queryWords);
		var sourceWordCount = {};
		var wordsDontWant = "i'm, as, of, to, in, I, me, he, she, herself, you, it, that, they, each, few, many, who, whoever, whose, someone, everybody, the, and, but";
		for(var i=0; i<queryWords.length; i++){
				for(var j=0; j<queryWords[i].length; j++){//these are each headline
					var word = queryWords[i][j];
					//if the word is not present in wordsDontWant string
					if(wordsDontWant.indexOf(word) == -1){
						if(!sourceWordCount.hasOwnProperty(word)){
							sourceWordCount[word] = {};
							sourceWordCount[word]['count'] = 1;
						}else{
							 sourceWordCount[word]['count'] ++;
						}
					}
				}
			}
			console.log(sourceWordCount);
		append(sourceWordCount);
		 
		
	};
	

	var append = function(countsObj){
		$('#canvas').empty();
		for(var key in countsObj){
			
			// if(countsObj[key] > 1){
			// 	thingToAppend = "<b><span style='font-size: 30'>" + key + "</span><b>";
			// }else{
			// 	thingToAppend = key;
			// }
			for(var count in key){
				// var map = function ( in_min , in_max , out_min , out_max ) {
			 //  		return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
				// }
				 // var fontSize = parseInt(key[count])
				 var in_min = 1;
				 var in_max = 20;
				 var out_min = 10;
				 var out_max = 100;
				 console.log(count);
				 var fontSize = (parseInt(count) - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
				 // fontSize.map(0,20, 20,40);
				 // console.log(fontSize);
			}
			var newDiv = $("<div/>");
			$(newDiv).attr('style','font-size:'+fontSize).addClass('word').html(key);
			
			$('#canvas').append(newDiv);
		}
	}

	//which words appear most in all the papers?

	var init = function(){
		console.log('Initializing app.');
		attachEvents();
	};


		return { //returning is so that the other app can read it
			init: init
		};

})();

window.addEventListener('DOMContentLoaded', app.main.init);







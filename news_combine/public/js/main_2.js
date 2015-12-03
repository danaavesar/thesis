/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');
	var totalFeeds;
	var rawData = {};
	var headlineArray = [];
	var sources=[
	//american news this might be scewed depending on which feeds for each paper...
	 	{
			aljazeeraAmericaURL: "http://america.aljazeera.com/content/ajam/articles.rss",
			cnnURL: ["http://rss.cnn.com/rss/cnn_topstories.rss", "http://rss.cnn.com/rss/cnn_world.rss", "http://rss.cnn.com/rss/cnn_us.rss"],
			foxNews: "http://feeds.foxnews.com/foxnews/latest",
			huffPost: "http://www.huffingtonpost.com/feeds/news.xml",
			abcNews: ["http://feeds.abcnews.com/abcnews/topstories","http://feeds.abcnews.com/abcnews/internationalheadlines", "http://feeds.abcnews.com/abcnews/usheadlines", "http://feeds.abcnews.com/abcnews/politicsheadlines", "http://feeds.abcnews.com/abcnews/blotterheadlines", "http://feeds.abcnews.com/abcnews/thelawheadlines", "http://feeds.abcnews.com/abcnews/moneyheadlines", "http://feeds.abcnews.com/abcnews/technologyheadlines", "http://feeds.abcnews.com/abcnews/healthheadlines", "http://feeds.abcnews.com/abcnews/entertainmentheadlines", "http://feeds.abcnews.com/abcnews/travelheadlines", "http://feeds.abcnews.com/abcnews/sportsheadlines", "http://feeds.abcnews.com/abcnews/worldnewsheadlines", "http://feeds.abcnews.com/abcnews/2020headlines", "http://feeds.abcnews.com/abcnews/primetimeheadlines", "http://feeds.abcnews.com/abcnews/nightlineheadlines", "http://feeds.abcnews.com/abcnews/gmaheadlines", "http://feeds.abcnews.com/abcnews/thisweekheadlines"],
			nyTimes: ["http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml", "http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml",  "http://rss.nytimes.com/services/xml/rss/nyt/World.xml", "http://rss.nytimes.com/services/xml/rss/nyt/US.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Education.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Politics.xml", "http://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml", "http://cityroom.blogs.nytimes.com/feed/", "http://fort-greene.thelocal.nytimes.com/feed/", "http://rss.nytimes.com/services/xml/rss/nyt/Business.xml", "http://rss.nytimes.com/services/xml/rss/nyt/EnergyEnvironment.xml", "http://rss.nytimes.com/services/xml/rss/nyt/InternationalBusiness.xml", "http://rss.nytimes.com/services/xml/rss/nyt/SmallBusiness.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Economy.xml", "http://www.nytimes.com/services/xml/rss/nyt/Dealbook.xml", "http://rss.nytimes.com/services/xml/rss/nyt/MediaandAdvertising.xml", "http://rss.nytimes.com/services/xml/rss/nyt/YourMoney.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml", "http://bits.blogs.nytimes.com/feed/", "http://rss.nytimes.com/services/xml/rss/nyt/PersonalTech.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Sports.xml", "http://rss.nytimes.com/services/xml/rss/nyt/InternationalSports.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Baseball.xml", "http://www.nytimes.com/services/xml/rss/nyt/CollegeBasketball.xml", "http://www.nytimes.com/services/xml/rss/nyt/CollegeFootball.xml", "http://www.nytimes.com/services/xml/rss/nyt/Golf.xml", "http://www.nytimes.com/services/xml/rss/nyt/Hockey.xml", "http://www.nytimes.com/services/xml/rss/nyt/ProBasketball.xml", "http://www.nytimes.com/services/xml/rss/nyt/ProFootball.xml", "http://www.nytimes.com/services/xml/rss/nyt/Soccer.xml", "http://www.nytimes.com/services/xml/rss/nyt/Tennis.xml", "http://gambit.blogs.nytimes.com/feed/", "http://www.nytimes.com/services/xml/rss/nyt/Science.xml", "http://www.nytimes.com/services/xml/rss/nyt/Environment.xml", "http://www.nytimes.com/services/xml/rss/nyt/Space.xml", "http://www.nytimes.com/services/xml/rss/nyt/Health.xml", "http://www.nytimes.com/services/xml/rss/nyt/Research.xml", "http://www.nytimes.com/services/xml/rss/nyt/Nutrition.xml", "http://www.nytimes.com/services/xml/rss/nyt/HealthCarePolicy.xml", "http://www.nytimes.com/services/xml/rss/nyt/Views.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Arts.xml", "http://www.nytimes.com/services/xml/rss/nyt/InternationalArts.xml", "http://rss.nytimes.com/services/xml/rss/nyt/ArtandDesign.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Books.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Dance.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Movies.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Music.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Television.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Theater.xml", "http://artsbeat.blogs.nytimes.com/feed/", "http://carpetbagger.blogs.nytimes.com/feed/","http://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml","http://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml", "http://rss.nytimes.com/services/xml/rss/nyt/DiningandWine.xml", "http://rss.nytimes.com/services/xml/rss/nyt/HomeandGarden.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Weddings.xml", "http://rss.nytimes.com/services/xml/rss/nyt/tmagazine.xml", "http://parenting.blogs.nytimes.com/feed/", "http://rss.nytimes.com/services/xml/rss/nyt/Travel.xml", "http://topics.nytimes.com/top/features/travel/columns/frugal_traveler/index.html?rss=1", "http://www.nytimes.com/services/xml/rss/nyt/JobMarket.xml", "http://rss.nytimes.com/services/xml/rss/nyt/RealEstate.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Commercial.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Automobiles.xml"],	//just world feed
			globesURL: "http://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=1725",
			haaretzURL: "http://www.haaretz.com/cmlink/1.263335",
			ynetURL: "http://www.ynet.co.il/Integration/StoryRss3082.xml",
			khamaPress: "http://www.khaama.com/feed", //afghanistan
			wafa: "http:english.wafa.ps/rss.php", //palestinian
			reuters: 	["http://feeds.reuters.com/reuters/topNews", "http://feeds.reuters.com/Reuters/domesticNews", "http://feeds.reuters.com/Reuters/worldNews","http://feeds.reuters.com/reuters/MostRead"],
			usNewssWorldReport: "http://www.usnews.com/rss/news",
			bbc: ["http://feeds.bbci.co.uk/news/rss.xml", "http://feeds.bbci.co.uk/news/world/rss.xml", "http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml"],
			washingtonPost: ["http://feeds.washingtonpost.com/rss/rss_election-2012", "http://feeds.washingtonpost.com/rss/rss_powerpost"],
			independent: "http://www.independent.co.uk/news/world/rss", //world feed
			guardian :["http://www.theguardian.com/world", "http://www.theguardian.com/us"], //world and us
			vice: ["http://www.vice.com/rss", "http://www.vice.com/en_ca/rss"], //us, canada
			laTimes: "http://www.latimes.com/rss2.0.xml",
			cbsNews: "http://www.cbsnews.com/latest/rss/main", //top stories
			jPost: ["http://www.jpost.com/Rss/RssFeedsFrontPage.aspx", "http://www.jpost.com/Rss/RssFeedsHeadlines.aspx", 	'http://www.jpost.com/Rss/RssFeedsIsraelNews.aspx','http://www.jpost.com/Rss/RssFeedsArabIsraeliConflict.aspx', 	'http://www.jpost.com/Rss/RssFeedsMiddleEastNews.aspx' ], //front page, Home, BreakingNews, Arab-Israeli Conflict, Middle East
			atlantic: "http://feeds.feedburner.com/TheAtlantic?format=xml",
			gothamist: "http://gothamist.com/news/index.xml",
			i24: ["http://www.i24news.tv/en/news/international.xml", "http://www.i24news.tv/en/news/israel/politics.xml"],
			wsj: "http://www.wsj.com/xml/rss/3_7085.xml", //wall street journal
			bostonGlobe: ["http://feeds.boston.com/boston/topstories", "http://feeds.boston.com/boston/mostpopular"]
		}
	];

	var attachEvents = function(){
		console.log('attaching events.');
		//some selector will go here but for now im setting countrychoice
		//var countryChoice = sources[0];
		var query = "Israel";
		getXML(sources[0],query);
	}

	var getFeedCount = function(){
		var feedIndex = 0;
		for(var company in sources[0]){
			if(Array.isArray(sources[0][company])){
				for(var i = 0; i < sources[0][company].length; i++){
					feedIndex ++;
				}
			}else{
				feedIndex ++;
			}
		}
		console.log("Feed index: " + feedIndex);
		return feedIndex;
	}

	var getXML = function(sources,query){
		console.log(totalFeeds);
		var index = 0;
		var length = Object.keys(sources).length
		console.log('Amount of news sources: ' + length);
		//iterate through all the keys of the selected object
		for(var newsSite in sources){ //this loops makes the whole program run three times for each sourcechoice
			//if the source choice is an array then getXML for each source in the array
			if($.isArray(sources[newsSite])){
				for(var i=0; i<sources[newsSite].length; i++){ 
					var URL = sources[newsSite][i];
					console.log('searching through: ' + URL);
					callApi(URL, function(){
						searchQuery(query);
					});
				}
			}else{ //there is only one rss feed for this source
				URL = sources[newsSite];
				console.log('searching through: ' + URL);
				callApi(URL, function(){

				});

			 }
			
			function callApi(newsSite, callback){
				$.ajax({
					type: "GET",
					url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(URL),
					dataType: "json",
					indexValue: newsSite, //the name of the source
					error: function(){
						index ++;
						console.log(index);
		            	alert('Unable to load feed, Incorrect path or invalid feed');
		       		},
		       		
		        	success: function(xml){
		        		index ++;
		        		console.log(index);
		        		func(xml, this.indexValue);
		        		function func(data, site){
			            	data = xml.responseData.feed.entries;
			            	if(rawData.hasOwnProperty(site)) {
			            		for(var i=0; i<data.length; i++){
			            			rawData[site].push(data[i]); //push the data into rawData unless it already has it in there
			            		}
			            	}else{           	 
								rawData[site] = data; //add source name as a key for each value
			            	}
			            	console.log("The results for: " + site + " are: " + rawData);

		            	}//end of func 
		            	if(index == totalFeeds){
		            		callback();
		            	}
		        	} //end of success
				})
			}//end of function callApi
		} //end of for in loop
	
	} //end of getXML

	var searchQuery = function(query, callback){
		console.log("searchQuery function initiated");
		var headline;
		console.log(rawData);
		console.log(headlineArray);
		for(var feed in rawData){
			var values = rawData[feed]; //this is an array of objects
			for(var i=0; i<values.length; i++){ //loop throuch each object
				headline = values[i].title; //gets the title of each article in the object
				var date = values[i].publishedDate;
				var link = values[i].link;
				if(headline.indexOf(query) > -1){ //if the title has the query word in it
					//console.log(feed + headline);
					var alreadyInArray = false;
					if(headlineArray > 0){ //if the array is greater than 0 first check to see if the headline is already in there
						for (var j = 0; j < Things.length; j++) {
							if(headlineArray[j]['headline'] == headline){
								alreadyInArray == true;
							}
						};
					}

					if(alreadyInArray == false){
						headlineArray.push({'headline': headline, 'date': date, 'link': link, 'source': feed});
					}
				}
			}
				
		}
		//console.log("the headlines ind(headlineArray) with the query world are: " + headlineArray);
		console.log(headlineArray);	
		//getKeywords();
		linkGrammar();	
	} //end of searchQuery function

	var getKeywords = function(callback){
		console.log('getKeywords function initiated');
		var count = 0;
		for (var i = 0; i < headlineArray.length; i++) {	
		var headline = headlineArray[i].headline;	
			$.post('/getKeywords', //the address. post request
			 	{
			 		headline: headline,
			 		i: i
			 	},										// the data im sending
			 	function(response){ 
			 		count ++;
			 		//console.log(response.keyWords);
				 	var index = response.i;
				 	headlineArray[index]['keywords'] = response.keyWords;
			 		//attach the keywords to the headlineArray
			 		
			 		if(count == headlineArray.length){
			 			console.log(headlineArray);
			 			console.log("done getting keywords");
			 			linkGrammar();
			 			
			 		}
			 	}
			);
		}
		

	}


	var fixHeadline = function(headline){
			var wordsToLeaveCapital = ["Israel", "Egypt", "Brazil", "Greece", "Sudanese", "Palestinian", "Sudan", "Russia" , "Tel Aviv", "Likud" , "ISIS", "Obama", "United Arab Emirates", "Argentina", "Tunisia", "Tunisian", "Paris", "Hollande", "France", "Muslim", "Islam", "Trump"];
			var wordArray = headline.split(" ");
			console.log(wordArray);
			for(var i=0; i<wordArray.length; i++){
				var found = false;
				for(var b = 0; b< wordsToLeaveCapital.length; b++){
					//if the word Array has no words in it fromt he headline, or the headline has no words in it from the word array
					if((wordArray[i].indexOf(wordsToLeaveCapital[b])) == -1 ){
						found = true; 
						if(b == wordsToLeaveCapital.length -1 && found == true){
							wordArray[i] = wordArray[i].toLowerCase();
						}	
					}else{
						break;
					}
				}
			}
			var cleanHeadline = wordArray.join(" ");
			cleanHeadline = headline.toLowerCase();
			if(cleanHeadline.indexOf(":") > -1){ 
				cleanHeadline = cleanHeadline.replace(":", " says");
			}
			if(cleanHeadline.indexOf("'") > -1){ 
				cleanHeadline = cleanHeadline.replace(/'/g, "");
			}

			return cleanHeadline;
	}

	var linkGrammar = function(callback){
		console.log('get grammar function initiated');
		var count = 0;
		console.log('length of headlineArray ' + headlineArray.length);
		for (var i = 0; i < headlineArray.length; i++) {
				var headline = headlineArray[i].headline;
				var cleanHeadline = fixHeadline(headlineArray[i].headline);	//make everything undercase		
				console.log(cleanHeadline + " | " + headline);
				$.ajax({
					type: "POST",
					url:  '/linkGrammar', //the address. post request
				 	data:{
					 		headline: cleanHeadline,
					 		i: i
				 		},
				 	error: function(XMLHttpRequest, textStatus, errorThrown){
				 		count ++;
				 		if(count == headlineArray.length){
				 			console.log(headlineArray);
				 			console.log("done with linkGrammar");
				 			//selectionEvent();
				 			appendRelations(2);
				 		}
				 	},
				 	success: function(response){ 
				 		count ++;
				 		console.log(count);
				 		console.log(JSON.stringify(response.response));
				 		var index = response.i;
				 		headlineArray[index]['grammar'] = response.response;
				 		console.log(headlineArray[index]);

				 		if(count == headlineArray.length){
				 			console.log(headlineArray);
				 			console.log("done with linkGrammar");
				 			appendRelations(2);
				 			// selectionEvent();
				 		}
				 	},

				});		
			}

	}

	var selectionEvent = function(query){
		console.log("selection Event initiated, waiting for user to select headline");
		//now we determine which is the main headline
		//demo version it will be 3;
		
		var selected = 2;
		// attachMain(selected);
		console.log("user selected " + selected);
		findSimilarHeadlines(selected, query);
		appendMain(selected);
	}

	var findSimilarHeadlines = function(selected, query){
		console.log("findSimilarHeadlines function initiated, comparing keywords");
		 console.log(headlineArray[selected].headline);
		 headlineArray[selected]['commonHeadlines'] = [];

		if(headlineArray[selected].keywords != null){
			/*1. loop through all the headlines */	
			for(var j=0; j< headlineArray.length; j++){
				var commonKeywordArray = [];
				var common = false;
			 	///skip the selected headline and dont do this if the headline doesnt have keywords
			 	if(j != selected && headlineArray[j].keywords != null){
				 	/*loop through the keywords of the headline*/
				 	for(var k=0; k <headlineArray[j].keywords.length; k++){
				 		var headlineKeyword = headlineArray[j].keywords[k].text;
				 		/*loop through each keyword of the main headline selected*/
				 		for(var i = 0; i< headlineArray[selected].keywords.length; i++){
				 			var mainKeyword = headlineArray[selected].keywords[i].text;
				 			/*check to see if the keywords match*/
				 			if(headlineKeyword.indexOf(mainKeyword) > -1 && headlineKeyword.indexOf(query) < 0 || mainKeyword.indexOf(headlineKeyword) > -1 && mainKeyword.indexOf(query) < 0){
				 				commonKeywordArray.push(mainKeyword);
				 				common = true;
				 			}
				 		}
				 		
				 	} //done looping through keywords of j
				 	if(common){
				 		logThisInfo(selected, headlineArray[j], commonKeywordArray);
				 	}
			 	} //closing the if statement
			} //end of the j loop 
		}
		else{
			console.log("keywords are undefined");
		}
			console.log(headlineArray);
			// appendRelations(selected);
	}


	var logThisInfo = function(selected, commonHeadline, commonKeywordArray){
		console.log(headlineArray[selected]['commonHeadlines'].length);
		var thingToPush = {
			'commonHeadline' : commonHeadline,
			'keywordsInCommon' : commonKeywordArray
		}
		headlineArray[selected]['commonHeadlines'].push(thingToPush);
		
	}



	var appendMain = function(selected){
		console.log("append main initiated");
		var mainDiv = $('<div/>').addClass('main-sentence').html(headlineArray[selected].headline);
		$('#main-headline').append(mainDiv);
		// appendRelations(selected);
	}

	var appendRelations = function(selected){
		//var commonHeadlines = headlineArray[selected]['commonHeadlines'];
		//i dont know how to sort them 
		//v, or S
		// for(var i=0; i<commonHeadlines.length; i++){
		// 	var grammar = commonHeadlines[i].commonHeadline.grammar.child;


		// }
		var grammar = headlineArray[5].grammar;
		var sentence = [];
		recursive(grammar, sentence);

		function recursive(obj,sentence){
				
				if(obj["label"] == "S"){

				recursive(obj["child"]);

				}else{
					if(obj["label"] == "NP" || obj["label"] == "VP"){
						recursive(obj["child"]);
					}
					else{
					//	sentence.push(obj["label"]);
						console.log(obj["label"]);
						if(obj["next"]){
							recursive(obj["next"]);
						}else{
							verb(headlineArray[5].grammar);
						}
						
					}
				}
				// console.log(sentence);
				
		}

	}

	 function verb(obj){

				if(obj["label"] == "S"){

				verb(obj["child"]);

				}else{
					if(obj["label"] == "NP"){
						/*is this right?*/
						if(obj["next"]){
							verb(obj["next"]); //go to next instead of child
						}else{
							console.log(obj["label"]);
							verb(obj["child"]);
						}
					}else {	
						if(obj["label"] == "VP" ){
							console.log(obj["label"]); // log VP
							verb(obj["child"]);	
						} 
						else{
							// sentence.push(obj["label"]);
							console.log(obj["label"]); //what the word is
							if(obj["next"]){
								verb(obj["next"]);
							}else{
								//ADVP(headlineArray[12].grammar,sentence);
							}

						}
						console.log(sentence);
						
					}
				}




	}

	// function ADVB(obj){
	// 	if(obj["label"] == "S"){

	// 			verb(obj["child"]);

	// 	}else{

	// 		if(obj["label"] == "NP"){
	// 			/*is this right?*/
	// 			if(obj["next"]){
	// 				verb(obj["next"]); //go to next instead of child
	// 			}else{
	// 				console.log(obj["label"]);
	// 				verb(obj["child"]);
	// 			}
	// 		}else {	
	// 			if(obj["label"] == "ADVP" ){
	// 				console.log(obj["label"]); // log VP
	// 				verb(obj["child"]);	
	// 			} 
	// 			else{
	// 				// sentence.push(obj["label"]);
	// 				console.log(obj["label"]); //what the word is
	// 				if(obj["next"]){
	// 					verb(obj["next"]);
	// 				}else{
	// 					ADVP(headlineArray[12].grammar,sentence);
	// 				}

	// 			}
	// 			console.log(sentence);
				
	// 		}
	// 	}

	// }



		// function eachRecursive(obj){
		//     for (var key in obj){
		//     	//obj["label"] gives the value of label
		//     	if(obj["label"] != "S"){
		//     		var label = obj["label"];
		//     		var word = obj["child"].label;
		//     		if(word == label){
		//     			word = obj["child"]["child"].label
		//     		}else{
		//     			word = obj["child"].label;
		//     		}
		//     		console.log(label + " " + word);
		//     		append(word, label);
		//     	}
		//     	//check if obj has a "next" in it
		//     	var next = false;
		//     	if(obj["next"]){
		//     		next = true;
		//     	}

		//     	if (obj["child"] && next == false){
		//         	//passing child now
		//             eachRecursive(obj["child"]);
		//         }else if(next == true){
		//         	eachRecursive(obj["next"]);
		//         }
		//     }
		// }
		//if label has mv then the left side is the verb and the right side is the modifier
		//if label has s in it then the left side is the subject and the right side is the verb
		
		//constituent tree

	

	var append = function(word, label){
		console.log("appending");
		var newDiv = $('</div>').addClass(label).html(word);
		$("#main-headline").append(newDiv);
	}

	// var appendRelations = function(action, subject, i){
	// 	console.log("appendRelations was called");
	// 	var actionDiv = $('<div/>').addClass('related-action').attr('id', 'action' + i).html(action);
	// 	var relHeadlineDiv = $('<div/>').attr('id', i).addClass('related-headline').html(actionDiv);
	// 	$('#headlines').prepend(relHeadlineDiv);
	// 	//get location of action in the main sentence:
	// 	var mainActionPos = $(".main-action").position();
	// 	// console.log("main action position is: " + mainActionPos.left);
	// 	//give it a translatez 
	// 	var zAmount = -i*1000;
	// 	var opacity = (70 - i*10)/100;
	// 	console.log("zAmount is: " + zAmount);
	// 	$("#action" + i).css({		
	// 		"-webkit-transform": 'translateZ(' +zAmount + 'px)',
	//     	"transform": 'translateZ(' + zAmount + 'px)',
	//     	"opacity": opacity
	// 	});
		
	// 	//set position of all other actions to that position
	// 	$(".related-action").css({
	// 		"margin-left" : mainActionPos.left,
	// 	});

	// }


	/*//this function tries to pull together similar headlines by amount of matching words, doesnt work great, i should use keywords
	var checkSimilarities = function(query){
		console.log('checkSimilarities function initiated');	
		for(var headline in headlineArray){ //for every headline
			headlineArray[headline].matchingHeadline = [];
			var wordsInHeadline = headline.split(" "); 
			var numWordsInCommon = 0; 
			for(var headline2 in headlineArray){ //search through all the other headlines
				if(headline2 != headline){ //except the one you are on
					//check ig the words in headline exist in headline2
					for(var i=0; i<wordsInHeadline.length; i++){
						if(wordsInHeadline[i] != query && wordsInHeadline[i] != ""){ //dont do it for the query word
							if(headline2.indexOf(wordsInHeadline[i]) > -1 ){
								//matching word is in headlinle2
								numWordsInCommon ++;
								headlineArray[headline].matchingHeadline.push({
									'headline in common' : headline2,
									'number of words in common' : numWordsInCommon
								});

							}
						}
					}
				}

			}
			
		}
		console.log(headlineArray);
		
	}*/
		// var checkSimilarities = function(query){
	// 	console.log('checkSimilarities function initiated');	
	// 	for(var headline in headlineArray){ //for every headline
	// 		headlineArray[headline].matchingHeadline = [];
	// 		var wordsInHeadline = headline.split(" "); 
	// 		var numWordsInCommon = 0; 
	// 		for(var headline2 in headlineArray){ //search through all the other headlines
	// 			if(headline2 != headline){ //except the one you are on
	// 				//check ig the words in headline exist in headline2
	// 				for(var i=0; i<wordsInHeadline.length; i++){
	// 					if(wordsInHeadline[i] != query && wordsInHeadline[i] != ""){ //dont do it for the query word
	// 						if(headline2.indexOf(wordsInHeadline[i]) > -1 ){
	// 							//matching word is in headlinle2
	// 							numWordsInCommon ++;
	// 							headlineArray[headline].matchingHeadline.push({
	// 								'headline in common' : headline2,
	// 								'number of words in common' : numWordsInCommon
	// 							});

	// 						}
	// 					}
	// 				}
	// 			}

	// 		}
			
	// 	}
	// 	console.log(headlineArray);
		
	// }
// var getRelationsFake = function(callback){
	// 	console.log('get relations function initiated');
	// 		var count = 0; 				
	// 			$.post('/getRelations', //the address. post request
	// 			 	{
	// 			 		headline: headlineArray[3].headline
	// 			 	},										// the data im sending
	// 			 	function(response){ 
	// 			 		count ++;
	// 			 		console.log(response);
	// 			 		var headline = response.headline;
	// 			 		headlineArray[3]['relations'] = response.relations;
	// 			 		// if(count == Object.keys(headlineArray).length){
	// 			 			console.log("done getting relations");
	// 			 			callback();
	// 			 		//}
	// 			 	}
	// 			);		
		
		
	// 		//}
	// 	 //jquery function
	// };
	// var getRelations = function(callback){
	// 	console.log('get relations function initiated');
	// 	var count = 0;
	// 	for (var i = 0; i < headlineArray.length; i++) {
	// 		var headline = headlineArray[i].headline;			
	// 		$.post('/getRelations', //the address. post request
	// 		 	{
	// 		 		headline: headline,
	// 		 		i: i
	// 		 	},										// the data im sending
	// 		 	function(response){ 
	// 		 		count ++;
	// 		 		console.log(response.relations);
	// 		 		var index = response.i;
	// 		 		headlineArray[index]['relations'] = response.relations;
	// 		 		if(count == headlineArray.length){
	// 		 			console.log("done getting relations");
	// 		 			callback();
	// 		 		}
	// 		 	}
	// 		);		
	// 	}

	// };

	var init = function(){
		console.log('Initializing app.');
		totalFeeds = getFeedCount();
		attachEvents();
	};



	return {
		init: init,
		//callApi: callApi
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);
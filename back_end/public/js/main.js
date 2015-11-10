/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');
	var rawData = {};
	var queryMatches = {};
	var sources=[
	//american news this might be scewed depending on which feeds for each paper...
	 	{
			aljazeeraAmericaURL: "http://america.aljazeera.com/content/ajam/articles.rss",
			cnnURL: "http://rss.cnn.com/rss/cnn_topstories.rss",
			foxNews: "http://feeds.foxnews.com/foxnews/latest",
			huffPost: "http://www.huffingtonpost.com/feeds/news.xml",
			abcNews: ["http://feeds.abcnews.com/abcnews/topstories","http://feeds.abcnews.com/abcnews/internationalheadlines", "http://feeds.abcnews.com/abcnews/usheadlines", "http://feeds.abcnews.com/abcnews/politicsheadlines", "http://feeds.abcnews.com/abcnews/blotterheadlines", "http://feeds.abcnews.com/abcnews/thelawheadlines", "http://feeds.abcnews.com/abcnews/moneyheadlines", "http://feeds.abcnews.com/abcnews/technologyheadlines", "http://feeds.abcnews.com/abcnews/healthheadlines", "http://feeds.abcnews.com/abcnews/entertainmentheadlines", "http://feeds.abcnews.com/abcnews/travelheadlines", "http://feeds.abcnews.com/abcnews/sportsheadlines", "http://feeds.abcnews.com/abcnews/worldnewsheadlines", "http://feeds.abcnews.com/abcnews/2020headlines", "http://feeds.abcnews.com/abcnews/primetimeheadlines", "http://feeds.abcnews.com/abcnews/nightlineheadlines", "http://feeds.abcnews.com/abcnews/gmaheadlines", "http://feeds.abcnews.com/abcnews/thisweekheadlines"],
			nyTimes: ["http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml", "http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml",  "http://rss.nytimes.com/services/xml/rss/nyt/World.xml", "http://rss.nytimes.com/services/xml/rss/nyt/US.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Education.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Politics.xml", "http://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml", "http://cityroom.blogs.nytimes.com/feed/", "http://fort-greene.thelocal.nytimes.com/feed/", "http://rss.nytimes.com/services/xml/rss/nyt/Business.xml", "http://rss.nytimes.com/services/xml/rss/nyt/EnergyEnvironment.xml", "http://rss.nytimes.com/services/xml/rss/nyt/InternationalBusiness.xml", "http://rss.nytimes.com/services/xml/rss/nyt/SmallBusiness.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Economy.xml", "http://www.nytimes.com/services/xml/rss/nyt/Dealbook.xml", "http://rss.nytimes.com/services/xml/rss/nyt/MediaandAdvertising.xml", "http://rss.nytimes.com/services/xml/rss/nyt/YourMoney.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml", "http://bits.blogs.nytimes.com/feed/", "http://rss.nytimes.com/services/xml/rss/nyt/PersonalTech.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Sports.xml", "http://rss.nytimes.com/services/xml/rss/nyt/InternationalSports.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Baseball.xml", "http://www.nytimes.com/services/xml/rss/nyt/CollegeBasketball.xml", "http://www.nytimes.com/services/xml/rss/nyt/CollegeFootball.xml", "http://www.nytimes.com/services/xml/rss/nyt/Golf.xml", "http://www.nytimes.com/services/xml/rss/nyt/Hockey.xml", "http://www.nytimes.com/services/xml/rss/nyt/ProBasketball.xml", "http://www.nytimes.com/services/xml/rss/nyt/ProFootball.xml", "http://www.nytimes.com/services/xml/rss/nyt/Soccer.xml", "http://www.nytimes.com/services/xml/rss/nyt/Tennis.xml", "http://gambit.blogs.nytimes.com/feed/", "http://www.nytimes.com/services/xml/rss/nyt/Science.xml", "http://www.nytimes.com/services/xml/rss/nyt/Environment.xml", "http://www.nytimes.com/services/xml/rss/nyt/Space.xml", "http://www.nytimes.com/services/xml/rss/nyt/Health.xml", "http://www.nytimes.com/services/xml/rss/nyt/Research.xml", "http://www.nytimes.com/services/xml/rss/nyt/Nutrition.xml", "http://www.nytimes.com/services/xml/rss/nyt/HealthCarePolicy.xml", "http://www.nytimes.com/services/xml/rss/nyt/Views.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Arts.xml", "http://www.nytimes.com/services/xml/rss/nyt/InternationalArts.xml", "http://rss.nytimes.com/services/xml/rss/nyt/ArtandDesign.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Books.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Dance.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Movies.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Music.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Television.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Theater.xml", "http://artsbeat.blogs.nytimes.com/feed/", "http://carpetbagger.blogs.nytimes.com/feed/","http://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml","http://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml", "http://rss.nytimes.com/services/xml/rss/nyt/DiningandWine.xml", "http://rss.nytimes.com/services/xml/rss/nyt/HomeandGarden.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Weddings.xml", "http://rss.nytimes.com/services/xml/rss/nyt/tmagazine.xml", "http://parenting.blogs.nytimes.com/feed/", "http://rss.nytimes.com/services/xml/rss/nyt/Travel.xml", "http://topics.nytimes.com/top/features/travel/columns/frugal_traveler/index.html?rss=1", "http://www.nytimes.com/services/xml/rss/nyt/JobMarket.xml", "http://rss.nytimes.com/services/xml/rss/nyt/RealEstate.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Commercial.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Automobiles.xml"],	//just world feed

		},
	//israeli news
		{
			globesURL: "http://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=1725",
			haaretzURL: "http://www.haaretz.com/cmlink/1.263335",
			ynetURL: "http://www.ynet.co.il/Integration/StoryRss3082.xml",
			
		}
	];

	var attachEvents = function(){
		console.log('attaching events.');
		//some selector will go here but for now im setting countrychoice
		var countryChoice = sources[0];
		var query = "Russia";
		getXML(countryChoice,query);

	}

	



	var getXML = function(countryChoice,query){

		var i = 0;
		console.log(Object.keys(countryChoice).length)

		//iterate through all the keys of the selected object
		for(var newsSite in countryChoice){ //this loops makes the whole program run three times for each sourcechoice
			console.log(newsSite);
			//if the source choice is an array then getXML for each source in the array
			//because there are multiple rss feeds for each source
			if($.isArray(countryChoice[newsSite])){
				for(var i=0; i<countryChoice[newsSite].length; i++){
					var URL = countryChoice[newsSite][i];
					console.log('searching through: ' + URL);
					ajax(URL);
				}
			}else{
				URL = countryChoice[newsSite];
				console.log('searching through: ' + URL);
				ajax(URL);
			}
			
			function ajax(URL){
				$.ajax({
					type: "GET",
					url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(URL),
					dataType: "json",
					indexValue: newsSite,
					error: function(){
		            	alert('Unable to load feed, Incorrect path or invalid feed');
		       		},
		       		
		        	success: function(xml){
		        		func(xml, this.indexValue);
		        		//count how many times success runs
						i++
		        		function func(data, site){
			            	data = xml.responseData.feed.entries;
			            	console.log(site);
			            	if(rawData.hasOwnProperty(site)) {
			            		for(var i=0; i<data.length; i++){
			            			rawData[site].push(data[i]);
			            		}
			            	}else{           	 
								rawData[site] = data; //add source name as a key for each value
			            	}
			            	console.log(rawData);
		            	}
		            	
		            	//increasing i every time and then saying when i is equal to the last property move pn to the next function
		            	if(i == Object.keys(countryChoice).length){
		            		//console.log(rawData);
		            		//sortData(countryChoice, query);
		            		//searchQuery(query);
		            		//goBackend();
		            		
		            	}
		        	}
				})	 //end of ajax
				.done(function(){
					searchQuery(query, function(){
						goBackend();
					});
				});	
			}
		}
	}

	var searchQuery = function(query, callback){
		console.log("searchQuery function initiated");
		var headline;
		for(var site in rawData){
			var values = rawData[site];

			for(var i=0; i<values.length; i++){

				headline = values[i].title;

				if(headline.indexOf(query) > -1){
					console.log(site + headline);
					if(queryMatches.hasOwnProperty(headline) == false){
						queryMatches[headline] = {
							"date" : values[i].publishedDate,
							"source": site,
							"link" : values[i].link
						}; 
					}
					
				}
			}
				
		}
		console.log(queryMatches);
		callback();

				
	}


	var goBackend = function(){
		console.log('backend function initiated');
		//console.log(rawData);
			// for(var i=0; i<rawData.length; i++){	
					
			 	for (var headline in queryMatches) {
					
					$.post('/sendArticles', //the address. post request
						 {headline: headline},				// the data im sending
						 function(response){ //callback function (once a response comes through)
						 	console.log(response);
						 }
					);
				
				}
			
			//}
		 //jquery function
	};



	var init = function(){
		console.log('Initializing app.');
		attachEvents();
	};



	return {
		init: init,
		//callApi: callApi
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);



var app = app || {};

app.main = (function(){

	var attachEvents = function(){
		//on click get the value of the input
		$("#button").on('click', getInput);	
		$("#myQuery-box").keypress(function(e){
			if(e.keyCode == 13){
				getInput();
			}
		});
	};

	var getInput = function(){
		getArticle($("#myQuery-box").val(), $("#begin-date").val(), $("#end-date").val())
		console.log("got it");
	}

	var init = function(){
		attachEvents();
	};

	function getArticle(query, begin_date, end_date){
		end_date_clean = end_date.replace(/-/g,'');
		begin_date_clean = begin_date.replace(/-/g,'');
		var APIkey= 'a793efdd5b1c06a7d1059a104616be3b:17:71711436';
		//have to account for all the cases
		if(begin_date_clean != "" && end_date != ""){
			var thisURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&begin_date=" + begin_date_clean + "&end_date="+ end_date_clean + "&sort=pub_date" + "&api-key=" + APIkey;
		}else if(begin_date_clean !="" && end_date_clean == ""){
			var thisURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&begin_date=" + begin_date_clean + "&api-key=" + APIkey;
		}else if(begin_date_clean == "" && end_date_clean!=""){
			var thisURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query +"&sort=pub_date"+ "&end_date="+ end_date_clean + "&api-key=" + APIkey;
		}else if(begin_date_clean == "" && end_date_clean == ""){
			var thisURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&api-key=" + "&sort=pub_date" + APIkey;
		}

		$.getJSON(thisURL, function(json){
			console.log('data received');
			console.log(json);
			var numberOfArticles = json.response.docs.length;
			console.log(numberOfArticles);
			// var minDate
			// var maxDate
			//appendDate(numberOfArticles, minDate, maxDate, query);
		});
	}

	var appendDate = function(umberOfArticles, minDate, maxDate, query){

	};


		return { //returning is so that the other app can read it
			init: init
		};

})();

window.addEventListener('DOMContentLoaded', app.main.init);







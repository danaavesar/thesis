/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');
	var headlineArray = [{'headline': "Two Israeli men killed in stabbing attack in Jerusalem's old city"}, 
						{'headline':"Palestinian Kills 2 Israelis in Jerusalem"},
						 {'headline':"2 killed, 2 wounded in Jerusalem attack"},
						 {'headline': "Bunny is Killed After a Fatal Attack"}, 
						  {'headline':"Palestinian shot dead after alleged stabbing"},
						   {'headline':"Palestinian shot dead after fatal stabbing in Jerusalem; 2 Israeli victims also killed"},
						    {'headline':"Two ultra-Orthodox Jews Killed in Terror Attack in Jerusalem's Old City"}, 
						    {'headline':"Palestinian shot dead after Jerusalem attack kills two"}];


	var goBackend = function(){
		console.log('backend function initiated');
		//console.log(rawData);
			// for(var i=0; i<rawData.length; i++){	
					
			 	for (var i= 0; i<headlineArray.length; i++) {
					
					$.post('/sendArticles', //the address. post request
						 	{	i: i,
						 		headline: headlineArray[i].headline
						 	},										// the data im sending
						 	function(response){ 					//callback function (once a response comes through)
						 		attachResults(response, function(){
						 			attachMain();
						 		});
						 	}
					);

					// socket.on('msg' + i, function(res){
					// 	// res = { i: 0, data: something }
					// 	attachRelations(res)
					// })
				
				}
			
			//}
		 //jquery function
	};

	
	var attachResults = function(response, callback){
		var i = response.i;
		// console.log(i);
		// console.log(response.relations)
		headlineArray[i]['relations'] = response.relations;
		
		if(i == headlineArray.length -1){
			console.log(headlineArray);
			callback();
		}
	}


	var attachMain = function(){ //finding the subject, action and pieces in between. Then appending to the page
		console.log("attachMainSentence function initiated");

		//find the action and subject in the sentence
		var mainAction = headlineArray[3].relations[0].action.text;
		var mainSubject = headlineArray[3].relations[0].subject.text;
		var actionLength = mainAction.length;
		var subjectLength = mainSubject.length;
		//index of action
		var beginingPosAction = headlineArray[3].headline.indexOf(mainAction);
		var endingPosAction = beginingPosAction + actionLength;
		//index of subj
		var beginingPosSubj = headlineArray[3].headline.indexOf(mainSubject);
		var endingPosSubj = beginingPosSubj + subjectLength;

//--------- appending the main sentence in different divs -------------- //
		//if the subject is before the action
		if(beginingPosSubj < beginingPosAction){
			//before subj
			var beforeSubj = headlineArray[3].headline.substring(0, beginingPosSubj);
			var beforeSubjDiv = $('<div/>').addClass('before-subj main-sentence').html(beforeSubj);
			$("#main-headline").append(beforeSubjDiv);
			console.log("beforeSubj is: " + beforeSubj);

			//subject
			var subjDiv = $('<div/>').addClass('main-subject main-sentence').html(mainSubject);
			$("#main-headline").append(subjDiv);
			console.log('mainSubject is: ' + mainSubject);

			//between subj and action
			var betweenSubjAction = headlineArray[3].headline.substring(endingPosSubj, beginingPosAction);
			//attach it to the page
			var betweenDiv = $('<div/>').addClass('between-subj-act main-sentence').html(betweenSubjAction);
			$("#main-headline").append(betweenDiv);
			console.log('betweenSubjAction is: ' + betweenSubjAction);

			//action
			var actDiv = $('<div/>').addClass('main-action main-sentence').html(mainAction);
			$("#main-headline").append(actDiv);
			console.log('action is: ' + mainAction);

			//after action
			var afterAction = headlineArray[3].headline.substring(endingPosAction, headlineArray[3].headline.length);
			var afterActDiv = $('<div/>').addClass('after-action main-sentence').html(afterAction);
			$("#main-headline").append(afterActDiv);
			console.log('afterAction is: ' + afterAction);

			//if the action is before the subject
		}else if(beginingPosAction < beginingPosSubj){
			//before action
			var beforeAct = headlineArray[3].headline.substring(0, beginingPosAct);
			var beforeActDiv = $('<div/>').addClass('before-Act main-sentence').html(beforeAct);
			$("#main-headline").append(beforeActDiv);
			console.log("beforeAct is: " + beforeAct);

			//action
			var actDiv = $('<div/>').addClass('main-action main-sentence').html(mainAction);
			$("#main-headline").append(actDiv);
			console.log('action is: ' + mainAction);
		
			//between action and subj
			var betweenActionSubj = headlineArray[3].headline.substring(endingPosAction, beginingPosSubj);
			//attach it to the page
			var betweenDiv = $('<div/>').addClass('between-act-subj main-sentence').html(betweenActionSubj);
			$("#main-headline").append(betweenDiv);
			console.log('betweenActionSubj is: ' + betweenActionSubj);

			//subject
			var subjDiv = $('<div/>').addClass('main-subject main-sentence').html(mainSubject);
			$("#main-headline").append(subjDiv);
			console.log('mainSubject is: ' + mainSubject);

			//after subject
			var afterSubj = headlineArray[3].headline.substring(endingPosSubj, headlineArray[3].headline.length);
			var afterSubjDiv = $('<div/>').addClass('after-Subj main-sentence').html(afterSubj);
			$("#main-headline").append(afterSubjDiv);
			console.log('afterSubj is: ' + afterSubj);

		}

//--------- find all other actions and subjects -------------- //
		var numOfRelations = 0;
		for(var i=0; i< headlineArray.length; i++){
			if(headlineArray[i].relations[0] != undefined){
				var action = headlineArray[i].relations[0].action.text;
				var subject = headlineArray[i].relations[0].subject.text;
				console.log("action " + action + " subject " + subject);
				numOfRelations ++;
				appendRelations(action, subject, numOfRelations);
			}
		}


	}// end of attachMain function

	var appendRelations = function(action, subject, i){
		console.log("appendRelations was called");
		var actionDiv = $('<div/>').addClass('related-action').attr('id', 'action' + i).html(action);
		var relHeadlineDiv = $('<div/>').attr('id', i).addClass('related-headline').html(actionDiv);
		$('#headlines').prepend(relHeadlineDiv);
		//get location of action in the main sentence:
		var mainActionPos = $(".main-action").position();
		// console.log("main action position is: " + mainActionPos.left);
		//give it a translatez 
		var zAmount = -i*1000;
		var opacity = (70 - i*10)/100;
		console.log("zAmount is: " + zAmount);
		$("#action" + i).css({		
			"-webkit-transform": 'translateZ(' +zAmount + 'px)',
	    	"transform": 'translateZ(' + zAmount + 'px)',
	    	"opacity": opacity
		});
		
		//set position of all other actions to that position
		$(".related-action").css({
			"margin-left" : mainActionPos.left,
		});

	}



	var init = function(){
		console.log('Initializing app.');
		goBackend();
	};



	return {
		init: init,
		//callApi: callApi
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);
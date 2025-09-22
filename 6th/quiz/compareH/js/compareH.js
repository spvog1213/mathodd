function initScene() {
	log('initScene...');
	log(gameManager.QUIZ_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();


	var questionBox = createElement('div', bgCanvas, 'questionBox');
     questionBox.innerHTML = gameManager.QUIZ_OPTION[0];

	var currentQuestion = document.getElementById("currentQuestion");
	var cloud = createElement('div', currentQuestion, 'cloud');
	cloud.style.left = '0px';
	
	appendChoiceQuestion('click', gameManager.quizObj);
}

function gameOver(currentObj) {

	var clickContainer = document.querySelector('.clickContainer').childNodes;

	for (var i = 0; i < clickContainer.length; i++) {
		clickContainer[i].style.pointerEvents = "none";
	}
  var cloudLine = createElement('div', currentQuestion, 'cloudLine'),
	  cloud = document.querySelector('.cloud'),
		currentLeft = parseInt(cloud.style.left.replace('px', ''));
	
	animate({
		delay : 20,
		duration : 1200,
		delta : makeEaseOut(linear),
		step : function(delta) {
			cloud.style.left = (currentLeft + (700 * delta)) + 'px';
		}
	});

	streamSound.setSound('media/orgel.mp3');

	setTimeout(function() {
		logCounter.tryCounter();
		logCounter.endTime();
		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');

	}, 1500);

	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 1800);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);

}

function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    clickContainer = createElement('div', bgCanvas, 'clickContainer'),
	    line = document.createElement('div'),
	    choiceTop = 0;

	switch (gameManager.quizObj.length) {
	case 2 :
		choiceLeft = 140;
		break;
	case 3 :
		choiceLeft = 20;
		break;
	}

	for (var i = 0; i < choiceQuestionArray.length; i++) {
		console.log(choiceQuestionArray)

		choiceLeft = choiceLeft + 270;

		var x = Math.floor((Math.random() * 3) + 1);

	  	var short = createElement('div', clickContainer, 'building building_' + i)
	    short.style.background =  'url(images/compareH_building_'+gameManager.quizObj[i]+'_' + x + '.png) no-repeat';
	  	short.style.left = choiceLeft + 'px';


		var	building = document.querySelectorAll('.building');
		building[i].setAttribute('answerValue', gameManager.quizObj[i]);
		gameManager.quizPosition.push([119,choiceLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(building);
		} else {
			building[i].addEventListener('click', function() {
				log('click');
				clickCompareAnswer(this);
			}, false);
		}
	}
}


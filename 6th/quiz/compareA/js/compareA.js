function initScene() {
	log('initScene...');
	// log(gameManager.QUIZ_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var questionBox = createElement('div', bgCanvas, 'questionBox');
     questionBox.innerHTML = gameManager.QUIZ_OPTION[0];

	var currentQuestion = document.getElementById("currentQuestion");
	var fish = createElement('div', currentQuestion, 'fish');
	fish.style.top = '100px';
	fish.style.display = 'none';
	
	appendChoiceQuestion('click', gameManager.quizObj);
}

function gameOver(currentObj) {

	var clickContainer = document.querySelector('.clickContainer').childNodes;

	for (var i = 0; i < clickContainer.length; i++) {
		clickContainer[i].style.pointerEvents = "none";
	}
	var fish = document.querySelector('.fish'),
		currentTop = parseInt(fish.style.top.replace('px', ''));
	
	animate({
		delay : 20,
		duration : 400,
		delta : makeEaseOut(circ),
		step : function(delta) {
			fish.style.display = 'block';
			fish.style.top = (currentTop + (220 * delta)) + 'px';
			fish.style.zIndex = 2
			fish.style.opacity = (1 - (0.5 * delta))
		}
	});

	streamSound.setSound('media/orgel.mp3');

	setTimeout(function() {
		gameOverAnimation();
		logCounter.tryCounter();
		logCounter.endTime();
		streamSound.setSound('../../media/correct.mp3');

	}, 1000);

	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);
	
}

function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    clickContainer = createElement('div', bgCanvas, 'clickContainer'),
	    line = document.createElement('div'),
	    choiceTop = 0;

	switch (gameManager.quizObj.length) {
	case 2 :
		choiceLeft = -120;
		break;
	case 3 :
		choiceLeft = -310;
		break;
	}

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		choiceLeft = choiceLeft + 380;


	  	var short = createElement('div', clickContainer, 'waterTank waterTank_' + i);

	    short.style.background =  'url(images/compareA_water_tank_'+gameManager.quizObj[i] + '.png) no-repeat';
	  	short.style.left = choiceLeft + 'px';

		var	waterTank = document.querySelectorAll('.waterTank');
		waterTank[i].setAttribute('answerValue', gameManager.quizObj[i]);
		gameManager.quizPosition.push([274,choiceLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(waterTank);
		} else {
			waterTank[i].addEventListener('click', function() {
				log('click');
				clickCompareAnswer(this);

				var currentQuestion = document.getElementById("currentQuestion");
				currentQuestion.style.left = this.style.left;
			}, false);
		}
	}
}

function initScene() {

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		blackBord = createElement('div', bgCanvas, 'blackBord')
		circleImg = createElement('div', blackBord, 'circleImg'),
		intX = Math.floor((Math.random() * 4) +1);
 // 
	circleImg.style.background = 'url(images/diameter_circle_' + intX + '.png)';

	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
		var circleText = createElement('div', bgCanvas, 'circleText circleText_' + i);
		circleText.innerHTML = gameManager.QUIZ_OPTION[i];
	}

	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
		var dropArea = createElement('div', bgCanvas, 'dropArea dropArea_' + i);
		var answerValue = gameManager.QUIZ_ANSWER[i];
		dropArea.setAttribute('answerValue', answerValue);
		gameManager.dropArea.push(dropArea);
	}

	switch (intX) {
	case 1 :
		circleText.setAttribute('style', 'top:234px; left:330px;')
		dropArea.setAttribute('style', 'top:362px; left:438px;')
		break;
	case 2 :
		circleText.setAttribute('style', 'top:397px; left:489px;')
		dropArea.setAttribute('style', 'top:232px; left:198px;')
		break;
	case 3 :
		circleText.setAttribute('style', 'top:432px; left:408px;')
		dropArea.setAttribute('style', 'top:232px; left:198px;')
		break;
	case 4 :
		circleText.setAttribute('style', 'top:422px; left:460px;')
		dropArea.setAttribute('style', 'top:232px; left:197px;')
		break;
	}

	appendSelectQuestion('drag', gameManager.quizObj);

}

function gameOver(currentObj) {

	var quizObjContainer = document.querySelector('.quizObjContainer').childNodes;

	for (var i = 0; i < quizObjContainer.length; i++) {
		quizObjContainer[i].style.pointerEvents = "none";
	}

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');
	},700);



	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);


	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2300);

}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    quizObjContainer = createElement('div', bgCanvas, 'quizObjContainer'),
	    line = document.createElement('div'),
	    choiceTop = -80;


	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var dragObj = createElement('div', quizObjContainer, 'dragObj dragObj_' + i )

		choiceTop = choiceTop + 180;

		dragObj.setAttribute('style', 'left: 860px; Top:' + choiceTop + 'px;');

		dragObj.innerHTML = gameManager.quizObj[i];

		dragObj.setAttribute('answerValue', gameManager.quizObj[i]);

		gameManager.quizPosition.push([choiceTop, 860]);

		if (buttonType === 'drag') {
			new Dragdrop(dragObj);
		} else {
			dragObj.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}


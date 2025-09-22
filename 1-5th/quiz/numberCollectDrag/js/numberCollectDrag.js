function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question2', 'circle', document.getElementById('bgCanvas'));

	var circleAnswer = document.querySelector('#answerObject')
	circleAnswer.setAttribute('style', 'top:445px; left: 425px');

	appendChoiceQuestion('drag', gameManager.choiceQuestion);

}

function initNumber() {
	log('initNumber...');

	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	    Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	    Question1 = document.querySelector('#question1'),
	    Question2 = document.querySelector('#question2'),
	    numpadBg = document.createElement('div'),
	    circleAnswer = document.querySelector('#answerObject');

	Question1.setAttribute('style', 'top:158px; left: 280px;');
	Question2.setAttribute('style', 'top:158px; left: 570px;');
	numpadBg.setAttribute('id', 'numpadBg');

	bgCanvas.appendChild(numpadBg);

	Question1.innerHTML = Num1;
	Question2.innerHTML = Num2;

}

function gameOver() {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');

	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);

}

function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    choiceQuestionContainer = document.createElement('div'),
	    line = document.createElement('div'),
	    choiceLeft = 0;

	switch (gameManager.choiceQuestion.length) {
	case 1 :
		choiceTop = 240;
		break;
	case 2 :
		choiceTop = 150;
		break;
	case 3 :
		choiceTop = -85;
		break;
	case 4 :
		choiceTop = -50;
		break;
	case 5 :
		choiceTop = -150;
		break;
	}

	choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');
	bgCanvas.appendChild(choiceQuestionContainer);

	line.className = 'line';

	choiceQuestionContainer.appendChild(line);

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var currentQuestion;
		if (imgSrcArray) {

			var choiceQuestionGroup = document.createElement('div'),
			    className = imgSrcArray[0].split('/');
			className = className[className.length - 1];
			className = className.split('_');

			choiceQuestionGroup.setAttribute('id', 'choiceQuestionGroup_' + i);
			choiceQuestionContainer.appendChild(choiceQuestionGroup);

			var imgIndex = parseInt(Math.random() * 3);

			log(imgIndex);
			appendImageElement('choiceQuestion_' + i, imgSrcArray[imgIndex], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
		}

		choiceTop = choiceTop + 200;

		currentQuestion.setAttribute('style', 'top: ' + choiceTop + 'px; left:1090px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestionText[i];

			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestion[i];
		}

		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, 1090]);

		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
		} else {
			currentQuestion.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}

function incorrectAnimation(dragObj) {
	var dragObjId = dragObj.id;
	dragObjId = dragObjId.split('_');

	var left = gameManager.choiceQuestionPosition[dragObjId[1]][1],
	    currentLeft = parseInt(dragObj.style.left.replace('px', ''));

	if (gameManager.CURRENT_TYPE === 'click' || gameManager.CURRENT_TYPE === 'train')
		currentLeft = 100;

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
			dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
		}
	});
}

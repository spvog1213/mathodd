function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER_TEXT);

	appendCircleElement('answerObject', 'rect', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question2', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question3', 'circle', document.getElementById('bgCanvas'));

	appendChoiceQuestion('drag', gameManager.choiceQuestion);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();
}

function initNumber() {
	log('initNumber...');

	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	    Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[2]),
	    Num3 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[3]),
	    Question1 = document.querySelector('#question1'),
	    Question2 = document.querySelector('#question2'),
	    Question3 = document.querySelector('#question3'),
	    numpadBg = document.createElement('div'),
	    circleAnswer = document.querySelector('#answerObject');

	if (gameManager.CURRENT_ANSWER[0] == Num1) {
		answerPosition = 1;
		Question1.setAttribute('style', 'top:160px; left: 581px;');
		circleAnswer.setAttribute('style', 'top:100px; left: 581px;')
	} else if (gameManager.CURRENT_ANSWER[0] == Num2) {
		answerPosition = 2;
		Question2.setAttribute('style', 'top:350px; left: 581px;');
		circleAnswer.setAttribute('style', 'top:290px; left: 581px;');
	} else if (gameManager.CURRENT_ANSWER[0] == Num3) {
		answerPosition = 3;
		Question3.setAttribute('style', 'top:540px; left: 581px;');
		circleAnswer.setAttribute('style', 'top:479px; left: 581px');
	}

	numpadBg.setAttribute('id', 'numpadBg');

	bgCanvas.appendChild(numpadBg);

	Question1.setAttribute('style', 'top:160px; left: 493px;');
	Question2.setAttribute('style', 'top:350px; left: 493px;');
	Question3.setAttribute('style', 'top:540px; left: 493px;');

	Question1.innerHTML = Num1;
	Question2.innerHTML = Num2;
	Question3.innerHTML = Num3;
}

function initBus(busimg) {
	log('initBus...');

	var left = 30,
	    bus_imgs;

	switch (BusTypes) {
	case 0:
		bus_imgs = 'images/parking_bus_1.png';
		break;
	case 1:
		bus_imgs = 'images/parking_bus_2.png';
		break;
	case 2:
		bus_imgs = 'images/parking_bus_3.png';
		break;
	}

	for (var i = 0; i < busimg; i++) {
		var eventCallback = function() {
			arguments[0].preventDefault();
		};
		if (busimg <= 5)
			fruitsTop = 50
		else
			fruitsTop = 5

	}
	createObject(i, left, eventCallback, bus_imgs);

}

function createObject(index, left, eventCallback, parentObjSrc) {
	var parentObj = document.createElement('img'),
	    parentObj_text = document.createElement('div');

	parentObj_text.setAttribute('id', 'parentObj_text');

	parentObj.src = parentObjSrc;

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);
	parentObj_text.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	document.getElementById('choiceQuestion_0').appendChild(parentObj);
	document.getElementById('choiceQuestion_0').appendChild(parentObj_text);

	parentObj_text.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
}

function gameOver(dragObj, x, y) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	var choiceQuestion = document.getElementById('choiceQuestion_0'),
	    choiceQuestionLeft = parseInt(choiceQuestion.style.left),
	    dragObjchoiceQuestionLeft = parseInt(dragObj.style.left),
	    left = 170;

	clearInterval(countTimer);
	gameOverAnimation();
	logCounter.tryCounter();
	logCounter.endTime();
	streamSound.setSound('media/carsound.mp3');

	setTimeout(function() {
		animate({
			duration : 1000,
			delta : makeEaseInOut(quad),
			step : function(delta) {
				choiceQuestion.style.left = ((left * delta) + choiceQuestionLeft) + 'px';
				dragObj.style.left = ((left * delta) + dragObjchoiceQuestionLeft) + 'px';
			}
		});
	}, 500);

	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 2000);
}

function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    choiceQuestionContainer = document.createElement('div'),
	    choiceLeft = 0;

	switch (gameManager.choiceQuestion.length) {
	case 1 :
		choiceTop = 240;
		break;
	case 2 :
		choiceTop = 150;
		break;
	case 3 :
		choiceTop = -100;
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

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var currentQuestion;
		if (imgSrcArray) {

			var choiceQuestionGroup = document.createElement('div'),
			    className = imgSrcArray[0].split('/');
			className = className[className.length - 1];
			className = className.split('_');

			choiceQuestionGroup.setAttribute('id', 'choiceQuestionGroup_' + i);
			choiceQuestionContainer.appendChild(choiceQuestionGroup);

			log(imgIndex);
			appendImageElement('choiceQuestion_' + i, imgSrcArray[imgIndex], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

			/*	if (imgSrcArray[1] !== undefined) {

			 addIdleSprite(200, 100, document.querySelector('#choiceQuestion_' + i), gameManager.fishImgArray);
			 }*/

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
		}

		choiceTop = choiceTop + 200;

		currentQuestion.setAttribute('style', 'top: ' + 279 + 'px; left: 73px;');

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

		gameManager.choiceQuestionPosition.push([279, 73]);

		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
		} else {
			currentQuestion.addEventListener('click', function() {
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

	logCounter.tryCounter();
	if (gameManager.CURRENT_TYPE === 'click' || gameManager.CURRENT_TYPE === 'train')
		currentLeft = 100;
	streamSound.setSound('../../media/incorrect.mp3');

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


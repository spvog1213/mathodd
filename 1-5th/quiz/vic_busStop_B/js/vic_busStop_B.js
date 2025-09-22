function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

    gameManager.choiceBgImgArray = ['images/vic_busstop_numbox.png', 'images/vic_busstop_numbox.png', 'images/vic_busstop_numbox.png'];
    appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.choiceBgImgArray);

    appendCircleElement('answerObject_1', 'circle', document.getElementById('bgCanvas'));
    appendCircleElement('answerObject_2', 'circle', document.getElementById('bgCanvas'));

    answerObject_1.setAttribute('style', 'top:495px; left: 483px;');
	answerObject_2.setAttribute('style', 'top:495px; left: 633px;');

	answerObject_1.setAttribute('candleValue', gameManager.CURRENT_ANSWER[0]);
	answerObject_2.setAttribute('candleValue', gameManager.CURRENT_ANSWER[1]);

	appendCircleElement('queTxtBg', 'circle', document.getElementById('bgCanvas'));
	 appendCircleElement('txt1', 'txt', queTxtBg);
	 appendCircleElement('txt2', 'txt', queTxtBg);
	 appendCircleElement('txt3', 'txt', queTxtBg);
	 txt1.innerHTML = '가장 '
	 txt2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	 txt3.innerHTML = ' 두 자리 수 만들기';

	BusCreate();
}

function BusCreate() {
	appendCircleElement('busContainer', 'bus', bgCanvas);

	setRand(1, 4, 4);
    appendImageElement('busBg', 'images/vic_busstop1_bus_' + randResult[0] +'.png', busContainer);

    var girlNboy = parseInt(Math.random() * 2),
		childsArray = ['boy','girl'];
	 appendImageElement('childs', 'images/vic_busstop_char_' + childsArray[girlNboy] +'.png', busContainer,'bus');

}

function setRand(min, max, number) {
		randResult = new Array();
		randList = new Array();
		for (var z = min; z <= max; z++) {
			randList.push(z);
		}
		for (var x = 0; x < number; x++) {
			getRand();
		}
		return randResult;
}

	function getRand(dragObj) {
		randNumber = Math.floor(Math.random() * randList.length);
		randResult.push(randList[randNumber]);
		randList.splice(randNumber, 1);
}

function returnCurrentObj(dragObj) {
	var answerValue = dragObj.getAttribute('answerValue');

	for (var i = 1; i < gameManager.CURRENT_ANSWER.length+1; i++) {
		if (answerValue === document.querySelector('#answerObject_' + i).getAttribute('candleValue')) {
			return document.querySelector('#answerObject_' + i);
		}
	}
}



function gameOver(dragObj) {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	
	correctAnimation();
	gameOverAnimation();
	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);


	streamSound.setSound('../../media/correct.mp3');

	

	setTimeout(function() {
		log('excute stampStarIcon!');
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);


}


function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceLeft = 0,
	choiceTop = -20;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceLeft = 240;
		break;
		case 2 :
		choiceLeft = 1150;
		break;
		case 3 :
		choiceLeft = 1146;
		break;
		case 4 :
		choiceLeft = 1150;
		break;
		case 5 :
		choiceLeft = 1150;
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


			appendImageElement('choiceQuestionBg', imgSrcArray[0], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = 'circle';

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
		}

		choiceTop = choiceTop + 200;

		currentQuestion.setAttribute('style', 'top:' + choiceTop + 'px;left:' + choiceLeft + 'px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestion[i];
			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestion[i];
		}
		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);
		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
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



function correctAnimation(){
	var busContainer = document.querySelector('#busContainer'),
		ObjLeft = -800;
	
	animate({
		delay : 100,
		duration : 900,
		delta : makeEaseInOut(linear),
		step : function(delta) {
			busContainer.style.left = (ObjLeft * delta) + 'px';
		}
	});
}


function busStopCompareAnswer(dragObj, arrayNum) {
	dragObj.className += ' correct';
	var correct = document.querySelectorAll('.correct');

	if (correct.length === gameManager.CURRENT_ANSWER.length) {
		setTimeout(function(){
			gameOver(dragObj);
		},400);
	}

}


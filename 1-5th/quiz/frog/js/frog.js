function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'circle', document.getElementById('back1'));
	appendCircleElement('question2', 'circle', document.getElementById('back2'));

	var circleAnswer = document.querySelector('#answerObject');
	circleAnswer.setAttribute('style', 'top:222px; left: 1000px;');
	appendChoiceQuestion('drag', gameManager.choiceQuestion);


}

function initBead(frogBg) {
	log('initBead...');

	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	Question1 = document.querySelector('#question1'),
	Question2 = document.querySelector('#question2'),
	back1 = document.querySelector('#back1'),
	back2 = document.querySelector('#back2'),

	flowerL = document.createElement('img'),
	flowerR = document.createElement('img'),
	frogBg = document.createElement('img'),
	calculation = document.createElement('img'),
	equalsSign = document.createElement('img');

	calculation.setAttribute('id', 'calculation');
	flowerL.setAttribute('id', 'flowerL');
	flowerR.setAttribute('id', 'flowerR');
	frogBg.setAttribute('id','frogBg');
	equalsSign.setAttribute('id', 'equalsSign');
	equalsSign.src = 'images/equal.png';
	flowerL.src = 'images/frog_flower.png';
	flowerR.src = 'images/frog_flower.png';
	frogBg.src = 'images/frog_0.png';
	back1.setAttribute('style', 'top:260px; left: 70px;');
	back2.setAttribute('style', 'top:50px; left: 509px;');
	frogBg.setAttribute('style', 'top: 7%; right: -22%;');

	bgCanvas.appendChild(equalsSign);
	bgCanvas.appendChild(frogBg);
	bgCanvas.appendChild(flowerL);
	bgCanvas.appendChild(flowerR);
	Question1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	Question2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];


	switch (gameManager.calculation) {
		case '+':
		calculation.src = 'images/plus.png';
		bgCanvas.appendChild(calculation);

		break;
		case '-':
		calculation.src = 'images/minus.png';
		bgCanvas.appendChild(calculation);
		break;

		case 'x':
		calculation.src = 'images/multiplication.png';
		bgCanvas.appendChild(calculation);
		break;

		case '/':
		calculation.src = 'images/division.png';
		bgCanvas.appendChild(calculation);
		break;
	}

}

function gameOver(dragObj, x, y) {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	bgCanvas.removeChild(answerObject);
	bgCanvas.removeChild(frogBg);
	
	frogMotioncorrect();
	
	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	streamSound.setSound('media/frog_end.mp3');

	
	var choiceQuestion = document.getElementById('choiceQuestion_0'),
	    choiceQuestionTop = parseInt(choiceQuestion.style.top),
	    dragObjchoiceQuestionTop = parseInt(dragObj.style.top),
	    top = 5;

	setTimeout(function() {	
		animate({
			duration : 700,
			delta : makeEaseOut(elastic),
			step : function(delta) {
				choiceQuestion.style.top = ((top * delta) + choiceQuestionTop) + 'px';
				dragObj.style.top = ((top * delta) + dragObjchoiceQuestionTop) + 'px';
			}
		});
	}, 450)


	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
		gameOverAnimation();
	}, 500)

	setTimeout(function() {
		log('excute stampStarIcon!');
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);


}

function createObject(index, right, parentObjSrc, numContainer) {
	var parentObj = document.createElement('img'),
	numContainer =
	numContainer;

	parentObj.src = parentObjSrc;
	parentObj.className = "bead";
	parentObj.setAttribute('style', 'padding-top: 0px; padding-right : ' + (right / 0) + 'px;');

	document.getElementById(numContainer).appendChild(parentObj);

}

function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	line = document.createElement('div'),
	choiceLeft = 0;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceLeft = 240;
		break;
		case 2 :
		choiceLeft = 150;
		break;
		case 3 :
		choiceLeft = -50;
		break;
		case 4 :
		choiceLeft = -50;
		break;
		case 5 :
		choiceLeft = -150;
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


			log(imgIndex);
			appendImageElement('choiceQuestion_' + i, imgSrcArray[0], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);


		}

		choiceLeft = choiceLeft + 300;

		currentQuestion.setAttribute('style', 'top: 563px; left:' + choiceLeft + 'px;');

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
		gameManager.choiceQuestionPosition.push([563, choiceLeft]);
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


function frogMotioncorrect() {
	var frogMotion = document.querySelector('#frogMotion');

	var frogMotion = document.createElement('img'),
	spriteArray = ['images/frog_success_1.png', 'images/frog_success_2.png', 'images/frog_success_3.png', 'images/frog_success_4.png', 'images/frog_success_5.png'];
	frogMotion.setAttribute('id', 'frogMotion');

	frogMotion.setAttribute('style', 'top: 7%; right: -22%; z-index: 2;');

	setTimeout(function() {
		bgCanvas.appendChild(frogMotion);
		var i = 4;
		animate({
			delay : 100,
			duration : 1200,
			delta : makeEaseOut(linear),
			step : function(delta) {
				// log('@ sprite!');
				frogMotion.src = spriteArray[i];
			}
		});
		spriteAnimation(spriteArray, frogMotion);

	}, 0);

	setTimeout(function() {
		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[0].style.pointerEvents = "auto";
		}
	}, 1300);
}

function spriteAnimation(spriteArray, spriteObj) {
	var index = 0;
	animate({
		delay : 100,
		duration : 300,
		delta : makeEaseOut(linear),
		step : function(delta) {
			// log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});
}

function frogMotionIncorrect() {
	var frogBg = document.querySelector('#frogBg'),
	spriteArray1 = ['images/frog_fail_1.png','images/frog_fail_2.png','images/frog_fail_3.png'];
	spriteAnimation(spriteArray1, frogBg);
	logCounter.tryCounter();
	streamSound.setSound('media/frog_cry.mp3');

	setTimeout(function() {
		frogBg.src = 'images/frog_0.png';
	}, 1000);
}



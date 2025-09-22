function initScene() {

	appendCircleElement('answerObject', 'circle', document.getElementById('bgCanvas'));
	appendImageElement('vic_carterpillar_char','images/vic_carterpillar_char.png', document.getElementById('bgCanvas'),'vic_carterpillar_char');
	appendImageElement('vic_carterpillar_questionbox','images/vic_carterpillar_questionbox.png', document.getElementById('answerObject'),'vic_carterpillar_questionbox');
	appendImageElement('vic_carterpillar_none','images/vic_carterpillar_none.png', document.getElementById('currentAnswer'),'vic_carterpillar_none');

	appendSelectQuestion('drag', gameManager.choiceQuestion);
}

function initNumber() {
	log('initNumber...');

	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]);

	var circleAnswer = document.querySelector('#answerObject');
	circleAnswer.setAttribute('style', 'top:185px; left: 1010px; width:152px; height:120px');
	circleAnswer.setAttribute('candleValue',gameManager.CURRENT_ANSWER[0]);

	var currentAnswer = document.getElementById('currentAnswer'),
	calculation = document.createElement('img');
	calculationFirst = document.createElement('img');

	calculation.setAttribute('id', 'calculation');
	calculationFirst.setAttribute('id', 'calculationFirst');


	for(i=0; i<gameManager.TOTAL_ANSWER_ARRAY.length -5; i++){
		appendCircleElement('currentAnswerText_' + i, 'currentAnswerText', document.getElementById('currentAnswer'));
		var currentAnswerText = document.querySelector('#currentAnswerText_' + i);
		currentAnswerText.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[i];
	}

	appendImageElement('vic_equals','images/vic_equals.png', document.getElementById('currentAnswer'),'vic_equals');

	currentAnswerText_0.setAttribute('style', 'position:absolute; left:235px; top:210px; width:120px; height:85px; text-align:center; z-index:10; line-height: 80px;');
	currentAnswerText_1.setAttribute('style', 'position:absolute; left:426px; top:210px; width:120px; height:85px; text-align:center; z-index:10; line-height: 80px;');
	currentAnswerText_2.setAttribute('style', 'position:absolute; left:620px; top:210px; width:120px; height:85px; text-align:center; z-index:10; line-height: 80px;');

	switch (gameManager.calculationFirst) {
		case '+':
		calculationFirst.src = 'images/vic_plus.png';
		bgCanvas.appendChild(calculationFirst);
		break;
		case '-':
		calculationFirst.src = 'images/vic_minus.png';
		bgCanvas.appendChild(calculationFirst);
		break;
		case '/':
		calculationFirst.src = 'images/vic_division.png';
		bgCanvas.appendChild(calculationFirst);
		break;
		case '*':
		calculationFirst.src = 'images/vic_add.png';
		bgCanvas.appendChild(calculationFirst);
		break;
	}

	switch (gameManager.calculation) {
		case '+':
		calculation.src = 'images/vic_plus.png';
		bgCanvas.appendChild(calculation);
		break;
		case '-':
		calculation.src = 'images/vic_minus.png';
		bgCanvas.appendChild(calculation);
		break;
		case '/':
		calculation.src = 'images/vic_division.png';
		bgCanvas.appendChild(calculation);
		break;
		case '*':
		calculation.src = 'images/vic_add.png';
		bgCanvas.appendChild(calculation);
		break;
	}

	calculationFirst.setAttribute('style','position:absolute; top:230px; left:555px;')
	calculation.setAttribute('style','position:absolute; top:230px; left:745px;');
	vic_equals.setAttribute('style','position:absolute; top:230px; left:765px;')
}

function gameOver(dragObj) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
		// log(choiceQuestionContainer);
	}



	

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();

	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
	},40);

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
	choiceQuestionContainer = document.createElement('div'),
	choiceTop = 580,
	choiceLeft = 10;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceLeft = 240;
		break;
		case 2 :
		choiceLeft = -230;
		break;
		case 3 :
		choiceLeft = 33;
		break;
		case 4 :
		choiceLeft = 70;
		break;
		case 5 :
		choiceLeft = -150;
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

			var imgIndex = parseInt(Math.random() * 3);

			log(imgIndex);
			appendImageElement('choiceQuestion_' + i, imgSrcArray[imgIndex], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			// log(i);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
			//여기를 읽어욤...
		}

		choiceLeft = choiceLeft + 280;

		currentQuestion.setAttribute('style', 'left: ' + choiceLeft + 'px; Top:580px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestionText[i];

			choiceQuestionGroup.appendChild(imgObjText);
			// log('이리오심?');

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestion[i];
			appendImageElement('vic_soccer_ball_' + i,'images/vic_carterpillar_numbox.png', document.getElementById('choiceQuestion_' + i),'vic_soccer_ball');

		}

		var ballPosition = document.querySelector('#vic_soccer_ball_' + i);

		ballPosition.setAttribute('style','position:absolute; top:0px; left:0px; z-index:-10;')

		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
			//여기를 읽어욤...
		} else {
			currentQuestion.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				contrastAnswer(this);

			}, false);
		}
	}
}


function contrastAnswer(dragObj) {

	if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))) {

		log('@ correct!!');

		setTimeout(function() {
			gameOver();
		}, 10);

		var spriteArray = ['images/vic_carterpillar_success.png', 'images/vic_carterpillar_success.png', 'images/vic_carterpillar_success.png', 'images/vic_carterpillar_success.png','images/vic_carterpillar_success.png'];

		spriteAnimationCustom(spriteArray, vic_carterpillar_none);




	} else {
		log('@ incorrect!!');
			// log(gameManager.CURRENT_ANSWER[0]);

			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

			logCounter.tryCounter();

			var spriteArray = ['images/vic_carterpillar_fail.png', 'images/vic_carterpillar_fail.png', 'images/vic_carterpillar_fail.png', 'images/vic_carterpillar_fail.png','images/vic_carterpillar_none.png' ,'images/vic_carterpillar_none.png'];

			spriteAnimationCustom(spriteArray, vic_carterpillar_none);
		}
	}





	function spriteAnimationCustom(spriteArray, spriteObj) {

		var index = 0,
		durationAni = parseInt(spriteArray.length - 2) * 110;

		animate({
			delay : 90,
			duration : durationAni,
			delta : makeEaseOut(linear),
			step : function(delta) {
				log('@ sprite!');
				spriteObj.src = spriteArray[index];
				index++;
			}
		});

	}

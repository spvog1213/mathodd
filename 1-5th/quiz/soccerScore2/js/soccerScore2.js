function initScene() {

	appendCircleElement('answerObject1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('answerObject2', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('answerObject3', 'circle', document.getElementById('bgCanvas'));
	appendImageElement('goalpost01','images/goalpost.png', document.getElementById('answerObject1'),'goalpost01');
	appendImageElement('goalpost02','images/goalpost.png', document.getElementById('answerObject2'),'goalpost02');
	appendImageElement('goalpost03','images/goalpost.png', document.getElementById('answerObject3'),'goalpost03');
	appendCircleElement('question1', 'circle', document.getElementById('bgCanvas'));

	var circleAnswer = document.querySelector('#answerObject1');
		triangleAnswer = document.querySelector('#answerObject2');
		finalAnswer = document.querySelector('#answerObject3');
	
	circleAnswer.setAttribute('style', 'top:200px; left: 104px');
	triangleAnswer.setAttribute('style', 'top:200px; left: 510px');
	finalAnswer.setAttribute('style', 'top:200px; left: 910px');

	appendSelectQuestion('drag', gameManager.choiceQuestion);

	circleAnswer.setAttribute('candleValue',gameManager.CURRENT_ANSWER[0]);
	triangleAnswer.setAttribute('candleValue',gameManager.CURRENT_ANSWER[1]);
	finalAnswer.setAttribute('candleValue',gameManager.CURRENT_ANSWER[2]);

	var currentAnswer = document.getElementById('currentAnswer'),
		currentAnswerText = document.createElement('div'),
		currentAnswer = currentAnswer.appendChild(currentAnswerText),
		currentAnswerText = currentAnswerText.setAttribute('id', 'cakeId'),
		currentAnswerText = document.getElementById('cakeId');

	currentAnswerText.setAttribute('style', 'position:absolute; left:-70px; width:296px; text-align:center; z-index:10;');
	currentAnswerText.innerHTML = '<span>백의 자리 숫자</span>';


	var currentAnswerDim = document.getElementById('currentAnswer'),
		currentAnswerDimText = document.createElement('div'),
		currentAnswerDim = currentAnswerDim.appendChild(currentAnswerDimText),
		currentAnswerDimText = currentAnswerDim.setAttribute('id', 'cakeIdUnits'),
		currentAnswerDimText = document.getElementById('cakeIdUnits');
		
		document.createElement('div');

	currentAnswerDimText.setAttribute('style', 'position:absolute; left:336px; width:297px; text-align:center;');
	currentAnswerDimText.innerHTML = '<span>십의 자리 숫자</span>';



	var currentAnswerfinal = document.getElementById('currentAnswer'),
		currentAnswerfinalText = document.createElement('div'),
		currentAnswerfinal = currentAnswerfinal.appendChild(currentAnswerfinalText),
		currentAnswerfinalText = currentAnswerfinal.setAttribute('id', 'cakeIdfinal'),
		currentAnswerfinalText = document.getElementById('cakeIdfinal');
		
		document.createElement('div');

	currentAnswerfinalText.setAttribute('style', 'position:absolute; left:736px; width:297px; text-align:center;');
	currentAnswerfinalText.innerHTML = '<span>일의 자리 숫자</span>';
}

function initNumber() {
	log('initNumber...');

	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	    // Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	    Question1 = document.querySelector('#question1'),
	    // Question2 = document.querySelector('#question2'),
	    numpadBg = document.createElement('div'),
	    circleAnswer = document.querySelector('#answerObject1'),
	    triangleAnswer = document.querySelector('#answerObjectUnits');

	Question1.setAttribute('style', 'top:36px; left: 416px; line-height:100px; height:101px; color:#000;');
	// Question2.setAttribute('style', 'top:108px; left: 415px;');
	numpadBg.setAttribute('id', 'numpadBg');

	bgCanvas.appendChild(numpadBg);


	Question1.innerHTML = Num1;
	// Question1.innerHTML = Num1;
	// Question2.innerHTML = '<img src=images/candle_' + Num2 + '.png>' ;

	// log(Num2);

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
	streamSound.setSound('media/soccerScore_correct.mp3');
	},40);

	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 2300);

}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    choiceQuestionContainer = document.createElement('div'),
	    line = document.createElement('div'),
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
		choiceLeft = 170;
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
			// log(i);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
			//여기를 읽어욤...
		}

		choiceLeft = choiceLeft + 210;

		currentQuestion.setAttribute('style', 'left: ' + choiceLeft + 'px; Top:580px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestionText[i];

			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestion[i];
			//여기를 읽어욤...
		}

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


var count=0;

function contrastAnswer(dragObj) {
	// log(dragObj.getAttribute('answerValue'));
	// if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))){

	var answerObj1 = document.querySelector('#answerObject1'),
	    answerObj2 = document.querySelector('#answerObject2');
	    answerObj3 = document.querySelector('#answerObject3');

	counting();

	if (count === gameManager.CURRENT_ANSWER.length) {
		if (gameManager.CURRENT_ANSWER[0] === parseInt(answerObj1.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[1] === parseInt(answerObj2.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[2] === parseInt(answerObj3.getAttribute('answerValue'))) {
			//getAttribute = 요소의 클래스 속성의 값을 가져옴
			//parseInt = 문자열을 구문 분석하고 정수를 반환합니다.
			// streamSound.setSound('../../media/cake/orgel.mp3');

			log('@ correct!!');

		setTimeout(function() {
			gameOver();
		}, 10);
			

		} else {
			log('@ incorrect!!');
			// log(gameManager.CURRENT_ANSWER[0]);

			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

			logCounter.tryCounter();
			// gameOver();
		}
	}
}

function counting() {
	count++;
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

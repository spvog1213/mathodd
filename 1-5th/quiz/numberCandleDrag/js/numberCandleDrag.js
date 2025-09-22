function initScene() {
	// log('initScene...');
	// log(gameManager.CURRENT_ANSWER);
	// log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('answerObject2', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question2', 'circle', document.getElementById('bgCanvas'));

	var circleAnswer = document.querySelector('#answerObject1');
		triangleAnswer = document.querySelector('#answerObject2');
	
	circleAnswer.setAttribute('style', 'top:170px; left: 880px');
	triangleAnswer.setAttribute('style', 'top:334px; left: 880px');
	appendSelectQuestion('drag', gameManager.choiceQuestion);
	circleAnswer.setAttribute('candleValue',gameManager.TOTAL_ANSWER_ARRAY[0]);
	triangleAnswer.setAttribute('candleValue',gameManager.TOTAL_ANSWER_ARRAY[1]);

	var currentAnswer = document.getElementById('currentAnswer'),
		currentAnswerText = document.createElement('div'),
		currentAnswer = currentAnswer.appendChild(currentAnswerText),
		currentAnswerText = currentAnswerText.setAttribute('id', 'cakeId'),
		currentAnswerText = document.getElementById('cakeId');
		

	currentAnswerText.setAttribute('style', 'position:absolute; left:480px; width:480px; text-align:center;');
	currentAnswerText.innerHTML = '<span style="margin-right:70px;">10개씩</span><span style="margin-left:70px">묶음</span>';

	var currentAnswerDim = document.getElementById('currentAnswer'),
		currentAnswerDimText = document.createElement('div'),
		currentAnswerDim = currentAnswerDim.appendChild(currentAnswerDimText),
		currentAnswerDimText = currentAnswerDim.setAttribute('id', 'cakeIdUnits'),
		currentAnswerDimText = document.getElementById('cakeIdUnits');
		
		document.createElement('div');
		
	
		

	currentAnswerDimText.setAttribute('style', 'position:absolute; left:564px; width:320px; text-align:center;');
	currentAnswerDimText.innerHTML = '<span style="margin-right:70px;">낱개</span><span style="margin-left:70px">개</span>';
}

function initNumber() {
	log('initNumber...');

	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	    Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	    Question1 = document.querySelector('#question1'),
	    Question2 = document.querySelector('#question2'),
	    numpadBg = document.createElement('div'),
	    circleAnswer = document.querySelector('#answerObject1'),
	    triangleAnswer = document.querySelector('#answerObjectUnits');

	Question1.setAttribute('style', 'top:108px; left: 340px;');
	Question2.setAttribute('style', 'top:108px; left: 415px;');
	numpadBg.setAttribute('id', 'numpadBg');

	bgCanvas.appendChild(numpadBg);


	Question1.innerHTML = '<img src=images/candle_' + Num1 + '.png>' ;
	// Question1.innerHTML = Num1;
	Question2.innerHTML = '<img src=images/candle_' + Num2 + '.png>' ;

	// log(Num2);

}

function gameOver() {

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
	streamSound.setSound('media/orgel.mp3');
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
	    choiceLeft = 60;

	switch (gameManager.choiceQuestion.length) {
	case 1 :
		choiceLeft = 240;
		break;
	case 2 :
		choiceLeft = 312;
		break;
	case 3 :
		choiceLeft = 211;
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

		choiceLeft = choiceLeft + 200;

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

// function incorrectAnimation(dragObj) {
// 	var dragObjId = dragObj.id;
// 	dragObjId = dragObjId.split('_');

// 	var left = gameManager.choiceQuestionPosition[dragObjId[1]][1],
// 	    currentLeft = parseInt(dragObj.style.left.replace('px', ''));

// 	if (gameManager.CURRENT_TYPE === 'click' || gameManager.CURRENT_TYPE === 'train')
// 		currentLeft = 100;

// 	animate({
// 		delay : 20,
// 		duration : 800,
// 		delta : makeEaseOut(elastic),
// 		step : function(delta) {
// 			dragObj.style.top = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
// 			dragObj.style.left = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
// 		}
// 	});
// }

var count=0;

function contrastAnswer(dragObj) {
	// log(dragObj.getAttribute('answerValue'));
	// if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))){

	var answerObj1 = document.querySelector('#answerObject1'),
	    answerObj2 = document.querySelector('#answerObject2');

	counting();

	if (count === gameManager.CURRENT_ANSWER.length) {
		if (gameManager.CURRENT_ANSWER[0] === parseInt(answerObj1.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[1] === parseInt(answerObj2.getAttribute('answerValue'))) {
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
function initScene() {
	appendCircleElement('answerObject', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question2', 'circle', document.getElementById('bgCanvas'));

	appendChoiceQuestionCustom('drag', gameManager.choiceQuestion, gameManager.fingerImgArray);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

}

function initNumber(choiceQuestionArray, imgSrcArray) {

	var MaxNum,
	    MinNum,
	    Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]), //출력
	    Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	    Question1 = document.querySelector('#question1'),
	    Question2 = document.querySelector('#question2'),

	    calculation = document.createElement('img'),
	    equalsSign = document.createElement('img'),

	    fingerElement = document.getElementById('finger'),
	    fingerNumber = document.createElement('div'),

	    triLine = document.createElement('span'),
	    circleAnswer = document.querySelector('#answerObject'),
	    random = 2,
	    appendImgAnswer;

	equalsSign.src = 'images/equal.png';
	calculation.setAttribute('id', 'calculation');
	equalsSign.setAttribute('id', 'equalsSign');
	fingerNumber.setAttribute('id', 'fingerNumber');

	bgCanvas.appendChild(equalsSign);

	switch (gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length - 1]) {
	case 'A' :
		Question1.setAttribute('style', 'top:80px; left: 550px; z-index:0;');
		Question2.setAttribute('style', 'top:80px; left: 190px; z-index:0;');
		circleAnswer.setAttribute('style', 'top:80px; left: 910px; z-index:0;');
		break;
	case 'B' :

		Question1.setAttribute('style', 'top:80px; left: 910px; z-index:0;');
		Question2.setAttribute('style', 'top:80px; left: 190px; z-index:0;');
		circleAnswer.setAttribute('style', 'top:80px; left: 550px; z-index:0;');
		break;
	}

	log(gameManager.question[0]);

	Question1.innerHTML = '<img src=images/hand_' + Num2 + '.png>';
	Question2.innerHTML = '<img src=images/hand_' + Num1 + '.png>';

	switch (gameManager.calculation) {
	case '+':
		calculation.src = 'images/plus.png';
		bgCanvas.appendChild(calculation);

		break;

	case '-':
		calculation.src = 'images/minus.png';
		bgCanvas.appendChild(calculation);

		break;
	}

	log(Num1);
}

function gameOver() {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');

	logCounter.tryCounter();
	logCounter.endTime();

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

function appendChoiceQuestionCustom(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    choiceQuestionContainer = document.createElement('div'),
	    line = document.createElement('div'),
	    choiceLeft = 0;

	fingerZero = 'images/hand_0.png';
	fingerOne = 'images/hand_1.png';
	fingerTwo = 'images/hand_2.png';
	fingerThree = 'images/hand_3.png';
	fingerFour = 'images/hand_4.png';
	fingerFive = 'images/hand_5.png';

	switch (gameManager.choiceQuestion.length) {
	case 1 :
		choiceLeft = 240;
		break;
	case 2 :
		choiceLeft = 150;
		break;
	case 3 :
		choiceLeft = 0;
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

			appendImageElement('choiceQuestion_' + i, imgSrcArray[choiceQuestionArray[i]], choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
		}

		choiceLeft = choiceLeft + 275;

		currentQuestion.setAttribute('style', 'top: 468px; left:' + choiceLeft + 'px; position:absolute; margin:0px');

		if (imgSrcArray) {

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestion[i];
		}

		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([468, choiceLeft]);

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


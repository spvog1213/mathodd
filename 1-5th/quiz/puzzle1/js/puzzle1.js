function initScene() {
	// log('initScene...');
	// log(gameManager.CURRENT_ANSWER);
	// log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject_1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('answerObject_2', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('answerObject_3', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question2', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question3', 'circle', document.getElementById('bgCanvas'));

	var circleAnswer = document.querySelector('#answerObject_1');
	triangleAnswer = document.querySelector('#answerObject_2');
	finalAnswer = document.querySelector('#answerObject_3');

	circleAnswer.setAttribute('style', 'top:216px; left: 436px');
	triangleAnswer.setAttribute('style', 'top:381px; left: 106px');
	finalAnswer.setAttribute('style', 'top:546px; left: 601px');
	appendSelectQuestion('drag', gameManager.choiceQuestion);

	circleAnswer.setAttribute('candleValue',gameManager.CURRENT_ANSWER[0]);
	triangleAnswer.setAttribute('candleValue',gameManager.CURRENT_ANSWER[1]);
	finalAnswer.setAttribute('candleValue',gameManager.CURRENT_ANSWER[2]);
}

function initNumber() {
	var number = document.createElement('div');
	number.setAttribute('id','number');

	bgCanvas.appendChild(number);
	number = gameManager.TOTAL_ANSWER_ARRAY[0];

	for(var i = number; i < number + 16; i++){
		var numberText = document.createElement('div'),
		numbers = document.querySelector('#number');

		numberText.setAttribute('id','numberText_' + i);

		numberText.className = 'numberText';

		numbers.appendChild(numberText); 
		numberText.innerHTML = i;
	}

	var que1 = numbers.childNodes[6],
	que2 = numbers.childNodes[8],
	que3 = numbers.childNodes[15];

	que1.innerHTML = '';
	que2.innerHTML = '';
	que3.innerHTML = '';

}

function initpuzzle() {
	log('initpuzzle...');
	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	Num3 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[2]),
	puzzleBg = document.createElement('img'),
	circleAnswer = document.querySelector('#answerObject1'),
	triangleAnswer = document.querySelector('#answerObject2'),
	finalAnswer = document.querySelector('#answerObject3'),
	choiceGroup = document.querySelector('#choiceQuestionContainer');

	puzzleBg.setAttribute('id', 'puzzleBg');
	bgCanvas.appendChild(puzzleBg);

	puzzleArray = ['orange','pink','violet'];
	var puzzleRandom = parseInt(Math.random() * 3);

	switch (puzzleRandom){
		case 0 :
		puzzleRandom = puzzleArray[0];
		gameManager.correctArray = ['0','images/puzzle_4x4_orange_1.png', 'images/puzzle_4x4_orange_2.png', 'images/puzzle_4x4_orange_3.png'];
		break;
		case 1 :
		puzzleRandom = puzzleArray[1];
		gameManager.correctArray = ['0','images/puzzle_4x4_pink_1.png', 'images/puzzle_4x4_pink_2.png', 'images/puzzle_4x4_pink_3.png'];
		break;
		case 2 :
		puzzleRandom = puzzleArray[2];
		gameManager.correctArray = ['0','images/puzzle_4x4_violet_1.png', 'images/puzzle_4x4_violet_2.png', 'images/puzzle_4x4_violet_3.png'];
		break;
	}
	puzzleBg.src = 'images/puzzle_4x4_'+ puzzleRandom + '_bg01.png';

	for(var i = 0; i < choiceGroup.childNodes.length; i++){
		var choiceBgWrap = document.querySelector('#choiceQuestionContainer').childNodes[i],
		choiceBg = document.createElement('img');

		choiceBg.setAttribute('id','choiceBg');
		choiceBgWrap.appendChild(choiceBg);

		var puzzleBgSrc = puzzleBg.src,
		BgObj = puzzleBgSrc.split('_');
		BgObj = BgObj.slice(-2);
		BgObj = BgObj.shift(-1);

		choiceBg.src = 'images/puzzle_4x4_'+ BgObj + '.png';
		bgBackground.src = 'images/puzzle_4x4_'+ BgObj + '_bg02.png';
	}
}

function returnCurrentObj(dragObj) {

	var answerValue = dragObj.getAttribute('answerValue');

	for (var i = 1; i < gameManager.CURRENT_ANSWER.length+1; i++) {
		if (answerValue === document.querySelector('#answerObject_' + i).getAttribute('candleValue')) {
			return document.querySelector('#answerObject_' + i);
		}
	}

}


function gameOver() {
	var puzzleBg = document.querySelector('#puzzleBg'),
	choiceBg = document.querySelector('#choiceBg'),
	number = document.querySelector('#number');
	
	
	puzzleBg.style.display = 'none';
	

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;


	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
		var choiceBgBye = choiceQuestionContainer[i].childNodes[1];
		choiceBgBye.style.display = 'none';

	}

	var puzzleBg = document.querySelector('#puzzleBg'),
	bgBackground = document.querySelector('#bgBackground'),
	choiceBg = document.querySelector('#choiceBg'),
	number = document.querySelector('#number'),
	puzzleBgSrc = puzzleBg.src,
	BgObj = puzzleBgSrc.split('_');
	BgObj = BgObj.slice(-2);
	BgObj = BgObj.shift(-1);
	
	// puzzleBg.style.display = 'none';
	puzzleBg.src = 'images/puzzle_4x4_'+ BgObj + '_bg02.png';

	

	number.style.display = 'none';


	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();

	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
	},300);

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
	line = document.createElement('div'),
	choiceTop = -190,
	choiceLeft = 900;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceLeft = 240;
		break;
		case 2 :
		choiceLeft = 312;
		break;
		case 3 :
		choiceLeft = 900;
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

		choiceTop = choiceTop + 240;

		if (i === 1) {
			choiceLeft = 1095;
		} else if (i === 2) {
			choiceLeft = 943;
		}

		currentQuestion.setAttribute('style', 'left: ' + choiceLeft + 'px; Top: ' + choiceTop + 'px;');

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


function puzzleCompareAnswer(dragObj, arrayNum) {
	dragObj.style.pointerEvents = 'none';
	dragObj.className += ' correct';
	var correct = document.querySelectorAll('.correct');
	

	
	dragObj.childNodes[1].src = gameManager.correctArray[arrayNum];

	if (correct.length === gameManager.CURRENT_ANSWER.length) {



		setTimeout(function() {
			for (var i = 0; i < correct.length; i++) {
				correct[i].style.display = "none";
			}

			gameOver();
		}, 800);

	}

}

function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var puzzleType = parseInt(Math.random() * 3);
	switch (puzzleType) {
	case 0:
		gameManager.puzzleType = 'images/puzzle_5x5_orange.png';
		gameManager.puzzleBg = 'images/puzzle_5x5_orange_bg01.png';
		gameManager.puzzleSuccess = 'images/puzzle_5x5_orange_bg02.png';
		gameManager.correctArray = ['images/puzzle_5x5_bus_1.png', 'images/puzzle_5x5_bus_2.png', 'images/puzzle_5x5_bus_3.png', 'images/puzzle_5x5_bus_4.png'];
		break;
	case 1:
		gameManager.puzzleType = 'images/puzzle_5x5_pink.png';
		gameManager.puzzleBg = 'images/puzzle_5x5_pink_bg01.png';
		gameManager.puzzleSuccess = 'images/puzzle_5x5_pink_bg02.png';
		gameManager.correctArray = ['images/puzzle_5x5_cake_1.png', 'images/puzzle_5x5_cake_2.png', 'images/puzzle_5x5_cake_3.png', 'images/puzzle_5x5_cake_4.png'];
		break;
	case 2:
		gameManager.puzzleType = 'images/puzzle_5x5_violet.png';
		gameManager.puzzleBg = 'images/puzzle_5x5_violet_bg01.png';
		gameManager.puzzleSuccess = 'images/puzzle_5x5_violet_bg02.png';
		gameManager.correctArray = ['images/puzzle_5x5_fishing_1.png', 'images/puzzle_5x5_fishing_2.png', 'images/puzzle_5x5_fishing_3.png', 'images/puzzle_5x5_fishing_4.png'];
		break;
	}

	for (var i = 0; i < gameManager.CURRENT_ANSWER.length; i++) {
		appendCircleElement('answerObject_' + i, 'answer', document.getElementById('bgCanvas'));
		document.querySelector('#answerObject_' + i).setAttribute('puzzleValue', gameManager.CURRENT_ANSWER[i]);
	}

	appendCircleElement('puzzleBg', 'puzzleBg', document.getElementById('bgCanvas'));
	appendImageElement('puzzleBgEnd', gameManager.puzzleSuccess, document.querySelector('#puzzleBg'));
	appendImageElement('puzzleBgImg', gameManager.puzzleBg, document.querySelector('#puzzleBg'));

	appendSelectQuestion('drag', gameManager.choiceQuestion, gameManager.puzzleType);

}

function initPuzzle2() {
	log('initPuzzle2...');

	var answerObject0 = document.querySelector('#answerObject_0'),
	    answerObject1 = document.querySelector('#answerObject_1'),
	    answerObject2 = document.querySelector('#answerObject_2'),
	    answerObject3 = document.querySelector('#answerObject_3'),
	    top = 10,
	    left = 11,
	    cnt = 0;

	answerObject0.setAttribute('style', 'top:51px; left: 499px;');
	answerObject1.setAttribute('style', 'top:183px; left: 236px;');
	answerObject2.setAttribute('style', 'top:446px; left: 367px;');
	answerObject3.setAttribute('style', 'top:579px; left: 499px;');

	for (var i = gameManager.TOTAL_ANSWER_ARRAY[0]; i < gameManager.TOTAL_ANSWER_ARRAY[0] + 25; i++) {
		appendCircleElement('puzzleTxt_' + i, 'puzzleTxt', document.querySelector('#puzzleBg'));
		document.querySelector('#puzzleTxt_' + i).setAttribute('style', 'top:' + top + 'px; left: ' + left + 'px;');
		document.querySelector('#puzzleTxt_' + i).innerHTML = i;
		cnt++;

		left = left + 132;
		if (cnt % 5 === 0) {
			left = 11;
			top = top + 130;
		} else if (cnt === 4 || cnt === 7 || cnt === 18 || cnt === 24) {
			document.querySelector('#puzzleTxt_' + i).style.display = "none";
		}
	}
}

function gameOver() {

	var puzzleBg = document.querySelector('#puzzleBgImg'),
	    puzzleBgEnd = document.querySelector('#puzzleBgEnd'),
	    puzzleTxt = document.querySelectorAll('.puzzleTxt');

	
	/*
	animate({
				delay : 0,
				duration : 150,
				delta : makeEaseInOut(quint),
				step : function(delta) {
					puzzleBgEnd.style.opacity = (1 * delta);
				}
			});*/
	
	

	for (var i = 0; i < puzzleTxt.length; i++) {
		puzzleTxt[i].style.display = "none";

	}

	puzzleBg.src = gameManager.puzzleSuccess;

	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();

	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
	}, 40);

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
	    choiceTop = -110,
	    choiceLeft = 870;

	choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');
	bgCanvas.appendChild(choiceQuestionContainer);

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var currentQuestion;

		var choiceQuestionGroup = document.createElement('div'),
		    className = 'puzzleWrap';

		choiceQuestionGroup.setAttribute('id', 'dragTarget_' + i);
		choiceQuestionContainer.appendChild(choiceQuestionGroup);

		appendImageElement('choiceQuestion_' + i, imgSrcArray, choiceQuestionGroup);
		currentQuestion = document.querySelector('#dragTarget_' + i);
		currentQuestion.className = 'puzzle';

		choiceTop = choiceTop + 170;

		if (i === 1) {
			choiceLeft = 1095;
		} else if (i === 2) {
			choiceLeft = 943;
		} else if (i === 3) {
			choiceLeft = 1030;
		}
		currentQuestion.setAttribute('style', 'left: ' + choiceLeft + 'px; Top:' + choiceTop + 'px;');
		var imgObjText = document.createElement('div');
		imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
		imgObjText.className = 'puzzleText';
		imgObjText.setAttribute('style', 'top: 0px; left: 0px;');
		imgObjText.innerHTML = gameManager.choiceQuestionText[i];

		choiceQuestionGroup.appendChild(imgObjText);

		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);

		new Dragdrop(currentQuestion);
	}
}

function returnCurrentObj(dragObj) {

	var answerValue = dragObj.getAttribute('answerValue');

	for (var i = 0; i < gameManager.CURRENT_ANSWER.length; i++) {
		if (answerValue === document.querySelector('#answerObject_' + i).getAttribute('puzzleValue')) {
			return document.querySelector('#answerObject_' + i);
		}
	}

}

function puzzleCompareAnswer(dragObj, arrayNum) {
	dragObj.style.pointerEvents = 'none';
	dragObj.className += ' correct';
	var correct = document.querySelectorAll('.correct');
	
	dragObj.childNodes[0].src = gameManager.correctArray[arrayNum];

	if (correct.length === gameManager.CURRENT_ANSWER.length) {

		setTimeout(function() {
			for (var i = 0; i < correct.length; i++) {
				correct[i].style.display = "none";
			}
			gameOver();

		}, 800);

	}

}

function initScene() {

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	makeRandomArray(1, 6);
	drawNumbers();
	drawSymbols();
	drawArrows();
	appendSelectQuestion('drag', gameManager.quizObj);
}

function makeRandomArray(min, length) {
	gameManager.randomArray = [];
	var length = length || 1,
		min = min || 0,
		randomNumber = 0,
		inspector = '';

	do {
		randomNumber = Math.floor(Math.random() * length) + min;
		if(inspector.indexOf(randomNumber) < 0) gameManager.randomArray.push(randomNumber);
		inspector += randomNumber.toString();
	} while (gameManager.randomArray.length !== length);

	return gameManager.randomArray;
}

function drawNumbers() {
	var bgCanvas = QS('#bgCanvas'),
		top = 125,
		left = 120,
		leftChange = 230;

	for (var i = 0; i < 5; i++) {
		var numCard = createElement('div', bgCanvas),
			className = 'numCard',
			textDiv = createElement('div', numCard, 'text'),
			text = gameManager.QUIZ_OPTION[i],
			img = createElement('img', numCard),
			imgSrc = '';

		numCard.style.top = top + 'px';
		numCard.style.left = left + 'px';
		left += leftChange;

		if (i === 4) {
			className = 'numCard result',
			text = gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1],
			imgSrc = './images/balloon_blank.png';
		} else if (i > 1 && i <= 3) {
			className = 'dropArea_' + (i - 2),
			text = '',
			imgSrc = './images/balloon_questionBox.png';
			numCard.setAttribute('answervalue', gameManager.QUIZ_ANSWER[i - 2]);
			gameManager.dropArea.push(numCard);
		} else {
			imgSrc = './images/balloon0' + gameManager.randomArray.pop() + '.png';
		}

		numCard.className = className;
		img.src = imgSrc;
		if(typeof text === 'object') makeBunsu(text.toString(), textDiv);
		else textDiv.innerHTML = text;
	}
}

function drawSymbols() {
	var bgCanvas = QS('#bgCanvas'),
		symbolContainer = createElement('div', bgCanvas, 'symbolContainer'),
		top = 195, left = 300, leftChange = 230;

	for (var i = 0; i < 4; i++) {
		var symbol = createElement('span', symbolContainer, 'symbol');

		switch (i) {
			case 0: var text = '/'; break;
			case 1: var text = '='; break;
			case 2: var text = '*'; break;
			case 3: var text = '='; break;
		}

		replaceSymbol(text, symbol);
		symbol.style.top = top + 'px';
		symbol.style.left = left + 'px';
		symbol.querySelector('img').setAttribute('style', 'vertical-align: top;');
		if(i === 3) symbol.classList.add('result');

		left += leftChange;
	}
}

function drawArrows() {
	var bgCanvas = QS('#bgCanvas');

	for (var i = 0; i < 2; i++) {
		var arrow = createElement('img', bgCanvas, 'arrow arrow_' + i);
		if (i === 0) arrow.src = './images/arrow.png';
		else arrow.src = './images/arrow_reverse.png';
	}
}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = QS('#bgCanvas'),
		quizObjContainer = createElement('div', bgCanvas, 'quizObjContainer'),
		top = 455,
		width = 161,
		left = 200,
		leftChange = (bgCanvas.clientWidth - width * 4 - left * 2) / 3 + width;

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var dragObj = createElement('div', quizObjContainer, 'dragObj dragObj_' + i ),
			textDiv = createElement('div', dragObj, 'text'),
			text = choiceQuestionArray[i],
			img = createElement('img', dragObj),
			imgSrc = './images/balloon0' + gameManager.randomArray.pop() + '.png';

		dragObj.setAttribute('answervalue', choiceQuestionArray[i]);
		dragObj.style.top = top + 'px';
		dragObj.style.left = left + 'px';

		img.src = imgSrc;

		if(typeof text === 'object') makeBunsu(text.toString(), textDiv);
		else textDiv.innerHTML = text;

		gameManager.quizPosition.push([top, left]);

		left += leftChange;

		new Dragdrop(dragObj);
	}
}

function boundingCircle(dragObj, x, y) {
	var idx = dragObj.className.split('_')[1];
	var dragObjValue = dragObj.getAttribute('answerValue');
	if (dropCompare(dragObj, x, y)) {
		log('bounding!');
		streamSound.setSound('./media/dragFigure.mp3');
		correctPosition(dragObj);
		gameManager.dabCount += 1;

		if (gameManager.dabCount == gameManager.QUIZ_ANSWER.length) {
			log('@ correct!!');
			gameOver(dragObj);
		}

		gameManager.dropArea[gameManager.dropIdx].querySelector('img').style.opacity = 0;
		gameManager.dropArea[gameManager.dropIdx].querySelector('img').style.visibility = 'hidden';

		boundingCounter = true;
	} else {
		log('>>>>> not bounding!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}


function gameOver(currentObj) {

	var canvas = QS('#bgCanvas'),
		result = QSAll('.result');

	canvas.style.pointerEvents = "none";
	for(var i = 0; i < result.length; i++) result[i].classList.add('on');

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	streamSound.setSound(gameManager.soundEffct);
	setTimeout(function() {
		gameOverAnimation();
	}, 200);

	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2000);

}

// dragdrop_n.js에서 일부 수정, 덮어씌움
function dropCompare (dragObj, x, y) {
	var dragObjValue = dragObj.getAttribute('answervalue');

	for (var i = 0; i < gameManager.dropArea.length; i++) {

		var dropValue = gameManager.dropArea[i].getAttribute('answervalue');
		dropValue = dropValue.split(',');

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth + 10) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight + 10) * gameManager.zoomRate)) {

			if (dragObjValue == dropValue) {
				gameManager.dropIdx = i;
				return true;
			}
		}
	}
	return false;
}

// 분수 만드는 함수
function makeBunsu(text, targetElement){
	var bunsuArray = [],
		bunsuTxt = [],
		beforeTxt = '',
		afterTxt = '';

	if(text.indexOf('[') > -1) {
		while(text.indexOf('[') > -1) {
			if(spitBunsuText(text).length === 3) {
				beforeTxt = spitBunsuText(text)[2];
				var bText = createElement('span', targetElement);
				bText.innerHTML = beforeTxt;
			}
			bunsuTxt = spitBunsuText(text)[0];
			afterTxt = spitBunsuText(text)[1];
			bunsuArray = bunsuTxt.split(',');

			drawBunsu(bunsuArray, targetElement);
			text = afterTxt; // console.log(text);
		}
	} else {
		bunsuArray = text.split(',');
		drawBunsu(bunsuArray, targetElement);
		text = afterTxt;
	}

	var aText = createElement('span', targetElement);
	aText.innerHTML = afterTxt;
}

// 분수 그릴 때 필요한 array 만드는 함수
function spitBunsuText(src){
	if(src.indexOf('[') === 0) {
		var startIdx = src.indexOf('['),
			endIdx = src.indexOf(']'),
			bunsuTxt = src.slice(startIdx + 1, endIdx),
			afterTxt = src.slice(endIdx + 1),
			resultArray = [bunsuTxt, afterTxt];
	} else {
		var startIdx = src.indexOf('['),
			endIdx = src.indexOf(']'),
			beforeTxt =  src.slice(0, startIdx),
			bunsuTxt = src.slice(startIdx + 1, endIdx),
			afterTxt = src.slice(endIdx + 1),
			resultArray = [bunsuTxt, afterTxt, beforeTxt];
	}
	return resultArray;
}

// 분수 그리는 함수
function drawBunsu(bunsuArray, parentElement){
	var bunsuDiv = createElement('div', parentElement, 'bunsuDiv'),
		int = createElement('div', bunsuDiv, 'int'),
		prop = createElement('div', bunsuDiv, 'prop'),
		bunja = createElement('div', prop, 'bunja'),
		bunmo = createElement('div', prop, 'bunmo'),
		midLine = createElement('div', prop, 'midLine');

	if (bunsuArray[0] != 0) int.innerHTML = bunsuArray[0];

	bunja.innerHTML = bunsuArray[1];
	bunmo.innerHTML = bunsuArray[2];

	bunsuDiv.style.cssText = 'display: inline-block; vertical-align: middle';
	int.style.cssText = 'display: inline-block; margin-right: 5px; vertical-align: middle';
	prop.style.cssText = 'position: relative; display: inline-block; line-height: 1.25em; vertical-align: middle';
	bunja.style.cssText = 'display: block; vertical-align: middle';
	bunmo.style.cssText = 'display: block; vertical-align: middle';
	midLine.style.cssText = 'position: absolute; top: 50%; left: 0; width: 100%; height: 0; margin-top: -0.05em; border-top: 0.1em solid; border-color: inherit;';
}

function convertBunsuToDec(array) { return (Number(array[0]) * Number(array[2]) + Number(array[1])) / Number(array[2]); }

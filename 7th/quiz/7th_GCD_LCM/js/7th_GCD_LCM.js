function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	switch(gameManager.QUIZ_OPTION[1]) {
		case '최대공약수': gameManager.answerType = 'GCD'; break;
		case '최소공배수': gameManager.answerType = 'LCM'; break;
	}
	gameManager.numArray = gameManager.QUIZ_OPTION[0];

	drawTitle();
	drawNumbers();
	drawDropArea();
	drawDragObjs();
}

// 제목 그리기
function drawTitle() {
	var canvas = QS('#bgCanvas'),
		title = createElement('div', canvas, 'title'),
		numArray = gameManager.QUIZ_OPTION[0],
		text = '',
		arrow = createElement('img', canvas, 'arrow');

	for(var i = 0; i < numArray.length; i++) {
		if(i === numArray.length - 1) text += gameManager.QUIZ_OPTION[0][i] + '의 ' + gameManager.QUIZ_OPTION[1];
		else text += gameManager.QUIZ_OPTION[0][i] + ', ';
	}
	title.innerHTML = text;
	arrow.src = './images/arrow.png';
}

// dropArea 그리기
function drawDropArea() {
	var dropArea, top, left, img, answervalue;
	top = 90 + (gameManager.dabCount * 117);
	left = 680;
	dropArea = createElement('div', QS('#bgCanvas'), 'dropArea_' + gameManager.dropArea.length);
	img = createElement('img', dropArea, 'cardImg');
	answervalue = gameManager.QUIZ_ANSWER[gameManager.dabCount];

	dropArea.style.top = top + 'px';
	dropArea.style.left = left + 'px';

	img.src = './images/numberBox_2.png';

	// dropArea.setAttribute('answervalue', gameManager.QUIZ_ANSWER); //hh(0911)

	gameManager.dropArea.pop();
	gameManager.dropArea.push(dropArea);
}

// 칠판에 숫자 그리기
function drawNumbers() {
	var numberBox, top, left, width, height, number, num;
	numbersBox = createElement('div', QS('#bgCanvas'), 'numbersBox');
	top = 112 + (gameManager.dabCount * 115);
	left = 800; width = 290; height = 70;

	numbersBox.style.top = top + 'px';
	numbersBox.style.left = left + 'px';
	numbersBox.style.width = width + 'px';
	numbersBox.style.height = height + 'px';

	for(var i = 0; i < gameManager.QUIZ_OPTION[0].length; i++) {
		number = createElement('div', numbersBox, 'number');
		num = gameManager.numArray[i];

		if(gameManager.numArray.length === 3) { left = 15; width = 75; }
		else { left = 25; width = 100; }
		number.style.marginLeft = left + 'px';
		number.style.width = width + 'px';
		number.style.height = height + 'px';
		number.innerHTML = num;
	}

	// 게임 끝날 때,
	if(gameManager.isEnded)
		numbersBox.style.background = 'none';
}

function drawDragObjs() {
	var bgCanvas = QS('#bgCanvas'),
		top = 570,
		left = 305,
		leftChange = 183;

	for (var i = 0; i < 4; i++) {
		var dragObj = createElement('div', bgCanvas, 'dragObj dragObj_' + i),
			img = createElement('img', dragObj, 'cardImg'),
			textDiv = createElement('div', dragObj, 'text'),
			text = gameManager.QUIZ_OPTION[i + 2];

		dragObj.style.top = top + 'px';
		dragObj.style.left = left + 'px';

		img.src = './images/numberBox_1.png';

		textDiv.innerHTML = text;

		dragObj.setAttribute('answervalue', text);

		gameManager.quizPosition.push([top, left]);

		left += leftChange;

		new Dragdrop(dragObj);
	}
}

function boundingCircle(dragObj, x, y) {
	if (dropCompare(dragObj, x, y)) {
		log('bounding!');
		gameManager.dabCount++;
		streamSound.setSound('./media/dragFigure.mp3');

		checkIsEnded();

		if(gameManager.isEnded) {
			log('@ correct!!');
			gameOver(dragObj);
		}

		changeDropArea(dragObj);
		drawNumbers();
		if(gameManager.isEnded) return;
		drawDropArea();

		boundingCounter = true;
	} else {
		log('>>>>> not bounding!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}

function dropCompare (dragObj, x, y) {
	var answervalue = Number(dragObj.getAttribute('answervalue'));

	checkIsRest(dragObj);

	for (var i = 0; i < gameManager.dropArea.length; i++) {
		// var dropValue = Number(gameManager.dropArea[i].getAttribute('answervalue'));  //hh(0911)
		var dropValue = gameManager.QUIZ_ANSWER;

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth + 10) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight + 10) * gameManager.zoomRate)) {

			for(var i = 0; i < dropValue.length; i++){  //hh(0911)
				if(answervalue === dropValue[i] && gameManager.isRest) {  //hh(0911)
					if(gameManager.answerType === 'GCD') {
						for(var j = 0; j < gameManager.numArray.length; j++) {
							gameManager.numArray[j] = gameManager.numArray[j] / answervalue;
						}
						gameManager.dropIdx = i;
					} else {
						for(var j = 0; j < gameManager.numArray.length; j++) {
							if(gameManager.numArray[j] % answervalue === 0) gameManager.numArray[j] = gameManager.numArray[j] / answervalue;
						}
					}
					return true;
				}
			}
		}
	}
	return false;
}

function checkIsRest(dragObj) {
	var answervalue = Number(dragObj.getAttribute('answervalue')),
		checkCount = 0;
	for(var i = 0; i < gameManager.numArray.length; i++) {
		var rest = gameManager.numArray[i] % answervalue;

		if(gameManager.answerType === 'GCD') {
			if(rest !== 0) gameManager.isRest = false;
			else gameManager.isRest = true;
		} else {
			gameManager.isRest = false;
			if(rest === 0) {
				checkCount++;
				if(checkCount >= 2) return gameManager.isRest = true;
			}
		}
	}
}

// 게임 종료인지 check
function checkIsEnded() {
	var dragObjs = QSAll('.dragObj');

	for(var i = 0; i < dragObjs.length; i++) {
		var answervalue = Number(dragObjs[i].getAttribute('answervalue')),
			restCount = 0;

		for(var j = 0; j < gameManager.numArray.length; j++) {
			var rest = gameManager.numArray[j] % answervalue;

			gameManager.isEnded = true;

			if(rest === 0) restCount++;
			if(gameManager.answerType === 'GCD') {
				if(restCount === gameManager.numArray.length) return gameManager.isEnded = false;
			} else {
				if(restCount >= 2) return gameManager.isEnded = false;
			}
		}
	}
}

function changeDropArea(dragObj) {
	var idx, top, left;
	idx = Number(dragObj.className.split('_')[1]);
	top = gameManager.quizPosition[idx][0];
	left = gameManager.quizPosition[idx][1];

	dragObj.style.top = top + 'px';
	dragObj.style.left = left + 'px';
	gameManager.dropArea[0].querySelector('img').src = './images/numberBox_1.png';
	var text = createElement('span', gameManager.dropArea[0], 'text');
	text.innerHTML = Number(dragObj.getAttribute('answervalue'));
}

function gameOver(dragObj) {
	QS('#bgCanvas').style.pointerEvents = "none";

	drawAnswer();

	setTimeout(function() {
		gameOverAnimation();
		logCounter.tryCounter();
		logCounter.endTime();
		streamSound.setSound(gameManager.soundEffct);
	}, 100);

	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);
}

// 정답 그리기
function drawAnswer() {
	var canvas, answerDiv, answer, textArray, text, scsBox;
	canvas = QS('#bgCanvas');
	answer = createElement('div', canvas, 'answer');
	textArray = (gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1].indexOf(' ') > -1) ? gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1].split(' ') : gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1].split('');

	for(var i = 0; i < textArray.length; i++) {
		text = createElement('span', answer);
		if(findReplaceSymbol(textArray[i])) {
			replaceSymbol(textArray[i], text);
			text.querySelector('img').style.cssText = 'width: 30px; height: 30px; margin: 0 10px';
		}
		else {
			text.innerHTML = textArray[i];
		}
	}

	scsBox = createElement('img', canvas, 'scsBox');
	scsBox.src = './images/successBox_' + gameManager.answerType +'.png';
}

// symbol 있는지 찾아주는 함수
function findReplaceSymbol(text) { return (text.indexOf('+') > -1 || text.indexOf('-') > -1 || text.indexOf('*') > -1 || text.indexOf('/') > -1 || text.indexOf('=') > -1 || text.indexOf('...') > -1 || text.indexOf('divBox') > -1 || text.indexOf('invisibleBox') > -1) }

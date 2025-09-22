var canvas = QS('#bgCanvas');

function initScene() {
	log('initScene...');

	makeRandomArray(1, 7);
	drawBalloons();
	drawDragObjs();

}

function makeRandomArray(min, length) {
	var max = length || 0,
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

function drawBalloons() {
	var balloonContainer = createElement('div', canvas, 'balloonContainer'),
		balloonHead = createElement('img', balloonContainer, 'balloonHead'),
		symbolSize = 34;

	balloonHead.src = './images/balloon_basket.png';

	for (var i = 0; i < 5; i++) {
		var balloon = createElement('div', balloonContainer, 'balloon'),
			img = createElement('img', balloon),
			imgSrc = '',
			textDiv = createElement('div', balloon, 'text'),
			text = gameManager.QUIZ_OPTION[i];

		if (text === '') {
			var answervalue = convertBunsuToDec(gameManager.QUIZ_ANSWER[0]).toFixed(3);

			imgSrc = './images/balloon_empty.png'
			balloon.className = 'dropArea_0';
			balloon.setAttribute('answervalue', answervalue);

			gameManager.dropArea.push(balloon);
		} else {
			imgSrc = './images/balloon_' + gameManager.randomArray.shift() + '.png';
		}

		balloon.style.top = gameManager.ballonPosition[i][0] + 'px';
		balloon.style.left = gameManager.ballonPosition[i][1] + 'px';

		if (typeof text === 'object') makeBunsu(text.toString(), textDiv);
		else if (typeof text === 'string' && text !== '') {
			replaceSymbol(text, textDiv);
			textDiv.querySelector('img').style.width = symbolSize + 'px';
			textDiv.querySelector('img').style.height = symbolSize + 'px';
		} else textDiv.innerHTML = text;

		img.src = imgSrc;
	}
}

function drawDragObjs() {
	var top = 50, topChange = 220, left = 1000;
	for (var i = 0; i < 3; i++) {
		var dragObj = createElement('div', canvas, 'dragObj dragObj_' + i),
			img = createElement('img', dragObj),
			textDiv = createElement('div', dragObj, 'text'),
			text = gameManager.QUIZ_OPTION[i + 5],
			answervalue = ''

		answervalue = convertBunsuToDec(text).toFixed(3);

		img.src = './images/balloon_' + gameManager.randomArray.shift() + '.png';
		typeof text === 'object' ? makeBunsu(text.toString(), textDiv) : textDiv.innerHTML = text;

		dragObj.style.top = top + 'px';
		dragObj.style.left = left + 'px';
		dragObj.setAttribute('answervalue', answervalue);

		gameManager.quizPosition.push([top, left]);

		top += topChange;

		new Dragdrop(dragObj);
	}
}

function dropCompare (dragObj, x, y) {
	var dragObjValue = dragObj.getAttribute('answervalue');

	for (var i = 0; i < gameManager.dropArea.length; i++) {

		var dropValue = gameManager.dropArea[i].getAttribute('answervalue');

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth + 10) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight + 10) * gameManager.zoomRate)) {

			if (dragObjValue == dropValue) {
				gameManager.dropIdx = i;
				return true;
			}
			return false;
		}
	}
}

function boundingCircle(dragObj, x, y) {

	var idx = dragObj.className.split('_')[1];
	var dragObjValue = dragObj.getAttribute('answerValue');
	if (dropCompare(dragObj, x, y)) {

		log('bounding!');
		log('@ correct!!');

		correctPosition(dragObj);
		gameOver(dragObj);

		boundingCounter = true;
	} else {
		log('>>>>> not bounding!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}

function gameOver(dragObj) {
	var balloonContainer = QS('.balloonContainer'),
	top = -1000, left = 200;

	streamSound.setSound(gameManager.soundEffct);
	canvas.pointerEvents = 'none';
	balloonContainer.appendChild(dragObj);

	document.querySelector('#bgCanvas').style.pointerEvents = 'none';

	setTimeout(function () {
		animate({
			delay: 20,
			duration: 2000,
			delta: makeEaseInOut(quad),
			step: function (delta) {
				balloonContainer.style.top = (top * delta)  + 'px';
				balloonContainer.style.left = (left * delta)  + 'px';
			}
		});
	}, 500);

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();
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
			text = afterTxt;
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
		bunmo = createElement('div', prop, 'bunmo');

	if(bunsuArray[0] != 0) int.innerHTML = bunsuArray[0];

	bunja.innerHTML = bunsuArray[1];
	bunmo.innerHTML = bunsuArray[2];
}

function convertBunsuToDec(array) { return (Number(array[0]) * Number(array[2]) + Number(array[1])) / Number(array[2]); }

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	if(gameManager.QUIZ_OPTION.length === 11) gameManager.windowCount = 3;
	else gameManager.windowCount = 2;

	makeRandomArray(1, 4);
	drawSubmarine();
	drawDropAreas();
	drawDragObjs();
	drawHints();
}

function makeRandomArray(mix, max) {
	var max = max || 0,
		min = min || 0,
		randomNumber = 0,
		inspector = '';

	do {
		randomNumber = Math.floor(Math.random() * max) + min;
		if(inspector.indexOf(randomNumber) < 0) gameManager.randomArray.push(randomNumber);
		inspector += randomNumber.toString();
	} while (gameManager.randomArray.length !== max - 1);

	return gameManager.randomArray;
}

function drawSubmarine() {
	var bgCanvas = QS('#bgCanvas'),
		submarineContainer = createElement('div', bgCanvas, 'submarineContainer'),
		submarineBody = createElement('img', submarineContainer, 'submarineBody'),
		propeller = createElement('img', submarineContainer, 'propeller');

	submarineBody.src = './images/submarine_body.png';
	propeller.src = './images/propeller_0.png';

	drawWindows();
}

function drawWindows() {
	var submarineContainer = QS('.submarineContainer'),
		windowsContainer = createElement('div', submarineContainer, 'windowsContainer'),
		containerTop = 285,
		containerLeft = 185,
		leftChange = 220;

	switch(gameManager.windowCount) {
		case 2: var left = 250; break;
		case 3: var left = 160; break;
	}

	windowsContainer.style.top = containerTop + 'px';
	windowsContainer.style.left = containerLeft + 'px';

	for (var i = 0; i < gameManager.windowCount; i++) {
		var symbolWindow = createElement('div', windowsContainer, 'symbolWindow'),
			img = createElement('img', symbolWindow),
			span = createElement('span', symbolWindow),
			symbolText = '';

		symbolWindow.style.left = left + 'px';
		img.src = './images/symbol_window.png';

		left += leftChange;

		if(i !== (gameManager.windowCount - 1)) symbolText = gameManager.QUIZ_OPTION[i + gameManager.windowCount];
		else symbolText = '=';

		replaceSymbol(symbolText, span);

		var symbolImg = span.querySelector('img');

		symbolImg.style.width = 34 + 'px';
		symbolImg.style.height = 34 + 'px';
		symbolImg.style.margin = 0 + 'px';
	}
}

function drawDropAreas() {
	var submarineContainer = QS('.submarineContainer'),
		windowContainer = QS('.windowsContainer'),
		top = 270,
		leftChange = 220;

		switch(gameManager.windowCount) {
			case 2: var left = 280; break;
			case 3: var left = 190; break;
		}

	for (var i = 0; i < (gameManager.windowCount + 1); i++) {
		var dropArea = createElement('div', submarineContainer, 'dropArea_' + i),
			img = createElement('img', dropArea),
			textDiv = createElement('div', dropArea, 'text'),
			text = gameManager.QUIZ_OPTION[i],
			answervalue = '';

		dropArea.style.top = top + 'px';
		dropArea.style.left = left + 'px';

		if(i === gameManager.windowCount) {
			img.src = './images/window_blank.png';
			if(gameManager.QUIZ_ANSWER[0].length === 1) answervalue = gameManager.QUIZ_ANSWER[0];
			else answervalue = convertBunsuToDec(gameManager.QUIZ_ANSWER[0]);

		}
		else {
			img.src = './images/window_' + gameManager.randomArray[0] + '.png';
			answervalue = convertBunsuToDec(text);

			if(typeof text !== 'object') textDiv.innerHTML = text;
			else makeBunsu(text.toString(), textDiv);
		}

		dropArea.setAttribute('answervalue', answervalue);

		gameManager.dropArea.push(dropArea);

		left += leftChange;
	}
}

function drawDragObjs() {
	var bgCanvas = QS('#bgCanvas'),
		top = 520,
		left = 220,
		leftChange = 280;

	for (var i = 0; i < 3; i++) {
		var dragObj = createElement('div', bgCanvas, 'dragObj dragObj_' + i),
			img = createElement('img', dragObj),
			textDiv = createElement('div', dragObj, 'text');

		switch(gameManager.windowCount) {
			case 2: var text = gameManager.QUIZ_OPTION[i + 3]; break;
			case 3: var text = gameManager.QUIZ_OPTION[i + 5]; break;
		}

		dragObj.style.top = top + 'px';
		dragObj.style.left = left + 'px';
		img.src = './images/window_' + gameManager.randomArray[1] + '.png';

		if(typeof text !== 'object') textDiv.innerHTML = text;
		else makeBunsu(text.toString(), textDiv);

		dragObj.setAttribute('answervalue', convertBunsuToDec(text));

		gameManager.quizPosition.push([top, left]);

		left += leftChange;

		new Dragdrop(dragObj);
	}
}

function drawHints() {
	var bgCanvas = QS('#bgCanvas'),
		popupCover = document.createElement('div');
		popup = createElement('div', bgCanvas, 'popup'),
		popupTitle = createElement('div', popup, 'popupTitle'),
		hintBtn = createElement('div', bgCanvas, 'hintBtn');

	popupCover.setAttribute('class', 'popupCover');
	popupCover.style.width = window.innerWidth + 'px';
	popupCover.style.height = window.innerHeight + 'px';
	bgCanvas.insertBefore(popupCover, QS('.dragObj dragObj_0'));

	popupTitle.innerHTML = '크기가 같은 분수로 바꿔 보세요.'

	hintBtn.addEventListener(gameManager.eventSelector.upEvent, hintBtnClick, false);

	drawHintObjs();
}

function hintBtnClick() {
	var dropAreas = QSAll('[class*="dropArea_"]'),
		dragObjs = QSAll('.dragObj'),
		hintBtn = QS('.hintBtn');

	streamSound.setSound('./media/dragFigure.mp3');

	if(popup.classList.contains('on')) {
		QS('.popupCover').style.display = 'none';
		popup.classList.remove('on');
		hintBtn.classList.remove('on');

		for (var i = 0; i < gameManager.popupObjArray.length; i++) {
			gameManager.popupObjArray[i].style.display = 'none';
		}

		for (var i = 0; i < gameManager.windowCount; i++) {
			dropAreas[i].querySelector('img').src = './images/window_' + gameManager.randomArray[0] + '.png';
		}

		for (var i = 0; i < 3; i++) {
			dragObjs[i].style.opacity = 1;
			dragObjs[i].style.visibility = 'visible';
		}
	}

	else {
	QS('.popupCover').style.display = 'block';
		popup.classList.add('on');
		hintBtn.classList.add('on');

		for (var i = 0; i < gameManager.popupObjArray.length; i++) {
			gameManager.popupObjArray[i].style.display = 'block';
		}

		for (var i = 0; i < gameManager.windowCount; i++) {
			dropAreas[i].querySelector('img').src = './images/window_blank.png';
		}

		for (var i = 0; i < 3; i++) {
			dragObjs[i].style.opacity = 0;
			dragObjs[i].style.visibility = 'hidden';
		}
	}
}

function drawHintObjs() {
	var bgCanvas = QS('#bgCanvas'),
		top = 520,
		left = 220,
		leftChange = 280;

	for (var i = 3; i < 6; i++) {
		var dragObj = createElement('div', bgCanvas, 'dragObj dragObj_' + i),
			img = createElement('img', dragObj),
			textDiv = createElement('div', dragObj, 'text');

		switch(gameManager.windowCount) {
			case 2: var text = gameManager.QUIZ_OPTION[i + 3]; break;
			case 3: var text = gameManager.QUIZ_OPTION[i + 5]; break;
		}

		dragObj.style.top = top + 'px';
		dragObj.style.left = left + 'px';
		dragObj.style.display = 'none';
		dragObj.style.zIndex = 2;
		img.src = './images/window_' + gameManager.randomArray[2] + '.png';

		if(typeof text !== 'object') textDiv.innerHTML = text;
		else makeBunsu(text.toString(), textDiv);

		dragObj.setAttribute('answervalue', convertBunsuToDec(text));

		gameManager.popupObjArray.push(dragObj);
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


		if (idx >= 0 && idx < 3) {
			gameManager.dabCount++;
		} else {
			// streamSound.setSound('../../media/correct.mp3');
			streamSound.setSound('./media/dragFigure.mp3');
			for (var i = 0; i < gameManager.popupObjArray.length; i++) {
				if(idx === gameManager.popupObjArray[i].className.split('_')[1]) idx = i;
			}
			gameManager.popupObjArray.splice(idx, 1);
			gameManager.popupObjComplete.push(dragObj);
		}
		correctPosition(dragObj);

		if (gameManager.dabCount === 1) {
			log('@ correct!!');
			gameOver(dragObj);
		}

		if(gameManager.popupObjComplete.length === gameManager.windowCount) {
			popupComplete();
		}

		boundingCounter = true;
	} else {
		log('>>>>> not bounding!');
		incorrectAnimation(dragObj);
		propellerIncorrMotion();
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
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

function gameOver(dragObj) {
	var canvas = QS('#bgCanvas'),
		submarineContainer = QS('.submarineContainer');

	streamSound.setSound(gameManager.soundEffct);

	canvas.style.pointerEvents = "none";

	QS('.hintBtn').style.display = 'none';

	var currentLeft = parseInt(submarineContainer.offsetLeft),
		dragObjCurrentLeft = parseInt(dragObj.offsetLeft),
		left = -1200;

	for(var i = 0; i < gameManager.popupObjComplete.length; i++) {
		submarineContainer.appendChild(gameManager.popupObjComplete[i]);
	}

	setTimeout(function () {
		animate({
			delay: 20,
			duration: 3000,
			delta: makeEaseInOut(back),
			step: function (delta) {
				submarineContainer.style.left = ((left * delta) + currentLeft)  + 'px';
				dragObj.style.left = ((left * delta) + dragObjCurrentLeft)  + 'px';
			}
		});
	}, 700);

	propellerCorrMotion();

	setTimeout(function() {
		gameOverAnimation();
		logCounter.tryCounter();
		logCounter.endTime();
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

function propellerCorrMotion() {
	var propeller = QS('.propeller'),
		array = [];

	for(var i = 0; i < 26; i++) array.push('images/propeller_' + (i % 4) + '.png');
	spriteAnimationCustom(array, propeller);

	streamSound.setSound('media/7th_submarine.mp3');
}

function propellerIncorrMotion() {
	var propeller = QS('.propeller'),
		array = [];

	for(var i = 0; i < 6; i++) array.push('images/propeller_' + (i % 4) + '.png');
	spriteAnimationCustom(array, propeller);

	streamSound.setSound('media/7th_submarine.mp3');
}

function popupComplete() {
	QS('.popupCover').style.display = 'none';
	QS('.popup').style.display = 'none';
	QS('.hintBtn').style.display = 'none';
	for (var i = 0; i < gameManager.popupObjArray.length; i++) {
		gameManager.popupObjArray[i].style.display = 'none';
	}
	for (var i = 0; i < 3; i++) {
		QSAll('.dragObj')[i].style.opacity = 1;
		QSAll('.dragObj')[i].style.visibility = 'visible';
	}
}

// 분수 만드는 함수
function makeBunsu(text, targetElement){
	var bunsuArray = [], bunsuTxt = [], beforeTxt = '', afterTxt = '';
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

// 분수를 소수로 바꾸는 함수
function convertBunsuToDec(array) { return (Number(array[0]) * Number(array[2]) + Number(array[1])) / Number(array[2]); }

function spriteAnimationCustom(spriteArray, spriteObj) {
	var index = 0,
	durationAni = parseInt(spriteArray.length - 1) * 100;

	animate({
		delay : 100,
		duration : durationAni,
		delta : makeEaseOut(quad),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}

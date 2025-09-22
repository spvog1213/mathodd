function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	gameManager.QUIZ_OPTION.forEach(function(el, i) { console.log('gameManager.QUIZ_OPTION[' + i +']:', el)});
	gameManager.QUIZ_ANSWER.forEach(function(el, i) { console.log('gameManager.QUIZ_ANSWER[' + i +']:', el)});

	gameManager.sizer = { ballWidth: 114, ballHeight: 115, cylinderWidth: 140, cylinderHeight: 144 }

	gameManager.QUIZ_OPTION[0].forEach(function(el, i) { if(el === '') gameManager.answerPosition = i; });
	console.log('gameManager.answerPosition:', gameManager.answerPosition);

	gameManager.answerPosition === 2 ? gameManager.sign = 'gt' : gameManager.sign = 'lt';
	console.log('gameManager.sign:', gameManager.sign);

	gameManager.randomArrays = {
		ball: makeRandomArray(1, 5),
		cylinder: makeRandomArray(1, 3)
	}

	drawBalance();
	drawDropAreas();
	drawEqBox();
	drawDragObjs();
	drawHints();
}

function setDropAreaPos() { console.log('>>setDropAreaPos');
	if(gameManager.sign === 'eq')
		gameManager.dropAreaPos = [[180, 230], [180, 330], [160, 827]];
	else if(gameManager.sign === 'lt')
		gameManager.dropAreaPos = [[130, 230], [130, 330], [210, 827]];
	else
		gameManager.dropAreaPos = [[230, 230], [230, 330], [110, 827]];
	console.log('gameManager.dropAreaPos:', gameManager.dropAreaPos);
}

// 저울 그리기
function drawBalance() {
	var canvas = QS('#bgCanvas'),
		balance = createElement('img', canvas, 'balance');

	switch(gameManager.sign) {
		case 'lt': balance.src = './images/panBalance_lt.png'; break;
		case 'gt': balance.src = './images/panBalance_gt.png'; break;
	}
}

// 저울 위의 dropArea 그리기
function drawDropAreas() { log('>> drawDropAreas');
	var canvas = QS('#bgCanvas'),
		top = 180, left = 230;

	setDropAreaPos();

	for(var i = 0; i < 3; i++) {
		var dropArea = createElement('div', canvas, 'dropArea_' + i),
			img = createElement('img', dropArea),
			imgSrc = '',
			textDiv = createElement('div', dropArea, 'text'),
			text = gameManager.QUIZ_OPTION[0][i];

		// 위치, 크기, 이미지 설정
		dropArea.style.top = gameManager.dropAreaPos[i][0] + 'px';
		dropArea.style.left = gameManager.dropAreaPos[i][1] + 'px';
		if(i === 2 && text !== '') {
			dropArea.style.width = gameManager.sizer.cylinderWidth + 'px';
			dropArea.style.height = gameManager.sizer.cylinderHeight + 'px';
			imgSrc = './images/cylinder_' + gameManager.randomArrays.cylinder.pop() + '.png';
			textDiv.classList.add('cylinder');
		} else {
			dropArea.style.width = gameManager.sizer.ballWidth + 'px';
			dropArea.style.height = gameManager.sizer.ballHeight + 'px';
			if(text !== '') imgSrc = './images/weight_' + gameManager.randomArrays.ball.pop() + '.png';
		}
		img.src = imgSrc;

		// 숫자 넣기
		if(typeof text === 'object') makeBunsu(text.toString(), textDiv);
		else if(typeof text === 'number') textDiv.innerHTML = text;
		else makeBunsu(text, textDiv);

		// 빈 칸 만들기
		if(text === '') {
			textDiv.innerHTML = '';
			img.style.cssText = 'opacity: 0; visibility: hidden';
			text = gameManager.QUIZ_ANSWER[0];
		}

		// answervalue 넣기
		if(typeof text === 'object') {
			dropArea.setAttribute('answervalue', convertBunsuToDec(text).toFixed(3));
		} else if(typeof text === 'string' && text.indexOf(']') > -1) {
			text = text.slice(text.indexOf('[') + 1, text.indexOf(']'));
			text = text.split(',');
			dropArea.setAttribute('answervalue', convertBunsuToDec(text).toFixed(3));
		} else {
			dropArea.setAttribute('answervalue', text);
		}

		gameManager.dropArea.push(dropArea);
	}
	console.log('gameManager.dropArea:', gameManager.dropArea);
}

// 부등호 그리기
function drawEqBox() {
	var eqBox = createElement('div', QS('#bgCanvas'), 'eqBox');
	if(findReplaceSymbol(gameManager.QUIZ_OPTION[1])) {
		replaceSymbol(gameManager.QUIZ_OPTION[1], eqBox);
		eqBox.querySelector('img').style.cssText = 'width: auto; height: 34px; margin: 0';
	} else {
		if(gameManager.QUIZ_OPTION[1] === '<') eqBox.innerHTML = '&#10094'; // '&lt;'
		else eqBox.innerHTML = '&#10095'; // '&gt;'
	}
}

// dragObj 그리기
function drawDragObjs() { console.log('>> drawDragObjs');
	var bgCanvas = QS('#bgCanvas'),
		top = 0, left = 0, leftChange = 0;

	if(gameManager.answerPosition === 2) { top = 514, left = 357, leftChange = 190, width = gameManager.sizer.cylinderWidth, height = gameManager.sizer.cylinderHeight; }
	else { top = 540, left = 369, leftChange = 187, width = gameManager.sizer.ballWidth, height = gameManager.sizer.ballHeight; }

	for (var i = 0; i < 3; i++) {
		var dragObj = createElement('div', bgCanvas, 'dragObj dragObj_' + i),
			img = createElement('img', dragObj),
			textDiv = createElement('div', dragObj, 'text'),
			text = gameManager.QUIZ_OPTION[2][i];

			// 위치, 크기, 이미지 설정
		// 정답 위치가 오른쪽일 때
		dragObj.style.top = top + 'px';
		dragObj.style.left = left + 'px';
		dragObj.style.width = width + 'px';
		dragObj.style.height = height + 'px';
		if(gameManager.answerPosition === 2) {
			img.src = './images/cylinder_' + gameManager.randomArrays.cylinder.pop() + '.png';
			textDiv.classList.add('cylinder');
		// 정답 위치가 왼쪽일 때
		} else img.src = './images/weight_' + gameManager.randomArrays.ball.pop() + '.png';

		// 숫자 넣기
		if(typeof text === 'object') makeBunsu(text.toString(), textDiv);
		else if(typeof text === 'number') textDiv.innerHTML = text;
		else makeBunsu(text, textDiv);

		// answervalue 넣기
		if(typeof text === 'object') {
			dragObj.setAttribute('answervalue', convertBunsuToDec(text).toFixed(3));
		} else if(typeof text === 'string' && text.indexOf(']') > -1) {
			text = text.slice(text.indexOf('[') + 1, text.indexOf(']'));
			text = text.split(',');
			dragObj.setAttribute('answervalue', convertBunsuToDec(text).toFixed(3));
		} else {
			dragObj.setAttribute('answervalue', text);
		}

		gameManager.quizPosition.push([top, left]);
		left += leftChange;
		new Dragdrop(dragObj);
	}
}

// 힌트 버튼, 팝업 그리기
function drawHints() {
	var bgCanvas = QS('#bgCanvas'),
		popup = createElement('div', bgCanvas, 'popup'),
		popupTitle = createElement('div', popup, 'popupTitle'),
		hintBtn = createElement('div', bgCanvas, 'hintBtn');

	popupTitle.innerHTML = '크기가 같은 분수로 바꿔 보세요.'
	hintBtn.addEventListener(gameManager.eventSelector.upEvent, hintBtnClick, false);
	drawHintObjs();
}

function hintBtnClick() {
	var popup = QS('.popup'),
		hintBtn = QS('.hintBtn'),
		dropAreas = QSAll('[class*="dropArea_"]'),
		dragObjs = QSAll('.dragObj');

	streamSound.setSound('./media/dragFigure.mp3');

	if(popup.classList.contains('on')) {
		popup.classList.remove('on');
		hintBtn.classList.remove('on');

		for (var i = 0; i < gameManager.popupObjArray.length; i++) {
			gameManager.popupObjArray[i].style.display = 'none';
		}

		// for(var i = 0; i < 3; i++) {
		// 	if(i !== 2 && i !== gameManager.answerPosition)  dropAreas[i].querySelector('img').src = dropAreas[i].querySelector('img').src.replace('Box_empty', 'Box');
		// }

		for (var i = 0; i < 3; i++) {
			dragObjs[i].style.opacity = 1;
			dragObjs[i].style.visibility = 'visible';
		}
	} else {
		popup.classList.add('on');
		hintBtn.classList.add('on');

		for (var i = 0; i < gameManager.popupObjArray.length; i++) {
			gameManager.popupObjArray[i].style.display = 'block';
		}

		// for(var i = 0; i < 3; i++) {
		// 	if(i !== 2 && i !== gameManager.answerPosition)  dropAreas[i].querySelector('img').src = dropAreas[i].querySelector('img').src.replace('Box', 'Box_empty');
		// }

		for (var i = 0; i < 3; i++) {
			dragObjs[i].style.opacity = 0;
			dragObjs[i].style.visibility = 'hidden';
		}
	}
}

function drawHintObjs() {
	var bgCanvas = QS('#bgCanvas'),
		top = 565,
		left = 410,
		leftChange = 160;

	if(gameManager.answerPosition !== 2) gameManager.randomArrays.ball = makeRandomArray(1, 5);

	for (var i = 0; i < 3; i++) {
		var dragObj = createElement('div', bgCanvas, 'dragObj dragObj_' + (i + 3)),
			img = createElement('img', dragObj),
			textDiv = createElement('div', dragObj, 'text'),
			text = gameManager.QUIZ_OPTION[3][i];

		// 위치, 크기, 이미지 설정
		dragObj.style.top = top + 'px';
		dragObj.style.left = left + 'px';
		dragObj.style.width = gameManager.sizer.ballWidth + 'px';
		dragObj.style.height = gameManager.sizer.ballHeight + 'px';
		dragObj.style.display = 'none';
		dragObj.style.zIndex = 2;
		img.src = './images/weight_' + gameManager.randomArrays.ball.pop() + '.png';

		// 숫자 넣기
		if(typeof text === 'object') makeBunsu(text.toString(), textDiv);
		else if(typeof text === 'number') textDiv.innerHTML = text;
		else makeBunsu(text, textDiv);

		// answervalue 넣기
		if(typeof text === 'object') {
			dragObj.setAttribute('answervalue', convertBunsuToDec(text).toFixed(3));
		} else if(typeof text === 'string' && text.indexOf(']') > -1) {
			text = text.slice(text.indexOf('[') + 1, text.indexOf(']'));
			text = text.split(',');
			dragObj.setAttribute('answervalue', convertBunsuToDec(text).toFixed(3));
		} else {
			dragObj.setAttribute('answervalue', text);
		}

		gameManager.popupObjArray.push(dragObj);
		gameManager.quizPosition.push([top, left]);
		left += leftChange;
		new Dragdrop(dragObj);
	}
}

function boundingCircle(dragObj, x, y) {
	var dragObjIdx;
	dragObjIdx = Number(dragObj.className.split('_')[1]);
	// var dragObjValue = dragObj.getAttribute('answerValue');
	// var spliceIdx = 0;
	if (dropCompare(dragObj, x, y)) {
		log('bounding!');

		if (dragObjIdx >= 0 && dragObjIdx < 3) {
			gameManager.dabCount++;
		} else {
			streamSound.setSound('./media/dragFigure.mp3');
			gameManager.popupObjArray.forEach(function(el, i){
				if(dragObjIdx === Number(el.className.split('_')[1]))
					gameManager.popupObjArray.splice(i, 1);
			});
			gameManager.completeObjCount++;
			gameManager.popupObjComplete[gameManager.dropIdx] = dragObj;
			gameManager.dropArea[gameManager.dropIdx].style.display = 'none';
			console.log('gameManager.popupObjArray:', gameManager.popupObjArray);
			console.log('gameManager.popupObjComplete:', gameManager.popupObjComplete);
		}

		if (gameManager.dabCount === 1) {
			log('@ correct!!');
			gameOver(dragObj);
		}

		correctPosition(dragObj);

		// 팝업이 사라지는 조건
		if((gameManager.answerPosition === 2 && gameManager.completeObjCount === 2) || (gameManager.answerPosition !== 2 && gameManager.completeObjCount === 1)) popupComplete();

		boundingCounter = true;
	} else {
		log('>>>>> not bounding!');
		incorrectAnimation(dragObj);
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
	var canvas = QS('#bgCanvas');
	canvas.style.pointerEvents = "none";
	QS('.hintBtn').style.display = 'none';

	streamSound.setSound(gameManager.soundEffct);

	gameManager.sign = 'eq';
	QS('.balance').src = './images/panBalance_eq.png';
	setDropAreaPos();
	gameManager.dropArea.forEach(function(el, i) {
		el.style.top = gameManager.dropAreaPos[i][0] + 'px';
		el.style.left = gameManager.dropAreaPos[i][1] + 'px';
	});
	idx = 0;
	gameManager.popupObjComplete.forEach(function(el, i) {
		if(el) {
			el.style.top = gameManager.dropAreaPos[i][0] + 'px';
			el.style.left = gameManager.dropAreaPos[i][1] + 'px';
		}
	});

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

function popupComplete() {
	var dragObjs = QSAll('.dragObj');

	// QS('.popupCover').style.display = 'none';
	QS('.popup').style.display = 'none';
	QS('.hintBtn').style.display = 'none';
	for(var i = 0; i < gameManager.popupObjArray.length; i++) gameManager.popupObjArray[i].style.display = 'none';
	for(var i = 0; i < 3; i++) {
		dragObjs[i].style.opacity = 1;
		dragObjs[i].style.visibility = 'visible';
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

function convertBunsuToDec(array) { return (Number(array[0]) * Number(array[2]) + Number(array[1])) / Number(array[2]); }

// randomArray 만들기
function makeRandomArray(min, length) {
	var randomNumber = 0, inspector = '', array = [];
	do {
		randomNumber = Math.floor(Math.random() * length) + min;
		if(inspector.indexOf(randomNumber) < 0) array.push(randomNumber);
		inspector += randomNumber.toString();
	} while (array.length !== length);
	array.length = length;
	return array;
}

// symbol 있는지 찾아주는 함수
function findReplaceSymbol(text) { return (text.indexOf('+') > -1 || text.indexOf('-') > -1 || text.indexOf('*') > -1 || text.indexOf('/') > -1 || text.indexOf('=') > -1 || text.indexOf('...') > -1 || text.indexOf('divBox') > -1 || text.indexOf('invisibleBox') > -1) }

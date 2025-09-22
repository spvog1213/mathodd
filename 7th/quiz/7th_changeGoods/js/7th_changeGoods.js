function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	gameManager.randomNumbers = makeRandomArray(1, 8);

	drawTitle();
	drawTransport();
	drawDropArea();
	drawDragObjs();
}

// 제목 그리기
function drawTitle() {
	var title = createElement('div', QS('#bgCanvas'), 'title');
	title.innerHTML = '화물을 바꿔 계산하세요.';
}

function drawTransport() {
	var transportContainer, transport, equal;
	transportContainer = createElement('div', QS('#bgCanvas'), 'transportContainer');
	transport = createElement('img', transportContainer, 'transport');
	equal = createElement('img', transportContainer, 'transport_equal');
	transport.src = './images/transport.png';
	equal.src = './images/transport_equal.png';
}

// dropArea 그리기
function drawDropArea() {
	var top = 225, left = 325, leftChange = 150.5;

	for(var i = 0; i < 4; i++) {
		var dropArea = createElement('div', QS('.transportContainer'), 'dropArea_' + i),
			textDiv = createElement('div', dropArea, 'text'),
			textArray = gameManager.QUIZ_OPTION[i],
			text = textArray[1];

		// 이미지 설정
		dropArea.style.backgroundImage = 'url(./images/box_' + gameManager.randomNumbers[i] + '.png)';

		// 정답 area
		if(i === 3) {
			textDiv.innerHTML = '?';
		// 정답 area 제외
		} else {
			// 기호 그리기
			var symbol = textArray[0],
				symbolSpan = '' || undefined;
			if(symbol) {
				symbolSpan = createElement('span', textDiv, 'symbol');
				replaceSymbol(symbol, symbolSpan);
				symbolSpan.querySelector('img').style.cssText = 'width: auto; height: 30px; margin: 0;';
			}

			// 내용 그리기
			if(typeof text === 'object') makeBunsu(text.toString(), textDiv);
			else textDiv.innerHTML += text;
		}

		// 위치 설정
		dropArea.style.top = top + 'px';
		dropArea.style.left = left + 'px';
		if(i === 2) leftChange = 227;
		left += leftChange;

		// 정답 attribute 설정
		dropArea.setAttribute('answervalue', i + 1);
		gameManager.dropArea.push(dropArea);
	}
}

// dragObj 그리기
function drawDragObjs() {
	var posObj = { top: 483, left: 158 },
		imgNo = 0;

	gameManager.randomNumbers = makeRandomArray(1, 8);

	for(var i = 0; i < gameManager.quizObj.length; i++) {
		var	dragObj = createElement('div', QS('#bgCanvas'), 'dragObj dragObj_' + i),
			textArray = gameManager.quizObj[i],
			symbol = textArray[0],
			text = textArray[1],
			answervalue = textArray[2];

		// 이미지 설정
		var img = createElement('img', dragObj);
		if(typeof answervalue === 'object') // drop될 위치 2개일 경우
			img.src = './images/box_2_' + gameManager.randomNumbers[imgNo] + '.png';
		else
			img.src = './images/box_' + gameManager.randomNumbers[imgNo] + '.png';
		imgNo++;

			// 내용
		var textDiv = createElement('div', dragObj, 'text');
		// 기호
		var symbol = textArray[0],
			symbolSpan = '' || undefined;

		if(symbol) {
			symbolSpan = createElement('span', textDiv, 'symbol');
			replaceSymbol(symbol, symbolSpan);
			symbolSpan.querySelector('img').style.cssText = 'width: auto; height: 30px; margin: 0;';
			console.log(symbolSpan);
		}

		if(typeof text === 'object') // 분수일 경우
			makeBunsu(text.toString(), textDiv);
		else{
			// textDiv.innerHTML == text;
			textDiv.innerHTML += '<span>' + text + '</span>';
		}

		// 4개까지만 display
		if(i > 3)
			dragObj.style.display = 'none';

		// 정답 attribute 설정
		if(text.toString() === gameManager.QUIZ_ANSWER[0].toString()) answervalue = 4;
		dragObj.setAttribute('answervalue', answervalue);

		new Dragdrop(dragObj);
		gameManager.dragObjs.push(dragObj);
	}

	// 랜덤으로 돌려서 위치 지정
	gameManager.dragObjs = stirElements(gameManager.dragObjs, 4);
	gameManager.isDouble = false;
	for(var i = 0; i < 4; i++) {
		var dragObj = gameManager.dragObjs[i];
		var isDouble = dragObj.getAttribute('answervalue').indexOf(',') > -1 ? true : false;
		setQuizPosition(dragObj, isDouble, i);
	}
	gameManager.quizPosition.forEach(function(el, i){ gameManager.dragObjs[i].style.top = el[0] + 'px'; });
	gameManager.quizPosition.forEach(function(el, i){ gameManager.dragObjs[i].style.left = el[1] + 'px'; });
}


// gameManager.quizPosition 값 입력
function setQuizPosition(dragObj, isDouble, i) {
	var top = 483, left = 158;

	if(gameManager.isDouble) gameManager.quizPosition[i] = [top, left += 226 * i + 148];
	else gameManager.quizPosition[i] = [top, left + 226 * i];

	if(isDouble) gameManager.isDouble = true;
}

// array 순서 섞어주는 함수
function stirElements(elements, length) {
	var numArray, newElements = [];
	numArray = makeRandomArray(0, length);
	newElements = newElements.concat(elements);
	numArray.forEach(function(el, i) { newElements[i] = elements[el]; });
	return newElements;
}

function boundingCircle(dragObj, x, y) {
	var dragObjValue = dragObj.getAttribute('answerValue');
	if (dropCompare(dragObj, x, y)) {
		log('bounding!');
		gameManager.dabCount++;
		streamSound.setSound('./media/dragFigure.mp3');
		correctPosition(dragObj);

		// 아래 덮이는 것들 숨기기
		if(dragObjValue.indexOf(',') > -1) gameManager.completeDragObjs.forEach(function(el){ el.style.opacity = 0; });
		else gameManager.dropArea[gameManager.dropIdx].style.opacity = 0;

		posDragObjs(dragObj);

		if(dragObjValue == 4) {
			log('@ correct!!');
			gameOver(dragObj);
		}

		boundingCounter = true;
	} else {
		log('>>>>> not bounding!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}

function dropCompare(dragObj, x, y) {
	var dragObjValues = dragObj.getAttribute('answervalue').split(',');

	for (var i = 0; i < gameManager.dropArea.length; i++) {
		var dropValue = gameManager.dropArea[i].getAttribute('answervalue');

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth + 10) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight + 10) * gameManager.zoomRate)) {

			for(var j = 0; j < dragObjValues.length; j++) {
				if(dragObjValues[j] == dropValue) {
					if(j === 1) gameManager.dropIdx = i - 1;
					else gameManager.dropIdx = i;
					return true;
				}
			}
		}
	}
	return false;
}

function posDragObjs(dragObj) {
	var idx = gameManager.dragObjs.indexOf(dragObj);
	var imgNo = gameManager.randomNumbers.pop();

	// dragObj 옮기기
	gameManager.dragObjs.splice(idx, 1);
	gameManager.completeDragObjs.push(dragObj);
	QS('.transportContainer').appendChild(dragObj);

	if(dragObj.getAttribute('answerValue') == 4) return;

	// 섞기
	if(gameManager.dragObjs.length > 3) gameManager.dragObjs = stirElements(gameManager.dragObjs, 4);

	gameManager.isDouble = false;
	for(var i = 0; i < gameManager.dragObjs.length; i++) {
		if (i < 4) {
			// 위치 설정
			var eachDragObj = gameManager.dragObjs[i],
				isDouble = eachDragObj.getAttribute('answervalue').indexOf(',') > -1 ? true : false;
			setQuizPosition(eachDragObj, isDouble, i);
			gameManager.quizPosition.forEach(function(el, i){ gameManager.dragObjs[i].style.top = el[0] + 'px'; });
			gameManager.quizPosition.forEach(function(el, i){ gameManager.dragObjs[i].style.left = el[1] + 'px'; });
			gameManager.dragObjs[i].style.display = 'block';
		} else {
			gameManager.dragObjs[i].style.display = 'none';
		}
	}
}

function incorrectAnimation(dragObj) {
	var idx, top, left, canvas;
	idx = gameManager.dragObjs.indexOf(dragObj);
	top = gameManager.quizPosition[idx][0];
	left = gameManager.quizPosition[idx][1];
	canvas = QS('#bgCanvas');

	canvas.style.pointerEvents = 'none';

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			if (gameManager.BOUNDING_TYPE === 'left') {
				dragObj.style.left = ((-100 * delta) + (100) + left) + 'px';
				dragObj.style.top = top + 'px';
			} else {
				dragObj.style.top = ((-100 * delta) + (100) + top)  + 'px';
				dragObj.style.left = left + 'px';
			}
		}
	});

	setTimeout(function(){ canvas.style.pointerEvents = 'auto'; }, 800);
}

function gameOver(dragObj) {
	QS('#bgCanvas').style.pointerEvents = "none";

	transportMotion();

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

function transportMotion() {
	var transportContainer = QS('.transportContainer');
	animate({
		delay : 20,
		duration : 1500,
		delta : makeEaseInOut(linear),
		step : function(delta) {
			transportContainer.style.left = - (1300 * delta) + 'px';
		}
	});
}

// randomArray 만들기
function makeRandomArray(min, length) {
	var randomNumber = 0, inspector = '', array = [];

	do {
		randomNumber = Math.floor(Math.random() * length) + min;
		if(inspector.indexOf(randomNumber) < 0) array.push(randomNumber);
		inspector += randomNumber.toString();
	} while (array.length !== length);

	return array;
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
	bunsuDiv.style.cssText = 'display: inline-block; vertical-align: top';
	int.style.cssText = 'display: inline-block; margin-right: 5px; vertical-align: middle';
	prop.style.cssText = 'position: relative; display: inline-block; line-height: 1.25em; vertical-align: middle';
	bunja.style.cssText = 'display: block; vertical-align: middle';
	bunmo.style.cssText = 'display: block; vertical-align: middle';
	midLine.style.cssText = 'position: absolute; top: 50%; left: 0; width: 100%; height: 0; margin-top: -0.05em; border-top: 0.1em solid; border-color: inherit;';
}

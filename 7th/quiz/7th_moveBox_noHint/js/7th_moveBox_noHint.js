function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	// 3개일 때,
	if(gameManager.QUIZ_OPTION.length === 4) {
		gameManager.sizer = { top: 214, left: 240, width: 154, height: 174 };
		gameManager.gameType = 3;
	// 4개일 때,
	} else {
		gameManager.sizer = { top: 214, left: 100, width: 154, height: 174 };
		gameManager.gameType = 4;
	}

	gameManager.randomArray = makeRandomArray(1, 4);
	gameManager.imgName = 'url(./images/train_' + gameManager.randomArray[0] + '.png)'

	drawTitle();
	drawTrain();
	drawDropArea();
	drawDragObjs();
	drawCheckBtn();
}

function drawTitle() {
	var titleDiv = createElement('div', QS('#bgCanvas'), 'title');
	titleDiv.innerHTML = gameManager.QUIZ_OPTION[0];
}

function drawTrain() { console.log('>>>> drawTrain')
	var trainContainer = createElement('div', QS('#bgCanvas'), 'trainContainer');

	var top = 342,
		left = gameManager.gameType === 4 ? 246 : 386;

	for(var i = 0; i < gameManager.gameType; i++) {
		var trainLine = createElement('img', trainContainer, 'trainLine');
		trainLine.src = './images/line.png';
		trainLine.style.top = top + 'px';
		trainLine.style.left = left + 'px';
		left += 206;
	}

	var train = createElement('div', trainContainer, 'train');
	if(gameManager.gameType === 4)
		train.style.left = 920 + 'px';
}

function drawDropArea() {
	var dropArea, sizerObj = {}, answervalue;

	// sizerObj에 gameManager.sizer 값 입력
	Object.keys(gameManager.sizer).forEach(function(el) { sizerObj[el] = gameManager.sizer[el]});

	dropArea = createElement('div', QS('.trainContainer'), 'dropArea_0');

	// style 설정
	Object.keys(sizerObj).forEach(function(el) { dropArea.style[el] = sizerObj[el] + 'px'; });
	if(gameManager.gameType === 3)
		dropArea.style.width = 630 + 'px';
	else
		dropArea.style.width = 810 + 'px';
	gameManager.dropArea.push(dropArea);
}

function drawDragObjs() {
	var dragObj, sizerObj = {}, answervalue, textDiv, text;

	// sizerObj에 gameManager.sizer 값 입력
	Object.keys(gameManager.sizer).forEach(function(el) { sizerObj[el] = gameManager.sizer[el]});

	for(var i = 0; i < gameManager.QUIZ_OPTION.length - 1; i++) {
		dragObj = createElement('div', QS('#bgCanvas'), 'dragObj dragObj_' + i);

		// 내용 설정
		textDiv = createElement('div', dragObj, 'text');
		text = gameManager.QUIZ_OPTION[i + 1];
		if(typeof text !== 'object')
			textDiv.innerHTML = gameManager.QUIZ_OPTION[i + 1];
		else
			makeBunsu(text.toString(), textDiv);

		// 위치값 입력
		gameManager.dropObjPos.push([sizerObj.top, sizerObj.left]);

		// style 설정
		Object.keys(sizerObj).forEach(function(el) { dragObj.style[el] = sizerObj[el] + 'px'; });
		if(gameManager.gameType === 3)
			sizerObj.left += 205;
		else
			sizerObj.left += 205;
		dragObj.style.backgroundImage = gameManager.imgName;

		// answervalue 설정
		answervalue = gameManager.QUIZ_OPTION[i + 1];
		answervalue = convertBunsuToDec(answervalue);
		answervalue = answervalue.toFixed(2);
		dragObj.setAttribute('answervalue', answervalue);

		gameManager.dropObjArray.push(dragObj);
		new Dragdrop(dragObj);
	}
	// console.log('gameManager.dropObjArray:', gameManager.dropObjArray);
	// console.log('gameManager.dropObjPos:', gameManager.dropObjPos);
}

function drawCheckBtn() {
	var checkBtnContainer = createElement('div', QS('.trainContainer'), 'checkBtnContainer'),
		checkBtn_on = createElement('div', checkBtnContainer, 'checkBtn_on'),
		checkBtn = createElement('div', checkBtnContainer, 'checkBtn');

	// checkBtn.src = '../../images/common/checkBtnPurple.png';
	// checkBtn_on.src = '../../images/common/checkBtnPurple_on.png';

	if(gameManager.gameType === 4)
		checkBtnContainer.style.left = 947 + 'px';

	checkBtnContainer.addEventListener(gameManager.eventSelector.upEvent, checkBtnClick, false);
}

function checkBtnClick() {
	this.classList.add('on');
	compareAnswer();
}

function boundingCircle(dragObj, x, y) {
	if (dropCompare(dragObj, x, y)) {
		log('bounding!');
		streamSound.setSound('./media/dragFigure.mp3');

		// dragObj 재정렬
		var x = getRealOffsetLeft(dragObj),
			y = getRealOffsetTop(dragObj);
		resetDropObjArray(dragObj, x, y);

	} else {
		log('>>>>> not bounding!');
		streamSound.setSound('../../media/incorrect.mp3');

	}
	setPosition();
}

function setPosition() {
	gameManager.dropObjArray.forEach(function(el, i) {
		el.style.top = gameManager.dropObjPos[i][0] + 'px';
		el.style.left = gameManager.dropObjPos[i][1] + 'px';
	});
}

function dropCompare(dragObj, x, y) {
	var dragObjValue, dropValue;
	dragObjValue = dragObj.getAttribute('answervalue');

	if (x > gameManager.dropArea[0].offsetLeft * gameManager.zoomRate &&
		x < (gameManager.dropArea[0].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[0].clientWidth + 100) * gameManager.zoomRate) &&
		y > gameManager.dropArea[0].offsetTop * gameManager.zoomRate &&
		y < (gameManager.dropArea[0].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[0].clientHeight + 100) * gameManager.zoomRate)) {
		return true;
	}
	return false;
}

function resetDropObjArray (dragObj, x, y) {
	// 빼기
	gameManager.dropObjArray.forEach(function(el, i) {
		if(el === dragObj)
		gameManager.dropObjArray.splice(i, 1);
	});

 		// 넣기
	// 첫번째 위치일 경우
	if(x <= gameManager.dropObjArray[0].offsetLeft) {
		gameManager.dropObjArray.unshift(dragObj);
	// 마지막 위치일 경우
	} else if(x >= gameManager.dropObjArray[gameManager.dropObjArray.length - 1].offsetLeft) {
		gameManager.dropObjArray.push(dragObj);
	// 나머지 경우
	} else {
		for (var i = 0; i < gameManager.dropObjArray.length; i++) {
			if(x > gameManager.dropObjArray[i].offsetLeft && x < gameManager.dropObjArray[i + 1].offsetLeft) {
				gameManager.dropObjArray.splice(i + 1, 0, dragObj);
			}
		}
	}
}

function compareAnswer() {
	var idx = 0, objsAnswer = '', answer = '';

	gameManager.dropObjArray.forEach(function(el) {
		idx = Number(el.className.split('_')[1]) + 1;
		objsAnswer += idx;
	});

	gameManager.QUIZ_ANSWER.forEach(function(el) { answer += el; });

	// console.log('objsAnswer:', objsAnswer, 'answer:', answer);

	if(objsAnswer === answer){
		streamSound.setSound('../../media/correct.mp3');
		gameOver();
	} else {
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
		setTimeout(function(){
			QS('.checkBtnContainer').classList.remove('on');
		}, 100);
	}
}

function gameOver() {
	var trainLine = QSAll('.trainLine');

	for (var i = 0; i < trainLine.length; i++) {
		trainLine[i].style.opacity = 1;
	}

	QS('#bgCanvas').style.pointerEvents = "none";
	streamSound.setSound(gameManager.soundEffct);

	trainMotion();

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

function trainMotion() {
	var trainContainer = QS('.trainContainer');

	gameManager.dropObjArray.forEach(function(dropObj){
		trainContainer.appendChild(dropObj);
	});

	animate({
		delay : 20,
		duration : 1500,
		delta : makeEaseInOut(linear),
		step : function(delta) {
			trainContainer.style.left = (1300 * delta) + 'px';
		}
	});
}

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }

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

// 분수 정수 or 소수로 바꾸는 함수
function convertBunsuToDec(array) { return (Number(array[0]) * Number(array[2]) + Number(array[1])) / Number(array[2]); }

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

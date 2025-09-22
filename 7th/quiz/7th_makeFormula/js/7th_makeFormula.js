function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	gameManager.size = { top: 328, width: 1100, height: 120, left: 0 }
	gameManager.size.left = (1230 - gameManager.size.width) / 2;
	gameManager.randomArray = makeRandomArray(1, 7);
	
	drawTitle();
	drawDropArea();
	drawBalls();
	drawCheckBtn();
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

function drawTitle() {
	var titleDiv = createElement('div', QS('#bgCanvas'), 'title'),
		titleText = gameManager.QUIZ_OPTION[0];

	titleDiv.innerHTML = titleText;
}

function drawDropArea() {
	var dropArea, size = {};
	dropArea = createElement('div', QS('#bgCanvas'), 'dropArea_0');

	Object.keys(gameManager.size).forEach(function(el) { size[el] = gameManager.size[el]});
	Object.keys(size).forEach(function(el) { dropArea.style[el] = size[el] + 'px'; });
	dropArea.style.width = size.width * gameManager.ballCount / (gameManager.ballCount + 2) + 'px';

	gameManager.dropArea.push(dropArea);
}

function drawBalls() {
	var quizObjContainer = createElement('div', QS('#bgCanvas'), 'quizObjContainer'),
		top = gameManager.size.top,
		width = gameManager.size.width / (gameManager.ballCount + 2),
		left = gameManager.size.left,
		leftChange = width;

	for (var i = 1; i < gameManager.QUIZ_OPTION.length - 2; i++) {
		var dragObj = createElement('div', quizObjContainer, 'dragObj dragObj_' + (i - 1)),
			img = createElement('img', dragObj),
			textDiv = createElement('div', dragObj, 'text'),
			text = gameManager.QUIZ_OPTION[i],
			ballColor = '';

		switch (gameManager.randomArray[i - 1]) {
			case 1: ballColor = 'red'; break;
			case 2: ballColor = 'blue'; break;
			case 3: ballColor = 'yellow'; break;
			case 4: ballColor = 'green'; break;
			case 5: ballColor = 'purple'; break;
			case 6: ballColor = 'mint'; break;
			case 7: ballColor = 'pink'; break;
		}

		dragObj.style.top = top + 'px';
		dragObj.style.left = left + 'px';
		dragObj.style.width = width + 'px';
		dragObj.setAttribute('answervalue', text);

		// 기호인 경우 이미지로 넣기
		if(typeof text === 'string' && findReplaceSymbol(text)) {
			replaceSymbol(text, textDiv);
			textDiv.querySelector('img').style.cssText = 'width: auto; height: 30px; margin: 0 0 10px;';
		} else {
			textDiv.innerHTML = text;
		}

		img.src = './images/ball_' + ballColor + '.png';

		gameManager.dropObjArray.push(dragObj);
		gameManager.dropObjPos.push([top, left]);

		left += leftChange;

		new Dragdrop(dragObj);
	}

	left = 925; width = 120; leftChange = 120;
	for (var i = gameManager.QUIZ_OPTION.length - 2; i < gameManager.QUIZ_OPTION.length; i++) {
		var dragObj = createElement('div', quizObjContainer, 'dragObj disabled'),
			textDiv = createElement('div', dragObj, 'text'),
			text = gameManager.QUIZ_OPTION[i];

		dragObj.style.top = top + 'px';
		dragObj.style.left = left + 'px';
		dragObj.style.width = width + 'px';
		left += leftChange;

		// 기호인 경우 이미지로 넣기
		if(typeof text === 'string' && findReplaceSymbol(text)) {
			replaceSymbol(text, textDiv);
			textDiv.querySelector('img').style.cssText = 'width: auto; height: 30px; margin: 0 0 10px;';
		} else {
			textDiv.innerHTML = text;
		}

	}
}

function drawCheckBtn() {
	var bgCanvas = QS('#bgCanvas'),
		eventGroup = createElement('div',bgCanvas,'eventGroup'),
		checkBtn = createElement('div', eventGroup, 'checkBtn'),
		checkBtn_on = createElement('div',eventGroup,'checkBtn_on');

	checkBtn_on.style.visibility = 'hidden';
	checkBtn.addEventListener(gameManager.eventSelector.upEvent, checkBtnClick, false);
}

function checkBtnClick() {
	QS('.checkBtn').style.visibility = 'hidden';
	QS('.checkBtn_on').style.visibility = 'visible';
	compareAnswer();
}

function boundingCircle(dragObj, x, y) {
	if (dropCompare(dragObj, x, y)) {
		log('bounding!');

		var x = getRealOffsetLeft(dragObj),
			y = getRealOffsetTop(dragObj);

		resetDropObjArray(dragObj, x, y);

		streamSound.setSound(gameManager.soundEffct);
	} else {
		log('>>>>> not bounding!');
		setPosition();

		streamSound.setSound('../../media/incorrect.mp3');
	}
}

function setPosition() {
	for (var i = 0; i < gameManager.dropObjArray.length; i++) {
		gameManager.dropObjArray[i].style.top = gameManager.dropObjPos[i][0] + 'px';
		gameManager.dropObjArray[i].style.left = gameManager.dropObjPos[i][1] + 'px';
	}
}

function dropCompare(dragObj, x, y) {
	if (x > gameManager.dropArea[0].offsetLeft * gameManager.zoomRate &&
		x < (gameManager.dropArea[0].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[0].clientWidth + 100) * gameManager.zoomRate) &&
		y > gameManager.dropArea[0].offsetTop * gameManager.zoomRate &&
		y < (gameManager.dropArea[0].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[0].clientHeight + 100) * gameManager.zoomRate)) {
		return true;
	}
	return false;
}


function resetDropObjArray (dragObj, x, y) {
	for (var i = 0; i < gameManager.dropObjArray.length; i++){
		if(gameManager.dropObjArray[i] == dragObj){
			gameManager.dropObjArray.splice(i, 1);
		}
	}

	if (x <= gameManager.dropObjArray[0].offsetLeft) {
		gameManager.dropObjArray.unshift(dragObj);
	} else if (x >= gameManager.dropObjArray[gameManager.dropObjArray.length - 1].offsetLeft) {
		gameManager.dropObjArray.push(dragObj);
	} else {
		for (var i = 0; i < gameManager.dropObjArray.length; i++) {
			if(x > gameManager.dropObjArray[i].offsetLeft && x < gameManager.dropObjArray[i + 1].offsetLeft) {
				gameManager.dropObjArray.splice(i+1, 0, dragObj);
			}
		}
	}

	setPosition();
}

function compareAnswer() {
	var checkBtn, checkBtn_on, answerText, SymbolIdx, wasParentheses, parenthesesIdx, numberIdx, isFormula, bool;
	checkBtn = QS('.checkBtn');
	checkBtn_on = QS('.checkBtn_on');
	answerText = '';
	SymbolIdx = 0;
	wasParentheses = false;
	parenthesesIdx = 0;
	numberIdx = 0;
	isFormula = true;
	bool = false;

	for (var i = 0; i < gameManager.dropObjArray.length; i++) {
		var ansVal = gameManager.dropObjArray[i].getAttribute('answervalue');

		if(SymbolIdx && ansVal === ')') {
			isFormula = false;
			console.log('formula 아님: symbol 다음에 )이 나옴');
			break;
		}

		if(findReplaceSymbol(ansVal)) {
			if(i === 0) {
				isFormula = false;
				console.log('formula 아님: 첫 자리에 symbol');
				break;

			} else if(i === gameManager.dropObjArray.length - 1) {
				isFormula = false;
				console.log('formula 아님: 마지막 자리에 symbol');
				break;
			}

			SymbolIdx++;

			if(SymbolIdx === 2) {
				isFormula = false;
				console.log('formula 아님: symbol 연속으로 나옴');
				break;
			}
		} else
			SymbolIdx = 0;

		if(parenthesesIdx && !wasParentheses && findReplaceSymbol(ansVal)) {
			isFormula = false;
			console.log('formula 아님: ( 다음에 symbol이 나옴');
			break;
		}

		if(ansVal === '(' || ansVal === ')') {
			if(wasParentheses && ansVal === '(') {
				isFormula = false;
				console.log('formula 아님: )가 먼저 나옴');
				break;
			}

			parenthesesIdx++;
			ansVal === ')' ? wasParentheses = true : wasParentheses = false;

			if(parenthesesIdx === 2) {
				isFormula = false;
				console.log('formula 아님: 괄호 연속으로 나옴');
				break;
			}
		} else
			parenthesesIdx = 0;

		if(Number(ansVal)) {
			numberIdx++;

			if(numberIdx === 2) {
				isFormula = false;
				console.log('formula 아님: 숫자 연속으로 나옴');
				break;
			}
		} else
			numberIdx = 0;

		answerText += gameManager.dropObjArray[i].getAttribute('answervalue');
	}

	if(isFormula)
		answerText = eval(answerText);

	if(answerText === gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1])
		bool = true;

	if(bool){
		gameOver();
		streamSound.setSound('../../media/correct.mp3');
	} else {
		setTimeout(function(){
			checkBtn.style.visibility = 'visible';
			checkBtn_on.style.visibility = 'hidden';
		}, 100);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}

function gameOver() {
	QS('#bgCanvas').style.pointerEvents = "none";

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

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }
// symbol 있는지 찾아주는 함수
function findReplaceSymbol(text) { return (text.indexOf('+') > -1 || text.indexOf('-') > -1 || text.indexOf('*') > -1 || text.indexOf('/') > -1 || text.indexOf('=') > -1 || text.indexOf('...') > -1 || text.indexOf('divBox') > -1 || text.indexOf('invisibleBox') > -1) }

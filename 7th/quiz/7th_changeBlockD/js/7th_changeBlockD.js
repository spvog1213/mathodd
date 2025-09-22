function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	gameManager.QUIZ_OPTION[0].forEach(function(el) {
		var bunsu = el[1];
		if( (typeof bunsu === 'object' && bunsu[0] > 0) || (bunsu.toString().indexOf('.') > -1) )
			gameManager.bunsuCount++;
	});

	gameManager.randomArray = makeRandomArray(1, 3);

	drawTitle();
	drawDropArea();
	drawSymbols();
	drawDragObjs();
}

// 제목 그리기
function drawTitle() {
	var title = createElement('div', QS('#bgCanvas'), 'title');
	title.innerHTML = '블록을 바꿔 계산하세요.';
}

// dropArea 그리기
function drawDropArea() {
	var top, left, leftChange, dropArea, textDiv, textArray, symbolSpan, symbol, text, int, prop, bunja, bunmo;
	top = 180; left = 215; leftChange = 300;

	for(var i = 0; i < gameManager.QUIZ_OPTION[0].length + 1; i++) {
		dropArea = createElement('div', QS('#bgCanvas'), 'dropArea_' + i);
		textDiv = createElement('div', dropArea, 'text');
		prop = createElement('span', textDiv, 'prop');
		bunja = createElement('span', prop, 'bunja');

		// 정답
		if(i !== gameManager.QUIZ_OPTION[0].length) {
			textArray = gameManager.QUIZ_OPTION[0][i];
			symbol = textArray[0];
			text = textArray[1];

			// 분수일 경우
			if(typeof text === 'object') {
				bunmo = createElement('span', prop, 'bunmo');
				if(text[0] !== 0) {
					int = document.createElement('span');
					int.setAttribute('class', 'int');
					int.innerHTML = text[0];
					int.style.background = 'url(images/blockCircle_' + gameManager.randomArray[0] + '.png) no-repeat';
					textDiv.insertBefore(int, prop);
					dropArea.style.background ='url(images/block_2.png) no-repeat';
				} else dropArea.style.background ='url(images/block_2_center.png) no-repeat';

				bunja.innerHTML = text[1];
				bunja.setAttribute('num', text[1]);
				bunmo.innerHTML = text[2];
				bunmo.setAttribute('num', text[2]);
				bunja.style.background = 'url(images/blockCircle_' + gameManager.randomArray[0] + '.png) no-repeat';
				bunmo.style.background = 'url(images/blockCircle_' + gameManager.randomArray[0] + '.png) no-repeat';

			// 분수가 아닐 경우
			} else {
				prop.style.height = 'auto';
				bunja.style.margin = 0;

				// 소수일 경우
				if(text.toString().indexOf('.') > -1){
					bunja.style.background = 'url(images/blockDouble_' + gameManager.randomArray[0] + '.png) no-repeat';
					prop.style.width = 152 + 'px';
					bunja.style.width = 152 + 'px';
					bunja.style.height = 84 + 'px';
				} else {
					bunja.style.background = 'url(images/blockCircle_' + gameManager.randomArray[0] + '.png) no-repeat';
				}
				bunja.innerHTML = text;
				dropArea.style.background ='url(images/block_2_blank.png) no-repeat';

			}

			// 부호 있을 경우
			if(symbol !== '') {
				symbolSpan = document.createElement('span');
				replaceSymbol(symbol, symbolSpan);
				symbolSpan.classList.add('symbol');
				// symbolSpan.querySelector('img').style.cssText = 'width: auto; height: 30px; margin: 0; vertical-align: middle;';
				if(text[0] !== 0)
					textDiv.insertBefore(symbolSpan, int);
				else
					textDiv.insertBefore(symbolSpan, prop);
			}

			// new ReductionObj(dropArea);
		}

		// 위치 설정
		dropArea.style.top = top + 'px';
		dropArea.style.left = left + 'px';
		left += leftChange;

		// 정답 attribute 설정
		dropArea.setAttribute('answervalue', i + 1);
		gameManager.dropArea.push(dropArea);
	}
}

// 수학기호 그리기
function drawSymbols() {
	var canvas = QS('#bgCanvas'),
		top = 260, left = 440, text = '/';

	for(var i = 0; i < 2; i++) {
		var symbol = createElement('span', canvas, 'symbol');

		replaceSymbol(text, symbol);
		symbol.style.cssText = 'position: absolute; top: ' + top + 'px; left: ' + left + 'px;';
		symbol.querySelector('img').style.cssText = 'width: 35px; height: 35px; margin: 0;';
		left = 740, text = '=';
	}

}
// var idxx = Math.random();
var idxx = Math.floor((Math.random() * 2)+1);
// dragObj 그리기
function drawDragObjs() {
	var top, left, leftChange, dragObj, textDiv, textArray, symbolSpan, symbol, text, answervalue, int, prop, bunja, bunmo;
	top = 482; left = 174; leftChange = 228;

	for(var i = 0; i < gameManager.quizObj.length; i++) {
		dragObj = createElement('div', QS('#bgCanvas'), 'dragObj dragObj_' + i);
		textDiv = createElement('div', dragObj, 'text');
		textArray = gameManager.quizObj[i];
		symbol = textArray[0];
		text = textArray[1];
		answervalue = textArray[2];
		prop = createElement('span', textDiv, 'prop');
		bunja = createElement('span', prop, 'bunja');

			// 글씨 넣기
		// 분수일 경우
		if(typeof text === 'object') {
			// if(typeof text === 'object') {
			bunmo = createElement('span', prop, 'bunmo');

			if(text[0] !== 0) {
				var int = document.createElement('span');
				int.setAttribute('class', 'int');
				int.innerHTML = text[0];
				textDiv.insertBefore(int, prop);

			}
			bunja.innerHTML = text[1];
			bunja.setAttribute('num', text[1]);
			bunmo.innerHTML = text[2];
			bunmo.setAttribute('num', text[2]);
			bunja.style.background = 'url(images/blockCircle_' + gameManager.randomArray[1] + '.png) no-repeat';
			bunmo.style.background = 'url(images/blockCircle_' + gameManager.randomArray[1] + '.png) no-repeat';
			dragObj.style.background ='url(images/block_1.png) no-repeat';

		// 분수가 아닐 경우
		} else {
			prop.style.height = 'auto';
			bunja.style.margin = 0;
			bunja.setAttribute('num', textArray);


			if(text.toString().indexOf('.')>-1){
				dragObj.style.background ='url(images/block_1_blank.png) no-repeat';
				bunja.style.background = 'url(images/blockDouble_' + gameManager.randomArray[1] + '.png) no-repeat';
				prop.style.width = 152 + 'px';
				bunja.style.width = 152 + 'px';
				bunja.style.height = 84 + 'px';
			} else {
				bunja.style.background = 'url(images/blockCircle_' + gameManager.randomArray[1] + '.png) no-repeat';
				dragObj.style.background ='url(images/block_1_blank.png) no-repeat';
			}
			bunja.innerHTML = text;
		}

		// 부호 있을 경우
		if(symbol !== '') {
			symbolSpan = document.createElement('span');
			replaceSymbol(symbol, symbolSpan);
			symbolSpan.classList.add('symbol');
			// symbolSpan.querySelector('img').style.cssText = 'width: auto; height: 30px; margin: 0; vertical-align: middle;';
			if(text[0] !== 0)
				textDiv.insertBefore(symbolSpan, int);
			else
				textDiv.insertBefore(symbolSpan, prop);
		}

		// 위치 설정
		if(i < 4) {
			dragObj.style.top = top + 'px';
			dragObj.style.left = left + 'px';
			gameManager.quizPosition.push([top, left]);
			left += leftChange;
		} else {
			dragObj.style.display = 'none';
		}

		// 정답 attribute 설정
		dragObj.setAttribute('answervalue', answervalue);

		new Dragdrop(dragObj);
		gameManager.dragObjs.push(dragObj);
	}
	gameManager.dragObjs = stirElements(gameManager.dragObjs, 4);
	gameManager.quizPosition.forEach(function(el, i){ gameManager.dragObjs[i].style.left = el[1] + 'px'; });
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
	var dragObjValue = Number(dragObj.getAttribute('answerValue'));
	if (dropCompare(dragObj, x, y)) {
		log('bounding!');
		gameManager.dabCount++;
		streamSound.setSound('./media/dragFigure.mp3');
		correctPosition(dragObj);

		// 성공한 dropArea 숨기기
		gameManager.dropArea[gameManager.dropIdx].style.opacity = 0;

		if( (gameManager.dabCount === gameManager.bunsuCount + 1) || dragObjValue === 3 ) {
			log('@ correct!!');
			gameOver(dragObj);
		} else {
			posDragObjs(dragObj);
		}

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
		}
	}
	return false;
}

function posDragObjs(dragObj) {
	var idx = gameManager.dragObjs.indexOf(dragObj);
	var dragObjValue = Number(dragObj.getAttribute('answervalue'));
	gameManager.dragObjs.splice(idx, 1);

	if(gameManager.dragObjs.length > 4)
		gameManager.dragObjs = stirElements(gameManager.dragObjs, 4);
	for(var i = 0; i < gameManager.dragObjs.length; i++) {
		if (i < 4) {
			var top = gameManager.quizPosition[i][0],
				left = gameManager.quizPosition[i][1];

			gameManager.dragObjs[i].style.top = top + 'px';
			gameManager.dragObjs[i].style.left = left + 'px';
			gameManager.dragObjs[i].style.display = 'block';
		} else {
			gameManager.dragObjs[i].style.display = 'none';
		}
	}
}

function incorrectAnimation(dragObj) {
	var idx, top, left;
	idx = gameManager.dragObjs.indexOf(dragObj);
	top = gameManager.quizPosition[idx][0];
	left = gameManager.quizPosition[idx][1];

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
}

function gameOver(dragObj) {
	var answer;
	QS('#bgCanvas').style.pointerEvents = "none";

	answer = gameManager.QUIZ_ANSWER[0];
	// if(typeof answer === 'object' && answer[1] > answer[2])
		// drawAnswer();

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
// function drawAnswer() {
// 	var answerDiv, answer, text;
// 	answerDiv = createElement('div', QS('#bgCanvas'), 'answer');
// 	answer = createElement('div', answerDiv, 'text');
// 	text = gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1];
// 	text = text.toString();


// 	makeBunsu(text, answer);
// 	var bunja = QS('.answer .bunja');
// 	bunja.style.marginTop = '16px';

// 	replaceSymbol('=', answerDiv);
// 	answerDiv.querySelector('img').style.cssText = 'width: 35px; height: 35px; margin: 70px 10px;'
// }

// symbol 있는지 찾아주는 함수
function findReplaceSymbol(text) { return (text.indexOf('+') > -1 || text.indexOf('-') > -1 || text.indexOf('*') > -1 || text.indexOf('/') > -1 || text.indexOf('=') > -1 || text.indexOf('...') > -1 || text.indexOf('divBox') > -1 || text.indexOf('invisibleBox') > -1) }

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
	bunsuDiv.style.cssText = 'display: inline-block; vertical-align: middle';
	int.style.cssText = 'display: inline-block; margin-right: 5px; vertical-align: middle';
	prop.style.cssText = 'position: relative; display: inline-block; line-height: 1.25em; vertical-align: middle';
	bunja.style.cssText = 'display: block; vertical-align: middle';
	bunmo.style.cssText = 'display: block; vertical-align: middle';
	midLine.style.cssText = 'position: absolute; top: 50%; left: 0; width: 100%; height: 0; margin-top: -0.05em; border-top: 0.1em solid; border-color: inherit;';
}

// 분수 정수 or 소수로 바꾸는 함수
function convertBunsuToDec(array) { return (Number(array[0]) * Number(array[2]) + Number(array[1])) / Number(array[2]); }

Dragdrop.prototype.createDragdrop = function() {

	var dragDrop = this,
	    startDrag = function(e) {
		e.preventDefault();
		var eventMaster = eventSelector('downEvent', e);
		streamSound.setSound('../../media/silent.mp3');
		dragDrop.offY = eventMaster.clientY - (dragDrop.element.offsetTop * gameManager.zoomRate);
		dragDrop.offX = eventMaster.clientX - (dragDrop.element.offsetLeft * gameManager.zoomRate);

		this.style.zIndex = 20;
		dragDrop.parentElement.addEventListener(gameManager.eventSelector.moveEvent, drag, true);
	},
	    drag = function(e) {
		e.preventDefault();
		var eventMaster = eventSelector('moveEvent', e);

		dragDrop.element.style.position = 'absolute';

		dragDrop.newY = eventMaster.clientY - dragDrop.offY;
		dragDrop.newX = eventMaster.clientX - dragDrop.offX;

		dragDrop.element.style.left = (dragDrop.newX / gameManager.zoomRate) + 'px';
		dragDrop.element.style.top = (dragDrop.newY / gameManager.zoomRate) + 'px';
	},
	    endDrag = function(e) {
		var eventMaster = eventSelector('upEvent', e);
		dragDrop.parentElement.removeEventListener(gameManager.eventSelector.moveEvent, drag, true);
		if (eventMaster !== undefined)
			boundingCircle(this, eventMaster.clientX, eventMaster.clientY);

		if(dropCompare (this, eventMaster.clientX, eventMaster.clientY))
			removeEvents();

		this.style.zIndex = 2;
	},
		removeEvents = function(e) {
			dragDrop.element.removeEventListener(gameManager.eventSelector.downEvent, startDrag, false);
			dragDrop.element.removeEventListener(gameManager.eventSelector.upEvent, endDrag, false);
		}

	dragDrop.element.addEventListener(gameManager.eventSelector.downEvent, startDrag, false);
	dragDrop.element.addEventListener(gameManager.eventSelector.upEvent, endDrag, false);

}

function ReductionObj(element) {
	this.element = element;
	this.thisClassName = element.className;
	this.clickedClassName = '';
	this.thisNum = 0;
	this.createReductionObj();

	gameManager.reductionObjs.push(element);
}

ReductionObj.prototype.createReductionObj = function() {
	this.element.style.pointerEvents = 'auto';

	var reductionObj = this,
		bunja = this.element.querySelector('.bunja'),
		bunmo = this.element.querySelector('.bunmo'),
		clickEvent = function(e) {
			var eventTarget = this;
			if(this.style.cursor === 'default' || gameManager.dabCount !== gameManager.bunsuCount) return;

			reductionObj.clickedClassName = this.className;
			reductionObj.thisNum = Number(this.getAttribute('num'));

			streamSound.setSound('./media/dragFigure.mp3');
			if(gameManager.numArray[0] === 0)
				firstClick(eventTarget);
			else if(gameManager.numArray[1] === 0) {
				if(gameManager.clickedElements[0].className !== reductionObj.clickedClassName && gameManager.clickedParentClassName !== reductionObj.thisClassName)
					secondClick(eventTarget);
				else fail();

			}
		},
		firstClick = function(eventTarget) {
			gameManager.clickedParentClassName = reductionObj.thisClassName;
			gameManager.numArray[0] = reductionObj.thisNum;
			gameManager.clickedElements.push(eventTarget);
			eventTarget.style.color = '#000';
		},
		secondClick = function(eventTarget) {
			gameManager.numArray[1] = reductionObj.thisNum;
			gameManager.clickedElements.push(eventTarget);

			if(isReductable()) {
				success();
				reset();
			}
			else fail();
		},
		isReductable = function() {
			var CDs = [],
				difference = gameManager.numArray[0] === gameManager.numArray[1];

			if(difference >= 0) for(var i = 0; i < gameManager.numArray[1] - 1; i++) CDs.push(gameManager.numArray[1] - i);
			else for(var i = 0; i < gameManager.numArray[0] - 1; i++) CDs.push(gameManager.numArray[0] - i);

			for(var i = 0; i < CDs.length; i++) {
				if(gameManager.numArray[0] % CDs[i] === 0 && gameManager.numArray[1] % CDs[i] === 0) {
					gameManager.GCD = CDs[i];
					return true;
				}
			}
		},
		success = function() {
			gameManager.numArray.forEach(function(el, i) {
				gameManager.numArray[i] = el / gameManager.GCD;
			});
			gameManager.clickedElements.forEach(function(el) {
				el.style.cursor = 'default';
			});
		},
		fail = function() {
			gameManager.clickedElements[0].style.color = '#fff';
			gameManager.numArray = [0, 0];
			gameManager.clickedElements = [];
		},
		reset = function() {
			gameManager.numArray.forEach(function(el, i){
				gameManager.clickedElements[i].innerHTML = el;
				gameManager.clickedElements[i].style.color = '#fff';
				gameManager.clickedElements[i].setAttribute('num', el);
			});
			gameManager.numArray = [0, 0];
			gameManager.clickedElements = [];
		}
	bunja.style.cursor = 'pointer';
	bunja.addEventListener(gameManager.eventSelector.downEvent, clickEvent, false);
	if(bunmo !== null) {
		bunmo.style.cursor = 'pointer';
		bunmo.addEventListener(gameManager.eventSelector.downEvent, clickEvent, false);
	}
}

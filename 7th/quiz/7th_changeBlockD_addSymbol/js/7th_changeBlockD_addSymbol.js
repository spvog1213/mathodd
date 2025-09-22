function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	gameManager.blockCount = gameManager.QUIZ_OPTION[0].length;

	gameManager.quizObj.forEach(function(el){
		if(el[2])
			gameManager.changeCount++;
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
	var int, img, pushedImg, value;
	var top = 180, left = 104, leftChange = 228;

	if(gameManager.blockCount === 2)
		left = 270;

	for(var i = 0; i < gameManager.blockCount + 1; i++) {
		var dropArea = createElement('div', QS('#bgCanvas'), 'dropArea_' + i),
			textDiv = createElement('div', dropArea, 'text'),
			prop = createElement('span', textDiv, 'prop'),
			bunja = createElement('span', prop, 'bunja');

		int = undefined;

		if(i !== gameManager.blockCount) {
			var textArray = gameManager.QUIZ_OPTION[0][i],
				symbol = textArray[0],
				text = textArray[1],
				int = undefined;

			// 분수일 경우
			if(typeof text === 'object') {
				bunmo = createElement('span', prop, 'bunmo');

				// 대분수인 경우
				if(text[0] !== 0) {
					int = document.createElement('span');
					int.setAttribute('class', 'int');

					img = createElement('div', int, 'img block_' + gameManager.randomArray[0]);
					pushedImg = createElement('div', int, 'pushedImg block_' + gameManager.randomArray[0]);

					value = createElement('div', int, 'value');
					value.innerHTML = text[0];

					textDiv.insertBefore(int, prop);
					dropArea.style.backgroundImage ='url(images/block_2.png)';
				} else {
					// durlek
					dropArea.style.backgroundImage ='url(images/block_2_center.png)';
				}

				img = createElement('div', bunja, 'img block_' + gameManager.randomArray[0]);
				pushedImg = createElement('div', bunja, 'pushedImg block_' + gameManager.randomArray[0]);

				value = createElement('div', bunja, 'value');
				value.innerHTML = text[1];

				bunja.setAttribute('num', text[1]);

				img = createElement('div', bunmo, 'img block_' + gameManager.randomArray[0]);
				pushedImg = createElement('div', bunmo, 'pushedImg block_' + gameManager.randomArray[0]);

				value = createElement('div', bunmo, 'value');
				value.innerHTML = text[2];

				bunmo.setAttribute('num', text[2]);

			// 분수가 아닐 경우
			} else {
				textDiv.classList.add('noBunsu');

				img = createElement('div', bunja, 'img block_' + gameManager.randomArray[0]);
				pushedImg = createElement('div', bunja, 'pushedImg block_' + gameManager.randomArray[0]);

				value = createElement('div', bunja, 'value');
				value.innerHTML = text;

				bunja.setAttribute('num', text);

				dropArea.style.backgroundImage ='url(images/block_2_blank.png)';
			}

			// 부호 있을 경우
			if(symbol) {
				textDiv.classList.add('withSymbol');

				var symbolSpan = document.createElement('span');
				replaceSymbol(symbol, symbolSpan);
				symbolSpan.classList.add('symbol');

				var symbol = symbolSpan.querySelector('img')

				symbolSpan.querySelector('img').style.cssText = 'width: auto; height: 40px; margin: 0;';

				if(int)
					textDiv.insertBefore(symbolSpan, int);
				else
					textDiv.insertBefore(symbolSpan, prop);

				if (typeof text != 'object') {}			
				else dropArea.style.backgroundImage = 'url(./images/block_2.png)';
			}

			new ReductionObj(dropArea);
		}

		// 위치 설정
		dropArea.style.top = top + 'px';
		dropArea.style.left = left + 'px';
		if(i === gameManager.blockCount - 1)
			leftChange = 268;
		left += leftChange;

		// 정답 attribute 설정
		dropArea.setAttribute('answervalue', i + 1);
		gameManager.dropArea.push(dropArea);
	}
}

// 수학기호 그리기
function drawSymbols() {
	var top = 250, left = 770, text = '=', // left = 820
		symbol = createElement('span', QS('#bgCanvas'), 'symbol');
	if(gameManager.blockCount === 2)
		left = 707;

	replaceSymbol(text, symbol);
	symbol.style.cssText = 'position: absolute; top: ' + top + 'px; left: ' + left + 'px;';
	symbol.querySelector('img').style.cssText = 'width: auto; height: 35px; margin: 0;';

}
// dragObj 그리기
function drawDragObjs() {
	var img, pushedImg, value;
	var top = 482, left = 174, leftChange = 228;

	for(var i = 0; i < gameManager.quizObj.length; i++) {
		var dragObj = createElement('div', QS('#bgCanvas'), 'dragObj dragObj_' + i),
			textDiv = createElement('div', dragObj, 'text'),
			textArray = gameManager.quizObj[i],
			symbol = textArray[0],
			text = textArray[1],
			int = undefined,
			answervalue = textArray[2],
			prop = createElement('span', textDiv, 'prop'),
			bunja = createElement('span', prop, 'bunja');

			// 글씨 넣기
		// 분수일 경우
		if(typeof text === 'object') {
			bunmo = createElement('span', prop, 'bunmo');

			// 대분수일 경우
			if(text[0] !== 0) {
				var int = document.createElement('span');
				int.setAttribute('class', 'int');

				img = createElement('div', int, 'img block_' + gameManager.randomArray[1]);
				pushedImg = createElement('div', int, 'pushedImg block_' + gameManager.randomArray[1]);

				value = createElement('div', int, 'value');
				value.innerHTML = text[0];

				textDiv.insertBefore(int, prop);
			}

			img = createElement('div', bunja, 'img block_' + gameManager.randomArray[1]);
			pushedImg = createElement('div', bunja, 'pushedImg block_' + gameManager.randomArray[1]);

			value = createElement('div', bunja, 'value');
			value.innerHTML = text[1];

			bunja.setAttribute('num', text[1]);

			img = createElement('div', bunmo, 'img block_' + gameManager.randomArray[1]);
			pushedImg = createElement('div', bunmo, 'pushedImg block_' + gameManager.randomArray[1]);

			value = createElement('div', bunmo, 'value');
			value.innerHTML = text[2];

			bunmo.setAttribute('num', text[2]);

		// 분수가 아닐 경우
		} else {
			textDiv.classList.add('noBunsu');

			img = createElement('div', bunja, 'img block_' + gameManager.randomArray[1]);
			pushedImg = createElement('div', bunja, 'pushedImg block_' + gameManager.randomArray[1]);

			value = createElement('div', bunja, 'value');
			value.innerHTML = text;

			bunja.setAttribute('num', text);

			dragObj.style.backgroundImage ='url(images/block_1_blank.png)';
		}

		// 부호 있을 경우
		if(symbol) {
			textDiv.classList.add('withSymbol');

			symbolSpan = document.createElement('span');
			replaceSymbol(symbol, symbolSpan);
			symbolSpan.classList.add('symbol');
			symbolSpan.querySelector('img').style.cssText = 'width: auto; height: 40px; margin: 0;';
			if(int)
				textDiv.insertBefore(symbolSpan, int);
			else {
				symbolSpan.style.height = 177 + 'px';
				symbolSpan.style.lineHeight = 177 + 'px';
				textDiv.insertBefore(symbolSpan, prop);
			}
			if(typeof text != 'object'){
				// console.log(text)
				dragObj.style.backgroundImage = 'url(./images/block_1_blank.png)';				
			}else dragObj.style.backgroundImage = 'url(./images/block_1_rightLine.png)';
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
		if(text.toString() === gameManager.QUIZ_ANSWER[0].toString())
			answervalue = gameManager.blockCount + 1;
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

		if(gameManager.dabCount === gameManager.changeCount + 1 || dragObjValue === gameManager.blockCount + 1) {
			log('@ correct!!');
			gameOver(dragObj);
		} 
		else posDragObjs(dragObj);

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
	var idx = gameManager.dragObjs.indexOf(dragObj),
		dragObjValue = Number(dragObj.getAttribute('answervalue'));
	gameManager.dragObjs.splice(idx, 1);
	new ReductionObj(dragObj);

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
	if(gameManager.dabCount === gameManager.changeCount && dragObjValue !== gameManager.QUIZ_OPTION[0].length + 1) {

		var aaa = endCheck();
		if(aaa == false){
			gameManager.reductionObjs.forEach(function(el){
				var btns = el.querySelectorAll('.prop > span');
				for(var i = 0; i < btns.length; i++)
					btns[i].classList.add('shining');
			});
			drawGuide();
		}
		// 불 들어오게
	}
}

// 약수 찾는 부분
function isReductable (array) {
	var CDs = [],
		difference = array[0] - array[1];

	if(difference >= 0) {
		for (var i = 0; i < array[1] - 1; i++) CDs.push(array[1] - i);
	} else {
		for (var i = 0; i < array[0] - 1; i++) CDs.push(array[0] - i);
	}

	for(var i = 0; i < CDs.length; i++) {
		if (array[0] > 1 && CDs[i] > 1 && array[1] > 1 && CDs[i] > 1) {
			if(array[0] % CDs[i]  === 0 && array[1] % CDs[i] === 0) {
				// console.log('array', array, gameManager.numArray)
				// if(array === gameManager.numArray)
				gameManager.GCD = CDs[i];
				return true;
			}
		}
	}
}

function endCheck() {
	var bunjaArray = [];
	var bunmoArray = [];
	var bool = true;

	var reductionArray = spliceReduction();
// console.log(gameManager.reductionObjs)
	for (var i = 0; i < reductionArray.length; i++) {
		var bunja = reductionArray[i].querySelector('.bunja');
		bunja = Number(bunja.getAttribute('num'));
		bunjaArray.push(bunja);

		var bunmo = reductionArray[i].querySelector('.bunmo');
		if(bunmo) {
			bunmo = Number(bunmo.getAttribute('num'));
			bunmoArray.push(bunmo);
		}
	}

	bunjaArray.forEach(function(bunja, i){
		bunmoArray.forEach(function(bunmo, j){
			var array = [];
			array.push(bunja);
			array.push(bunmo);

			if(isReductable(array)) {
				bool = false;
				return bool;
			}
		})
	});
	return bool;
}

function spliceReduction () {
	var array = [];

	for (var i = 0; i < gameManager.reductionObjs.length; i++) {
		if (gameManager.reductionObjs[i].classList.contains('dragObj'))
			array[gameManager.reductionObjs[i].getAttribute('answervalue')-1] = gameManager.reductionObjs[i];
		else array.push(gameManager.reductionObjs[i]);
	}

	return array;
}

// 가이드 그리기
function drawGuide() {
	var guideDiv = createElement('div', QS('#bgCanvas'), 'guide');
	guideDiv.innerHTML = '* 약분 가능한 두 수를 선택하면 약분할 수 있어요!'
}

function removeGuide() {
	QS('.guide').innerHTML = '';

	// 불 없애기
	gameManager.reductionObjs.forEach(function(el){
		var btns = el.querySelectorAll('.prop > span');
		for(var i = 0; i < btns.length; i++)
			if(btns[i].classList.contains('shining'))
				btns[i].classList.remove('shining');
	});
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
	if(QS('.guide'))
		removeGuide();

	var answer = gameManager.QUIZ_ANSWER[0];
	if(typeof answer === 'object' && answer[1] > answer[2])
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
		parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);
}

// 정답 그리기
function drawAnswer() {
	var answerDiv, answer, text;
	answerDiv = createElement('div', QS('#bgCanvas'), 'answer');
	answer = createElement('div', answerDiv, 'text');
	text = gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1];
	text = text.toString();


	makeBunsu(text, answer);
	var bunja = QS('.answer .bunja');
	bunja.style.marginTop = '16px';

	replaceSymbol('=', answerDiv);
	answerDiv.querySelector('img').style.cssText = 'width: 35px; height: 35px; margin: 70px 10px;';
}

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
// console.log(gameManager.reductionObjs)
ReductionObj.prototype.createReductionObj = function() {
	this.element.style.pointerEvents = 'auto';

	var reductionObj = this,
		bunja = this.element.querySelector('.bunja'),
		bunmo = this.element.querySelector('.bunmo'),
		clickEvent = function(e) {

			var eventTarget = this;

			if(this.style.cursor === 'default' || gameManager.dabCount !== gameManager.changeCount) return;

			eventTarget.classList.add('pushed');

			reductionObj.clickedClassName = this.className;
			reductionObj.thisNum = Number(this.getAttribute('num'));

			streamSound.setSound('./media/dragFigure.mp3');
			if(gameManager.numArray[0] === 0)
				firstClick(eventTarget);
			else if(gameManager.numArray[1] === 0) {
				setTimeout(function(){
					if(gameManager.clickedElements[0].className !== reductionObj.clickedClassName && gameManager.clickedParentClassName !== reductionObj.thisClassName)
						secondClick(eventTarget);
					else fail(eventTarget);
				}, 150);
			}
		},
		firstClick = function(eventTarget) {
			gameManager.clickedParentClassName = reductionObj.thisClassName;
			gameManager.numArray[0] = reductionObj.thisNum;
			gameManager.clickedElements.push(eventTarget);
		},
		secondClick = function(eventTarget) {
			gameManager.numArray[1] = reductionObj.thisNum;
			gameManager.clickedElements.push(eventTarget);

			if(isReductable(gameManager.numArray)) {
				success();
				reset();
				if(endCheck()) {
					removeGuide();
				}
			}
			else fail(eventTarget);
		},
		isReductable = function(array) {
			var CDs = [],
				difference = array[0] - array[1];

			if(difference >= 0) {
				for (var i = 0; i < array[1] - 1; i++) CDs.push(array[1] - i);
			} else {
				for (var i = 0; i < array[0] - 1; i++) CDs.push(array[0] - i);
			}

			for(var i = 0; i < CDs.length; i++) {
				if (array[0] > 1 && CDs[i] > 1 && array[1] > 1 && CDs[i] > 1) {
					if(array[0] % CDs[i] === 0 && array[1] % CDs[i] === 0) {
						if(array === gameManager.numArray)
							gameManager.GCD = CDs[i];
						return true;
					}
				}
			}
		},
		success = function() {
			streamSound.setSound('../../media/correct_2.mp3');

			gameManager.numArray.forEach(function(el, i) {
				// gameManager.clickedElements[i].classList.remove('shining');
				gameManager.numArray[i] = el / gameManager.GCD;
			});
		},
		fail = function(eventTarget) {
			streamSound.setSound('../../media/incorrect_2.mp3');

			gameManager.numArray = [0, 0];
			gameManager.clickedElements[0].classList.remove('pushed');
			if(eventTarget !== undefined)
				eventTarget.classList.remove('pushed');
			gameManager.clickedElements = [];
		},
		reset = function() {
			gameManager.numArray.forEach(function(el, i){
				gameManager.clickedElements[i].classList.remove('pushed');
				gameManager.clickedElements[i].setAttribute('num', el);
				gameManager.clickedElements[i].querySelector('.value').innerHTML = el;
			});
			gameManager.numArray = [0, 0];
			gameManager.clickedElements = [];
		},
		endCheck = function() {
			var bunjaArray = [];
			var bunmoArray = [];
			var bool = true;

			var reductionArray = spliceReduction();

			for (var i = 0; i < reductionArray.length; i++) {
				var bunja = reductionArray[i].querySelector('.bunja');
				bunja = Number(bunja.getAttribute('num'));
				bunjaArray.push(bunja);

				var bunmo = reductionArray[i].querySelector('.bunmo');
				if(bunmo) {
					bunmo = Number(bunmo.getAttribute('num'));
					bunmoArray.push(bunmo);
				}
			}

			bunjaArray.forEach(function(bunja, i){
				bunmoArray.forEach(function(bunmo, j){
					var array = [];
					array.push(bunja);
					array.push(bunmo);
					if(isReductable(array)) {
						bool = false;
					}
				})
			});

			return bool;
		}
	bunja.style.cursor = 'pointer';
	bunja.addEventListener(gameManager.eventSelector.downEvent, clickEvent, false);
	if(bunmo !== null) {
		bunmo.style.cursor = 'pointer';
		bunmo.addEventListener(gameManager.eventSelector.downEvent, clickEvent, false);
	}
}

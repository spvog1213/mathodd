function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	gameManager.randomArray = makeRandomArray(1, 3);

	drawTitle();
	drawDropArea();
	drawSymbols();
}
// 제목 그리기
function drawTitle() {
	var title, titleInner;
	title = createElement('div', QS('#bgCanvas'), 'title');
	titleInner = createElement('div', title, 'titleInner');
	titleInner.innerHTML = '약분 가능한 두 수를 선택하세요.';
}
// card 그리기
function drawDropArea() {
	var top, left, leftChange, dropArea, img, imgSrc, textDiv, text, int, prop, bunja, bunmo;
	top = 300, left = 215, leftChange = 300;

	for(var i = 0; i < 3; i++) {
		var dropArea, textDiv, text, prop, value, btnImg, btnImg_pushed;

		var dropArea = createElement('div', QS('#bgCanvas'), 'dropArea_' + i),
			textDiv = createElement('div', dropArea, 'text'),
			text = gameManager.QUIZ_OPTION[i],
			prop = createElement('span', textDiv, 'prop'),
			bunja = createElement('span', prop, 'bunja');

		// 분수일 경우
		if(typeof text === 'object') {
			var bunmo = createElement('span', prop, 'bunmo');

			// 대분수일 경우
			if(text[0] !== 0) {
				var int = document.createElement('span');
				int.setAttribute('class', 'int');

				img = createElement('div', int, 'img block_' + gameManager.randomArray[0]);
				pushedImg = createElement('div', int, 'pushedImg block_' + gameManager.randomArray[0]);

				value = createElement('div', int, 'value');
				value.innerHTML = text[0];

				textDiv.insertBefore(int, prop);
				dropArea.style.backgroundImage ='url(images/block_2.png)';
			} else {
				dropArea.style.backgroundImage ='url(images/block_1.png)';
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
			prop.style.height = 'auto';

			img = createElement('div', bunja, 'img block_' + gameManager.randomArray[0]);
			pushedImg = createElement('div', bunja, 'pushedImg block_' + gameManager.randomArray[0]);

			value = createElement('div', bunja, 'value');
			value.innerHTML = text;

			bunja.setAttribute('num', text);

			dropArea.style.backgroundImage ='url(images/block_1_blank.png)';
		}

		// 위치
		dropArea.style.top = top + 'px';
		dropArea.style.left = left + 'px';
		left += leftChange;

		gameManager.dropArea.push(dropArea);
		new ReductionObj(dropArea);
	}
	// console.log('gameManager.dropArea:', gameManager.dropArea);
}

// 수학기호 그리기
function drawSymbols() {
	var top, left, text, symbol;
	top = 380; left = 440; text = '*';

	for(var i = 0; i < 2; i++) {
		symbol = createElement('span', QS('#bgCanvas'), 'symbol');

		replaceSymbol(text, symbol);
		symbol.style.cssText = 'position: absolute; top: ' + top + 'px; left: ' + left + 'px;';
		symbol.querySelector('img').style.cssText = 'width: 35px; height: 35px; margin: 0;';
		left = 740;
	}
}

// 가이드 그리기
function drawGuide() {
	var guideDiv = createElement('div', QS('#bgCanvas'), 'guide');
	guideDiv.innerHTML = '한번 더!';
}

function removeGuide() {
	QS('.guide').innerHTML = '';
}

function gameOver(dragObj) {
	QS('#bgCanvas').style.pointerEvents = "none";
	// 가이드 없애기
	if(QS('.guide'))
		removeGuide();
	// 분수 클릭 방지
	var spans = QSAll('.prop > span');
	for(var i = 0; i < spans.length; i++) {
		spans[i].style.cursor = 'default';
	}

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

function ReductionObj(element) {
	this.element = element;
	this.thisClassName = element.className;
	this.clickedClassName = '';
	this.thisNum = 0;
	this.createReductionObj();

	gameManager.reductionObjs.push(element);
}

ReductionObj.prototype.createReductionObj = function() {
	this.element.style.pointerEvents = 'auto'; // dragObj drop 완료되면 pointer-events가 none이 되기 때문에.

	var reductionObj = this,
		bunja = this.element.querySelector('.bunja'),
		bunmo = this.element.querySelector('.bunmo'),
		clickEvent = function(e) {

			var eventTarget = this;

			if(this.style.cursor === 'default') return;

			eventTarget.classList.add('pushed');

			reductionObj.clickedClassName = this.className;
			reductionObj.thisNum = Number(this.getAttribute('num'));

			// console.log('thisClassName:', reductionObj.thisClassName, 'clickedClassName:', reductionObj.clickedClassName, 'thisNum:', reductionObj.thisNum, 'numArray:', gameManager.numArray);

			streamSound.setSound('./media/dragFigure.mp3');
			if(gameManager.numArray[0] === 0)
				firstClick(eventTarget);
			else if(gameManager.numArray[1] === 0) {
				setTimeout(function(){
					if(gameManager.clickedElements[0].className !== reductionObj.clickedClassName && gameManager.clickedParentClassName !== reductionObj.thisClassName)
						secondClick(eventTarget);
					else fail(eventTarget);
				}, 200);
			}

		},
		firstClick = function(eventTarget) { // console.log('>>firstClick');
			gameManager.clickedParentClassName = reductionObj.thisClassName;
			gameManager.numArray[0] = reductionObj.thisNum;
			gameManager.clickedElements.push(eventTarget);
		},
		secondClick = function(eventTarget) { // console.log('>>secondClick');
			gameManager.numArray[1] = reductionObj.thisNum;
			gameManager.clickedElements.push(eventTarget);

			if(isReductable(gameManager.numArray)) {
				success();
				reset();
				if(endCheck()) {
					gameOver();
					removeGuide();
				} else {
					drawGuide();
				}
			}
			else fail(eventTarget);
		},
		isReductable = function(array) {
			var CDs = [],
				difference = array[0] === array[1];

			if(difference >= 0) for(var i = 0; i < array[1] - 1; i++) CDs.push(array[1] - i);
			else for(var i = 0; i < array[0] - 1; i++) CDs.push(array[0] - i);

			for(var i = 0; i < CDs.length; i++) {
				if(array[0] % CDs[i] === 0 && array[1] % CDs[i] === 0) {
					if(array === gameManager.numArray)
						gameManager.GCD = CDs[i];
					return true;
				}
			}
		},
		success = function() {
			streamSound.setSound('../../media/correct_2.mp3');

			gameManager.numArray.forEach(function(el, i) {
				gameManager.numArray[i] = el / gameManager.GCD;
			});
			gameManager.clickedElements.forEach(function(el) {
				el.classList.remove('pushed');
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
			for (var i = 0; i < gameManager.reductionObjs.length; i++) {
				var bunja = gameManager.reductionObjs[i].querySelector('.bunja');
				bunja = Number(bunja.getAttribute('num'));
				bunjaArray.push(bunja);

				var bunmo = gameManager.reductionObjs[i].querySelector('.bunmo');
				if(bunmo) {
					bunmo = Number(bunmo.getAttribute('num'));
					bunmoArray.push(bunmo);
				}
			}

			bunjaArray.forEach(function(bunja, i){
				bunmoArray.forEach(function(bunmo, j){
					var array = [];
					array.push(bunja, bunmo);
					if(isReductable(array))
						bool = false;
				})
			});

			return bool;
		}
	if(bunja !== null) {
		bunja.style.cursor = 'pointer';
		bunja.addEventListener(gameManager.eventSelector.upEvent, clickEvent, false);
	}
	if(bunmo !== null) {
		bunmo.style.cursor = 'pointer';
		bunmo.addEventListener(gameManager.eventSelector.upEvent, clickEvent, false);
	}
}

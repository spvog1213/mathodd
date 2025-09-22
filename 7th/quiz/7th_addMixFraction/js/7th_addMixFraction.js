var canvas = QS('#bgCanvas');

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	drawBgBoxes();
	makeRandomImg();
	drawTopImgs();
	drawDropArea();
	drawDragObjs();
	drawCheckBtn();
}

function drawBgBoxes() {
	var bgBoxes;
	bgBoxes = createElement('div', canvas, 'bgBoxes');
}

function makeRandomImg() {
	var randomNumber = Math.floor(Math.random() * 3);

	switch(randomNumber) {
		case 0: gameManager.randomImg = 'pizza'; break;
		case 1: gameManager.randomImg = 'orange'; break;
		case 2: gameManager.randomImg = 'wmelon'; break;
	}
}

function drawTopImgs() {
	var topContainer, sizerObj, img, intLength, dragObj, bunsu, bunja, bunmo;

	for (var i = 0; i < 2; i++) {
		topContainer = createElement('div', canvas, 'topContainer');

		// 크기, 위치 설정
		sizerObj = { top: 50, left: 140, width: 455, height: 155 };
		Object.keys(sizerObj).forEach(function(el) { topContainer.style[el] = sizerObj[el] + 'px'; });
		if(i === 0) topContainer.style.left = sizerObj.left + 'px';
		else topContainer.style.left = (1220 - sizerObj.width - sizerObj.left) + 'px';

		// 이미지 설정
		bunsu = gameManager.QUIZ_OPTION[i];
		int = bunsu[0];
		bunja = bunsu[1];
		bunmo = bunsu[2];
		for (var j = 0; j < int; j++) {
			img = createElement('img', topContainer);
			img.src = './images/' + gameManager.randomImg + '_' + bunmo + '_' + bunmo + '.png';
		}
		var img = createElement('img', topContainer);
		img.src = './images/' + gameManager.randomImg + '_' + bunmo + '_' + bunja + '.png';
	}
}

function drawDropArea() {
	var dropArea, sizerObj, img, bunsu, int, bunja, bunmo;
	dropArea = createElement('div', canvas, 'dropArea_0');

	// 크기, 위치 설정
	sizerObj = { top: 278, left: 180, width: 855, height: 155 };
	Object.keys(sizerObj).forEach(function(el) { dropArea.style[el] = sizerObj[el] + 'px'; });

	gameManager.dropArea.push(dropArea);
}

function drawDragObjs() {
	var dropArea, top, left, sizerObj, bunmo;
	top = 525, left = 425;
	bunmo = gameManager.QUIZ_OPTION[0][2];
	sizerObj = { top: 485, left: 0, width: 1230, height: 230 };

	// dragObj 그리기
	for (var i = 0; i < 2; i++) {
		dragObj = createElement('img', canvas, 'dragObj dragObj_' + i);

		// 위치 설정
		dragObj.style.top = top + 'px';
		dragObj.style.left = left + 'px';
		gameManager.quizPosition.push([top, left]);
		left += 240;

		// 이미지 설정
		if(i === 0) dragObj.src = './images/' + gameManager.randomImg + '.png';
		else {
			dragObj.src = './images/piece_' + gameManager.randomImg + '_' + bunmo + '.png';
			dragObj.style.height = 110 + 'px';
		}

		gameManager.dragObjs.push(dragObj);
		new Dragdrop(dragObj);
	}

	// dropArea 그리기
	dropArea = createElement('div', canvas, 'dropArea_1');
	Object.keys(sizerObj).forEach(function(el) { dropArea.style[el] = sizerObj[el] + 'px'; });

	gameManager.dropArea.push(dropArea);
}

function drawCheckBtn() {
	var checkBtnContainer = createElement('div', canvas, 'checkBtnContainer'),
		checkBtn_on = createElement('div', checkBtnContainer, 'checkBtn_on'),
		checkBtn = createElement('div', checkBtnContainer, 'checkBtn');

	// checkBtn.src = '../../images/common/checkBtnRed.png';
	// checkBtn_on.src = '../../images/common/checkBtnRed_on.png';

	checkBtnContainer.addEventListener(gameManager.eventSelector.upEvent, checkBtnClick, false);
}

function checkBtnClick() {
	var target = this;
	this.classList.add('on');
	compareAnswer(target);
}

function compareAnswer(target) {
	if (gameManager.dabCount[1] === gameManager.QUIZ_ANSWER[0][0] && gameManager.dabCount[0] === gameManager.QUIZ_ANSWER[0][1])
		gameOver();
	else {
		setTimeout(function(){
			target.classList.remove('on');
		}, 100);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}

function drawPopup() {
	var popup = createElement('div', canvas, 'popup'),
		text = gameManager.QUIZ_OPTION[2].split(' ');

	for (var i = 0; i < text.length; i++) {
		var span = createElement('span', popup),
			txt = text[i];
		if(txt.indexOf(']') <= 0) {
			if(txt == '+' || txt == '-' || txt == '/' || txt == '*' || txt == '=') {
				replaceSymbol(txt, span);

				span.querySelector('img').style.cssText = 'position: relative; width: 30px; height: 30px; margin-bottom: -5px;';
			} else {
				span.innerHTML = txt;
			}
		} else {
			makeBunsu(txt, span);
		}
		span.style.display = 'inline-block';
		span.style.margin = '0 10px';
	}

	QSAll('.popup > span')[4].classList.add('boxed');
}

function boundingCircle(dragObj, x, y) {
	var idx, dragObjs, dropArea, img, bunmo;
	idx = Number(dragObj.classList[1].split('_')[1]);
	dragObjs = QSAll('.dragObj');
	dropArea = QS('.dropArea_0');
	bunmo = gameManager.QUIZ_OPTION[0][2];

	if (dropCompare(dragObj, x, y)) {
		log('bounding!');
		streamSound.setSound('./media/dragFigure.mp3');

		if (idx < 2) {
			if (gameManager.completeObjs.length < 5 && idx === 0) {

				img = document.createElement('img');

				img.setAttribute('class', 'dragObj dragObj_' + gameManager.completeObjCount);
				img.src = './images/' + gameManager.randomImg + '_' + bunmo + '_' + bunmo + '.png';

				if(gameManager.dabCount[0] === 0) dropArea.appendChild(img);
				else dropArea.insertBefore(img, QS('.frImg'));

				gameManager.completeObjs.push(img);

				gameManager.dabCount[1]++;

				new Dragdrop(img);
				alignCompleteObjs();

			} else if (gameManager.completeObjs.length <= 5 && idx === 1 && gameManager.dabCount[1] !== 5) {
				if(gameManager.dabCount[0] !== bunmo - 1) {

					gameManager.dabCount[0]++;

					if(gameManager.dabCount[0] === 1) {
						img = createElement('img', dropArea, 'dragObj dragObj_' + gameManager.completeObjCount + ' frImg');
						gameManager.completeObjs.push(img);
						new Dragdrop(img);
						alignCompleteObjs();
					} else {
						img = QS('.frImg');
					}
					img.src = './images/' + gameManager.randomImg + '_' + bunmo + '_' + gameManager.dabCount[0] + '.png';
				}
			}
		} else {
			if(dragObj.className.indexOf('frImg') > -1) {
				var frImg = QS('.frImg'),
					index = 0;
				if(gameManager.dabCount[0] !== 1) {
					gameManager.dabCount[0]--;
					frImg.src = './images/' + gameManager.randomImg + '_' + bunmo + '_' + gameManager.dabCount[0] + '.png';
				} else {
					gameManager.completeObjs.pop();
					dropArea.removeChild(dragObj);
					gameManager.dabCount[0]--;
				}
			} else {
				for (var i = 0; i < gameManager.completeObjs.length; i++) {
					if(gameManager.completeObjs[i].classList.contains('frImg')) index = i;
				}
				if(index === 0) gameManager.completeObjs.pop();
				else gameManager.completeObjs.shift();
				dropArea.removeChild(dragObj);
				gameManager.dabCount[1]--;
			}
			alignCompleteObjs();
		}

		for (var i = 0; i < 2; i++) {
			gameManager.dragObjs[i].style.top = gameManager.quizPosition[i][0] + 'px';
			gameManager.dragObjs[i].style.left = gameManager.quizPosition[i][1] + 'px';
		}

		gameManager.completeObjCount++;
		boundingCounter = true;
	} else {
		log('>>>>> not bounding!');
		if(idx < 2) incorrectAnimation(dragObj);
		else alignCompleteObjs();
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}

function alignCompleteObjs() {
	var completeObjs, length, top, left, leftChange;
	completeObjs = QSAll('.dropArea_0 .dragObj');
	length = completeObjs.length;
	top = 0, left = 900, leftChange = 170;
	left = (left  - leftChange * length) / 2;

	for (var i = 0; i < length; i++) {
		completeObjs[i].style.top = top + 'px';
		completeObjs[i].style.left = left + 'px';
		left += leftChange;
	}
}

function dropCompare (dragObj, x, y) {
	var idx = Number(dragObj.classList[1].split('_')[1]);

	if (idx < 2) {
		if (x > gameManager.dropArea[0].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[0].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[0].clientWidth + 10) * gameManager.zoomRate) &&
			y > gameManager.dropArea[0].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[0].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[0].clientHeight + 10) * gameManager.zoomRate)) {

			return true;

		} else return false;

	} else {
		if (x > gameManager.dropArea[1].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[1].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[1].clientWidth + 10) * gameManager.zoomRate) &&
			y > gameManager.dropArea[1].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[1].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[1].clientHeight + 10) * gameManager.zoomRate)) {

			return true;

		} else return false;
	}
}

function gameOver(dragObj) {
	streamSound.setSound('../../media/correct.mp3');
	canvas.style.pointerEvents = "none";
	drawPopup();

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

// 수정
Dragdrop.prototype.createDragdrop = function() {

	var dragDrop = this,
		parentNode = this.element.parentNode,
		cloned = undefined,
		dragStarted = false,
	    startDrag = function(e) {
			dragStarted = true;
			e.preventDefault();
			var eventMaster = eventSelector('downEvent', e);
			streamSound.setSound('../../media/silent.mp3');
			dragDrop.offY = eventMaster.clientY - (dragDrop.element.offsetTop * gameManager.zoomRate);
			dragDrop.offX = eventMaster.clientX - (dragDrop.element.offsetLeft * gameManager.zoomRate);

			if(dragDrop.element.classList.contains('frImg')) {

				// 복제해서 넣기
				cloned = dragDrop.element.cloneNode(true);
				parentNode.appendChild(cloned);

				// 이미지 설정
				dragDrop.element.src = './images/piece_' + gameManager.randomImg + '_' + gameManager.QUIZ_OPTION[0][2] + '.png';

			}

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
			if(!dragStarted) return;
			var eventMaster = eventSelector('upEvent', e);
			dragDrop.parentElement.removeEventListener(gameManager.eventSelector.moveEvent, drag, true);
			if (eventMaster !== undefined)
				boundingCircle(this, eventMaster.clientX, eventMaster.clientY);

			if(dragDrop.element.classList.contains('frImg') && dragStarted) {

				// 복제했던 거 삭제하고 정렬
				parentNode.removeChild(cloned);
				alignCompleteObjs();

				// 이미지 설정
				if(gameManager.dabCount[0] !== 0)
					dragDrop.element.src = './images/' + gameManager.randomImg + '_' + gameManager.QUIZ_OPTION[0][2] + '_' + gameManager.dabCount[0] + '.png';

			}
			this.style.zIndex = 2;
			dragStarted = false;
		}

	dragDrop.element.addEventListener(gameManager.eventSelector.downEvent, startDrag, false);
	dragDrop.element.addEventListener(gameManager.eventSelector.upEvent, endDrag, false);
}

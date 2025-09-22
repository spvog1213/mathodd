var canvas = QS('#bgCanvas');

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	gameManager.size = { imgTop: 190, imgLeft: 90, imgHeight: 160, symbolHeight: 50 };

	var top = 180,
		left = 700;
	switch (gameManager.bunmo) {
		case 3: gameManager.arrPos = [[left, top], [left + 37, top + 100], [left + 70, top]]; break;
		case 4: gameManager.arrPos = [[left, top], [left, top + 80], [left + 70, top + 80], [left + 70, top]]; break;
		case 5: gameManager.arrPos = [[left, top], [left - 20, top + 60], [left + 35, top + 100], [left + 80, top + 60], [left + 70, top]]; break;
		case 6: gameManager.arrPos = [[left, top], [left - 20, top + 50], [left + 10, top + 100], [left + 65, top + 100], [left + 95, top + 50], [left + 70, top]]; break;
	}

	makeRandomImg();
	drawImgs();
	drawSymbols();
	drawArrow();
	drawCheckBtn();
	// drawPopup();
}

function makeRandomImg() {
	var randomNumber = Math.floor(Math.random() * 3);

	switch(randomNumber) {
		case 0: gameManager.randomImg = 'orange'; break;
		case 1: gameManager.randomImg = 'pizza'; break;
		case 2: gameManager.randomImg = 'wmelon'; break;
	}
}

function drawImgs() {
	var top = gameManager.size.imgTop,
		left = gameManager.size.imgLeft,
		leftChange = 300,
		height = gameManager.size.imgHeight,
		imgName = gameManager.randomImg;

	for (var i = 0; i < 4; i++) {
		var bgImg = createElement('img', canvas, 'bgImg'),
			img = createElement('img', canvas, 'img_' + i);

		// 위치 설정
		img.style.top = top + 'px';
		img.style.left = left + 'px';
		img.style.height = height + 'px';
		bgImg.style.top = top + 'px';
		bgImg.style.left = left + 'px';
		bgImg.style.height = height + 'px';
		if(i === 1) left += 290;
		else if(i === 2) left += 170;
		else left += leftChange;

		// 이미지 설정
		if (i === 2) {
			img.src = './images/' + imgName + '_' + gameManager.bunmo + '_0.png';
		} else if (i === 3) {
			img.style.cursor = 'pointer';
			img.src = './images/plusBtn.png';
			img.addEventListener(gameManager.eventSelector.upEvent, plusClick, false);
		}
		else {
			img.src = './images/' + imgName + '_' + gameManager.bunmo + '_' + gameManager.QUIZ_OPTION[i][1] + '.png';
		}
		bgImg.src = './images/blank.png';
	}
}

function drawSymbols() {
	var top = 240,
		left = gameManager.size.imgLeft + 200,
		leftChange = gameManager.size.imgHeight + 135,
		symbol_height = gameManager.size.symbolHeight;

	for (var i = 0; i < 2; i++) {
		var symbol = createElement('div', canvas, 'symbol_' + i),
			txt = '';

		symbol.style.top = top + 'px';
		symbol.style.left = left + 'px';

		if (i === 0) txt = gameManager.QUIZ_OPTION[2];
		else txt = '=';

		replaceSymbol(txt, symbol);

		var symbol_img = symbol.querySelector('img');

		symbol_img.style.width = symbol_height + 'px';
		symbol_img.style.height = symbol_height + 'px';
		symbol_img.src = symbol_img.src.replace('.png', '_blue.png');

		left += leftChange;
	}
}

function drawArrow() {
	var arrow = createElement('div', canvas, 'arrow');

	arrow.style.top = gameManager.arrPos[0][1] + 'px';
	arrow.style.left = gameManager.arrPos[0][0] + 'px';
	arrow.style.backgroundImage = 'url(./images/arrow.png)';

	arrow.addEventListener(gameManager.eventSelector.upEvent, arrClick, false);
}

function plusClick() {
	streamSound.setSound('./media/dragFigure.mp3');

	gameManager.plusOpened = true;

	this.style.cursor = 'default';
	this.src = './images/' + gameManager.randomImg + '_' + gameManager.bunmo + '_0.png';

	changeAnswer();
	changeArr();

	this.removeEventListener(gameManager.eventSelector.upEvent, plusClick, false);

	console.log('gameManager.dabCount:', gameManager.dabCount, 'gameManager.plusOpened:', gameManager.plusOpened);
}

function arrClick() {
	streamSound.setSound('./media/dragFigure.mp3');

	if (!gameManager.plusOpened && gameManager.dabCount === gameManager.bunmo) {
		gameManager.dabCount = 0;

	} else if (gameManager.plusOpened && gameManager.dabCount === gameManager.bunmo * 2) {
		gameManager.plusOpened = false;
		gameManager.dabCount = gameManager.bunmo;
		initPlus();

	} else {
		gameManager.dabCount++;
	}

	changeAnswer();
	changeArr();

	console.log('gameManager.dabCount:', gameManager.dabCount, 'gameManager.plusOpened:', gameManager.plusOpened);
}

function changeAnswer() {
	var answer1 = QS('.img_2'),
		answer2 = QS('.img_3');

	if (gameManager.plusOpened && gameManager.dabCount >= gameManager.bunmo) {
		answer1.src = './images/' + gameManager.randomImg + '_' + gameManager.bunmo + '_' + gameManager.bunmo + '.png';
		answer2.src = './images/' + gameManager.randomImg + '_' + gameManager.bunmo + '_' + (gameManager.dabCount - gameManager.bunmo) + '.png';

	} else {
		answer1.src = './images/' + gameManager.randomImg + '_' + gameManager.bunmo + '_' + gameManager.dabCount + '.png';
	}

}

function changeArr() {
	var arrow = QS('.arrow');

	if (gameManager.plusOpened && gameManager.dabCount >= gameManager.bunmo) {
		arrow.style.top = gameManager.arrPos[gameManager.dabCount % gameManager.bunmo][1] + 'px';
		arrow.style.left = gameManager.arrPos[gameManager.dabCount % gameManager.bunmo][0] + 175 + 'px';

	} else if (!gameManager.plusOpened && gameManager.dabCount === gameManager.bunmo) {
		arrow.style.top = gameManager.arrPos[gameManager.bunmo - 1][1] + 'px';
		arrow.style.left = gameManager.arrPos[gameManager.bunmo - 1][0] + 'px';

	} else {
		arrow.style.top = gameManager.arrPos[gameManager.dabCount][1] + 'px';
		arrow.style.left = gameManager.arrPos[gameManager.dabCount][0] + 'px';
	}
}

function initPlus() {
	var plus = QS('.img_3');

	plus.style.cursor = 'pointer';
	plus.src = './images/plusBtn.png';
	plus.addEventListener(gameManager.eventSelector.upEvent, plusClick, false);
}

function drawCheckBtn() {
	var checkBtnContainer = createElement('div', canvas, 'checkBtnContainer'),
		checkBtn_on = createElement('div', checkBtnContainer, 'checkBtn_on'),
		checkBtn = createElement('div', checkBtnContainer, 'checkBtn');

	checkBtnContainer.style.top = gameManager.size.imgTop + gameManager.size.imgHeight / 2 - 50 + 'px';
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
	console.log('여기다', gameManager.dabCount, gameManager.QUIZ_ANSWER[0][0], gameManager.QUIZ_ANSWER[0][2], gameManager.QUIZ_ANSWER[0][1])
	console.log('여기다', gameManager.QUIZ_ANSWER[0][0] * gameManager.QUIZ_ANSWER[0][2] + gameManager.QUIZ_ANSWER[0][1])
	if (gameManager.dabCount === gameManager.QUIZ_ANSWER[0][0] * gameManager.QUIZ_ANSWER[0][2] + gameManager.QUIZ_ANSWER[0][1]) {
		gameOver();

	} else {
		setTimeout(function(){
			target.classList.remove('on');
		}, 100);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}

function drawPopup() {
	var popup = createElement('div', canvas, 'popup')
		text = gameManager.QUIZ_OPTION[3].split(' ');

	for (var i = 0; i < text.length; i++) {
		var span = createElement('span', popup),
			txt = text[i];
		if (txt.indexOf(']') <= 0) {
			if (txt == '+' || txt == '-' || txt == '/' || txt == '*' || txt == '=') {
				replaceSymbol(txt, span);

				span.querySelector('img').setAttribute('style', 'position: relative; width: auto; height: 30px; margin-top: 10px;');
			} else {
				span.innerHTML = txt;
			}
		} else {
			makeBunsu(txt, span);
		}
		span.style.display = 'inline-block';
		span.style.margin = '0 10px';
	}
}

function gameOver(dragObj) {
	streamSound.setSound('../../media/correct.mp3');
	canvas.style.pointerEvents = "none";
	QS('.arrow').style.display = 'none';
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

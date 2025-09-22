var canvas = QS('#bgCanvas');

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	gameManager.size.top = 250;
	gameManager.size.left = 116;
	gameManager.size.leftChange = 338;
	gameManager.size.height = 380;
	gameManager.size.width = 317;

	drawTitle();
	drawDropArea();
	drawCards();
	drawCheckBtn();
}

function drawTitle() {
	var titleDiv = createElement('div', canvas, 'title');
	titleDiv.innerHTML = gameManager.QUIZ_OPTION[0];
}

function drawDropArea() {
	var dropArea = createElement('div', canvas, 'dropArea_0'),
		top = gameManager.size.top,
		left = gameManager.size.left,
		width = gameManager.size.width + gameManager.size.leftChange * 2,
		height = gameManager.size.height;

	dropArea.style.top = top + 'px';
	dropArea.style.left = left + 'px';
	dropArea.style.width = width + 'px';
	dropArea.style.height = height + 'px';

	gameManager.dropArea.push(dropArea);
}

function drawCards() {
	var top = gameManager.size.top,
		left = gameManager.size.left,
		leftChange = gameManager.size.leftChange,
		width = gameManager.size.width,
		height = gameManager.size.height;

	for (var i = 0; i < 3; i++) {
		var dragObj = createElement('div', canvas, 'dragObj dragObj_' + i),
			img = createElement('img', dragObj),
			imgName = convertImgName(gameManager.QUIZ_OPTION[1 + i * 2]),
			imgSrc = './images/' + imgName + '.png',
			imgTop = 0,
			price = createElement('div', dragObj, 'price'),
			priceTxt = gameManager.QUIZ_OPTION[2 + i * 2];

		// img 위치 수정할 경우 case 추가
		switch(gameManager.QUIZ_OPTION[1 + i * 2]) {
			case '책장': imgTop = 30; break;
			case 'TV': imgTop = 35; break;
			default: imgTop = 50; break;
		}

		img.src = imgSrc;
		img.style.top = imgTop + 'px';
		price.innerHTML = '<span>&#8361</span>' + insertComma(priceTxt);

		dragObj.style.top = top + 'px';
		dragObj.style.left = left + 'px';
		dragObj.style.width = width + 'px';
		dragObj.style.height = height + 'px';
		dragObj.style.backgroundImage = 'url(./images/card_' + (i + 1) + '.png)';

		dragObj.setAttribute('answervalue', i + 1);

		gameManager.dropObjArray.push(dragObj);
		gameManager.dropObjPos.push([top, left]);

		left += leftChange;

		new Dragdrop(dragObj);
	}
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

function boundingCircle(dragObj, x, y) { console.log(gameManager.dropObjArray);
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
	var checkBtn = QS('.checkBtn'),
		checkBtn_on = QS('.checkBtn_on'),
		objsAnswer = '',
		answer = '';

	for (var i = 0; i < gameManager.dropObjArray.length; i++) {
		objsAnswer += gameManager.dropObjArray[i].getAttribute('answervalue');
	}

	for (var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
		answer += gameManager.QUIZ_ANSWER[i];
	}

	console.log('objsAnswer:', objsAnswer, 'answer:', answer);

	if(objsAnswer === answer){
		gameOver();
		streamSound.setSound('../../media/correct.mp3');
	} else {
		setTimeout(function(){
			QS('.checkBtnContainer').classList.remove('on');
		}, 100);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}

}

function gameOver() {
	canvas.style.pointerEvents = "none";

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

function insertComma(text) {
	text = text.toString();
	var output = '';

	do {
		if(text.length % 3 != 0) {
			output += text.slice(0, text.length % 3) + ',';
			text = text.slice(text.length % 3, text.length);
		} else {
			output += text.slice(0, 3) + ',';
			text = text.slice(3, text.length);
		}
	} while (text.length >= 4)

	output += text;

	return output;
}

function convertImgName (input) {
	switch (input) {
		case '냉장고': return 'fridge'; break;
		case 'TV': return 'tv'; break;
		case '노트북': return 'noteBook'; break;
		case '책장': return 'bookshelf'; break;
		case '책상': return 'desk'; break;
		case '의자': return 'chair'; break;
		case '자전거': return 'bicycle'; break;
		case '오토바이': return 'bike'; break;
		case '자동차': return 'car'; break;
		case '비행기': return 'plane'; break;
		case '배': return 'ship'; break;
		case '바늘시계': return 'clock'; break;
		case '전자시계': return 'digitalClock'; break;
		case '손목시계': return 'watch'; break;
	}
}

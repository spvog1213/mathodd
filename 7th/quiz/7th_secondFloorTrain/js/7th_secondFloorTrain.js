var canvas = QS('#bgCanvas');

function initScene() {
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	switch (gameManager.QUIZ_OPTION.length) {
		case 8: gameManager.trainLength = 4; break;
		case 7: gameManager.trainLength = 3; break;
		case 6: gameManager.trainLength = 2; break;
	}

	gameManager.trainNo = Math.floor(Math.random() * 3) + 1; // console.log('gameManager.trainNo:', gameManager.trainNo);

	drawTrain();
	drawDragObjs();
}

function drawTrain() {
	var trainContainer = createElement('div', canvas, 'trainContainer'),
		img = createElement('img', trainContainer),
		top = 4, left = 13, leftChange = 214, width = 176, height = 77,
		trainTop = 30, trainLeft = 40, trainWidth = 1080, trainHeight = 380,
		idx = 0;

	img.src = './images/secondFloorTrain_' + gameManager.trainNo + '.png';

	img.style.position = 'absolute';
	img.style.top = top + 'px';

	switch (gameManager.trainNo) {
		case 1: top = 275; left = 27; leftChange = 216; break;
		case 2: top = 257; left = 16; leftChange = 213; break;
		case 3: top = 271; left = 18; leftChange = 214; break;
	}

	for (var i = 0; i < gameManager.QUIZ_OPTION.length - 3; i++) {
		var numBox = createElement('div', trainContainer);

		if(i != 0) {
			numBox.style.top = top + 'px';
			numBox.style.left = left + 'px';
			numBox.style.width = width + 'px';
			numBox.style.height = height + 'px';
			left += leftChange;
		}

		if(i === gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1]) {
			numBox.className = 'dropArea_0';
			numBox.setAttribute('answervalue', gameManager.QUIZ_ANSWER[0]);

			numBox.style.background = 'url(./images/questionBox.png) no-repeat';
			gameManager.dropArea.push(numBox);
		} else {
			var textDiv = createElement('div', numBox, 'text'),
				text = gameManager.QUIZ_OPTION[idx];

			if(i === 0) text = insertComma(text);

			numBox.className = 'numBox numBox_' + idx;
			if(gameManager.trainNo === 2) textDiv.classList.add('train_2');
			textDiv.innerHTML = text;
			idx++;
		}
	}

	trainContainer.style.top = trainTop + 'px';
	trainContainer.style.left = trainLeft + 'px';
	trainContainer.style.width = trainWidth + 'px';
	trainContainer.style.height = trainHeight + 'px';
	trainContainer.addEventListener(gameManager.eventSelector.downEvent, trainClick, false);
}

function trainClick() {
	var target = this,
		top = parseInt(target.style.top);

	target.removeEventListener(gameManager.eventSelector.downEvent, trainClick, false);

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			target.style.top = delta * top + 'px';
		}
	});

	setTimeout(function(){
		target.style.top = top + 'px';
		target.addEventListener(gameManager.eventSelector.downEvent, trainClick, false);
	}, 820);
}

function drawDragObjs() {
	var dragObjContainer = createElement('div', canvas, 'dragObjContainer'),
		top = 560,
		left = 265,
		leftChange = 265,
		width = 176,
		height = 77;

	for (var i = 0; i < gameManager.quizObj.length; i++) {

		var dragObj = createElement('div', dragObjContainer, 'dragObj dragObj_' + i ),
			textDiv = createElement('div', dragObj, 'text'),
			text = gameManager.quizObj[i];

		dragObj.setAttribute('answervalue', gameManager.quizObj[i]);
		dragObj.style.top = top + 'px';
		dragObj.style.left = left + 'px';
		dragObj.style.width = width + 'px';
		dragObj.style.height = height + 'px';
		dragObj.style.background = 'url(./images/coachCar_' + gameManager.trainNo + '.png) no-repeat';
		if(gameManager.trainNo === 2) textDiv.classList.add('train_2');

		textDiv.innerHTML = text;

		gameManager.quizPosition.push([top, left]);

		left += leftChange;

		new Dragdrop(dragObj);
	}
}

function gameOver(currentObj) {
	canvas.style.pointerEvents = 'none';

	var trainContainer = QS('.trainContainer');

	trainContainer.appendChild(currentObj);

	console.log(currentObj);

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
		// streamSound.setSound('media/trainStart.mp3');
		gameOverAnimation();
	},200);

	trainMotion();

	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2000);

}

function trainMotion() {
	var trainContainer = QS('.trainContainer'),
		dragObjsText = QSAll('.dragObjContainer .text'),
		currentLeft = 0;

	animate({
		delay : 20,
		duration : 1500,
		delta : makeEaseOut(linear),
		step : function(delta) {
			trainContainer.style.left = (currentLeft + (1300 * delta)) + 'px';
		}
	});

	// for (var i = 0; i < dragObjsText.length; i++) dragObjsText[i].innerHTML = '';

}

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

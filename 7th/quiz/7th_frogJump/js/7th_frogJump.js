function initScene() {
	log('excute initClockTimer!');

	drawLeafs();
	drawFrogs();
	appendSelectQuestion('drag', gameManager.quizObj);

	for(var i in window) {
		if(window[i] !== null)
			console.log(i, ':', window[i]);
	}
}

function drawLeafs() {
	var bgCanvas = QS('#bgCanvas'),
		leafLeft = 40,
		leafLeftChange = 235,
		leafTop = 0,
		imgSrc = '',
		dropAreaIdx = 0;

	for(var i = 0; i < 5; i++) {
		var lotusleaf = createElement('div', bgCanvas, 'lotusleaf'),
			img = createElement('img', lotusleaf),
			imgSrc = './images/lotusleaf.png',
			textDiv = createElement('div', lotusleaf, 'text'),
			text = gameManager.QUIZ_OPTION[i];

		if(i % 2 === 1) leafTop = 90;
		else leafTop = 200;

		if(gameManager.QUIZ_OPTION[i] === '') {
			imgSrc ='./images/lotusleaf_empty.png';
			text = '';
			lotusleaf.setAttribute('class', 'dropArea_' + dropAreaIdx);
			lotusleaf.setAttribute('answervalue', gameManager.QUIZ_ANSWER);
			gameManager.dropArea.push(lotusleaf);
			dropAreaIdx++;
		}

		lotusleaf.style.top = leafTop + 'px';
		lotusleaf.style.left = leafLeft + 'px';
		img.src = imgSrc;

		if(typeof text == 'object') makeBunsu(text.toString(), textDiv);
		else textDiv.innerHTML = text;

		leafLeft += leafLeftChange;

	}
}

function drawFrogs() {
	var bgCanvas = QS('#bgCanvas'),
		endFrog = createElement('img', bgCanvas, 'endFrog'),
		touchFrog = createElement('img', bgCanvas, 'touchFrog'),
		failFrog = createElement('img', bgCanvas, 'failFrog');

	gameManager.touched = false;

	endFrog.src = './images/endFrog_0.png';
	touchFrog.src = './images/touchFrog_0.png';

	touchFrog.addEventListener(gameManager.eventSelector.upEvent, function(){
		if(!gameManager.touched) {
			streamSound.setSound('./media/frog_cry.mp3');
			touchFrogMove();
		}
	}, false);
}

function touchFrogMove() {
	var touchFrog = QS('.touchFrog'),
		endFrog = QS('.endFrog'),
		imgIdx = 0;

	setTimeout(function(){
		endFrog.classList.add('off');
		// streamSound.setSound('./media/frog_cry.mp3');
	}, 150);

	var intervalTouchFrog = setInterval(function() {
		gameManager.touched = true;
		imgIdx++;
		if(imgIdx === 4) {
			gameManager.touched = false;
			imgIdx = 0;
			clearInterval(intervalTouchFrog);
			intervalTouchFrog = 0;
			endFrog.classList.remove('off');
		}
		touchFrog.src = './images/touchFrog_' + imgIdx + '.png';
	}, 150);
}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = QS('#bgCanvas'),
		quizObjContainer = createElement('div', bgCanvas, 'quizObjContainer'),
		choiceTop = 490,
		choiceLeft = 150,
		choiceLeftChange = 350;

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var dragObj = createElement('div', quizObjContainer, 'dragObj dragObj_' + i ),
			img = createElement('img', dragObj),
			textDiv = createElement('div', dragObj, 'text'),
			text = choiceQuestionArray[i],
			imgSrc = './images/lotusleaf.png';

		dragObj.setAttribute('answerValue', choiceQuestionArray[i]);
		dragObj.style.top = choiceTop + 'px';
		dragObj.style.left = choiceLeft + 'px';

		img.src = imgSrc;

		if(typeof text == 'object') makeBunsu(text.toString(), textDiv);
		else textDiv.innerHTML = text;

		gameManager.quizPosition.push([choiceTop, choiceLeft]);

		choiceLeft += choiceLeftChange;

		new Dragdrop(dragObj);
	}
}

function boundingCircle(dragObj, x, y) {
	var idx = dragObj.className.split('_')[1];
	var dragObjValue = dragObj.getAttribute('answerValue');
	if (dropCompare(dragObj, x, y)) {
		log('bounding!');
		gameManager.dabCount++;
		correctPosition(dragObj);

		if (gameManager.dabCount == gameManager.QUIZ_ANSWER.length) {
			log('@ correct!!');
			gameOver(dragObj);
			streamSound.setSound('./media/frog_end.mp3');
		}

		boundingCounter = true;
	} else {
		log('>>>>> not bounding!');
		incorrectAnimation(dragObj);
		if(!gameManager.touched) failFrogMotion();
		logCounter.tryCounter();
		streamSound.setSound('../../media/incorrect.mp3');
	}
}

function dropCompare(dragObj, x, y) {
	var dragObjValue = dragObj.getAttribute('answervalue');

	for (var i = 0; i < gameManager.dropArea.length; i++) {

		var dropValue = gameManager.dropArea[i].getAttribute('answervalue');
		// dropValue = dropValue.split(',');

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth + 10) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight + 10) * gameManager.zoomRate)) {

			if (dragObjValue == dropValue) {
				gameManager.dropIdx = i;
				return true;
			}
			return false;
		}
	}
}

function gameOver(currentObj) {
	var dragObjs = QSAll('.dragObj');
	for (var i = 0; i < dragObjs.length; i++) dragObjs[i].style.pointerEvents = "none";

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
		gameOverAnimation();
	}, 200);

	frogMotion();

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

function failFrogMotion() {
	var failFrog = QS('.failFrog'),
		endFrog = QS('.endFrog'),
		imgIdx = 0,
		intervalFailFrog = 0;

	setTimeout(function(){
		endFrog.classList.add('off');
	}, 250);

	var intervalFailFrog = setInterval(function() {
		gameManager.touched = true;
		imgIdx++;
		if(imgIdx === 3) {
			gameManager.touched = false;
			imgIdx = 0;
			clearInterval(intervalFailFrog);
			intervalFailFrog = 0;
			endFrog.classList.remove('off');
		}
		failFrog.src = './images/failFrog_' + imgIdx + '.png';
	}, 250);

}

function frogMotion() {
	var endFrog = QS('.endFrog'),
		endFrogSrc = endFrog.src,
		imgIdx = 0,
		intervalEndFrog = '';

	gameManager.touched = true;
	QS('.touchFrog').style.cursor = 'default';

	intervalEndFrog = setInterval(function() {
		if(imgIdx === 20) clearInterval(intervalEndFrog);

		endFrogSrc = './images/endFrog_' + imgIdx + '.png';
		endFrog.src = endFrogSrc;
		imgIdx++;
	}, 120);

}

// 분수 만드는 함수
function makeBunsu(text, targetElement){
	var bunsuArray = [],
		bunsuTxt = [],
		beforeTxt = '',
		afterTxt = '';

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

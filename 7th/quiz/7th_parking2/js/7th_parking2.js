function initScene() {
	log('initScene...');
	log(gameManager.TOTAL_ANSWER_ARRAY);
	log(gameManager.CURRENT_ANSWER);

	// 버스 숫자 판단
	gameManager.busCount = 0;
	switch(gameManager.TOTAL_ANSWER_ARRAY.length) {
		case 5:
			gameManager.busCount = 1;
			break;
		case 6:
			gameManager.busCount = 2;
			break;
		case 7:
			gameManager.busCount = 3;
			break;
	}

	makeRandomArray(1, 3);

	gameManager.choiceQuestion = [];
	for(var i = 1; i < gameManager.CURRENT_ANSWER.length + 1; i++) {
		gameManager.choiceQuestion.push(gameManager.TOTAL_ANSWER_ARRAY[i]);
	}

	var bgCanvas = QS('#bgCanvas');

	// 제목 그리기
	var titleBox = createElement('div', bgCanvas, 'titleBox'),
		titleTop = createElement('div', titleBox, 'titleTop'),
		titleMid = createElement('div', titleBox, 'titleMiddle'),
		titleBot = createElement('div', titleBox, 'titleBottom'),
		marginTop = 0;

	switch(gameManager.busCount) {
		case 3:
			marginTop = -60;
			break;
		case 2:
			marginTop = -40;
			break;
		default:
			marginTop = -40;
			break;
	}
	titleBox.style.marginTop = marginTop + 'px';
	titleMid.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];


	// 주차장 숫자 그리기
	var questionLeft = 581,
		questionTop = 130
		questionTopChange = 190,
		answerValue = 1;

	for(var i = gameManager.TOTAL_ANSWER_ARRAY.length - 3; i < gameManager.TOTAL_ANSWER_ARRAY.length; i++ ) {
		var question = createElement('div', bgCanvas, 'circle question'),
			questionLeft = 581,
			txt = gameManager.TOTAL_ANSWER_ARRAY[i];
		question.style.top = questionTop + 'px';
		question.style.left = questionLeft + 'px';

		// 텍스트 넣기
		if(typeof txt === 'number') question.innerHTML = txt;
		else {
			var txtArray = txt.split(' ');
			if(txtArray.length !== 1) {
				for(var j = 0; j < txtArray.length; j++) {
					var thisTxt = txtArray[j];
					txt = '';
					if(thisTxt.indexOf(']')> -1) {
						makeBunsu(thisTxt, question);
					} else if(findReplaceSymbol(thisTxt)) {
						replaceSymbol(thisTxt, question);

						var img = question.querySelector('img'),
							imgSrc = img.src,
							imgSrc = imgSrc.slice(0, -4),
							imgSrc = imgSrc + '_white.png';

						img.src = imgSrc;
						img.style.width = '40px';
						img.style.height = '40px';
						img.style.margin = '0 10px';
					} else {
						var span = createElement('span', question);
						span.innerHTML = thisTxt;
					}
				}
			} else {
				if(txt.indexOf(']')> -1) makeBunsu(txt, question);
				else question.innerHTML = txt;
			}
		}

		question.setAttribute('answerValue', answerValue);
		questionTop += questionTopChange;
		answerValue++;
	}

	appendChoiceQuestion('drag', gameManager.choiceQuestion); // 버스 그리기

	log('excute initClockTimer!');
}

// randomArray 만들기
function makeRandomArray(min, length) {
	if(!min || !length) return;
	gameManager.randomArray = [];
	var randomNumber = 0,
		inspector = '';

	do {
		randomNumber = Math.floor(Math.random() * length) + min;
		if(inspector.indexOf(randomNumber) < 0) gameManager.randomArray.push(randomNumber);
		inspector += randomNumber.toString();
	} while (gameManager.randomArray.length !== length);

	return gameManager.randomArray;
}

function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = QS('#bgCanvas'),
		choiceQuestionContainer = createElement('div', bgCanvas, 'choiceQuestionContainer'),
		choiceLeft = 73;

	switch(gameManager.busCount) {
		case 3:
			var choiceTop = 190,
				choiceTopChange = 190;
			break;
		case 2:
			var choiceTop = 280,
				choiceTopChange = 220;
			break;
		default:
			var choiceTop = 310,
				choiceTopChange = 0;
			break;
	}

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var choiceQuestion = createElement('div', choiceQuestionContainer, 'circle');

		choiceQuestion.setAttribute('id', 'choiceQuestion_' + i);
		choiceQuestion.setAttribute('answerValue', gameManager.CURRENT_ANSWER[i]);
		choiceQuestion.style.top = choiceTop + 'px';
		choiceQuestion.style.left = choiceLeft + 'px';

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);

		choiceTop += choiceTopChange;

		var busImgSrc = './images/parking_bus_' + gameManager.randomArray.pop() + '.png',
			img = createElement('img', choiceQuestion, 'busImg'),
			text = createElement('div', choiceQuestion, 'busTxt');

		img.src = busImgSrc;

		var txt = gameManager.choiceQuestion[i];

		// 텍스트 넣기
		if (typeof txt !== 'number') {
			var txtArray = txt.split(' ');
			for (var j = 0; j < txtArray.length; j++) {
				var thisTxt = txtArray[j]; console.log(thisTxt);
				// txt = '';
				if(findReplaceSymbol(thisTxt)) {
					replaceSymbol(thisTxt, text);

					var img = choiceQuestion.querySelector('.busTxt img');

					// img.style.width = '30px';
					// img.style.height = '30px';
					img.style.margin = '0 10px';
				} else {
					var span = createElement('span', text);
					span.innerHTML = thisTxt;
				}
			}
		} else {
			text.innerHTML = txt;
		}


		// text.innerHTML = gameManager.choiceQuestion[i];

		if (buttonType === 'drag') {
			new Dragdrop(choiceQuestion);
		} else {
			choiceQuestion.addEventListener('click', function() {
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}

var dapCount = 0;
function boundingCircle(dragObj, x, y) {
	var answerObj;
	var questions = QSAll('.question'),
		dragObjVal = dragObj.getAttribute('answervalue'); console.log('dragObjVal',dragObjVal);
		// adjustPosition = 100;

	for(var i = 0; i < questions.length; i++) {
		var ansVal = questions[i].getAttribute('answervalue');
		if(ansVal == dragObjVal) answerObj = questions[i];
	}

	if (comparePosition(x, y, answerObj)) {
		log('bounding!');
		streamSound.setSound('media/carsound.mp3');

		var top = answerObj.offsetTop,
			left = answerObj.offsetLeft,
			adjustLeft = 0,
			adjustTop = -50;

		dragObj.style.top = top + adjustTop + 'px';
		dragObj.style.left = left + adjustLeft + 'px';
		dragObj.style.pointerEvents = "none";

		compareAnswer(dragObj);

		var dragObjchoiceQuestionLeft = parseInt(dragObj.style.left),
			left = 170;

		setTimeout(function() {
			animate({
				duration : 1000,
				delta : makeEaseInOut(quad),
				step : function(delta) {
					dragObj.style.left = ((left * delta) + dragObjchoiceQuestionLeft) + 'px';
				}
			});
		}, 500);

		dapCount++;

		boundingCounter = true;

		if(dapCount === gameManager.CURRENT_ANSWER.length) gameOver();

	} else {

		log('not bounding!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');

	}

}

function comparePosition(x, y, answerObj) {
	var minX = parseInt(answerObj.offsetLeft * gameManager.zoomRate),
		maxX = minX + parseInt(answerObj.clientWidth * gameManager.zoomRate),
		minY = parseInt(answerObj.offsetTop * gameManager.zoomRate),
		maxY = minY + parseInt(answerObj.clientHeight * gameManager.zoomRate);
	// console.log('x',x,'y',y);
	// console.log('minX', minX, 'maxX', maxX, 'minY', minY, 'maxY', maxY);
	return minX + 200 < x && x < maxX + 500 && minY - 100 < y && y < maxY + 50;
}

function compareAnswer(dragObj) {}

function gameOver(dragObj, x, y) {

	clearInterval(countTimer);
	gameOverAnimation();
	logCounter.tryCounter();
	logCounter.endTime();

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

function incorrectAnimation(dragObj) {
	var dragObjId = dragObj.id;
	dragObjId = dragObjId.split('_');

	var left = gameManager.choiceQuestionPosition[dragObjId[1]][1],
	    currentLeft = parseInt(dragObj.style.left.replace('px', ''));

	logCounter.tryCounter();
	if (gameManager.CURRENT_TYPE === 'click' || gameManager.CURRENT_TYPE === 'train')
		currentLeft = 100;
	streamSound.setSound('../../media/incorrect.mp3');

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
			dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
		}
	});
}

function makeBunsu(text, targetElement){
	var bunsuArray = [],
		bunsuTxt = [],
		beforeTxt = '',
		afterTxt = '';

	if(text.indexOf(']') > -1) {
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
			text = afterTxt; // console.log(text);
		}
	} else {
		bunsuArray = text.split(',');
		drawBunsu(bunsuArray, targetElement);
		text = afterTxt;
	}

	if(afterTxt != '') {
		var aText = createElement('span', targetElement);
		aText.innerHTML = afterTxt;
	}
}

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
			resultArray = [bunsuTxt, afterTxt, beforeTxt]; // console.log('resultArray: ',resultArray);
	}
	return resultArray;
}

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
}

function findReplaceSymbol(text) {
	if(text.indexOf('+') > -1 || text.indexOf('-') > -1 || text.indexOf('*') > -1 || text.indexOf('/') > -1 || text.indexOf('=') > -1 || text.indexOf('...') > -1 || text.indexOf('divBox') > -1 || text.indexOf('invisibleBox') > -1) {
		return true;
	} else return false;
}

function initScene() {

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		trainRail = createElement('div', bgCanvas, 'trainRail');

	for (var i = 0; i < 2; i++) {
		trainText = createElement('div', bgCanvas, 'arrow arrow_' + i),
		text = createElement('div', trainText, 'text');

		if (gameManager.QUIZ_OPTION[i].indexOf(']') > -1) {
			makeBunsu(gameManager.QUIZ_OPTION[i], text);
		}
		else {
			var aText = createElement('span', text);
			aText.innerHTML = gameManager.QUIZ_OPTION[i];
		}
		if (i === 0) text.style.bottom = 40 + 'px';
		else text.style.top = 50 + 'px';
	}

	trainTextRail = createElement('div', bgCanvas, 'trainTextRail');
	trainImg = createElement('div', bgCanvas, 'trainImg');
	trainImg.setAttribute('style', ' width: 862px; height: 240px; position: absolute; top: 110px; left: -560px; z-index: 100');

	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
		var dropArea = createElement('div', bgCanvas, 'dropArea_' + i);
		var answerValue = gameManager.QUIZ_ANSWER[i];

		dropArea.style.left = 414 + (315 * i) + 'px';
		dropArea.style.top = '292px';
		dropArea.setAttribute('answerValue', answerValue);
		gameManager.dropArea.push(dropArea);
	}

	dropArea.setAttribute('style', 'top:292px; left: 728px;');
	appendSelectQuestion('drag', gameManager.quizObj);
	trainImgArray();

}

function trainImgArray() {
	var x = Math.floor((Math.random() * 3) +1),
		trainImg = document.querySelector('.trainImg');

	trainImg.style.background = 'url(images/connectTrain_train_' + x + '.png)';
}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    quizObjContainer = createElement('div', bgCanvas, 'quizObjContainer'),
	    line = document.createElement('div'),
	    choiceTop = 480,
	    choiceLeft = 60;

	switch (gameManager.quizObj.length) {
	case 1 :
		choiceLeft = 240;
		break;
	case 2 :
		choiceLeft = 312;
		break;
	case 3 :
		choiceLeft = -245;
		break;
	case 4 :
		choiceLeft = -50;
		break;
	case 5 :
		choiceLeft = -150;
		break;
	}

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var dragObj = createElement('div', quizObjContainer, 'dragObj dragObj_' + i ),
			text = createElement('div', dragObj, 'text');

		if (gameManager.quizObj[i].indexOf(']') > -1) {
			makeBunsu(gameManager.quizObj[i], text);
		}
		else {
			var aText = createElement('span', text);
			aText.innerHTML = gameManager.quizObj[i];
		}

		text.style.top = 70 + 'px';

		choiceLeft = choiceLeft + 350;

		dragObj.setAttribute('style', 'left: ' + choiceLeft + 'px; Top: 520px;');

		// bunsu
		// if(typeof gameManager.quizObj[i] !== 'object') trainText.innerHTML = gameManager.quizObj[i] + 'm';

		// else {
		// 	var bunsuString = gameManager.quizObj[i].toString();
		//
		// 	makeBunsu(bunsuString, dragObj);
		//
		// 	var m = createElement('span', dragObj, 'm');
		// 	m.innerHTML = 'm';
		// }

		dragObj.setAttribute('answerValue', gameManager.quizObj[i]);

		gameManager.quizPosition.push([520, choiceLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(dragObj);
		} else {
			dragObj.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}


function gameOver(currentObj) {

	var quizObjContainer = document.querySelector('.quizObjContainer').childNodes;

	for (var i = 0; i < quizObjContainer.length; i++) {
		quizObjContainer[i].style.pointerEvents = "none";
	}

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
		// streamSound.setSound('media/trainStart.mp3');
		gameOverAnimation();
	},200);

	var currentObj = currentObj;
	trainMotion(currentObj);

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

function trainMotion(currentObj) {
	var trainImg = document.querySelector(".trainImg");
	var currentLeft = parseInt(trainImg.style.left.replace('px', ''));
	animate({
		delay : 20,
		duration : 1000,
		delta : makeEaseOut(linear),
		step : function(delta) {
				trainImg.style.left = (currentLeft + (1300 * delta)) + 'px';
		}
	});

	var arrows = QSAll('.arrow');
	for (var i = 0; i < arrows.length; i++) arrows[i].style.display = 'none';
	currentObj.querySelector('.text').style.display = 'none';
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
			return false;
		}
	}
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
			text = afterTxt; // console.log(text);
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

	if(bunsuArray[0] != 0) int.innerHTML = bunsuArray[0];

	bunja.innerHTML = bunsuArray[1];
	bunmo.innerHTML = bunsuArray[2];

	bunsuDiv.style.cssText = 'display: inline-block; vertical-align: middle';
	int.style.cssText = 'display: inline-block; margin-right: 5px; vertical-align: middle';
	prop.style.cssText = 'position: relative; display: inline-block; line-height: 1.25em; vertical-align: middle';
	bunja.style.cssText = 'display: block; vertical-align: middle';
	bunmo.style.cssText = 'display: block; vertical-align: middle';
	midLine.style.cssText = 'position: absolute; top: 50%; left: 0; width: 100%; height: 0; margin-top: -0.05em; border-top: 0.1em solid #000';
}

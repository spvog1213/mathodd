var intX = Math.floor(Math.random() * 4);
function initScene() {
	var bgCanvas = document.querySelector('#bgCanvas'),
		blackBord = createElement('div', bgCanvas, 'blackBord'),
		pin = createElement('div', bgCanvas, 'pin'),
		setText = createElement('div', bgCanvas, 'setText');

		var setTextArray = gameManager.QUIZ_OPTION[0].split(' ');
		setText.innerHTML = setTextArray[0] + '<span class="setTextInSpan"></span>' + setTextArray[2];

		var setTextInSpan = QS('.setTextInSpan');
		replaceSymbol(setTextArray[1], setTextInSpan);
		setTextInSpan.querySelector('img').setAttribute('style', 'position: relative; top: 1px; width: 30px; height: 30px; margin: 0 5px;');


		setText.style.background = 'url(images/dragBox_'+intX+'.png)';
		blackBord.innerHTML = '<span class="inText">같은 것을 연결하세요.</span>';

		makeRandomArray(0, 4);

	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
		var dropArea = createElement('div', bgCanvas, 'dropArea dropArea_' + i),
			answerValue = gameManager.QUIZ_ANSWER[i];
		console.log('dropArea::>>>>>>>>>>>>>>>>',answerValue)

		dropArea.setAttribute('answerValue', answerValue);
		dropArea.style.top = 306 + (150 * i) + 'px'
		dropArea.style.left = 255 + 'px';
		gameManager.dropArea.push(dropArea);
	}
		appendSelectQuestion('drag');

}

function makeRandomArray(min, length) {
	gameManager.randomArray = [];
	var length = length || 1,
		min = min || 0,
		randomNumber = 0,
		inspector = '';

	do {
		randomNumber = Math.floor(Math.random() * length) + min;
		if(inspector.indexOf(randomNumber) < 0) gameManager.randomArray.push(randomNumber);
		inspector += randomNumber.toString();
	} while (gameManager.randomArray.length !== length);

	return gameManager.randomArray;
}

function gameOver(currentObj) {

	QS('#bgCanvas').style.pointerEvents = 'none';

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');
	},700);

	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);


	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2300);

}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = QS('#bgCanvas'),
	    quizObjContainer = createElement('div', bgCanvas, 'quizObjContainer'),
	    choiceTop = -120;

	for (var j = 0; j < gameManager.QUIZ_OPTION[1].length; j++) {
		var dragObj = createElement('div', quizObjContainer, 'dragObj dragObj_' + j ),
			option = gameManager.QUIZ_OPTION[1][j];

		// intX = Math.floor(Math.random() * 4);
		if(j == 3) choiceTop = -120;
		choiceTop = choiceTop + 200;

		dragObj.setAttribute('style', 'left: 870px; Top:' + choiceTop + 'px;');
		dragObj.style.width = 315 + 'px';
		dragObj.style.height = 177 + 'px';
		if (j > 3) dragObj.style.background = 'url(images/dragBox_' + gameManager.randomArray[j-3] + '.png) no-repeat';
		else dragObj.style.background = 'url(images/dragBox_' + gameManager.randomArray[j] + '.png) no-repeat';
		dragObj.style.backgroundSize = '315px 177px';
		// dragObj.innerHTML = gameManager.QUIZ_OPTION[1][j];
		// dragObj.setAttribute('answerValue', gameManager.QUIZ_OPTION[1][j]);
		console.log('dragObj::>>>>>>>>>>>>>>>>',dragObj.getAttribute('answerValue'))

		// 식인 경우
		if(typeof option === 'string'){
			var optionArray = option.split(' ');
			dragObj.innerHTML = optionArray[0] + '<span class="dragObjsetText"></span>' + optionArray[2];
			dragObj.setAttribute('answerValue', option);

		// 숫자인 경우
		} else if(typeof option === 'number') {
			dragObj.innerHTML = option;
			dragObj.setAttribute('answerValue', option);
		}

		if(j > 2) dragObj.style.visibility = 'hidden';

		gameManager.quizPosition.push([choiceTop, 870]);

		if (buttonType === 'drag') {
			new Dragdrop(dragObj);
		} else {
			dragObj.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');

			}, false);
		}
	}
	var dragObjsetText = QSAll('.dragObjsetText');
	for(var i = 0; i < dragObjsetText.length;  i++){
		replaceSymbol(gameManager.QUIZ_OPTION[0].split(' ')[1], dragObjsetText[i]);
		dragObjsetText[i].querySelector('img').setAttribute('style', 'width: 30px; height: 30px; margin: 0 5px;');
	}

}

function boundingCircle(dragObj, x, y) {

	var idx = dragObj.className.split('_')[1];
	var dragObjValue = dragObj.getAttribute('answerValue');
	if (dropCompare(dragObj, x, y)) {
		console.log('fdragObjValue',dragObjValue)

		log('bounding!');
		var gori = createElement('div', dragObj, 'gori');

		streamSound.setSound(gameManager.soundEffct);

		gameManager.dabCount += 1;
		if(gameManager.dabCount == 1) {
			var drg = QSAll('.dragObj');
			for(var k = 0; k < drg.length; k++){
				if(k < 3){
					drg[k].style.visibility = 'hidden';
				}else if(k > 2){
					drg[k].style.visibility = 'visible';
				}
				dragObj.style.visibility = 'visible';
			}
		}
		correctPosition(dragObj);

		if (gameManager.dabCount == gameManager.QUIZ_ANSWER.length) {
			log('@ correct!!');
			gameOver(dragObj);
		}

		boundingCounter = true;
	} else {
		console.log('fdragObjValue',dragObjValue)
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
			return false;
		}
	}
}

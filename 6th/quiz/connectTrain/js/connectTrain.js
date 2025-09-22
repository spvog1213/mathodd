function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		trainRail = createElement('div', bgCanvas, 'trainRail'),
		trainText = createElement('div', bgCanvas, 'trainText'),
		trainImg = createElement('div', bgCanvas, 'trainImg');

	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
		var dropArea = createElement('div', bgCanvas, 'dropArea_' + i);
		var answerValue = gameManager.QUIZ_ANSWER;

		dropArea.style.left = 414 + (315 * i) + 'px';
		dropArea.style.top = '292px';
		dropArea.setAttribute('answerValue', answerValue.join(','));
		gameManager.dropArea.push(dropArea);
	}

	trainText.innerHTML = gameManager.QUIZ_OPTION[0]
	trainImg.setAttribute('style', ' width: 862px; height: 240px; position: absolute; top: 110px; left: -560px; z-index: 3');

	appendSelectQuestion('drag', gameManager.quizObj);

	trainImgArray();

}

function trainImgArray() {
	var x = Math.floor((Math.random() * 3) +1),
		trainImg = document.querySelector('.trainImg');

	trainImg.style.background = 'url(images/connectTrain_train_' + x + '.png)';
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
		streamSound.setSound('media/trainStart.mp3');
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

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    quizObjContainer = document.createElement('div'),
	    line = document.createElement('div'),
	    choiceTop = 480,
	    choiceLeft = -245;


	quizObjContainer.setAttribute('class', 'quizObjContainer');
	bgCanvas.appendChild(quizObjContainer);
	for (var i = 0; i < gameManager.quizObj.length; i++) {

		var selectObj,
			dragObj = createElement('div', quizObjContainer, 'dragObj_' + i);

		choiceLeft = choiceLeft + 350;

		selectObj = document.querySelector('.dragObj_' + i)
		selectObj.setAttribute('style', 'left: ' + choiceLeft + 'px; Top:560px;');
		selectObj.setAttribute('answerValue', gameManager.quizObj[i]);
		selectObj.innerHTML = gameManager.quizObj[i];


		gameManager.quizPosition.push([560, choiceLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(selectObj);
			//여기를 읽어욤...
		} else {
			selectObj.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}

function trainMotion() {
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

	for(var j = 0; j < gameManager.QUIZ_OPTION.length - 1 ; j++){
		var trainText = document.querySelector('.trainText'),
			dragObj = document.querySelector('.dragObj_' + j);

		trainText.style.visibility = 'hidden';

		for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
			if(dragObj.getAttribute('answervalue') == gameManager.QUIZ_ANSWER[i]){
				dragObj.innerHTML = '';
			}
		}
	}

}

function boundingCircle(dragObj, x, y) {

	var idx = dragObj.className.split('_')[1];
	var dragObjValue = dragObj.getAttribute('answerValue');
	gameManager.dragArray.push(dragObj)

	if (dropCompare(dragObj, x, y)) {

		log('bounding!');

		streamSound.setSound(gameManager.soundEffct);

		gameManager.quizCount += 1;
		correctPosition(dragObj);

		if (gameManager.dabCount == gameManager.QUIZ_ANSWER.length && gameManager.quizCount == gameManager.QUIZ_ANSWER.length ) {
			log('@ correct!!');
			gameOver(dragObj);
		} else if(gameManager.dabCount !== gameManager.QUIZ_ANSWER.length && gameManager.quizCount == gameManager.QUIZ_ANSWER.length) {
			log('>>>>> not bounding!');

			setTimeout(function() {
				for(var i = 0; i < gameManager.dragArray.length; i++){
					incorrectAnimation(gameManager.dragArray[i]);
					gameManager.dragArray[i].style.pointerEvents = 'auto';
				}
				gameManager.dragArray = [];
				gameManager.dabCount = 0;
				gameManager.quizCount = 0;
				streamSound.setSound('../../media/incorrect.mp3');
				logCounter.tryCounter();
			},500);

		}
		// console.log('dragArray : ', dragArray)


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
		dropValue = dropValue.split(',');

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth + 10) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight + 10) * gameManager.zoomRate)) {

			gameManager.dropIdx = i;

			return true;
		}
	}
}

function correctPosition (dragObj) {

	if (gameManager.QUIZ_TYPE == 'connectTrain') {
		dragObj.style.top = (parseInt(gameManager.dropArea[gameManager.dropIdx].style.top.replace('px', ''))) + 'px';
		dragObj.style.left = (parseInt(gameManager.dropArea[0].style.left.replace('px', '')) + (315 * (gameManager.quizCount - 1))) + 'px';

		var dragObjValue = dragObj.getAttribute('answervalue');
		for (var i = 0; i < gameManager.dropArea.length; i++) {

			var dropValue = gameManager.dropArea[i].getAttribute('answervalue');
			dropValue = dropValue.split(',');

			for (var j = 0; j < dropValue.length; j++) {

				if (dragObjValue == dropValue[j]) {
					gameManager.dabCount += 1;
					return true;
				}
			}
		}

	} else {
		dragObj.style.top = (parseInt(gameManager.dropArea[gameManager.dropIdx].style.top.replace('px', ''))) + 'px';
		dragObj.style.left = (parseInt(gameManager.dropArea[gameManager.dropIdx].style.left.replace('px', ''))) + 'px';
	}

	dragObj.style.pointerEvents = 'none';

}
function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	
	var bgCanvas = document.getElementById('bgCanvas');
		createElement('div',document.querySelector('#bgCanvas'),'currentAnswer');
		createElement('div', document.querySelector('#bgCanvas'),'quizContainer');

	var quizText = createElement('span', document.querySelector('.currentAnswer'),'quizText'),
		currentAnswer = document.querySelector('.currentAnswer');

		quizText.innerHTML = '<span>똑같은 모양을 넣으세요.</span>';

	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
		var dropArea = createElement('div', bgCanvas, 'dropArea dropArea_' + i);
		var quizBox = createElement('div', dropArea, 'quizBox quizBox_' + i);
		var answerValue = gameManager.QUIZ_ANSWER[i];


		dropArea.style.left = 317 + (392 * i) + 'px';

		dropArea.style.top = '210px';

		dropArea.style.background = 'url(images/questionBlock_'+ gameManager.quizObj[i][0] + '_' + gameManager.quizObj[i][1] + '_' + gameManager.quizObj[i][2] + '.png) no-repeat';

		dropArea.setAttribute('answerValue', answerValue);
		gameManager.dropArea.push(dropArea);
	}
	appendSelectQuestion('drag', gameManager.dropArea);
}

function gameOver(currentObj) {

	var quizObjContainer = document.querySelector('.quizObjContainer').childNodes;

	for (var i = 0; i < quizObjContainer.length; i++) {
		quizObjContainer[i].style.pointerEvents = "none";
	}

	logCounter.tryCounter();
	logCounter.endTime();
	gameOverAnimation();

	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
	},40);

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
	var bgCanvas = document.getElementById('bgCanvas'),
		quizContainer = QS('.quizContainer'),
	    quizObjContainer = document.createElement('div'),
	    choiceTop = 490,
	    choiceLeft = -175;


	quizObjContainer.setAttribute('class', 'quizObjContainer');
	bgCanvas.appendChild(quizObjContainer);

	for (var i = 0; i < gameManager.dapObj.length; i++) {

		var selectObj,
			dragObj = createElement('div', quizObjContainer, 'dragObj_' + i);

		choiceLeft = choiceLeft + 350;

		selectObj = document.querySelector('.dragObj_' + i)
		selectObj.setAttribute('style', 'width:210px; height:210px; left: ' + choiceLeft + 'px; Top:' + choiceTop + 'px;');
		selectObj.setAttribute('answerValue', i);

		selectObj.style.background =  'url(images/buildBlockImg_'+ gameManager.dapObj[i][0] + '_' + gameManager.dapObj[i][1] + '_' + gameManager.dapObj[i][2] + '.png) no-repeat';


		gameManager.quizPosition.push([choiceTop, choiceLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(selectObj);
		} else {
			selectObj.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);

			}, false);
		}
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
			for (var j = 0; j < dropValue.length; j++) {
				if (dragObjValue == dropValue) {
					gameManager.dropIdx = i;
					return true;
				}
			}
			return false;
		}
	}
}
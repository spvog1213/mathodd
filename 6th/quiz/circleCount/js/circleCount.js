function initScene() {
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		noteBoard = createElement('div', bgCanvas, 'noteBoard')
		circleImg = createElement('div', noteBoard, 'circleImg');
		intX = Math.floor((Math.random() * 3) +1);
 	
 	noteBoard.style.background = 'url(images/circleCount_note_' + intX + '.png) no-repeat'
	circleImg.style.background = 'url(../../images/common/' + gameManager.QUIZ_OPTION[1][0] + '/' + gameManager.QUIZ_OPTION[1][1] + '.png)';

	var circleTextWrap = createElement('div', bgCanvas, 'circleTextWrap'),
	circleText = createElement('div', circleTextWrap, 'circleText');


	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
		var dropArea = createElement('span', bgCanvas, 'dropArea dropArea_' + i);
		var answerValue = gameManager.QUIZ_ANSWER[i];
		dropArea.setAttribute('answerValue', answerValue);
		gameManager.dropArea.push(dropArea);
	}


	if(Array.isArray(gameManager.QUIZ_OPTION[0][0])){
		circleText.innerHTML = "<div class='quizImg'></div>" +gameManager.QUIZ_OPTION[0][1]+ "<div class='drop'></div>" +gameManager.QUIZ_OPTION[0][2];
		circleText.setAttribute('style', 'top:70px; left:80px;')
		var quizImg = QS('.quizImg')
		quizImg.style.background = 'url(../../images/common/' + gameManager.QUIZ_OPTION[0][0][0] + '/' + gameManager.QUIZ_OPTION[0][0][1] + '.png)';
		quizImg.style.backgroundSize = '90px 90px'
	}else{
		circleText.innerHTML = gameManager.QUIZ_OPTION[0][0]+ "<div class='drop'></div>" +gameManager.QUIZ_OPTION[0][1];
		circleText.setAttribute('style', 'top:70px; left:80px;')
	}

	setTimeout(function() {
		var dropAreaTop = QS('.drop').offsetTop + circleText.offsetTop,
			dropAreaLeft = QS('.drop').offsetLeft + circleText.offsetLeft;
		dropArea.setAttribute('style', 'top:' + dropAreaTop + 'px; left:'+ dropAreaLeft +'px;');

	},100);

	appendSelectQuestion('drag', gameManager.quizObj, intX);

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

function appendSelectQuestion(buttonType, choiceQuestionArray, intX) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    quizObjContainer = createElement('div', bgCanvas, 'quizObjContainer'),
	    line = document.createElement('div'),
	    choiceTop = -85;


	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var dragObj = createElement('div', quizObjContainer, 'dragObj dragObj_' + i )

		choiceTop = choiceTop + 150;

		dragObj.setAttribute('style', 'left: 1050px; Top:' + choiceTop + 'px;');
		dragObj.style.background = 'url(images/circleCount_textBox_s_' + intX + '.png) no-repeat'

		dragObj.innerHTML = gameManager.quizObj[i];

		dragObj.setAttribute('answerValue', gameManager.quizObj[i]);

		gameManager.quizPosition.push([choiceTop, 1050]);

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


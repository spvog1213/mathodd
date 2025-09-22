function initScene() {

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		board = createElement('div', bgCanvas, 'board'),
		quizImg = createElement('div', bgCanvas, 'quizImg'),
		rotateLeft;

	quizImg.style.background = 'url(images/flatFigure_' + gameManager.QUIZ_OPTION[0][0] + '_' +  gameManager.QUIZ_OPTION[0][1] + '.png) no-repeat'
	quizImg.style.transform = 'rotate(' + gameManager.QUIZ_OPTION[0][2] + 'deg)';

	if(gameManager.QUIZ_OPTION[0][0] == 5){
		quizImg.style.width = '217px';
		quizImg.style.height = '217px';
	}else{
		quizImg.style.width = '220px';
		quizImg.style.height = '220px';
	}

	if(gameManager.QUIZ_OPTION[1].length == 1){
		rotateLeft = 482;
	}else{
		rotateLeft = 425;
	}
	for(var i = 0; i < gameManager.QUIZ_OPTION[1].length; i++){
		rotate = createElement('div', bgCanvas, 'rotation rotation_' + i);

		rotateLeft = rotateLeft + 100;

		rotate.style.background = 'url(images/rotateFigure_rotateSymbol_' + gameManager.QUIZ_OPTION[1][i] + '.png) no-repeat';
		rotate.style.backgroundSize = 'cover';
		rotate.style.left = rotateLeft + 'px';
		if(i == 0){
			if(gameManager.QUIZ_OPTION[1][0] == 'x'){
				rotate.style.WebkitTransform = 'rotateX(180deg)';
				rotate.style.mozTransform = 'rotateX(180deg)';
				rotate.style.msTransform = 'rotateX(180deg)';
				rotate.style.oTransform = 'rotateX(180deg)';
				rotate.style.transform = 'rotateX(180deg)';
			}else if(gameManager.QUIZ_OPTION[1][0] == 'y'){
				rotate.style.WebkitTransform = 'rotate(90deg)';
				rotate.style.mozTransform = 'rotate(90deg)';
				rotate.style.msTransform = 'rotate(90deg)';
				rotate.style.oTransform = 'rotate(90deg)';
				rotate.style.transform = 'rotate(90deg)';
			}
		}
	}

	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
		var dropArea = createElement('div', bgCanvas, 'dropArea_' + i);
		var answerValue = gameManager.QUIZ_ANSWER[i];

		dropArea.setAttribute('style', 'background: url(images/flatFigure_questionBox_' + gameManager.QUIZ_OPTION[0][0] +'.png)');
		dropArea.setAttribute('answerValue', answerValue);
		gameManager.dropArea.push(dropArea);
			dropArea.style.top = '130px';
			dropArea.style.left = '750px';
	}

	appendSelectQuestion('drag', gameManager.quizObj);

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
	},200);

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
	    quizObjContainer = createElement('div', bgCanvas, 'quizObjContainer'),
	    choiceTop = 460,
	    choiceLeft = -190;

	for (var i = 0; i < gameManager.QUIZ_OPTION.length - 2; i++) {
		console.log(gameManager.quizObj)

		var dragObj = createElement('div', quizObjContainer, 'dragObj dragObj_' + i),
				dragImg = document.createElement("img");

		dragObj.appendChild(dragImg);
		dragImg.setAttribute('src', 'images/flatFigure_' + gameManager.QUIZ_OPTION[0][0] + '_' +  gameManager.QUIZ_OPTION[0][1] + '.png');
		choiceLeft = choiceLeft + 350;

		dragObj.style.width = '220px';
		dragObj.style.height = '220px';
		dragImg.style.width = '220px';
		dragImg.style.height = '220px';

		dragObj.setAttribute('style', ' top: 460px; left: ' + choiceLeft + 'px;');
		dragObj.style.WebkitTransform  = 'rotate(' + gameManager.QUIZ_OPTION[i+2][1] + 'deg)';
		dragObj.style.mozTransform  = 'rotate(' + gameManager.QUIZ_OPTION[i+2][1] + 'deg)';
		dragObj.style.msTransform  = 'rotate(' + gameManager.QUIZ_OPTION[i+2][1] + 'deg)';
		dragObj.style.oTransform = 'rotate(' + gameManager.QUIZ_OPTION[i+2][1] + 'deg)';
		dragObj.style.transform = 'rotate(' + gameManager.QUIZ_OPTION[i+2][1] + 'deg)';

		if(gameManager.QUIZ_OPTION[i+2][0] == 'x' || gameManager.QUIZ_OPTION[i+2][0] == 'y'){
			dragImg.style.WebkitTransform = 'rotate' + gameManager.QUIZ_OPTION[i+2][0] + '(180deg)';
			dragImg.style.mozTransform  = 'rotate' + gameManager.QUIZ_OPTION[i+2][0] + '(180deg)';
			dragImg.style.msTransform = 'rotate' + gameManager.QUIZ_OPTION[i+2][0] + '(180deg)';
			dragImg.style.oTransform = 'rotate' + gameManager.QUIZ_OPTION[i+2][0] + '(180deg)';
			dragImg.style.transform = 'rotate' + gameManager.QUIZ_OPTION[i+2][0] + '(180deg)';
		}
		dragObj.setAttribute('answerValue', i);

		gameManager.quizPosition.push([460, choiceLeft]);

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


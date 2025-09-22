function initScene() {
	// log('initScene...');
	// log(gameManager.QUIZ_OPTION);
	// log(gameManager.QUIZ_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var array = [1,2,3,4,5,6,7,8,9]
	array.sort(function() { return 0.5 - Math.random() });

	var bgCanvas = document.getElementById('bgCanvas'),
		figureTable = createElement('div', bgCanvas, 'figureTable'),
		figureImg = createElement('div', figureTable, 'figureWrap'),
		figureCount = gameManager.QUIZ_ANSWER[0] + gameManager.QUIZ_ANSWER[1];


	figureImg.style.background = 'url(../../images/common/shape/'+gameManager.QUIZ_OPTION[0]+ '.png) no-repeat'
	figureImg.style.backgroundSize = "cover";

	var questionTextLeft = -170
	var questionTextBg = createElement('div', bgCanvas, 'questionTextBg'),
		dragWrap = createElement('div', bgCanvas, 'dragWrap');

	for(var i = 1; i < 3; i++){
		var questionTextWrap = createElement('div', questionTextBg, 'questionTextWrap questionTextWrap_' + (i - 1))
		if(gameManager.QUIZ_OPTION[i][0] == 'text'){
			var questionText = createElement('div', questionTextWrap, 'questionText');
			questionText.innerHTML = gameManager.QUIZ_OPTION[i][1];
			questionTextLeft = questionTextLeft + 204
			questionTextWrap.style.left = questionTextLeft + 'px';
			questionTextWrap.style.verticalAlign = 'middle';

		} else if(gameManager.QUIZ_OPTION[i][0] == 'img'){
			// if(gameManager.QUIZ_OPTION[i].length == 5){
			// questionTextWrap.style.background = 'url(../../images/common/' + gameManager.QUIZ_OPTION[i][1] + '/' + gameManager.QUIZ_OPTION[i][2] + '_' + gameManager.QUIZ_OPTION[i][3] + '.png) no-repeat';

			// }else if(gameManager.QUIZ_OPTION[i][0].length == 6){
			// 	questionTextWrap.style.background = 'url(../../images/common/' + gameManager.QUIZ_OPTION[i][1] + '/' + gameManager.QUIZ_OPTION[i][2] + '_' + gameManager.QUIZ_OPTION[i][3] + '_' + gameManager.QUIZ_OPTION[i][4] +'.png) no-repeat';
			// }

			// questionTextWrap.style.background = 'url(../../images/common/' + gameManager.QUIZ_OPTION[i][1] + '/' + gameManager.QUIZ_OPTION[i][2] + '.png) no-repeat';

			var questionImg = createElement('div', questionTextWrap, 'questionImg'),
				questionText = createElement('div', questionTextWrap, 'questionText');

			questionImg.style.background = 'url(../../images/common/' + gameManager.QUIZ_OPTION[i][1] + '/' + gameManager.QUIZ_OPTION[i][2] + '.png) center center no-repeat';
			questionImg.style.backgroundSize = '90px 90px';
			questionText.innerHTML = gameManager.QUIZ_OPTION[i][3];
			questionTextLeft = questionTextLeft + 204
			questionTextWrap.style.left = questionTextLeft + 'px';
		}
	}

	var dropLeft = 520
		dragWrap = createElement('div', bgCanvas, 'dragWrap')
	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
		var dropArea = createElement('div', bgCanvas, 'dropArea dropArea_' + i),
			blank = document.querySelectorAll('.blank');

		dropLeft = dropLeft + 203

		dropArea.style.top = '170px'
		dropArea.style.left = dropLeft + 'px'

		var answerValue = gameManager.QUIZ_ANSWER[i];
		dropArea.setAttribute('answerValue', answerValue);
		gameManager.dropArea.push(dropArea);
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
	},500);

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
	    quizObjContainer = document.createElement('div'),
	    line = document.createElement('div'),
	    dragContainer = createElement('div', bgCanvas, 'dragContainer'),
	    choiceTop = 300;

	quizObjContainer.setAttribute('class', 'quizObjContainer');
	bgCanvas.appendChild(quizObjContainer);
	for (var i = 0; i < gameManager.quizObj.length; i++) {

		var selectObj,
			dragObj = createElement('div', dragContainer, 'dragObj_' + i),
			X = dragObj.className.split('_')[1];

		if(X % 2 == 1){
	    choiceLeft = 930;
		}else{
			choiceLeft = 725;
		choiceTop = choiceTop + 120;
		}


		selectObj = document.querySelector('.dragObj_' + i)
		selectObj.setAttribute('style', 'left: '+ choiceLeft +'px; Top:' + choiceTop + 'px;');
		selectObj.setAttribute('answerValue', gameManager.quizObj[i]);
		selectObj.innerHTML = gameManager.quizObj[i];
		selectObj.innerHTML

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


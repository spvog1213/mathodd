
function initScene(randomCount) {
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	console.log('sentenceCompleteSceneElement...');
	createElement('div',document.querySelector('#bgCanvas'),'content');
	createElement('div',document.querySelector('.content'),'question');

	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
	  	var dropArea = createElement('div',document.querySelector('#bgCanvas'),'dropArea');
		dropArea.setAttribute('answerValue', gameManager.QUIZ_ANSWER[i]);
  		gameManager.dropArea.push(dropArea);
  	}
	appendQuiz('drag', gameManager.quizText, randomCount);
}


function initObject(randomCount) {

	console.log('sentenceCompleteSceneGetElement...');

	var content = document.querySelector('.content'),
		question = document.querySelector('.question'),
		dropArea = document.querySelector('.dropArea');

	content.setAttribute('style','background:url("images/sentenceComplete_note_'+ randomCount +'.png") no-repeat;');
	question.innerHTML = gameManager.quizConvertNumber[0]+ "<div class='drop'></div>" +gameManager.quizConvertNumber[1];

	var drop = QS('.drop');

	if (gameManager.QUIZ_ANSWER[0].toString().split('').length > 3) {
		drop.style.background = 'url(images/centenceComplete_textBox_q.png) no-repeat';
		drop.style.width = '262px';
	} else {
		drop.style.background = 'url(images/sentenceComplete_textBox_s_q.png) no-repeat';
		drop.style.width = '162px';
	}

	setTimeout(function() {
		dropArea.setAttribute('style','top:'+ drop.offsetTop+"px;"+'left:'+ drop.offsetLeft+'px; width : '+ drop.clientWidth + 'px; height : '+ drop.clientHeight + 'px;');
	}, 100);
}


function appendQuiz(buttonType, quizText, randomCount) {

	var quizObjContainer = document.createElement('div'),
		choiceLeft = ( gameManager.QUIZ_ANSWER[0].toString().split('').length > 3) ? 60 : 200,
		choiceTop = 530;

	quizObjContainer.setAttribute('id', 'quizObjContainer');
	bgCanvas.appendChild(quizObjContainer);

	for (var i = 0; i < quizText.length; i++){

		createElement('div',quizObjContainer,'choiceQuizText_' + i);
		var choiceQuizText = document.querySelector('.choiceQuizText_' + i);

		if (gameManager.QUIZ_ANSWER[0].toString().split('').length > 3) {
			choiceQuizText.setAttribute('style','background:url("images/centenceComplete_textBox_'+randomCount+'.png") no-repeat;'+'top :'+choiceTop+'px; left:' + choiceLeft +'px;');
			choiceQuizText.style.width = '262px';
			choiceQuizText.setAttribute('answerValue', gameManager.quizText[i]);
			choiceQuizText.innerHTML = gameManager.quizText[i];

			gameManager.quizPosition.push([choiceTop, choiceLeft]);
			choiceLeft +=282;
		} else {
			choiceQuizText.setAttribute('style','background:url("images/sentenceComplete_textBox_s_'+randomCount+'.png") no-repeat;'+'top :'+choiceTop+'px; left:' + choiceLeft +'px;');
			choiceQuizText.setAttribute('answerValue', gameManager.quizText[i]);
			choiceQuizText.innerHTML = gameManager.quizText[i];

			gameManager.quizPosition.push([choiceTop, choiceLeft]);
			choiceLeft +=220;
		}


		if (buttonType === 'drag') {
			new Dragdrop(choiceQuizText);
		}
	}

}

function gameOver(dragObj) {

	var quizObjContainer = document.querySelector('#quizObjContainer').childNodes;

	for (var i = 0; i < quizObjContainer.length; i++) {
		quizObjContainer[i].style.pointerEvents = "none";
	}

	document.querySelector('.drop').style.visibility = 'hidden';

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
		gameOverAnimation();
	}, 500);


	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);

}



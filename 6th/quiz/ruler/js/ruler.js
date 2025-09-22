
function initScene() {
	log('initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	createElement('div',document.querySelector('#bgCanvas'),'currentAnswer');
	createElement('div',document.querySelector('#bgCanvas'),'quizContainer');

	var rulerBox = createElement('div',document.querySelector('.quizContainer'),'rulerBox');

	var quizText = createElement('span', document.querySelector('.currentAnswer'),'quizText'),
		 currentAnswer = document.querySelector('.currentAnswer');

	quizText.innerHTML = '<span>' + gameManager.QUIZ_OPTION[0] + '</span><span>의 길이는 <div class="dapArea">?</div> cm 입니다.</span>';

	var dapArea = QS('.dapArea');

	var quizContainer = document.querySelector('.quizContainer'),
		rulerBox = document.querySelector('.rulerBox'),
		objectBox = createElement('div', rulerBox),
		rulerNum1 = createElement('span', objectBox, 'rulerNum1'),
		object = createElement('img', objectBox),
		rulerNum2 = createElement('span', objectBox, 'rulerNum2'),
		name;

	switch (gameManager.quizConvertNumber[0]) {
		case '크레용' :
			name = 'crayon';
			break;
		case '연필' :
			name = 'pencil';
			break;
		case '숟가락' :
			name = 'spoon';
			break;
		case '붓' :
			name = 'brush';
			break;
		case '체리' :
			name = 'cherry';
			break;
		case '포크' :
			name = 'fork';
			break;
	}

	objectBox.style.display = 'inline';

	object.src = './images/' + name + '.png';
	object.id = 'object';

	rulerNum1.innerHTML = gameManager.QUIZ_OPTION[1][0];
	rulerNum1.style.position = 'relative';
	rulerNum1.style.top = '85px';

	if(gameManager.QUIZ_OPTION[1][0] < 9){
		rulerNum1.style.left = '18px';
	}else{
		rulerNum1.style.left = '32px';
	}

	rulerNum2.innerHTML = gameManager.QUIZ_OPTION[1][1];
	rulerNum2.style.position = 'relative';
	rulerNum2.style.top = '85px';

	if(gameManager.QUIZ_OPTION[1][1] < 9){
		rulerNum2.style.right = '18px';
	}else{
		rulerNum2.style.right = '32px';
	}

	appendImageElement('ruler', gameManager.quizImgArray[0][0], rulerBox);

	rulerBox.style.width = '930px';

	appendQuiz('click', gameManager.quizConvertNumber, gameManager.quizImgArray);
}

function appendQuiz(buttonType, quizImgArray, imgSrcArray) {
	var quizObjContainer = document.createElement('div'),
	    choiceLeft = 1035,
	    choiceTop = 75;

    quizObjContainer.setAttribute('id', 'quizObjContainer');
    bgCanvas.appendChild(quizObjContainer);

    for (var i = 0; i < gameManager.quizConvertNumber[2].length; i++) {
    	createElement('div',quizObjContainer,'quizText_' + i);
    	var choiceQuizText = document.querySelector('.quizText_' + i);
    	choiceQuizText.className = 'quizText_'+i;
    	choiceQuizText.setAttribute('style','background:url("images/clickBox.png") no-repeat; top :' + choiceTop +'px; left:' + choiceLeft +'px;');
    	// choiceQuizText.setAttribute('answerValue', gameManager.QUIZ_OPTION[2][i]);
    	choiceQuizText.innerHTML = gameManager.QUIZ_OPTION[2][i];

    	gameManager.quizPosition.push([choiceTop, choiceLeft]);
    	choiceTop +=150;

	 	choiceQuizText.addEventListener('click', function(e) {
	 		e.preventDefault();
	 			console.log(this.innerHTML, gameManager.QUIZ_ANSWER[0])
	 		if(this.innerHTML == gameManager.QUIZ_ANSWER[0]){
	 			appendImageElement('checkImg', gameManager.quizImgArray[1][0], this);
	 			streamSound.setSound('../../media/correct.mp3');
	 			gameOver(choiceQuizText);
	 		}else{
	 			clickCompareAnswer(this);
	 		}

	 	}, false);
	}
}

function gameOver(clickObj) {

	var quizObjContainer = document.querySelector('#quizObjContainer').childNodes;

	for (var i = 0; i < quizObjContainer.length; i++) {
		quizObjContainer[i].style.pointerEvents = "none";
	}

	var dapArea = document.querySelector('.dapArea');
		dapArea.innerHTML = gameManager.QUIZ_ANSWER[0];

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	

	setTimeout(function() {
		gameOverAnimation();
	},50);


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
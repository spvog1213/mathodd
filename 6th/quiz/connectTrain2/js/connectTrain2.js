function initScene() {

	log('excute initClockTimer!');
	// parent.window.initClockTimer();


	var bgCanvas = document.getElementById('bgCanvas'),
		trainRail = createElement('div', bgCanvas, 'trainRail');

	for(var i = 0; i < 2; i++) {
		trainText = createElement('div', bgCanvas, 'trainText trainText_' + i);
		trainText.innerHTML = gameManager.QUIZ_OPTION[i]
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

	dropArea.setAttribute('style', 'top:292px; left: 728px; ');
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

		var dragObj = createElement('div', quizObjContainer, 'dragObj dragObj_' + i )

		choiceLeft = choiceLeft + 350;

		dragObj.setAttribute('style', 'left: ' + choiceLeft + 'px; Top:560px;');

		dragObj.innerHTML = gameManager.quizObj[i];

		dragObj.setAttribute('answerValue', gameManager.quizObj[i]);

		gameManager.quizPosition.push([560, choiceLeft]);

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

	var	trainText_0 = document.querySelector('.trainText_0'),
		trainText_1 = document.querySelector('.trainText_1');

	trainText_0.style.visibility = 'hidden';
	trainText_1.style.visibility = 'hidden';

	for(var j = 0; j < gameManager.QUIZ_OPTION.length -2 ; j++){
		
		var	dragObj = document.querySelector('.dragObj_' + j);

		dragObj.innerHTML = '';
	}

}

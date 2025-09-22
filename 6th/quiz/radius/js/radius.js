function initScene() {
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		circleImg = createElement('div', bgCanvas, 'circleImg'),
		circleBg = createElement('div', circleImg, 'circleBg'),
		radiusLine_0 = createElement('div', bgCanvas, 'radiusLine radiusLine_0'),
		radiusLine_1 = createElement('div', bgCanvas, 'radiusLine radiusLine_1'),
		intX = Math.floor((Math.random() * 5) +1);

	gameManager.ImgRandom.push(intX);

	circleImg.style.background = 'url(images/radius_circle_' + intX + '_success.png)';
	circleBg.style.background = 'url(images/radius_circle_' + intX + '.png)';

	for(var i = 0; i < 2; i++) {
		var circleText = createElement('div', bgCanvas, 'circleText circleText_' + i);
		circleText.innerHTML = gameManager.QUIZ_OPTION[i];
	}
	var circleText_0 = document.querySelector('.circleText_0'),
		circleText_1 = document.querySelector('.circleText_1');


	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
		var dropArea = createElement('div', bgCanvas, 'dropArea dropArea_' + i);
		var answerValue = gameManager.QUIZ_ANSWER[i];
		dropArea.setAttribute('answerValue', answerValue);
		gameManager.dropArea.push(dropArea);
	}
	switch (intX) {
	case 1 :
		circleText_0.style.top = '172px';
		circleText_0.style.left = '390px';
		circleText_1.style.top = '301px';
		circleText_1.style.left = '805px';
		circleText_1.setAttribute('style', 'top:301px; left:805px;');
		dropArea.setAttribute('style', 'top:302px; left:558px;');
		radiusLine_0.setAttribute('style', 'top: 230px; left: 500px; opacity: 0');
		radiusLine_1.setAttribute('style', 'top: 251px; left: 678px; opacity: 0');
		break;
	case 2 :
		circleText_0.setAttribute('style', 'top:309px; left:372px;');
		circleText_1.setAttribute('style', 'top:306px; left:805px;');
		dropArea.setAttribute('style', 'top:302px; left:558px;');
		radiusLine_0.setAttribute('style', 'top: 230px; left: 500px; opacity: 0');
		radiusLine_1.setAttribute('style', 'top: 251px; left: 678px; opacity: 0');
		break;
	case 3 :
		circleText_0.setAttribute('style', 'top:195px; left:370px;');
		circleText_1.setAttribute('style', 'top:206px; left:805px;');
		dropArea.setAttribute('style', 'top:152px; left:558px;');
		radiusLine_0.setAttribute('style', 'top: 290px; left: 500px; opacity: 0');
		radiusLine_0.style.WebkitTransform = 'rotateX(180deg)';
		radiusLine_0.style.mozTransform = 'rotateX(180deg)';
		radiusLine_0.style.msTransform = 'rotateX(180deg)';
		radiusLine_0.style.oTransform = 'rotateX(180deg)';
		radiusLine_0.style.transform = 'rotateX(180deg)';
		radiusLine_1.setAttribute('style', 'top: 286px; left: 678px; opacity: 0');
		radiusLine_1.style.WebkitTransform = 'rotateX(180deg)';
		radiusLine_1.style.mozTransform = 'rotateX(180deg)';
		radiusLine_1.style.msTransform = 'rotateX(180deg)';
		radiusLine_1.style.oTransform = 'rotateX(180deg)';
		radiusLine_1.style.transform = 'rotateX(180deg)';
		break;
	case 4 :
		circleText_0.setAttribute('style', 'top:252px; left:370px;');
		circleText_1.setAttribute('style', 'top:159px; left:802px;');
		dropArea.setAttribute('style', 'top:262px; left:647px;');
		radiusLine_0.setAttribute('style', 'top: 236px; left: 496px; opacity: 0');
		radiusLine_0.style.WebkitTransform = 'rotate(-30deg)';
		radiusLine_0.style.mozTransform = 'rotate(-30deg)';
		radiusLine_0.style.msTransform = 'rotate(-30deg)';
		radiusLine_0.style.oTransform = 'rotate(-30deg)';
		radiusLine_0.style.transform = 'rotate(-30deg)';
		radiusLine_1.setAttribute('style', 'top: 180px; left: 659px; opacity: 0');
		radiusLine_1.style.WebkitTransform = 'rotate(-27deg)';
		radiusLine_1.style.mozTransform = 'rotate(-27deg)';
		radiusLine_1.style.msTransform = 'rotate(-27deg)';
		radiusLine_1.style.oTransform = 'rotate(-27deg)';
		radiusLine_1.style.transform = 'rotate(-27deg)';
		break;
	case 5 :
		circleText_0.setAttribute('style', 'top:402px; left:720px;');
		circleText_1.setAttribute('style', 'top:95px; left:410px;');
		dropArea.setAttribute('style', 'top:122px; left:557px;');
		radiusLine_0.setAttribute('style', 'top: 280px; left: 546px; opacity: 0');
		radiusLine_0.style.WebkitTransform = 'rotate(210deg)';
		radiusLine_0.style.mozTransform = 'rotate(210deg)';
		radiusLine_0.style.msTransform = 'rotate(210deg)';
		radiusLine_0.style.oTransform = 'rotate(210deg)';
		radiusLine_0.style.transform = 'rotate(210deg)';
		radiusLine_1.setAttribute('style', 'top: 211px; left: 451px; opacity: 0');
		radiusLine_1.style.WebkitTransform = 'rotate(210deg)';
		radiusLine_1.style.mozTransform = 'rotate(210deg)';
		radiusLine_1.style.msTransform = 'rotate(210deg)';
		radiusLine_1.style.oTransform = 'rotate(210deg)';
		radiusLine_1.style.transform = 'rotate(210deg)';
		break;
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
		radiusChage();	
	
	},800);

	setTimeout(function() {
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');
	},300);


	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 2300);

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
		choiceLeft = -180;
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

function radiusChage() {
	var circleBg = document.querySelector('.circleBg'),
		circleImgInt = circleBg.style.background.split('.')[0],
		intY = gameManager.ImgRandom[0],
		circleText_0 = document.querySelector('.circleText_0'),
		circleText_1 = document.querySelector('.circleText_1'),
		radiusLine_0 = document.querySelector('.radiusLine_0'),
		radiusLine_1 = document.querySelector('.radiusLine_1');

	radiusLine_0.style.opacity = 1;
	radiusLine_1.style.opacity = 1;

	circleBg.style.opacity = 0;

	if(intY == 1){
		circleText_0.style.top = '202px';
		circleText_0.style.left = '540px';
		circleText_1.style.top = '203px';
		circleText_1.style.left = '693px';
	}else if(intY == 2){
		circleText_0.style.top = '202px';
		circleText_0.style.left = '540px';
		circleText_1.style.top = '203px';
		circleText_1.style.left = '693px';
	}else if(intY == 3){
		circleText_0.style.top = '314px';
		circleText_0.style.left = '540px';
		circleText_1.style.top = '311px';
		circleText_1.style.left = '693px';
	}else if(intY == 4){
		circleText_0.style.top = '202px';
		circleText_0.style.left = '489px';
		circleText_1.style.top = '143px';
		circleText_1.style.left = '660px';
	}else if(intY == 5){
		circleText_0.style.top = '299px';
		circleText_0.style.left = ' 554px';
		circleText_1.style.top = '213px';
		circleText_1.style.left = '435px';
	}
}

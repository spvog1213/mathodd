function initScale() {
	log('initScale...');

	var bgCanvas = document.getElementById('bgCanvas');

	gameManager.clientWidth = document.body.clientWidth;
	gameManager.clientHeight = document.body.clientHeight;

	gameManager.bgCanvasWidth = bgCanvas.clientWidth;
	gameManager.bgCanvasHeight = bgCanvas.clientHeight;

	gameManager.zoomVertical = (gameManager.clientHeight / gameManager.bgCanvasHeight) * 1;
	gameManager.zoomHorizontal = (gameManager.clientWidth / gameManager.bgCanvasWidth) * 1;

	if (gameManager.bgCanvasWidth * gameManager.zoomVertical < gameManager.clientWidth) {
		setScaleCanvas(bgCanvas, gameManager.zoomVertical);
		gameManager.zoomRate = gameManager.zoomVertical;
	} else {
		setScaleCanvas(bgCanvas, gameManager.zoomHorizontal);
		gameManager.zoomRate = gameManager.zoomHorizontal;
	}
}

function setScaleCanvas(targetElement, zoomRate) {
	targetElement.setAttribute('style', '-ms-transform: scale(' + zoomRate + ',' + zoomRate + ');' + '-webkit-transform: scale(' + zoomRate + ',' + zoomRate + ');' + 'transform: scale(' + zoomRate + ',' + zoomRate + ');' + 'transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -ms-transform-origin: 0% 0%;');
}

function appendQuiz(buttonType, quizArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	quizObj = document.createElement('div'),
	choiceLeft = 0,
	choiceright = 0,
	choiceTop = 0;

	switch (gameManager.quizObj.length) {
		case 1 :
		choiceLeft = 240;
		break;
		case 2 :
		choiceLeft = 150;
		break;
		case 3 :
		choiceLeft = 60;
		break;
		case 4 :
		choiceLeft = -50;
		break;
		case 5 :
		choiceLeft = -150;
		break;
	}

	quizObj.setAttribute('id', 'quizObj');
	bgCanvas.appendChild(quizObj);

	for (var i = 0; i < quizArray.length; i++) {

		var quizObjGroup;
		if (imgSrcArray) {

			var quizObjGroup = document.createElement('div'),
			className = imgSrcArray[0].split('/');

			className = className[className.length - 1];
			className = className.split('_');

			quizObjGroup.setAttribute('id', 'quizObjGroup' + i);
			quizObj.appendChild(quizObjGroup);

			var imgIndex = parseInt(Math.random() * 3);

			log(imgIndex);

			appendImageElement('quizImg_' + i, imgSrcArray[imgIndex], quizObjGroup);
			quizObjGroup = document.querySelector('#quizObjGroup' + i);
			quizObjGroup.className = className[0];

		} else {
			appendCircleElement('quizImg_' + i, buttonType === 'drag' ? 'drag' : 'click', quizObj);
			quizObjGroup = document.querySelector('#quizImg_' + i);
		}

		quizObjGroup.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');

			imgObjText.setAttribute('id', 'quizText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 40px; left: 0px;');
			imgObjText.innerHTML = gameManager.quizText[i];

			quizObjGroup.appendChild(imgObjText);

		} else {
			quizObjGroup.innerHTML = gameManager.quizText[i];
		}

		quizObjGroup.setAttribute('answerValue', gameManager.quizObj[i]);
		gameManager.quizPosition.push([choiceTop, choiceLeft]);


	}
}


function clickCompareAnswer(clickObj) {

	var clickObjValue = clickObj.getAttribute('answervalue');
	var answerIndex;


	for (var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
		var answervalue = gameManager.QUIZ_ANSWER[i];
		if (clickObjValue == answervalue){
			answerIndex = i;
		}
	}

	console.log(gameManager.QUIZ_ANSWER[answerIndex], clickObjValue)
	if (answerIndex!=undefined && gameManager.QUIZ_ANSWER[answerIndex] == clickObjValue) {
		gameManager.dabCount += 1;
		streamSound.setSound(gameManager.soundEffct);
		//체크가 여러개 일 때
		//위에 체크 표시 하면됨
		if (gameManager.dabCount == gameManager.QUIZ_ANSWER.length) {
			gameOver(clickObj);
		}

	} else {
		log('@ incorrect!!');
		incorrectAnimation(clickObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}



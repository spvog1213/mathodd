
function initScale () {
	log('initScale...');

	var bgCanvas = document.getElementById('bgCanvas');

	gameManager.clientWidth = document.body.clientWidth;
	gameManager.clientHeight = document.body.clientHeight;

	gameManager.bgCanvasWidth = bgCanvas.clientWidth;
	gameManager.bgCanvasHeight = bgCanvas.clientHeight;

	gameManager.zoomVertical = gameManager.clientHeight / gameManager.bgCanvasHeight;
	gameManager.zoomHorizontal = gameManager.clientWidth / gameManager.bgCanvasWidth;

	if (gameManager.bgCanvasWidth * gameManager.zoomVertical < gameManager.clientWidth) {
		setScaleCanvas(bgCanvas, gameManager.zoomVertical);	
		gameManager.zoomRate = gameManager.zoomVertical;
	} else {
		setScaleCanvas(bgCanvas, gameManager.zoomHorizontal);	
		gameManager.zoomRate = gameManager.zoomHorizontal;
	}
}

function setScaleCanvas (targetElement, zoomRate) {
	targetElement.setAttribute('style', '-ms-transform: scale(' + zoomRate + ',' + zoomRate + ');'
		+ '-webkit-transform: scale(' + zoomRate + ',' + zoomRate + ');' 
		+ 'transform: scale(' + zoomRate + ',' + zoomRate + ');' 
		+ 'transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -ms-transform-origin: 0% 0%;');
}

function appendImageElement (imageId, imageSrc, targetElement, clssName) {

	var imgObj = document.createElement('img');

	imgObj.src = imageSrc;
	imgObj.setAttribute('id', imageId);

	if (clssName) imgObj.className = clssName;

	targetElement.appendChild(imgObj);
}

function appendCircleElement (circleId, circleClass, targetElement) {
	var circleObj = document.createElement('div');

	circleObj.setAttribute('id', circleId);
	circleObj.className = circleClass;

	targetElement.appendChild(circleObj);
}

function appendChoiceQuestion (buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
		choiceQuestionContainer = document.createElement('div'),
		line = document.createElement('div'),
		choiceLeft = 0;

		switch (gameManager.choiceQuestion.length) {
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

		choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');
		bgCanvas.appendChild(choiceQuestionContainer);

		line.className = 'line';

		choiceQuestionContainer.appendChild(line);


	for (var i = 0; i < choiceQuestionArray.length; i++) {
		
		var currentQuestion; 
		if (imgSrcArray) {

			var choiceQuestionGroup = document.createElement('div'),
				className = imgSrcArray[0].split('/');
				className = className[className.length - 1];
				className = className.split('_');

				choiceQuestionGroup.setAttribute('id', 'choiceQuestionGroup_' + i);
				choiceQuestionContainer.appendChild(choiceQuestionGroup);

			appendImageElement('choiceQuestion_' + i, imgSrcArray[0], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);	
		}
		
		choiceLeft = choiceLeft + 200;
		
		currentQuestion.setAttribute('style', 'top: 620px; left:' + choiceLeft + 'px;');
		
		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
				imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
				imgObjText.className = className[0] + 'Text';
				imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
				imgObjText.innerHTML = gameManager.choiceQuestion[i];

			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestion[i];	
		}
		
		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([620, choiceLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
		} else {
			currentQuestion.addEventListener('click', function () {
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}

function compareAnswer (dragObj) {
	log(dragObj.getAttribute('answerValue'));
	if (gameManager.CURRENT_ANSWER === parseInt(dragObj.getAttribute('answerValue'))) {
		log('@ correct!!');
		gameOver();
	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj); 
		streamSound.setSound('media/incorrect.mp3');
	}	
}

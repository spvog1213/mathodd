function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendChoiceQuestion('click', gameManager.choiceQuestion, gameManager.btnimg);

}

function gameOver(currentObj) {
	var keypadContainer = document.querySelector('#keypadContainer').childNodes;
	for (var i = 0; i < keypadContainer.length; i++) {
		keypadContainer[i].style.pointerEvents = "none";
	}
	
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	
	

	gameOverAnimation();
	document.querySelector('#currentQuestion').setAttribute('style', 'display:block; top:' + (currentObj.offsetTop + 20) + 'px; left:' + (currentObj.offsetLeft + 34) + 'px;');
	streamSound.setSound('../../media/correct.mp3');
	clearInterval(countTimer);
	logCounter.endTime();
	logCounter.tryCounter();
	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);

}

function initxylophone() {
	var bgCanvas = document.getElementById('bgCanvas'),
	    keypadContainer = document.createElement('div'),
	    xylophoneGroup = document.createElement('div'),
	    xylophonenumber = document.createElement('div'),
	    xylophonenumberGroup = document.createElement('div');

	keypadContainer.setAttribute('id', 'keypadContainer');
	bgCanvas.appendChild(keypadContainer);

	xylophoneGroup.setAttribute('id', 'xylophoneGroup');
	xylophonenumber.setAttribute('id', 'xylophonenumber');
	xylophonenumber.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	bgCanvas.appendChild(xylophonenumber);

	switch(gameManager.TOTAL_ANSWER_ARRAY[0]) {
	case 1:
		xylophonenumber.setAttribute('style', 'left: 263px');
		break;
	case 2:
		xylophonenumber.setAttribute('style', 'left: 332px');
		break;
	case 3:
		xylophonenumber.setAttribute('style', 'left: 400px');
		break;
	case 4:
		xylophonenumber.setAttribute('style', 'left: 468px');
		break;
	case 5:
		xylophonenumber.setAttribute('style', 'left: 536px');
		break;
	case 6:
		xylophonenumber.setAttribute('style', 'left: 606px');
		break;
	case 7:
		xylophonenumber.setAttribute('style', 'left: 675px');
		break;
	case 8:
		xylophonenumber.setAttribute('style', 'left: 744px')
		break;
	case 9:
		xylophonenumber.setAttribute('style', 'left: 744px')
		break;
	}

	for (var i = 0; i < gameManager.keypadImgArray.length; i++) {
		var currentQuestion;
		if (gameManager.keypadImgArray) {

			var className = gameManager.keypadImgArray[0].split('/');
			className = className[className.length - 1];
			className = className.split('_');

			createObject(i, gameManager.keypadImgArray[i], xylophoneGroup, gameManager.SoundArray[i], gameManager.keypadImgHoverArray[i]);
			keypadContainer.appendChild(xylophoneGroup);

			currentQuestion = document.querySelector('#xylophoneGroup');
			currentQuestion.className = className[0];
		}
	}

}

function createObject(index, keyObjSrc, targetElement, clickSound, keyHoverSrc) {
	var keyObj = document.createElement('img'),
	    xylophonenumberclick = document.getElementById('xylophonenumber'),
	    up = 214,
	    down = 206;
	keyObj.src = keyObjSrc;

	index = index + 1;
	keyObj.setAttribute('id', 'keyObj_' + index);
	keyObj.className = "key";

	keypadDown = function(e) {
		streamSound.setSound(clickSound);
		e.preventDefault();
		keyObj.src = keyHoverSrc;
		xylophonenumber = keyHoverSrc;
		keyObj.setAttribute('style', 'padding-bottom: 0px');

		if (index == gameManager.TOTAL_ANSWER_ARRAY[0]) {
			xylophonenumberclick.style.top = up + 'px';
		}

	}
	keypadUp = function(e) {
		e.preventDefault();
		keyObj.src = keyObjSrc;
		keyObj.setAttribute('style', 'padding-bottom: 8px');
		if (index == gameManager.TOTAL_ANSWER_ARRAY[0]) {
			xylophonenumberclick.style.top = down + 'px';
		}

	}

	keyObj.addEventListener(gameManager.eventSelector.downEvent, keypadDown, false);
	keyObj.addEventListener(gameManager.eventSelector.upEvent, keypadUp, false);

	targetElement.appendChild(keyObj);

}

function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    choiceQuestionContainer = document.createElement('div');

	switch (gameManager.choiceQuestion.length) {
	case 1 :
		choiceLeft = 240;
		break;
	case 2 :
		choiceLeft = 65;
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

	switch (gameManager.CURRENT_TYPE) {
	case 'train':
		choiceTop = 560;
		break;
	case 'fishing':
	default:
		choiceTop = 581;
		break;

	}

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var currentQuestion;
		if (imgSrcArray) {

			var choiceQuestionGroup = document.createElement('div'),
			    className = imgSrcArray[0].split('/');
			className = className[className.length - 1];
			className = className.split('_');

			choiceQuestionGroup.setAttribute('id', 'choiceQuestionGroup_' + i);
			choiceQuestionContainer.appendChild(choiceQuestionGroup);

			appendImageElement('choiceQuestion_' + i, imgSrcArray[i], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = 'btnimg';

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
		}

		choiceLeft = choiceLeft + 250;
		//버튼간의 간격을 조절

		currentQuestion.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');
		// 버튼의 top 위치값을 조절

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';

			switch (gameManager.CURRENT_TYPE) {
			case 'train':
				imgObjText.setAttribute('style', 'top: 0px; left: 30px;');
				break;
			case 'fishing':
			default:
				imgObjText.setAttribute('style', 'top: 48px; left: 10px;');
				break;
			}

			imgObjText.innerHTML = gameManager.choiceQuestionText[i];

			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestionText[i];
			//넣어준 값을 받아옴
		}

		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);
		//정답을 판별

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
		//클릭후 바운스후 제자리로 돌아옴

		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
		} else {
			currentQuestion.addEventListener('click', function() {
				log('click');
				compareAnswer(this);
				//정답을 클릭할경우 반응

			}, false);
		}
	}
}

function convertNumber(number) {
	log('@ convertNumber!');

	switch (number) {
	case '첫째':
		number = 1;
		gameManager.SoundSrcType = 'numberVoice';
		break;
	case '둘째':
		number = 2;
		gameManager.SoundSrcType = 'numberVoice';
		break;
	case '셋째':
		number = 3;
		gameManager.SoundSrcType = 'numberVoice';
		break;
	case '넷째':
		number = 4;
		gameManager.SoundSrcType = 'numberVoice';
		break;
	case '다섯째':
		number = 5;
		gameManager.SoundSrcType = 'numberVoice';
		break;
	case '여섯째':
		number = 6;
		gameManager.SoundSrcType = 'numberVoice';
		break;
	case '일곱째':
		number = 7;
		gameManager.SoundSrcType = 'numberVoice';
		break;
	case '여덟째':
		number = 8;
		gameManager.SoundSrcType = 'numberVoice';
		break;
	case '아홉째':
		number = 9;
		gameManager.SoundSrcType = 'numberVoice';
		break;
	case '열째':
		number = 10;
		gameManager.SoundSrcType = 'numberVoice';
		break;
	}

	return number;
}

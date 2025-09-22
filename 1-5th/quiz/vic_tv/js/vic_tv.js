function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	keypadAppend();

}

function tvInit() {
	appendCircleElement('tvWrap','tvWrap', bgCanvas);
	appendCircleElement('question','quetxt', tvWrap);
	appendCircleElement('simbol1','quetxt', tvWrap);
	appendCircleElement('simbol2','quetxt', tvWrap);

	simbol1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	simbol2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
	question.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length-1];

	appendCircleElement('answer','quetxt', tvWrap);
	appendCircleElement('explanation','quetxt', tvWrap);
	explanation.innerHTML= '리모콘으로 입력하세요.';

}

function gameOver() {
	if (gameManager.CURRENT_ANSWER[0] === parseInt(answer.innerHTML)) {

		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');
		clearInterval(countTimer);
		logCounter.endTime();

		var keypadContainerGroup = document.querySelector('#keypadContainerGroup').childNodes;

		for (var i = 0; i < keypadContainerGroup.length; i++) {
			keypadContainerGroup[i].style.pointerEvents = "none";
		}

		setTimeout(function() {
			log('excute stampStarIcon!');
			parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);
	} else {

		streamSound.setSound('../../media/incorrect.mp3');
		answer.innerHTML = "";
		document.querySelector('#explanation').innerHTML= '리모콘으로 입력하세요.';


	}
	logCounter.tryCounter();

}

function keypadAppend() {
	var bgCanvas = document.getElementById('keypad'),
	    keypadContainer = document.createElement('div'),
	    keypadContainerGroup = document.createElement('div');

	keypadContainer.setAttribute('id', 'keypadContainer');
	bgCanvas.appendChild(keypadContainer);

	keypadContainerGroup.setAttribute('id', 'keypadContainerGroup');


	for (var i = 0; i < gameManager.keypadImgArray.length; i++) {
		var currentQuestion;
		if (gameManager.keypadImgArray) {

			var className = gameManager.keypadImgArray[0].split('/');
			className = className[className.length - 1];
			className = className.split('_');


			createObject(i, gameManager.keypadImgArray[i], keypadContainerGroup);
			keypadContainer.appendChild(keypadContainerGroup);

			currentQuestion = document.querySelector('#keypadContainerGroup');
			currentQuestion.className = className[0];

		}

	}

}

function createObject(index, keyObjSrc, targetElement) {
	var keyObj = document.createElement('img');

	keyObj.src = keyObjSrc;
	index = index + 1;

	keyObj.setAttribute('id', 'keyObj_' + index);
	keyObj.className = "key";

	keypadDown = function(e) {
		e.preventDefault();
		document.querySelector('#explanation').innerHTML= '';
		keyObj.src  = keyObjSrc.replace('.png','_on.png');
		streamSound.setSound('media/keyClick.mp3');

	}
	keypadUp = function(e) {
		writeNumber(this);
		e.preventDefault();
		keyObj.src = keyObjSrc;
	}

	keyObj.addEventListener(gameManager.eventSelector.downEvent, keypadDown, false);
	keyObj.addEventListener(gameManager.eventSelector.upEvent, keypadUp, false);

	targetElement.appendChild(keyObj);

}

function writeNumber(keyObj) {

	var keyObj = keyObj,
	    keyNum = keyObj.id.split('_');
	keyNum = keyNum.slice(keyNum.length - 1);
	keyNum = parseInt(keyNum);

	switch (keyNum) {
	case 10:
		answer.innerHTML = "";
		document.querySelector('#explanation').innerHTML= '리모콘으로 입력하세요.';
		break;
	case 11:
		if (answer.innerHTML.length == 5)
			return
		answer.innerHTML = answer.innerHTML + 0;
		break;
	case 12:
		gameOver();
		break;
	default:
		if (answer.innerHTML.length == 5)
			return;
		answer.innerHTML = parseInt(answer.innerHTML + keyNum);
	}

}

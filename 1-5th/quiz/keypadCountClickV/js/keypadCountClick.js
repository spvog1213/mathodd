function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('question1', 'question', document.getElementById('keypad'));
	appendCircleElement('question2', 'question', document.getElementById('keypad'));

	keypadAppend();

}

function initKeypad() {
	log('initKeypad...');

	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	    Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	    Question1 = document.querySelector('#question1'),
	    Question2 = document.querySelector('#question2'),

	    calculation = document.createElement('img'),
	    equalsSign = document.createElement('img'),
	    equalsSignV = document.createElement('div'),
	    answer = document.createElement('span');

	answer.setAttribute('id', 'answer');
	note.setAttribute('id', 'note');
	calculation.setAttribute('id', 'calculation');
	equalsSign.setAttribute('id', 'equalsSign');
	equalsSignV.setAttribute('id', 'equalsSignV');

	equalsSign.src = 'images/equal.png';
	Question1.innerHTML = Num1;
	Question2.innerHTML = Num2;

	keypad.appendChild(answer);

	switch(gameManager.choiceType) {
	case 'h':
		Question1.setAttribute('style', 'top:28%; right: 71%;');
		Question2.setAttribute('style', 'top:28%; left: 38%;');
		keypad.appendChild(equalsSign);
		answer.setAttribute('style', 'top:341px; left: 212px');

		break;
	case 'v':
		calculation.setAttribute('style', 'top:37%; left: 20%;');
		Question1.setAttribute('style', 'top:19%; right: 54%;');
		Question2.setAttribute('style', 'top:33%; right: 54%;');
		keypad.appendChild(equalsSignV);
		answer.setAttribute('style', 'top:384px; left: 170px; text-align:right');
		break;
	}

	switch (gameManager.calculation) {
	case '+':
		calculation.src = 'images/plus.png';
		keypad.appendChild(calculation);

		break;
	case '-':
		calculation.src = 'images/minus.png';
		keypad.appendChild(calculation);
		break;
	case '/':
		calculation.src = 'images/division.png';
		keypad.appendChild(calculation);
		break;
	case '*':
		calculation.src = 'images/multiplication.png';
		keypad.appendChild(calculation);
		break;

	}

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

	}
	logCounter.tryCounter();

}

function keypadAppend() {
	var bgCanvas = document.getElementById('keypad'),
	    keypadContainer = document.createElement('div'),
	    keypadContainerGroup = document.createElement('div'),
	    line = document.createElement('div');

	keypadContainer.setAttribute('id', 'keypadContainer');
	bgCanvas.appendChild(keypadContainer);

	keypadContainerGroup.setAttribute('id', 'keypadContainerGroup');

	line.className = 'line';

	keypadContainer.appendChild(line);

	for (var i = 0; i < gameManager.keypadImgArray.length; i++) {
		var currentQuestion;
		if (gameManager.keypadImgArray) {

			var className = gameManager.keypadImgArray[0].split('/');
			className = className[className.length - 1];
			className = className.split('_');

			createObject(i, gameManager.keypadImgArray[i], gameManager.keypadImgHoverArray[i], keypadContainerGroup);
			keypadContainer.appendChild(keypadContainerGroup);

			currentQuestion = document.querySelector('#keypadContainerGroup');
			currentQuestion.className = className[0];

		}

	}

}

function createObject(index, keyObjSrc, keyHoverSrc, targetElement) {
	var keyObj = document.createElement('img');

	keyObj.src = keyObjSrc;
	index = index + 1;

	keyObj.setAttribute('id', 'keyObj_' + index);
	keyObj.className = "key";

	keypadDown = function(e) {
		e.preventDefault();
		keyObj.src = keyHoverSrc;
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
		break;
	case 11:
		if (answer.innerHTML.length == 5)
			return;
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

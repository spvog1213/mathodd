function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	keypadAppend();

}

function queTxt(){
	appendCircleElement('queTxt_wrap','queTxt_wrap', bgCanvas);
    appendCircleElement('queTxt','queText', document.querySelector('#queTxt_wrap'));
    var queTxt = document.querySelector('#queTxt');
    appendCircleElement('queText1','queText', queTxt);
    appendCircleElement('calculation1','calculation', queTxt);
    appendCircleElement('queText2','queText', queTxt);
    appendCircleElement('queText3','queText', queTxt);
    appendCircleElement('answer','answer', keypad);
    appendImageElement('note', 'images/vic_note_v.png', keypad);
    appendImageElement('line', 'images/line.png', keypad);
    appendImageElement('answerBg', 'images/keypad_dapbox_v.png', keypad);

    queText1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
    queText2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
    queText3.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[2];


    var cal_1 = gameManager.TOTAL_ANSWER_ARRAY[3];
    switch(cal_1){
    	case '+':
    		appendImageElement('cal_img', 'images/plus.png', calculation1);
    	break;
    	case '-':
    	appendImageElement('cal_img', 'images/minus.png', calculation1);
    	break;
    	case '/':
    		appendImageElement('cal_img', 'images/division.png', calculation1);
    	break;
    	case '*':
    		appendImageElement('cal_img', 'images/multiplication.png', calculation1);	
    	break;
    }

    line.setAttribute('style','position: absolute; left: 202px; top: 387px; z-index: 10;');
	answer.setAttribute('style','left: 170px; top: 415px; z-index: 10; text-align: right; cursor: default;');
	answerBg.setAttribute('style','position: absolute; left: 190px; top: 417px; z-index: 0;');
	queTxt_wrap.setAttribute('style','left: 4px; top: 170px;');
	queTxt.setAttribute('style','width: 494px;');

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

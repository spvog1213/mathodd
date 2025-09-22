function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('question1', 'question_box', document.getElementById('bgCanvas'));
	appendCircleElement('question2', 'question_box', document.getElementById('bgCanvas'));

	appendChoiceQuestion('click', gameManager.choiceQuestion, gameManager.choiceQuestionImg);

}

function initPencil() {
	log('initPencil...');

	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	    Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	    Question1 = document.querySelector('#question1'),
	    Question2 = document.querySelector('#question2'),
	    calculation = document.createElement('img'),
	    equalsSign = document.createElement('img');

	calculation.setAttribute('id', 'calculation');
	equalsSign.setAttribute('id', 'equalsSign');
	Question1.setAttribute('style', 'top:74px; left: 150px;');
	Question2.setAttribute('style', 'top:74px; left: 799px;');

	subStringNumber(Num1, Question1);
	subStringNumber(Num2, Question2);

	switch (gameManager.calculation) {
	case '+':
		calculation.src = 'images/plus.png';
		break;
	case '-':
		calculation.src = 'images/minus.png';
		break;
	case '*':
		calculation.src = 'images/multiplication.png';
		break;
	case '/':
		calculation.src = 'images/division.png';
		break;
	}

	bgCanvas.appendChild(calculation);

}

function gameOver(dragObj) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	dragObjID = dragObj.id.split('_'),
	dragImg_0 = document.querySelector('#choiceQuestionGroup_0').childNodes[0];
	dragImg_1 = document.querySelector('#choiceQuestionGroup_1').childNodes[0];
	dragObjselect = dragObj;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	document.querySelector('#answerMark').setAttribute('style', 'position: absolute; display: block; top:' + (dragObj.offsetTop + 20) + 'px; left:' + (dragObj.offsetLeft + 35) + 'px;');
	streamSound.setSound('../../media/correct.mp3');
	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();

	

	log(dragImg_0);
	log(dragImg_1);

	log(dragObjID[1] + '아머리아파');

	if(dragObjID[1] === '0'){
		// log(dragImg_1);
		dragObjselect.childNodes[0].src = 'images/comparehover_'+ dragObjID[1] +'.png';
		dragImg_1.src = 'images/comparenone_1.png';
	}else{
		// log(dragImg_0 + '아 똥같아');
		dragObjselect.childNodes[0].src = 'images/comparehover_'+ dragObjID[1] +'.png';
		dragImg_0.src = 'images/comparenone_0.png';
	}



	
	// dragObjnone[].childNodes[0].src = 'images/comparenone_'+ dragObjID[1] +'.png';

	log(dragObjnone + '똥이다');
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

function subStringNumber(num, numContainer) {
	var num = num,
	    numContainer = numContainer.id,
	    fristSubStr,
	    lastSubStr,
	    pencilWrap,
	    QTxt = document.createElement('span');
	QTxt.className = 'txt';
	QTxt.innerHTML = num;

	if (num >= 10) {
		fristSubStr = num.toString().substr(0, 1);
		lastSubStr = num.toString().substr(1, 1);
	} else {
		fristSubStr = "";
		lastSubStr = num.toString().substr(0, 1);
	}

	pencilSet = 'images/pencilsum_pencilset.png';

	switch (gameManager.pencil) {
	case 0:
		pencil = 'images/pencilsum_pencil_1.png';
		break;
	case 1:
		pencil = 'images/pencilsum_pencil_2.png';
		break;
	case 2:
		pencil = 'images/pencilsum_pencil_3.png';
		break;
	case 3:
		pencil = 'images/pencilsum_pencil_4.png';
		break;
	case 4:
		pencil = 'images/pencilsum_pencil_5.png';
		break;

	}

	for (var i = 0; i < fristSubStr; i++) {
		var pencilSet;

		createObject(i, pencilSet, numContainer);
	}

	for (var i = 0; i < lastSubStr; i++) {

		if (i % 3 === 0) {
			pencilWrap = document.createElement('div');
			pencilWrap.className = 'pencilWrap';
		}

		var pencil;

		createObject(i, pencil, numContainer, pencilWrap);
	}

	document.getElementById(numContainer).appendChild(QTxt);

}


function compareCompareAnswer(dragObj) {
	log(dragObj.getAttribute('answerValue'));

	if (gameManager.CURRENT_ANSWER[0] === dragObj.getAttribute('answerValue')) {
		//getAttribute = 요소의 클래스 속성의 값을 가져옴
		//parseInt = 문자열을 구문 분석하고 정수를 반환합니다.

		log('@ correct!!');
		gameOver(dragObj);

	} else {
		// log('멍충아')
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');

		logCounter.tryCounter();
	}
}


function createObject(index, parentObjSrc, numContainer, smallContainer) {
	var parentObj = document.createElement('img'),
	    numContainer =
	    numContainer;

	parentObj.src = parentObjSrc;
	parentObj.className = "penciSetl";
	parentObj.setAttribute('style', 'padding-top: 17px; padding-left :18px; padding-right :16px;');

	if (smallContainer) {
		parentObj.className = "pencil";
		smallContainer.setAttribute('style', 'padding: 17px 12px 4px 18px;');
		parentObj.setAttribute('style', 'padding-left :7px; padding-right :7px;');
		smallContainer.appendChild(parentObj);
		document.getElementById(numContainer).appendChild(smallContainer);
	} else {
		document.getElementById(numContainer).appendChild(parentObj);
	}
}


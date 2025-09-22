function initScene() {
	log('initScene...');

	log('excute initClockTimer!');
	CheckButton();
	// parent.window.initClockTimer();
	// appendImageElement('line','images/chocoplate_line.png', bgCanvas);
	// line.setAttribute('style','position: absolute; top: 250px;left: 161px; z-index: 90;');
	appendCircleElement('wrap','wrap', document.querySelector('#answerObject1'));
	appendImageElement('blankPlate','images/chocoplate_plate.png', bgCanvas);
	appendImageElement('PlateCounter','images/chocoplate_tray.png', bgCanvas);
}

function initChoco(chocoCounter) {
	log('initChoco...');

	var left = 15,
	   	chocoOriginal,
	    question1 = document.createElement('div'),
	    que = gameManager.TOTAL_ANSWER_ARRAY[0];
	    answerObject1 = document.getElementById('answerObject1');

	question1.setAttribute('id', 'question1');
	
	question1.setAttribute('style', 'top:53%; left:31%');
	bgCanvas.appendChild(question1);

	appendCircleElement('questionTop','questionTop', bgCanvas);
	appendCircleElement('num1','questionTop', questionTop);
	appendCircleElement('num2','questionTop', questionTop);
	appendCircleElement('num3','questionTop', questionTop);
	appendCircleElement('num4','questionTop', questionTop);
	appendCircleElement('num5','questionTop', questionTop);

	if(que === 3 || que === 6){
		num3.innerHTML = '으로 나눈 것 중의';
		questionTop.setAttribute('style','padding-left: 94px;');
	}else if(que === 10 ||  que === 13){
		num3.innerHTML = '으로 나눈 것 중의';
		questionTop.setAttribute('style','padding-left: 77px;');
	}else if(que === 11 || que === 12 ||  que === 14 || que === 15){
		num3.innerHTML = '로 나눈 것 중의';
		questionTop.setAttribute('style','padding-left: 93px;');
	}else{
		num3.innerHTML = '로 나눈 것 중의';
	}
	num1.innerHTML = '똑같이';
	num2.innerHTML = '&nbsp;' + gameManager.TOTAL_ANSWER_ARRAY[0];
	num4.innerHTML = '&nbsp;' + gameManager.TOTAL_ANSWER_ARRAY[1];
	num5.innerHTML = '조각을 접시에 담으세요.';

	chocoOriginal = 'images/chocoplate_choco.png';
	off = 'images/chocoplate_choco_off.png';

	for (var i = 0; i < chocoCounter; i++) {
		var top = 90,
		    eventCallback = function() {
			arguments[0].preventDefault();

		};

		createObject(i, top, left, eventCallback, chocoOriginal);
		blankChoco(i, eventCallback, off);
	}

}

function gameOver() {
	var answerObj1 = document.querySelector('#answerObject1'),
	    answerChildNode1 = parseInt(answerObj1.childNodes[0].childNodes.length);

	if (gameManager.CURRENT_ANSWER[0] === answerChildNode1) {

		for(var i = 0; i < gameManager.TOTAL_ANSWER_ARRAY[0]; i++){
			var parentObj = document.querySelector('#parentObj_' + i);
			parentObj.style.pointerEvents = 'none';
		}

		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');

		logCounter.tryCounter();
		logCounter.endTime();

		var checkBtn = document.querySelector('#checkBtn');
		checkBtn.style.pointerEvents = "none";


		setTimeout(function() {
			log('excute stampStarIcon!');
			// parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			// parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);

	} else {
		log('@ incorrect!!');
		logCounter.tryCounter();
		streamSound.setSound('../../media/incorrect.mp3');
		
		setTimeout(function() {
			gameManager.selectedQuestion = [];
			document.querySelector('#bgCanvas').innerHTML = "<div id='chocoCounter'></div><div id='chocoOff'></div><div id='answerObject1'></div><img src='images/boxfill_checkbtn.png' id = 'checkBtn'/>";
			initChoco(gameManager.TOTAL_ANSWER_ARRAY[0]);
			CheckButton();
			appendCircleElement('wrap','wrap', document.querySelector('#answerObject1'));
			appendImageElement('blankPlate','images/chocoplate_plate.png', bgCanvas);
			appendImageElement('PlateCounter','images/chocoplate_tray.png', bgCanvas);
		}, 400);
	}
	

}

function boundingCircle(dragObj, x, y) {
	switch (gameManager.CURRENT_TYPE) {
	case 'chocoplate':
		var answerObj1 = document.querySelector('#answerObject1'),
			wrapLength = parseInt(document.querySelector('#answerObject1').childNodes[0].childNodes.length),
			blankPlate = document.querySelector('#blankPlate'),
			wrap = document.querySelector('#wrap'),
		  	answerChildNode1 = parseInt(answerObj1.childNodes.length)+1;

		if (x > answerObj1.offsetLeft * gameManager.zoomRate && x < (answerObj1.offsetLeft * gameManager.zoomRate) + ((answerObj1.clientWidth + 10) * gameManager.zoomRate) && y > answerObj1.offsetTop * gameManager.zoomRate && y < (answerObj1.offsetTop * gameManager.zoomRate) + ((answerObj1.clientHeight + 10) * gameManager.zoomRate) && answerChildNode1) {
			log('bounding!');

			boundingCounter = true;
			streamSound.setSound('media/donut.mp3');
			
			objsrc = dragObj.src;

			dragObj.style.top = '0px';
			dragObj.style.left = '0px';
			wrap.appendChild(dragObj);
			dragObj.className = 'chage';
			dragObj.setAttribute('style','padding-left: 0px; padding-top: 0px; ');

			if(wrapLength > 4){
				answerObj1.style.paddingTop = '105px';
			}
			if(wrapLength > 4 && wrapLength > 9 ){
				answerObj1.style.paddingTop = '59px';
			}

		} else {
			streamSound.setSound('../../media/incorrect.mp3');
			log('not bounding!');
			logCounter.tryCounter();
			incorrectAnimation(dragObj);
		}
		break;

	default:
	}

}

function createObject(index, top, left, eventCallback, parentObjSrc) {
	var choiceTop = 32,
	    choiceLeft = 82,
	    parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;

	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObj.className = "chocoplate";

	if (index > 4 && index < 10) {
		index = index - 5;
		choiceTop = (choiceTop + 90);
		choiceLeft = choiceLeft * index + 56;
		parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');
	} else if(index > 9 && index < 16){
		index = index - 10;
		choiceTop = (choiceTop + 180);
		choiceLeft = choiceLeft * index + 56;
		parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');
	}else{
		choiceLeft = choiceLeft * index + 56;
		parentObj.setAttribute('style', 'left:' + choiceLeft + 'px; ');

	}

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);
	gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
	document.getElementById('chocoCounter').appendChild(parentObj);

	new Dragdrop(parentObj);
}

function blankChoco(index, eventCallback, parentObjSrc) {
	var parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;

	parentObj.setAttribute('id', 'blankChoco_' + index);
	parentObj.className = "blankChoco";

	document.getElementById('chocoOff').appendChild(parentObj);
}

function CheckButton() {
	var checkBtn = document.querySelector('#checkBtn');

	btnDown = function(e) {
		e.preventDefault();
		checkBtn.src = 'images/boxfill_checkbtn_push.png';
	}
	btnUp = function(e) {
		e.preventDefault();
		checkBtn.src = 'images/boxfill_checkbtn.png';
		gameOver();
	}

	checkBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	checkBtn.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);

}


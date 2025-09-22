function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	CheckButton();
}

function initDonut(donutCounter) {
	log('initDonut...');
	log(donutCounter);

	var donutTypes,
		left = 15,
	    skeweredOriginal,
	    boximg = document.createElement('img'),
	    question1 = document.createElement('div'),
	    endbox = document.createElement('img'),
	    answerObject1 = document.getElementById('answerObject1'),
	    skeweredDragCounter = document.getElementById('skeweredDragCounter');

	question1.setAttribute('id', 'question1');
	boximg.setAttribute('id', 'boximg');
	boximg.setAttribute('src', 'images/fruitskewer_skewer.png');

	question1.setAttribute('style', 'top:11%; left:350px; width: 620px; position: absolute;');
	bgCanvas.appendChild(question1);
	bgCanvas.appendChild(boximg);

	question1.innerHTML = "10개가  되도록 만들어 보세요.";

	
	for (var i = 0; i < donutCounter; i++) {
		 donutTypes = Math.floor(5 * Math.random());

		var top = 90,
		    eventCallback = function() {
			arguments[0].preventDefault();

		};

		createObject(i, top, left, eventCallback, donutTypes,skeweredDragCounter);
	}

	for (var i = 0; i < gameManager.TOTAL_ANSWER_ARRAY[0]; i++) {
		 donutTypes = Math.floor(5 * Math.random());

		var top = 90,
		    eventCallback = function() {
			arguments[0].preventDefault();

		};

		createObject(i, top, left, eventCallback, donutTypes,answerObject1);
	}

}

function gameOver() {
	var choiceQuestionContainer = document.querySelector('#skeweredDragCounter').childNodes;
	logCounter.tryCounter();
	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	
	
	var donut_answer = document.querySelectorAll('.donut_answer'),
	    donut_answer = parseInt(donut_answer.length),
	    checkBtn = document.querySelector('#checkBtn');

	    log("donut_answer=="+donut_answer);

	if (donut_answer === gameManager.CURRENT_ANSWER[0]) {
		gameOverAnimation();
		
		streamSound.setSound('../../media/correct.mp3');

		logCounter.endTime();

		checkBtn.style.pointerEvents = "none";

	setTimeout(function () {
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

		document.querySelector('#bgCanvas').innerHTML = "<div id='answerObject1'></div><div id='skeweredDragCounter'></div>";
		CheckButton();
		initDonut(10);
	}
}

function createObject(index, top, left, eventCallback, donutTypes, skeweredDragCounter) {
	var choiceTop = 30,
	    choiceLeft = 0,
	    parentObj = document.createElement('img');

	
		skeweredOriginal = 'images/fruitskewer_fruits_'+donutTypes+'.png';
	

	parentObj.src = skeweredOriginal;

	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObj.className = "donut";

	choiceLeft = (choiceLeft +100)*index;
		parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px; padding-left : ' + 0 + 'px; padding-right : ' + 0 + 'px; padding-top : ' + 40 + 'px;');

	gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);

	

	skeweredDragCounter.appendChild(parentObj);

	new Dragdrop(parentObj);

}

function boundingCircle(dragObj, x, y) {

	switch (gameManager.CURRENT_TYPE) {
	case 'donuts':
		var answerObj1 = document.querySelector('#answerObject1'),
		    answerChildNode1 = parseInt(answerObj1.childNodes.length) + 1,
		    currentAnswer1 = parseInt(gameManager.CURRENT_ANSWER[0]);

		// log('answerChildNode1==' + answerChildNode1);

		if (x > answerObj1.offsetLeft * gameManager.zoomRate && x < (answerObj1.offsetLeft * gameManager.zoomRate) + ((answerObj1.clientWidth + 10) * gameManager.zoomRate) && y > answerObj1.offsetTop * gameManager.zoomRate && y < (answerObj1.offsetTop * gameManager.zoomRate) + ((answerObj1.clientHeight + 10) * gameManager.zoomRate) && answerChildNode1 <= 10) {
			log('bounding!');

			dragObj.style.position = 'static';
			dragObj.className="donut_answer";
			answerObj1.appendChild(dragObj);
			streamSound.setSound('media/skewered.mp3');

		} else {
			log('not bounding!');
			logCounter.tryCounter();
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');
		}

		break;

	default:
	}

}

function CheckButton() {
	var checkBtn = document.createElement('img');
	checkBtn.setAttribute('id', 'checkBtn');
	checkBtn.src = 'images/boxfill_checkbtn.png';
	bgCanvas.appendChild(checkBtn);

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


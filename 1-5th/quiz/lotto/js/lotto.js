function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
}

function initHand(num1, num2, lotto_bg) {
	log('initHand...');

	var num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	    num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	    prevent = document.getElementById('prevent'),
	    firstHands = document.createElement('div'),
	    firstHandsSpan = document.createElement('div'),
	    lotto_tray = document.createElement('div'),
	    lotto_bg = document.createElement('div');

	firstHands.setAttribute('id', 'firstHands');
	lotto_bg.setAttribute('id', 'lotto_bg');
	firstHandsSpan.setAttribute('id', 'question');
	lotto_tray.setAttribute('id', 'lotto_tray');

	firstHandsSpan.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[5];

	bgCanvas.appendChild(firstHands);
	bgCanvas.appendChild(lotto_bg);
	bgCanvas.appendChild(firstHandsSpan);
	bgCanvas.appendChild(lotto_tray);

	appendChoiceQuestion('click', gameManager.choiceQuestion);
	startBtn();

}

function gameOver(currentObj) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	document.querySelector('#currentQuestion').setAttribute('style', 'display:block; top:' + (currentObj.offsetTop + 20) + 'px; left:' + (currentObj.offsetLeft + 65) + 'px;');
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');

	// log(clock + '000000000');

	var clock = parent.document.querySelector('#clock');
	clock.innerHTML  = "";

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

function createObject(index, top, left, eventCallback, parentObjSrc) {
	var parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;
	parentObj.className = "fruits";
	parentObj.setAttribute('style', 'padding-top: ' + top + 'px; padding-left : ' + 4 + 'px; padding-right : ' + 4 + 'px;');

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	document.getElementById('fruitsContainer').appendChild(parentObj);
}

function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    choiceQuestionContainer = document.createElement('div'),
	    line = document.createElement('div'),
	    choiceLeft = 0;

	switch (gameManager.choiceQuestion.length) {
	case 1 :
		choiceTop = 240;
		break;
	case 2 :
		choiceTop = 150;
		break;
	case 3 :
		choiceTop = -74;
		break;
	case 4 :
		choiceTop = -50;
		break;
	case 5 :
		choiceTop = -150;
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

			log(imgIndex);
			appendImageElement('choiceQuestion_' + i, imgSrcArray[imgIndex], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

			/*	if (imgSrcArray[1] !== undefined) {

			 addIdleSprite(200, 100, document.querySelector('#choiceQuestion_' + i), gameManager.fishImgArray);
			 }*/

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
		}

		choiceTop = choiceTop + 200;

		currentQuestion.setAttribute('style', 'top: ' + choiceTop + 'px; left: 906px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestionText[i];

			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestion[i];
		}

		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, 906]);

		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
		} else {
			currentQuestion.addEventListener('click', function() {
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}

function incorrectAnimation(dragObj) {
	var dragObjId = dragObj.id;
	dragObjId = dragObjId.split('_');

	var left = gameManager.choiceQuestionPosition[dragObjId[1]][1],
	    currentLeft = parseInt(dragObj.style.left.replace('px', ''));

	if (gameManager.CURRENT_TYPE === 'click' || gameManager.CURRENT_TYPE === 'train')
		currentLeft = 100;

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
			dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
		}
	});
}

function startBtn() {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	var startBtn = document.createElement('img'),
	    flag = true,
	    lotto_bg = document.querySelector('#lotto_bg');

	startBtn.setAttribute('id', 'startBtn');
	startBtn.src = 'images/start_btn.png';
	bgCanvas.appendChild(startBtn);

	btnDown = function(e) {
		e.preventDefault();
	}
	btnUp = function(e) {
		e.preventDefault();
		startBtn.src = 'images/start_btn.png';

		log('excute initClockTimer!');
		// parent.window.initClockTimer();

		if (flag) {
			streamSound.setSound('media/lotto.mp3');
			handMotion();
			flag = false;

			startBtn.setAttribute('style', 'cursor:default');
		}
		startBtn.style.display = 'none';
	}

	startBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	startBtn.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);

}

function spriteAnimation(spriteArray, spriteObj) {

	var index = 0;
	animate({
		delay : 100,
		duration : 1000,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}

function handMotion() {
	var firstHands = document.querySelector('#firstHands');

	var handMotion = document.createElement('img'),
	    spriteArray = ['images/lotto_cap_0.png', 'images/lotto_cap_1.png', 'images/lotto_cap_2.png', 'images/lotto_cap_3.png', 'images/lotto_cap_0.png', 'images/lotto_cap_0.png', 'images/lotto_cap_1.png', 'images/lotto_cap_2.png', 'images/lotto_cap_3.png', 'images/lotto_cap_0.png'];
	handMotion.setAttribute('id', 'handMotion');

	handMotion.setAttribute('style', 'top: 3%; left: 12%; z-index: 2;');

	setTimeout(function() {
		bgCanvas.removeChild(lotto_bg);
		bgCanvas.appendChild(handMotion);
		spriteAnimation(spriteArray, handMotion);
	}, 0);

	setTimeout(function() {
		resultScene();

		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[i].style.pointerEvents = "auto";
		}

	}, 1300);
}

function resultScene(delta, top) {
	var handMotion = document.querySelector('#handMotion');
	bgCanvas.removeChild(handMotion);

	prevent.setAttribute('style', 'pointer-events: auto;');

	var num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	    fist = document.createElement('img'),
	    fistText = document.createElement('div'),
	    hand = document.createElement('img'),
	    handText = document.createElement('div'),
	    fisthandBox = document.createElement('div');

	fist.setAttribute('id', 'fist');
	fisthandBox.setAttribute('id', 'fisthandBox');
	hand.setAttribute('id', 'hand');
	fistText.setAttribute('id', 'fistText');
	handText.setAttribute('id', 'handText');

	handText.setAttribute('style', 'top:0px; left: 0%;');
	fistText.setAttribute('style', 'top:30px; left: 15%;');

	fistText.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
	handText.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];


	animate({
		delay : 10,
		duration : 200,
		delta : makeEaseOut(quad),
		step : function(delta) {
			hand.style.top = (160 * delta) + 'px';
			handText.style.top = (160 * delta) + 'px';
			hand.style.left = (-65 * delta) + '%';
			handText.style.left = (-65 * delta) + '%';
		}
	});

	setTimeout(function() {
		animate({
			delay : 10,
			duration : 200,
			delta : makeEaseOut(quad),
			step : function(delta) {
				fist.style.top = (160 * delta) + 'px';
				fistText.style.top = (160 * delta) + 'px';
				fist.style.left = (61 * delta) + '%';
				fistText.style.left = (60 * delta) + '%';
			}
		});
	}, 100);

	// initHand();
	bgCanvas.appendChild(fisthandBox);
	fisthandBox.appendChild(fist);
	fisthandBox.appendChild(hand);
	fisthandBox.appendChild(fistText);
	fisthandBox.appendChild(handText);

	/*랜덤 공*/
	var ballTypes = Math.floor(4 * Math.random());

	switch (ballTypes) {
	case 0:
		fist.src = 'images/lotto_ball_1.png';
		hand.src = 'images/lotto_ball_2.png';
		break;
	case 1:
		fist.src = 'images/lotto_ball_2.png';
		hand.src = 'images/lotto_ball_3.png';
		break;
	case 2:
		fist.src = 'images/lotto_ball_3.png';
		hand.src = 'images/lotto_ball_4.png';
		break;
	case 3:
		fist.src = 'images/lotto_ball_4.png';
		hand.src = 'images/lotto_ball_1.png';
		break;
	}

	firstHands.setAttribute('style', 'background:url(images/lotto_cap_0.png) no-repeat;');

}

function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendChoiceQuestion('click', gameManager.choiceQuestion);

}

function initObject(fruitsCounter) {
	log('initObject...');

	var scaleObj = document.getElementById('scaleObj'),
	    zero = document.createElement('span'),
	    scsleArrow = document.createElement('img'),
	    scsleArrowCenter = document.createElement('img'),
	    ballText,
	    choiceLeft = 200,
	    ballRandom,
	    ballImg;

	scsleArrowCenter.src = "images/scale_center.png";
	scsleArrow.src = "images/scale_arrow.png";
	zero.innerHTML = "0";
	zero.setAttribute('id', 'scaleZero');
	scsleArrowCenter.setAttribute('id', 'scsleArrowCenter');
	scsleArrow.setAttribute('id', 'scsleArrow');
	
	//Min, Max, Number
	setRand(0, 7, 2);

	for (var i = 0; i < gameManager.question.length; i++) {
		ballText = document.createElement('span');
		// ballRandom = parseInt(Math.random() * 7);
		ballRandom = randResult[i];
		switch(ballRandom) {
		case 0:
			ballImg = "images/ball_0.png";
			break;
		case 1:
			ballImg = "images/ball_1.png";
			break;
		case 2:
			ballImg = "images/ball_2.png";
			break;
		case 3:
			ballImg = "images/ball_3.png";
			break;
		case 4:
			ballImg = "images/ball_4.png";
			break;
		case 5:
			ballImg = "images/ball_5.png";
			break;
		case 6:
			ballImg = "images/ball_6.png";
			break;
		case 7:
			ballImg = "images/ball_7.png";
			break;
		}

		choiceLeft = choiceLeft + 255;

		appendImageElement('ball_' + i, ballImg, bgCanvas, 'ball');
		ballText.className = "ballText";
		ballText.innerHTML = gameManager.question[i];

		ballQuestion = document.querySelector('#ball_' + i);
		ballQuestion.setAttribute('style', 'top: ' + 58 + 'px; left:' + choiceLeft + 'px;');
		ballText.setAttribute('style', 'top: ' + 105 + 'px; left:' + choiceLeft + 'px;');

		bgCanvas.appendChild(ballText);

	}

	bgCanvas.appendChild(zero);
	bgCanvas.appendChild(scsleArrow);
	bgCanvas.appendChild(scsleArrowCenter);

}

function gameOver() {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
	    scsleArrow = document.querySelector('#scsleArrow'),
	    rotateNum = 0;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	switch(parseInt(gameManager.CURRENT_ANSWER)) {

	case parseInt(gameManager.TOTAL_ANSWER_ARRAY[2]):
		rotateNum = 90;
		break;
	case parseInt(gameManager.TOTAL_ANSWER_ARRAY[3]):
		rotateNum = 180;
		break;
	case parseInt(gameManager.TOTAL_ANSWER_ARRAY[4]):
		rotateNum = 270;
		break;
	}

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseInOut(quad),
		step : function(delta) {
			scsleArrow.style.WebkitTransform = 'rotate(' + rotateNum * delta + 'deg)';
			scsleArrow.style.msTransform = 'rotate(' + rotateNum * delta + 'deg)';
			scsleArrow.style.transform = 'rotate(' + rotateNum * delta + 'deg)';
		}
	});
	
	streamSound.setSound('media/scale.mp3');

	setTimeout(function() {
		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');
		logCounter.tryCounter();
		logCounter.endTime();

		setTimeout(function() {
			log('excute stampStarIcon!');
			parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);
	}, 1100);

}



function setRand(min, max, number) {
	randResult = new Array();
	randList = new Array();
	for (var z = min; z <= max; z++) {
		randList.push(z);
	}
	for (var x = 0; x < number; x++) {
		getRand();
	}
	return randResult;
}

function getRand() {
	randNumber = Math.floor(Math.random() * randList.length);
	randResult.push(randList[randNumber]);
	randList.splice(randNumber, 1);
}

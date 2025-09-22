function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	var balanceContainer = document.querySelector('#balanceContainer');

	appendImageElement('answerObject', 'images/balancePlate_' + gameManager.fruitsType + '_' + gameManager.leftQuestionArray[1] + '.png', document.getElementById('rightContainer'));
	appendImageElement('balanceBar', 'images/balanceBar.png', balanceContainer);
	appendImageElement('balanceCenter', 'images/balanceCenter.png', balanceContainer);

	var balanceBar = document.querySelector('#balanceBar');
	balanceBar.style.WebkitTransform = 'rotate(-15deg)';
	balanceBar.style.msTransform = 'rotate(-15deg)';
	balanceBar.style.transform = 'rotate(-15deg)';

	var circleAnswer = document.querySelector('#answerObject');
	circleAnswer.setAttribute('style', 'top: 106px; left: 861px;');

	var leftQuestionBox = document.querySelector('#leftQuestionLine'),
	    leftMargin = [-98, 76];

	appendImageElement('leftQuestion_' + 0, 'images/balancePlate_' + gameManager.fruitsType + '_' + gameManager.leftQuestionArray[0] + '.png', leftQuestionBox);
	document.querySelector('#leftQuestion_' + 0).setAttribute('style', 'position: absolute; top: 69px; left: ' + leftMargin[0] + 'px;');

	var questionContainer = document.querySelector('#questionContainer');

	for (var j = 0; j < gameManager.choiceQuestion.length; j++) {
		var questionBack = document.createElement('div'),
		    questionPlate = document.createElement('img');
		questionPlate.src = "images/balances_plate.png";
		questionPlate.setAttribute('style', 'position:absolute; top:148px; left:20px; z-index:5; pointer-events:none ');
		questionBack.className = "questionBack";
		questionBack.appendChild(questionPlate);
		questionContainer.appendChild(questionBack);
		appendImageElement('questionObj_' + j, 'images/' + gameManager.fruitsType + '_' + gameManager.choiceQuestion[j] + '.png', questionBack);
		var questionObj = document.querySelector('#questionObj_' + j);
		questionBack.setAttribute('style', 'position: absolute; top:' + gameManager.choiceQuestionPositionBak[j][0] + 'px; left: ' + gameManager.choiceQuestionPositionBak[j][1] + 'px;');
		questionObj.setAttribute('style', 'position: absolute; top:' + gameManager.choiceQuestionPosition[j][0] + 'px; left: ' + gameManager.choiceQuestionPosition[j][1] + 'px;');

		questionObj.setAttribute('answerValue', gameManager.choiceQuestion[j]);
		new Dragdrop(questionObj);
	}

}

function gameOver(dragObj) {
	var questionContainer = document.querySelector('#questionContainer').childNodes;

	for (var i = 0; i < questionContainer.length; i++) {
		questionContainer[i].style.pointerEvents = "none";
	}

	var answer = parseInt(gameManager.leftQuestionArray[0]),
	    circleAnswer = document.querySelector('#answerObject');
	answerImg = document.createElement('img');

	answerImg.src = 'images/balancePlate_' + gameManager.fruitsType + '_' + answer + '.png';

	gameOverAnimation();

	streamSound.setSound('../../media/correct.mp3');

	var answerContainer = document.querySelector('#rightContainer'),

	    lineImg = document.querySelector('#rightQuestionLine');
	lineImg.src = 'images/balanceLine.png';
	lineImg.style.top = '-61px;';
	lineImg.setAttribute('style', 'position: absolute; left: 638px; top: -65px;');

	answerContainer.setAttribute('style', 'position: absolute; ');

	answerImg.style.position = 'absolute';
	answerImg.style.left = '540px';
	answerImg.style.top = '5px';
	answerContainer.appendChild(lineImg);
	answerContainer.appendChild(answerImg);

	document.querySelector('#balanceContainer').appendChild(answerContainer);

	circleAnswer.style.display = 'none';
	dragObj.style.display = 'none';

	var balanceBar = document.querySelector('#balanceBar'),
	    leftQuestionBox = document.querySelector('#leftQuestionLine'),
	    angle = -15,
	    top = 80,
	    leftBoxTop = -80,
	    leftBoxCurrentTop = 96;

	animate({
		delay : 20,
		duration : 400,
		delta : makeEaseOut(quad),
		step : function(delta) {

			answerContainer.style.top = ((top * delta)) + 'px';
			leftQuestionBox.style.top = ((leftBoxTop * delta) + leftBoxCurrentTop) + 'px';

			balanceBar.style.WebkitTransform = 'rotate(' + (angle) + 'deg)';
			balanceBar.style.msTransform = 'rotate(' + (angle) + 'deg)';
			balanceBar.style.transform = 'rotate(' + (angle) + 'deg)';

			if (angle < 0)
				angle++;
		}
	});

	logCounter.tryCounter();
	logCounter.endTime();
	
	setTimeout(function () {
		log('excute stampStarIcon!');
	    parent.window.stampStarIcon();
	}, 500);
	
	
	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);

}
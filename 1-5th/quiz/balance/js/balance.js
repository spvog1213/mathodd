function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	
	log('excute initClockTimer!');
    // parent.window.initClockTimer();

	var balanceContainer = document.querySelector('#balanceContainer');

	appendImageElement('answerObject', 'images/answerObj.png', document.getElementById('bgCanvas'));
	appendImageElement('balanceBar', 'images/balanceBar.png', balanceContainer);
	appendImageElement('balanceCenter', 'images/balanceCenter.png', balanceContainer);

	var balanceBar = document.querySelector('#balanceBar');
	balanceBar.style.WebkitTransform = 'rotate(-10deg)';
	balanceBar.style.msTransform = 'rotate(-10deg)';
	balanceBar.style.transform = 'rotate(-10deg)';

	var circleAnswer = document.querySelector('#answerObject');
	circleAnswer.setAttribute('style', 'top: 123px; left: 876px;');

	var answerContainer = document.getElementById("answerContainer"),
	    lineImg = document.createElement('img');
	lineImg.src = 'images/balanceLine.png';
	lineImg.setAttribute('style', 'position: absolute; left: 653px; top: -45px;');

	answerContainer.setAttribute('style', 'position: absolute; ');

	answerContainer.appendChild(lineImg);
	document.querySelector('#balanceContainer').appendChild(answerContainer);

	var leftQuestionBox = document.querySelector('#leftQuestionBox'),
	    leftQuestionBoxLine = document.createElement('img'),
	    leftMargin = [-86, 150];
	for (var i = 0; i < gameManager.leftQuestionArray.length; i++) {
		appendImageElement('leftQuestion_' + i, 'images/balancePlate_' + gameManager.fruitsType + '2_' + gameManager.leftQuestionArray[i] + '.png', leftQuestionBox);
		document.querySelector('#leftQuestion_' + i).setAttribute('style', 'position: absolute; top: 73px; left: ' + leftMargin[i] + 'px;');

	}

	leftQuestionBoxLine.setAttribute('id', 'leftQuestionBoxLine');
	leftQuestionBoxLine.src = "images/balanceSmalBarl_bar.png";
	leftQuestionBox.appendChild(leftQuestionBoxLine);
	var questionContainer = document.querySelector('#questionContainer');
	for (var j = 0; j < gameManager.choiceQuestion.length; j++) {
		appendImageElement('questionObj_' + j, 'images/balancePlate_' + gameManager.fruitsType + '_' + gameManager.choiceQuestion[j] + '.png', questionContainer);
		var questionObj = document.querySelector('#questionObj_' + j);
		questionObj.setAttribute('style', 'position: absolute; top:' + gameManager.choiceQuestionPosition[j][0] + 'px; left: ' + gameManager.choiceQuestionPosition[j][1] + 'px;');
		questionObj.setAttribute('answerValue', gameManager.choiceQuestion[j]);
		new Dragdrop(questionObj);
	}

	if (gameManager.leftQuestionArray[0] < gameManager.leftQuestionArray[1]) {
		leftQuestionBoxLine.style.WebkitTransform = 'rotate(7deg)';
		leftQuestionBoxLine.style.msTransform = 'rotate(7deg)';
		leftQuestionBoxLine.style.transform = 'rotate(7deg)';

		document.querySelector('#leftQuestion_0').style.top = "59px";
		document.querySelector('#leftQuestion_1').style.top = "89px";

	} else if (gameManager.leftQuestionArray[0] == gameManager.leftQuestionArray[1]) {
		leftQuestionBoxLine.style.WebkitTransform = 'rotate(0deg)';
		leftQuestionBoxLine.style.msTransform = 'rotate(0deg)';
		leftQuestionBoxLine.style.transform = 'rotate(0deg)';
	} else {
		leftQuestionBoxLine.style.WebkitTransform = 'rotate(-7deg)';
		leftQuestionBoxLine.style.msTransform = 'rotate(-7deg)';
		leftQuestionBoxLine.style.transform = 'rotate(-7deg)';

		document.querySelector('#leftQuestion_0').style.top = "89px";
		document.querySelector('#leftQuestion_1').style.top = "59px";
	}

}

function gameOver(dragObj) {

	var questionContainer = document.querySelector('#questionContainer').childNodes;

	for (var i = 0; i < questionContainer.length; i++) {
		questionContainer[i].style.pointerEvents = "none";
	}


	gameOverAnimation();

	streamSound.setSound('../../media/correct.mp3');

	var answerContainer = document.querySelector('#answerContainer');

	answerContainer.setAttribute('style', 'position: absolute; ');

	dragObj.style.left = '555px';
	dragObj.style.top = '22px';
	answerContainer.appendChild(dragObj);

	document.querySelector('#answerObject').style.display = 'none';
	var balanceBar = document.querySelector('#balanceBar'),
	    leftQuestionBox = document.querySelector('#leftQuestionBox'),
	    angle = -10,
	    top = 54,
	    leftBoxTop = -80,
	    leftBoxCurrentTop = 100;
	    

	animate({
		delay : 20,
		duration : 310,
		delta : makeEaseOut(quad),
		step : function(delta) {

			answerContainer.style.top = ((top * delta)) + 'px';

			leftQuestionBox.style.top = ((leftBoxTop * delta) + leftBoxCurrentTop) + 'px';

			balanceBar.style.WebkitTransform = 'rotate(' + (angle) + 'deg)';
			balanceBar.style.msTransform = 'rotate(' + (angle) + 'deg)';
			balanceBar.style.transform = 'rotate(' + (angle) + 'deg)';

			// dragObj.style.left = 830  + 'px';

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
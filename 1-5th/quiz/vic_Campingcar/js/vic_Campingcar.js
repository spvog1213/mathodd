function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var campingContainer = document.getElementById('campingContainer'),
	calculation = document.createElement('img'),
	calculation2 = document.createElement('img'),
	equal = document.createElement('img');

	appendImageElement('answerObject', 'images/campingcar_questionbox.png', campingContainer, 'campingAnswer');

	//Min, Max, Number
	setRand(1, 5, 4);

	gameManager.compingImgArray = ['images/campingcar_trailer_' + randResult[0] + '_1.png', 'images/campingcar_trailer_' + randResult[0] + '_1.png','images/campingcar_trailer_' + randResult[0] + '_2.png', 'images/campingcar_connect_' + randResult[0] + '.png'];
	gameManager.compingCarArray = ['images/campingcar_car_' + randResult[1] + '.png', 'images/campingcar_car_' + randResult[2] + '.png', 'images/campingcar_car_' + randResult[3] + '.png'];

	switch(gameManager.calculation) {
		case '+' :
		calculation.src = "images/plus.png";
		break;
		case '-' :
		calculation.src = "images/minus.png";
		break;
		case 'x' :
		calculation.src = "images/multiplication.png";
		break;
		case '/' :
		calculation.src = "images/division.png";
		break;
	}

	switch(gameManager.calculation2) {
		case '+' :
		calculation2.src = "images/plus.png";
		break;
		case '-' :
		calculation2.src = "images/minus.png";
		break;
		case 'x' :
		calculation2.src = "images/multiplication.png";
		break;
		case '/' :
		calculation2.src = "images/division.png";
		break;
	}


	equal.src = "images/equal.png";

	for (var i = 0; i < gameManager.campingTextArray.length; i++) {

		appendImageElement('comping_' + i, gameManager.compingImgArray[i], campingContainer, 'campingAnswer');

		appendImageElement('compingBar_' + i, gameManager.compingImgArray[3], campingContainer, 'campingBar');
		document.querySelector('#compingBar_' + i).setAttribute('style', 'top:' + (gameManager.compingPosition[i][0] + 40) + 'px; left:' + (gameManager.compingPosition[i][1] + 160) + 'px;');

		document.querySelector('#comping_' + i).setAttribute('style', 'top:' + gameManager.compingPosition[i][0] + 'px; left:' + gameManager.compingPosition[i][1] + 'px;');

		var compingText = document.createElement('div');

		compingText.innerHTML = gameManager.campingTextArray[i];
		compingText.className = 'compingText';

		if (i === 2) {
			compingText.setAttribute('style', 'top:' + (gameManager.compingPosition[i][0] + 32) + 'px; left:' + (gameManager.compingPosition[i][1] + 45) + 'px;');
			equal.setAttribute('style', 'position:absolute; top:' + (gameManager.compingPosition[i][0] + 40) + 'px; left:' + (gameManager.compingPosition[i][1] + 160) + 'px;');
		} else {
			calculation.setAttribute('style', 'position:absolute; top:' + (gameManager.compingPosition[i][0] + 40) + 'px; left:' + (gameManager.compingPosition[i][1] + 160) + 'px;');
			calculation2.setAttribute('style', 'position:absolute; top:' + (gameManager.compingPosition[i][0] + 40) + 'px; left:' + (gameManager.compingPosition[i][1] - 160) + 'px;');
			compingText.setAttribute('style', ' top:' + (gameManager.compingPosition[i][0] + 32) + 'px; left:' + (gameManager.compingPosition[i][1] + 25) + 'px;');
		}

		campingContainer.appendChild(compingText);
		campingContainer.appendChild(calculation);
		campingContainer.appendChild(calculation2);
		campingContainer.appendChild(equal);

	}

	var circleAnswer = document.querySelector('#answerObject');
	circleAnswer.setAttribute('style', 'top: 163px; left: 1008px;');

	appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.compingCarArray);

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

function gameOver(dragObj) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	gameOverAnimation();
	document.querySelector('#answerObject').style.display = 'none';

	var campingContainer = document.getElementById('campingContainer');
	campingContainer.style.left = '0px';

	var currentLeft = parseInt(campingContainer.style.left),
	dragObjCurrentLeft = parseInt(dragObj.style.left),
	left = 1500;

	streamSound.setSound('media/campingcar.mp3');
	setTimeout(function() {
		animate({
			delay : 20,
			duration : 2000,
			delta : makeEaseInOut(quad),
			step : function(delta) {
				campingContainer.style.left = ((left * delta) + currentLeft) + 'px';
				dragObj.style.left = ((left * delta) + dragObjCurrentLeft) + 'px';
			}
		});

	}, 500);

	logCounter.tryCounter();
	logCounter.endTime();

	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 900);
	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 2300);

}

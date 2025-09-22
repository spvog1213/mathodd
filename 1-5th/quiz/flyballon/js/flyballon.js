
function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
    // parent.window.initClockTimer();

    var ballonBlank = parseInt(Math.random() * 2),
    ballonContainer = document.getElementById('ballonContainer');

    //Min, Max, Number
    setRand(1, 7, 7);

    gameManager.ballonImgArray = ['images/flyballoon_balloon_' + randResult[0] + '.png', 'images/flyballoon_balloon_' + randResult[0] + '.png', 'images/flyballoon_balloon_' + randResult[0] + '.png'];
    gameManager.ansImgArray = ['images/flyballoon_balloon_' + randResult[1] + '.png', 'images/flyballoon_balloon_' + randResult[2] + '.png', 'images/flyballoon_balloon_' + randResult[3] + '.png', 'images/flyballoon_balloon_' + randResult[4] + '.png'];

    appendImageElement('answerObject', 'images/flyballoon_balloon_question_' + ballonBlank + '.png', ballonContainer, 'ballonAnswer');
    appendImageElement('ballonHead', 'images/flyballoon_basket.png', ballonContainer);


    for (var i = 0; i < gameManager.ballonTextArray.length; i++) {
    	appendImageElement('ballon_' + i, gameManager.ansImgArray[i], ballonContainer, 'ballonAnswer');

    	document.querySelector('#ballon_' + i).setAttribute('style', 'top:' + gameManager.ballonPosition[i][0] + 'px; left:' + gameManager.ballonPosition[i][1] + 'px;');

    	var ballonText = document.createElement('div');

    	ballonText.innerHTML = gameManager.ballonTextArray[i];
    	ballonText.className = 'ballonText';
    	ballonText.setAttribute('style', 'top:' + (gameManager.ballonPosition[i][0] + 50) + 'px; left:' + (gameManager.ballonPosition[i][1]) + 'px;');

    	ballonContainer.appendChild(ballonText);

    }

    switch (gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length - 1]) {
    	case 'A' :
    	var circleAnswer = document.querySelector('#answerObject');
    	circleAnswer.setAttribute('style', 'top: 100px; left: 412px;');
    	break;
    	case 'B' :
    	var circleAnswer = document.querySelector('#answerObject');
    	circleAnswer.setAttribute('style', 'top: 142px; left: 677px;');
    	break;
    }

    appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.ballonImgArray);

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

function gameOver (dragObj) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

		streamSound.setSound('../../media/correct.mp3');	

	document.querySelector('#answerObject').style.display = 'none';
	
	
	
	var ballonContainer = document.getElementById('ballonContainer');
	ballonContainer.style.top = '0px';
	ballonContainer.style.left = '0px';

	var currentTop = parseInt(ballonContainer.style.top),
	currentLeft = parseInt(ballonContainer.style.left),
	dragObjCurrentTop = parseInt(dragObj.style.top),
	dragObjCurrentLeft = parseInt(dragObj.style.left),
	top = -1000,
	left = 200;	

	setTimeout(function () {
		animate({
			delay: 20,
			duration: 2000,
			delta: makeEaseInOut(quad), 
			step: function (delta) {
				ballonContainer.style.top = ((top * delta) + currentTop)  + 'px';	
				ballonContainer.style.left = ((left * delta) + currentLeft)  + 'px';	
				dragObj.style.top = ((top * delta) + dragObjCurrentTop)  + 'px';	
				dragObj.style.left = ((left * delta) + dragObjCurrentLeft)  + 'px';	
			}
		});
	}, 500);

	logCounter.tryCounter();
	clearInterval(countTimer);
	logCounter.endTime();
	gameOverAnimation();

	// setTimeout(function () {
	// 	log('excute stampStarIcon!');
	//     parent.window.stampStarIcon();
	// }, 500);
	// // save log data 
	// setTimeout(function () {
	// 	log('excute insDrillHis!');
	//     parent.window.insDrillHis(logCounter.submitReport());
	// }, 2200);
}

function ballonIncorrect() {
	streamSound.setSound('../../media/incorrect.mp3');
}



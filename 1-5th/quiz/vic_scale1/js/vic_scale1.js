function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	
	setRand(1, 5, 5)
    gameManager.choiceBgImgArray = ['images/vic_scale_ball_'+ randResult[0]+ '.png', 'images/vic_scale_ball_'+ randResult[1]+ '.png', 'images/vic_scale_ball_'+ randResult[2]+ '.png', 'images/vic_scale_ball_'+ randResult[3]+ '.png'];
    appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.choiceBgImgArray);

    appendCircleElement('scaleContainer', 'scale', bgCanvas);
    appendImageElement('scaleBg', 'images/vic_scale_scale2.png', scaleContainer);

}

function answerObject() {
	appendCircleElement('answerBox1', 'answerAll', document.getElementById('bgCanvas'));
	appendCircleElement('answerBox2', 'answerAll', document.getElementById('bgCanvas'));
    appendCircleElement('answerObject_1', 'circle', document.getElementById('bgCanvas'));
    appendCircleElement('answerObject_2', 'circle', document.getElementById('bgCanvas'));

    answerObject_1.setAttribute('style', 'top:140px; left: 207px;');
	answerObject_2.setAttribute('style', 'top:140px; left: 473px;');

	answerObject_1.setAttribute('candleValue', gameManager.CURRENT_ANSWER[0]);
	answerObject_2.setAttribute('candleValue', gameManager.CURRENT_ANSWER[1]);

	appendCircleElement('queTxt', 'circle', document.getElementById('bgCanvas'));
	queTxt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length-1] + ' 만들기';
	appendCircleElement('answerTxt', 'circle', document.getElementById('bgCanvas'));
	answerTxt.innerHTML = '0';
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

	function getRand(dragObj) {
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
	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);


	streamSound.setSound('../../media/correct.mp3');

	setTimeout(function() {
		log('excute stampStarIcon!');
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);
}


function scaleCompareAnswer(dragObj) {
	var answerValues = parseInt(dragObj.getAttribute('answerValue'));
		choiceQuestionContainer = document.querySelector('#choiceQuestionContainer'),
		answerTxt = document.querySelector('#answerTxt');
		
		answerTxt.innerHTML = dragObj.getAttribute('answervalue');
		if(gameManager.CURRENT_ANSWER[0] === answerValues || gameManager.CURRENT_ANSWER[1] === answerValues){
			dragObj.className += ' correct';
		}else{
			dragObj.className += ' incorrect';
		}

		var correct = document.querySelectorAll('.correct'),
			incorrect = document.querySelectorAll('.incorrect');

		if (correct.length === gameManager.CURRENT_ANSWER.length) {
			answerTxt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length-1];
			setTimeout(function(){
				gameOver(dragObj);
			},400);
		}


		if((incorrect.length === 1 && correct.length === 1) || (incorrect.length > 1 && correct.length < 1)){

				logCounter.tryCounter();

				var answerAll = document.querySelector('.answerAll'),
					answer1  = answerBox1.childNodes[0],
					answer2  = answerBox2.childNodes[0];	

				answerTxt.innerHTML = parseInt(answer1.getAttribute('answervalue')) + parseInt(answer2.getAttribute('answervalue'));

				setTimeout(function(){
					incorrectAnimation(answer1);
					incorrectAnimation(answer2);

					choiceQuestionContainer.appendChild(answer1);
					choiceQuestionContainer.appendChild(answer2);

					answer1.setAttribute('style','pointer-evets: auto; margin-left: 0px; display:none;');
					answer2.setAttribute('style','pointer-evets: auto; margin-left: 0px; display:none;');

					answer1.className = 'circle';
					answer2.className = 'circle';

					answerTxt.innerHTML = '0';
				},400)


				setTimeout(function(){
					answer1.style.display = 'block';
					answer2.style.display = 'block';
					streamSound.setSound('../../media/incorrect.mp3');
				},450)


		}
}


function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	appendChoiceQuestion('click', gameManager.choiceQuestion);
}
function initlock() {
	appendCircleElement('answer1','answer', bgCanvas);
	appendCircleElement('answer2','answer', bgCanvas);
	appendCircleElement('answer3','answer', bgCanvas);
	appendCircleElement('txt','answer', bgCanvas);
	appendImageElement('lockOri', 'images/lock_lock.png', bgCanvas);

	txt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[6];
	answer1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	answer2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
	answer3.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[2];
}

function gameOver(currentObj) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	
	gameOverAnimation();
	streamSound.setSound('media/lock.mp3');
	lockOri.setAttribute('src', 'images/lock_open.png');

	document.querySelector('#currentQuestion').setAttribute('style', 'display:block; top:' + (currentObj.offsetTop + 20) + 'px; left:' + (currentObj.offsetLeft + 80) + 'px;');
	logCounter.tryCounter();
	logCounter.endTime();
	// setTimeout(function() {
	// log('excute stampStarIcon!');
	// parent.window.stampStarIcon();
	// }, 500);
	// // save log data
	// setTimeout(function() {
	// log('excute insDrillHis!');
	// parent.window.insDrillHis(logCounter.submitReport());
	// }, 1800);
}

function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

    gameManager.choiceBgImgArray = ['images/vic_squirrel_acorn.png', 'images/vic_squirrel_acorn.png', 'images/vic_squirrel_acorn.png', 'images/vic_squirrel_acorn.png'];
    appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.choiceBgImgArray);

    appendCircleElement('answerObject_1', 'circle', document.getElementById('bgCanvas'));
    appendCircleElement('answerObject_2', 'circle', document.getElementById('bgCanvas'));

    answerObject_1.setAttribute('style', 'top:389px; left: 643px;');
	answerObject_2.setAttribute('style', 'top:586px; left: 643px;');

	answerObject_1.setAttribute('candleValue', gameManager.CURRENT_ANSWER[0]);
	answerObject_2.setAttribute('candleValue', gameManager.CURRENT_ANSWER[1]);
}

function squirrelInit(){
	var choiceQuestionGroup_1 = document.querySelector('#choiceQuestionGroup_1');
	appendCircleElement('treeContainer', 'tree', bgCanvas);
	appendImageElement('squirrel', 'images/vic_squirrel_squirrel.png', bgCanvas);
	appendImageElement('shareTextImg', 'images/vic_squirrel_text_1.png', treeContainer,'TextImg');
	appendImageElement('remainderTextImg', 'images/vic_squirrel_text_2.png', treeContainer,'TextImg');

	shareTextImg.setAttribute('style','top: 337px; left: 427px;');
	remainderTextImg.setAttribute('style','top: 530px; left: 389px;');

	appendCircleElement('queTextWrap', 'queTextWrap', treeContainer);
	for(var i = 0; i < 3; i++){
		appendCircleElement('quetxt', 'txt', queTextWrap);
	}
	quetxt[0].innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	appendImageElement('division', 'images/division.png', quetxt[1]);
	quetxt[2].innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
}

function gameOver(dragObj) {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	
	correctAnimation();
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

function correctAnimation(){
	var squirrel = document.querySelector('#squirrel');

	correctArray = ['images/vic_squirrel_success_1.png','images/vic_squirrel_success_1.png','images/vic_squirrel_success_2.png','images/vic_squirrel_success_2.png'];
	spriteAnimationCustom(correctArray, squirrel);
}
function inCorrectAnimation(){
	var squirrel = document.querySelector('#squirrel');

	inCorrectArray = ['images/vic_squirrel_fail_1.png','images/vic_squirrel_fail_1.png','images/vic_squirrel_fail_2.png','images/vic_squirrel_fail_2.png'];
	spriteAnimationCustom(inCorrectArray, squirrel);

	setTimeout(function(){
		squirrel.src = 'images/vic_squirrel_squirrel.png';
	},600)
}


function busStopCompareAnswer(dragObj, arrayNum) {
	dragObj.className += ' correct';
	var correct = document.querySelectorAll('.correct');

	if (correct.length === gameManager.CURRENT_ANSWER.length) {
		setTimeout(function(){
			gameOver(dragObj);
		},400);
	}
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

function returnCurrentObj(dragObj) {
	var answerValue = dragObj.getAttribute('answerValue');

	for (var i = 1; i < gameManager.CURRENT_ANSWER.length+1; i++) {
		if (answerValue === document.querySelector('#answerObject_' + i).getAttribute('candleValue')) {
			return document.querySelector('#answerObject_' + i);
		}
	}
}


function spriteAnimationCustom(spriteArray, spriteObj) {
	var index = 0,
	durationAni = parseInt(spriteArray.length - 1) * 100;

	animate({
		delay : 100,
		duration : durationAni,
		delta : makeEaseOut(quad),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}

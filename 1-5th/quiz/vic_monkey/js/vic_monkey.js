function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var monkeyContainer = document.getElementById('monkeyContainer');
	appendCircleElement('answerObject1', 'circle',monkeyContainer);
	appendCircleElement('answerObject2', 'circle',monkeyContainer);
	appendCircleElement('treeWrap', 'tree', monkeyContainer);
	appendCircleElement('multipleWrap', 'multipleWrap', monkeyContainer);

	answerObject1.setAttribute('style', 'top:229px; left: 671px');
	answerObject2.setAttribute('style', 'top:229px; left: 950px');
	answerObject1.setAttribute('candleValue',gameManager.CURRENT_ANSWER[0]);
	answerObject2.setAttribute('candleValue',gameManager.CURRENT_ANSWER[1]);

	for (var i = 0; i < gameManager.trainTextArray.length; i++) {
		appendCircleElement('banana_' +i, 'banana', monkeyContainer);
		var bananaText = document.querySelector('#banana_' + i);
		bananaText.setAttribute('style', 'top:' + (gameManager.trainPosition[i][0]) + 'px; left:' + gameManager.trainPosition[i][1] + 'px;');
		bananaText.innerHTML = gameManager.trainTextArray[i];
	}
	for (var z= 0; z< 4; z++){
		appendCircleElement('tree', 'tree', treeWrap);
		var tree = document.querySelector('#tree');
		tree.setAttribute('style', 'top:' + (gameManager.trainPosition[i][0]) + 'px; left:' + gameManager.trainPosition[i][1] + 'px;');
	};

	for (var a = 0; a < 3; a++){
		appendCircleElement('multiple', 'multipleTxt', multipleWrap);
		var multiple = document.querySelectorAll('#multiple');
		multiple[a].innerHTML = gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length-1];
	}

	gameManager.bananaImgArray = ['images/vic_monkey_banana.png','images/vic_monkey_banana.png','images/vic_monkey_banana.png'];
	appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.bananaImgArray);
}

function initMonkey(){
	appendCircleElement('monkeywrap', 'monkeywrap', bgCanvas);
	monkeywrap.setAttribute('style','position: absolute; left: 239px; top: 237px; z-index: 11;');
	appendImageElement('monkeyMotion', 'images/vic_monkey_monkey.png', monkeywrap);

}



function monkeyCorrectMotion() {
	var monkeyMotion = document.querySelector('#monkeyMotion');

	successArray = ['images/vic_monkey_success1.png','images/vic_monkey_success2.png','images/vic_monkey_success1.png','images/vic_monkey_success2.png'];
	spriteAnimation(successArray, monkeyMotion);
}

function monkeyIncorrectMotion() {
	var monkeyMotion = document.querySelector('#monkeyMotion');
		monkeyMotion.src = 'images/vic_monkey_fail.png';

		setTimeout(function(){
			monkeyMotion.src = 'images/vic_monkey_monkey.png';
		},700)
}

function monkyLeftMotionAnimate(leftValue, time) {
	var monkey = document.querySelector('#monkeywrap'),
		monkeyLeft = monkey.offsetLeft;

	setTimeout(function(){
		monkey.style.left = (monkeyLeft + leftValue) + 'px';
		
	},time)


}

function monkyDisplayMotionAnimate(countChild, time) {
	var multipleWrap = document.querySelector('#multipleWrap');

	setTimeout(function(){
		multipleWrap.childNodes[countChild].style.display = 'inline-block';
	},time)

	
}

function spriteAnimation(spriteArray, spriteObj) {
	var index = 0;
	animate({
		delay : 200,
		duration : 800,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}

function gameOver(dragObj) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	// setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
	// },40);	

	monkeyCorrectMotion();
	gameOverAnimation();
	// setTimeout(function() {
	// 	log('excute stampStarIcon!');
	// 	parent.window.stampStarIcon();
	// }, 500);

	// save log data
	// setTimeout(function() {
	// 	log('excute insDrillHis!');
	// 	parent.window.insDrillHis(logCounter.submitReport());
	// }, 2300);

}

function startBtn() {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

    var flag = true;

	appendImageElement('startBtn', 'images/start_btn.png',bgCanvas);
	var startBtn = document.querySelector('#startBtn');

	btnDown = function(e) {
		e.preventDefault();
	}
	btnUp = function(e) {
		e.preventDefault();
		startBtn.src = 'images/start_btn.png';

		log('excute initClockTimer!');
		// parent.window.initClockTimer();

		if (flag) {
		setTimeout(function(){
			for (var i = 0; i < choiceQuestionContainer.length; i++) {
				choiceQuestionContainer[i].style.pointerEvents = "auto";
			};
		},2100)

		for(var a = 1; a < 4; a++){
					monkyLeftMotionAnimate((280*a),(450*a));
					monkyDisplayMotionAnimate((a-1),(550*a));
				}

				streamSound.setSound('media/vic_monkey.mp3');

		flag = false;
		startBtn.setAttribute('style', 'cursor:default; display: none;');
		}
	}

	startBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	startBtn.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);

}



var count=0;

function contrastAnswer(dragObj) {
	var answerObj1 = document.querySelector('#answerObject1'),
	answerObj2 = document.querySelector('#answerObject2');

	counting();

	if (count === gameManager.CURRENT_ANSWER.length) {
		if (gameManager.CURRENT_ANSWER[0] === parseInt(answerObj1.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[1] === parseInt(answerObj2.getAttribute('answerValue'))) {
			log('@ correct!!');

			setTimeout(function() {
				gameOver(dragObj);
			},10)

		} else {
			log('@ incorrect!!');
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');
			logCounter.tryCounter();
		}
	}
}
function counting() {
	count++;
}



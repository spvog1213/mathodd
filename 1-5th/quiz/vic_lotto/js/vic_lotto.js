function initScene() {
	log('initScene...');

	// appendCircleElement('lotto_bg','lotto_bg', bgCanvas);
	appendImageElement('lotto_bg', 'images/lotto_cap_0.png',bgCanvas);
	appendCircleElement('lotto_tray','lotto_tray', bgCanvas);
	appendCircleElement('question','question', bgCanvas);
	appendCircleElement('queText','ballBox', question);
	queText.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length-1];

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
			streamSound.setSound('media/lotto.mp3');
			lottoMotion();
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

function lottoMotion() {
	var lotto_bg = document.querySelector('#lotto_bg');
	spriteArray = ['images/lotto_cap_0.png', 'images/lotto_cap_1.png', 'images/lotto_cap_2.png', 'images/lotto_cap_3.png', 'images/lotto_cap_0.png', 'images/lotto_cap_0.png', 'images/lotto_cap_1.png', 'images/lotto_cap_2.png', 'images/lotto_cap_3.png', 'images/lotto_cap_0.png'];
	spriteAnimation(spriteArray, lotto_bg);

	setTimeout(function() {
		result();

		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[i].style.pointerEvents = "auto";
		}

	}, 1300);
}

function result(){
	appendCircleElement('fisthandBox','fisthandBox', bgCanvas);

	setRand(1, 4, 6);
	gameManager.ansImgArray = ['images/lotto_ball_' + randResult[0] + '.png', 'images/lotto_ball_' + randResult[1] + '.png', 'images/lotto_ball_' + randResult[2] + '.png', 'images/lotto_ball_' + randResult[3] + '.png'];

	for (var i = 0; i < 3; i++) {
		appendCircleElement('ballBox_' +i,'ballBox', fisthandBox);
		var ballBox = document.querySelector('#ballBox_'+ i);
		ballBox.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[i];
		appendImageElement('ball_' + i, gameManager.ansImgArray[i], ballBox, 'balls');
	}

	setTimeout(function() {
		animate({
			delay : 10,
			duration : 200,
			delta : makeEaseOut(quad),
			step : function(delta) {
				var fisthandBox = document.querySelector('#fisthandBox').childNodes;
				for(var a = 0; a < fisthandBox.length; a++){
					var ballBoxs = document.querySelector('#ballBox_' + a);
					ballBoxs.style.top = (160 * delta) + 'px';
					fisthandBox[0].style.position = 'relative'
					fisthandBox[0].style.left = (-125 * delta) + 'px';
					fisthandBox[2].style.left = (125 * delta) + 'px';
				}
			}
		});
	}, 100);


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

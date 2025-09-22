function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject', 'questionbox', document.getElementById('bgCanvas'));
	appendImageElement('goalpost', 'images/basketball_goalpost_0.png', document.getElementById('panel'), 'goalpost');
	appendImageElement('ball', 'images/basketball_ball.png', document.getElementById('bgCanvas'), 'basketball');
	appendCircleElement('question1', 'question', document.getElementById('panel'));
	appendCircleElement('question2', 'question', document.getElementById('panel'));

	appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.choiceQuestionImg);

}

function initBasketball() {
	log('initBasketball...');

	var Question1 = document.querySelector('#question1'),
	    Question2 = document.querySelector('#question2'),
	    circleAnswer = document.querySelector('#answerObject'),
	    basketball = document.querySelector('#ball');

	circleAnswer.setAttribute('style', 'top:130px; left: 605px;');
	Question1.setAttribute('style', 'top:64px; left: 83px;');
	Question2.setAttribute('style', 'top:64px; left: 428px;');
	// basketball.setAttribute('style', 'top:-10px; left: 600px; display:none;  z-index:4');
	basketball.setAttribute('style', 'top:200px; left: 600px; display:none;  z-index:4');

	Question1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	Question2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];

}

function gameOver(dragObj) {

	var dragObjId = dragObj.id;
	dragObjId = dragObjId.split('_');
	dragObjId = parseInt(dragObjId.slice(dragObjId.length - 1));


	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
	    basketball = document.querySelector('#ball'),
	    goalpost = document.querySelector('#goalpost'),
	    symbol = document.createElement('img'),
	    spriteArray = ['images/basketball_goalpost_0.png', 'images/basketball_goalpost_1.png', 'images/basketball_goalpost_2.png', 'images/basketball_goalpost_3.png', 'images/basketball_goalpost_4.png'],
	    top = 580,
	    currentTop = 100;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.display = "none";
	}

	symbol.src = 'images/basketball_questionbox_symbol_' + dragObjId + '.png';

	answerObject.appendChild(symbol);

	basketball.style.display = "block";
	streamSound.setSound('media/basketball.mp3');
	setTimeout(function() {

		spriteAnimationCustom(spriteArray, goalpost);

		animate({
			delay : 20,
			duration : 320,
			delta : makeEaseInOut(linear),
			step : function(delta) {
				basketball.style.top = ((currentTop) + ((-currentTop + top)* delta)) + 'px';
				// basketball.style.top = (top * delta) + 'px';
			}
		});
	}, 10);
	

	setTimeout(function() {
		animate({
			delay : 20,
			duration : 1300,
			delta : makeEaseOut(elastic),
			step : function(delta) {
				// basketball.style.top = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
				basketball.style.top = ((currentTop * delta) + ((-currentTop + top))) + 'px';
			}
		});
	}, 350);

	setTimeout(function() {
		logCounter.tryCounter();
		logCounter.endTime();
		clearInterval(countTimer);
		gameOverAnimation();
		
		streamSound.setSound('media/basketball_correct.mp3');

		setTimeout(function() {
			log('excute stampStarIcon!');
			parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);
	}, 1200);
}

function ballCompareAnswer(dragObj) {
	log(dragObj.getAttribute('answerValue'));

	if (gameManager.CURRENT_ANSWER[0] === dragObj.getAttribute('answerValue')) {
		//getAttribute = 요소의 클래스 속성의 값을 가져옴
		//parseInt = 문자열을 구문 분석하고 정수를 반환합니다.

		log('@ correct!!');
		gameOver(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');

		logCounter.tryCounter();
	}
}

function spriteAnimationCustom(spriteArray, spriteObj) {

	var index = 0,
	    durationAni = parseInt(spriteArray.length - 2) * 100;

	animate({
		delay : 70,
		duration : durationAni,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}

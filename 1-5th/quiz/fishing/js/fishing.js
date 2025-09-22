function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log('excute initClockTimer!');
	parent.window.initClockTimer();

	appendImageElement('answerObject', 'images/float.png', document.getElementById('bgCanvas'), 'float');

	var circleAnswer = document.querySelector('#answerObject');
	circleAnswer.setAttribute('style', 'top:330px; left: 255px;');

	appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.fishImgArray);

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[0].setAttribute('answerValue2',gameManager.TOTAL_ANSWER_ARRAY[1]);
		choiceQuestionContainer[1].setAttribute('answerValue2',gameManager.TOTAL_ANSWER_ARRAY[2]);
		choiceQuestionContainer[2].setAttribute('answerValue2',gameManager.TOTAL_ANSWER_ARRAY[3]);

	}
}

function initObject(fruitsCounter) {
	log('initObject...');

	var fisherElement = document.getElementById('fisher'),
	    fishNumber = document.createElement('div');

	fishNumber.innerHTML = convertNumber(gameManager.TOTAL_ANSWER_ARRAY[0]);
	fishNumber.setAttribute('id', 'fishNumber');
	fisherElement.appendChild(fishNumber);

	appendImageElement('boat', 'images/boat.png', fisherElement);
	appendImageElement('cat', 'images/cat_idle.png', fisherElement);
	appendImageElement('basket_front', 'images/basket_front.png', fisherElement);
	appendImageElement('basket_back', 'images/basket_back.png', fisherElement);

	addIdleAnimation(2000, 12, 2, fisherElement, 190);

}

function gameOver() {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	var spriteArray = ['images/cat_success_01.png', 'images/cat_success_02.png', 'images/cat_success_03.png', 'images/cat_success_04.png'];

	spriteAnimation(spriteArray, document.querySelector('#cat'));

	document.querySelector('#answerObject').style.display = 'none';

	setTimeout(function() {
		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');
		logCounter.tryCounter();
		logCounter.endTime();
		
		setTimeout(function() {
			log('excute stampStarIcon!');
			parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);
	}, 1400);

}

function finishAnimation(currentFish) {

	streamSound.setSound('media/fishingStart.mp3');

	currentFish.style.zIndex = 1;

	var currentTop = parseInt(currentFish.style.top.replace('px', '')) + 200,
	    currentLeft = parseInt(currentFish.style.left.replace('px', '')) - 100,
	    top = -180,
	    left = 120,
	    lastTop = 75;

	currentFish.style.WebkitTransform = 'rotate(90deg)';
	currentFish.style.msTransform = 'rotate(90deg)';
	currentFish.style.transform = 'rotate(90deg)';

	animate({
		delay : 20,
		duration : 400,
		delta : makeEaseInOut(quad),
		step : function(delta) {
			currentFish.style.top = ((-currentTop * delta) + ((currentTop + top))) + 'px';
		}
	});

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseInOut(quad),
		step : function(delta) {
			currentFish.style.left = ((currentLeft * delta) + ((currentLeft + left))) + 'px';
		}
	});

	setTimeout(function() {
		var currentTopLast = parseInt(currentFish.style.top.replace('px', '')) + -250;
		currentFish.style.WebkitTransform = 'rotate(-90deg)';
		currentFish.style.msTransform = 'rotate(-90deg)';
		currentFish.style.transform = 'rotate(-90deg)';

		animate({
			delay : 20,
			duration : 500,
			delta : makeEaseInOut(bounce),
			step : function(delta) {
				currentFish.style.top = ((-currentTopLast * delta) + ((currentTopLast + lastTop))) + 'px';
			}
		});

		animate({
			delay : 20,
			duration : 400,
			delta : makeEaseOut(quad),
			step : function(delta) {
				currentFish.style.left = ((currentLeft * delta) + ((currentLeft + (left + 330)))) + 'px';
			}
		});

	}, 800);
}


function compareAnswer(dragObj) {
	log(dragObj.getAttribute('answerValue'));

	var answer1 = dragObj.getAttribute('answerValue'),
		answer2 = dragObj.getAttribute('answerValue2');

	if (gameManager.CURRENT_ANSWER[0] == answer2 || gameManager.CURRENT_ANSWER[0] == answer1) {
		//getAttribute = 요소의 클래스 속성의 값을 가져옴
		//parseInt = 문자열을 구문 분석하고 정수를 반환합니다.

		log('@ correct!!');
		gameOver(dragObj);
		finishAnimation(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');



		var spriteArray = ['images/cat_fail_01.png', 'images/cat_fail_02.png', 'images/cat_fail_03.png', 'images/cat_fail_03.png'],
		    cat = document.querySelector('#cat');
		spriteAnimation(spriteArray, cat);

		setTimeout(function() {
			spriteArray = ['images/cat_fail_03.png', 'images/cat_fail_02.png', 'images/cat_fail_01.png', 'images/cat_idle.png'];
			spriteAnimation(spriteArray, cat);
		}, 500);

		logCounter.tryCounter();
	}
}



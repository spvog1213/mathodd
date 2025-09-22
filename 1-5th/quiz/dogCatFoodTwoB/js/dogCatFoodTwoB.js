function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'circle', document.getElementById('back1'));

	appendImageElement('foodhouse', 'images/dogfood_house.png', bgCanvas);
	appendImageElement('foodShadow', 'images/dogfood_1.png', bgCanvas);

	var circleAnswer = document.querySelector('#answerObject');
	circleAnswer.setAttribute('style', 'top:600px; left: 310px;');
	foodhouse.setAttribute('style','position:absolute; top:80px; left:190px;');

	appendChoiceQuestion('drag', gameManager.choiceQuestion);


}

function initBead(frogBg) {
	log('initBead...');

	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	Question1 = document.querySelector('#question1'),
	back1 = document.querySelector('#back1'),

	frogBg = document.createElement('img');
	frogBg.setAttribute('id','frogBg');
	frogBg.src = 'images/dogfood_1.png';

	

	back1.setAttribute('style', 'top:600px; left: 312px; z-index:10;');

	foodShadow.setAttribute('style', 'position:absolute; top: 40%; left:355px;');

	frogBg.setAttribute('style', 'top: 40%; left:355px;');

	bgCanvas.appendChild(frogBg);
	Question1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[3];
}

function gameOver(dragObj, x, y) {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	dragObj.setAttribute('style','top:560px; left:345px;');

	// bgCanvas.removeChild(answerObject);

	bgCanvas.removeChild(frogBg);

	setTimeout(function() {
		bgCanvas.removeChild(foodShadow);
	}, 180);
	
	
	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	streamSound.setSound('media/dogfood_dog_success.mp3');

	setTimeout(function() {
		// streamSound.setSound('../../media/correct.mp3');
		gameOverAnimation();
	}, 500)

	setTimeout(function() {
		log('excute stampStarIcon!');
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);


}

function createObject(index, right, parentObjSrc, numContainer) {
	var parentObj = document.createElement('img'),
	numContainer =
	numContainer;

	parentObj.src = parentObjSrc;
	parentObj.className = "bead";
	parentObj.setAttribute('style', 'padding-top: 0px; padding-right : ' + (right / 0) + 'px;');

	document.getElementById(numContainer).appendChild(parentObj);

}

function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	line = document.createElement('div'),
	choiceLeft = 1010;
	choiceTop = 0;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceTop = 240;
		break;
		case 2 :
		choiceTop = 150;
		break;
		case 3 :
		choiceTop = -200;
		break;
		case 4 :
		choiceTop = -50;
		break;
		case 5 :
		choiceTop = -150;
		break;
	}

	choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');
	bgCanvas.appendChild(choiceQuestionContainer);

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var currentQuestion;
		if (imgSrcArray) {

			var choiceQuestionGroup = document.createElement('div'),
			className = imgSrcArray[0].split('/');
			className = className[className.length - 1];
			className = className.split('_');

			choiceQuestionGroup.setAttribute('id', 'choiceQuestionGroup_' + i);
			choiceQuestionContainer.appendChild(choiceQuestionGroup);


			log(imgIndex);
			appendImageElement('choiceQuestion_' + i, imgSrcArray[0], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);


		}

		choiceTop = choiceTop + 250;

		currentQuestion.setAttribute('style', 'top:'+ choiceTop + 'px; left:' + choiceLeft + 'px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestion[i];
			choiceQuestionGroup.appendChild(imgObjText);



		} else {
			var imgObjText = document.createElement('div');
			fountainText = document.createElement('div'),
			mixedFractionText = document.createElement('div'),
			fountainLine = document.createElement('div'),
			choiceQuestionAllBox = document.createElement('div');

			choiceQuestionAllBox.id = 'choiceQuestionAllBox'; 

			// 대분수
			mixedFractionText.setAttribute('id','fountainText_' + i);
			mixedFractionText.className = 'mixedFraction';
			mixedFractionText.setAttribute('style','position:absolute;top: 0px; left: 12px; font-size:40px;');
			mixedFractionText.innerHTML = gameManager.choiceQuestion[i][0];

			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = 'Text';
			imgObjText.setAttribute('style', 'position:absolute; top: -24px; left: 25px; width: 67px; font-size:40px;');
			imgObjText.innerHTML = gameManager.choiceQuestion[i][1];

			fountainText.setAttribute('id','fountainText_' + i);
			fountainText.className = 'fountain';
			fountainText.setAttribute('style','position:absolute; top: 22px; left: 25px; width:67px; font-size:40px;');
			fountainText.innerHTML = gameManager.choiceQuestion[i][2];

			fountainLine.setAttribute('id','fountainLine');
			fountainLine.className = 'fountainLine';
			fountainLine.innerHTML = '-----';

			if(gameManager.choiceQuestion[i][2].toString().length === 1){
				fountainLine.setAttribute('style','position:absolute; top: 0px; left: 34px; letter-spacing:-10px');
			}else{
				fountainLine.setAttribute('style','position:absolute; top: 0px; left: 30px; letter-spacing:-8px');
			}

			// currentQuestion.appendChild(choiceQuestionAllBox);

			if(gameManager.choiceQuestion[i][0] === 0){
				choiceQuestionAllBox.setAttribute('style','position:absolute; top:0px; left:60px; width:120px; height:125px;');
			}else{
				choiceQuestionAllBox.appendChild(mixedFractionText); //대분수
				choiceQuestionAllBox.setAttribute('style','position:absolute; top:0px; left:65px; width:120px; height:125px;');
			}

			choiceQuestionAllBox.appendChild(imgObjText);
			choiceQuestionAllBox.appendChild(fountainText);
			choiceQuestionAllBox.appendChild(fountainLine);

			currentQuestion.appendChild(choiceQuestionAllBox);
		}

		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
		
		if (buttonType === 'drag') {

			new Dragdrop(currentQuestion);

		} else {
			currentQuestion.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareFoodAnswer(this);
			}, false);
		}
	}
}


function frogMotioncorrect() {
	var frogMotion = document.querySelector('#frogBg');
	frogMotion = document.createElement('img');

	spriteArray = ['images/dogfood_1_success_1.png', 'images/dogfood_1_success_2.png', 'images/dogfood_1_success_3.png', 'images/dogfood_1_success_4.png'];
	frogMotion.setAttribute('id', 'frogMotion');

	frogMotion.setAttribute('style', 'top: 40%; left:355px; z-index: 0;');


	setTimeout(function() {
		bgCanvas.appendChild(frogMotion);
		var i = 3;
		animate({
			delay : 100,
			duration : 1200,
			delta : makeEaseOut(linear),
			step : function(delta) {
				// log('@ sprite!');
				frogMotion.src = spriteArray[i];
			}
		});
		spriteAnimation(spriteArray, frogMotion);

	}, 0);

	setTimeout(function() {
		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[0].style.pointerEvents = "auto";
		}
	}, 1300);
}

function spriteAnimation(spriteArray, spriteObj) {
	var index = 0;
	animate({
		delay : 100,
		duration : 300,
		delta : makeEaseOut(linear),
		step : function(delta) {
			// log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});
}

function frogMotionIncorrect() {
	var frogBg = document.querySelector('#frogBg'),
	spriteArray1 = ['images/dogfood_1_fail_1.png','images/dogfood_1_fail_1.png','images/dogfood_1_fail_1.png'];
	spriteAnimation(spriteArray1, frogBg);
	logCounter.tryCounter();
	streamSound.setSound('media/dogfood_dog_fail.mp3');

	setTimeout(function() {
		frogBg.src = 'images/dogfood_1.png';
	}, 1000);
}


function dogCompareAnswer(dragObj) {
	// log(dragObj.getAttribute('answerValue'));

	var answerValue = dragObj.getAttribute('answerValue').split(',');

		// log(answerValue[0] + '그런거지');

		if (gameManager.CURRENT_ANSWER[0][0] === parseInt(answerValue[0]) && gameManager.CURRENT_ANSWER[0][1] === parseInt(answerValue[1]) && gameManager.CURRENT_ANSWER[0][2] === parseInt(answerValue[2])) {
		//getAttribute = 요소의 클래스 속성의 값을 가져옴
		//parseInt = 문자열을 구문 분석하고 정수를 반환합니다.

		gameOver(dragObj);

		frogMotioncorrect();

	} else {

		frogMotionIncorrect();

		setTimeout(function() {
			foodShadow.style.display = 'none';
		}, 180);

		setTimeout(function() {
			foodShadow.style.display = 'block';
		}, 1000);

		dragObj.setAttribute('style','top:560px; left:345px;');

		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		// streamSound.setSound('../../media/incorrect.mp3');

	}

	logCounter.tryCounter();
}




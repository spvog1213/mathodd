function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'circle', document.getElementById('back1'));
	appendCircleElement('question2', 'circle', document.getElementById('back2'));

	var circleAnswer = document.querySelector('#answerObject');
	arrowBg = document.createElement('img');
	circleAnswer.setAttribute('style', 'top: 88px; left: 1057px;');
	appendChoiceQuestion('drag', gameManager.choiceQuestion);
	

	arrowBg.setAttribute('id','arrowBg');
	arrowBg.src = 'images/archery_arrow_0.png';
	arrowBg.setAttribute('style', 'top: 14%; right: -10%; z-index: 2;');
	bgCanvas.appendChild(arrowBg);

	startBtn();


}

function archery() {
	log('archery...');

	var	Question1 = document.querySelector('#question1'),
	Question2 = document.querySelector('#question2'),
	back1 = document.querySelector('#back1'),
	back2 = document.querySelector('#back2');

	back1.setAttribute('style', 'top:60px; left: 191px;');
	back2.setAttribute('style', 'top:340px; left: 28px;');

	var hit = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	fall = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	hitshow = hit - fall;

	Question1.innerHTML = '<img src= images/archery_target_'+ hitshow +'.png>'
	Question2.innerHTML = '<img src= images/archery_downarrow_'+ fall +'.png>'
}	



function gameOver(currentObj, dragObj, x, y) {
	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	// var correct = document.querySelector('#correct');
	// correct.innerHTML = gameManager.CURRENT_ANSWER[0];

	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
		gameOverAnimation();
	}, 200)

	setTimeout(function() {
		log('excute stampStarIcon!');
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);
}



function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceLeft = 0;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceLeft = 240;
		break;
		case 2 :
		choiceLeft = 150;
		break;
		case 3 :
		choiceLeft = 13;
		break;
		case 4 :
		choiceLeft = -50;
		break;
		case 5 :
		choiceLeft = -150;
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

		choiceLeft = choiceLeft + 285;

		currentQuestion.setAttribute('style', 'top: 580px; left:' + choiceLeft + 'px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestion[i];
			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestion[i];
		}
		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);
		gameManager.choiceQuestionPosition.push([580, choiceLeft]);
		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
		} else {
			currentQuestion.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);
			}, false);
		}
	}
}

function startBtn(dragObj) {
	var startBtn = document.createElement('img'),
	panel = document.createElement('div'),
	number1 = document.createElement('div'),
	number2 = document.createElement('div'),
	correct = document.createElement('div'),
	minus = document.createElement('img');
	equal = document.createElement('img');
	flag = true;

	panel.setAttribute('id','panel');

	number1.setAttribute('id','number1');
	number1.className = 'number';
	number1.setAttribute('style', 'left: 5.3%; top: 47.5%;');

	number2.setAttribute('id','number2');
	number2.className = 'number';
	number2.setAttribute('style', 'left: 38.5%; top: 47.5%;');

	correct.setAttribute('id','correct');
	correct.setAttribute('style', 'left: 72%; top: 47.5%;');
	correct.className = 'number';

	startBtn.setAttribute('id', 'startBtn');
	startBtn.setAttribute('style','z-index: 5; cursor: default; position: absolute; left: 100%; top: 27%;');
	startBtn.src = 'images/start_btn.png';

	minus.setAttribute('id', 'minus');
	minus.setAttribute('style','z-index: 5; cursor: default; position: absolute; left: 18.2%; top: 55.5%;');
	minus.src = 'images/symbol_-.png';

	equal.setAttribute('id', 'equal');
	equal.setAttribute('style','z-index: 5; cursor: default; position: absolute; left: 51.2%; top: 55.5%;');
	equal.src = 'images/symbol_=.png';

	bgCanvas.appendChild(panel);
	bgCanvas.appendChild(startBtn);

	panel.appendChild(number1);
	panel.appendChild(number2);
	panel.appendChild(correct);
	panel.appendChild(minus);
	panel.appendChild(equal);

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	btnDown = function(e) {
		e.preventDefault();
			streamSound.setSound('media/archery_1.mp3');
	}
	btnUp = function(e) {
		e.preventDefault();
		log('excute initClockTimer!');
		// parent.window.initClockTimer();
		archeryHit();
		bgCanvas.removeChild(arrowBg);
		startBtn.style.display = 'none';

		setTimeout(function(){
			archery();
			panel.style.display = 'block';

			var archeryHit = document.querySelector('#archeryHit'),
			number = document.querySelectorAll('.number');

			archeryHit.style.display = 'none';

			for(var i = 0; i < number.length; i++){
				number[i].style.display ='block';
			}

			number1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
			number2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];

			// streamSound.setSound('media/end.mp3');
			
		},900)

		

		setTimeout(function(){
			for (var i = 0; i < choiceQuestionContainer.length; i++) {
				choiceQuestionContainer[i].style.pointerEvents = "auto";
			}	
		},2000)

		
	}

	startBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	startBtn.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);

}


function archeryHit() {
	var archeryHit = document.querySelector('#archeryHit');

	var archeryHit = document.createElement('img'),
	spriteArray = ['images/archery_arrow_1.png', 'images/archery_arrow_2.png', 'images/archery_arrow_3.png', 'images/archery_arrow_3.png', 'images/archery_arrow_4.png', 'images/archery_arrow_5.png', 'images/archery_arrow_6.png', 'images/archery_arrow_7.png'];
	archeryHit.setAttribute('id', 'archeryHit');

	archeryHit.setAttribute('style', 'top: 14%; right: -10%; z-index: 2;');

	

	setTimeout(function() {
		bgCanvas.appendChild(archeryHit);
		var aa = parseInt(spriteArray.length) * 90;
		var index = 0;
		animate({
			delay : 90,
			duration : aa,
			delta : makeEaseOut(linear),
			step : function(delta) {
				// log('@ sprite!');
				archeryHit.src = spriteArray[index];
				index ++;
			}
		});
		spriteAnimation(spriteArray, archeryHit);
	}, 0);

}


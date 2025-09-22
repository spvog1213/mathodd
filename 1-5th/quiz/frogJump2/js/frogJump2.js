function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject', 'aa', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'circle', document.getElementById('back1'));
	appendCircleElement('question2', 'circle', document.getElementById('back2'));
	appendCircleElement('question3', 'circle', document.getElementById('back3'));
	appendCircleElement('question4', 'circle', document.getElementById('back4'));

	var circleAnswer = document.querySelector('#answerObject');
	appendChoiceQuestion('click', gameManager.choiceQuestion);

	startBtn();


}

function initBead() {
	log('initBead...');

	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	Question1 = document.querySelector('#question1'),
	Question2 = document.querySelector('#question2'),
	Question3 = document.querySelector('#question3'),
	Question4 = document.querySelector('#question4'),
	back1 = document.querySelector('#back1');
	back2 = document.querySelector('#back2');
	back3 = document.querySelector('#back3');
	back4 = document.querySelector('#back4');

	frogBg = document.createElement('img'),
	

	frogBg.setAttribute('id','frogBg');
	frogBg.src = 'images/frogjump2_frog_0.png';
	
	back1.setAttribute('style', 'top:319px; left: 137px;');
	back2.setAttribute('style', 'top:319px; left: 415px;');
	back3.setAttribute('style', 'top:319px; left: 694px;');
	back4.setAttribute('style', 'top:319px; left: 982px;');
	frogBg.setAttribute('style', 'top: 25%; left: 20%; z-index: 2;');

	bgCanvas.appendChild(frogBg);
	
	Question1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	Question2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
	Question3.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[2];
	Question4.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[3];
}	

function gameOver(currentObj, dragObj, x, y) {
	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	streamSound.setSound('../../media/correct.mp3');
	gameOverAnimation();

	document.querySelector('#currentQuestion').setAttribute('style', 'display:block; top:' + (currentObj.offsetTop + 12) + 'px; left:' + (currentObj.offsetLeft + 50) + 'px;');

	var textBox = document.querySelector('#textBox');
	textBox.innerHTML = gameManager.CURRENT_ANSWER[0];

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

		currentQuestion.setAttribute('style', 'top: 615px; left:' + choiceLeft + 'px;');

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
		gameManager.choiceQuestionPosition.push([615, choiceLeft]);
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
	textBox = document.createElement('div'),
	text = document.createElement('div'),
	flag = true;

	panel.setAttribute('id','panel');
	text.setAttribute('id','text');
	textBox.setAttribute('id','textBox');
	startBtn.setAttribute('id', 'startBtn');
	startBtn.setAttribute('style', 'cursor: pointer; position: absolute; left:39%; top: 31.5%;');
	bgCanvas.appendChild(panel);
	startBtn.src = 'images/start_btn.png';
	panel.appendChild(startBtn);
	panel.appendChild(textBox);
	panel.appendChild(text);

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	btnDown = function(e) {
		e.preventDefault();
	}
	btnUp = function(e) {
		e.preventDefault();
		frogBg.src = 'images/frogjump2_frog_0.png';

		streamSound.setSound('media/frog_cry.mp3');
		frogMotioncorrect();
		
		textBox.style.display = 'block';
		textBox.innerHTML = '?';
		text.innerHTML = '씩 뛰기';

		setTimeout(function(){
			for (var i = 0; i < choiceQuestionContainer.length; i++) {
				choiceQuestionContainer[i].style.pointerEvents = "auto";
			}	
		},2300)
		log('excute initClockTimer!');
		// parent.window.initClockTimer();


		bgCanvas.removeChild(frogBg);
		startBtn.style.display = 'none';

		var back2 = document.querySelector('#back2'),
		back3 = document.querySelector('#back3'),
		back4 = document.querySelector('#back4'),
		back2Top = parseInt(back2.style.top),
		back3Top = parseInt(back3.style.top),
		back4Top = parseInt(back4.style.top),
		top = 7;

		
		// setTimeout(function() {	
		// 	animate({
		// 		duration : 200,
		// 		delta : makeEaseOut(elastic),
		// 		step : function(delta) {
		// 			back2.style.top = ((top * delta) + back2Top) + 'px';
		// 		}
		// 	});
		// }, 500);
		// setTimeout(function() {	
		// 	animate({
		// 		duration : 200,
		// 		delta : makeEaseOut(elastic),
		// 		step : function(delta) {
		// 			back3.style.top = ((top * delta) + back3Top) + 'px';
		// 		}
		// 	});
		// }, 800);
		// setTimeout(function() {	
		// 	animate({
		// 		duration : 200,
		// 		delta : makeEaseOut(elastic),
		// 		step : function(delta) {
		// 			back4.style.top = ((top * delta) + back4Top) + 'px';
		// 		}
		// 	});
		// }, 1100);
	}

	startBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	startBtn.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);

}


function frogMotioncorrect() {
	var frogMotion = document.querySelector('#frogMotion');

	var frogMotion = document.createElement('img'),
	spriteArray = ['images/frogjump2_frog_1.png', 'images/frogjump2_frog_2.png', 'images/frogjump2_frog_3.png', 'images/frogjump2_frog_4.png', 'images/frogjump2_frog_5.png', 'images/frogjump2_frog_6.png', 'images/frogjump2_frog_7.png', 'images/frogjump2_frog_8.png', 'images/frogjump2_frog_9.png', 'images/frogjump2_frog_10.png', 'images/frogjump2_frog_11.png', 'images/frogjump2_frog_12.png', 'images/frogjump2_frog_13.png', 'images/frogjump2_frog_14.png', 'images/frogjump2_frog_15.png', 'images/frogjump2_frog_16.png', 'images/frogjump2_frog_17.png'];
	frogMotion.setAttribute('id', 'frogMotion');

	frogMotion.setAttribute('style', 'top: 25%; left: 20%; z-index: 2;');

	setTimeout(function() {
		bgCanvas.appendChild(frogMotion);
		var aa = parseInt(spriteArray.length) * 110;
		var index = 0;
		animate({
			delay : 110,
			duration : aa,
			delta : makeEaseOut(linear),
			step : function(delta) {
				// log('@ sprite!');
				frogMotion.src = spriteArray[index];
				index ++;
			}
		});
		spriteAnimation(spriteArray, frogMotion);
	}, 5);

}


function frogMotionIncorrect() {
	streamSound.setSound('../../media/incorrect.mp3');
	
	var incorrectMotion = document.querySelector('#incorrectMotion'),
	frogMotion = document.querySelector('#frogMotion');

	var incorrectMotion = document.createElement('img'),
	incorrectArray = ['images/frogjump2_frog_16.png', 'images/frogjump2_frog_15.png', 'images/frogjump2_frog_16.png', 'images/frogjump2_frog_17.png'];
	frogMotion.setAttribute('id', 'frogMotion');


	setTimeout(function() {
		bgCanvas.appendChild(frogMotion);
		var aa = parseInt(incorrectArray.length) * 110;
		var index = 0;
		animate({
			delay : 110,
			duration : aa,
			delta : makeEaseOut(linear),
			step : function(delta) {
				// log('@ sprite!');
				frogMotion.src = incorrectArray[index];
				index ++;
			}
		});
		spriteAnimation(incorrectArray, frogMotion);
	}, 0);
}



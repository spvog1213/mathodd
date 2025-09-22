function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('tenBox', 'tenBox', document.getElementById('bgCanvas'));

	appendCircleElement('textBox', 'txtbox', document.getElementById('bgCanvas'));
	appendCircleElement('text0', 'txt', document.getElementById('textBox'));
	text0.innerHTML = '모두';
	appendCircleElement('text1', 'txt', document.getElementById('textBox'));
	text1.innerHTML = '?';
	appendCircleElement('text2', 'txt', document.getElementById('textBox'));
	text2.innerHTML = '마리';

	appendChoiceQuestion('click', gameManager.choiceQuestion);


	var Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	Question1 = document.querySelector('#question1');

	createanimal(Num2, Question1);
}

function createanimal(num, numContainer, eventCallback) {
	var	numContainer = numContainer.id;

	animalArray = ['goat','rabbit','sheep'];
	var animalRandom = parseInt(Math.random() * 3);

	switch (animalRandom){
		case 0 :
		animalRandom = animalArray[0];
		break;
		case 1 :
		animalRandom = animalArray[1];
		break;
		case 2 :
		animalRandom = animalArray[2];
		break;
	}
	animal = 'images/animalfence_'+ animalRandom + '_0.png';
	tenanimal = 'images/animalfence_'+ animalRandom + '_0.png';

	for (var i = 0; i < num; i++) {
		var right = 12,
		animal;
		
		eventCallback = function() {
			arguments[0].preventDefault();
		
		};
		createObject(i, right, animal, numContainer, eventCallback);
		
	}	
	for (var i = 0; i < 10; i ++){
		createObject2(i, right, tenanimal, tenBox, eventCallback);
	}
}


function spriteAnimationCustom(spriteArray, spriteObj) {

	var index = 0,
	    durationAni = parseInt(spriteArray.length - 1) * 100;

	animate({
		delay : 100,
		duration : durationAni,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}

function gameOver(currentObj) {

	document.querySelector('#answerMark').setAttribute('style', 'display:block; top:' + (currentObj.offsetTop + 12) + 'px; left:' + (currentObj.offsetLeft + 22) + 'px;');

	streamSound.setSound('../../media/correct.mp3');

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
	question1 = document.querySelector('#question1').childNodes,
	tex1 = document.querySelector('#text1'),
	tenBox = document.querySelector('#tenBox').childNodes;

	text1.innerHTML = gameManager.CURRENT_ANSWER[0];

	for (var a = 0; a < question1.length; a++) {
		question1[a].style.pointerEvents = "none";
	}

	for (var b = 0; b < tenBox.length; b++) {
		tenBox[b].style.pointerEvents = "none";
	}

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}


	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();

	// setTimeout(function() {
	// 	log('excute stampStarIcon!');
	// 	parent.window.stampStarIcon();
	// }, 500);

	// // save log data
	// setTimeout(function() {
	// 	log('excute insDrillHis!');
	// 	parent.window.insDrillHis(logCounter.submitReport());
	// }, 1800);
}



function createObject(index, left, parentObjSrc, numContainer, eventCallback, callback) {
	var parentObj = document.createElement('img'),
	question1 = document.querySelector('#question1');

	parentObj.src = parentObjSrc;

	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObj.className = "animal";	

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	parentObj.addEventListener(gameManager.eventSelector.upEvent, function() {
		animalMotionIncorrect();
		spriteAnimationCustom(incorrectArray, parentObj);
		streamSound.setSound('media/animalfence_eat.mp3');

	}, false);

	document.getElementById('question1').appendChild(parentObj);
}

function createObject2(index, left, parentObjSrc, numContainer, eventCallback, callback) {
	var parentObj = document.createElement('img'),
		tenBox = document.querySelector('#tenBox');
		

	parentObj.src = parentObjSrc;

	parentObj.setAttribute('id', 'tenAnimal' + index);
	parentObj.className = "animal";	

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	parentObj.addEventListener(gameManager.eventSelector.upEvent, function() {
		animalMotionIncorrect();
		spriteAnimationCustom(incorrectArray, parentObj);
		streamSound.setSound('media/animalfence_eat.mp3');

	}, false);

	document.getElementById('tenBox').appendChild(parentObj);
}


function animalMotionIncorrect() {
	var question1Src = document.querySelector('#question1').childNodes[0].src;
	objSrc = question1Src.split('_');
	objSrc = objSrc.slice(-2);
	objSrc.splice(1,1);

	incorrectArray = ['images/animalfence_' + objSrc + '_2.png','images/animalfence_' + objSrc + '_3.png','images/animalfence_' + objSrc + '_4.png','images/animalfence_' + objSrc + '_1.png','images/animalfence_' + objSrc + '_1.png'];
}


function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceLeft = 1085,
	choiceTop = -70;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceLeft = 240;
		break;
		case 2 :
		choiceLeft = 150;
		break;
		case 3 :
		choiceLeft = 1135;
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

			appendImageElement('choiceQuestion_' + i, imgSrcArray[0], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
		}

		choiceTop = choiceTop + 220;

		currentQuestion.setAttribute('style', 'top:' + choiceTop + 'px; left:' + choiceLeft + 'px;');

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

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);

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


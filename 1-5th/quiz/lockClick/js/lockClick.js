function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	appendChoiceQuestion('click', gameManager.choiceQuestion);
}
function initlock() {
	var lockOri = document.createElement('img'),
	     txt = document.createElement('div'),
	     answer1 = document.createElement('div'),
	     answer2 = document.createElement('div');

	lockOri.setAttribute('id', 'lockOri');
	txt.setAttribute('id', 'txt');
	answer1.setAttribute('id', 'answer1');
	answer2.setAttribute('id', 'answer2');
	
	lockOri.setAttribute('src', 'images/lock_lock.png');
	
	bgCanvas.appendChild(lockOri);
	bgCanvas.appendChild(txt);
	bgCanvas.appendChild(answer1);
	bgCanvas.appendChild(answer2);
	
	
	txt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[5];
	answer1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	answer2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
}

function gameOver(currentObj) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	var fruitsContainer = document.querySelectorAll('.fruits');

	for (var i = 0; i < fruitsContainer.length; i++) {
		fruitsContainer[i].style.pointerEvents = "none";
	}

	
	gameOverAnimation();
	streamSound.setSound('media/lock.mp3');
	// streamSound.setSound('../../media/correct.mp3');
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

function createObject(index, top, left, eventCallback, parentObjSrc) {
	var parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;

	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObj.className = "fruits";

	parentObj.setAttribute('style', 'padding-top: 15px; padding-left : ' + (left / 2) + 'px; padding-right : ' + (left / 2) + 'px;');

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);
	parentObj.addEventListener(gameManager.eventSelector.upEvent, function() {
		document.querySelector('#numberPanel').setAttribute('style', 'display:none;');
	}, false);

	document.getElementById('fruitsContainer').appendChild(parentObj);
}


function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    choiceQuestionContainer = document.createElement('div'),
	    line = document.createElement('div'),
	    choiceLeft = 0;

	switch (gameManager.choiceQuestion.length) {
	case 1 :
		choiceTop = 240;
		break;
	case 2 :
		choiceTop = 150;
		break;
	case 3 :
		choiceTop = -100;
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

	line.className = 'line';

	choiceQuestionContainer.appendChild(line);

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
			appendImageElement('choiceQuestion_' + i, imgSrcArray[imgIndex], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

			/*	if (imgSrcArray[1] !== undefined) {

			 addIdleSprite(200, 100, document.querySelector('#choiceQuestion_' + i), gameManager.fishImgArray);
			 }*/

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
		}

		choiceTop = choiceTop + 200;

		currentQuestion.setAttribute('style', 'top: ' + choiceTop + 'px; left: 884px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestionText[i];

			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestion[i];
		}

		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, 884]);

		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
		} else {
			currentQuestion.addEventListener('click', function() {
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}

function incorrectAnimation(dragObj) {
	var dragObjId = dragObj.id;
	dragObjId = dragObjId.split('_');

	var left = gameManager.choiceQuestionPosition[dragObjId[1]][1],
	    currentLeft = parseInt(dragObj.style.left.replace('px', ''));

	if (gameManager.CURRENT_TYPE === 'click' || gameManager.CURRENT_TYPE === 'train')
		currentLeft = 100;

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
			dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
		}
	});
}
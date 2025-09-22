function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);
	// log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('queText1', 'queText', bgCanvas);
	queText1.setAttribute('style', 'left: 590px;');
	queText1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length - 1];

	appendSelectQuestion('click', gameManager.choiceQuestion, 'images/spacecraft_none.png');

}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrc) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    choiceQuestionContainer = document.createElement('div'),
	    choiceTop = 420;
	choiceLeft = -130;

	choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');
	bgCanvas.appendChild(choiceQuestionContainer);

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var currentQuestion;
		var choiceQuestionGroup = document.createElement('div'),
		    className = imgSrc.split('/');
		className = className[className.length - 1];
		className = className.split('_');

		choiceQuestionGroup.setAttribute('id', 'choiceQuestionGroup_' + i);
		choiceQuestionContainer.appendChild(choiceQuestionGroup);
		choiceQuestionGroup.innerHTML = gameManager.choiceQuestionText[i];

		appendImageElement('choiceBg', imgSrc, choiceQuestionGroup);
		choiceQuestionGroup = document.querySelector('#choiceQuestionGroup_' + i);
		choiceQuestionGroup.className = 'rect';

		choiceLeft = choiceLeft + 340;

		choiceQuestionGroup.setAttribute('style', 'top:' + choiceTop + 'px;left: ' + choiceLeft + 'px;');

		/*대분수*/
		appendCircleElement('coicetxt' + i, 'coicetxt', choiceQuestionGroup);
		appendCircleElement('coicetxt' + i, 'coicetxt', choiceQuestionGroup);
		appendCircleElement('lineTxt', 'txt', choiceQuestionGroup);

		var big = choiceQuestionGroup.childNodes[2],
		    small = choiceQuestionGroup.childNodes[3],
		    line = choiceQuestionGroup.childNodes[4];

		for (var a = 0; a < gameManager.TOTAL_ANSWER_ARRAY.length; a++) {
			big.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[i][0];
			small.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[i][1];
			line.innerHTML = '---';

			big.setAttribute('answerValue', gameManager.TOTAL_ANSWER_ARRAY[i][0]);
			small.setAttribute('answerValue', gameManager.TOTAL_ANSWER_ARRAY[i][1]);

			big.setAttribute('style', 'position: absolute; left: 64px; top: 113px;');
			small.setAttribute('style', 'top: 91px; left: 97px;');
			line.setAttribute('style', 'top: 100px; left: 80px; line-height: 110px;');

			var a0 = escape(gameManager.TOTAL_ANSWER_ARRAY[i][0]),
			    a1 = escape(gameManager.TOTAL_ANSWER_ARRAY[i][1]),
			    a2 = escape(gameManager.TOTAL_ANSWER_ARRAY[i][2]);

			if (a0 == 0) {
				big.innerHTML = '';
				if (a1.length == 2 && a2.length == 2) {
					choiceQuestionGroup.style.paddingLeft = '-3px';
					line.style.marginLeft = '-3px';
					small.style.marginLeft = '-12px';
				}
				if (a1.length == 2 && a2.length == 1) {
					choiceQuestionGroup.style.paddingLeft = '-3px';
					line.style.marginLeft = '-3px';
					small.style.marginLeft = '-12px';
				}

				if (a1.length == 1 && a2.length == 2) {
					choiceQuestionGroup.style.paddingLeft = '-3px';
					line.style.marginLeft = '-3px';
					small.style.marginLeft = '0px';
				}

				if (a1.length == 1 && a2.length == 1) {
					choiceQuestionGroup.style.paddingLeft = '-3px';
					line.style.marginLeft = '-3px';
					small.style.marginLeft = '0px';
				}

			} else if (a0 != 0) {
				choiceQuestionGroup.style.paddingLeft = '5px';
				line.style.marginLeft = '5px';
				small.style.marginLeft = '5px';
				big.style.marginLeft = '5px';
				if (a1.length == 2 || a2.length == 2) {
					choiceQuestionGroup.style.paddingLeft = '-3px';
					line.style.marginLeft = '3px';
					small.style.marginLeft = '-5px';
				}
			}

		}

		choiceQuestionGroup.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		choiceQuestionGroup.addEventListener('click', function(e) {
			e.preventDefault();
			log('click');
			compareAnswer(this);
		}, false);

	}
}

function gameOver(dragObj) {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	for (var i = 0; i < choiceQuestionContainer.length; i++) {

		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	streamSound.setSound('../../media/correct.mp3');

	setTimeout(function() {
		correctAnimation(dragObj);
	}, 100);
	logCounter.tryCounter();
	clearInterval(countTimer);
	logCounter.endTime();
	gameOverAnimation();

	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);
	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);
}

function compareAnswer(dragObj) {
	var drag1 = dragObj.childNodes[3],
	    drag2 = dragObj.childNodes[2];

	if (gameManager.CURRENT_ANSWER[0][2] === parseInt(dragObj.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[0][1] === parseInt(drag1.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[0][0] === parseInt(drag2.getAttribute('answerValue'))) {
		log('@ correct!!');
		gameOver(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('media/space_fail_02.mp3');
		logCounter.tryCounter();
	}
}

function incorrectAnimation(dragObj) {
	var dragObjImg = dragObj.childNodes[1];
	var incorrectArray = ['images/spacecraft_fail_1.png', 'images/spacecraft_fail_2.png', 'images/spacecraft_fail_3.png', 'images/spacecraft_none.png', 'images/spacecraft_none.png'];
	spriteAnimation(incorrectArray, dragObjImg);
}

function correctAnimation(dragObj) {
	var Top = -280,
	    Left0 = 150,
	    Left1 = -150,
	    dragObjImg = dragObj.childNodes[1],
	    dragObjpaddingLeft = parseInt(dragObj.style.paddingLeft),
	    dragObjTop = parseInt(dragObj.style.top),
	    dragObjLeft = parseInt(dragObj.style.left),
	    angle0 = 22,
	    angle1 = -22;

	var correctArray = ['images/spacecraft_success_1.png', 'images/spacecraft_success_2.png', 'images/spacecraft_success_1.png', 'images/spacecraft_success_2.png', 'images/spacecraft_success_1.png', 'images/spacecraft_success_2.png', 'images/spacecraft_success_2.png'];
	spriteAnimation(correctArray, dragObjImg);

	animate({
		delay : 50,
		duration : 1200,
		delta : makeEaseInOut(linear),
		step : function(delta) {
			dragObj.setAttribute('style', 'margin-top :' + dragObjTop + 'px; margin-left:' + dragObjLeft + 'px; padding-left: ' + dragObjpaddingLeft + 'px;');
			if (dragObj.id === 'choiceQuestionGroup_0') {
				dragObj.style.top = ((Top * delta)) + 'px';
				dragObj.style.left = ((Left0 * delta)) + 'px';
				dragObj.style.WebkitTransform = 'rotate(' + (angle0) + 'deg)';
				dragObj.style.msTransform = 'rotate(' + (angle0) + 'deg)';
				dragObj.style.transform = 'rotate(' + (angle0) + 'deg)';
				dragObj.style.pointerEvents = "none";
			} else if (dragObj.id === 'choiceQuestionGroup_1') {
				dragObj.style.top = ((Top * delta)) + 'px';
				dragObj.style.pointerEvents = "none";
			} else if (dragObj.id === 'choiceQuestionGroup_2') {
				dragObj.style.top = ((Top * delta)) + 'px';
				dragObj.style.left = ((Left1 * delta)) + 'px';
				dragObj.style.WebkitTransform = 'rotate(' + (angle1) + 'deg)';
				dragObj.style.msTransform = 'rotate(' + (angle1) + 'deg)';
				dragObj.style.transform = 'rotate(' + (angle1) + 'deg)';
				dragObj.style.pointerEvents = "none";
			}
		}
	});
}


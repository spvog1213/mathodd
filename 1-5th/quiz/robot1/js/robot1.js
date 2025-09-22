function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
	parent.window.initClockTimer();

	createQueCounter();
	appendImageElement('robot_line', 'images/robot_1_line.png', answerText);
	appendImageElement('robot', 'images/robot_1_robot.png', document.querySelector('#robotContainer'));
	robot.setAttribute('style', 'position: absolute; bottom: 0px; left: 143px; ')
	robot_line.setAttribute('style', 'position: absolute; bottom: 88px; left: 214px; ')

	var queLength1 = escape(gameManager.TOTAL_ANSWER_ARRAY[2]).length,
	    queLength2 = escape(gameManager.TOTAL_ANSWER_ARRAY[3]).length,
	    queLength3 = escape(gameManager.TOTAL_ANSWER_ARRAY[4]).length;

	if (queLength1 === 2 || queLength2 === 2 || queLength3 === 2) {
		gameManager.choiceBgImgArray = ['images/robot_1_dapbox_2.png', 'images/robot_1_dapbox_2.png', 'images/robot_1_dapbox_2.png'];
		appendImageElement('answerObject', 'images/robot_1_dapbox_2.png', document.querySelector('#robotContainer'), 'AnswerBg');
		answerObject.setAttribute('style', 'z-index: 1; position: absolute; top: 388px; left: 457px;');
	} else if (queLength1 === 1 || queLength2 === 1 || queLength3 === 1) {
		gameManager.choiceBgImgArray = ['images/robot_1_dapbox_1.png', 'images/robot_1_dapbox_1.png', 'images/robot_1_dapbox_1.png'];
		appendImageElement('answerObject', 'images/robot_1_dapbox_1.png', document.querySelector('#robotContainer'), 'AnswerBg');
		answerObject.setAttribute('style', 'z-index: 1; position: absolute; top: 388px; left: 528px;');
	}

	//   var big = gameManager.TOTAL_ANSWER_ARRAY[1],
	// small = gameManager.TOTAL_ANSWER_ARRAY[0];
	// results = escape(big/small).length,

	// var result = escape(gameManager.CURRENT_ANSWER[0]);
	// if(result == 1){
	//   	appendImageElement('answerObject', 'images/robot_1_dapbox_1.png', document.querySelector('#robotContainer'), 'AnswerBg');
	//   	 answerObject.setAttribute('style', 'z-index: 1; position: absolute; top: 388px; left: 528px;');
	//   }else{
	//   	appendImageElement('answerObject', 'images/robot_1_dapbox_2.png', document.querySelector('#robotContainer'), 'AnswerBg');
	//   	 answerObject.setAttribute('style', 'z-index: 1; position: absolute; top: 388px; left: 457px;');
	//   }

	appendSelectQuestion('drag', gameManager.choiceQuestion, gameManager.choiceBgImgArray);

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		//if(queLength1 === 1 || queLength2 === 1 || queLength3 === 1){
		choiceQuestionContainer[i].style.textAlign = 'right';
		//}
	}

}

function createQueCounter() {
	appendCircleElement('answerText', 'answerText', bgCanvas);
	appendCircleElement('txt1', 'rect', answerText);
	appendCircleElement('txt2', 'rect', answerText);
	txt1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	txt2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];

	txt1.setAttribute('style', 'color: #000; line-height: 0px; top: -125px; left: 129px; padding-left: 0px;');
	txt2.setAttribute('style', 'color: #000; line-height: 0px; top: -125px; left: 255px; padding-left: 0px;');

	var txt1Length = escape(gameManager.TOTAL_ANSWER_ARRAY[0]).length,
	    txt2Length = escape(gameManager.TOTAL_ANSWER_ARRAY[1]).length;

	if (txt2Length == 1) {
		txt2.style.paddingLeft = '45px';
	}

}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    choiceQuestionContainer = document.createElement('div'),
	    choiceTop = -130;

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
			choiceQuestionGroup.innerHTML = gameManager.choiceQuestionText[i];

			var imgIndex = parseInt(Math.random() * 3);
			appendImageElement('choiceBg', imgSrcArray[i], choiceQuestionGroup);
			choiceQuestionGroup = document.querySelector('#choiceQuestionGroup_' + i);
			choiceQuestionGroup.className = 'rect';

			var a1 = escape(gameManager.TOTAL_ANSWER_ARRAY[2]).length,
			    a2 = escape(gameManager.TOTAL_ANSWER_ARRAY[3]).length,
			    a3 = escape(gameManager.TOTAL_ANSWER_ARRAY[4]).length;
			if (a1 === 2 || a2 === 2 || a3 === 2) {
				choiceLeft = 1100;
				clientWidth = 172;
			} else {
				choiceLeft = 1130;
				clientWidth = 102;
			}
			choiceTop = choiceTop + 230;

			choiceQuestionGroup.setAttribute('style', 'width:' + clientWidth + 'px; top:' + choiceTop + 'px;left: ' + choiceLeft + 'px;');

		} else {
			appendCircleElement('choiceQuestionGroup_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
		}

		choiceQuestionGroup.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(choiceQuestionGroup);
		} else {
			choiceQuestionGroup.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}

function gameOver(dragObj) {
	var big = gameManager.TOTAL_ANSWER_ARRAY[1],
	    small = gameManager.TOTAL_ANSWER_ARRAY[0];
	result = parseInt(big / small);

	if (gameManager.CURRENT_ANSWER[0] = result) {
		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[i].style.pointerEvents = "none";
		}
		correctMotion();
		streamSound.setSound('media/keyClick.mp3');

		setTimeout(function() {
			gameOverAnimation();
			logCounter.tryCounter();
			clearInterval(countTimer);
			logCounter.endTime();
			streamSound.setSound('../../media/correct.mp3');
		}, 450);

		setTimeout(function() {
			log('excute stampStarIcon!');
			parent.window.stampStarIcon();
		}, 500);
		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			parent.window.insDrillHis(logCounter.submitReport());
		}, 2200);
	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}

}

function correctMotion() {
	var robot = document.querySelector('#robot');

	robotArray = ['images/robot_1_success_1.png', 'images/robot_1_success_2.png', 'images/robot_1_success_3.png', 'images/robot_1_success_4.png'];
	spriteAnimation(robotArray, robot);

}

function spriteAnimation(spriteArray, spriteObj) {

	var index = 0;
	animate({
		delay : 150,
		duration : 600,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}

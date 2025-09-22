function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
    // parent.window.initClockTimer();

    gameManager.choiceBgImgArray = ['images/target_board.png', 'images/target_board.png', 'images/target_board.png'];
    appendSelectQuestion('click', gameManager.choiceQuestion, gameManager.choiceBgImgArray);

    appendCircleElement('queTxt','queTxt', bgCanvas);

    answerTxt();
}

function answerTxt() {
	appendCircleElement('answerText','txt', document.querySelector('#queTxt'));

	answerText.innerHTML = '가장&nbsp;' + gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length - 1] + '&nbsp;소수';
	answerText.setAttribute('style','width: 522px; color:#ffea00; text-align: center;');

	appendImageElement('targeTextbox', 'images/target_textbox.png', answerText);
	targeTextbox.setAttribute('style','position:absolute; top:0px; left:0px; z-index:-5;')

}


function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceTop = 290;
	choiceLeft = -170;

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

			var imgIndex = parseInt(Math.random() * 3);
			appendImageElement('choiceBg', imgSrcArray[i], choiceQuestionGroup);
			choiceQuestionGroup = document.querySelector('#choiceQuestionGroup_' + i);
			choiceQuestionGroup.className = 'rect';

			choiceLeft = choiceLeft + 350;

			choiceQuestionGroup.setAttribute('style', 'top:' + choiceTop + 'px;left: ' + choiceLeft + 'px;');

			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 0px;');
			imgObjText.innerHTML = gameManager.choiceQuestionText[i];
			choiceQuestionGroup.appendChild(imgObjText);
			

		} else {
			appendCircleElement('choiceQuestionGroup_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
		}
		
		choiceQuestionGroup.setAttribute('answerValue', gameManager.choiceQuestion[i]);

	    appendImageElement('hand', 'images/blank.png', choiceQuestionGroup);

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



function gameOver (dragObj) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer');

	choiceQuestionContainer.style.pointerEvents = "none";

	streamSound.setSound('media/target_success.mp3');

	setTimeout(function(){
		gameOverAnimation();
		logCounter.tryCounter();
		clearInterval(countTimer);
		logCounter.endTime();
	},450)


		// setTimeout(function () {
		// 	log('excute stampStarIcon!');
		//     parent.window.stampStarIcon();
		// }, 500);
		// // save log data 
		// setTimeout(function () {
		// 	log('excute insDrillHis!');
		//     parent.window.insDrillHis(logCounter.submitReport());
		// }, 2200);
}

function correctMotion(dragObj) {
	var dragId = dragObj.id;
		objNum = parseInt(dragId.slice(-1)) + 1;

	successArray = ['images/vic_target_success_'+ objNum +'_1.png','images/vic_target_success_'+ objNum +'_2.png','images/vic_target_success_'+ objNum +'_3.png','images/vic_target_success_'+ objNum +'_4.png'];
	spriteAnimation(successArray, dragObj.childNodes[2]);

}


function spriteAnimation(spriteArray, spriteObj) {
	var index = 0;
	animate({
		delay : 100,
		duration : 400,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}


function compareAnswer(dragObj) {
	var dragObjAnswer = dragObj.getAttribute('answerValue');

	if (gameManager.CURRENT_ANSWER[0] == (dragObjAnswer)) {
		log('@ correct!!');
		gameOver(dragObj);
		correctMotion(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}
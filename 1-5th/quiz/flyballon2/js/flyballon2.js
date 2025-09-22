function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
	// parent.window.initClockTimer();
	appendCircleElement('answerObject1', 'circle', document.getElementById('ballonContainer'));
	appendCircleElement('answerObject2', 'circle', document.getElementById('ballonContainer'));
	appendCircleElement('question1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question2', 'circle', document.getElementById('bgCanvas'));


	
	var circleAnswer = document.querySelector('#answerObject1'),
	ballonBlank = parseInt(Math.random() * 2),
	ballonContainer = document.getElementById('ballonContainer');
	triangleAnswer = document.querySelector('#answerObject2');



	appendImageElement('ballonHead', 'images/flyballoon_basket.png', ballonContainer);

	 //Min, Max, Number
	 setRand(1, 7, 6);

	 gameManager.ballonImgArray = ['images/flyballoon_balloon_' + randResult[0] + '.png', 'images/flyballoon_balloon_' + randResult[1] + '.png', 'images/flyballoon_balloon_' + randResult[2] + '.png'];
	 gameManager.ansImgArray = ['images/flyballoon_balloon_' + randResult[3] + '.png', 'images/flyballoon_balloon_' + randResult[4] + '.png', 'images/flyballoon_balloon_' + randResult[5] + '.png'];

	 circleAnswer.setAttribute('style', 'top:144px; left: 147px');
	 triangleAnswer.setAttribute('style', 'top:117px; left: 546px');

	 circleAnswer.setAttribute('candleValue',gameManager.CURRENT_ANSWER[0]);
	 triangleAnswer.setAttribute('candleValue',gameManager.CURRENT_ANSWER[1]);

	 for (var i = 0; i < gameManager.ballonTextArray.length; i++) {
	 	appendImageElement('ballon_' + i, gameManager.ansImgArray[i], ballonContainer, 'ballonAnswer');

	 	document.querySelector('#ballon_' + i).setAttribute('style', 'top:' + gameManager.ballonPosition[i][0] + 'px; left:' + gameManager.ballonPosition[i][1] + 'px;');

	 	var ballonText = document.createElement('div');

	 	ballonText.innerHTML = gameManager.ballonTextArray[i];
	 	ballonText.className = 'ballonText';
	 	ballonText.setAttribute('style', 'top:' + (gameManager.ballonPosition[i][0] + 50) + 'px; left:' + (gameManager.ballonPosition[i][1]) + 'px;');

	 	ballonContainer.appendChild(ballonText);

	 }

	 appendSelectQuestion('drag', gameManager.choiceQuestion, gameManager.ballonImgArray);

	}


	function setRand(min, max, number) {
		randResult = new Array();
		randList = new Array();
		for (var z = min; z <= max; z++) {
			randList.push(z);
		}
		for (var x = 0; x < number; x++) {
			getRand();
		}
		return randResult;
	}

	function getRand(dragObj) {
		randNumber = Math.floor(Math.random() * randList.length);
		randResult.push(randList[randNumber]);
		randList.splice(randNumber, 1);
	}




	function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
		var bgCanvas = document.getElementById('bgCanvas'),
		choiceQuestionContainer = document.createElement('div'),
		line = document.createElement('div'),
		choiceTop = -155,
		choiceLeft = 60;

		switch (gameManager.choiceQuestion.length) {
			case 1 :
			choiceLeft = 240;
			break;
			case 2 :
			choiceLeft = 312;
			break;
			case 3 :
			choiceLeft = 1082
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

				var imgIndex = parseInt(Math.random() * 3);

				log(imgIndex);
				appendImageElement('choiceQuestion_' + i, imgSrcArray[i], choiceQuestionGroup);
				currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
				currentQuestion.className = className[0];

			} else {
				appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			// log(i);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
			//여기를 읽어욤...
		}

		choiceTop = choiceTop + 220;

		currentQuestion.setAttribute('style', 'left: ' + choiceLeft + 'px; Top: ' + choiceTop + 'px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 40px; left: 0px;');
			imgObjText.innerHTML = gameManager.choiceQuestionText[i];

			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestion[i];
			//여기를 읽어욤...
		}

		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
			//여기를 읽어욤...
		} else {
			currentQuestion.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				contrastAnswer(this);
			}, false);
		}
	}
}


function gameOver(dragObj) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	var ballonContainer = document.getElementById('ballonContainer');
	ballonContainer.style.top = '0px';
	ballonContainer.style.left = '0px';

	var currentTop = parseInt(ballonContainer.style.top),
	currentLeft = parseInt(ballonContainer.style.left),
	dragObjCurrentTop = parseInt(dragObj.style.top),
	dragObjCurrentLeft = parseInt(dragObj.style.left),
	top = -1000,
	left = 200;	

	setTimeout(function () {
		animate({
			delay: 20,
			duration: 2000,
			delta: makeEaseInOut(quad), 
			step: function (delta) {
				ballonContainer.style.top = ((top * delta) + currentTop)  + 'px';	
				ballonContainer.style.left = ((left * delta) + currentLeft)  + 'px';	
				dragObj.style.top = ((top * delta) + dragObjCurrentTop)  + 'px';	
				dragObj.style.left = ((left * delta) + dragObjCurrentLeft)  + 'px';	
			}
		});
	}, 500);

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();

	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
	},40);	

	// setTimeout(function() {
	// 	log('excute stampStarIcon!');
	// 	parent.window.stampStarIcon();
	// }, 500);

	// save log data
	// setTimeout(function() {
	// 	log('excute insDrillHis!');
	// 	parent.window.insDrillHis(logCounter.submitReport());
	// }, 2300);

}

var count=0;

function contrastAnswer(dragObj) {
	// log(dragObj.getAttribute('answerValue'));
	// if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))){

		var answerObj1 = document.querySelector('#answerObject1'),
		answerObj2 = document.querySelector('#answerObject2');

		counting();

		if (count === gameManager.CURRENT_ANSWER.length) {
			if (gameManager.CURRENT_ANSWER[0] === parseInt(answerObj1.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[1] === parseInt(answerObj2.getAttribute('answerValue'))) {
			// streamSound.setSound('../../media/cake/orgel.mp3');

			log('@ correct!!');

			setTimeout(function() {
				gameOver(dragObj);
			},10)

		} else {
			log('@ incorrect!!');
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');
			logCounter.tryCounter();
		}
	}
}
function counting() {
	count++;
}

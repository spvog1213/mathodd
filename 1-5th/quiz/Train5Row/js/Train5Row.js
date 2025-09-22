function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
	// parent.window.initClockTimer();
	appendImageElement('trainRoad', 'images/train_road.png', document.querySelector('#bgObject'));
	appendCircleElement('answerObject1', 'circle', document.getElementById('trainContainer'));
	appendCircleElement('answerObject2', 'circle', document.getElementById('trainContainer'));
	appendCircleElement('question1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question2', 'circle', document.getElementById('bgCanvas'));


	
	var circleAnswer = document.querySelector('#answerObject1'),
	trainBlank = parseInt(Math.random() * 2),
	trainContainer = document.getElementById('trainContainer');
	triangleAnswer = document.querySelector('#answerObject2');

	appendImageElement('trainHead', 'images/train_0.png', trainContainer);

	 //Min, Max, Number
	 setRand(1, 4, 6);

	 gameManager.trainImgArray = ['images/train_' + randResult[0] + '.png', 'images/train_' + randResult[1] + '.png', 'images/train_' + randResult[2] + '.png'];
	 gameManager.ansImgArray = ['images/train_' + randResult[3] + '.png', 'images/train_' + randResult[1] + '.png', 'images/train_' + randResult[2] + '.png'];

	 circleAnswer.setAttribute('style', 'top:216px; left: 278px');
	 triangleAnswer.setAttribute('style', 'top:216px; left: 554px');

	 circleAnswer.setAttribute('candleValue',gameManager.CURRENT_ANSWER[0]);
	 triangleAnswer.setAttribute('candleValue',gameManager.CURRENT_ANSWER[1]);

	 for (var i = 0; i < gameManager.trainTextArray.length; i++) {
	 	appendImageElement('train_' + i, gameManager.ansImgArray[i], trainContainer, 'trainAnswer');

	 	document.querySelector('#train_' + i).setAttribute('style', 'top:' + gameManager.trainPosition[i][0] + 'px; left:' + gameManager.trainPosition[i][1] + 'px;');

	 	var trainText = document.createElement('div');

	 	trainText.innerHTML = gameManager.trainTextArray[i];
	 	trainText.className = 'trainText';
	 	trainText.setAttribute('style', 'top:' + (gameManager.trainPosition[i][0] + 30) + 'px; left:' + (gameManager.trainPosition[i][1] + 19) + 'px;');

	 	trainContainer.appendChild(trainText);

	 }

	 appendSelectQuestion('drag', gameManager.choiceQuestion, gameManager.trainImgArray);

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
		choiceTop = 585,
		choiceLeft = 210;

		switch (gameManager.choiceQuestion.length) {
			case 1 :
			choiceLeft = 240;
			break;
			case 2 :
			choiceLeft = 312;
			break;
			case 3 :
			choiceLeft = 50;
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

		choiceLeft = choiceLeft + 250;

		currentQuestion.setAttribute('style', 'left: ' + choiceLeft + 'px; Top: ' + choiceTop + 'px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 30px; left: 19px;');
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
	var trainContainer = document.getElementById('trainContainer');
	trainContainer.style.left = '0px';

	var currentLeft = parseInt(trainContainer.style.left),
	dragObjCurrentLeft = parseInt(dragObj.style.left),
	left = 1200;	

	setTimeout(function () {
		animate({
			delay: 20,
			duration: 2000,
			delta: makeEaseInOut(quad), 
			step: function (delta) {
				trainContainer.style.left = ((left * delta) + currentLeft)  + 'px';	
				dragObj.style.left = ((left * delta) + dragObjCurrentLeft)  + 'px';	
			}
		});
	}, 500);

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	

	setTimeout(function() {
		streamSound.setSound('media/trainStart.mp3');
	},40);	

	gameOverAnimation();
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

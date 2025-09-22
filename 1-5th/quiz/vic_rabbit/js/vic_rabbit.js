function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('question1', 'txt', bgCanvas);
	appendImageElement('rabbit', 'images/vic_rabbit_rabbit.png', bgCanvas,'abso');
	appendImageElement('bowl', 'images/vic_rabbit_manger.png', bgCanvas,'abso');

	appendCircleElement('answerObject', 'answerObject', document.getElementById('bgCanvas'));
	answerObject.setAttribute('style', 'top:400px; left: 273px;');

	appendChoiceQuestion('drag', gameManager.choiceQuestion);
	
	question1.innerHTML = '가장 ' + gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length-1] + ' 분수';
}



function gameOver(dragObj, x, y) {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	dragObj.style.marginLeft = '152px';
	logCounter.tryCounter();	
	logCounter.endTime();

	clearInterval(countTimer);
	streamSound.setSound('../../media/correct.mp3');
	setTimeout(function() {
		
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

function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceLeft = 1090;
	choiceTop = 0;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceTop = 240;
		break;
		case 2 :
		choiceTop = 150;
		break;
		case 3 :
		choiceTop = -210;
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

		/*대분수*/
		appendCircleElement('bigText','questionText',currentQuestion);
		appendCircleElement('smallText','questionText',currentQuestion);

		var bigText = document.querySelectorAll('#bigText'),
			smallText = document.querySelectorAll('#smallText');

			appendCircleElement('questionText1','questionText',smallText[i]);
			appendCircleElement('line','questionText',smallText[i]);
			appendCircleElement('questionText2','questionText',smallText[i]);
			
			bigText[i].setAttribute('answerValue', gameManager.choiceQuestion[i][0]);
			if(parseInt(gameManager.choiceQuestion[i][0]) === 0){
				bigText[i].innerHTML = '';
			}else{
				bigText[i].innerHTML = gameManager.choiceQuestion[i][0];
				bigText[i].style.marginLeft = '-10px';
				smallText[i].style.marginLeft = '-3px';
			}

			var questionText1 = document.querySelectorAll('#questionText1'),
			line = document.querySelectorAll('#line'),
				questionText2 = document.querySelectorAll('#questionText2');
				
			questionText1[i].setAttribute('answerValue', gameManager.choiceQuestion[i][1]);
			questionText1[i].innerHTML = gameManager.choiceQuestion[i][1];
			
			questionText2[i].setAttribute('answerValue', gameManager.choiceQuestion[i][2]);
			questionText2[i].innerHTML = gameManager.choiceQuestion[i][2];

			if(escape(gameManager.choiceQuestion[i][1]).length == 2 || escape(gameManager.choiceQuestion[i][2]).length == 2){
				line[i].innerHTML = '-----';

			}else{
				line[i].innerHTML = '----';
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


function animalMotioncorrect() {
	var rabbit = document.querySelector('#rabbit');
	correct = ['images/vic_rabbit_success_1.png', 'images/vic_rabbit_success_2.png', 'images/vic_rabbit_success_3.png', 'images/vic_rabbit_success_3.png'];
	spriteAnimation(correct, rabbit);

}
function animalMotionIncorrect(dragObj) {
	var rabbit = document.querySelector('#rabbit');
	incorrect = ['images/vic_rabbit_fail_1.png','images/vic_rabbit_fail_2.png','images/vic_rabbit_fail_3.png','images/vic_rabbit_fail_3.png'];
	spriteAnimation(incorrect, rabbit);
	// streamSound.setSound('media/weighing_fail.wav');
	streamSound.setSound('../../media/incorrect.mp3');

	dragObj.style.display = 'none';

	setTimeout(function() {
		rabbit.src = 'images/vic_rabbit_rabbit.png';
	}, 1000);

	setTimeout(function() {
		dragObj.style.display = 'block';
	}, 50);

	logCounter.tryCounter();
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



function animalCompareAnswer(dragObj) {
	var answerValue = dragObj.getAttribute('answerValue');
		answer = answerValue.split(',');

	if (gameManager.CURRENT_ANSWER[0][0] === parseInt(answer[0]) && gameManager.CURRENT_ANSWER[0][1] === parseInt(answer[1]) && gameManager.CURRENT_ANSWER[0][2] === parseInt(answer[2])) {
		
		gameOver(dragObj);
		animalMotioncorrect();
	} else {
		animalMotionIncorrect(dragObj);
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		// streamSound.setSound('../../media/incorrect.mp3');
	}

	
}





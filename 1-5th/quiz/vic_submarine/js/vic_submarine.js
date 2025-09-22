
function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
    // parent.window.initClockTimer();

	var submarineContainer = document.getElementById('submarineContainer');
	
	appendImageElement('submarineBody', 'images/vic_submarine_body.png', submarineContainer);
	appendImageElement('propeller', 'images/vic_submarine_propeller_0.png', submarineContainer);
	appendImageElement('answerObject', 'images/vic_submarine_window_question.png', submarineContainer, 'submarineAnswer');
	appendImageElement('Equal', 'images/equals.png', submarineContainer,'cal');
	appendImageElement('Symbol', gameManager.trainSymbolArray[gameManager.trainSymbolIndex], submarineContainer,'cal');
	appendImageElement('Symbol2', gameManager.trainSymbolArray2[gameManager.trainSymbolIndex2], submarineContainer,'cal');
	appendCircleElement('submarineTextBgWrap','submarineTextBg', submarineContainer);

	setRand(1, 4, 6);
	gameManager.ansImgArray = ['images/vic_submarine_window_' + randResult[0] + '.png', 'images/vic_submarine_window_' + randResult[0] + '.png', 'images/vic_submarine_window_' + randResult[0] + '.png'];
	gameManager.trainHeadArray = ['images/vic_submarine_window_' + randResult[3] + '.png', 'images/vic_submarine_window_' + randResult[3] + '.png', 'images/vic_submarine_window_' + randResult[3] + '.png'];

	for (var i = 0; i < gameManager.trainTextArray.length; i++) {
		appendImageElement('train_' + i, gameManager.ansImgArray[i], submarineContainer, 'submarineAnswer');
		appendImageElement('submarineTextBg', 'images/vic_submarine_symbol_window.png', submarineTextBgWrap);
		document.querySelector('#train_' + i).setAttribute('style', 'top:' + gameManager.trainPosition[i][0] + 'px; left:' + gameManager.trainPosition[i][1] + 'px;');

		var submarineText = document.createElement('div');

		submarineText.innerHTML = gameManager.trainTextArray[i];
		submarineText.className = 'submarineText';
		submarineText.setAttribute('style', 'top:' + (gameManager.trainPosition[i][0] + 47) + 'px; left:' + (gameManager.trainPosition[i][1])  + 'px;');

		submarineContainer.appendChild(submarineText);

	}
	
	var circleAnswer = document.querySelector('#answerObject');
	circleAnswer.setAttribute('style', 'top: 285px; left: 867px;');

	appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.trainHeadArray);
}


function propellerCorrMotion() {
	var propeller = document.querySelector('#propeller');

	correctArray = ['images/vic_submarine_propeller_1.png','images/vic_submarine_propeller_2.png','images/vic_submarine_propeller_3.png','images/vic_submarine_propeller_1.png','images/vic_submarine_propeller_2.png','images/vic_submarine_propeller_3.png','images/vic_submarine_propeller_1.png','images/vic_submarine_propeller_2.png','images/vic_submarine_propeller_3.png','images/vic_submarine_propeller_1.png','images/vic_submarine_propeller_2.png','images/vic_submarine_propeller_3.png','images/vic_submarine_propeller_1.png','images/vic_submarine_propeller_2.png','images/vic_submarine_propeller_3.png','images/vic_submarine_propeller_1.png','images/vic_submarine_propeller_2.png','images/vic_submarine_propeller_3.png','images/vic_submarine_propeller_1.png'];
	spriteAnimationCustom(correctArray, propeller);

	streamSound.setSound('media/vic_submarin.mp3');

}

function propellerIncorrMotion() {
	var propeller = document.querySelector('#propeller');

	incorrectArray = ['images/vic_submarine_propeller_1.png','images/vic_submarine_propeller_2.png','images/vic_submarine_propeller_3.png','images/vic_submarine_propeller_0.png','images/vic_submarine_propeller_0.png'];
	spriteAnimationCustom(incorrectArray, propeller);

}
function gameOver (dragObj) {


var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	

	gameOverAnimation();
	document.querySelector('#answerObject').style.display = 'none';

	propellerCorrMotion();
	
	var currentLeft = parseInt(submarineContainer.offsetLeft),
		dragObjCurrentLeft = parseInt(dragObj.offsetLeft),
		left = -1200;	

	setTimeout(function () {
		animate({
			delay: 20,
			duration: 3000,
			delta: makeEaseInOut(back), 
			step: function (delta) {
				submarineContainer.style.left = ((left * delta) + currentLeft)  + 'px';	
				dragObj.style.left = ((left * delta) + dragObjCurrentLeft)  + 'px';	
			}
		});
	}, 700);
	

	logCounter.tryCounter();
	logCounter.endTime();

	setTimeout(function () {
		log('excute stampStarIcon!');
	    parent.window.stampStarIcon();
	}, 500);
	// save log data 
	setTimeout(function () {
		log('excute insDrillHis!');
	    parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);


}


function spriteAnimationCustom(spriteArray, spriteObj) {
	var index = 0,
	durationAni = parseInt(spriteArray.length - 1) * 100;

	animate({
		delay : 100,
		duration : durationAni,
		delta : makeEaseOut(quad),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

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



function compareAnswer(dragObj) {
	if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))) {

		log('@ correct!!');
		setTimeout(function(){
			gameOver(dragObj);
		},200)
		streamSound.setSound('media/vic_submarin.mp3');

	} else {
		log('@ incorrect!!');
		propellerIncorrMotion();
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}



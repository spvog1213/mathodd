
function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
    // parent.window.initClockTimer();
	
	appendImageElement('answerObject', 'images/vic_rabbitcave_carrot_question.png', carrotContainer, 'abso');
	var circleAnswer = document.querySelector('#answerObject');
	circleAnswer.setAttribute('style', 'top: 232px; left: 885px; z-index: 1;');

	gameManager.carrotArray = ['images/vic_rabbitcave_carrot.png','images/vic_rabbitcave_carrot.png','images/vic_rabbitcave_carrot.png',];
	appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.carrotArray);
}

function rabbitcaveInit(){
	var carrotContainer = document.getElementById('carrotContainer');
	
	appendImageElement('rabbit', 'images/vic_rabbitcave_rabbit.png', carrotContainer);
	appendImageElement('Symbol', gameManager.carrotSymbolArray[gameManager.SymbolIndex], carrotContainer,'cal');
	appendImageElement('Equal', 'images/equals.png', carrotContainer,'cal');
	appendCircleElement('carrotTextBgWrap','carrotTextBg', carrotContainer);

	gameManager.ansImgArray = ['images/vic_rabbitcave_carrot_2.png','images/vic_rabbitcave_carrot_2.png'];

	for (var i = 0; i < gameManager.carrotTextArray.length; i++) {
		appendImageElement('carrot_' + i, gameManager.ansImgArray[i], carrotContainer, 'abso');
		appendImageElement('carrotTextBg', 'images/vic_rabbitcave_symbol_bg.png', carrotTextBgWrap,'abso');
		appendCircleElement('carrotText','carrotText', carrotContainer);
		
		var carrotText = document.querySelectorAll('#carrotText'),
		 	carrotTextBg = document.querySelectorAll('#carrotTextBg');
		 	cal = document.querySelectorAll('.cal');
			
		document.querySelector('#carrot_' + i).setAttribute('style', 'top:' + gameManager.carrotPosition[i][0] + 'px; left:' + gameManager.carrotPosition[i][1] + 'px;');
		carrotText[i].innerHTML = gameManager.carrotTextArray[i];
		carrotText[i].setAttribute('style', 'top:' + (gameManager.carrotPosition[i][0] + 56) + 'px; left:' + (gameManager.carrotPosition[i][1])  + 'px;');
		carrotTextBg[i].setAttribute('style', 'top:' + (gameManager.carrotPosition[i][0] + 48) +'px;left:' + (parseInt(gameManager.carrotPosition[i][1])+ 225)  + 'px;');
		cal[i].setAttribute('style', 'top:' + (gameManager.carrotPosition[i][0] + 73) +'px; left:' + (parseInt(gameManager.carrotPosition[i][1])+ 255)  + 'px; z-index: 3;');

	}

}

function rabbitCorrMotion() {
	var rabbit = document.querySelector('#rabbit');

	correctArray = ['images/vic_rabbitcave_rabbit_success_1.png','images/vic_rabbitcave_rabbit_success_2.png','images/vic_rabbitcave_rabbit_success_3.png','images/vic_rabbitcave_rabbit_success_3.png'];
	spriteAnimationCustom(correctArray, rabbit);

}

function rabbitIncorrMotion() {
	var rabbit = document.querySelector('#rabbit');

	incorrectArray = ['images/vic_rabbitcave_rabbit_fail_1.png','images/vic_rabbitcave_rabbit_fail_2.png','images/vic_rabbitcave_rabbit_fail_3.png','images/vic_rabbitcave_rabbit_fail_3.png'];
	spriteAnimationCustom(incorrectArray, rabbit);

	setTimeout(function(){
		rabbit.src = 'images/vic_rabbitcave_rabbit.png';
	},600)

}
function gameOver (dragObj) {
var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}


	gameOverAnimation();
	

	rabbitCorrMotion();
	
	// var currentLeft = parseInt(submarineContainer.offsetLeft),
	// 	dragObjCurrentLeft = parseInt(dragObj.offsetLeft),
	// 	left = -1200;	

	// setTimeout(function () {
	// 	animate({
	// 		delay: 20,
	// 		duration: 3000,
	// 		delta: makeEaseInOut(back), 
	// 		step: function (delta) {
	// 			submarineContainer.style.left = ((left * delta) + currentLeft)  + 'px';	
	// 			dragObj.style.left = ((left * delta) + dragObjCurrentLeft)  + 'px';	
	// 		}
	// 	});
	// }, 700);

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


function compareAnswer(dragObj) {
	if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))) {
		log('@ correct!!');

		document.querySelector("#answerObject").style.display = 'none';
		dragObj.childNodes[1].style.width = '220px';
		dragObj.childNodes[0].src = 'images/vic_rabbitcave_carrot_2.png';

		setTimeout(function(){
			gameOver(dragObj);
		},200)

		streamSound.setSound('media/complete2_correct.mp3');

	} else {
		log('@ incorrect!!');
		rabbitIncorrMotion();
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}



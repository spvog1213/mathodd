function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	
	appendImageElement('goalpost', 'images/basketball_goalpost_0.png', document.getElementById('panel'), 'goalpost');
	appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.choiceQuestionImg);
	appendCircleElement('answerObject', 'questionbox', document.getElementById('bgCanvas'));
	answerObject.setAttribute('style', 'top:132px; left: 551px; z-index: 10;');

}

function initBasketball() {
	log('initBasketball...');

	appendCircleElement('question1', 'question', document.getElementById('panel'));
	appendCircleElement('question2', 'question', document.getElementById('panel'));
	appendImageElement('ball', 'images/basketball_ball.png', document.getElementById('bgCanvas'), 'basketball');

	question1.setAttribute('style', 'top:64px; left: 83px;');
	question2.setAttribute('style', 'top:64px; left: 509px;');
	ball.setAttribute('style', 'top:200px; left: 600px; display:none;  z-index:4');

	appendCircleElement('que_txt0', 'txt', question1);
	appendCircleElement('calculation1','calculation', question1);
	appendCircleElement('que_txt1', 'txt', question1);
	appendCircleElement('que_txt2', 'txt', question2);
	appendCircleElement('calculation2','calculation', question2);
	appendCircleElement('que_txt3', 'txt', question2);

	for(var i = 0; i < gameManager.TOTAL_ANSWER_ARRAY.length-2; i++){
		var que_txt = document.querySelector('#que_txt'+i);
		que_txt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[i];
	}

	switch(gameManager.TOTAL_ANSWER_ARRAY[4]){
    	case '+':
    		calulation = 'plus';
    	break;
    	case '-':
    		calulation = 'minus';
    	break;
    	case '/':
    		calulation = 'division';
    	break;
    	case '*':
    		calulation = 'multiplication';
    	break;
    }
     switch(gameManager.TOTAL_ANSWER_ARRAY[5]){
    	case '+':
    		calulation2 = 'plus';
    	break;
    	case '-':
    		calulation2 = 'minus';
    	break;
    	case '/':
    		calulation2 = 'division';
    	break;
    	case '*':
    		calulation2 = 'multiplication';
    	break;
    }

  	  appendImageElement('cal_img', 'images/'+ calulation +'.png', calculation1);
  	  appendImageElement('cal_img', 'images/'+ calulation2 +'.png', calculation2);


}

function gameOver(dragObj) {

	var dragObjId = dragObj.id;
	dragObjId = dragObjId.split('_');
	dragObjId = parseInt(dragObjId.slice(dragObjId.length - 1));


	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
	    basketball = document.querySelector('#ball'),
	    goalpost = document.querySelector('#goalpost'),
	    symbol = document.createElement('img'),
	    spriteArray = ['images/basketball_goalpost_0.png', 'images/basketball_goalpost_1.png', 'images/basketball_goalpost_2.png', 'images/basketball_goalpost_3.png', 'images/basketball_goalpost_4.png'],
	    top = 580,
	    currentTop = 100;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.display = "none";
	}

	symbol.src = 'images/basketball_questionbox_symbol_' + dragObjId + '.png';
	symbol.style.paddingTop = '8px';
	symbol.style.paddingLeft = '55px';

	answerObject.appendChild(symbol);

	basketball.style.zIndex = '10';
	basketball.style.display = "block";
	basketball.style.paddingLeft = '10px';
	streamSound.setSound('media/basketball.mp3');
	setTimeout(function() {

		spriteAnimationCustom(spriteArray, goalpost);

		animate({
			delay : 20,
			duration : 320,
			delta : makeEaseInOut(linear),
			step : function(delta) {
				basketball.style.top = ((currentTop) + ((-currentTop + top)* delta)) + 'px';
				// basketball.style.top = (top * delta) + 'px';
			}
		});
	}, 10);
	

	setTimeout(function() {
		animate({
			delay : 20,
			duration : 1300,
			delta : makeEaseOut(elastic),
			step : function(delta) {
				// basketball.style.top = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
				basketball.style.top = ((currentTop * delta) + ((-currentTop + top))) + 'px';
			}
		});
	}, 350);

	setTimeout(function() {
		logCounter.tryCounter();
		logCounter.endTime();
		clearInterval(countTimer);
		gameOverAnimation();
		
		streamSound.setSound('media/basketball_correct.mp3');

		setTimeout(function() {
			log('excute stampStarIcon!');
			parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);
	}, 1200);
}

function ballCompareAnswer(dragObj) {
	log(dragObj.getAttribute('answerValue'));

	if (gameManager.CURRENT_ANSWER[0] === dragObj.getAttribute('answerValue')) {
		//getAttribute = 요소의 클래스 속성의 값을 가져옴
		//parseInt = 문자열을 구문 분석하고 정수를 반환합니다.

		log('@ correct!!');
		gameOver(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');

		logCounter.tryCounter();
	}
}

function spriteAnimationCustom(spriteArray, spriteObj) {

	var index = 0,
	    durationAni = parseInt(spriteArray.length - 2) * 100;

	animate({
		delay : 70,
		duration : durationAni,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}

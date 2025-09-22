function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	
	appendImageElement('goalpost', 'images/basketball_goalpost_0.png', document.getElementById('panel'), 'goalpost');
	appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.choiceQuestionImg);
	appendImageElement('ball', 'images/basketball_ball.png', document.getElementById('bgCanvas'), 'basketball');
	appendCircleElement('ballTxt', 'basketball', document.getElementById('bgCanvas'));
	ballTxt.innerHTML = gameManager.CURRENT_ANSWER[0];

	ball.setAttribute('style', 'top:200px; left: 600px; display:none;  z-index:4');
	ballTxt.setAttribute('style', 'top:200px; left: 600px; display:none;  z-index:4');
	appendCircleElement('answerObject', 'questionbox', document.getElementById('bgCanvas'));
	answerObject.setAttribute('style', 'top:140px; left: 581px;');

}

function queTxt(){
	appendCircleElement('queTxt_wrap','queTxt_wrap', bgCanvas);
    appendCircleElement('queTxt','queText', document.querySelector('#queTxt_wrap'));
    appendCircleElement('queText1','queText', document.querySelector('#queTxt'));
    appendCircleElement('calculation1','calculation', document.querySelector('#queTxt'));
    appendCircleElement('queText2','queText', document.querySelector('#queTxt'));
    appendCircleElement('calculation2','calculation', document.querySelector('#queTxt'));
    appendCircleElement('queText3','queText', document.querySelector('#queTxt'));

    queText1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
    queText2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
    queText3.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[2];
    

    switch(gameManager.TOTAL_ANSWER_ARRAY[6]){
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
     switch(gameManager.TOTAL_ANSWER_ARRAY[7]){
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
	    ballTxt  = document.querySelector('#ballTxt'),
	    goalpost = document.querySelector('#goalpost'),
	    symbol = document.createElement('img'),
	    spriteArray = ['images/basketball_goalpost_0.png', 'images/basketball_goalpost_1.png', 'images/basketball_goalpost_2.png', 'images/basketball_goalpost_3.png', 'images/basketball_goalpost_4.png'],
	    top = 580,
	    currentTop = 100,
		queTxt_wrap = document.querySelector('#queTxt_wrap');


	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.display = "none";
	}

	answerObject.style.background = 'none';
	queTxt_wrap.style.zIndex = 0;

	basketball.style.display = "block";
	ballTxt.style.display = "block";
	streamSound.setSound('media/basketball.mp3');
	setTimeout(function() {

		spriteAnimationCustom(spriteArray, goalpost);

		animate({
			delay : 20,
			duration : 320,
			delta : makeEaseInOut(linear),
			step : function(delta) {
				basketball.style.top = ((currentTop) + ((-currentTop + top)* delta)) + 'px';
				ballTxt.style.top = ((currentTop) + ((-currentTop + top)* delta)) + 'px';
				
			}
		});
	}, 10);
	

	setTimeout(function() {
		animate({
			delay : 20,
			duration : 1300,
			delta : makeEaseOut(elastic),
			step : function(delta) {
				basketball.style.top = ((currentTop * delta) + ((-currentTop + top))) + 'px';
				ballTxt.style.top = ((currentTop * delta) + ((-currentTop + top))) + 'px';
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

	if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))) {
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

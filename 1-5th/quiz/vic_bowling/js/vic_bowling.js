function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	
	
	appendImageElement('goalpost', 'images/vic_bowling_success_1.png', document.getElementById('panel'), 'goalpost');

	appendCircleElement('answerObject', 'questionbox', bgCanvas);
	answerObject.setAttribute('style', 'top:184px; left: 331px;');

	setRand(1,3,3)
	appendImageElement('ball', 'images/vic_bowling_ball_'+ randResult[0] +'.png', bgCanvas, 'bowlingball');
	appendCircleElement('ballTxt', 'bowlingball', bgCanvas);
	ballTxt.innerHTML = gameManager.CURRENT_ANSWER[0];

	gameManager.choiceQuestionImg=['images/vic_bowling_ball_'+ randResult[0] +'.png','images/vic_bowling_ball_'+ randResult[0] +'.png','images/vic_bowling_ball_'+ randResult[0] +'.png'];
	appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.choiceQuestionImg);

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
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
	    ball = document.querySelector('#ball'),
	    ballTxt  = document.querySelector('#ballTxt'),
	    goalpost = document.querySelector('#goalpost'),
	    queTxt_wrap = document.querySelector('#queTxt_wrap'),
	    successArray = ['images/vic_bowling_success_2.png', 'images/vic_bowling_success_3.png', 'images/vic_bowling_success_4.png', 'images/vic_bowling_success_5.png', 'images/vic_bowling_success_5.png'],
	    bowlingLightArray = ['images/vic_bowling_light_on_1.png', 'images/vic_bowling_light_on_2.png', 'images/vic_bowling_light_on_1.png', 'images/vic_bowling_light_on_2.png', 'images/vic_bowling_light_on_1.png'];


	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.display = "none";
	}

	dragObj.style.display = 'block';
	dragObj.style.marginLeft = '250px';
	dragObj.style.marginTop = '150px';

	answerObject.style.background = 'none';
	queTxt_wrap.style.zIndex = 0;

	ball.setAttribute('style','display: block; z-index: 111;');
	ballTxt.setAttribute('style','display: block; z-index: 112;');
	streamSound.setSound('media/basketball.mp3');

	spriteAnimationCustom(successArray, goalpost);

	setTimeout(function(){
		appendImageElement('bowlingLight', 'images/vic_bowling_light.png', bgCanvas);
		spriteAnimationCustom(bowlingLightArray, bowlingLight);
	},900)

	setTimeout(function() {
		logCounter.tryCounter();
		logCounter.endTime();
		clearInterval(countTimer);
		gameOverAnimation();
		
		streamSound.setSound('media/basketball_correct.mp3');

	// 	setTimeout(function() {
	// 		log('excute stampStarIcon!');
	// 		parent.window.stampStarIcon();
	// 	}, 500);

	// 	// save log data
	// 	setTimeout(function() {
	// 		log('excute insDrillHis!');
	// 		parent.window.insDrillHis(logCounter.submitReport());
	// 	}, 1800);
	}, 1200);
}

function ballCompareAnswer(dragObj) {
	log(dragObj.getAttribute('answerValue'));

	if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))) {

		log('@ correct!!');
		gameOver(dragObj);

	} else {
		dragObj.style.display = 'none';

		setTimeout(function(){
			dragObj.style.display = 'block';
		},100)

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
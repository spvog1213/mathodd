
function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
    // parent.window.initClockTimer();

    appendImageElement('answerObject', 'images/digital_balance_bowl_0.png', document.querySelector('#digitalContainer'), 'ballonAnswer');
    appendImageElement('digitalBg', 'images/digital_balance_machine.png', bgCanvas);

    appendCircleElement('answerText_wrap','answerText', bgCanvas);
    appendCircleElement('answerText','answerText', answerText_wrap);
	answerText.innerHTML = '0';

    var circleAnswer = document.querySelector('#answerObject');
    circleAnswer.setAttribute('style', 'top: 282px; left: 293.4px; z-index: 14;');

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
    


    var cal_1 = gameManager.TOTAL_ANSWER_ARRAY[6],
    	cal_2 = gameManager.TOTAL_ANSWER_ARRAY[7];
    switch(cal_1){
    	case '+':
    		appendImageElement('cal_img', 'images/plus.png', calculation1);
    	break;
    	case '-':
    	appendImageElement('cal_img', 'images/minus.png', calculation1);
    	break;
    	case '/':
    		appendImageElement('cal_img', 'images/division.png', calculation1);
    	break;
    	case 'x':
    		appendImageElement('cal_img', 'images/multiplication.png', calculation1);	
    	break;
    }
    switch(cal_2){
    	case '+':
    		appendImageElement('cal_img', 'images/plus.png', calculation2);
    	break;
    	case '-':
    	appendImageElement('cal_img', 'images/minus.png', calculation2);
    	break;
    	case '/':
    		appendImageElement('cal_img', 'images/division.png', calculation2);
    	break;
    	case 'x':
    		appendImageElement('cal_img', 'images/multiplication.png', calculation2);	
    	break;
    }



    appendChoiceQuestion('drag', gameManager.choiceQuestion);

}
function gameOver (dragObj) {
		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[i].style.pointerEvents = "none";
		}

		correctMotion();

		setTimeout(function(){
			// appendCircleElement('answerText','answerText', bgCanvas);
			var answerText = document.querySelector('#answerText');
			answerText.innerHTML = gameManager.CURRENT_ANSWER[0];
		},200)
		
		streamSound.setSound('media/digital_balance_success.mp3');	

		logCounter.tryCounter();
		clearInterval(countTimer);
		logCounter.endTime();
		gameOverAnimation();

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


function correctMotion() {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
		answerObject = document.querySelector('#answerObject'),
		ObjSrc = answerObject.src;

		correctArray2 = ['images/digital_balance_bowl_1.png', 'images/digital_balance_bowl_2.png','images/digital_balance_bowl_2.png','images/digital_balance_bowl_2.png'];
		correctArray3 = ['images/digital_balance_bowl_1.png', 'images/digital_balance_bowl_2.png', 'images/digital_balance_bowl_3.png','images/digital_balance_bowl_3.png'];
	
		if(gameManager.CURRENT_ANSWER[0] === gameManager.TOTAL_ANSWER_ARRAY[3]){
			setTimeout(function() {
			answerObject.setAttribute('src',ObjSrc.replace('0.png', '1.png'));
			},100)
			choiceQuestionContainer[0].style.display = 'none';
		}else if(gameManager.CURRENT_ANSWER[0] === gameManager.TOTAL_ANSWER_ARRAY[4]){
			setTimeout(function() {
				spriteAnimation(correctArray2, answerObject);
			},100)
			choiceQuestionContainer[1].style.display = 'none';
		}else if(gameManager.CURRENT_ANSWER[0] === gameManager.TOTAL_ANSWER_ARRAY[5]){
			setTimeout(function() {
				spriteAnimation(correctArray3, answerObject);
			},100)
			choiceQuestionContainer[2].style.display = 'none';
		}
}

function spriteAnimation(spriteArray, spriteObj) {

	var index = 0;
	animate({
		delay : 80,
		duration : 180,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}


function compareAnswer(dragObj) {
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
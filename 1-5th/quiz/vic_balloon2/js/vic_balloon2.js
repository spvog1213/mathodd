function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	appendCircleElement('answerObject', 'answerObject', document.querySelector('#balloonWrap'));
	answerObject.setAttribute('style', 'top:570px; left: 413px;');

	appendChoiceQuestion('drag', gameManager.choiceQuestion);
	
	queTxt();
}


function queTxt(){
	appendCircleElement('queTxt_wrap','queTxt_wrap', document.querySelector('#balloonWrap'));
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
function initAnimal() {
	var balloonWrap =document.querySelector('#balloonWrap');

	setRand(0,2,3)
	animalArray = ['monkey','bear','sheep'];
	appendImageElement('animal', 'images/vic_balloon2_'+ animalArray[randResult[0]] +'.png', balloonWrap,'abso');

	setRand(1,3,3);
	appendImageElement('balloon', 'images/vic_balloon2_balloon_'+ randResult[0] +'.png', balloonWrap,'abso');
}



function gameOver(dragObj, x, y) {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	var balloonWrap = document.querySelector('#balloonWrap');
		balloonTop = parseInt(balloonWrap.offsetTop),
		balloonLeft = parseInt(balloonWrap.offsetLeft),
		moveTop = -1000,
		moveLeft = 200;	

		balloonWrap.appendChild(dragObj);

		setTimeout(function () {
			animate({
				delay: 20,
				duration: 2000,
				delta: makeEaseInOut(quad), 
				step: function (delta) {
					balloonWrap.style.top = ((moveTop * delta) + balloonTop)  + 'px';	
					balloonWrap.style.left = ((moveLeft * delta) + balloonLeft)  + 'px';	
				}
			});
		}, 500);

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


function animalMotioncorrect() {
	var animal = document.querySelector('#animal'),
		objSrc = animal.src;
		objSrc = objSrc.replace('.png','');
		obj = objSrc.split('_');
		obj = obj.slice(-1);

	correct = ['images/vic_balloon2_'+obj+'_success1.png','images/vic_balloon2_'+obj+'_success2.png','images/vic_balloon2_'+obj+'_success1.png','images/vic_balloon2_'+obj+'_success2.png'];
	spriteAnimation(correct, animal);

}


function animalMotionIncorrect(dragObj) {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
		animal = document.querySelector('#animal'),
		animalSrc = animal.src;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	animal.src = animalSrc.replace('.png','_fail.png');

	setTimeout(function() {
		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[i].style.pointerEvents = "auto";
		}

		animal.src = animalSrc.replace('_fail.png','.png');
	}, 1000);

	streamSound.setSound('../../media/incorrect.mp3');
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

	if (gameManager.CURRENT_ANSWER[0] === parseInt(answerValue)) {

		gameOver(dragObj);
		animalMotioncorrect();
	} else {
		animalMotionIncorrect(dragObj);
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		// streamSound.setSound('../../media/incorrect.mp3');
	}

	
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
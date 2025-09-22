function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	
}
function initChlid() {
	log('initChlid...');

	switch(gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length-1]){
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
   
    appendCircleElement('question1', 'question', document.getElementById('panel'));
    appendImageElement('calculation', 'images/'+ calulation +'.png',document.getElementById('panel'));
    appendCircleElement('question2', 'question', document.getElementById('panel'));

    question1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
    question2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
    
	var top = 250,
	    left = 185;

	//Min, Max, Number
	setRand(1, 3, 3);

	for (var i = 0; i < gameManager.TOTAL_ANSWER_ARRAY.length - 3; i++) {

		var eventCallback = function() {
			arguments[0].preventDefault();
			feedBackAnimation(this);
		};
		createObject(i, top, left, eventCallback, 'images/vic_slide_child_' + randResult[i] + '.png');
		left = left + 220;
	}

}

function gameOver(parentObj) {
	gameOverAnimation();
	

	
	logCounter.endTime();

	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);
}

function createObject(index, top, left, eventCallback, parentObjSrc) {
	var chlidWrap = document.createElement('div'),
	    chlidTxt = document.createElement('div'),
	    parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;

	chlidWrap.setAttribute('id', 'motorcycleWrap_' + index);

	chlidWrap.setAttribute('answerValue', gameManager.TOTAL_ANSWER_ARRAY[index+2]);
	chlidWrap.setAttribute('style', 'position:absolute; top:' + top + 'px; left : ' + left + 'px;');

	gameManager.choiceQuestionPosition.push([top, left]);
	chlidTxt.className = "chlidTxt";
	chlidWrap.className = "chlidWrap";
	parentObj.className = "chlid";

	chlidTxt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[index+2];

	chlidWrap.appendChild(chlidTxt);
	chlidWrap.appendChild(parentObj);

	chlidWrap.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	document.getElementById('bgCanvas').appendChild(chlidWrap);

}

function feedBackAnimation(parentObj, callback) {

	var parentObjId = parentObj.id,
	    answerValue = parseFloat(parentObj.getAttribute('answervalue')),
	    chlidWrap = document.querySelectorAll('.chlidWrap'),
	   
	    correctLeft = parentObj.offsetLeft,
	    incorrectBus,
	    incorrectLeft,
	    incorrectTop;

	parentObjId = parentObjId.split('_');
	parentObjId = parseInt(parentObjId.slice(parentObjId.length - 1));

	switch(parentObjId) {
	case 0:
		incorrectMotorcycle = document.querySelector('#motorcycleWrap_1');
		incorrectMotorcycle2 = document.querySelector('#motorcycleWrap_2');
		break;
	case 1:
		incorrectMotorcycle = document.querySelector('#motorcycleWrap_0');
		incorrectMotorcycle2 = document.querySelector('#motorcycleWrap_2');
		break;
	case 2:
		incorrectMotorcycle= document.querySelector('#motorcycleWrap_1');
		incorrectMotorcycle2 = document.querySelector('#motorcycleWrap_0');
		break;
	}

	incorrectLeft = incorrectMotorcycle.offsetLeft;
	incorrectTop = incorrectMotorcycle.offsetTop;
	incorrectLeft2 = incorrectMotorcycle2.offsetLeft;
	incorrectTop2 = incorrectMotorcycle2.offsetTop;

	if (parseFloat(gameManager.CURRENT_ANSWER[0]) === (answerValue)) {

		childCorrMotion(parentObj);

		for (var i = 0; i < chlidWrap.length; i++) {
			chlidWrap[i].style.pointerEvents = "none";
		};

		streamSound.setSound('media/vic_slide_success.mp3');

		parentObj.style.zIndex = "5";
		
		animate({
			delay : 20,
			duration : 800,
			delta : makeEaseInOut(quad),
			step : function(delta) {
				if(parentObjId === 0){
					parentObj.style.WebkitTransform = 'rotate(12deg)';
					parentObj.style.msTransform = 'rotate(12deg)';
					parentObj.style.transform = 'rotate(12deg)';
					parentObj.style.left = ((correctLeft) + ((-correctLeft+110) * delta)) + 'px';
				}else if(parentObjId === 2){
					parentObj.style.WebkitTransform = 'rotate(-12deg)';
					parentObj.style.msTransform = 'rotate(-12deg)';
					parentObj.style.transform = 'rotate(-12deg)';
					parentObj.style.left = ((correctLeft) + ((-correctLeft+690) * delta)) + 'px';
				}
				parentObj.style.top = ((incorrectTop) + ((-incorrectTop + 500) * delta)) + 'px';

			}
		});
	
		animate({
			delay : 20,
			duration : 900,
			delta : makeEaseInOut(quad),
			step : function(delta) {
				if(parentObjId === 0){
					incorrectMotorcycle2.style.WebkitTransform = 'rotate(-12deg)';
					incorrectMotorcycle2.style.msTransform = 'rotate(-12deg)';
					incorrectMotorcycle2.style.transform = 'rotate(-12deg)';
					incorrectMotorcycle.style.left = ((incorrectLeft) + ((-incorrectLeft+410) * delta)) + 'px';
					incorrectMotorcycle2.style.left = ((incorrectLeft2) + ((-incorrectLeft2 + 810) * delta)) + 'px';
				}else if(parentObjId === 1){
					incorrectMotorcycle.style.WebkitTransform = 'rotate(12deg)';
					incorrectMotorcycle.style.msTransform = 'rotate(12deg)';
					incorrectMotorcycle.style.transform = 'rotate(12deg)';
					incorrectMotorcycle2.style.WebkitTransform = 'rotate(-12deg)';
					incorrectMotorcycle2.style.msTransform = 'rotate(-12deg)';
					incorrectMotorcycle2.style.transform = 'rotate(-12deg)';
					incorrectMotorcycle.style.left = ((incorrectLeft) + ((-incorrectLeft - 20) * delta)) + 'px';
					incorrectMotorcycle2.style.left = ((incorrectLeft2) + ((-incorrectLeft2 + 810) * delta)) + 'px';
					
				}else if(parentObjId === 2){
					incorrectMotorcycle2.style.WebkitTransform = 'rotate(12deg)';
					incorrectMotorcycle2.style.msTransform = 'rotate(12deg)';
					incorrectMotorcycle2.style.transform = 'rotate(12deg)';
					incorrectMotorcycle.style.left = ((incorrectLeft) + ((-incorrectLeft + 410) * delta)) + 'px';
					incorrectMotorcycle2.style.left = ((incorrectLeft2) + ((-incorrectLeft2 - 40) * delta)) + 'px';
				}
				incorrectMotorcycle.style.top = ((incorrectTop) + ((-incorrectTop + 830) * delta)) + 'px';
				incorrectMotorcycle2.style.top = ((incorrectTop) + ((-incorrectTop + 830) * delta)) + 'px';

			}
		});


		setTimeout(function() {
			gameOver();
		}, 800);

	} else {
		childIncorrMotion(parentObj);
		// incorrectAnimation(parentObj);
		// streamSound.setSound('../../media/incorrect.mp3');
		streamSound.setSound('media/vic_slide_fail.wav');
	}

	logCounter.tryCounter();

}

function childCorrMotion(parentObj) {
	var objSrc = parentObj.childNodes[1].src,
		objSrc = objSrc.replace('.png','');
		objNum = objSrc.split('_'),
		objNum = objNum.slice(-1);

	correctArray = ['images/vic_slide_child_'+objNum+'_success_1.png','images/vic_slide_child_'+objNum+'_success_1.png','images/vic_slide_child_'+objNum+'_success_2.png','images/vic_slide_child_'+objNum+'_success_2.png'];
	spriteAnimationCustom(correctArray, parentObj.childNodes[1]);
}

function childIncorrMotion(parentObj) {
	var objSrc = parentObj.childNodes[1].src,
		objSrc = objSrc.replace('.png','');
		objNum = objSrc.split('_'),
		objNum = objNum.slice(-1);

		parentObj.childNodes[1].src = 'images/vic_slide_child_'+objNum+'_fail.png';
		parentObj.style.pointerEvents ='none';

		setTimeout(function(){
			parentObj.childNodes[1].src = parentObj.childNodes[1].src.replace('_fail.png','.png');
			parentObj.style.pointerEvents ='auto';
		},500)
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

function getRand() {
	randNumber = Math.floor(Math.random() * randList.length);
	randResult.push(randList[randNumber]);
	randList.splice(randNumber, 1);
}



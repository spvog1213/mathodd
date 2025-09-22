function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var panel = document.getElementById('panel');

	appendCircleElement('questionTxt', 'questionTxt', panel);
	questionTxt.innerHTML = '세 수의 ' + gameManager.choiceQuestionText;

	for(var i = 0; i < 3; i ++)	{
		appendCircleElement('question'+ i, 'question', panel);
		var question = document.querySelector('#question' + i);
		question.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[i];
	}
	/*
	var  bgAni = document.getElementById('bgAni'),
			bgAniArray = ['images/bus_bg_0.png', 'images/bus_bg_1.png', 'images/bus_bg_2.png'];
					  addIdleSprite(90, bgAni, bgAniArray) ;*/
	
}




function initBus() {
	log('initBus...');

	var top = 355,
	    left = 220;

	//Min, Max, Number
	setRand(1, 3, 3);

	for (var i = 0; i < gameManager.TOTAL_ANSWER_ARRAY.length - 4; i++) {

		var eventCallback = function() {
			arguments[0].preventDefault();
			feedBackAnimation(this);
		};
		createObject(i, top, left, eventCallback, 'images/vic_motorcycle_motorcycle_' + randResult[i] + '.png');
		left = left + 220;
	}

}

function gameOver() {

	gameOverAnimation();
	// streamSound.setSound('../../media/correct.mp3');

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
	var motorcycleWrap = document.createElement('div'),
	    motorcycleTxt = document.createElement('div'),
	    parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;

	motorcycleWrap.setAttribute('id', 'motorcycleWrap_' + index);

	motorcycleWrap.setAttribute('answerValue', gameManager.TOTAL_ANSWER_ARRAY[index+3]);
	motorcycleWrap.setAttribute('style', 'position:absolute; top:' + top + 'px; left : ' + left + 'px;');

	gameManager.choiceQuestionPosition.push([top, left]);
	motorcycleTxt.className = "motorcycleTxt";
	motorcycleWrap.className = "motorcycleWrap";
	parentObj.className = "motorcycle";

	motorcycleTxt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[index+3];

	motorcycleWrap.appendChild(motorcycleTxt);
	motorcycleWrap.appendChild(parentObj);

	motorcycleWrap.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	document.getElementById('bgCanvas').appendChild(motorcycleWrap);

}

function feedBackAnimation(parentObj, callback) {

	var parentObjId = parentObj.id,
	    answerValue = parseFloat(parentObj.getAttribute('answervalue')),
	    motorcycleWrap = document.querySelectorAll('.motorcycleWrap'),
	   
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

		for (var i = 0; i < motorcycleWrap.length; i++) {
			motorcycleWrap[i].style.pointerEvents = "none";
		};

		streamSound.setSound('media/bus.mp3');

		parentObj.style.zIndex = "5";
		
		var motorcycleScale1 = 1;
		animate({
			delay : 20,
			duration : 800,
			delta : makeEaseInOut(linear),
			step : function(delta) {
				if(parentObjId === 0){
					parentObj.style.left = ((correctLeft) + ((-correctLeft + 440) * delta)) + 'px';	
				}else if(parentObjId === 2){
					parentObj.style.left = ((correctLeft) + ((-correctLeft + 440) * delta)) + 'px';	
				}

				motorcycleScale1 = motorcycleScale1 + 0.005;

				parentObj.style.WebkitTransform = 'scale(' + motorcycleScale1 + ',' + motorcycleScale1 + ')';
				parentObj.style.msTransform = 'scale(' + motorcycleScale1 + ',' + motorcycleScale1 + ')';
				parentObj.style.transform = 'scale(' + motorcycleScale1 + ',' + motorcycleScale1 + ')';

			}
		});

		var motorcycleScale2 = 1;
		animate({
			delay : 20,
			duration : 800,
			delta : makeEaseInOut(linear),
			step : function(delta) {
				if(parentObjId === 0 || parentObjId === 1){
					incorrectMotorcycle.style.left = ((incorrectLeft) + ((-incorrectLeft + 310) * delta)) + 'px';
					incorrectMotorcycle2.style.left = ((incorrectLeft2) + ((-incorrectLeft2 + 570) * delta)) + 'px';
				}else if(parentObjId === 2){
					incorrectMotorcycle.style.left = ((incorrectLeft) + ((-incorrectLeft + 570) * delta)) + 'px';
					incorrectMotorcycle2.style.left = ((incorrectLeft2) + ((-incorrectLeft2 + 310) * delta)) + 'px';
				}
				incorrectMotorcycle.style.top = ((incorrectTop) + ((-incorrectTop + 230) * delta)) + 'px';
				incorrectMotorcycle2.style.top = ((incorrectTop) + ((-incorrectTop + 230) * delta)) + 'px';

				motorcycleScale2 = motorcycleScale2 - 0.01;


				/*incorrectBus.style.WebkitTransform = 'scale(0.85,0.85)';
				incorrectBus.style.msTransform = 'scale(0.85,0.85)';
				incorrectBus.style.transform = 'scale(0.85,0.85)';*/

				incorrectMotorcycle.style.WebkitTransform = 'scale(' + motorcycleScale2 + ',' + motorcycleScale2 + ')';
				incorrectMotorcycle.style.msTransform = 'scale(' + motorcycleScale2 + ',' + motorcycleScale2 + ')';
				incorrectMotorcycle.style.transform = 'scale(' + motorcycleScale2 + ',' + motorcycleScale2 + ')';
				incorrectMotorcycle2.style.WebkitTransform = 'scale(' + motorcycleScale2 + ',' + motorcycleScale2 + ')';
				incorrectMotorcycle2.style.msTransform = 'scale(' + motorcycleScale2 + ',' + motorcycleScale2 + ')';
				incorrectMotorcycle2.style.transform = 'scale(' + motorcycleScale2 + ',' + motorcycleScale2 + ')';

			}
		});





		setTimeout(function() {
			gameOver();
		}, 800);

	} else {
		incorrectAnimation(parentObj);
		streamSound.setSound('../../media/incorrect.mp3');
	}

	logCounter.tryCounter();

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



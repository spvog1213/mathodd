function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var panel = document.getElementById('panel');

	appendCircleElement('questionTxt', 'questionTxt', panel);

	var questionTxt = document.querySelector('#questionTxt');

	questionTxt.innerHTML = gameManager.choiceQuestionText;
	
	
	/*
	var  bgAni = document.getElementById('bgAni'),
			bgAniArray = ['images/bus_bg_0.png', 'images/bus_bg_1.png', 'images/bus_bg_2.png'];
					  addIdleSprite(90, bgAni, bgAniArray) ;*/
	
	
}




function initBus() {
	log('initBus...');

	var top = 255,
	    left = 121;

	//Min, Max, Number
	setRand(1, 4, 2);

	for (var i = 0; i < gameManager.TOTAL_ANSWER_ARRAY.length - 1; i++) {

		var eventCallback = function() {
			arguments[0].preventDefault();
			feedBackAnimation(this);
		};
		createObject(i, top, left, eventCallback, 'images/bus_bus_' + randResult[i] + '.png');
		left = left + 398;
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
	var busWrap = document.createElement('div'),
	    busTxt = document.createElement('div'),
	    parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;

	busWrap.setAttribute('id', 'busWrap_' + index);

	busWrap.setAttribute('answerValue', gameManager.TOTAL_ANSWER_ARRAY[index]);
	busWrap.setAttribute('style', 'position:absolute; top:' + top + 'px; left : ' + left + 'px;');

	gameManager.choiceQuestionPosition.push([top, left]);
	busTxt.className = "busTxt";
	busWrap.className = "busWrap";
	parentObj.className = "bus";

	busTxt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[index];

	busWrap.appendChild(busTxt);
	busWrap.appendChild(parentObj);

	busWrap.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	document.getElementById('bgCanvas').appendChild(busWrap);

}

function feedBackAnimation(parentObj, callback) {

	var parentObjId = parentObj.id,
	    answerValue = parseInt(parentObj.getAttribute('answervalue')),
	    busWrap = document.querySelectorAll('.busWrap'),
	   
	    correctLeft = parentObj.offsetLeft,
	    incorrectBus,
	    incorrectLeft,
	    incorrectTop;

	parentObjId = parentObjId.split('_');
	parentObjId = parseInt(parentObjId.slice(parentObjId.length - 1));

	switch(parentObjId) {
	case 0:
		incorrectBus = document.querySelector('#busWrap_1');
		break;
	case 1:
		incorrectBus = document.querySelector('#busWrap_0');
		break;
	}

	incorrectLeft = incorrectBus.offsetLeft;
	incorrectTop = incorrectBus.offsetTop;

	if (parseInt(gameManager.CURRENT_ANSWER[0]) === (answerValue)) {

		log(answerValue + '야')
		for (var i = 0; i < busWrap.length; i++) {
			busWrap[i].style.pointerEvents = "none";
		};

		streamSound.setSound('media/bus.mp3');

		parentObj.style.zIndex = "5";
		
		var busScale1 = 1;
		animate({
			delay : 20,
			duration : 800,
			delta : makeEaseInOut(linear),
			step : function(delta) {
				parentObj.style.left = ((correctLeft) + ((-correctLeft + 320) * delta)) + 'px';

				busScale1 = busScale1 + 0.005;

				

				parentObj.style.WebkitTransform = 'scale(' + busScale1 + ',' + busScale1 + ')';
				parentObj.style.msTransform = 'scale(' + busScale1 + ',' + busScale1 + ')';
				parentObj.style.transform = 'scale(' + busScale1 + ',' + busScale1 + ')';

			}
		});

		var busScale2 = 1;
		animate({
			delay : 20,
			duration : 800,
			delta : makeEaseInOut(linear),
			step : function(delta) {
				incorrectBus.style.left = ((incorrectLeft) + ((-incorrectLeft + 310) * delta)) + 'px';
				incorrectBus.style.top = ((incorrectTop) + ((-incorrectTop + 230) * delta)) + 'px';
				
				busScale2 = busScale2 - 0.01;

				/*incorrectBus.style.WebkitTransform = 'scale(0.85,0.85)';
				incorrectBus.style.msTransform = 'scale(0.85,0.85)';
				incorrectBus.style.transform = 'scale(0.85,0.85)';*/

				incorrectBus.style.WebkitTransform = 'scale(' + busScale2 + ',' + busScale2 + ')';
				incorrectBus.style.msTransform = 'scale(' + busScale2 + ',' + busScale2 + ')';
				incorrectBus.style.transform = 'scale(' + busScale2 + ',' + busScale2 + ')';

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



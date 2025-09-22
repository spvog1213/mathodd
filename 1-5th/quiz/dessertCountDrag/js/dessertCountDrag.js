function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject', 'circle', document.getElementById('bgCanvas'));

	var questionWrap = document.getElementById("questionWrap"),
	    circleAnswer = document.querySelector('#answerObject');
	circleAnswer.setAttribute('style', 'top:341px; left: 532px;');

	var txtQuestionleft = document.createElement('span'),
	    txtQuestionRight = document.createElement('span');
	txtQuestionleft.setAttribute('id', 'txtQuestionLeft');
	txtQuestionRight.setAttribute('id', 'txtQuestionRight');
	txtQuestionleft.innerHTML = gameManager.question + '개보다';
	txtQuestionRight.innerHTML = '개 더 많습니다.';

	questionWrap.appendChild(txtQuestionleft);
	questionWrap.appendChild(txtQuestionRight);

	appendChoiceQuestion('drag', gameManager.choiceQuestion);

}

function initDessert() {
	log('initDessert...');

	var left = 15,
	    dessert,
	    num,
	    dessertTotal = parseInt(gameManager.dessertTotal),
	    dessertQuestion = parseInt(gameManager.question);

	switch (gameManager.dessertType) {
	case 'CANDY':
		dessert = 'images/candy_';
		num = makeRandom(1, 6);
		break;
	case 'DONUT':
		dessert = 'images/donuts_';
		num = makeRandom(1, 6);
		break;
	case 'ICECREAM':
		dessert = 'images/ice_';
		num = makeRandom(1, 4);
		break;
	}

	for (var i = 0; i < dessertTotal; i++) {
		var top = 100,
		    eventCallback = function() {
			arguments[0].preventDefault();
			streamSound.setSound('media/fruits.mp3');
			dessertAnimation(this, function() {
			});

		};

		createObject(i, top, left, eventCallback, dessert, num);
	}

}

function dessertAnimation(parentObj, callback) {
	var top = 52,
	    currentTop = 30;

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			parentObj.style.top = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
			//parentObj.style.left = gameManager.choiceDessertPosition[parentObj[1]][1] + 'px';

		}
	});

}

function gameOver() {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
	dessertContainer=document.querySelector('#dessertContainer');

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	
	dessertContainer.style.pointerEvents = "none";

	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');
	logCounter.tryCounter();

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

function createObject(index, top, left, eventCallback, parentObjSrc, num) {
	var choiceTop = 52,
	    choiceLeft = 95,
	    parentObj = document.createElement('img');

	parentObj.src = parentObjSrc + num + '.png';

	parentObj.setAttribute('id', 'parentObj_' + index);

	choiceLeft = (choiceLeft * index) + 30;

	// gameManager.choiceDessertPosition.push([choiceTop, choiceLeft]);

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	parentObj.setAttribute('style', 'position:absolute; top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');
	document.getElementById('dessertContainer').appendChild(parentObj);
}

function feedBackAnimation(parentObj, parentObjSrc, callback) {

	parentObj.src = parentObjSrc;

	setTimeout(function() {

		callback();

	}, 200);
}

function makeRandom(min, max) {
	var RandVal = Math.random() * (max - min) + min;
	return Math.floor(RandVal);
}

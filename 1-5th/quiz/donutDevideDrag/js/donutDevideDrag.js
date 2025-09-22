function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();
}

function initDonut(donutCounter) {
	log('initDonut...');

	var left = 15,
	    donutOriginal,
	    question1 = document.createElement('div'),
	    question2 = document.createElement('div'),
	    questionTop = document.createElement('div'),
	    answerObject1 = document.getElementById('answerObject1'),
	    answerObject2 = document.getElementById('answerObject2');

	question1.setAttribute('id', 'question1');
	question2.setAttribute('id', 'question2');
	questionTop.setAttribute('id', 'questionTop');

	questionTop.setAttribute('style', 'top:2%; left:58%');
	
	question1.setAttribute('style', 'top:53%; left:31%');
	question2.setAttribute('style', 'top:53%; left:83%');
	bgCanvas.appendChild(questionTop);
	bgCanvas.appendChild(question1);
	bgCanvas.appendChild(question2);

	questionTop.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];

	question1.innerHTML = gameManager.CURRENT_ANSWER[0];
	question2.innerHTML = gameManager.CURRENT_ANSWER[1];

	/*랜덤 도넛*/
	var donutTypes = Math.floor(5 * Math.random());

	switch (donutTypes) {
	case 0:
		donutOriginal = 'images/donutdevide_donut_1.png';
		break;
	case 1:
		donutOriginal = 'images/donutdevide_donut_2.png';
		break;
	case 2:
		donutOriginal = 'images/donutdevide_donut_3.png';
		break;
	case 3:
		donutOriginal = 'images/donutdevide_donut_4.png';
		break;
	case 4:
		donutOriginal = 'images/donutdevide_donut_5.png';
		break;
	}

	for (var i = 0; i < donutCounter; i++) {
		var top = 90,
		    eventCallback = function() {
			arguments[0].preventDefault();

		};

		createObject(i, top, left, eventCallback, donutOriginal);
	}

}

function gameOver() {
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');

	logCounter.tryCounter();
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
	var choiceTop = 25,
	    choiceLeft = 95,
	    parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;

	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObj.className = "donut";

	if (index > 4) {
		index = index - 5;
		choiceTop = (choiceTop + 80);
		choiceLeft = choiceLeft * index + 80;
		parentObj.setAttribute('style', 'padding-top: 6px; padding-bottom: 3px; top: ' + choiceTop + 'px; left:' + choiceLeft + 'px; padding-left : ' + (left / 2.5) + 'px; padding-right : ' + (left / 2.5) + 'px;');
	} else {
		choiceLeft = choiceLeft * index + 80;
		parentObj.setAttribute('style', 'padding-top: 6px; padding-bottom: 3px; left:' + choiceLeft + 'px; padding-left : ' + (left / 2.5) + 'px; padding-right : ' + (left / 2.5) + 'px;');

	}

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);
	gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
	document.getElementById('donutCounter').appendChild(parentObj);

	new Dragdrop(parentObj);
}

function donutCompareAnswer(dragObj) {

	var answerObj1 = document.querySelector('#answerObject1'),
	    answerObj2 = document.querySelector('#answerObject2'),
	    answerChildNode1 = parseInt(answerObj1.childNodes.length),
	    answerChildNode2 = parseInt(answerObj2.childNodes.length);

	if (gameManager.CURRENT_ANSWER[0] === answerChildNode1 && gameManager.CURRENT_ANSWER[1] === answerChildNode2) {
		streamSound.setSound('media/donut.mp3');
		log('@ correct!!');
		setTimeout(function() {
			gameOver();
		}, 1000);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);

	}
}


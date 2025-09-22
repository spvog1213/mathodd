function initScene() {
	log('initScene...');
	
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	plusElement();
}

function plusElement() {
	appendImageElement('bgweight', 'images/weight_balance_1.png', document.querySelector('#bgCanvas'));
	appendImageElement('balance1', 'images/weight_balance_4.png', document.querySelector('#bgCanvas'));
	appendImageElement('balance2', 'images/weight_balance_3.png', document.querySelector('#bgCanvas'));
	appendImageElement('balance4', 'images/weight_balance_2.png', document.querySelector('#bgCanvas'));
	appendImageElement('balance3', 'images/weight_balance_2.png', document.querySelector('#answerObject1'));

	var ballImg = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
		ballNum = document.createElement('div');
		ballNum.setAttribute('id','ballNum');

	appendImageElement('weightBallImg', 'images/weight_ball_' + ballImg + '.png', document.querySelector('#weightBall'));
	document.getElementById('weightBall').appendChild(ballNum);
	ballNum.innerHTML =gameManager.TOTAL_ANSWER_ARRAY[0] / 10;

	var BallNumPosition = [308,295,282,269,256,243,230,217,204];
		ballNum.setAttribute('style','line-height:' + BallNumPosition[ballImg - 1] + 'px');


	CheckButton();
}
function initWeight() {
	log('initWeight...');

	var left = 15,
	    weightOriginal,
	    checkBtn = document.getElementById('checkBtn'),
	    answerObject1 = document.getElementById('answerObject1');

	checkBtn.style.display="block";
	weightOriginal = 'images/weight.png';
	

	for (var i = 0; i < 10; i++) {
		var top = 90,
		    eventCallback = function() {
			arguments[0].preventDefault();

		};

		createObject(i, top, left, eventCallback, weightOriginal);
	}

}

function gameOver() {
	var answerObj1 = document.querySelector('#answerObject1'),
	   	weight_answer = document.querySelector('.weight_answer'),
	    answerChildNode1 = parseInt(answerObj1.childNodes.length -1),
	    weight_answer1 = parseInt(weight_answer.childNodes.length);

	if (gameManager.CURRENT_ANSWER[0] === answerChildNode1) {
		var weightCounter = document.querySelector('#weightCounter').childNodes,
		    checkBtn = document.querySelector('#checkBtn');
		    
		for (var i = 0; i < weightCounter.length; i++) {
			weightCounter[i].style.pointerEvents = "none";
			checkBtn.style.pointerEvents = "none";
		}

		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');


	var balance2 = document.querySelector('#balance2'),
		balance4 = document.querySelector('#balance4'),
		weightBall = document.querySelector('#weightBall'),
		answerObject1  = document.querySelector('#answerObject1'),
	    angle = -1,
	    balance4Top = -30,
	    weightBallTop = -30,
	    answerObject1Top = 30;


	animate({
		delay : 100,
		duration : 1200,
		delta : makeEaseOut(quad),
		step : function(delta) {
			balance2.style.WebkitTransform = 'rotate(' + (angle) + 'deg)';
			balance2.style.msTransform = 'rotate(' + (angle) + 'deg)';
			balance2.style.transform = 'rotate(' + (angle) + 'deg)';

			if (angle < 0)
				angle++;
		}
	});

		animate({
		delay : 100,
		duration : 400,
		delta : makeEaseOut(quad),
		step : function(delta) {
			weightBall.style.top = ((weightBallTop * delta)) + 'px';
			balance4.style.top = ((balance4Top * delta)) + 'px';
			answerObject1.style.top = ((answerObject1Top * delta)) + 'px';
		}
	});

		logCounter.tryCounter();
		logCounter.endTime();

		setTimeout(function() {
			log('excute stampStarIcon!');
			// parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			// parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);

	} else {
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();

		setTimeout(function() {
			CheckButton();
			gameManager.selectedQuestion = [];
			document.querySelector('#bgCanvas').innerHTML = "<div id='weightCounter'></div><div id='answerObject1'></div><div id='weightBall'></div><img src='images/boxfill_checkbtn.png' id = 'checkBtn'/>";
			initWeight(10);
			plusElement();
			
			
		}, 400);
	}
}

function createObject(index, top, left, eventCallback, parentObjSrc) {
	var choiceTop = 30,
	    choiceLeft = 0,
	    parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;

	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObj.className = "weight_answer";

	parentObj.setAttribute('style', 'top: ' + choiceTop + 'px;');
	gameManager.choiceQuestionPosition.push([choiceTop, 0]);

	document.getElementById('weightCounter').appendChild(parentObj);

	new Dragdrop(parentObj);

}

function boundingCircle(dragObj, x, y) {

	switch (gameManager.CURRENT_TYPE) {
	case 'weight':
		var answerObj1 = document.querySelector('#answerObject1'),
		    answerChildNode1 = parseInt(answerObj1.childNodes.length);

		if (x > answerObj1.offsetLeft * gameManager.zoomRate && x < (answerObj1.offsetLeft * gameManager.zoomRate) + ((answerObj1.clientWidth + 10) * gameManager.zoomRate) && y > answerObj1.offsetTop * gameManager.zoomRate && y < (answerObj1.offsetTop * gameManager.zoomRate) + ((answerObj1.clientHeight + 10) * gameManager.zoomRate) && answerChildNode1 <= 10) {
			log('bounding!');

			streamSound.setSound('media/donut.mp3');
			var objsrc = dragObj.src;
				dragObj.setAttribute('src',objsrc.replace('.png','_' + answerChildNode1 + '.png'))

			dragObj.setAttribute('style','top: 30px;');
			answerObj1.appendChild(dragObj);

		} else {
			streamSound.setSound('../../media/incorrect.mp3');
			log('not bounding!');
			logCounter.tryCounter();
			incorrectAnimation(dragObj);
		}
		break;

	default:
	}

}

function CheckButton() {
	var checkBtn = document.querySelector('#checkBtn');

	btnDown = function(e) {
		e.preventDefault();
		checkBtn.src = 'images/boxfill_checkbtn_push.png';
	}
	btnUp = function(e) {
		e.preventDefault();
		checkBtn.src = 'images/boxfill_checkbtn.png';
		gameOver();
	}

	checkBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	checkBtn.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);

}


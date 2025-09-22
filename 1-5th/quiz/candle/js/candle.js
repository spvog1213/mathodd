function initScene() {
	log('initScene...');

	log('excute initClockTimer!');
	CheckButton();
	// parent.window.initClockTimer();
	
	

}

function initCandle(candleCounter) {
	log('initCandle...');

	appendCircleElement('wrap','wrap', document.querySelector('#answerObject1'));
	appendImageElement('cake','images/candle_cake.png', bgCanvas);

	appendCircleElement('ansbox','txt', bgCanvas);
	appendCircleElement('answrap','txt', document.querySelector('#ansbox'));
	appendCircleElement('ans1','txt', document.querySelector('#answrap'));
	appendCircleElement('line','txt', document.querySelector('#answrap'));
	appendCircleElement('ans2','txt', document.querySelector('#answrap'));

	ansbox.setAttribute('style','position: absolute; width: 149px; height: 150px; text-align: center; top: 467px;left: 469px;');
	answrap.setAttribute('style','display: inline-block; width: 149px;');
	line.setAttribute('style','letter-spacing: -4px; height: 3px; margin-left: -4px; margin-top: -17px;');

	ans1.style.paddingTop = '23px';
	ans2.style.paddingTop = '21px';

	ans1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0][0];
	line.innerHTML = '-----';
	ans2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0][1];

	appendCircleElement('question1','question1', bgCanvas);
	question1.setAttribute('style', 'top:53%; left:31%');

	appendCircleElement('questionTop','txt', bgCanvas);
	questionTop.innerHTML = '분수만큼 초를 꽂으세요.';

	var candelArray = ['green','pink'];
		randomColor = parseInt(Math.floor(Math.random() * 2));
	candleoriginal = 'images/candle_off_' + candelArray[randomColor] + '.png';

	var left = 60;
	   	


	for (var i = 0; i < candleCounter; i++) {
		var top = 90,
		    eventCallback = function() {
			arguments[0].preventDefault();

		};

		createObject(i, top, left, eventCallback, candleoriginal);
	}


}

function gameOver(dragObj) {
	var answerObj1 = document.querySelector('#answerObject1'),
	    answerChildNode1 = parseInt(answerObj1.childNodes[0].childNodes.length);

	if (gameManager.CURRENT_ANSWER[0][0] === answerChildNode1) {

		for(var i = 0; i < 10; i++){
			var parentObj = document.querySelector('#parentObj_' + i);
			parentObj.style.pointerEvents = 'none';
		}

		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');

		for(var a = 0; a < gameManager.CURRENT_ANSWER[0][0]; a++){
			var obj = answerObj1.childNodes[0].childNodes[a].childNodes[0];
			var objsrc = obj.src;
			obj.setAttribute('src',objsrc.replace('off','on'));
		}

		logCounter.tryCounter();
		logCounter.endTime();

		var checkBtn = document.querySelector('#checkBtn');
		checkBtn.style.pointerEvents = "none";


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
		log('@ incorrect!!');
		logCounter.tryCounter();
		streamSound.setSound('../../media/incorrect.mp3');
		
		setTimeout(function() {
			gameManager.selectedQuestion = [];
			document.querySelector('#bgCanvas').innerHTML = "<div id='candleCounter'></div><div id='answerObject1'></div><img src='images/boxfill_checkbtn.png' id = 'checkBtn'/>";
			initCandle(10);
			CheckButton();
		}, 400);
	}
	

}

function boundingCircle(dragObj, x, y) {
	switch (gameManager.CURRENT_TYPE) {
	case 'candle':
		var answerObj1 = document.querySelector('#answerObject1'),
			wrapLength = parseInt(document.querySelector('#answerObject1').childNodes[0].childNodes.length),
			wrap = document.querySelector('#wrap'),
		  	answerChildNode1 = parseInt(answerObj1.childNodes.length)+1;

		if (x > answerObj1.offsetLeft * gameManager.zoomRate && x < (answerObj1.offsetLeft * gameManager.zoomRate) + ((answerObj1.clientWidth+ 10) * gameManager.zoomRate) && y > answerObj1.offsetTop * gameManager.zoomRate && y < (answerObj1.offsetTop * gameManager.zoomRate) + ((answerObj1.clientHeight + 10) * gameManager.zoomRate) && answerChildNode1) {
			log('bounding!');

			boundingCounter = true;
			streamSound.setSound('media/donut.mp3');
			
			wrap.appendChild(dragObj);
			dragObj.className = 'chage';
			dragObj.setAttribute('style','display: inline-block; width: 58px; margin: 0 auto;');

			var dragObjSrc = dragObj.childNodes[0].src;
			dragObj.childNodes[0].setAttribute('src',dragObjSrc.replace('.png','_2.png'));


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

function createObject(index, top, left, eventCallback , parentObjSrc) {
	var choiceTop = 0,
	    choiceLeft = 0,
	    parentObj = document.createElement('div');

	appendImageElement('candle','', parentObj);
	parentObj.childNodes[0].src = parentObjSrc;

	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObj.className = "candles";

	
	appendCircleElement('txt1','txt2', parentObj);
	appendCircleElement('line','txt2', parentObj);
	appendCircleElement('txt2','txt2', parentObj);

	parentObj.childNodes[1].innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1][0];
	parentObj.childNodes[2].innerHTML = '----';
	parentObj.childNodes[3].innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1][1];

	parentObj.childNodes[1].setAttribute('style','margin-top: -114px;');
	parentObj.childNodes[2].setAttribute('style','margin-left: -4px; margin-top: -15px; height: 5px; letter-spacing: -5px;');
	parentObj.childNodes[3].setAttribute('style','margin-top: 25px;');

	gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
	document.getElementById('candleCounter').appendChild(parentObj);

	new Dragdrop(parentObj);
}


function CheckButton(dragObj) {
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


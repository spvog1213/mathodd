function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	var piggyContainer = document.querySelector('#piggyContainer');

	appendImageElement('piggyImg', 'images/piggybank_back.png', piggyContainer);
	appendImageElement('coinTray', 'images/piggybank_tray.png', document.querySelector('#bgCanvas'));

	appendChoiceQuestion('click', gameManager.choiceQuestion, gameManager.choiceQuestionImgArray);

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	initCoinContainer();

	var startButton = document.querySelector('#startButton');
	startButton.addEventListener(gameManager.eventSelector.downEvent, function() {
		log('startButton click!');

		log('excute initClockTimer!');
		// parent.window.initClockTimer();

		startButton.style.display = 'none';
		streamSound.setSound('media/dropCoin.mp3');

		var angle = 0,
		    top = 70,
		    currentTop = 70,
		    piggyRotateAinmation = setInterval(function() {
			piggyContainer.style.WebkitTransform = 'rotate(' + (angle) + 'deg)';
			piggyContainer.style.msTransform = 'rotate(' + (angle) + 'deg)';
			piggyContainer.style.transform = 'rotate(' + (angle) + 'deg)';

			angle = angle + 2;

			if (angle > 180) {
				clearInterval(piggyRotateAinmation);
			}

		}, 1);

		setTimeout(function() {
			animate({
				delay : 20,
				duration : 1000,
				delta : makeEaseOut(elastic),
				step : function(delta) {
					piggyContainer.style.top = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
				}
			});

		}, 550);

		setTimeout(function() {
			document.querySelector('#totalCoinContainer').style.display = 'block';
			var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
			for (var i = 0; i < choiceQuestionContainer.length; i++) {
				choiceQuestionContainer[i].style.pointerEvents = "auto";
			}
		}, 800);

	}, false);

}

function appendCoin(coinType, coinbox) {
	var coinObj = document.createElement('img'),
	    coinName;

	switch (coinType) {
	case '100':
		coinObj.src = 'images/100coin_0.png';
		coinName = '100coin';
		break;
	case '10':
		coinObj.src = 'images/10coin_0.png';
		coinName = '10coin';
		break;
	case '1':
		coinObj.src = 'images/1coin_0.png';
		coinName = '1coin';
		break;
	}
	coinObj.addEventListener(gameManager.eventSelector.downEvent, function() {

		streamSound.setSound('media/singleCoin.mp3');
		spriteAnimation(['images/' + coinName + '_1.png', 'images/' + coinName + '_2.png', 'images/' + coinName + '_3.png', 'images/' + coinName + '_0.png', 'images/' + coinName + '_0.png'], coinObj);

	}, false);
	coinbox.appendChild(coinObj);
}

function initCoinContainer() {
	log('initCoinContainer...');

	var totalCoinContainer = document.createElement('div'),
	    coinbox100 = document.createElement('div'),
	    coinbox10 = document.createElement('div'),
	    coinbox1 = document.createElement('div');

	totalCoinContainer.setAttribute('id', 'totalCoinContainer');
	coinbox100.setAttribute('id', 'coinbox100');
	coinbox10.setAttribute('id', 'coinbox10');
	coinbox1.setAttribute('id', 'coinbox1');

	for (var i = 0; i < gameManager.TOTAL_ANSWER_ARRAY[0]; i++) {
		appendCoin('100', coinbox100);
	}

	for (var j = 0; j < gameManager.TOTAL_ANSWER_ARRAY[1]; j++) {
		appendCoin('10', coinbox10);
	}

	for (var z = 0; z < gameManager.TOTAL_ANSWER_ARRAY[2]; z++) {
		appendCoin('1', coinbox1);
	}

	if (gameManager.TOTAL_ANSWER_ARRAY[0] > 0)
		totalCoinContainer.appendChild(coinbox100);

	if (gameManager.TOTAL_ANSWER_ARRAY[1] > 0)
		totalCoinContainer.appendChild(coinbox10);

	if (gameManager.TOTAL_ANSWER_ARRAY[2] > 0)
		totalCoinContainer.appendChild(coinbox1);

	document.querySelector('#bgCanvas').appendChild(totalCoinContainer);
}

function gameOver(dragObj) {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
	    totalCoinContainer = document.querySelector('#totalCoinContainer');

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	totalCoinContainer.style.pointerEvents = "none";
	
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');

	document.querySelector('#answerMark').setAttribute('style', 'position: absolute; display: block; top:' + (dragObj.offsetTop + 20) + 'px; left:' + (dragObj.offsetLeft + 40) + 'px;');

	logCounter.tryCounter();
	logCounter.endTime();

	var clock = parent.document.querySelector('#clock');
	clock.innerHTML  = "";

	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);
	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);

}

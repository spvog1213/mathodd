function initScene() {
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		spinClock = createElement('div', bgCanvas, 'spinClock'),
		clock = createElement('div', bgCanvas, 'clock clock_0'),
		dot = createElement('div', bgCanvas, 'dot dot_0'),
		hour = createElement('div', bgCanvas, 'hour hour_0'),
		minute = createElement('div', bgCanvas, 'minute minute_0'),
		doneBtn_on = createElement('div',bgCanvas,'doneBtn_on'),
		text = createElement('div',bgCanvas,'text'),
		swWrapper = QS('.swWrapper');


		gameManager.quizPosition.push([30,80]);
		text.innerHTML = ':';


	var configs = { slot : [] ,
		doneCallBack : function () {
			var results = SALTGAMER.SpinPicker.getSelectedValues();

			gameManager.value = results.values;
			gameManager.key = results.keys;

			for(var i = 0; i < results.keys.length; i++){

				if(gameManager.value[i] == gameManager.key[i]){
					gameManager.dabCount ++;
				}else{
				}
			}

			if(gameManager.dabCount == results.keys.length){
				gameOver();
				streamSound.setSound('../../media/correct.mp3');
			}else{
				setTimeout(function() {
					QS('.doneBtn_on').style.visibility = "hidden";
					QS('.doneBtn').style.visibility = "visible";
				},100);
				incorrectAnimation(clock);
				incorrectAnimation(dot);
				incorrectAnimation(hour);
				incorrectAnimation(minute);
				streamSound.setSound('../../media/incorrect.mp3');
				gameManager.dabCount = 0
				
			}

		}

	};

	for (var i = 2; i < gameManager.QUIZ_OPTION.length; i++) {
		var contents = { data : {}, style : 'spin', default : ''	}
		configs.slot.push(contents)
	}

	for (var i = 2; i < gameManager.QUIZ_OPTION.length; i++) {

		if(gameManager.QUIZ_OPTION[i][0][0] == 'text'){

			for(var j = 0; j < gameManager.QUIZ_OPTION[i][0][1].length; j++){

				configs.slot[i-2].data[0] = gameManager.QUIZ_OPTION[i][0][1][j]

			}
		}else if(gameManager.QUIZ_OPTION[i][0][0] == 'number') {

			for (var l = 0; l < gameManager.QUIZ_OPTION[i][0][1]; l ++) {
				if(gameManager.QUIZ_OPTION[i][0][1] !== 60){					
					var num = l.toString();
				}else{
					var num = leadingZeros(l,2);
				}
				configs.slot[i-2].data[l] = num;
			}
		}

		configs.slot[i-2].style = gameManager.QUIZ_OPTION[i][1]
		configs.slot[i-2].default = gameManager.QUIZ_OPTION[i][2]
	}

	SALTGAMER.SpinPicker.initSpinPicker(configs);

	clock.style.background = 'url(images/mainClock.png)'

	var hourTrans = gameManager.QUIZ_OPTION[1] / 12;

	hour.style.WebkitTransform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[0] + hourTrans * 6) + 'deg)';
	hour.style.mozTransform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[0] + hourTrans * 6) + 'deg)';
	hour.style.msTransform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[0] + hourTrans * 6) + 'deg)';
	hour.style.oTransform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[0] + hourTrans * 6) + 'deg)';
	hour.style.transform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[0] + hourTrans * 6) + 'deg)';
	// hour.style.transform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[0]) + 'deg)';
	minute.style.WebkitTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[1]) + 'deg)';
	minute.style.mozTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[1]) + 'deg)';
	minute.style.msTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[1]) + 'deg)';
	minute.style.oTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[1]) + 'deg)';
	minute.style.transform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[1]) + 'deg)';

}

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++) {
			zero += '0';
		}
	}
	return zero + n;
}



function gameOver(currentObj) {

	var bgCanvas = document.getElementById('bgCanvas')
	QS('.doneBtn').style.visibility = "hidden"
	QS('.doneBtn_on').style.visibility = "visible"
	bgCanvas.style.pointerEvents = 'none'

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
	gameOverAnimation();
	},100);

	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2300);



}

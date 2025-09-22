function initScene() {

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		spinClock = createElement('div', bgCanvas, 'spinClock'),
		clock = createElement('div', bgCanvas, 'clock clock_0'),
		dot = createElement('div', bgCanvas, 'dot dot_0'),
		hour = createElement('div', bgCanvas, 'hour hour_0'),
		minute = createElement('div', bgCanvas, 'minute minute_0'),
		second = createElement('div', bgCanvas, 'second second_0'),
		doneBtn = document.querySelector('.doneBtn'),
		doneBtn_on = createElement('div',bgCanvas,'doneBtn_on'),
		swWrapper = QS('.swWrapper');


	for(var i = 0; i < 2; i++){
		 createElement('div',bgCanvas,'text_'+i).innerHTML = ':';
	}


	doneBtn_on.style.visibility = "hidden";
	gameManager.quizPosition.push([40,80]);

	var configs = { slot : [] ,
		doneCallBack : function () {
			var results = SALTGAMER.SpinPicker.getSelectedValues();

			gameManager.value = results.values
			gameManager.key = results.keys

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
				incorrectAnimation(clock);
				incorrectAnimation(dot);
				incorrectAnimation(hour);
				incorrectAnimation(minute);
				incorrectAnimation(second);
				streamSound.setSound('../../media/incorrect.mp3');
				gameManager.dabCount = 0
				setTimeout(function() {
					QS('.doneBtn_on').style.visibility = "hidden";
					QS('.doneBtn').style.visibility = "visible";
				},100);
			}

		}

	};

	for (var i = 3; i < gameManager.QUIZ_OPTION.length; i++) {
		var contents = { data : {}, style : 'spin', default : ''	}
		configs.slot.push(contents)
	}

	for (var i = 3; i < gameManager.QUIZ_OPTION.length; i++) {
		var num;
		if(gameManager.QUIZ_OPTION[i][0][0] == 'text'){

			for(var j = 0; j < gameManager.QUIZ_OPTION[i][0][1].length; j++){
				if(i !== 4){					
					var num = gameManager.QUIZ_OPTION[i][0][1];
				}else{
					num = leadingZeros(gameManager.QUIZ_OPTION[i][0][1][j],2)
				}
				// console.log(gameManager.QUIZ_OPTION[i][0][1].toString().length)
				// num = leadingZeros(gameManager.QUIZ_OPTION[i][0][1][j],2)
				configs.slot[i-3].data[0] = num
			}


		}else if(gameManager.QUIZ_OPTION[i][0][0] == 'number') {

			for (var l = 0; l < gameManager.QUIZ_OPTION[i][0][1]; l ++) {

				if(gameManager.QUIZ_OPTION[i][0][1] !== 60){					
					var num = l.toString();
				}else{
					var num = leadingZeros(l,2);
				}
				configs.slot[i-3].data[l] = num;
			}
		}

		configs.slot[i-3].style = gameManager.QUIZ_OPTION[i][1]
		configs.slot[i-3].default = gameManager.QUIZ_OPTION[i][2]
	}


	SALTGAMER.SpinPicker.initSpinPicker(configs);
	var	doneBtn = document.querySelector('.doneBtn');
	doneBtn.style.opacity = "1";

	clock.style.background = 'url(images/mainClock.png)';

	var hourTrans = gameManager.QUIZ_OPTION[1] / 12;

	hour.style.WebkitTransform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[0] + hourTrans * 6) + 'deg)';
	hour.style.mozTransform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[0] + hourTrans * 6) + 'deg)';
	hour.style.msTransform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[0] + hourTrans * 6) + 'deg)';
	hour.style.oTransform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[0] + hourTrans * 6) + 'deg)';
	hour.style.transform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[0] + hourTrans * 6) + 'deg)';

	minute.style.WebkitTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[1]) + 'deg)';
	minute.style.mozTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[1]) + 'deg)';
	minute.style.msTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[1]) + 'deg)';
	minute.style.oTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[1]) + 'deg)';
	minute.style.transform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[1]) + 'deg)';

	second.style.WebkitTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[2]) + 'deg)';
	second.style.mozTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[2]) + 'deg)';
	second.style.msTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[2]) + 'deg)';
	second.style.oTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[2]) + 'deg)';
	second.style.transform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[2]) + 'deg)';

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

	var bgCanvas = document.getElementById('bgCanvas');
	bgCanvas.style.pointerEvents = 'none'

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
		QS('.doneBtn').style.visibility = "hidden"
		QS('.doneBtn_on').style.visibility = "visible"
		console.log(QS('.doneBtn_on'))
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

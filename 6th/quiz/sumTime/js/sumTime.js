function initScene() {
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		spinClock = createElement('div', bgCanvas, 'spinClock'),
		board = createElement('div', bgCanvas, 'board'),
		afterText = createElement('div', bgCanvas, 'afterText'),
		doneBtn_on = createElement('div',bgCanvas,'doneBtn_on'),
		swWrapper = QS('.swWrapper');

	for(var i = 0; i < 2; i++){
		 createElement('div',bgCanvas,'text_'+i).innerHTML = ':';
	}


	var configs = { slot : [] ,
		doneCallBack : function () {
			var results = SALTGAMER.SpinPicker.getSelectedValues();

			gameManager.value = results.values;
			gameManager.key = results.keys;

			for(var i = 0; i < results.keys.length; i++){

				if(gameManager.value[i] == gameManager.key[i]){
					console.log('i', i, gameManager.value[i], gameManager.key[i])
					gameManager.dabCount ++;
				}
			}

			if(gameManager.dabCount == results.keys.length){
				gameOver();
			}else{
				if(gameManager.QUIZ_OPTION[0] == 'clock'){
					gameManager.quizPosition.push([204,190]);
					incorrectAnimation(QS('.clock'));
					incorrectAnimation(clock);
					incorrectAnimation(QS('.dot'));
					incorrectAnimation(QS('.minute'));
					if(gameManager.QUIZ_OPTION[1] !== '' ){
						incorrectAnimation(QS('.hour'));
					}
					if(gameManager.QUIZ_OPTION[3] !== ''){
						incorrectAnimation(QS('.second'));
					}

					setTimeout(function() {
						QS('.doneBtn_on').style.visibility = "hidden";
						QS('.doneBtn').style.visibility = "visible";
					},100);
				}else if(gameManager.QUIZ_OPTION[0] == 'digitalClock'){
					gameManager.quizPosition.push([280,165]);
					incorrectAnimation(QS('.digitalClock'));
					setTimeout(function() {
						QS('.doneBtn_on').style.visibility = "hidden";
						QS('.doneBtn').style.visibility = "visible";
					},100);
				}
				streamSound.setSound('../../media/incorrect.mp3');
				gameManager.dabCount = 0;
			}
		}
	};

	for (var i = 0; i < gameManager.quizObj.length; i++) {
		var contents = { data : {}, style : 'spin', default : ''	}
		configs.slot.push(contents)
	}

	for (var i = 0; i < gameManager.quizObj.length; i++) {

		if(gameManager.quizObj[i][0][0] == 'text'){

			for(var j = 0; j < gameManager.quizObj[i][0][1].length; j++){

				configs.slot[i].data[0] = gameManager.quizObj[i][0][1][j]

			}
		}else if(gameManager.quizObj[i][0][0] == 'number') {

			for (var l = 0; l < gameManager.quizObj[i][0][1]; l ++) {

				if(gameManager.quizObj[i][0][1] !== 60){					
					var num = l.toString();
				}else{
					var num = leadingZeros(l,2);
				}
				console.log('num', num);
				configs.slot[i].data[l] = num;
			}
		}

		configs.slot[i].style = gameManager.quizObj[i][1];
		configs.slot[i].default = gameManager.quizObj[i][2];
	}

	SALTGAMER.SpinPicker.initSpinPicker(configs);

	var	hourTrans = gameManager.QUIZ_OPTION[2] / 12;

	if(gameManager.QUIZ_OPTION[0] == 'clock'){

		var clock = createElement('div', bgCanvas, 'clock clock_0');
		clock.style.background = 'url(images/mainClock.png)';

		if(gameManager.QUIZ_OPTION[3] !== ''){
			var second = createElement('div', bgCanvas, 'second second_0');
			second.style.transform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[3]) + 'deg)';
			second.style.mozTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[3]) + 'deg)';
			second.style.msTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[3]) + 'deg)';
			second.style.oTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[3]) + 'deg)';
			second.style.transform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[3]) + 'deg)';
		}
		if(gameManager.QUIZ_OPTION[1] !== '' ){
			var	hour = createElement('div', bgCanvas, 'hour hour_0');
			hour.style.WebkitTransform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[1] + hourTrans * 6) + 'deg)';
			hour.style.mozTransform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[1] + hourTrans * 6) + 'deg)';
			hour.style.msTransform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[1] + hourTrans * 6) + 'deg)';
			hour.style.oTransform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[1] + hourTrans * 6) + 'deg)';
			hour.style.transform = 'rotate(' + (30 * gameManager.QUIZ_OPTION[1] + hourTrans * 6) + 'deg)';
		}
		var minute = createElement('div', bgCanvas, 'minute minute_0');
		var dot = createElement('div', bgCanvas, 'dot dot_0');
		minute.style.transform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[2]) + 'deg)';
		minute.style.mozTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[2]) + 'deg)';
		minute.style.msTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[2]) + 'deg)';
		minute.style.oTransform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[2]) + 'deg)';
		minute.style.transform = 'rotate(' + (6 * gameManager.QUIZ_OPTION[2]) + 'deg)';

	}else if(gameManager.QUIZ_OPTION[0] == 'digitalClock'){

		var digitalClock = createElement('div', bgCanvas, 'digitalClock digitalClock_0'),
			digitalText = createElement('div', digitalClock, 'digitalText');

		digitalClock.style.background = 'url(images/digitalClock.png)';


		var digitalHour = gameManager.QUIZ_OPTION[1] + ':',
			digitalMinute = gameManager.QUIZ_OPTION[2] + ':',
			digitalSecond = gameManager.QUIZ_OPTION[3];

		digitalText.innerHTML = digitalHour + digitalMinute + digitalSecond;
	}

	var	digitalTopText = createElement('div', bgCanvas, 'digitalTopText');
	// digitalTopText.innerHTML = gameManager.QUIZ_OPTION[1] + '시 ' + gameManager.QUIZ_OPTION[2] + '분 ' + gameManager.QUIZ_OPTION[3] + '초 ';
	digitalTopText.innerHTML = '현재 시각';

	afterText.innerHTML = gameManager.QUIZ_OPTION[4];
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
	bgCanvas.style.pointerEvents = 'none'

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');
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

function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		quizClock = createElement('div',bgCanvas,'quizClock'),
		clockContainer = createElement('div',bgCanvas,'clockContainer'),
		minutBtnContainer = createElement('div',bgCanvas,'minutBtnContainer');
	minutBtnContainer.innerHTML = '<span class="btnContainerText">' +gameManager.dapBoxText[0]+'</span>';

	quizClock.setAttribute('style', 'display:inline-block; margin-top:50px; width: 430px; height: 185px;	text-align: center;	color: #66532a;	background: url(images/digitalClock.png);');

	if(gameManager.QUIZ_OPTION.length == 3){
		secondBtnContainer = createElement('div',bgCanvas,'secondBtnContainer');
		secondBtnContainer.innerHTML = '<span class="btnContainerText">' +gameManager.dapBoxText[1]+'</span>';
		createElement('div',clockContainer,'second');
		createElement('div',secondBtnContainer,'second_10 clickBtnBg');
		createElement('div',secondBtnContainer,'second_1 clickBtnBg');
	}else{
		hourBtnContainer = createElement('div',bgCanvas,'hourBtnContainer');
		hourBtnContainer.innerHTML = '<span class="btnContainerText">' +gameManager.dapBoxText[1]+'</span>';
		createElement('div',hourBtnContainer,'hour_10 clickBtnBg');
		createElement('div',hourBtnContainer,'hour_1 clickBtnBg');
	}

	var hidden = createElement('div',clockContainer,'mainClock_light');
	hidden.style.opacity = 0;
	createElement('div',clockContainer,'minute');
	createElement('div',clockContainer,'hour');
	createElement('div',clockContainer,'clockCenter');
	createElement('div',minutBtnContainer,'minute_10 clickBtnBg');
	createElement('div',minutBtnContainer,'minute_1 clickBtnBg');

	var	checkBtn = createElement('div',bgCanvas,'checkBtn'),
	checkBtn_on = createElement('div',bgCanvas,'checkBtn_on');
	checkBtn.setAttribute('style','position: absolute; top: 590px; left: 1100px; width: 98px; height: 106px; background: url(../../images/common/checkBtnRed.png) no-repeat;visibility:visible');
	checkBtn_on.setAttribute('style','position: absolute; top: 590px; left: 1100px; width: 98px; height: 106px; background: url(../../images/common/checkBtnRed_on.png) no-repeat; visibility:hidden');

	clock ();
}

function clock () {
	var quizClock = document.querySelector('.quizClock'),
		clockContainer = document.querySelector('.clockContainer'),
		hour = document.querySelector('.hour'),
		minute = document.querySelector('.minute'),
		second = document.querySelector('.second'),
		clickBtnBg = document.querySelectorAll('.clickBtnBg');

	hour.setAttribute('id','hour');

	if(gameManager.QUIZ_OPTION.length == 3){
		quizClock.innerHTML = '<div class="digitalClock_light"></div><div class="quizClockTime"><span>'+gameManager.QUIZ_OPTION[0]+'</span>:<span>'+gameManager.QUIZ_OPTION[1]+'</span>:<span>'+gameManager.QUIZ_OPTION[2]+ '</div>';
	}else {
		quizClock.innerHTML = '<div class="digitalClock_light"></div><div class="quizClockTime"><span>'+gameManager.QUIZ_OPTION[0]+'</span>:<span>'+gameManager.QUIZ_OPTION[1]+'</span></div>';
	}

	var hidden_1 = document.querySelector('.digitalClock_light')
		hidden_1.style.opacity = 0;

	for (var i = 0; i < clickBtnBg.length; i++) {
		if (i == 0 || i == 2 || i == 4) {
			clickBtnBg[i].innerHTML = '<div class="minus minus_' + i + ' btn"><img src=images/btnMinus_'+ clickBtnBg[i].classList[0].split('_')[0] +'.png></div><span class="txt">10</span><div class="plus plus_' + i + ' btn"><img src=images/btnPlus_'+ clickBtnBg[i].classList[0].split('_')[0] +'.png></div>';
		} else {
			clickBtnBg[i].innerHTML = '<div class="minus minus_' + i + ' btn"><img src=images/btnMinus_'+ clickBtnBg[i].classList[0].split('_')[0] +'.png></div><span class="txt">1</span><div class="plus plus_' + i + ' btn"><img src=images/btnPlus_'+ clickBtnBg[i].classList[0].split('_')[0] +'.png></div>';
		}
	}
	var btnArray = document.querySelectorAll('.btn');

	for (var i = 0; i < btnArray.length; i++) {

		clickArray[i] = 0;

		if(gameManager.QUIZ_OPTION.length == 2 && gameManager.QUIZ_ANSWER[0] == 12) clickArray[0] = 12;

		btnArray[i].addEventListener('click', function(e){
			var target = e.target,
				targetClass = target.classList[0],
				targetNeedle = target.parentNode.classList[0].split('_')[0],
				targetNum = target.parentNode.classList[0].split('_')[1],
				arrayIdx;

			switch (targetNeedle) {
				case 'hour':
					deg = 30;
					arrayIdx = 0;
					break;
				case 'minute':
					deg = 6;
					arrayIdx = 1;
					break;
				case 'second':
					deg = 6;
					arrayIdx = 2;
					break;
			}
			clickBtnChange(target);

			if (targetClass == 'plus') {
				var needle = document.querySelector('.' + targetNeedle);


				if (targetNum == 1){
					clickArray[arrayIdx]++;

					if(targetNeedle == 'hour'){
						gameManager.hour = clickArray[arrayIdx];
					}else{
						gameManager.minute = clickArray[arrayIdx];
					}


				} else{
					clickArray[arrayIdx] = clickArray[arrayIdx] + 10;
				}

				if (targetNeedle != 'hour') {

					if (clickArray[arrayIdx] >= 60){
						clickArray[arrayIdx] = clickArray[arrayIdx] - 60;
						gameManager.minute = clickArray[arrayIdx];

					} else {
						gameManager.minute = clickArray[arrayIdx];
					}

				} else {
					if (clickArray[arrayIdx] > 12){
						clickArray[arrayIdx] = clickArray[arrayIdx] - 12;
						gameManager.hour = clickArray[arrayIdx];
					}
				}

				needle.style.WebkitTransform = 'rotate('+ (deg * clickArray[arrayIdx]) +'deg)';
				needle.style.mozTransform = 'rotate('+ (deg * clickArray[arrayIdx]) +'deg)';
				needle.style.msTransform = 'rotate('+ (deg * clickArray[arrayIdx]) +'deg)';
				needle.style.oTransform = 'rotate('+ (deg * clickArray[arrayIdx]) +'deg)';
				needle.style.transform = 'rotate('+ (deg * clickArray[arrayIdx]) +'deg)';

			} else if (targetClass == 'minus') {
				var needle = document.querySelector('.' + targetNeedle);

				if (targetNum == 1){
					clickArray[arrayIdx]--;


					if(targetNeedle == 'hour'){
						gameManager.hour = clickArray[arrayIdx];
					}else{
						gameManager.minute = clickArray[arrayIdx];
					}


				}else{
					clickArray[arrayIdx] = clickArray[arrayIdx] - 10;
				}


				if (targetNeedle != 'hour') {

					if (clickArray[arrayIdx] <= 0){
						clickArray[arrayIdx] = clickArray[arrayIdx] + 60;
						gameManager.minute = clickArray[arrayIdx];

					} else {

						gameManager.minute = clickArray[arrayIdx];

					}
				} else {
					if (clickArray[arrayIdx] <= 0) {
						clickArray[arrayIdx] = clickArray[arrayIdx] + 12;
						gameManager.hour = clickArray[arrayIdx];
					}

				}

				needle.style.WebkitTransform = 'rotate('+ (deg * clickArray[arrayIdx]) +'deg)';
				needle.style.mozTransform = 'rotate('+ (deg * clickArray[arrayIdx]) +'deg)';
				needle.style.msTransform = 'rotate('+ (deg * clickArray[arrayIdx]) +'deg)';
				needle.style.oTransform = 'rotate('+ (deg * clickArray[arrayIdx]) +'deg)';
				needle.style.transform = 'rotate('+ (deg * clickArray[arrayIdx]) +'deg)';

			}

		});

		if(gameManager.QUIZ_OPTION.length == 3 ){
			var hour = document.querySelector('.hour'),
				idx = (gameManager.QUIZ_OPTION[0] == 12) ? 0 : gameManager.QUIZ_OPTION[0],
				deg = idx * 30;

			gameManager.hour =  gameManager.QUIZ_OPTION[0];
			hour.style.WebkitTransform = 'rotate('+ deg +'deg)';
			hour.style.mozTransform = 'rotate('+ deg +'deg)';
			hour.style.msTransform = 'rotate('+ deg +'deg)';
			hour.style.oTransform = 'rotate('+ deg +'deg)';
			hour.style.transform = 'rotate('+ deg +'deg)';
		}
	}


}

function CheckButton() {
	var checkBtn = document.querySelector('.checkBtn'),
		checkBtn_on = document.querySelector('.checkBtn_on');

	btnDown = function(e) {
		e.preventDefault();
		checkBtn.style.visibility='hidden';
		checkBtn_on.style.visibility='visible';
		gameOver();
	}
	checkBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
}

function gameOver() {
	var clockContainer = document.querySelector('.clockContainer'),
		hidden = document.querySelector('.mainClock_light'),
		hidden_1 = document.querySelector('.digitalClock_light'),
		checkBtn = document.querySelector('.checkBtn'),
		checkBtn_on = document.querySelector('.checkBtn_on'),
		rotateDeg;

	if(compareDap ()) {
		if(gameManager.minute >= 0 && gameManager.minute <= 10){

			rotateDeg = rotate(gameManager.hour);
			transformFun(rotateDeg)

		} else if(gameManager.minute >= 11 && gameManager.minute <= 20){

			rotateDeg = rotate(gameManager.hour);
			transformFun(rotateDeg+6)

		}else if(gameManager.minute >= 21 && gameManager.minute <= 30){

			rotateDeg  = rotate(gameManager.hour);
			transformFun(rotateDeg+12)

		}else if(gameManager.minute >= 31 && gameManager.minute <= 40){

			rotateDeg  = rotate(gameManager.hour);
			transformFun(rotateDeg+18)

		}else if(gameManager.minute >= 41 && gameManager.minute <= 50){

			rotateDeg  = rotate(gameManager.hour);
			transformFun(rotateDeg+24)

		}else{
			rotateDeg  = rotate(gameManager.hour);
			transformFun(rotateDeg+28)
		}

		console.log('correct');
		QS('#bgCanvas').style.pointerEvents = 'none';

		setInterval(function() {
		   hidden.style.opacity = 1;
		   hidden_1.style.opacity = 1;
		}, 200);
	   setInterval(function() {
	   		hidden.style.opacity = 0;
	   		hidden_1.style.opacity = 0;
	   	}, 500);

		gameEnd();
	} else {
		console.log('incorrect');
		setTimeout(function(){
			checkBtn.style.visibility='visible';
			checkBtn_on.style.visibility='hidden';
		},100)

		streamSound.setSound('../../media/incorrect.mp3');

		animate({
			delay : 20,
			duration : 800,
			delta : makeEaseOut(elastic),
			step : function(delta) {
				clockContainer.style.left = ((-50 * delta) + (132)) + 'px';

			}
		});
	}

	function compareDap () {
		if(gameManager.QUIZ_OPTION.length == 3){
			if (gameManager.dapArray[1] == clickArray[1] && gameManager.dapArray[2] == clickArray[2] ) {
				return true;
			}return false;
		}else{
			for (var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
				if (gameManager.QUIZ_ANSWER[0] == clickArray[0] && gameManager.QUIZ_ANSWER[1] == clickArray[1]) {
					return true;
				}
			}return false;
		}
	}
}

function gameEnd() {
	setTimeout(function() {

		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');
		logCounter.tryCounter();
		logCounter.endTime();
		clearInterval(countTimer);

		// save starIcon
		setTimeout(function() {
			log('excute stampStarIcon!');
			// parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			// parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);

	}, 100);
}

function clickBtnChange(target){
	if(target.classList[0] == 'plus'){
		target.childNodes[0].src = 'images/btnPlus_on.png';
		setTimeout(function(){
			target.childNodes[0].src = 'images/btnPlus_'+ target.parentNode.classList[0].split('_')[0] +'.png';
		}, 300);
		streamSound.setSound('media/connect.mp3');
	}else if(target.classList[0] == 'minus'){
		target.childNodes[0].src = 'images/btnMinus_on.png';
		setTimeout(function(){
			target.childNodes[0].src = 'images/btnMinus_'+ target.parentNode.classList[0].split('_')[0] +'.png';
		}, 300);
		streamSound.setSound('media/connect.mp3');
	}
}

function transformFun(deg){
	var hour = document.querySelector('.hour');
		hour.style.WebkitTransform = 'rotate('+ deg +'deg)';
		hour.style.mozTransform = 'rotate('+ deg +'deg)';
		hour.style.msTransform = 'rotate('+ deg +'deg)';
		hour.style.oTransform = 'rotate('+ deg +'deg)';
		hour.style.transform = 'rotate('+ deg +'deg)';
}


function rotate(argument) {
	var deg;
	switch (argument) {
		case 0:
		deg = 0;
		break;
		case 1:
		deg = 30;
		break;
		case 2:
		deg = 60;
		break;
		case 3:
		deg = 90;
		break;
		case 4:
		deg = 120;
		break;
		case 5:
		deg = 150;
		break;
		case 6:
		deg = 180;
		break;
		case 7:
		deg = 210;
		break;
		case 8:
		deg = 240;
		break;
		case 9:
		deg = 270;
		break;
		case 10:
		deg = 300;
		break;
		case 11:
		deg = 330;
		break;
		case 12:
		deg = 0;
		break;
	}
	return deg;
}
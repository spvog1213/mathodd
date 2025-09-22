function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement("questionTxt", "questionTxt", bgCanvas);
	CheckButton();
}

function initCoin() {
	log('initCoin...');

	var totalCoinContainer = document.createElement('div'),
	    checkBtn = document.getElementById('checkBtn'),
	    coinMachine = [],
	    coinText;

	checkBtn.style.display = "block";

	var questionTxt = document.querySelector('#questionTxt');
	questionTxt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];

	for (var i = 0; i < gameManager.CURRENT_ANSWER.length; i++) {
		coinMachine[i] = document.createElement('div');
		coinMachine[i].setAttribute('id', 'coinMachine_' + i);

		if (!(gameManager.CURRENT_ANSWER[i] === 0)) {
			totalCoinContainer.appendChild(coinMachine[i]);
			createCoinMachine(i, coinMachine[i]);
		} else {
			coinText = document.createElement('div');
			coinText.setAttribute('id', 'coinText_' + i);
			coinText.setAttribute('style', 'display:none');
			coinText.innerHTML = 0;
			totalCoinContainer.appendChild(coinText);
		}
	}

	totalCoinContainer.setAttribute('id', 'totalCoinContainer');

	document.querySelector('#bgCanvas').appendChild(totalCoinContainer);

}

function gameOver() {

	var coinNum100 = parseInt(document.querySelector("#coinText_0").innerHTML),
	    coinNum10 = parseInt(document.querySelector("#coinText_1").innerHTML),
	    coinNum1 = parseInt(document.querySelector("#coinText_2").innerHTML),
	    checkBtn = document.querySelector("#checkBtn"),
	    machineLine = document.querySelectorAll(".machineLine"),
	    btnMachineUp = document.querySelectorAll(".btnMachineUp"),
	    btnMachineDown = document.querySelectorAll(".btnMachineDown"),
	    succeslineArray=['images/complete2_succesline_1.png','images/complete2_succesline.png','images/complete2_succesline_1.png','images/complete2_succesline.png','images/complete2_succesline_1.png','images/complete2_succesline.png'];

	if (coinNum100 === gameManager.CURRENT_ANSWER[0] && coinNum10 === gameManager.CURRENT_ANSWER[1] && coinNum1 === gameManager.CURRENT_ANSWER[2]) {

		checkBtn.style.pointerEvents = "none";

		for (var i = 0; i < btnMachineUp.length; i++) {
			btnMachineUp[i].style.pointerEvents = "none";
			btnMachineDown[i].style.pointerEvents = "none";
			machineLine[i].style.display="block";
			spriteAnimationCustom(succeslineArray, machineLine[i]);
		}
		


		streamSound.setSound('media/complete2_correct.mp3');
		logCounter.tryCounter();
		logCounter.endTime();
		clearInterval(countTimer);
		gameOverAnimation();

		setTimeout(function() {
			log('excute stampStarIcon!');
			parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);

	} else {
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();

		
		// setTimeout(function() {
		// 			gameManager.coinArray100 = [];
		// 			gameManager.coinArray10 = [];
		// 			gameManager.coinArray1 = [];
		// 			gameManager.coinArray = [gameManager.coinArray100, gameManager.coinArray10, gameManager.coinArray1];
		// 			document.querySelector('#bgCanvas').innerHTML = "<div id='questionTxt'></div><img src='images/keypad_confirm.png' id = 'checkBtn'/> ";
		
		// 			initCoin();
		// 			CheckButton();
		// 		}, 400);
		
	}

}

function createCoinMachine(index, coinMachine) {

	var coinMachineCase = document.createElement('img'),
	    btnMachineUp = document.createElement('img'),
	    btnMachineDown = document.createElement('img'),
	    machineLine = document.createElement('img'),
	    coinText = document.createElement('div');

	machineLine.src = "images/complete2_succesline.png";
	coinMachineCase.src = "images/complete2_case_top.png";
	btnMachineUp.src = "images/complete2_upbtn_0.png";
	btnMachineDown.src = "images/complete2_dwbtn_0.png";

	machineLine.className = "machineLine";
	coinText.className = "coinText";
	coinMachineCase.className = "machineCase";
	btnMachineUp.className = "btnMachineUp";
	btnMachineDown.className = "btnMachineDown";

	coinText.setAttribute('id', 'coinText_' + index);

	coinText.innerHTML = 0;

	coinMachine.appendChild(machineLine);
	coinMachine.appendChild(coinText);
	coinMachine.appendChild(coinMachineCase);
	coinMachine.appendChild(btnMachineUp);
	coinMachine.appendChild(btnMachineDown);

	var btnClickDown = function(e) {
		e.preventDefault();

		if (gameManager.coinArray[index].length > 0) {
			streamSound.setSound('media/click.mp3');
			removeCoin(index, coinMachine);
			btnMachineDown.src = "images/complete2_dwbtn_1.png";
		}

		setTimeout(function() {
			btnMachineDown.src = "images/complete2_dwbtn_0.png";
		}, 100)

	}
	var btnClickUp = function(e) {
		e.preventDefault();

		if (gameManager.coinArray[index].length < 9) {
			streamSound.setSound('media/click.mp3');
			btnMachineUp.src = "images/complete2_upbtn_1.png";
			appendCoin(index, coinMachine);
		}

		setTimeout(function() {
			btnMachineUp.src = "images/complete2_upbtn_0.png";
		}, 100)
	}

	btnMachineUp.addEventListener(gameManager.eventSelector.downEvent, btnClickUp, false);
	btnMachineDown.addEventListener(gameManager.eventSelector.downEvent, btnClickDown, false);

}

function appendCoin(index, coinMachine) {
	
	var coinObj = document.createElement('img'),
	    coinText = coinMachine.querySelector('.coinText'),
	    top = 242;

	top = top - (gameManager.coinArray[index].length * 18);

	coinObj.className = "coin_" + index;

	switch (index) {
	case 0:

		coinObj.src = 'images/complete2_100coin.png';
		coinObj.setAttribute('style', 'left : 74px; top:' + top + 'px;');
		gameManager.coinArray100.push(coinObj);

		coinText.innerHTML = gameManager.coinArray100.length * 100;

		coinMachine.appendChild(gameManager.coinArray[index][gameManager.coinArray100.length - 1]);

		break;
	case 1:

		coinObj.src = 'images/complete2_10coin.png';
		coinObj.setAttribute('style', 'left : 80px;top:' + top + 'px;');
		gameManager.coinArray10.push(coinObj);

		coinText.innerHTML = gameManager.coinArray10.length * 10;
		coinMachine.appendChild(gameManager.coinArray[index][gameManager.coinArray10.length - 1]);
		break;
	case 2:

		coinObj.src = 'images/complete2_1coin.png';
		coinObj.setAttribute('style', 'left : 84px;top:' + top + 'px;');
		gameManager.coinArray1.push(coinObj);

		coinText.innerHTML = gameManager.coinArray1.length;
		coinMachine.appendChild(gameManager.coinArray[index][gameManager.coinArray1.length - 1]);
		break;
	}

}


function spriteAnimationCustom(spriteArray, spriteObj) {

	var index = 0,
	    durationAni = parseInt(spriteArray.length ) * 100;

	animate({
		delay : 200,
		duration : 1200,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}

function removeCoin(index, coinMachine) {
	var coinText = coinMachine.querySelector('.coinText');
	

	switch (index) {
	case 0:
		coinMachine.removeChild(gameManager.coinArray100.pop());
		coinText.innerHTML = gameManager.coinArray100.length * 100;
		break;
	case 1:
		coinMachine.removeChild(gameManager.coinArray10.pop());
		coinText.innerHTML = gameManager.coinArray10.length * 10;
		break;
	case 2:
		coinMachine.removeChild(gameManager.coinArray1.pop());
		coinText.innerHTML = gameManager.coinArray1.length;
		break;
	}

}

function CheckButton() {
	var checkBtn = document.querySelector('#checkBtn');

	btnDown = function(e) {
		e.preventDefault();
		checkBtn.src = 'images/keypad_confirm_push.png';
	}
	btnUp = function(e) {
		e.preventDefault();
		checkBtn.src = 'images/keypad_confirm.png';
		gameOver();
	}

	checkBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	checkBtn.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);

}
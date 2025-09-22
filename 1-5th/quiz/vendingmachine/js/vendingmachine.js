function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	//parent.window.initClockTimer();
	var machineWrap = document.querySelector("#machineWrap");

	appendCircleElement("cupWrap", "cupWrap", bgCanvas);

	appendImageElement("bucket", "images/vendingmachine_water_0.png", bgCanvas);
	appendImageElement("machine", "images/vendingmachine_machine.png", machineWrap);
	appendImageElement("cup", "images/vendingmachine_cup_0.png", cupWrap);
	appendCircleElement("questionTxt", "btnText", bgCanvas);
	appendCircleElement("cupTxt", "btnText", cupWrap);
}

function initMachine() {
	log('initMachine...');

	var questionTxt = document.querySelector('#questionTxt'),
	    cupTxt = document.querySelector('#cupTxt'),
	    cup = document.querySelector('#cup'),
	    calculationSrc,
	    btnWrap;

	questionTxt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	cupTxt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length - 2];

	switch (gameManager.calculation) {
	case '+':
		calculationSrc = 'images/plus.png';
		break;
	case '-':
		calculationSrc = 'images/minus.png';
		break;
	case '*':
		calculationSrc = 'images/multiplication.png';
		break;
	case '/':
		calculationSrc = 'images/division.png';
		break;
	}

	//Min, Max, Number
	setRand(1, 3, 3);

	for (var i = 0; i < gameManager.choiceQuestion.length; i++) {
		var top = 44,
		    left = 0;
		btnWrap = document.createElement('div');
		btnWrap.setAttribute('id', 'btnWrap_' + i);
		btnWrap.className = "btnWrap";
		machineWrap.appendChild(btnWrap);

		appendImageElement("juice_" + i, "images/vendingmachine_juice_" + i + ".png", bgCanvas, "juice");
		appendImageElement("calculation_" + i, calculationSrc, btnWrap, "calculation");
		appendImageElement("machinBtn_" + i, "images/vendingmachine_btn0_0.png", btnWrap, "machin_btn");
		appendCircleElement("btnText_" + i, "btnText", btnWrap);

		createBtn(i, top, left);
	}

}

function createBtn(index, top, left) {

	var calculation = document.querySelector('#calculation_' + index),
	    machinBtn = document.querySelector('#machinBtn_' + index),
	    juice = document.querySelector('#juice_' + index),
	    btnWrap = document.querySelector('#btnWrap_' + index),
	    btnText = document.querySelector('#btnText_' + index);

	btnText.innerHTML = gameManager.choiceQuestion[index];

	left = (index * 250) + 20;

	machinBtn.setAttribute('style', 'top:' + top + 'px; left:' + left + 'px');
	calculation.setAttribute('style', 'top:' + (top + 36) + 'px; left:' + (left + 38) + 'px');
	btnText.setAttribute('style', 'top:' + (top + 21) + 'px; left:' + (left + 70) + 'px');
	juice.setAttribute('style', 'left:' + (left + 210) + 'px');

	machinBtn.setAttribute('answerValue', gameManager.choiceQuestion[index]);

	btnClickDown = function(e) {
		e.preventDefault();
		machinBtn.src = "images/vendingmachine_btn0_1.png";
		/*
		 calculation.style.top = "86px";
		 btnText.style.top = "70px";*/
		btnWrap.style.top = "6px";

		compareAnswer(this);
		// gameOver(this);
	}
	btnClickUp = function(e) {
		log('UP!!!');
		e.preventDefault();
		if (!gameManager.isGameover)
			machinBtn.src = "images/vendingmachine_btn0_0.png";

		btnWrap.style.top = "0px";
		// calculation.style.top = "81px";
		// btnText.style.top = "65px";
	}

	btnWrap.addEventListener(gameManager.eventSelector.downEvent, btnClickDown, false);
	btnWrap.addEventListener(gameManager.eventSelector.upEvent, btnClickUp, false);
}

function setRand(min, max, number) {
	randResult = new Array();
	randList = new Array();
	for (var z = min; z <= max; z++) {
		randList.push(z);
	}
	for (var x = 0; x < number; x++) {
		getRand();
	}
	return randResult;
}

function getRand() {
	randNumber = Math.floor(Math.random() * randList.length);
	randResult.push(randList[randNumber]);
	randList.splice(randNumber, 1);
}

function compareAnswer(currentObj) {

	var currentBtnText = currentObj.childNodes[1];

	if (parseInt(currentBtnText.getAttribute('answerValue')) === gameManager.CURRENT_ANSWER[0]) {
		streamSound.setSound('media/click01.mp3');
		gameManager.isGameover = true;

		var machinBtn = document.querySelectorAll('.machin_btn'),
		    currentObjId = currentObj.getAttribute('id'),
		    bucket = document.querySelector('#bucket'),
		    cupWrap = document.querySelector('#cupWrap'),
		    cup = document.querySelector('#cup'),
		    currnetLeft = 444,
		    moveLeft;

		for (var i = 0; i < machinBtn.length; i++) {
			machinBtnSrc = machinBtn[i].getAttribute('src');
			machinBtn[i].setAttribute('src', machinBtnSrc.replace('_0.png', '_2.png'));

		}
		// currentObj.src = "images/vendingmachine_btn0_1.png";

		log("currentObj" + currentObj);

		var btnWrap = document.querySelectorAll('.btnWrap');

		for (var i = 0; i < btnWrap.length; i++) {
			btnWrap[i].style.pointerEvents = "none";
		}

		currentObjId = currentObjId.split('_');
		currentObjId = currentObjId.slice(currentObjId.length - 1);
		currentObjId = parseInt(currentObjId);

		var juice = document.querySelector('#juice_' + currentObjId);

		var spriteArray = ['images/vendingmachine_juice_' + currentObjId + '_0.png', 'images/vendingmachine_juice_' + currentObjId + '_0.png', 'images/vendingmachine_juice_' + currentObjId + '_1.png', 'images/vendingmachine_juice_' + currentObjId + '_1.png', 'images/vendingmachine_juice_' + currentObjId + '.png', 'images/vendingmachine_juice_' + currentObjId + '.png'],
		    bucketArray = ['images/vendingmachine_water_1.png', 'images/vendingmachine_water_2.png', 'images/vendingmachine_water_3.png', '0'];

		switch(currentObjId) {
		case 0:
			moveLeft = -250;
			break;
		case 2:
			moveLeft = 250;
			break;
		default :
			moveLeft = 0;
			break;

		}

		animate({
			delay : 20,
			duration : 400,
			delta : makeEaseInOut(quad),
			step : function(delta) {

				cupWrap.style.left = ((moveLeft * delta) + currnetLeft) + 'px';
				if (delta === 1) {
					spriteAnimationCustom(bucketArray, bucket);
					//spriteAnimationCustom(spriteArray, juice);
				}
			}
		});

		setTimeout(function() {
			spriteAnimationCustom(spriteArray, juice);
			streamSound.setSound('media/juice.mp3');
		}, 800);

		setTimeout(function() {
			cup.src = "images/vendingmachine_cup_" + (currentObjId + 1) + ".png";
		}, 1300);

		setTimeout(function() {
			gameOver();
		}, 1800);

	} else {
		streamSound.setSound('../../media/incorrect.mp3');
	}
	
	logCounter.tryCounter();

}

function gameOver() {

	
	logCounter.endTime();
	clearInterval(countTimer);

	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');

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

function spriteAnimationCustom(spriteArray, spriteObj) {

	var index = 0,
	    durationAni = parseInt(spriteArray.length - 2) * 100;

	animate({
		delay : 70,
		duration : durationAni,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}

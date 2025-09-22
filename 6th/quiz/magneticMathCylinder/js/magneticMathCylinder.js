function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	machine();

	var bgCanvas = document.getElementById('bgCanvas'),
		doneBtn_on = createElement('div',bgCanvas,'doneBtn_on');

	var backgroundGroup = createElement('div', QS('.swWrapper'),'backgroundGroup'),
		bgbg = createElement('div',backgroundGroup,'bgbg');

	headBg = createElement('img',backgroundGroup);
	headBg.src = 'images/mathCylinder_spaceship_front.png';
	headBg.setAttribute('style', 'position:absolute; top:231px; left:25px; z-index:-2');

	lightBg = createElement('img',backgroundGroup);
	lightBg.className = 'lightBg';
	lightBg.src = 'images/mathCylinder_spaceship_back.png';
	lightBg.setAttribute('style', 'position:absolute; top:231px;');

	appendBgImg ();

}

function gameOver(currentObj) {

	var bgCanvas = document.querySelector('#bgCanvas');

	bgCanvas.style.pointerEvents = "none";

	var swWrapper = document.querySelector('.swWrapper');

	setTimeout(function(){
		animate({
			delay : 30,
			duration : 1000,
			delta : makeEaseOut(linear),
			step : function(delta) {
				swWrapper.style.left = swWrapper.offsetLeft -(150 * delta) + 'px';
			}
		});
	},500);

	var spriteArray = ['images/mathCylinder_success_1.png',
						'images/mathCylinder_success_2.png',
						'images/mathCylinder_success_3.png',
						'images/mathCylinder_success_4.png'];

	spriteAnimation(spriteArray, QS('.lightBg'));

	logCounter.tryCounter();
	logCounter.endTime();
	gameOverAnimation();

	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
	},40);


	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 2300);
}


function machine() {
	var bgCanvas = document.getElementById('bgCanvas'),
		swWrapper = QS('.swWrapper');

	var configs = { slot : [] ,
		doneCallBack : function () {
			var results = SALTGAMER.SpinPicker.getSelectedValues();

			gameManager.value = gameManager.QUIZ_ANSWER
			gameManager.key = results.keys

			for(var i = 0; i < results.keys.length; i++){
				if(gameManager.value[i] == gameManager.key[i]){
					gameManager.dabCount ++;
				}
			}

			if(gameManager.dabCount == results.keys.length){
				gameOver();
			}else{
				setTimeout(function() {
					QS('.doneBtn_on').style.visibility = "hidden";
					QS('.doneBtn').style.visibility = "visible";
				},100);
				logCounter.tryCounter();
				gameManager.dabCount = 0;
				streamSound.setSound('media/incorrect.mp3');

				var spriteArray = ['images/mathCylinder_fail_1.png',
								   'images/mathCylinder_fail_2.png',
								   'images/mathCylinder_fail_3.png',
								   'images/mathCylinder_fail_4.png',
								   'images/mathCylinder_fail_5.png',
								   'images/mathCylinder_fail_6.png',
								   'images/mathCylinder_spaceship_back.png'];

				spriteAnimation(spriteArray, QS('.lightBg'));
			}

		}

	};
	for (var i = 0; i < gameManager.QUIZ_OPTION.length; i++) {
		var contents = { data : {}, style : 'spin', default : '' }
		configs.slot.push(contents)
	}

	for (var i = 0; i < gameManager.QUIZ_OPTION.length; i++) {
		if(gameManager.QUIZ_OPTION[i][0][0] == 'symbol'){
			for(var j = 0; j < gameManager.QUIZ_OPTION[i][0][1].length; j++){
				configs.slot[i].data[j] = gameManager.QUIZ_OPTION[i][0][1][j];
			}
		} else if(gameManager.QUIZ_OPTION[i][0][0] == 'number') {
			configs.slot[i].data[0] = gameManager.QUIZ_OPTION[i][0][1];
		}
		if(gameManager.QUIZ_OPTION[i][0][0] == 'number' && gameManager.QUIZ_OPTION[i][0][1] === ''){
			gameManager.QUIZ_OPTION[i][0][1] = 10;
			gameManager.QUIZ_OPTION[i][1] = 'spin';
			gameManager.QUIZ_OPTION[i][2] = 0;

			for (var l = 0; l < 11; l ++) {
				configs.slot[i].data[l] = l-1;
				configs.slot[i].data[0] = '?';
				console.log('configs.slot[i].data[l]',l)
			}
		}
		configs.slot[i].style = gameManager.QUIZ_OPTION[i][1];
		configs.slot[i].default = gameManager.QUIZ_OPTION[i][2];
	}
	SALTGAMER.SpinPicker.initSpinPicker(configs);
}

function appendBgImg () {
	var num = [0],
		left = 10;

	for (var i = 0; i < gameManager.QUIZ_OPTION.length; i++) {

		left = left + 100;

		var slotBack = createElement('div', QS('.bgbg'), 'slot slotBack_'+i);

 		slotBack.setAttribute('style','position:absolute; left:'+ left +'px; top:231px; display: inline-block; width: 122px; height: 240px;');

		QS('.swSlots').childNodes[i].classList.add(gameManager.QUIZ_OPTION[i][0][0]);

		if (QS('.swSlots').childNodes[i].classList[1] == 'symbol') {
			num.push(i + 1);
			slotBack.style.background = 'url(images/mathStick_symbol.png) no-repeat';

		}
	}

		var slotLenght = document.querySelectorAll('.slot').length,
 			swWrapper = document.querySelector('.swWrapper'),
 			lightBg = document.querySelector('.lightBg');

 		lightBg.style.left = ( (slotLenght * document.querySelector('.swSlots > .slot_0').clientWidth) + 118 )+'px';

 		swWrapper.style.left = ( ( document.querySelector('#bgCanvas').clientWidth - swWrapper.clientWidth ) / 2 )+'px';



	for (var j = 0; j < num.length; j++) {
		for(var k = num[j]; k < num[j + 1]; k++) {
			if (k !== num[j + 1] - 1) {
				QS('.slotBack_'+ k).style.background = 'url(images/mathStick_'+ j +'.png) no-repeat';
			}
		}
	}

	for (var i = num[num.length - 1]; i < gameManager.QUIZ_OPTION.length; i++) {
		QS('.slotBack_'+ i).style.background = 'url(images/mathStick_'+ 3 +'.png) no-repeat';
	}

	var doneBtn = document.querySelector('.doneBtn');
	document.querySelector('.doneBtn_on').setAttribute('style','top : ' + getRealOffsetTop(doneBtn) + 'px; left :' + getRealOffsetLeft(doneBtn) + 'px; background:url(../../images/common/checkBtnRed_on.png) no-repeat;');

	for (var i = 0; i < gameManager.QUIZ_OPTION.length; i++) {
		for(var j = 0; j < gameManager.QUIZ_OPTION[i][0][1].length; j++){
			var slot = QS('.slot_' + i);
			replaceSymbol (gameManager.QUIZ_OPTION[i][0][1][j], slot.childNodes[0].childNodes[j].childNodes[0]);

		}
	 }
}

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }

function replaceSymbol (text, targetElement) {

	var symbolBox = CE('img');
		symbolBox.setAttribute('style', 'width: 46px; height: 46px; margin: 0 3px;');

	switch (text) {
		case '+':
			symbolBox.src = './images/plus.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
		case '-':
			symbolBox.src = './images/minus.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
		case '*':
			symbolBox.src = './images/multiplication.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
		case '/':
			symbolBox.src = './images/division.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
		case '=':
			symbolBox.src = './images/equal.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
	}
}

function spriteAnimation(spriteArray, spriteObj) {
	var index = 0;
	animate({
		delay : 200,
		duration : 1200,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			if(spriteArray.length < 5){
				if (index < 3) index++;
				else  index = 0;
			}else{
				if (index < 6) index++;
				else  index = 0;
			}
			spriteObj.src = spriteArray[index];
		}
	});
}
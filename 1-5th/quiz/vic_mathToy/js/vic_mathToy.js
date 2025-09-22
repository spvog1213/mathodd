function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	var mathToy = document.querySelector('#mathToy'),
	math_1 = document.createElement('div'),
	math_2 = document.createElement('div'),
	math_3 = document.createElement('div');

	math_1.setAttribute('id','math_1');
	math_2.setAttribute('id','math_2');
	math_3.setAttribute('id','math_3');

	bgCanvas.appendChild(math_1);
	bgCanvas.appendChild(math_2);
	bgCanvas.appendChild(math_3);

	appendImageElement('mathtoyMus', 'images/mathtoy_machine.png', mathToy);

	//Min, Max, Number
	setRand(0, 4, 3);

		appendImageElement('front', 'images/mathtoy_img_' + randResult[0] + '.png', document.querySelector('#math_1'));
		appendImageElement('backSeat', 'images/mathtoy_img_' + randResult[1] + '.png', document.querySelector('#math_2'));
		appendImageElement('endFigure', 'images/mathtoy_img_' + randResult[2] + '.png', document.querySelector('#math_3'));
		appendImageElement('lightring', 'images/mathtoy_light_off.png', document.querySelector('#bgCanvas'));

	appendChoiceQuestion('click', gameManager.choiceQuestion, gameManager.choiceQuestionImgArray);

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	
	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	var startButton = document.querySelector('#startButton'),
	startButtonStickImg = document.createElement('img');

	startButton.appendChild(startButtonStickImg);
	startButtonStickImg.setAttribute('id','startButtonStick');
	startButtonStickImg.setAttribute("src", "images/mathtoy_lever.png");


	var startButtonStick = document.querySelector('#startButtonStick'),
	calculation = document.createElement('div'),
	calculation2 = document.createElement('div'),
	calculationImg = document.createElement('img'),
	calculationImg2 = document.createElement('img'),
	answerMark = document.querySelector('#answerMark'),
	lightring = document.querySelector('#lightring'),
	imgSrc = startButtonStick.getAttribute('src');

	lightring.setAttribute('style','position:absolute; left:262px; top:128px');
	calculation.setAttribute('id', 'calculation');
	calculation2.setAttribute('id', 'calculation2');

	// log(math_1.childNodes[0]);

	switch (gameManager.calculation) {
		case '+':
		calculation.src = 'images/plus.png';
		break;
		case '-':
		calculation.src = 'images/minus.png';
		break;
		case '*':
		calculation.src = 'images/multiplication.png';
		break;
		case '/':
		calculation.src = 'images/division.png';
		break;
	}

	switch (gameManager.calculation2) {
		case '+':
		calculation2.src = 'images/plus.png';
		break;
		case '-':
		calculation2.src = 'images/minus.png';
		break;
		case '*':
		calculation2.src = 'images/multiplication.png';
		break;
		case '/':
		calculation2.src = 'images/division.png';
		break;
	}



	
	bgCanvas.appendChild(calculation);
	bgCanvas.appendChild(calculation2);

	calculation.appendChild(calculationImg);
	calculation2.appendChild(calculationImg2);
	
	calculation.childNodes[0].src = calculation.src;
	calculation2.childNodes[0].src = calculation2.src;

	// log(calculation.childNodes[0]);

		// startButtonStick = appendChild(startButton);
		// log(imgSrc + 'aaaaaaaaaaaaaaa');
		
		startButton.addEventListener(gameManager.eventSelector.downEvent, function() {
			log('startButton click!');

			log('excute initClockTimer!');
		// parent.window.initClockTimer();

		// startButton.style.display = 'none';
		streamSound.setSound('media/slot_lever.mp3');

		startButtonStick.setAttribute('src',imgSrc.replace('.png','_dw.png'));
		startButton.style.pointerEvents = 'none';

		handMotion();

		setTimeout(function(){
			animate({
				delay : 20,
				duration : 1000,
				delta : makeEaseOut(elastic),
				step : function(delta) {
					
					// piggyContainer.style.top = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
				}
			});

		}, 550);

		setTimeout(function(){
			math_1.childNodes[0].style.display = 'none';
			math_1.innerHTML = gameManager.choiceAnswer[0];
			math_1.setAttribute('style','position: absolute; left:295px; top:198px; font-family: NanumGothicExtraBold; line-height: 134px; font-size: 55px; text-align: center; width:180px;')
		}, 900);

		setTimeout(function(){
			calculation.childNodes[0].src = calculation.src;
		}, 1300);

		setTimeout(function(){
			calculation2.childNodes[0].src = calculation2.src;
		}, 2100);

		setTimeout(function(){
			math_2.childNodes[0].style.display = 'none';
			math_2.innerHTML = gameManager.choiceAnswer[1];
			math_2.setAttribute('style','position: absolute; left:540px; top:198px; font-family: NanumGothicExtraBold; line-height: 134px; font-size: 55px; text-align: center; width:180px;')
		}, 1700);


		setTimeout(function(){
			math_3.childNodes[0].style.display = 'none';
			math_3.innerHTML = gameManager.choiceAnswer[2];
			math_3.setAttribute('style','position: absolute; left:780px; top:198px; font-family: NanumGothicExtraBold; line-height: 134px; font-size: 55px; text-align: center; width:180px;')
		}, 2500);

		setTimeout(function() {
				// document.querySelector('#totalCoinContainer').style.display = 'block';
				var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
				for (var i = 0; i < choiceQuestionContainer.length; i++) {
					choiceQuestionContainer[i].style.pointerEvents = "auto";
				}
			}, 2000); //보기가 클릭 하는데 걸리는 시간

	}, false);

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

function spriteAnimation(spriteArray, spriteObj ,spriteduration) {

	var index = 0;
	animate({
		delay : 100,
		duration : spriteduration,
		delta : makeEaseOut(linear),
		step : function(delta) {
			// log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});
	
}

function spriteAnimationLight(spriteArray, spriteObj ,spriteduration) {

	var index = 0;
	animate({
		delay : 300,
		duration : spriteduration,
		delta : makeEaseOut(linear),
		step : function(delta) {
			// log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});
	
}

function handMotion() {
	var front = document.querySelector('#front');
	calculationImg = document.querySelector('#calculation').childNodes[0],
	calculationImg2 = document.querySelector('#calculation2').childNodes[0],
	backSeat = document.querySelector('#backSeat'),
	endFigure = document.querySelector('#endFigure');
	


	var spriteArray_0 = ['images/mathtoy_img_mov_1.png', 'images/mathtoy_img_mov_2.png', 'images/mathtoy_img_mov_3.png', 'images/mathtoy_img_mov_4.png', 'images/mathtoy_img_mov_5.png', 'images/mathtoy_img_mov_1.png', 'images/mathtoy_img_mov_2.png', 'images/mathtoy_img_mov_3.png', 'images/mathtoy_img_mov_4.png', 'images/mathtoy_img_mov_5.png'];
	spriteArray_1 = ['images/mathtoy_symbol_mov_1.png', 'images/mathtoy_symbol_mov_2.png', 'images/mathtoy_symbol_mov_3.png', 'images/mathtoy_symbol_mov_4.png', 'images/mathtoy_symbol_mov_1.png', 'images/mathtoy_symbol_mov_2.png', 'images/mathtoy_symbol_mov_3.png', 'images/mathtoy_symbol_mov_4.png', 'images/mathtoy_symbol_mov_1.png', 'images/mathtoy_symbol_mov_2.png'];
	spriteArray_2 = ['images/mathtoy_symbol_mov_1.png', 'images/mathtoy_symbol_mov_2.png', 'images/mathtoy_symbol_mov_3.png', 'images/mathtoy_symbol_mov_4.png', 'images/mathtoy_symbol_mov_1.png', 'images/mathtoy_symbol_mov_2.png', 'images/mathtoy_symbol_mov_3.png', 'images/mathtoy_symbol_mov_4.png', 'images/mathtoy_symbol_mov_1.png', 'images/mathtoy_symbol_mov_2.png', 'images/mathtoy_symbol_mov_3.png', 'images/mathtoy_symbol_mov_4.png', 'images/mathtoy_symbol_mov_3.png', 'images/mathtoy_symbol_mov_2.png', 'images/mathtoy_symbol_mov_1.png', 'images/mathtoy_symbol_mov_2.png'];
	spriteArray_3 = ['images/mathtoy_img_mov_5.png', 'images/mathtoy_img_mov_4.png', 'images/mathtoy_img_mov_3.png', 'images/mathtoy_img_mov_2.png', 'images/mathtoy_img_mov_1.png', 'images/mathtoy_img_mov_2.png', 'images/mathtoy_img_mov_3.png', 'images/mathtoy_img_mov_4.png', 'images/mathtoy_img_mov_5.png', 'images/mathtoy_img_mov_4.png', 'images/mathtoy_img_mov_3.png', 'images/mathtoy_img_mov_2.png', 'images/mathtoy_img_mov_1.png', 'images/mathtoy_img_mov_2.png', 'images/mathtoy_img_mov_3.png', 'images/mathtoy_img_mov_4.png', 'images/mathtoy_img_mov_5.png', 'images/mathtoy_img_mov_4.png', 'images/mathtoy_img_mov_3.png'];
	spriteArray_4 = ['images/mathtoy_img_mov_5.png', 'images/mathtoy_img_mov_4.png', 'images/mathtoy_img_mov_3.png', 'images/mathtoy_img_mov_2.png', 'images/mathtoy_img_mov_1.png', 'images/mathtoy_img_mov_5.png', 'images/mathtoy_img_mov_4.png', 'images/mathtoy_img_mov_3.png', 'images/mathtoy_img_mov_2.png', 'images/mathtoy_img_mov_1.png', 'images/mathtoy_img_mov_5.png', 'images/mathtoy_img_mov_4.png', 'images/mathtoy_img_mov_3.png', 'images/mathtoy_img_mov_2.png', 'images/mathtoy_img_mov_1.png', 'images/mathtoy_img_mov_4.png', 'images/mathtoy_img_mov_3.png', 'images/mathtoy_img_mov_2.png', 'images/mathtoy_img_mov_1.png', 'images/mathtoy_img_mov_2.png', 'images/mathtoy_img_mov_3.png', 'images/mathtoy_img_mov_4.png'];
	

	setTimeout(function() {
		spriteAnimation(spriteArray_0, front, spriteArray_0.length*100);
		spriteAnimation(spriteArray_1, calculationImg, spriteArray_1.length*100);
		spriteAnimation(spriteArray_2, calculationImg2, spriteArray_2.length*100);
		spriteAnimation(spriteArray_3, backSeat, spriteArray_3.length*100);
		spriteAnimation(spriteArray_4, endFigure, spriteArray_4.length*100);

		streamSound.setSound('media/slot_1.mp3');
	}, 200);

	

	setTimeout(function() {
		// resultScene();
		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

		// for (var i = 0; i < choiceQuestionContainer.length; i++) {
		// 	choiceQuestionContainer[i].style.pointerEvents = "auto";
		// }
	}, 2000);
}

function gameOverLightring(){
	var lightring = document.querySelector('#lightring');

	spriteArray_3 = ['images/mathtoy_light_off.png', 'images/mathtoy_light_on1.png', 'images/mathtoy_light_on2.png','images/mathtoy_light_on1.png', 'images/mathtoy_light_on2.png','images/mathtoy_light_on1.png', 'images/mathtoy_light_on2.png', 'images/mathtoy_light_on1.png', 'images/mathtoy_light_on2.png','images/mathtoy_light_on1.png', 'images/mathtoy_light_on2.png','images/mathtoy_light_on1.png', 'images/mathtoy_light_on2.png', 'images/mathtoy_light_on1.png', 'images/mathtoy_light_on2.png', 'images/mathtoy_light_on1.png', 'images/mathtoy_light_on2.png', 'images/mathtoy_light_on1.png', 'images/mathtoy_light_off.png'];

	spriteAnimationLight(spriteArray_3, lightring, spriteArray_3.length*100);

}

function gameOver(dragObj) {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
	totalCoinContainer = document.querySelector('#totalCoinContainer');

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	
	gameOverLightring();
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');

	document.querySelector('#answerMark').setAttribute('style', 'position: absolute; display: block; top:' + (dragObj.offsetTop + 20) + 'px; left:' + (dragObj.offsetLeft + 70) + 'px;');

	log('aaaaa');
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

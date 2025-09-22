function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject', 'circle', document.getElementById('bgCanvas'));
	
	var circleAnswer = document.querySelector('#answerObject');
	appendChoiceQuestion('click', gameManager.choiceQuestion);
	queTxt();

}

function queTxt(){
	appendCircleElement('queTxt_wrap','queTxt_wrap', bgCanvas);
    appendCircleElement('queTxt','queText', document.querySelector('#queTxt_wrap'));
    appendCircleElement('queText1','queText', document.querySelector('#queTxt'));
    appendCircleElement('calculation1','calculation', document.querySelector('#queTxt'));
    appendCircleElement('queText2','queText', document.querySelector('#queTxt'));
    appendCircleElement('calculation2','calculation', document.querySelector('#queTxt'));
    appendCircleElement('queText3','queText', document.querySelector('#queTxt'));

    queText1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
    queText2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
    queText3.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[2];
    


    var cal_1 = gameManager.TOTAL_ANSWER_ARRAY[6],
    	cal_2 = gameManager.TOTAL_ANSWER_ARRAY[7];
    switch(cal_1){
    	case '+':
    		appendImageElement('cal_img', 'images/plus.png', calculation1);
    	break;
    	case '-':
    	appendImageElement('cal_img', 'images/minus.png', calculation1);
    	break;
    	case '/':
    		appendImageElement('cal_img', 'images/division.png', calculation1);
    	break;
    	case '*':
    		appendImageElement('cal_img', 'images/multiplication.png', calculation1);	
    	break;
    }
    switch(cal_2){
    	case '+':
    		appendImageElement('cal_img', 'images/plus.png', calculation2);
    	break;
    	case '-':
    	appendImageElement('cal_img', 'images/minus.png', calculation2);
    	break;
    	case '/':
    		appendImageElement('cal_img', 'images/division.png', calculation2);
    	break;
    	case '*':
    		appendImageElement('cal_img', 'images/multiplication.png', calculation2);	
    	break;
    }
}

function initBus() {
	log('initBus...');

	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	back1 = document.querySelector('#back1'),
	busHi = document.querySelector('#busHi');

	child = document.createElement('img'),
	child.setAttribute('id','child');

	back1.setAttribute('style', 'position: absolute; top: 20px; left: 300px;');
	child.setAttribute('style', 'position: absolute; left: 247px; top: 275px; z-index: 0;');

	var randomChild = Math.floor((Math.random() * 2) + 1);
	child.src = 'images/busstop_char_' + randomChild + '.png';

	bgCanvas.appendChild(child);
}	

function busMotioncorrect() {
	var busMotion = document.createElement('img'),
	bus = document.querySelector('#bus'),
	busHi = document.querySelector('#busHi'),
	correctTxt = document.createElement('div'),
	bus = document.createElement('img');

	spriteArray = ['images/busstop_bus_tire_1.png', 'images/busstop_bus_tire_2.png','images/busstop_bus_tire_1.png', 'images/busstop_bus_tire_2.png','images/busstop_bus_tire_1.png', 'images/busstop_bus_tire_2.png','images/busstop_bus_tire_1.png', 'images/busstop_bus_tire_2.png'];
	
	busMotion.setAttribute('id', 'busMotion');
	correctTxt.setAttribute('id', 'correctTxt');
	bus.setAttribute('id', 'bus');

	var randomBus = Math.floor((Math.random() * 4) + 1);
	bus.src = 'images/busstop_bus_' + randomBus + '.png';

	busMotion.setAttribute('style', 'position: absolute; top: 77%; left: 200px; z-index: 2;');
	busHi.setAttribute('style', 'left: 1300px;');

	var busHiLeft = parseInt(busHi.style.left),
	left = -1070;


	streamSound.setSound('media/bus.mp3');
	setTimeout(function() {
		busHi.appendChild(busMotion);
		busHi.appendChild(bus);
		busHi.appendChild(correctTxt);

		correctTxt.innerHTML = gameManager.CURRENT_ANSWER[0];
		var aa = parseInt(spriteArray.length) * 100;
		var index = 0;
		animate({
			delay : 100,
			duration : aa,
			delta : makeEaseInOut(linear),
			step : function(delta) {
				// log('@ sprite!');
				busMotion.src = spriteArray[index];
				busHi.style.left = ((left * delta) + busHiLeft) + 'px';
				index ++;

			}
		});
		spriteAnimation(spriteArray, busMotion);
	}, 100);

}

function childClick() {
	var child = document.querySelector('#child')
	childSrc = child.src,
	childObj = childSrc.split('_');
	childObj = childObj.slice('-1');

	btnDown = function(e) {
		e.preventDefault();
	}
	btnUp = function(e) {
		e.preventDefault();
		childClickMotion();
		child.style.pointerEvents = 'none';
		streamSound.setSound('media/bus_char_3.wav');

		setTimeout(function(){
			child.src = 'images/busstop_char_' + childObj;
			child.style.pointerEvents = 'auto';
		},1000)
	}

	child.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	child.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);
}

function childClickMotion(){
	var child = document.querySelector('#child')
	childSrc = child.src;

	sadChild = childSrc.replace('.png','');

	childArray = [sadChild + '_1.png',sadChild + '_1.png',sadChild + '_2.png',sadChild + '_2.png'];
	setTimeout(function() {
		var aa = parseInt(childArray.length) * 220;
		var index = 0;
		animate({
			delay : 220,
			duration : aa,
			delta : makeEaseInOut(linear),
			step : function(delta) {
				child.src = childArray[index];
				index ++;
			}
		});
		spriteAnimation(childArray, child);
	}, 10);
}


function busBye(){
	var busHi = document.querySelector('#busHi'),
	child = document.querySelector('#child');


	var busHiLeft = parseInt(busHi.style.left),
	childLeft = parseInt(child.style.left),
	left = -1070;

	setTimeout(function() {
		var aa = parseInt(spriteArray.length) * 100;
		var index = 0;
		animate({
			delay : 100,
			duration : aa,
			delta : makeEaseInOut(linear),
			step : function(delta) {
				// log('@ sprite!');
				busMotion.src = spriteArray[index];
				busHi.style.left = ((left * delta) + busHiLeft) + 'px';
				child.style.left = ((left * delta) + childLeft) + 'px';
				index ++;

			}
		});
		spriteAnimation(spriteArray, busMotion);
	}, 100);


}


function gameOver(currentObj, dragObj, x, y) {
	document.querySelector('#answerMark').setAttribute('style', 'display:block; top:' + (currentObj.offsetTop + 0) + 'px; left:' + (currentObj.offsetLeft + 27) + 'px; z-index: 1;');
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	

	var child = document.querySelector('#child'),
	childSrc = child.src;

	setTimeout(function(){
		child.style.display ='none';

	},1200)
	setTimeout(function(){	
		child.setAttribute('style','position: absolute; left: 450px; top : 335px; z-index: 10;');
		child.setAttribute('src',childSrc.replace('.png','_face.png'));
		child.style.pointerEvents = 'none';
	},1700)
	busMotioncorrect();

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	
	setTimeout(function(){
		busBye();
		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');
	},2500)

	setTimeout(function() {
		log('excute stampStarIcon!');
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);


}


function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceLeft = 0,
	choiceTop = 90;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceLeft = 240;
		break;
		case 2 :
		choiceLeft = 150;
		break;
		case 3 :
		choiceLeft = 1041;
		break;
		case 4 :
		choiceLeft = -50;
		break;
		case 5 :
		choiceLeft = -150;
		break;
	}

	choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');
	bgCanvas.appendChild(choiceQuestionContainer);

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var currentQuestion;
		if (imgSrcArray) {

			var choiceQuestionGroup = document.createElement('div'),
			className = imgSrcArray[0].split('/');
			className = className[className.length - 1];
			className = className.split('_');

			choiceQuestionGroup.setAttribute('id', 'choiceQuestionGroup_' + i);
			choiceQuestionContainer.appendChild(choiceQuestionGroup);


			log(imgIndex);
			appendImageElement('choiceQuestion_' + i, imgSrcArray[0], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);


		}

		choiceTop = choiceTop + 90;

		currentQuestion.setAttribute('style', 'top:' + choiceTop + 'px;left:' + choiceLeft + 'px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestion[i];
			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestion[i];
		}
		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);
		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
		} else {
			currentQuestion.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);
			}, false);
		}
	}
}




function initScene() {
	log('initScene...');

	log('excute initClockTimer!');
	CheckButton();
	questionText();
	// parent.window.initClockTimer();
	
}
function questionText(){
	appendCircleElement('questionTextWrap','questionTextWrap', bgCanvas);
	appendCircleElement('bigFountain','questionBox',questionTextWrap);
	appendCircleElement('fountain','questionBox',questionTextWrap);
	appendCircleElement('question','questionBox',questionTextWrap);
	appendCircleElement('questionText1','questionText',fountain);
	appendCircleElement('line','questionText', fountain);
	appendCircleElement('questionText2','questionText', fountain);

	if(gameManager.TOTAL_ANSWER_ARRAY[0][0] === 0){
		bigFountain.innerHTML = '';
	}else{
		bigFountain.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0][0];
	}
	questionText1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0][1];
	line.innerHTML = '----';
	questionText2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0][2];
	question.innerHTML = '&nbsp;만큼 접시에 담으세요.';

}


function initPizza(pizzaCounter) {
	log('initPizza...');

	appendCircleElement('wrap','wrap', document.querySelector('#answerObject1'));
	appendImageElement('PlateCounter','images/vic_pizza_tray.png', bgCanvas, 'abso');
	appendImageElement('blankPlate','images/vic_pizza_plate.png', bgCanvas, 'abso');
	appendImageElement('pork','images/vic_pizza_pork.png', bgCanvas, 'abso');
	appendImageElement('nife','images/vic_pizza_nife.png', bgCanvas, 'abso');

	PlateCounter.setAttribute('style','top: 100px; left: 150px;');
	blankPlate.setAttribute('style','top: 220px; left: 710px;');
	pork.setAttribute('style','top: 300px; left: 646px;');
	nife.setAttribute('style','top: 300px; left: 1125px;');

	var answerObject1 = document.querySelector('#answerObject1');
	answerObject1.setAttribute('style','top: 250px; left: 738px;');

	var left = 15,
	   	pizzaOriginal;

	for (var i = 0; i < pizzaCounter; i++) {
		var top = 90,
		    eventCallback = function() {
			arguments[0].preventDefault();
			this.style.zIndex = '-2';

		};
		pizzaOriginal = 'images/vic_pizza_' + pizzaCounter +'_'+ (i+1) +'.png';
		createObject(i, top, left, eventCallback, pizzaOriginal);
	}

}

function gameOver() {
	var answerObj1 = document.querySelector('#answerObject1'),
	    answerChildNode1 = parseInt(answerObj1.childNodes[0].childNodes.length);

	if (gameManager.CURRENT_ANSWER[0] === answerChildNode1) {

		for(var i = 1; i < gameManager.TOTAL_ANSWER_ARRAY[0][2]; i++){
			var parentObj = document.querySelector('#parentObj_' + i);
			parentObj.style.pointerEvents = 'none';
		}

		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');

		logCounter.tryCounter();
		logCounter.endTime();

		var checkBtn = document.querySelector('#checkBtn');
		checkBtn.style.pointerEvents = "none";


		setTimeout(function() {
			log('excute stampStarIcon!');
			// parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			// parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);

	} else {
		log('@ incorrect!!');
		logCounter.tryCounter();
		streamSound.setSound('../../media/incorrect.mp3');
		
		setTimeout(function() {
			gameManager.selectedQuestion = [];
			document.querySelector('#bgCanvas').innerHTML = "<div id='pizzaCounter'></div><div id='answerObject1'></div><img src='images/checkbtn.png' id = 'checkBtn'/>";
			CheckButton();
			questionText();
			initPizza(gameManager.TOTAL_ANSWER_ARRAY[0][2]);
		}, 400);
	}
	

}

function boundingCircle(dragObj, x, y) {
	switch (gameManager.CURRENT_TYPE) {
	case 'vic_pizza':
		var answerObj1 = document.querySelector('#answerObject1'),
			wrapLength = parseInt(document.querySelector('#answerObject1').childNodes[0].childNodes.length),
			wrap = document.querySelector('#wrap'),
		  	answerChildNode1 = parseInt(answerObj1.childNodes.length)+1;

		if (x > answerObj1.offsetLeft * gameManager.zoomRate && x < (answerObj1.offsetLeft * gameManager.zoomRate) + ((answerObj1.clientWidth + 50) * gameManager.zoomRate) && y > answerObj1.offsetTop * gameManager.zoomRate && y < (answerObj1.offsetTop * gameManager.zoomRate) + ((answerObj1.clientHeight + 10) * gameManager.zoomRate) && answerChildNode1) {
			log('bounding!');

			boundingCounter = true;
			streamSound.setSound('media/donut.mp3');

			objsrc = dragObj.src;
			dragObj.style.top = '0px';
			dragObj.style.left = '0px';
			wrap.appendChild(dragObj);

		} else {
			streamSound.setSound('../../media/incorrect.mp3');
			log('not bounding!');
			logCounter.tryCounter();
			incorrectAnimation(dragObj);
		}
		break;

	default:
	}

}

function createObject(index, top, left, eventCallback, parentObjSrc) {
	var choiceTop = 0,
	    choiceLeft = 0,
	    parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;
	parentObj.setAttribute('style', 'z-index: '+ -index);
	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObj.className = "pizza";

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);
	gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
	document.getElementById('pizzaCounter').appendChild(parentObj);

	new Dragdrop(parentObj);
}

function CheckButton() {
	var checkBtn = document.querySelector('#checkBtn');

	btnDown = function(e) {
		e.preventDefault();
		checkBtn.src = 'images/checkbtn_push.png';
	}
	btnUp = function(e) {
		e.preventDefault();
		checkBtn.src = 'images/checkbtn.png';
		gameOver();
	}

	checkBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	checkBtn.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);

}




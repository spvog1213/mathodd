function initScene() {
	log('initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var currentAnswer = createElement('div',document.querySelector('#bgCanvas'),'currentAnswer'),
	dropArea = createElement('div',document.querySelector('#bgCanvas'),'dropArea'),
	answerText1 = createElement('span',document.querySelector('.currentAnswer'),'answerText1'),
	ship = createElement('div',document.querySelector('#bgCanvas'),'ship'),
	checkBtn = createElement('div',document.querySelector('#bgCanvas'),'checkBtn');

	ship.style.pointerEvents = 'none';
	answerText1.innerHTML ='<span class="colorText">' + gameManager.QUIZ_OPTION[0] + '</span><span> 만큼 동물을 태우세요.</span>';

	appendQuiz('drag', gameManager.quizConvertNumber); 
}

function appendQuiz(buttonType, quizImgArray, imgSrcArray) {
	var quizContainer = createElement('div',document.querySelector('#bgCanvas'),'quizContainer'),
	choiceLeft = 200,
	choiceTop,
	xRandom = Math.floor((Math.random() * 4) + 1);

	for (var i = 1; i < gameManager.QUIZ_OPTION.length; i++) {
		var animalContainer = createElement('div',document.querySelector('.quizContainer'),'animal_' + gameManager.QUIZ_OPTION[i]);

		for (var j = 0; j < 10; j++) {
			var quizObj = createElement('div', animalContainer,'drag'),
			className;

			if (gameManager.QUIZ_OPTION[i] == 1) className = 'drag1';
			else if (gameManager.QUIZ_OPTION[i] == 10) className = 'drag2';
			else if (gameManager.QUIZ_OPTION[i] == 100) className = 'drag3';

			quizObj.style.left = 1060 - (i * 11) + 'px';

			if (gameManager.QUIZ_OPTION.length > 3) {
				if (i == 1) quizObj.style.top = '220px';
				else if (i == 2) quizObj.style.top = '366px';
				else if (i == 3) quizObj.style.top = '530px';
			} else {
				if (i == 1) quizObj.style.top = '280px';
				else if (i == 2) quizObj.style.top = '470px';
			}

			if (j !== 0) quizObj.style.visibility = 'hidden';

			quizObj.classList.add(className, 'drag_'+ j);
			quizObj.style.position = 'absolute';
			quizObj.style.background = 'url(images/quizObj_' + gameManager.QUIZ_OPTION[i] + '_' + xRandom + '.png) no-repeat';

			new Dragdrop(quizObj);
		}
		gameManager.quizPosition[quizObj.classList[1].split('drag')[1] - 1] = [parseInt(quizObj.style.top), parseInt(quizObj.style.left)];
	}
}

function boundingCircle(dragObj, x, y) {

	var dropArea = document.querySelector('.dropArea'),
		answerChildNode1 = parseInt(dropArea.childNodes.length),
		drag = document.querySelectorAll('.drag'),
		animal_1 = QS('.animal_1'),
		animal_10 = QS('.animal_10'),
		animal_100 = QS('.animal_100'),
		numTop, numLeft, count, dragContainer;

	var classNameCut = parseInt(dragObj.className.split('_')[1]) + 1;

	if (x > dropArea.offsetLeft * gameManager.zoomRate && 
		x < (dropArea.offsetLeft * gameManager.zoomRate) + ((dropArea.clientWidth + 10) * gameManager.zoomRate) && 
		y > dropArea.offsetTop * gameManager.zoomRate && 
		y < (dropArea.offsetTop * gameManager.zoomRate) + ((dropArea.clientHeight + 10) * gameManager.zoomRate)) {

		log('bounding!');
		streamSound.setSound('media/animalShip.mp3');
		dragObj.style.pointerEvents = 'none';
		var count0 = gameManager.selectBallArray[0].length,
		count1 = gameManager.selectBallArray[1].length,
		count2 = gameManager.selectBallArray[2].length;

		if(dragObj.classList[1] == 'drag1') {
			gameManager.selectBallArray[0].push(dragObj);
			if (gameManager.QUIZ_OPTION.length > 3) numLeft = 590;
			else numLeft = 490;
			count0++;
			count = count0;
			dragContainer = animal_1;

		} else if(dragObj.classList[1] == 'drag2') {
			gameManager.selectBallArray[1].push(dragObj);
			if (gameManager.QUIZ_OPTION.length > 3) numLeft = 310;
			else if (QS('.animal_1') != null) numLeft = 100;
			else {numLeft = 450;}
			count1++;
			count = count1;
			dragContainer = animal_10;

		} else if(dragObj.classList[1] == 'drag3') {
			gameManager.selectBallArray[2].push(dragObj);
			if (gameManager.QUIZ_OPTION.length > 3) numLeft = 0;
			else numLeft = 100;
			count2++;
			count = count2;
			dragContainer = animal_100;
		}

		numTop = 473 - (20 * dragObj.classList[1].split('drag')[1]);

		dragObj.style.position = 'absolute';

		if (count > 5) {
			dragObj.style.top = numTop - (75 + (dragObj.classList[1].split('drag')[1] * 20)) + 'px';
			dragObj.style.left = (numLeft - 70) + (count * 30) - 80 + 'px';
		} else {
			dragObj.style.top = numTop + 'px';
			dragObj.style.left = numLeft + (count * 30) + 'px';
		}

		if (count !== 10) {
			dragContainer.childNodes[9].style.visibility = 'hidden'
		}
	} else {
		log('not bounding!');
		dragObj.nextSibling.style.visibility = 'hidden';
		incorrectAnimation(dragObj, gameManager.quizPosition[dragObj.classList[1].split('drag')[1] - 1][0], gameManager.quizPosition[dragObj.classList[1].split('drag')[1] - 1][1]);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}

function CheckButton() {
	var checkBtn = document.querySelector('.checkBtn');

	btnDown = function(e) {
		console.log('click');
		e.preventDefault();
		checkBtn.style.background = 'url("images/boxfill_checkbtn_push.png") no-repeat';
		setTimeout(function(){
			checkBtn.style.background = 'url("images/boxfill_checkbtn.png") no-repeat';
		}, 100);
		
		gameOver();
	}
	checkBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
}

function gameOver() {

	if(compareDap()) {
		console.log('correct');
		QS('#bgCanvas').style.pointerEvents = 'none';
		gameEnd();

	} else {
		console.log('incorrect');
		gameReset();
	}

	function compareDap () {
		for (var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
			if (gameManager.selectBallArray[i].length !== gameManager.QUIZ_ANSWER[i]) return false;
		}
		return true;
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

function gameReset() {
	streamSound.setSound('../../media/incorrect.mp3');
	logCounter.tryCounter();

	var drag = document.querySelectorAll('.drag'),
	choiceTop,
	choiceLeft;

	for(var i = 0; i < drag.length; i++) {	

		
		choiceTop = gameManager.quizPosition[drag[i].classList[1].split('drag')[1] - 1][0];
		choiceLeft = gameManager.quizPosition[drag[i].classList[1].split('drag')[1] - 1][1];

		drag[i].style.top = choiceTop + 'px';	
		drag[i].style.left = choiceLeft + 'px';	
		drag[i].style.pointerEvents = 'auto';
		drag[i].style.visibility = 'hidden';
	}

	for (var i = 0; i < QSAll('.drag_0').length; i++) {
		QSAll('.drag_0')[i].style.visibility = 'visible';
	}

	for (var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
		gameManager.selectBallArray[i] = [];
	}
}

function incorrectAnimation(dragObj, top, left) {

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {

			if (gameManager.BOUNDING_TYPE === 'left') {
				console.log('BOUNDING_TYPE: left')
				dragObj.style.left = ((-100 * delta) + (100) + left) + 'px';
				dragObj.style.top = top + 'px';
			} else {
				dragObj.style.top = ((-100 * delta) + (100) + top)  + 'px';
				dragObj.style.left = left  + 'px';
			}

		}
	});
}


function Dragdrop(element) {
	this.element = element;
	this.parentElement = window;
	this.createDragdrop();
}

Dragdrop.prototype.createDragdrop = function() {

	var dragDrop = this,
	startDrag = function(e) {
		e.preventDefault();
		var eventMaster = eventSelector('downEvent', e);
		dragDrop.element.nextSibling.style.visibility = 'visible';

		dragDrop.offY = eventMaster.clientY - (dragDrop.element.offsetTop * gameManager.zoomRate);
		dragDrop.offX = eventMaster.clientX - (dragDrop.element.offsetLeft * gameManager.zoomRate);

		this.style.zIndex = 20;
		dragDrop.parentElement.addEventListener(gameManager.eventSelector.moveEvent, drag, true);
	},
	drag = function(e) {
		e.preventDefault();
		var eventMaster = eventSelector('moveEvent', e);

		dragDrop.element.style.position = 'absolute';

		dragDrop.newY = eventMaster.clientY - dragDrop.offY;
		dragDrop.newX = eventMaster.clientX - dragDrop.offX;

		dragDrop.element.style.left = (dragDrop.newX / gameManager.zoomRate) + 'px';
		dragDrop.element.style.top = (dragDrop.newY / gameManager.zoomRate) + 'px';

	},
	endDrag = function(e) {
		var eventMaster = eventSelector('upEvent', e);
		dragDrop.parentElement.removeEventListener(gameManager.eventSelector.moveEvent, drag, true);
		if (eventMaster !== undefined)
			boundingCircle(this, eventMaster.clientX, eventMaster.clientY);

		this.style.zIndex = 2;
	}

	dragDrop.element.addEventListener(gameManager.eventSelector.downEvent, startDrag, false);
	dragDrop.element.addEventListener(gameManager.eventSelector.upEvent, endDrag, false);

}
function initScene() {

	var dropArea = createElement('div',document.querySelector('#bgCanvas'),'dropArea'),
		obgBg = createElement('div',document.querySelector('#bgCanvas'),'obgBg'),
		moneyBg = createElement('div',document.querySelector('#bgCanvas'),'moneyBg'),
		moneyBgText = createElement('div',moneyBg,'moneyBgText'),
		object = createElement('img',obgBg, 'object'),
		moneyText = createElement('span',document.querySelector('#bgCanvas'),'moneyText'),
		checkBtn = createElement('div',document.querySelector('#bgCanvas'),'checkBtn'),
		name;

	var moneyPrice = gameManager.QUIZ_OPTION[0][1].toString();
	moneyPrice = insertComma(moneyPrice);
	moneyText.innerHTML = moneyPrice;
	moneyBgText.innerHTML = '돈을 놓으세요.';

	switch (gameManager.QUIZ_OPTION[0][0]) {
		case '스쿠터' : name = 'bike'; break;
		case '로봇' : name = 'robot'; break;
		case '신발' : name = 'shoes'; break;
		case 'tv' : name = 'tv'; break;
		case '요트' : name = 'yachtPlane'; break;
		case '집' : name = 'house'; break;
		case '냉장고' : name = 'fridge'; break;
		case '자동차' : name = 'car'; break;
		case '보석' : name = 'jewely'; break;
	}
	object.src = './images/' + name + '.png';
	object.style.top = '40px';
	object.style.left = '50px';

	appendQuiz('drag');
}

function appendQuiz(buttonType, quizImgArray, imgSrcArray) {
	var quizContainer = createElement('div',document.querySelector('#bgCanvas'),'quizContainer'),
		choiceLeft = 200,
		choiceTop,
		moneyName;


	for (var i = 0; i < gameManager.QUIZ_OPTION[1].length; i++) {
		var dragContainer = createElement('div',document.querySelector('.quizContainer'),'dragContainer_' + gameManager.QUIZ_OPTION[1][i]),
			moneyBg = QS('.moneyBg');

		if (i === 0) { moneyCount = createElement('div', moneyBg, 'moneyCount moneyCount1'); }
		else if (i === 1) { moneyCount = createElement('div', moneyBg, 'moneyCount moneyCount2'); }
		else if (i === 2) { moneyCount = createElement('div', moneyBg, 'moneyCount moneyCount3'); }

		moneyCount.style.visibility ='hidden';

		for(var j = 0; j < 10; j++){
			var dragObj = createElement('div', dragContainer,'drag'),
				dragClassName;


			if(i == 0){
				dragClassName = 'drag1';
			}else if(i == 1){
				dragClassName = 'drag2';
			}else if(i == 2){
				dragClassName = 'drag3';
			}

			dragObj.style.top = '560px';

			if (gameManager.QUIZ_OPTION[1].length == 3) {
				if (i == 0) dragObj.style.left = '80px';
				else if (i == 1) dragObj.style.left = '470px';
				else if (i == 2) dragObj.style.left = '860px';
			} else {
				if (i == 0) dragObj.style.left = '290px';
				else if (i == 1) dragObj.style.left = '680px';
			}

			if (j !== 0) dragObj.style.visibility = 'hidden';

			// dragObj.classList.add(className, 'drag_'+ j);
			dragObj.className = 'drag ' + dragClassName + ' drag_' + j;
			dragObj.style.position = 'absolute';
			dragObj.style.background = 'url(images/bills_' + gameManager.QUIZ_OPTION[1][i] + '.png) no-repeat';
			dragObj.style.backgroundSize = '312px 113px';

			new Dragdrop(dragObj);

		}
		gameManager.quizPosition[dragObj.classList[1].split('drag')[1] - 1] = [parseInt(dragObj.style.top), parseInt(dragObj.style.left)];
	}
}


function boundingCircle(dragObj, x, y) {
	var dropArea = document.querySelector('.dropArea'),
		answerChildNode1 = parseInt(dropArea.childNodes.length),
		drag = document.querySelectorAll('.drag'),
		numTop, numLeft, count, dragContainer, moneyC;

	var classNameCut = parseInt(dragObj.className.split('_')[1]) + 1;

	if (x > dropArea.offsetLeft * gameManager.zoomRate &&
		x < (dropArea.offsetLeft * gameManager.zoomRate) + ((dropArea.clientWidth + 10) * gameManager.zoomRate) &&
		y > dropArea.offsetTop * gameManager.zoomRate &&
		y < (dropArea.offsetTop * gameManager.zoomRate) + ((dropArea.clientHeight + 10) * gameManager.zoomRate)) {

		log('bounding!');

		streamSound.setSound('media/7th_buyGoods.mp3');
		dragObj.style.pointerEvents = 'none';
		QS('.moneyBgText').innerHTML = '';

		var count0 = gameManager.selectBallArray[0].length,
			count1 = gameManager.selectBallArray[1].length,
			count2 = gameManager.selectBallArray[2].length;

		if(dragObj.classList[1] == 'drag1') {
			gameManager.selectBallArray[0].push(dragObj);
			numTop = 60;
			count0++;
			count = count0;
			moneyC = QS('.moneyCount1');
		} else if(dragObj.classList[1] == 'drag2'){
			gameManager.selectBallArray[1].push(dragObj);
			numTop = 200;
			count1++;
			count = count1;
			moneyC = QS('.moneyCount2');
			// dragContainer = animal_10;
		} else if(dragObj.classList[1] == 'drag3'){
			gameManager.selectBallArray[2].push(dragObj);
			numTop = 340;
			count2++;
			count = count2;
			moneyC = QS('.moneyCount3');
			// dragContainer = animal_100;
		}

		// numLeft = 700 - 20;

		dragObj.style.position = 'absolute';
		dragObj.style.top = numTop + 'px';
		// dragObj.style.left = numLeft + (count * 30) + 'px';
		dragObj.style.left = 720 + 'px';

		if (count > 1) dragObj.style.visibility = 'hidden';

		moneyC.style.top = numTop-20 + 'px';
		moneyC.style.left = 60 + 'px';
		moneyC.innerHTML = '<span>'+count+'</span>';
		moneyC.style.visibility = 'visible';

		if (count == 9) {
			dragObj.nextSibling.style.visibility = 'hidden';
		}
	} else {
		log('not bounding!');
		if(dragObj.classList[2].split('_')[1] !== 9) dragObj.nextSibling.style.visibility = 'hidden';
		incorrectAnimation(dragObj, gameManager.quizPosition[dragObj.classList[1].split('drag')[1] - 1][0], gameManager.quizPosition[dragObj.classList[1].split('drag')[1] - 1][1]);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
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
		streamSound.setSound('../../media/silent.mp3');
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

function CheckButton() {
	var checkBtn = document.querySelector('.checkBtn');
	checkBtn.addEventListener(gameManager.eventSelector.upEvent, btnDown, false);
}

var btnDown = function(e) {
	e.preventDefault();
	this.style.background = 'url("../../images/common/checkBtnRed_on.png") no-repeat';

	gameOver();
}

function gameOver() {

	if(compareDap()) {
		console.log('correct');
		gameEnd();

		var drag = document.querySelectorAll('.drag'),
			object = QS('.object'),
			choiceTop, choiceLeft,
			moneyCount = QSAll('.moneyCount');

		for(var j = 0; j < moneyCount.length; j++){
			moneyCount[j].style.visibility = 'hidden';
			moneyCount[j].innerHTML = '';
		}

		for(var i = 0; i < drag.length; i++) {
			choiceTop = gameManager.quizPosition[drag[i].classList[1].split('drag')[1] - 1][0];
			choiceLeft = gameManager.quizPosition[drag[i].classList[1].split('drag')[1] - 1][1];

			drag[i].style.top = choiceTop + 'px';
			drag[i].style.left = choiceLeft + 'px';
		}

		object.style.top = '25px';
		object.style.left = '540px';
		object.style.width = '420px';

		QS('#bgCanvas').style.pointerEvents = 'none';


	} else {
		console.log('incorrect');
		streamSound.setSound('../../media/incorrect.mp3');
		gameReset();
		setTimeout(function(){
			QS('.checkBtn').style.background = 'url("../../images/common/checkBtnRed.png") no-repeat';
		}, 200);
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
	logCounter.tryCounter();

	var drag = document.querySelectorAll('.drag'),
		choiceTop, choiceLeft,
		moneyCount = QSAll('.moneyCount');

	for(var j = 0; j < moneyCount.length; j++){
		moneyCount[j].style.visibility = 'hidden';
		moneyCount[j].innerHTML = '';
	}

	for(var i = 0; i < drag.length; i++) {

		choiceTop = gameManager.quizPosition[drag[i].classList[1].split('drag')[1] - 1][0];
		choiceLeft = gameManager.quizPosition[drag[i].classList[1].split('drag')[1] - 1][1];

		drag[i].style.top = choiceTop + 'px';
		drag[i].style.left = choiceLeft + 'px';
		drag[i].style.pointerEvents = 'auto';
		drag[i].style.visibility = 'hidden';
		drag[9].style.pointerEvents = 'none';
		// if(drag[i].classList[2].split('_')[1] == 0){
		// 	drag[i].style.visibility = 'visible';
		// }
	}

	var drag_0 = document.querySelectorAll('.drag_0')
	for (var i = 0; i < drag_0.length; i++) {
		QSAll('.drag_0')[i].style.visibility = 'visible';
	}

	for (var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
		gameManager.selectBallArray[i] = [];
	}

	QS('.moneyBgText').innerHTML = '돈을 놓으세요.';
}

// 천 단위마다 comma 찍는 함수
function insertComma(text) {
	text = text.toString();
	var output = '';

	do {
		if(text.length % 3 != 0) {
			output += text.slice(0, text.length % 3) + ',';
			text = text.slice(text.length % 3, text.length);
		} else {
			output += text.slice(0, 3) + ',';
			text = text.slice(3, text.length);
		}
	} while (text.length >= 4)

	output += text;

	return output;
}

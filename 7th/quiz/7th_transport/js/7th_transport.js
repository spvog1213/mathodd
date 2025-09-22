function initScene(){

	gameManager.bunsu = [];
	gameManager.sosu = [];

	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
		if(typeof gameManager.QUIZ_ANSWER[i] == 'object'){
			gameManager.bunsu.push(gameManager.QUIZ_ANSWER[i]);
		}else{
			gameManager.sosu.push(gameManager.QUIZ_ANSWER[i]);
		}
	}

	gameManager.bunsu = stirElements(gameManager.bunsu, gameManager.bunsu.length);
	gameManager.sosu = stirElements(gameManager.sosu, gameManager.sosu.length);

	gameManager.blankCount = gameManager.bunsu.concat(gameManager.sosu);

	var bgCanvas = document.getElementById('bgCanvas'),
		content =  createElement('div',bgCanvas,'content'),
		dragBottom =  createElement('div',content,'dragBottom');

	var k = 0;
	for(var i = 0; i < gameManager.QUIZ_OPTION.length; i++){
		var dropBox =  createElement('div',content,'dropBox dropBox_'+i),
			dropObj0 = createElement('div',dropBox,'dropObj0 dropObj0_'+i),
			dropObj1 = createElement('div',dropBox,'dropObj1 dropObj1_'+i),
			dropObj2 = createElement('div',dropBox,'dropObj2 dropObj2_'+i);
		// if(typeof gameManager.QUIZ_OPTION[i][0] == 'string'){
		// 	makeBunsu(gameManager.QUIZ_OPTION[i][0], dropObj0);
		// }else {
		// 	dropObj0.innerHTML = '<span>'+gameManager.QUIZ_OPTION[i][0]+'</span>';
		// }

		if(typeof gameManager.QUIZ_OPTION[i][0] == 'object'){
			// makeBunsu(gameManager.QUIZ_OPTION[i][0], dropObj0);
			makeBunsu(gameManager.QUIZ_OPTION[i][0].toString(), dropObj0);
		}else {
			dropObj0.innerHTML = '<span>'+gameManager.QUIZ_OPTION[i][0]+'</span>';
		}

//수정해야댐////////////////////////////////////////////////////////////////////////////////////

		if(gameManager.QUIZ_OPTION[i][1] == ''){
			dropObj1.className += ' blank';
			dropObj1.style.background = 'url(images/dropObj2_questionBox.png) no-repeat';
			var dropObj = createElement('div', bgCanvas, 'dropObj dropObj_' + (k+1)),
				toptop = getRealOffsetTop(dropObj1),
				leftleft = getRealOffsetLeft(dropObj1);
			k++;

			dropObj.style.left = leftleft + 'px';
			dropObj.style.top = toptop + 'px';

			gameManager.dropArea.push(dropObj);

			dropObj.setAttribute('answerValue', convertBunsuToDec(gameManager.QUIZ_OPTION[i][0]).toFixed(2));
			dropObj.setAttribute('color', 'y');

		} else if(gameManager.QUIZ_OPTION[i][1] !== ''){
			makeBunsu(gameManager.QUIZ_OPTION[i][1].toString(), dropObj1);
		}

		if(gameManager.QUIZ_OPTION[i][2] == ''){
			dropObj2.className += ' blank';
			dropObj2.style.background = 'url(images/dropObj3_questionBox.png) no-repeat';
			var dropObj = createElement('div', bgCanvas, 'dropObj dropObj_' + (k+1)),
				toptop = getRealOffsetTop(dropObj2),
				leftleft = getRealOffsetLeft(dropObj2);
			k++;

			dropObj.style.left = leftleft + 'px';
			dropObj.style.top = toptop + 'px';

			gameManager.dropArea.push(dropObj);

			dropObj.setAttribute('answerValue', convertBunsuToDec(gameManager.QUIZ_OPTION[i][0]).toFixed(2));
			dropObj.setAttribute('color', 'r');

		} else if(gameManager.QUIZ_OPTION[i][2] !== ''){
			dropObj2.innerHTML = '<span>'+gameManager.QUIZ_OPTION[i][2]+'</span>';
		}

//수정해야댐////////////////////////////////////////////////////////////////////////////////////
	}

	// var blank = QSAll('.blank');
	//
	//
	//
	// for(var k = 0; k < blank.length; k++){
	// 	var dropObj = createElement('div', bgCanvas, 'dropObj dropObj_' + (k+1));
	//
	// 	var toptop = getRealOffsetTop(blank[k]),
	// 		leftleft = getRealOffsetLeft(blank[k]);
	//
	// 	dropObj.style.left = leftleft + 'px';
	// 	dropObj.style.top = toptop + 'px';
	//
	// 	gameManager.dropArea.push(dropObj);
	// }

	dropBoxImgArray();
	makeDragObjs();
}

function dropBoxImgArray() {
	var x = Math.floor(Math.random() * 3),
		dropBox = document.querySelectorAll('.dropBox');
		for(var j = 0; j < dropBox.length; j++){
			if(j < 2) dropBox[j].style.background = 'url(images/dropBox_' + x + '.png) no-repeat';
			else dropBox[j].style.background = 'url(images/dropBox_' + x + '_right.png) no-repeat';
		}
}

function makeDragObjs(){
	var content = QS('.content'),
		colIdx;

	for(var k = 0; k < gameManager.blankCount.length; k++){
		var drgObj = createElement('div',content,'drgObj drgObj_'+k);

		if(k == 0) drgObj.style.visibility = 'visible';
		else drgObj.style.visibility = 'hidden';


		if(typeof gameManager.blankCount[k] == 'object'){
			makeBunsu(gameManager.blankCount[k].toString(), drgObj);
			colIdx = 2;

		}else{
			colIdx = 3;
			drgObj.innerHTML = '<span>'+gameManager.blankCount[k]+'</span>';
			drgObj.style.textAlign = 'center';
		}
		drgObj.style.background = 'url(images/dropObj'+colIdx+'.png) no-repeat';
		drgObj.style.top = '520px';
		drgObj.style.left = '560px';
		if(typeof gameManager.blankCount[k] === 'object') {
			drgObj.setAttribute('color', 'y');
			drgObj.setAttribute('answerValue', convertBunsuToDec(gameManager.blankCount[k]).toFixed(2));
		} else {
			drgObj.setAttribute('color', 'r');
			drgObj.setAttribute('answerValue', gameManager.blankCount[k].toFixed(2));
		}
		gameManager.quizPosition.push([520, 560]);
		new Dragdrop(drgObj);
	}

}


// 분수 만드는 함수
function makeBunsu(text, targetElement){
	var bunsuArray = [], bunsuTxt = [], beforeTxt = '', afterTxt = '';
	if(text.indexOf('[') > -1) {
		while(text.indexOf('[') > -1) {
			if(spitBunsuText(text).length === 3) {
				beforeTxt = spitBunsuText(text)[2];
				var bText = createElement('span', targetElement);
				bText.innerHTML = beforeTxt;
			}
			bunsuTxt = spitBunsuText(text)[0];
			afterTxt = spitBunsuText(text)[1];
			bunsuArray = bunsuTxt.split(',');
			drawBunsu(bunsuArray, targetElement);
			text = afterTxt;
		}
	} else {
		bunsuArray = text.split(',');
		drawBunsu(bunsuArray, targetElement);
		text = afterTxt;
	}
	var aText = createElement('span', targetElement);
	aText.innerHTML = afterTxt;
}

// 분수 그릴 때 필요한 array 만드는 함수
function spitBunsuText(src){
	if(src.indexOf('[') === 0) {
		var startIdx = src.indexOf('['),
			endIdx = src.indexOf(']'),
			bunsuTxt = src.slice(startIdx + 1, endIdx),
			afterTxt = src.slice(endIdx + 1),
			resultArray = [bunsuTxt, afterTxt];
	} else {
		var startIdx = src.indexOf('['),
			endIdx = src.indexOf(']'),
			beforeTxt =  src.slice(0, startIdx),
			bunsuTxt = src.slice(startIdx + 1, endIdx),
			afterTxt = src.slice(endIdx + 1),
			resultArray = [bunsuTxt, afterTxt, beforeTxt];
	}
	return resultArray;
}

// 분수 그리는 함수
function drawBunsu(bunsuArray, parentElement){
	var bunsuDiv = createElement('div', parentElement, 'bunsuDiv'),
		int = createElement('div', bunsuDiv, 'int'),
		prop = createElement('div', bunsuDiv, 'prop'),
		bunja = createElement('div', prop, 'bunja'),
		bunmo = createElement('div', prop, 'bunmo'),
		midLine = createElement('div', prop, 'midLine');
	if (bunsuArray[0] != 0) int.innerHTML = bunsuArray[0];
	bunja.innerHTML = bunsuArray[1];
	bunmo.innerHTML = bunsuArray[2];
	bunsuDiv.style.cssText = 'display: inline-block; vertical-align: middle';
	int.style.cssText = 'display: inline-block; margin-right: 5px; vertical-align: middle';
	prop.style.cssText = 'position: relative; display: inline-block; line-height: 1.15em; vertical-align: middle';
	bunja.style.cssText = 'display: block; vertical-align: middle';
	bunmo.style.cssText = 'display: block; vertical-align: middle';
	midLine.style.cssText = 'position: absolute; top: 50%; left: 0; width: 100%; height: 0; margin-top: -0.05em; border-top: 0.1em solid; border-color: inherit;';
}

function convertBunsuToDec(array) { return (Number(array[0]) * Number(array[2]) + Number(array[1])) / Number(array[2]); }


function gameOver(currentObj) {

	var bgCanvas = document.querySelector('#bgCanvas');
		bgCanvas.style.pointerEvents = "none";


	shipMotion();

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');
	},500);


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

function boundingCircle(dragObj, x, y) {

	var idx = dragObj.className.split('_')[1];
	var dragObjValue = dragObj.getAttribute('answerValue');
	if (dropCompare(dragObj, x, y)) {

		log('bounding!');
		console.log("/..............");

		streamSound.setSound(gameManager.soundEffct);

		gameManager.dabCount += 1;
		correctPosition(dragObj);

		if (gameManager.dabCount == gameManager.QUIZ_ANSWER.length) {
			log('@ correct!!');
			gameOver(dragObj);
		}


		boundingCounter = true;
	} else {
		log('>>>>> not bounding!');
		if(dragObj.nextSibling !== null && dragObj.nextSibling !== undefined){
			dragObj.nextSibling.style.visibility = 'hidden';
		}
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}


function correctPosition (dragObj) {
	var blank = QSAll('.blank'),
		dropObj = QSAll('.dropObj'),
		dragObjBG = dragObj.style.background;

	for(var k = 0; k < dropObj.length; k++){
		if(dropObj[k].getAttribute('answervalue') == dragObj.getAttribute('answervalue') && dropObj[k].getAttribute('color') === dragObj.getAttribute('color')){
			blank[k].style.background = dragObjBG;
			blank[k].innerHTML = dragObj.innerHTML;
		}
	}
	dragObj.style.display = 'none';
	dragObj.style.pointerEvents = 'none';

}


function dropCompare (dragObj, x, y) {
	var dragObjValue = dragObj.getAttribute('answervalue'),
		dragObjColor = dragObj.getAttribute('color');

	for (var i = 0; i < gameManager.dropArea.length; i++) {

		var dropValue = gameManager.dropArea[i].getAttribute('answervalue'),
			dropColor = gameManager.dropArea[i].getAttribute('color');

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth + 10) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight + 10) * gameManager.zoomRate)) {

			for (var j = 0; j < dropValue.length; j++) {

				if (dragObjValue == dropValue && dragObjColor === dropColor) {
					gameManager.dropIdx = i;
					if(dragObj.nextSibling !== null && dragObj.nextSibling !== undefined){
						dragObj.nextSibling.style.visibility = 'visible';
					}
					return true;
				}
			}
			return false;
		}
	}
}

function shipMotion() {
	var dropBox = QSAll('.dropBox');

	setTimeout(function(){
		animate({
			delay : 30,
			duration : 1000,
			delta : makeEaseOut(linear),
			step : function(delta) {
				for(var k = 0; k < dropBox.length; k++){
					if(k < 2) dropBox[k].style.left = dropBox[k].offsetLeft -(70 * delta) + 'px';
					else if(k >= 2) dropBox[k].style.left = dropBox[k].offsetLeft +(70 * delta) + 'px';
				}
			}
		});
	},500);

}

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }

// 분수를 소수로 바꾸는 함수
function convertBunsuToDec(array) { return (Number(array[0]) * Number(array[2]) + Number(array[1])) / Number(array[2]); }

// randomArray 만들기
function makeRandomArray(min, length) {
	var randomNumber = 0, inspector = '', array = [];

	do {
		randomNumber = Math.floor(Math.random() * length) + min;
		if(inspector.indexOf(randomNumber) < 0) array.push(randomNumber);
		inspector += randomNumber.toString();
	} while (array.length !== length);

	return array;
}

// array 순서 섞어주는 함수
function stirElements(elements, length) {
	var numArray, newElements = [];
	numArray = makeRandomArray(0, length);
	newElements = newElements.concat(elements);
	numArray.forEach(function(el, i) { newElements[i] = elements[el]; });
	return newElements;
}


function initScene() {
	log('initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var currentAnswerText = document.createElement('div'),
		objectContainer = document.createElement('div')

		 currentAnswerText.className = 'textBox1';

// console.log(gameManager.QUIZ_OPTION[0][0])
	if(gameManager.QUIZ_OPTION[0][0] == 'img'){

		currentAnswerText.innerHTML = "<span>" + '<span class="colorText"></span>' + gameManager.QUIZ_OPTION[1] + "</span>";

		symbol = createElement ('div', currentAnswerText.childNodes[0], 'symbol');
		symbol.setAttribute('style', 'position:relative; top: -80px; left: -218px;');
		symbolBox(gameManager.QUIZ_OPTION[0][1], gameManager.QUIZ_OPTION[0][2], symbol, 100, 100);

	} else {
	 	currentAnswerText.innerHTML = "<span>" + '<span class="colorText" style="margin-left:-200px;">'+ gameManager.QUIZ_OPTION[0][1] + '</span>' + gameManager.QUIZ_OPTION[1] + "</span>";
	}

	objectContainer.id = 'objectContainer';

	document.getElementById('currentAnswer').appendChild(currentAnswerText);
}

function symbolBox (folder, flieName, targetElement, width, height) {	

	var symbolBox = CE('img'),
		colorRandom = parseInt((Math.random() * 5)+1);
	symbolBox.setAttribute('style', 'width : ' + width + 'px; height : ' + height + 'px;');

	// if(folder === 'figure' && (text === 'circle'||text === 'triangle'||text === 'square'||text === 'hexagon'||text === 'pentagon')){
	//  	symbolBox.src = '../../images/common/' + folder + '/' + text + '_' + figure + '_' + colorRandom + '.png';
	//  } else {
	// 	symbolBox.src = '../../images/common/' + folder + '/' + text + '_' + figure + '.png';
	// }
	
	symbolBox.src = '../../images/common/' + folder + '/' + flieName + '.png';


	targetElement.appendChild(symbolBox);

}

function initBalloon(balloonCounter) {
	log('initBalloon...');

	eventCallback = function(e) {
		e.preventDefault();
		arguments[0].preventDefault();

		var objIndex = this.id.split('_'),
			symBox = document.getElementById('symBox_' + objIndex[1]),
			balloonBox = document.getElementById('balloonBox_' + objIndex[1]),
			objectBox = document.getElementById('objectBox_' + objIndex[1]),
			height = (document.getElementById('bgCanvas').clientHeight - symBox.clientHeight) - 400,
			currentTop = parseInt(symBox.style.top.replace('px', ''));

		var choiceright = 0,
			choiceLeft = objectBox.offsetLeft,
			choiceTop = 20;

		if(compareBalloon(objIndex[1])){
			gameManager.selectBallArray.push(objIndex[1]);
			streamSound.setSound('media/balloon01.mp3');
			feedBackAnimation(this, 'images/boom_1.png');

			if(gameManager.selectBallArray.length == gameManager.QUIZ_ANSWER.length) gameOver();
		}else{
			logCounter.tryCounter();
			incorrectAnimation(objectBox);
			streamSound.setSound('../../media/incorrect.mp3');
		}
	}

	var left, top,
		rndIndex = parseInt(Math.random() * 3),
		colorRndIndex = parseInt(Math.random() * 5);

	if(gameManager.quizConvertNumber.length === 6){
		left = 250;
	} else if(gameManager.quizConvertNumber.length === 8){
		left = 150;
	}
	for (var i = 0; i < balloonCounter; i++) {
		if (balloonCounter > 6) {
			if (i > 3) {
				top = 440;
				if (i === 4) left = 150;
			}else {top = 160;}
		}else{
			top = 160;
			if(i === 3) left = 250;
			if(i > 2) {top = 440;}
		}
		createObject(i, top, left, eventCallback, 'images/balloon_' + colorRndIndex + '_' + rndIndex + '.png');
		left += 250;
	}

	function compareBalloon (index) {
		console.log(gameManager.QUIZ_ANSWER)
		for (var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
			console.log(index, gameManager.QUIZ_ANSWER[i])
			if (index == gameManager.QUIZ_ANSWER[i]) {
				return true;
			}
		}
		return false;
	}
}

function gameOver() {
	log('@ gameOver!');

	QS('#bgCanvas').style.pointerEvents = 'none';
	//return;
	setTimeout(function() {
		
		gameOverAnimation();

		for (var j = 0; j < gameManager.objectArray.length; j++) {
			gameManager.objectArray[j].childNodes[1].style.opacity = 0.2;
			
			for (var a = 0; a < gameManager.QUIZ_ANSWER.length; a++) {
				gameManager.objectArray[gameManager.QUIZ_ANSWER[a]].childNodes[1].style.opacity = 1;
			}	
		}
		streamSound.setSound('../../media/correct.mp3');
		logCounter.tryCounter();
		logCounter.endTime();
		clearInterval(countTimer);

	}, 500);

	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 1200);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);
}

function feedBackAnimation(balloonBox, balloonBoxSrc) {

	balloonBox.src = balloonBoxSrc;

	setTimeout(function() {

		balloonBox.setAttribute('style', 'display: none;');

	}, 100);
}

function createObject(index, top, left, eventCallback, balloonBoxSrc) {
	var objectBox = document.createElement('div'),
		balloonBox = document.createElement('img'),
		symBox = document.createElement('div'),
		outBox = document.createElement('div');

	objectBox.setAttribute('id', 'objectBox_' + index);
	objectBox.className = 'objectBox';
	objectBox.setAttribute('style', 'height:250px; position:absolute; top : ' + top + 'px; left : ' + left + 'px;');

	balloonBox.src = balloonBoxSrc;
	balloonBox.setAttribute('id', 'balloonBox_' + index);
	balloonBox.setAttribute('style', 'position:absolute; display:inline-block;');

	addIdleAnimation(700, 10, 8, objectBox, top);
	addIdleAnimation(700, 10, 8, symBox, 35);
	balloonBox.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);
	symBox.setAttribute('id', 'symBox_' + index);
	symBox.setAttribute('style', 'position: absolute; z-index: -1; top:50px; left:30px;');
	symbolBox(gameManager.quizConvertNumber[index][0], gameManager.quizConvertNumber[index][1], symBox, 120, 120);

	document.getElementById('bgCanvas').appendChild(objectBox);
	document.getElementById('objectBox_' + index).appendChild(balloonBox);
	document.getElementById('objectBox_' + index).appendChild(symBox);

	gameManager.objectArray.push(objectBox);

}

function incorrectAnimation (target, childTarget) {
	var selectObj = target,
		selectObjId = target.id.split('_'),
		currentLeft = parseInt(selectObj.style.left.replace('px', '')),
		currentTop = parseInt(selectObj.style.top.replace('px', ''));

	animate({
		delay: 20,
		duration: 200,
		delta: makeEaseOut(back), 
		step: function (delta) {
			selectObj.style.left = ((-100 * delta) + currentLeft + 100)  + 'px';
		}
	});
}

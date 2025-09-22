function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendChoiceQuestion('click', gameManager.choiceQuestion);

	log(gameManager.choiceQuestionBg);

	
	

}

function initExercise(fruitsCounter,exerciseContainer) {
	log('initFruits...');

	var left = 30, 
	comparisonAnswer_0 = gameManager.TOTAL_ANSWER_ARRAY[0], 
	comparisonAnswer_1 = gameManager.TOTAL_ANSWER_ARRAY[1], 
	comparisonAnswer,
	fruitsOriginal,
	fruitsSlice;

	//Min, Max, Number
	setRand(1, 3, 3);

	if(comparisonAnswer_0 > comparisonAnswer_1){
		comparisonAnswer = comparisonAnswer_0;
	}else{
		comparisonAnswer = comparisonAnswer_1;
	}


	log(comparisonAnswer + '위치값');

	fruitsOriginal = 'images/ball_' + randResult[0] + '.png';
	fruitsOriginalexe = 'images/ball_' + randResult[1] + '.png';

	for (var i = 0; i < fruitsCounter; i++) {
		var top = 260,
		eventCallback = function() {
			arguments[0].preventDefault();
			feedBackAnimation(this, function() {
			});

			
		}
		createObject(i, top, left, eventCallback, fruitsOriginal);
		
	}

	for (var i = 0; i < exerciseContainer; i++) {
		var topExE = 520,
		eventCallbackExe = function() {
			arguments[0].preventDefault();
			feedBackAnimationExe(this, function() {
			});
			
		}
		createobjexe(i, top, left, eventCallbackExe, fruitsOriginalexe);
	}

	var fruitsContainer = document.getElementById('fruitsContainer'),
		containerWidth = 1002,
		bgCanvasLeft = gameManager.bgCanvasWidth - (gameManager.clientWidth * gameManager.zoomRate),
		containerLeft = ((gameManager.bgCanvasWidth) - containerWidth) - 210;

	fruitsContainer.setAttribute('style', 'width:' + containerWidth + 'px; top:' + top + 'px; left:' + (containerLeft / 2.1) + 'px;');

	var ballBox = document.createElement('img'),
		questioning = document.createElement('div'),
		questioningImg = document.createElement('img'),
		questioningImgtxt = document.createElement('span');

	questioning.setAttribute('id','questioning');
	questioningImgtxt.setAttribute('id','questioningImgtxt');

	questioningImgtxt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[4];

	questioningImg.src = 'images/questioningBox.png';

	bgCanvas.appendChild(questioning);
	questioning.appendChild(questioningImg);
	questioning.appendChild(questioningImgtxt);

	log(questioning);

	appendImageElement('picSelectBox01', 'images/picSelectBox.png', document.querySelector('#fruitsContainer')); // (id/img/appendChild)

	
	var exerciseContainer = document.getElementById('exerciseContainer');

	exerciseContainer.setAttribute('style', 'width:' + containerWidth + 'px; top:' + topExE + 'px; left:' + (containerLeft / 2.1) + 'px;');


	appendImageElement('picSelectBox01', 'images/picSelectBox.png', document.querySelector('#exerciseContainer'));

}

function gameOver(currentObj) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	var fruitsContainer = document.querySelectorAll('.fruits');

	for (var i = 0; i < fruitsContainer.length; i++) {
		fruitsContainer[i].style.pointerEvents = "none";
	}

	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');

	document.querySelector('#currentQuestion').setAttribute('style', 'display:block; top:' + (currentObj.offsetTop + 30) + 'px; left:' + (currentObj.offsetLeft + 30) + 'px;');

	logCounter.tryCounter();
	logCounter.endTime();
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

function createObject(index, top, left, eventCallback, parentObjSrc) {
	var parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;

	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObj.className = "fruits";

	parentObj.setAttribute('style', 'padding-top: 15px; padding-left : ' + (left / 2) + 'px; padding-right : ' + (left / 2) + 'px;');

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);
	parentObj.addEventListener(gameManager.eventSelector.upEvent, function() {
		document.querySelector('#numberPanel').setAttribute('style', 'display:none;');
	}, false);

	log(top);

	document.getElementById('fruitsContainer').appendChild(parentObj);

}

function createobjexe(index, top, left, eventCallback, parentObjSrc) {
	var parentObjEx = document.createElement('img');

	parentObjEx.src = parentObjSrc;

	parentObjEx.setAttribute('id', 'parentObjEx_' + index);
	parentObjEx.className = "fruits";

	parentObjEx.setAttribute('style', 'padding-top: 15px; padding-left : ' + (left / 2) + 'px; padding-right : ' + (left / 2) + 'px;');

	parentObjEx.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);
	parentObjEx.addEventListener(gameManager.eventSelector.upEvent, function() {
		document.querySelector('#numberPanelEx').setAttribute('style', 'display:none;');
	}, false);

	document.getElementById('exerciseContainer').appendChild(parentObjEx);

}


function feedBackAnimation(parentObj, parentObjSrc, callback) {

	// parentObj.src = parentObjSrc;

	var checkNumber = false,
	objId = parentObj.id.split('_');

	log(objId + 'aaaaaaaaaaaaaaaaaa');

	for (var i = 0; i < gameManager.selectedQuestion.length; i++) {
		if (objId[1] === gameManager.selectedQuestion[i]) {
			checkNumber = true;
		}
	}

	var top = 0,
	    currentTop = 30;

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			parentObj.style.top = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
			//parentObj.style.left = gameManager.choiceDessertPosition[parentObj[1]][1] + 'px';

		}
	});

	if (!checkNumber)
		gameManager.selectedQuestion.push(objId[1]);

	var numberPanel = document.querySelector('#numberPanel'),
		
	leftMargin = gameManager.choiceQuestion.length * 100;
	//152

	// numberPanel.setAttribute('style', 'display:block; top : -28px; left:' + (parentObj.offsetLeft + 21) + 'px;');
	// numberPanel.innerHTML = gameManager.selectedQuestion.length;


	// var soundSrcNum = gameManager.selectedQuestion.length < 10 ? '0' + gameManager.selectedQuestion.length : gameManager.selectedQuestion.length;

	if (gameManager.SoundSrcType === 'numberVoice')
		streamSound.setSound('media/balloon01.mp3');
	else
		streamSound.setSound('media/balloon01.mp3');

	setTimeout(function() {

		// callback();

	}, 200);
}

function feedBackAnimationExe(parentObjEx, parentObjSrc, callback) {

	// parentObj.src = parentObjSrc;

	var checkNumber = false,
	objId = parentObjEx.id.split('_');

	log(objId + 'aaaaaaaaaaaaaaaaaa');

	for (var i = 0; i < gameManager.selectedQuestionNum.length; i++) {
		if (objId[1] === gameManager.selectedQuestionNum[i]) {
			checkNumber = true;
		}
	}

	var top = 0,
	    currentTop = 30;

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			parentObjEx.style.top = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
			//parentObj.style.left = gameManager.choiceDessertPosition[parentObj[1]][1] + 'px';

		}
	});

	if (!checkNumber)
		gameManager.selectedQuestionNum.push(objId[1]);

	var numberPanelEx = document.querySelector('#numberPanelEx'),
		
	leftMargin = gameManager.choiceQuestion.length * 100;
	//152

	// numberPanelEx.setAttribute('style', 'display:block; top : -28px; left:' + (parentObjEx.offsetLeft + 21) + 'px;');
	// numberPanelEx.innerHTML = gameManager.selectedQuestionNum.length;


	// var soundSrcNum = gameManager.selectedQuestionNum.length < 10 ? '0' + gameManager.selectedQuestionNum.length : gameManager.selectedQuestionNum.length;

	if (gameManager.SoundSrcType === 'numberVoice')
		streamSound.setSound('media/balloon01.mp3');
	else
		streamSound.setSound('media/balloon01.mp3');

	setTimeout(function() {

		// callback();

	}, 200);
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
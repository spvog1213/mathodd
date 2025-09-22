function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var canvas = document.querySelector('#bgCanvas'),
		eventGroup = createElement('div',bgCanvas,'eventGroup'),
		checkBtn = createElement('div', eventGroup, 'checkBtn'),
		checkBtn_on = createElement('div',eventGroup,'checkBtn_on'),
		questionBox = createElement('div', canvas, 'quizBox'),
		str = "../../images/common/" + gameManager.quizText[0] + "/" + gameManager.quizText[1] + ".png",
		content = createElement('div', canvas, 'content');
		createElement('div',bgCanvas,'fence');


	checkBtn_on.setAttribute('style','visibility:hidden');
	questionBox.innerHTML = "<img src = "+ str +" class='question'/>"+gameManager.quizText[2];

	for(var i = 0; i < 2; i++){
		var dropArea = createElement('div',canvas ,'dropArea_'+i),
		top, left = content.offsetLeft;
		if(i === 0){ top =  content.offsetTop; }
		else{top =  content.offsetTop + 350; }
		dropArea.setAttribute('style', 'top:'+ top +'px; left:'+ left +'px;');
		gameManager.dropArea.push(dropArea);
	}

	checkBtn.addEventListener(gameManager.eventSelector.upEvent, checkFun, false);
}

function checkFun(){

	var checkBtn = document.querySelector('.checkBtn'),
	checkBtn_on = document.querySelector('.checkBtn_on');

	checkBtn.setAttribute('style','visibility:hidden');
	checkBtn_on.setAttribute('style','visibility:visible');

	clickCompareAnswer();
}



function initObject(val) {
	log('initObject...');
	var dragObjContainer = createElement('div', document.querySelector('#bgCanvas'), 'dragObjContainer');

	for(var index = 1; index < val.length; index++){
		var str = "../../images/common/" + (val[index])[0] + "/" + (val[index])[1] + ".png";
		appendImageElement('drag_'+index, str, dragObjContainer, 'drag_'+index);
	}

	appendQuiz('drag', val);
}



function appendQuiz(buttonType, val) {

	var choiceLeft = 300,
		choiceTop = 220;

		gameManager.answerLeftTop = [choiceLeft, choiceTop];
	for (var index = 1; index < parseInt(val.length/2)+1; index++) {
		var dragObj = document.querySelector('.drag_'+index);
		dragObj.setAttribute('style','top:'+ choiceTop +'px; left:'+ choiceLeft +'px;');
		dragObj.setAttribute('answerValue',(val[index])[1]);
		gameManager.answerPosition.push(dragObj);
		if (buttonType === 'drag') {
			new Dragdrop(dragObj);
		}
		choiceLeft += 250;
	}

	choiceLeft = 300;
	choiceTop = 510;


	gameManager.choiceLeftTop = [choiceLeft,choiceTop];

	for (var index = parseInt(val.length/2)+1; index < (val.length); index++) {
		var dragObj = document.querySelector('.drag_'+index);
		dragObj.setAttribute('style','top:'+ choiceTop +'px; left:'+ choiceLeft +'px;');
		dragObj.setAttribute('answerValue',(val[index])[1]);
		gameManager.choicePosition.push(dragObj);
		if (buttonType === 'drag') { new Dragdrop(dragObj); }
		choiceLeft += 250;
	}
}


function boundingCircle(dragObj, x, y) {
	log('bounding!');

	var bool = dropCompare(dragObj, x, y);
	if (bool[0]) {
		var x = getRealOffsetLeft(dragObj),
			y = getRealOffsetTop(dragObj);
		bool[1] == 0 ? answerArea(dragObj,x, y) : choiceArea(dragObj,x, y);
		appendObject(gameManager.answerPosition, gameManager.answerLeftTop[0], gameManager.answerLeftTop[1]);
		appendObject(gameManager.choicePosition, gameManager.choiceLeftTop[0],  gameManager.choiceLeftTop[1]);
		streamSound.setSound(gameManager.soundEffct);
	} else {
		log('>>>>> not bounding!');
		appendObject(gameManager.answerPosition, gameManager.answerLeftTop[0], gameManager.answerLeftTop[1]);
		appendObject(gameManager.choicePosition, gameManager.choiceLeftTop[0], gameManager.choiceLeftTop[1]);

		streamSound.setSound('../../media/incorrect.mp3');
	}
}


function dropCompare (dragObj, x, y) {

	for (var i = 0; i < gameManager.dropArea.length; i++) {

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth + 100) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight + 100) * gameManager.zoomRate)) {
			return [true, i];
		}

	}
	return [false];
}


function answerArea (dragObj, x, y) {
	var max = gameManager.answerPosition.length;
	for(var i = 0; i < gameManager.choicePosition.length; i++){
		if(gameManager.choicePosition[i] == dragObj){
			gameManager.choicePosition.splice(i, 1);
		}
	}

	if( max != 0 ){
		for(var i = 0; i < max; i++){
			if(gameManager.answerPosition[i] == dragObj){
				gameManager.answerPosition.splice(i, 1);
			}
		}

		for(var i = 0; i < max; i++){

			if(x < gameManager.answerPosition[0].offsetLeft){
				gameManager.answerPosition.unshift(dragObj);
			} else if(x > gameManager.answerPosition[gameManager.answerPosition.length-1].offsetLeft ){
				gameManager.answerPosition.push(dragObj);
			} else if(x > gameManager.answerPosition[i].offsetLeft && x < gameManager.answerPosition[i+1].offsetLeft ){
				var temp = gameManager.answerPosition[i+1];
				gameManager.answerPosition.splice(i+1,1,dragObj,temp);
			}
		}

	} else {
		gameManager.answerPosition.push(dragObj);
	}

}


function choiceArea (dragObj, x, y) {
	var max = gameManager.choicePosition.length;
	for(var i = 0; i < gameManager.answerPosition.length; i++){
		if(gameManager.answerPosition[i] == dragObj){
			gameManager.answerPosition.splice(i, 1);
		}
	}

	if(max != 0){
		for(var i = 0; i < max; i++){
			if(gameManager.choicePosition[i] == dragObj){
				gameManager.choicePosition.splice(i, 1);
			}
		}

		for(var i = 0; i < max; i++){

			if(x < gameManager.choicePosition[0].offsetLeft){
				gameManager.choicePosition.unshift(dragObj);
			} else if(x > gameManager.choicePosition[gameManager.choicePosition.length-1].offsetLeft ){
				gameManager.choicePosition.push(dragObj);
			} else if(x > gameManager.choicePosition[i].offsetLeft && x < gameManager.choicePosition[i+1].offsetLeft ){
				var temp = gameManager.choicePosition[i+1];
				gameManager.choicePosition.splice(i+1,1,dragObj,temp);
			}
		}

	} else {
		gameManager.choicePosition.push(dragObj);
	}

}


function appendObject(postion, left, top){
	var temp = 0;
	switch(postion.length){
		case 1:
		left = 560;
		break;
		case 2:
		left = 400;
		temp = 250;
		break;
		case 3:
		left = 300;
		temp = 250;
		break;
		case 4:
		left = 240;
		temp = 200;
		break;
		case 5:
		left = 220;
		temp = 150;
		break;
		case 6:
		left = 180;
		temp = 140;
		break;
	}

	for (var index = 0; index < postion.length; index++) {
		postion[index].setAttribute('style','top:'+ top +'px; left:'+ left +'px;');
		left += temp;
	}
}


function clickCompareAnswer() {
	var postionMax = gameManager.answerPosition.length,
		answerMax = gameManager.QUIZ_ANSWER.length,
		checkBtn = document.querySelector('.checkBtn'),
		checkBtn_on = document.querySelector('.checkBtn_on');

	if(answerMax === postionMax){
		var correctNum = 0;
		for (var i = 0; i <  postionMax; i++){
			var answervalue = gameManager.answerPosition[i].className.split('_');

			for(var j = 0; j <  answerMax; j++){
				if (gameManager.QUIZ_ANSWER[j] == answervalue[1]){
					correctNum += 1;
				}
			}
		}

		if(correctNum == answerMax){
			gameOver();
			streamSound.setSound('../../media/correct.mp3');
		} else {
			setTimeout(function(){
				checkBtn.setAttribute('style','visibility:visible');
				checkBtn_on.setAttribute('style','visibility:hidden');
			}, 100);
			streamSound.setSound('../../media/incorrect.mp3');
			logCounter.tryCounter();
		}

	} else {
		setTimeout(function(){
			checkBtn.setAttribute('style','visibility:visible');
			checkBtn_on.setAttribute('style','visibility:hidden');
		}, 100);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}

}

function gameOver() {

	var canvas = document.querySelector('#bgCanvas');
		canvas.style.pointerEvents = "none";

	setTimeout(function() {
		gameOverAnimation();
		logCounter.tryCounter();
		logCounter.endTime();
	}, 100);


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

}

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }

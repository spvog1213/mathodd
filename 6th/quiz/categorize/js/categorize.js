function initScene() {

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		rotateLeft,
		tubeTop = -270,
		textBoardTop = -334,
		dropAreaTop = -235;

	for(var i = 1; i < gameManager.QUIZ_OPTION[0].length; i++){
		var tube = createElement('div', bgCanvas, 'tube tube_' + i),
			textBoard = createElement('div', bgCanvas, 'textBoard textBoard_' + i),
			textBordSuccess = createElement('div', bgCanvas, 'textBordSuccess')

		tube.style.background = 'url(images/categorize_tube_' + i + '.png)';
		textBoard.style.background = 'url(images/categorize_textBoard.png)'
		textBordSuccess.style.background = 'url(images/categorize_textBoard_success.png)'

		tubeTop = tubeTop + 335
		textBoardTop = textBoardTop + 334
		tube.style.top = tubeTop + 'px';
		textBoard.style.top = textBoardTop + 'px';
		textBordSuccess.style.top = textBoardTop + 'px';
		textBordSuccess.style.opacity = 0;
		if(gameManager.QUIZ_OPTION[0][0] == 'text'){
			textBoard.innerHTML = gameManager.QUIZ_OPTION[0][i]
			textBordSuccess.innerHTML = gameManager.QUIZ_OPTION[0][i]
		} else if(gameManager.QUIZ_OPTION[0][0] == 'img'){
			var imgBoard = createElement('div', textBoard, 'imgBoard');
			imgBoard.style.background = 'url(../../images/common/' + gameManager.QUIZ_OPTION[0][i][0] + '/' + gameManager.QUIZ_OPTION[0][i][1] + '.png) no-repeat';
		}
	}

	for(var i = 1; i < gameManager.QUIZ_OPTION[0].length; i++){
		var dropArea = createElement('div', bgCanvas, 'dropArea dropArea_' + (i-1));
		// var answerValue = gameManager.QUIZ_ANSWER[i];

		dropArea.setAttribute('answerValue', i-1);
		gameManager.dropArea.push(dropArea);
		dropAreaTop = dropAreaTop + 340;
		dropArea.style.top = dropAreaTop + 'px';
		dropArea.style.left = '120px';
		dropArea.style.textAlign = 'center';
	}

	appendSelectQuestion('drag', gameManager.quizObj);

}



function gameOver(currentObj) {

	var quizObjContainer = document.querySelector('.quizObjContainer').childNodes;

	for (var i = 0; i < quizObjContainer.length; i++) {
		quizObjContainer[i].style.pointerEvents = "none";
	}

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	blingblingBord()

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

function blingblingBord() {
	var textBoard = document.querySelectorAll('.textBoard'),
		textBordSuccess = document.querySelectorAll('.textBordSuccess');

	for (var i = 0; i < textBoard.length; i++) {

		setInterval(function(){
			textBordSuccess[0].style.opacity = 1
			textBoard[0].style.opacity = 0
		},200);
		setInterval(function(){
			textBoard[0].style.opacity = 1
			textBordSuccess[0].style.opacity = 0
		},400);
		setInterval(function(){
			textBordSuccess[1].style.opacity = 1
			textBoard[1].style.opacity = 0
		},200);
		setInterval(function(){
			textBoard[1].style.opacity = 1
			textBordSuccess[1].style.opacity = 0
		},400);
	}


}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    quizObjContainer = createElement('div', bgCanvas, 'quizObjContainer'),
	    dragObjTop = -110,
	    dragObjLeft = 920,
	    dragObjRightTop = -10;

	for (var i = 0; i < gameManager.quizObj.length; i++) {

		var dragObj = createElement('div', quizObjContainer, 'dragObj dragObj_' + i);
			intX = Math.floor((Math.random() * 3) + 1);


		dragObj.style.background = 'url(../../images/common/' + gameManager.quizObj[i][0] + '/' + gameManager.quizObj[i][1] + '.png)'
		dragObj.style.backgroundSize = 'cover'
		if(i % 2 == 0){
			dragObjTop = dragObjTop + 170;
	    dragObjLeft = 920;
			if(intX == 1){
				dragObj.style.top = dragObjTop - 10 + 'px'
				dragObj.style.left = dragObjLeft - 20 + 'px';
			}else if(intX == 2){
				dragObj.style.top = dragObjTop + 20 + 'px'
				dragObj.style.left = dragObjLeft + 20 + 'px';
			}else if(intX == 3){
				dragObj.style.top = dragObjTop + 'px'
				dragObj.style.left = dragObjLeft + 'px';
			}
		}else if(i % 2 == 1) {
			if(intX == 1){
				dragObj.style.left = (dragObjLeft + 160) - 20 + 'px';
			}else if(intX == 2){
				dragObj.style.left = (dragObjLeft + 160) + 20 + 'px';
			}else if(intX == 3){
				dragObj.style.top = dragObjTop + 'px'
				dragObj.style.left = (dragObjLeft + 160) + 'px';
			}
			dragObjRightTop = dragObjRightTop + 170;
			dragObj.style.top = dragObjRightTop + 'px'
		}
		
		for(var j = 0; j < gameManager.QUIZ_ANSWER.length; j++){
			for(var k = 0; k < gameManager.QUIZ_ANSWER[j].length; k++){
				if(i == gameManager.QUIZ_ANSWER[0][k]){
					dragObj.setAttribute('answerValue', 0);

				}else if((i == gameManager.QUIZ_ANSWER[1][k])){
					dragObj.setAttribute('answerValue', 1);
				}
			}
		}
		var offsetLeft = parseInt(dragObj.style.left),
			offsetTop = parseInt(dragObj.style.top)

		gameManager.quizPosition.push([offsetTop, offsetLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(dragObj);

		} else {
			dragObj.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}

function boundingCircle(dragObj, x, y) {

	var idx = dragObj.className.split('_')[1];
	var dragObjValue = dragObj.getAttribute('answerValue');
	if (dropCompare(dragObj, x, y)) {

		log('bounding!');
 		streamSound.setSound(gameManager.soundEffct);
		var dropObj = document.querySelectorAll('.dropArea')

		correctPosition(dragObj);

		if(dragObjValue == dropObj[0].getAttribute('answervalue')){
			gameManager.dabCount[0] += 1;
		}else if(dragObjValue == dropObj[1].getAttribute('answervalue')){
			gameManager.dabCount[1] += 1;
		}

		if (gameManager.dabCount[0] == gameManager.QUIZ_ANSWER[0].length && gameManager.dabCount[1] == gameManager.QUIZ_ANSWER[1].length) {
			log('@ correct!!');
			gameOver(dragObj);
		}

		boundingCounter = true;
	} else {
		log('>>>>> not bounding!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}



function correctPosition (dragObj) {
	if (gameManager.QUIZ_TYPE == 'categorize') {
 
 		if(dragObj.getAttribute('answerValue') == 0){
			gameManager.dropArea[0].appendChild(dragObj);

			dragObj.style.position = 'static';
			dragObj.style.display = 'inline-block';
			dragObj.style.marginTop = '40px';

		} else if(dragObj.getAttribute('answerValue') == 1){
			gameManager.dropArea[1].appendChild(dragObj);

			dragObj.style.position = 'static';
			dragObj.style.display = 'inline-block';		
			dragObj.style.marginTop = '40px';
		}

	}

	dragObj.style.pointerEvents = 'none';

}
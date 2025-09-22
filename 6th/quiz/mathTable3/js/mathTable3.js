function initScene() {
	log('initScene...');
	log(gameManager.QUIZ_OPTION);
	log(gameManager.QUIZ_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	
	var bgCanvas = document.getElementById('bgCanvas'),
		mathTableBg = createElement('div', bgCanvas, 'mathTableBg'),
		quizBoxLeft,
		quizBoxTop ;
	
	for (var i = 0; i < gameManager.QUIZ_OPTION.length-1; i++) {
		for(var j = 0; j < gameManager.QUIZ_OPTION.length-1; j++){

			switch(i){
				case 0 :
					quizBoxTop = 180 
				break;
				case 1 :
					quizBoxTop = 290 
				break;
				case 2 :
					quizBoxTop = 400 
				break;
				case 3 :
					quizBoxTop = 510 
				break;
				case 4 :
					quizBoxTop = 620
				break;
			}
			switch(j){
				case 0 :
					quizBoxLeft = 155 
				break;
			}

			quizBoxLeft = quizBoxLeft + 110;

			quizBox = createElement('div', bgCanvas, 'quizBox quizBox_' + i + '_' + j);
			quizBox.innerHTML = gameManager.QUIZ_OPTION[i][j];	
			quizBox.style.top = quizBoxTop + 'px';
			quizBox.style.left = quizBoxLeft + 'px';

			if(i == 0 && j == 0){
				switch (gameManager.QUIZ_OPTION[0][0]) {	
					case '+':
						quizBox.style.background = 'url(images/mathTable_Symbol_1.png)';
						break;
					case '-':
						quizBox.style.background = 'url(images/mathTable_Symbol_2.png)';
						break;
					case '*':
						quizBox.style.background = 'url(images/mathTable_Symbol_3.png)';
						break;
					case '/':
						quizBox.style.background = 'url(images/mathTable_Symbol_4.png)';
						break;
				}
				// quizBox.style.background = 'url(images/mathTable_' + gameManager.QUIZ_OPTION[0][0] + '.png)';
				quizBox.style.textIndent = '-9990px';
			} else if(i == 0 || j == 0 )	{
				quizBox.style.background = 'url(images/mathTable_quizBox.png)'
				quizBox.style.color = '#4a3214'
			} else if(gameManager.QUIZ_OPTION[i][j] == ''){
				quizBox.className += ' blank';
				quizBox.style.background = 'url(images/mathTable_dropBox.png)'
				quizBox.style.textIndent = '-9990px';
				var blankArray = [];
			}
		}
	}

	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
		var dropArea = createElement('div', bgCanvas, 'dropArea dropArea_' + i),
			blank = document.querySelectorAll('.blank');

		dropArea.style.top = parseInt(blank[i].style.top) - 21 + 'px'
		dropArea.style.left = parseInt(blank[i].style.left) - 21 + 'px'

		var answerValue = gameManager.QUIZ_ANSWER[i];
		dropArea.setAttribute('answerValue', answerValue);
		gameManager.dropArea.push(dropArea);
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

	setTimeout(function() {
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');
	},500);

	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 2300);
}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    quizObjContainer = document.createElement('div'),
	    line = document.createElement('div'),
	    dragContainer = createElement('div', bgCanvas, 'dragContainer'),
	    choiceTop = 00;

	quizObjContainer.setAttribute('class', 'quizObjContainer');
	bgCanvas.appendChild(quizObjContainer);
	for (var i = 0; i < gameManager.blankCount; i++) {

		var selectObj,
			dragObj = createElement('div', dragContainer, 'dragObj_' + i),
			X = dragObj.className.split('_')[1];

		if(X % 2 == 1){
		    choiceLeft = 1060;
		}else{
			choiceLeft = 910;
			choiceTop = choiceTop + 180;
		}


		selectObj = document.querySelector('.dragObj_' + i)
		selectObj.setAttribute('style', 'left: '+ choiceLeft +'px; Top:' + choiceTop + 'px;');
		selectObj.setAttribute('answerValue', gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1][i]);
		selectObj.innerHTML = gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1][i];

		gameManager.quizPosition.push([choiceTop, choiceLeft]);


		if (buttonType === 'drag') {
			new Dragdrop(selectObj);
		} else {
			selectObj.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}

function dropCompare (dragObj, x, y) {
	var dragObjValue = dragObj.getAttribute('answervalue');

	for (var i = 0; i < gameManager.dropArea.length; i++) {

		var dropValue = gameManager.dropArea[i].getAttribute('answervalue');
		dropValue = dropValue.split(',');

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight) * gameManager.zoomRate)) {
			for (var j = 0; j < dropValue.length; j++) {
				if (dragObjValue == dropValue[j]) {
					gameManager.dropIdx = i;
					dragObj.style.background = 'url(images/mathTable_dragBox_success.png) no-repeat';
					dragObj.style.height = '100px';

					return true;
				}
			}
			return false;
		}
	}
}

function initScene() {
	// log('initScene...');
	// log(gameManager.CURRENT_ANSWER);
	// log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('cart', 'cart', bgCanvas);
	appendImageElement('mart_girl', 'images/mart_girl.png', bgCanvas);
	appendCircleElement('answerObject_1', 'circle', bgCanvas);
	appendCircleElement('answerObject_2', 'circle', bgCanvas);
	appendSelectQuestion('drag', gameManager.choiceQuestion);


	appendCircleElement('que_bg', 'que_bg', bgCanvas);
	for(var i = 0; i < 2; i++){
		appendCircleElement('lathetxt', 'circle', que_bg);
		appendImageElement('mart_lathe', 'images/mart_lathe.png', que_bg);
		
	}

	var txt1 = que_bg.childNodes[0],
		txt2 = que_bg.childNodes[2];

		txt1.innerHTML = '나머지';
		txt2.innerHTML = '몫';

	var circleAnswer = document.querySelector('#answerObject_1');
	triangleAnswer = document.querySelector('#answerObject_2');
	
	circleAnswer.setAttribute('candleValue', gameManager.CURRENT_ANSWER[0]);
	triangleAnswer.setAttribute('candleValue', gameManager.CURRENT_ANSWER[1]);

	circleAnswer.setAttribute('style','left: 10px; top:438px; width:547px; height:296px;');
	triangleAnswer.setAttribute('style','left: 10px; top:438px; width:547px; height:296px;');
}

function txtBox() {
	appendCircleElement('txtBg', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('txtGroup', 'circle', document.getElementById('txtBg'));
	appendCircleElement('startNum', 'Num', txtGroup);
	appendCircleElement('divisiontxt', 'divisiontxt', txtGroup);
	appendCircleElement('endNum', 'Num', txtGroup);

	divisiontxt.setAttribute('style','font-size:60px;');

	startNum.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	divisiontxt.innerHTML = '÷';
	endNum.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
}

function returnCurrentObj(dragObj) {
	var answerValue = dragObj.getAttribute('answervalue');
	for (var i = 1; i <= gameManager.CURRENT_ANSWER.length; i++) {
		if (answerValue === document.querySelector('#answerObject_' + i).getAttribute('candleValue')) {
			return document.querySelector('#answerObject_' + i);
		}
	}

}


function gameOver(dragObj) {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
		var choiceBgBye = choiceQuestionContainer[i].childNodes[1];
	}

	streamSound.setSound('../../media/correct.mp3');
	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();

	

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

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceTop = 90,
	choiceLeft = 635;

	choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');
	bgCanvas.appendChild(choiceQuestionContainer);

	setRand(1, 3, 3);
	gameManager.ImgArray = ['images/mart_milk_' + randResult[0] + '.png', 'images/mart_milk_' + randResult[1] + '.png', 'images/mart_milk_' + randResult[2] + '.png'];

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var currentQuestion;
		if (imgSrcArray) {

			var choiceQuestionGroup = document.createElement('div'),
			className = imgSrcArray[0].split('/');
			className = className[className.length - 1];
			className = className.split('_');

			choiceQuestionGroup.setAttribute('id', 'choiceQuestionGroup_' + i);
			choiceQuestionContainer.appendChild(choiceQuestionGroup);

			var imgIndex = parseInt(Math.random() * 3);

			log(imgIndex);
			appendImageElement('choiceQuestion_' + i, imgSrcArray[i], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
		}

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestionText[i];

			choiceQuestionGroup.appendChild(imgObjText);


		} else {
			appendCircleElement('choiceQuestionTxT_' + i, 'choiceQuestionTxT', currentQuestion);
			var choiceQuestionTxT = document.querySelector('#choiceQuestionTxT_' + i);
			choiceQuestionTxT.innerHTML = gameManager.choiceQuestion[i];

			

			var choiceQuestion = document.querySelector('#choiceQuestion_' + i);

		if(i > 2){
			switch(i){
			case 3 :
			choiceTop = choiceTop + 230;
			choiceLeft = (choiceLeft + 170) - 490;
			break;
			case 4 :
			choiceLeft = (choiceLeft + 170);
			break;
			case 5 :
			choiceLeft = (choiceLeft + 170);
			break;
			}
			currentQuestion.setAttribute('style', 'width: 82px; left: ' + choiceLeft + 'px; Top: ' + choiceTop + 'px;');
			appendImageElement('things', gameManager.ImgArray[i-3], document.querySelector('#choiceQuestion_' + i));

		}else{
			choiceLeft = choiceLeft + 170;
			currentQuestion.setAttribute('style', 'width: 121px; left: ' + choiceLeft + 'px; Top: ' + choiceTop + 'px;');
			appendImageElement('things', 'images/mart_pan.png', document.querySelector('#choiceQuestion_' + i));
		}

		}

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		

		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
			//여기를 읽어욤...
		} else {
			currentQuestion.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				contrastAnswer(this);

			}, false);
		}
	}
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

function getRand(dragObj) {
	randNumber = Math.floor(Math.random() * randList.length);
	randResult.push(randList[randNumber]);
	randList.splice(randNumber, 1);
}



function puzzleCompareAnswer(dragObj, arrayNum) {
	dragObj.className += ' correct';

		var correct = document.querySelectorAll('.correct');

		dragObj.style.pointerEvents = 'none';
		
		
		if(dragObj.id === 'choiceQuestion_0' || dragObj.id === 'choiceQuestion_1' || dragObj.id === 'choiceQuestion_2'){
			dragObj.style.marginTop = '52px';
			dragObj.style.marginLeft = '180px';
		}else{
			dragObj.style.marginTop = '52px';
			dragObj.style.marginLeft = '330px';
		}


	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
		setTimeout(function(){
			choiceQuestionContainer[i].style.pointerEvents = "auto";
		},200)
	}

		

	if (correct.length === gameManager.CURRENT_ANSWER.length) {

		setTimeout(function() {
			for (var i = 0; i < correct.length; i++) {
				// correct[i].style.display = "none";
			}

			gameOver();
		}, 100);

	}

}


function correctMotion() {
		var mart_girl = document.querySelector('#mart_girl');

		girlArray = ['images/mart_girl_success_1.png', 'images/mart_girl_success_2.png','images/mart_girl_success_3.png','images/mart_girl.png','images/mart_girl.png','images/mart_girl.png'];
		spriteAnimation(girlArray, mart_girl);

}
function incorrectMotion() {
		var mart_girl = document.querySelector('#mart_girl');

		girlArray = ['images/mart_girl_fail_1.png', 'images/mart_girl_fail_2.png','images/mart_girl_fail_3.png','images/mart_girl.png','images/mart_girl.png','images/mart_girl.png'];

		spriteAnimation(girlArray, mart_girl);
		streamSound.setSound('../../media/incorrect.mp3');	

}

function spriteAnimation(spriteArray, spriteObj) {

	var index = 0;
	animate({
		delay : 150,
		duration : 750,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}

function initScene() {
	// log('initScene...');
	// log(gameManager.CURRENT_ANSWER);
	// log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('seeSawAllBox', 'circle', document.getElementById('bgCanvas'));

	appendCircleElement('answerObject_1', 'circle', seeSawAllBox);
	appendCircleElement('answerObject_2', 'circle', seeSawAllBox);
	appendCircleElement('question1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question2', 'circle', document.getElementById('bgCanvas'));

	appendImageElement('center', 'images/seeSaw_center.png', document.getElementById('bgCanvas'),'center');
	appendImageElement('seeSaw', 'images/seeSaw.png',seeSawAllBox,'seeSaw');

	appendImageElement('butterfly_textbox', 'images/seeSaw_textbox.png',question1,'butterfly_textbox');
	appendImageElement('butterfly_textbox', 'images/seeSaw_textbox.png',question2,'butterfly_textbox');

	appendCircleElement('questiontxt1', 'circle', question1);
	appendCircleElement('questiontxt2', 'circle', question2);

	var circleAnswer = document.querySelector('#answerObject_1');
	triangleAnswer = document.querySelector('#answerObject_2');

	appendSelectQuestion('drag', gameManager.choiceQuestion);

	circleAnswer.setAttribute('candleValue', gameManager.CURRENT_ANSWER[0]);
	triangleAnswer.setAttribute('candleValue', gameManager.CURRENT_ANSWER[1]);
}

function inithangerBar() {
	log('initpuzzle...');

	var circleAnswer = document.querySelector('#answerObject_1'),
	triangleAnswer = document.querySelector('#answerObject_2');

	appendImageElement('butterflyFlowerPink', 'images/seeSaw_bear.png',circleAnswer,'butterflyFlowerPink');
	appendImageElement('butterflyFlowerBlue', 'images/seeSaw_rabbit.png',triangleAnswer,'butterflyFlowerBlue');

	circleAnswer.setAttribute('style','position:absolute; top:-150px; left:35px; width:200px; height:300px; z-index:10;');
	triangleAnswer.setAttribute('style','position:absolute; top:-150px; left:600px; width:200px; height:300px; z-index:10;');

	question1.setAttribute('style','position:absolute; top:100px; left:120px; width:202px;');
	question2.setAttribute('style','position:absolute; top:100px; left:680px; width:202px;');

	questiontxt1.setAttribute('style','position:absolute; top:-10px; left:0px; width:202px;');
	questiontxt2.setAttribute('style','position:absolute; top:-10px; left:0px; width:202px;');

	questiontxt1.innerHTML = '큰 분수';
	questiontxt2.innerHTML = '작은 분수';

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

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();

	// setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
	// },300);

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
	line = document.createElement('div'),
	choiceTop = 400,
	choiceLeft = 1050;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceTop = 240;
		break;
		case 2 :
		choiceTop = -115;
		break;
		case 3 :
		choiceTop = -70;
		break;
		case 4 :
		choiceTop = -50;
		break;
		case 5 :
		choiceTop = -150;
		break;
	}

	choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');
	bgCanvas.appendChild(choiceQuestionContainer);


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
			// 

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			// log(i);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
			//여기를 읽어욤...
		}

		choiceTop = choiceTop + 300;

		currentQuestion.setAttribute('style', 'left: ' + choiceLeft + 'px; Top: ' + choiceTop + 'px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestionText[i];

			choiceQuestionGroup.appendChild(imgObjText);

		} else {

			var imgObjText = document.createElement('div');
			fountainText = document.createElement('div'),
			mixedFractionText = document.createElement('div'),
			fountainLine = document.createElement('div'),
			choiceQuestionAllBox = document.createElement('div');

			choiceQuestionAllBox.id = 'choiceQuestionAllBox'; 

			// 대분수
			mixedFractionText.setAttribute('id','fountainText_' + i);
			mixedFractionText.className = 'mixedFraction';
			mixedFractionText.setAttribute('style','position:absolute;top: 0px; left: 0px; font-size:50px;');
			mixedFractionText.innerHTML = gameManager.choiceQuestion[i][0];

			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = 'Text';
			imgObjText.setAttribute('style', 'position:absolute; top: -28px; left: 25px; width: 67px; font-size:50px;');
			imgObjText.innerHTML = gameManager.choiceQuestion[i][1];

			fountainText.setAttribute('id','fountainText_' + i);
			fountainText.className = 'fountain';
			fountainText.setAttribute('style','position:absolute; top: 28px; left: 25px; width:67px; font-size:50px;');
			fountainText.innerHTML = gameManager.choiceQuestion[i][2];

			fountainLine.setAttribute('id','fountainLine');
			fountainLine.className = 'fountainLine';
			fountainLine.innerHTML = '------';

			if(gameManager.choiceQuestion[i][2].toString().length === 1){
				
				fountainLine.setAttribute('style','position:absolute; top: 0px; left: 35px; letter-spacing:-8px');
				
				if(gameManager.choiceQuestion[i][0] === 0){
					choiceQuestionAllBox.setAttribute('style','position:absolute; top:0px; left:60px; width:120px; height:125px;');
				}else{
					choiceQuestionAllBox.appendChild(mixedFractionText); //대분수
					choiceQuestionAllBox.setAttribute('style','position:absolute; top:0px; left:75px; width:120px; height:125px;');
				}

			}else{
				
				fountainLine.setAttribute('style','position:absolute; top: 0px; left: 28px; letter-spacing:-5px');
			
				if(gameManager.choiceQuestion[i][0] === 0){
					choiceQuestionAllBox.setAttribute('style','position:absolute; top:0px; left:60px; width:120px; height:125px;');
				}else{
					choiceQuestionAllBox.appendChild(mixedFractionText); //대분수
					choiceQuestionAllBox.setAttribute('style','position:absolute; top:0px; left:65px; width:120px; height:125px;');
				}
			}

			choiceQuestionAllBox.appendChild(imgObjText);
			choiceQuestionAllBox.appendChild(fountainText);
			choiceQuestionAllBox.appendChild(fountainLine);

			currentQuestion.appendChild(choiceQuestionAllBox);
			appendImageElement('seeSawDapbox', 'images/seeSaw_dapbox.png', document.querySelector('#choiceQuestion_' + i));

		}

		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);

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


function puzzleCompareAnswer(dragObj, arrayNum) {
	
	dragObj.className += ' correct';

	for(i=0; i<1; i++){

		var correct = document.querySelectorAll('.correct'),
		dragObjChild = dragObj.childNodes[1],
		dragObjChildSrc = dragObjChild.src,
		dragObjChildSrcSplit = dragObjChildSrc.split('_'),
		butterflySuccess = document.querySelector('#butterflySuccess_'+ i),

		dragObjChild0 = dragObj.childNodes[0];
		dragObjChild.setAttribute('src',dragObjChildSrc.replace('butterfly.png','dapbox.png'));

		dragObj.style.top = '100px;';
		dragObj.style.pointerEvents = 'none';

		// log(parseInt(arrayNum));

		if(parseInt(arrayNum) === 2) {
			appendImageElement('seeSawRabbitHand', 'images/seeSaw_rabbit_hand.png',seeSawAllBox,'seeSawRabbitHand');
			seeSawRabbitHand.setAttribute('style','position:absolute; z-index:40; left:620px; top:-192px;');

		}else{
			appendImageElement('seeSawBearHand', 'images/seeSaw_bear_hand.png',seeSawAllBox,'seeSawBearHand');
			seeSawBearHand.setAttribute('style','position:absolute; z-index:40; left:54px; top:-157px;');
		} 

		log(dragObj);

		seeSawAllBox.appendChild(dragObj);
		
	}

	log(dragObjChild);

	if (correct.length === gameManager.CURRENT_ANSWER.length) {

		setTimeout(function() {
			for (var i = 0; i < correct.length; i++) {
				// correct[i].style.display = "none";
			}
			correctAnimation(dragObj);
			// question1.style.display = 'none';
			// question2.style.display = 'none';

			gameOver();
		}, 100);

	}

}


function correctAnimation(dragObj){
	var Top =  0,
	Left1 =  0,
	dragObjTop = 380,
	dragObjLeft = 85,
	dragObjpaddingLeft = parseInt(dragObj.style.paddingLeft),
	butterflySuccess = dragObj.childNodes[2],
	angle1 = -5;

	animate({
		delay : 100,
		duration : 500,
		delta : makeEaseInOut(linear),
		step : function(delta) {
			seeSawAllBox.setAttribute('style','margin-top :' + dragObjTop + 'px; margin-left:' + dragObjLeft + 'px; padding-left: ' + dragObjpaddingLeft+'px; position:absolute;');
			// butterflySuccess.setAttribute('style','position:absolute;');
			seeSawAllBox.style.top = ((Top * delta)) + 'px';
			seeSawAllBox.style.left = ((Left1 * delta)) + 'px';
			seeSawAllBox.style.WebkitTransform = 'rotate(' + (angle1) + 'deg)';
			seeSawAllBox.style.msTransform = 'rotate(' + (angle1) + 'deg)';
			seeSawAllBox.style.transform = 'rotate(' + (angle1) + 'deg)';
			// seeSawAllBox.style.pointerEvents = "none";
			if (angle1 < 5)
				angle1--;

		}
	});
}


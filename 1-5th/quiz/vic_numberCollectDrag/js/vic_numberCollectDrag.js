function initScene() {
	// log('initScene...');
	// log(gameManager.CURRENT_ANSWER);
	// log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject_1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('answerObject_2', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question2', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question3', 'circle', document.getElementById('bgCanvas'));

	appendCircleElement('division', 'circle', document.getElementById('bgCanvas'));

	setRand(1,6,2);

	appendImageElement('numcardBg', 'images/vic_numcard2_questionbox.png',division,'numcardBg');


	appendImageElement('butterfly_textbox', 'images/numpad_' + randResult[0] + '.png',question1,'butterfly_textbox');
	appendImageElement('butterfly_textbox', 'images/numpad_' + randResult[0] + '.png',question2,'butterfly_textbox');
	appendImageElement('butterfly_textbox', 'images/numpad_' + randResult[0] + '.png',question3,'butterfly_textbox');

	appendCircleElement('questiontxt1', 'circle', question1);
	appendCircleElement('questiontxt2', 'circle', question2);
	appendCircleElement('questiontxt3', 'circle', question3);

	var circleAnswer = document.querySelector('#answerObject_1');
	triangleAnswer = document.querySelector('#answerObject_2');

	var answerPosition,
	answer0 = gameManager.CURRENT_ANSWER[0],
	answer1 = gameManager.CURRENT_ANSWER[1];

	appendSelectQuestion('drag', gameManager.choiceQuestion, gameManager.hangerImgArray);

	circleAnswer.setAttribute('candleValue', gameManager.CURRENT_ANSWER[0]);
	triangleAnswer.setAttribute('candleValue', gameManager.CURRENT_ANSWER[1]);
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

function minority() {
	// appendCircleElement('startNum', 'Num', division);
	// appendCircleElement('endNum', 'Num', division);
	// appendCircleElement('divisiontxt', 'divisiontxt', division);

	// startNum.setAttribute('style','left: 350px;top: 130px;');
	// endNum.setAttribute('style','left: 480px;top: 130px;');
	// divisiontxt.setAttribute('style','position:absolute; left: 430px;top: 130px; font-size:60px;');

	// startNum.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	// endNum.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
	// divisiontxt.innerHTML = '÷';
}


function inithangerBar() {
	log('initpuzzle...');
	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	// cloud = document.createElement('img'),
	circleAnswer = document.querySelector('#answerObject_1'),
	triangleAnswer = document.querySelector('#answerObject_2');

	// appendImageElement('butterflyFlowerPink', 'images/butterfly_flower_pink.png',circleAnswer,'butterflyFlowerPink');
	// appendImageElement('butterflyFlowerBlue', 'images/butterfly_flower_blue.png',triangleAnswer,'butterflyFlowerBlue');

	circleAnswer.setAttribute('style','position:absolute; top:245px; left:430px; width:135px; height:135px;');
	triangleAnswer.setAttribute('style','position:absolute; top:376px; left:707px; width:135px; height:135px;');

	question1.setAttribute('style','position:absolute; top:114px; left:122px; width:202px; z-index:10;');
	question2.setAttribute('style','position:absolute; top:375px; left:122px; width:202px; z-index:10; font-size:50px;');
	question3.setAttribute('style','position:absolute; top:506px; left:397px; width:202px; z-index:10; font-size:50px;s');

	questiontxt1.setAttribute('style','position:absolute; top:-6px; left:0px; width:202px; font-size:50px; line-height:145px;');
	questiontxt2.setAttribute('style','position:absolute; top:-6px; left:0px; width:202px; font-size:50px; line-height:145px;');
	questiontxt3.setAttribute('style','position:absolute; top:-6px; left:0px; width:202px; font-size:50px; line-height:145px;');

	questiontxt1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	questiontxt2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
	questiontxt3.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[2];

	// question1.innerHTML = '몫';
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
	choiceLeft = 1100;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceTop = 240;
		break;
		case 2 :
		choiceTop = 112;
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

		// log(i + '뭐임?');
		// if(i === 1 || i === 3){
		// 	choiceLeft = 1150;
		// }else{
		// 	choiceLeft = 980;
		// }

		choiceTop = choiceTop + 160;

		currentQuestion.setAttribute('style', 'left: ' + choiceLeft + 'px; Top: ' + choiceTop + 'px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestionText[i];

			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			// currentQuestion.innerHTML = gameManager.choiceQuestion[i];
			appendCircleElement('choiceQuestionTxT_' + i, 'choiceQuestionTxT', currentQuestion);
			var choiceQuestionTxT = document.querySelector('#choiceQuestionTxT_' + i);
			choiceQuestionTxT.innerHTML = gameManager.choiceQuestion[i];
			//여기를 읽어욤...

			appendImageElement('butterfly', 'images/numpad_' + randResult[1] + '.png', document.querySelector('#choiceQuestion_' + i));

			var choiceQuestion = document.querySelector('#choiceQuestion_' + i);


			// log('이리오니?');
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
		// appendImageElement('butterflySuccess_'+ i, 'images/butterfly_butterfly_success_1.png',dragObj,'butterflySuccess');

		var correct = document.querySelectorAll('.correct'),
		dragObjChild = dragObj.childNodes[1],
		dragObjChildSrc = dragObjChild.src,
		dragObjChildSrcSplit = dragObjChildSrc.split('_'),
		butterflySuccess = document.querySelector('#butterflySuccess_'+ i),

		dragObjChild0 = dragObj.childNodes[0];
		// dragObjChild1 = dragObj.childNodes[1];
		dragObjChild.setAttribute('src',dragObjChildSrc.replace('butterfly.png','dapbox.png'));

		dragObjChild.setAttribute('style',' top:0px; left:0px;');
		dragObj.style.top = '100px;';
		dragObj.style.pointerEvents = 'none';

		// butterflySuccess.setAttribute('style','position:absolute; top:200px;');
		dragObjChild0.setAttribute('style','position:absolute; top:0px; left:0px; width:135px; height:135px; line-height:130px');

		// correctAnimation(dragObj);
	}

	log(dragObjChild);

	// log(dragObjChildSrcSplit[0]);

	if (correct.length === gameManager.CURRENT_ANSWER.length) {

		setTimeout(function() {
			for (var i = 0; i < correct.length; i++) {
				// correct[i].style.display = "none";
			}

			gameOver();
		}, 100);

	}

}


// function correctAnimation(dragObj){
// 	var Top =  -600,
// 	// Left0 =  150,
// 	Left1 =  -300,
// 	dragObjTop = parseInt(dragObj.style.top),
// 	dragObjLeft = parseInt(dragObj.style.left),
// 	dragObjpaddingLeft = parseInt(dragObj.style.paddingLeft),
// 	// queText1 = document.querySelector('#queText1'),
// 	// queBottom = parseInt(queText1.style.bottom),
// 	butterflySuccess = dragObj.childNodes[2],
// 	angle0 = 22,
// 	angle1 = -22;

// 	// queLeft = parseInt(queText1.style.left);


// 	var correctArray = ['images/butterfly_butterfly_success_1.png', 'images/butterfly_butterfly_success_2.png','images/butterfly_butterfly_success_3.png','images/butterfly_butterfly_success_4.png','images/butterfly_butterfly_success_5.png','images/butterfly_butterfly_success_4.png', 'images/butterfly_butterfly_success_3.png','images/butterfly_butterfly_success_2.png','images/butterfly_butterfly_success_1.png','images/butterfly_butterfly_success_2.png','images/butterfly_butterfly_success_3.png','images/butterfly_butterfly_success_4.png','images/butterfly_butterfly_success_1.png','images/butterfly_butterfly_success_1.png', 'images/butterfly_butterfly_success_2.png','images/butterfly_butterfly_success_3.png','images/butterfly_butterfly_success_4.png','images/butterfly_butterfly_success_5.png',];
// 	setTimeout(function(){
// 		spriteAnimation(correctArray, butterflySuccess);
// 		var bb = 1800;
// 		var index = 0;
// 		animate({
// 			delay : 100,
// 			duration : bb,
// 			delta : makeEaseInOut(linear),
// 			step : function(delta) {
// 				butterflySuccess.src = correctArray[index];
// 				index ++;
// 			}
// 		});
// 	},10);

// 	animate({
// 		delay : 00,
// 		duration : 1000,
// 		delta : makeEaseInOut(linear),
// 		step : function(delta) {
// 			// butterflySuccess.setAttribute('style','margin-top :' + dragObjTop + 'px; margin-left:' + dragObjLeft + 'px; padding-left: ' + dragObjpaddingLeft+'px; position:absolute;');
// 			butterflySuccess.setAttribute('style','position:absolute;');
// 			butterflySuccess.style.top = ((Top * delta)) + 'px';
// 			butterflySuccess.style.left = ((Left1 * delta)) + 'px';
// 			butterflySuccess.style.WebkitTransform = 'rotate(' + (angle1) + 'deg)';
// 			butterflySuccess.style.msTransform = 'rotate(' + (angle1) + 'deg)';
// 			butterflySuccess.style.transform = 'rotate(' + (angle1) + 'deg)';
// 			butterflySuccess.style.pointerEvents = "none";
// 		}
// 	});
// }


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

	appendCircleElement('robotBox', 'circle', document.getElementById('bgCanvas'));

	appendImageElement('robot', 'images/robot2_robot.png',robotBox,'robot');


	appendImageElement('divisionTaste', 'images/robot2_line.png',question1,'divisionTaste');


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
	appendCircleElement('startNum', 'Num', robotBox);
	appendCircleElement('center', 'Num', robotBox);
	appendCircleElement('endNum', 'Num', robotBox);
	if(gameManager.TOTAL_ANSWER_ARRAY[0].toString().length === 1){
		startNum.setAttribute('style','left: 280px;top: 380px; color:#fff;');
	}else{
		startNum.setAttribute('style','left: 260px;top: 380px; color:#fff;');
	}

	if(gameManager.TOTAL_ANSWER_ARRAY[1].toString().length === 1){
		endNum.setAttribute('style','left: 465px;top: 380px; color:#fff; letter-spacing:0px;');
	}else{
		endNum.setAttribute('style','left: 390px;top: 380px; color:#fff; letter-spacing:40px;');
	}
	startNum.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	endNum.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
	center.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[2];

	center.style.display = 'none';
}


function inithangerBar() {
	log('initpuzzle...');
	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),

	circleAnswer = document.querySelector('#answerObject_1'),
	triangleAnswer = document.querySelector('#answerObject_2'),
	robotMax;

	
	robotMax = Math.max.apply(null, gameManager.allImageArray).toString().length;

	

	if(robotMax === 1){
		appendImageElement('robot2Dapbox_2_1', 'images/robot2_dapbox_1.png',circleAnswer,'robot2Dapbox');
		circleAnswer.setAttribute('style','position:absolute; top:300px; left:495px; width:200px; height:230px;');
	}else{
		appendImageElement('robot2Dapbox_2_1', 'images/robot2_dapbox_2.png',circleAnswer,'robot2Dapbox');
		circleAnswer.setAttribute('style','position:absolute; top:300px; left:460px; width:200px; height:230px;');
	}


	if(robotMax === 1){
		appendImageElement('robot2Dapbox_2_2', 'images/robot2_dapbox_1.png',triangleAnswer,'robot2Dapbox');
		triangleAnswer.setAttribute('style','position:absolute; top:575px; left:495px; width:200px; height:230px;');
	}else{
		appendImageElement('robot2Dapbox_2_2', 'images/robot2_dapbox_2.png',triangleAnswer,'robot2Dapbox');
		triangleAnswer.setAttribute('style','position:absolute; top:575px; left:460px; width:200px; height:230px;');
	}
	

	question1.setAttribute('style','position:absolute; top:400px; left:450px; width:202px;');
	question2.setAttribute('style','position:absolute; top:560px; left:460px; width:175px; height:4px; background:#fff;');


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
	choiceLeft,
	robotMax;

	robotMax = Math.max.apply(null, gameManager.allImageArray).toString().length;

	if(robotMax === 1){
		choiceLeft = 1125;
	}else{
		choiceLeft = 1100;
	}


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

		// if(gameManager.choiceQuestion[i].toString().length === 1){
			// var choiceLeft = 1130;
		// }else{
			// var choiceLeft = 1100;
		// }

		log(robotMax);



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
			
			//여기를 읽어욤...

			

			var choiceQuestion = document.querySelector('#choiceQuestion_' + i);

			// log( +'뭐나옴 ');



			if(gameManager.choiceQuestion[i].toString().length === 1){
				choiceQuestionTxT.innerHTML = gameManager.choiceQuestion[i];
				
				if(robotMax === 1){
					appendImageElement('robotTXT', 'images/robot2_dapbox_1.png', document.querySelector('#choiceQuestion_' + i));
					choiceQuestionTxT.setAttribute('style','color:#ffd321; width:100px; font-size:55px; line-height:90px;');
				}else{
					appendImageElement('robotTXT', 'images/robot2_dapbox_2.png', document.querySelector('#choiceQuestion_' + i));
					choiceQuestionTxT.setAttribute('style','color:#ffd321; width:60px; font-size:55px; line-height:90px; padding-left:90px');
				}

				
			}else{
				choiceQuestionTxT.innerHTML = gameManager.choiceQuestion[i];

				if(robotMax === 1){
					appendImageElement('robotTXT', 'images/robot2_dapbox_1.png', document.querySelector('#choiceQuestion_' + i));
				}else{
					appendImageElement('robotTXT', 'images/robot2_dapbox_2.png', document.querySelector('#choiceQuestion_' + i));
				}
				
				choiceQuestionTxT.setAttribute('style','color:#ffd321; width:170px; font-size:55px; line-height:90px; letter-spacing:40px; padding-left:20px');
			}


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
		var correct = document.querySelectorAll('.correct'),
		robotTxT = dragObj.childNodes[0];
		robotBgNone = dragObj.childNodes[1],
		dragObjAnswervalue = dragObj.getAttribute('answervalue'),
		robotMax = Math.max.apply(null, gameManager.allImageArray).toString().length;

		// log(gameManager.TOTAL_ANSWER_ARRAY [dragObj + 3] + '응?');

		log(dragObj.getAttribute('answervalue') + '뭐나옴');
		log(dragObjAnswervalue);
		// log(dragObjAnswervalue + '무엇이 나올것이냐');

		log(robotMax);

		if(robotMax === 1){

			if(dragObjAnswervalue.toString().length === 1){
				robotTxT.setAttribute('style','color:#ffd321; width:100px; font-size:55px; line-height:90px; text-align:center; margin-left:50px;');
			}else{
				robotTxT.setAttribute('style','color:#ffd321; width:158px;font-size:55px; letter-spacing:39px; line-height:90px; padding-left:40px;');
			}

		}else{

			if(dragObjAnswervalue.toString().length === 1){
				robotTxT.setAttribute('style','color:#ffd321; width:60px;font-size:55px; letter-spacing:39px; line-height:90px; padding-left:120px;');
			}else{
				robotTxT.setAttribute('style','color:#ffd321; width:158px;font-size:55px; letter-spacing:39px; line-height:90px; padding-left:40px;');
			}


		}

		robotBgNone.style.display = 'none';
	}

	if (correct.length === gameManager.CURRENT_ANSWER.length) {

		setTimeout(function() {
			for (var i = 0; i < correct.length; i++) {
				// correct[i].style.display = "none";
			}
			var center = document.querySelector('#center');
			correctAnimation(dragObj);
			setTimeout(function(){
				if(gameManager.TOTAL_ANSWER_ARRAY[2].toString().length === 1){
					center.setAttribute('style','left: 465px;top: 455px; color:#fff; letter-spacing:0px; display:block');
				}else{
					center.setAttribute('style','left: 390px;top: 455px; color:#fff; letter-spacing:40px; display:block');
				}
			},100);
			gameOver();
		}, 100);

	}

}


function correctAnimation(dragObj){
	var Top =  -600,
	// Left0 =  150,
	Left1 =  -300,
	dragObjTop = parseInt(dragObj.style.top),
	dragObjLeft = parseInt(dragObj.style.left),
	dragObjpaddingLeft = parseInt(dragObj.style.paddingLeft),
	robot = document.querySelector('#robot'),
	angle0 = 22,
	angle1 = -22;

	var correctArray = ['images/robot2_success_1.png', 'images/robot2_success_1.png','images/robot2_success_2.png','images/robot2_success_3.png','images/robot2_success_4.png'];
	setTimeout(function(){
		spriteAnimation(correctArray, robot);
		var bb = 200;
		var index = 0;
		animate({
			delay : 100,
			duration : bb,
			delta : makeEaseInOut(linear),
			step : function(delta) {
				robot.src = correctArray[index];
				index ++;
			}
		});
	},10);
}


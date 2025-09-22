
function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
    // parent.window.initClockTimer();

	var mixed = gameManager.TOTAL_ANSWER_ARRAY[0][2],
		off = gameManager.TOTAL_ANSWER_ARRAY[0][1];
	if(mixed === 2 || mixed === 3 || mixed === 4){
		appendImageElement('box', 'images/fraction_bit_pizza_'+ mixed +'_'+ off+'.png', document.querySelector('#fraction_btiContainer'));
	}else if(mixed === 5 || mixed === 6 || mixed === 8){
		appendImageElement('box', 'images/fraction_bit_cake_'+ mixed +'_'+ off+'.png', document.querySelector('#fraction_btiContainer'));
	}else if(mixed === 9 || mixed === 10 || mixed === 12){
		appendImageElement('box', 'images/fraction_bit_pie_'+ mixed +'_'+ off+'.png', document.querySelector('#fraction_btiContainer'));
	}
    
    gameManager.choiceBgImgArray = ['images/fraction_dapbox.png','images/fraction_dapbox.png','images/fraction_dapbox.png'];
    appendSelectQuestion('click', gameManager.choiceQuestion,gameManager.choiceBgImgArray);

    creatNum();

}

function creatNum(){
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		appendCircleElement('lineTxt' ,'line', choiceQuestionContainer[i]);
		choiceQuestionContainer[i].childNodes[2].innerHTML = '----';
	}

	for (var a = 1; a < gameManager.TOTAL_ANSWER_ARRAY.length-1; a++) {
			appendCircleElement('coicetxt' + a,'coicetxt', document.querySelector('#choiceQuestionGroup_0'));
			var coicetxt = document.querySelector('#coicetxt' + a);
			coicetxt.innerHTML=gameManager.TOTAL_ANSWER_ARRAY[1][a-1];
			var answerValue = gameManager.TOTAL_ANSWER_ARRAY[1][a-1];
			coicetxt.setAttribute('answerValue',answerValue);
		}
	for (var b = 3; b < gameManager.TOTAL_ANSWER_ARRAY.length + 1; b++) {
			appendCircleElement('coicetxt' + b,'coicetxt', document.querySelector('#choiceQuestionGroup_1'));
			var coicetxt = document.querySelector('#coicetxt' + b);
			coicetxt.innerHTML=gameManager.TOTAL_ANSWER_ARRAY[2][b-3];
			var answerValue = gameManager.TOTAL_ANSWER_ARRAY[2][b-3];
			coicetxt.setAttribute('answerValue',answerValue);
		}
	for (var c = 6; c < gameManager.TOTAL_ANSWER_ARRAY.length + 4; c++) {
			appendCircleElement('coicetxt' + c,'coicetxt', document.querySelector('#choiceQuestionGroup_2'));
			var coicetxt = document.querySelector('#coicetxt' + c);
			coicetxt.innerHTML=gameManager.TOTAL_ANSWER_ARRAY[3][c-6];
			var answerValue = gameManager.TOTAL_ANSWER_ARRAY[3][c-6];
			coicetxt.setAttribute('answerValue',answerValue);
		}

    for(i = 0; i < 3; i++){
		zero1 = document.querySelector('#choiceQuestionContainer').childNodes[i].childNodes[3];
		zero1.innerHTML ='';
	}
}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceTop = 572;
	choiceLeft = 0;

	
	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceLeft = 240;
		break;
		case 2 :
		choiceLeft = 150;
		break;
		case 3 :
		choiceLeft = -55;
		break;
		case 4 :
		choiceLeft = -50;
		break;
		case 5 :
		choiceLeft = -150;
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
			choiceQuestionGroup.innerHTML = gameManager.choiceQuestionText[i];

			appendImageElement('choiceBg', imgSrcArray[i], choiceQuestionGroup);
			choiceQuestionGroup = document.querySelector('#choiceQuestionGroup_' + i);
			choiceQuestionGroup.className = 'rect';

			choiceLeft = choiceLeft + 320;

			choiceQuestionGroup.setAttribute('style', 'top:' + choiceTop + 'px;left: ' + choiceLeft + 'px;');

		} else {
			appendCircleElement('choiceQuestionGroup_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
		}
		
		choiceQuestionGroup.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);


		if (buttonType === 'drag') {
			new Dragdrop(choiceQuestionGroup);
			//여기를 읽어욤...
		} else {
			choiceQuestionGroup.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}



function gameOver (dragObj) {
		document.querySelector('#answerMark').setAttribute('style', 'display:block; z-index: 11; top:' + (dragObj.offsetTop + 26) + 'px; left:' + (dragObj.offsetLeft + 35) + 'px;');
		
		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[i].style.pointerEvents = "none";
		}

		streamSound.setSound('../../media/correct.mp3');

		logCounter.tryCounter();
		clearInterval(countTimer);
		logCounter.endTime();
		gameOverAnimation();

		// setTimeout(function () {
		// 	log('excute stampStarIcon!');
		//     parent.window.stampStarIcon();
		// }, 500);
		// // save log data 
		// setTimeout(function () {
		// 	log('excute insDrillHis!');
		//     parent.window.insDrillHis(logCounter.submitReport());
		// }, 2200);
}


function compareAnswer(dragObj) {
	var drag1 = dragObj.childNodes[4],
		drag2 = dragObj.childNodes[3];

		if (gameManager.CURRENT_ANSWER[0][2] === parseInt(dragObj.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[0][1] === parseInt(drag1.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[0][0] === parseInt(drag2.getAttribute('answerValue'))) {
		log('@ correct!!');
		gameOver(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}
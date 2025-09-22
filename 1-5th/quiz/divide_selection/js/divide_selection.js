function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
    // parent.window.initClockTimer();
	
	var figureArray = ['circle','poly','square','triangle'],
	randomColor = parseInt(Math.floor(Math.random() * 4));

		var answer0 = gameManager.TOTAL_ANSWER_ARRAY[0],
			answer1 = gameManager.TOTAL_ANSWER_ARRAY[1],
			answer2 = gameManager.TOTAL_ANSWER_ARRAY[2],
			answer3 = gameManager.TOTAL_ANSWER_ARRAY[3];

		setRand(1, 2, 2);
		switch(randomColor){
			case 0:
				gameManager.choiceBgImgArray = ['images/divide_select_' + figureArray[0] + '_' + answer1 +'_' + randResult[0] +'.png','images/divide_select_'+ figureArray[0] +'_' + answer2 +'_' + randResult[0] +'.png','images/divide_select_'+ figureArray[0] +'_' + answer3 +'_' + randResult[0] +'.png'];
			break;
			case 1:
				gameManager.choiceBgImgArray = ['images/divide_select_' + figureArray[1] + '_' + answer1 +'_' + randResult[0] +'.png','images/divide_select_'+ figureArray[1] +'_' + answer2 +'_' + randResult[0] +'.png','images/divide_select_'+ figureArray[1] +'_' + answer3 +'_' + randResult[0] +'.png'];
			break;
			case 2:
				gameManager.choiceBgImgArray = ['images/divide_select_' + figureArray[2] + '_' + answer1 +'_' + randResult[0] +'.png','images/divide_select_'+ figureArray[2] +'_' + answer2 +'_' + randResult[0] +'.png','images/divide_select_'+ figureArray[2] +'_' + answer3 +'_' + randResult[0] +'.png'];
			break;
			case 3:
				gameManager.choiceBgImgArray = ['images/divide_select_' + figureArray[3] + '_' + answer1 +'_' + randResult[0] +'.png','images/divide_select_'+ figureArray[3] +'_' + answer2 +'_' + randResult[0] +'.png','images/divide_select_'+ figureArray[3] +'_' + answer3 +'_' + randResult[0] +'.png'];
			break;
		}

    appendSelectQuestion('click', gameManager.choiceQuestion,gameManager.choiceBgImgArray);

	appendCircleElement('questionBox','questiontxt',document.querySelector('#figureContainer'));
	appendCircleElement('questiontxt1','questiontxt',document.querySelector('#questionBox'));
	appendCircleElement('grayBox','grayBox',document.querySelector('#questionBox'));
	appendCircleElement('questiontxt2','questiontxt',document.querySelector('#questionBox'));

	questiontxt1.innerHTML = '똑같이';
	grayBox.innerHTML = answer0;
	questiontxt2.innerHTML ='으로 나눈 것은?';
	
		
	if(answer0 === '둘'){
		questiontxt2.innerHTML ='로 나눈 것은?';
		questiontxt1.setAttribute('style','left: 78px;');
		grayBox.setAttribute('style','left: 243px; color: #ff3b3b;');
		questiontxt2.setAttribute('style','right: 69px;');
	}else if(answer0 === '여섯'){
		questiontxt1.setAttribute('style','left: 32px;');
		grayBox.setAttribute('style','left: 190px; color: #ff3b3b;');
		questiontxt2.setAttribute('style','right: 28px;');
	}else{
		questiontxt1.setAttribute('style','left: 54px;');
		grayBox.setAttribute('style','left: 212px; color: #ff3b3b;');
		questiontxt2.setAttribute('style','right: 52px;');
		
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


function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceTop = 330;
	choiceLeft = -250;
	
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

			appendImageElement('choiceBg', imgSrcArray[i], choiceQuestionGroup);
			choiceQuestionGroup = document.querySelector('#choiceQuestionGroup_' + i);
			choiceQuestionGroup.className = 'rect';

			choiceLeft = choiceLeft + 380;

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
		document.querySelector('#answerMark').setAttribute('style', 'display:block; z-index: 11; top:' + (dragObj.offsetTop + 75) + 'px; left:' + (dragObj.offsetLeft + 65) + 'px;');
		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[i].style.pointerEvents = "none";
		}

		logCounter.tryCounter();
		clearInterval(countTimer);
		logCounter.endTime();
		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');
		setTimeout(function () 
			log('excute stampStarIcon!');
		    parent.window.stampStarIcon();
		}, 500);
		// // save log data 
		setTimeout(function () {
			log('excute insDrillHis!');
		    parent.window.insDrillHis(logCounter.submitReport());
		}, 2200);
}

function compareAnswer(dragObj) {
		if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))) {
		log('@ correct!!');
		gameOver(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}

function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
    // parent.window.initClockTimer();
    

    appendCircleElement('answerText','answerText', bgCanvas);
    answerText.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length-1] + '로 나타내면?';
    appendImageElement('pierrotboxBg', 'images/pierrotbox_textbox.png', answerText);
	

    appendCircleElement('lineTxt' ,'line', document.querySelector('#queTxt'));
    lineTxt.innerHTML ='----';
    lineTxt.setAttribute('style','left: -2px; top: 5px');

    appendImageElement('answerObject', 'images/pierrotbox_hand_question.png', document.querySelector('#pierrotboxContainer'), 'AnswerBg');
    for(var que = 0; que < 3; que++){
    	appendCircleElement('queText' + que,'queText', document.querySelector('#queTxt'));
		var queText = document.querySelector('#queText' + que);
		queText.setAttribute('answerValue',gameManager.TOTAL_ANSWER_ARRAY[0][que])
		queText.innerHTML=gameManager.TOTAL_ANSWER_ARRAY[0][que];
	}

    setRand(1, 3, 3);
    appendImageElement('box', 'images/pierrotbox_box_' + randResult[0] +'.png', document.querySelector('#pierrotboxContainer'));
    gameManager.choiceBgImgArray = ['images/pierrotbox_hand_' + randResult[0] + '.png', 'images/pierrotbox_hand_' + randResult[0] + '.png', 'images/pierrotbox_hand_' + randResult[0] + '.png'];
    appendSelectQuestion('drag', gameManager.choiceQuestion, gameManager.choiceBgImgArray);

     var circleAnswer = document.querySelector('#answerObject');
    circleAnswer.setAttribute('style', 'z-index: -1; position: absolute; top: 394px; left: 487px;');

    creatNum();
    NumPosition();
   

}

function NumPosition(){
	 for(var i = 0; i <4; i++){
    	var queTxt = document.querySelector('#queTxt'),
    	txtvalue = queTxt.childNodes[1].getAttribute('answerValue');
    	if(txtvalue === '0'){
    		queTxt.childNodes[1].innerHTML = '';
    	}else{
    		queTxt.childNodes[0].setAttribute('style','top: 5px; left: 9px');
    		queTxt.childNodes[2].setAttribute('style','left: 10px');
    		queTxt.childNodes[3].setAttribute('style','left: 10px');
    	}
    }

    for(i = 0; i < 3; i++){
		var zero1 = gameManager.TOTAL_ANSWER_ARRAY[i+1][0],
		mixed = document.querySelector('#choiceQuestionContainer').childNodes[i].childNodes[3],
		mixed1 = document.querySelector('#choiceQuestionContainer').childNodes[i].childNodes[4];
		mixed2 = document.querySelector('#choiceQuestionContainer').childNodes[i].childNodes[2];
		mixed0Top = parseInt(document.querySelector('#choiceQuestionContainer').childNodes[i].style.top);
		mixed0Left = parseInt(document.querySelector('#choiceQuestionContainer').childNodes[i].style.left);
		mixed0 = document.querySelector('#choiceQuestionContainer').childNodes[i];

		if(zero1 === 0){
				mixed.innerHTML ='';
		}else{
			mixed.setAttribute('style','left: 7px;');
			mixed1.setAttribute('style','left: 7px;');
			mixed0.setAttribute('style','top:' + mixed0Top +'px; left:' + mixed0Left +'px; padding-left: 7px;');
			mixed2.setAttribute('style','margin-left: 6px;');
		}
	}

}

function creatNum(){
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		appendCircleElement('lineTxt' ,'line', choiceQuestionContainer[i]);
		choiceQuestionContainer[i].childNodes[2].innerHTML = '----';
	}

	for (var a = 1; a < gameManager.TOTAL_ANSWER_ARRAY.length-2; a++) {
			appendCircleElement('coicetxt' + a,'coicetxt', document.querySelector('#choiceQuestionGroup_0'));
			var coicetxt = document.querySelector('#coicetxt' + a);
			coicetxt.innerHTML=gameManager.TOTAL_ANSWER_ARRAY[1][a-1];
			var answerValue = gameManager.TOTAL_ANSWER_ARRAY[1][a-1];
			coicetxt.setAttribute('answerValue',answerValue);
		}
	for (var b = 3; b < gameManager.TOTAL_ANSWER_ARRAY.length + 0; b++) {
			appendCircleElement('coicetxt' + b,'coicetxt', document.querySelector('#choiceQuestionGroup_1'));
			var coicetxt = document.querySelector('#coicetxt' + b);
			coicetxt.innerHTML=gameManager.TOTAL_ANSWER_ARRAY[2][b-3];
			var answerValue = gameManager.TOTAL_ANSWER_ARRAY[2][b-3];
			coicetxt.setAttribute('answerValue',answerValue);
		}
	for (var c = 6; c < gameManager.TOTAL_ANSWER_ARRAY.length + 3; c++) {
			appendCircleElement('coicetxt' + c,'coicetxt', document.querySelector('#choiceQuestionGroup_2'));
			var coicetxt = document.querySelector('#coicetxt' + c);
			coicetxt.innerHTML=gameManager.TOTAL_ANSWER_ARRAY[3][c-6];
			var answerValue = gameManager.TOTAL_ANSWER_ARRAY[3][c-6];
			coicetxt.setAttribute('answerValue',answerValue);
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
	choiceTop = -160;
	choiceLeft = 1046;

	
	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceLeft = 240;
		break;
		case 2 :
		choiceLeft = 150;
		break;
		case 3 :
		choiceLeft = 1041;
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

			var imgIndex = parseInt(Math.random() * 3);
			appendImageElement('choiceBg', imgSrcArray[i], choiceQuestionGroup);
			choiceQuestionGroup = document.querySelector('#choiceQuestionGroup_' + i);
			choiceQuestionGroup.className = 'rect';

			choiceTop = choiceTop + 230;

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
		
		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[i].style.pointerEvents = "none";
		}
		correctMotion();
		streamSound.setSound('media/pierrotbox_success.mp3');

		setTimeout(function(){
			gameOverAnimation();
			logCounter.tryCounter();
			clearInterval(countTimer);
			logCounter.endTime();
		},450);

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



function correctMotion() {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
		answerObject = document.querySelector('#answerObject'),
		ObjSrc = answerObject.src;

		var box = document.querySelector('#box'),
		objSrc = box.src;
		aa = objSrc.replace('.png','');
		aa = aa.split('_');
		aa = aa.splice(-1);

		correctArray2 = ['images/pierrotbox_box_' + aa + '_1.png','images/pierrotbox_box_' + aa + '_2.png','images/pierrotbox_box_' + aa + '_3.png','images/pierrotbox_box_' + aa + '_4.png'];

		spriteAnimation(correctArray2, box);

		
	
}

function spriteAnimation(spriteArray, spriteObj) {

	var index = 0;
	animate({
		delay : 80,
		duration : 180,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}


function compareAnswer(dragObj) {
	var drag1 = dragObj.childNodes[4],
		drag2 = dragObj.childNodes[3];

		if (gameManager.CURRENT_ANSWER[0][2] === parseInt(dragObj.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[0][1] === parseInt(drag1.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[0][0] === parseInt(drag2.getAttribute('answerValue'))) {
		//getAttribute = 요소의 클래스 속성의 값을 가져옴
		//parseInt = 문자열을 구문 분석하고 정수를 반환합니다.
		log('@ correct!!');
		gameOver(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}
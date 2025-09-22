
function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
     // parent.window.initClockTimer();

     appendCircleElement('questionBox','questiontxt',bgCanvas);
     questionBox.innerHTML = '두 수의 차';

     appendCircleElement('stickWrap','Sticks',bgCanvas);
     appendCircleElement('redStick','red',stickWrap);
     appendCircleElement('greenStick','green',stickWrap);

     appendChoiceQuestion('click', gameManager.choiceQuestion,gameManager.choiceBgImgArray);

 }
 function creatStick(){
 	var stickWrap = document.querySelector('#stickWrap'),
 	redStick = document.querySelector('#redStick'),
 	greenStick = document.querySelector('#greenStick');

 	appendCircleElement('wood_red','wood',redStick);
 	appendCircleElement('wood_green','wood',greenStick);


 	var redStickNum = gameManager.TOTAL_ANSWER_ARRAY[0],
 	greenStickNum = gameManager.TOTAL_ANSWER_ARRAY[1];

 	wood_red.innerHTML = redStickNum;
 	wood_green.innerHTML = greenStickNum;

 	for(var re = 0; re < redStickNum; re++){
 		if((re % 2) === 0){
 			appendImageElement('red','images/vic_numstick_stick_red1.png', redStick);
 		}else{
 			appendImageElement('red','images/vic_numstick_stick_red2.png', redStick);
 		}
 	}

 	for(var gr = 0; gr < greenStickNum; gr++){
 		if((gr % 2) === 0){
 			appendImageElement('green','images/vic_numstick_stick_green1.png', greenStick);
 		}else{
 			appendImageElement('green','images/vic_numstick_stick_green2.png', greenStick);
 		}
 	}

 	greenStick.setAttribute('style','padding-top: 50px;');

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


function gameOver (dragObj) {
	document.querySelector('#answerMark').setAttribute('style', 'display:block; z-index: 11; top:' + (dragObj.offsetTop + 20) + 'px; left:' + (dragObj.offsetLeft + 10) + 'px;');

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	correctMotion();

	logCounter.tryCounter();
	clearInterval(countTimer);
	logCounter.endTime();
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');
	setTimeout(function () {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);
		// save log data 
		setTimeout(function () {
			log('excute insDrillHis!');
			parent.window.insDrillHis(logCounter.submitReport());
		}, 2200);
	}

function correctMotion() {
	var redStick = document.querySelector('#redStick'),
		greenStick = document.querySelector('#greenStick');
		redChild = redStick.childNodes.length-1,
		greenChild = greenStick.childNodes.length-1;

		if(redChild < greenChild){
			greenStick.childNodes[redChild+1].style.marginLeft = '30px';
		}else{
			redStick.childNodes[greenChild+1].style.marginLeft = '30px';
		}

}


function compareAnswer(dragObj) {
	if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))) {
		log('@ correct!!');
		gameOver(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}


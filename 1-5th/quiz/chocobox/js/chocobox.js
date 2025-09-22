
function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
     // parent.window.initClockTimer();

    appendSelectQuestion('click', gameManager.choiceQuestion,gameManager.choiceBgImgArray);
    creatNum();

	appendCircleElement('questionBox','questiontxt',document.querySelector('#ChocoContainer'));
	appendCircleElement('questiontxt1','questiontxt',document.querySelector('#questionBox'));
	appendCircleElement('grayBox','grayBox',document.querySelector('#questionBox'));
	appendCircleElement('questiontxt2','questiontxt',document.querySelector('#questionBox'));
	
	var josaCompareNum= parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]);
	
	if (josaCompareNum === 1 || josaCompareNum === 3 || josaCompareNum === 6 || josaCompareNum === 7 || josaCompareNum === 8 || josaCompareNum === 10 || josaCompareNum === 11) {
		questiontxt1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0] + '은 ' + gameManager.TOTAL_ANSWER_ARRAY[1] + '의';
	} else {
		questiontxt1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0] + '는 ' + gameManager.TOTAL_ANSWER_ARRAY[1] + '의';
	}

	
	
	questiontxt2.innerHTML ='입니다.';
	appendCircleElement('ans2','line', grayBox);
	ans2.setAttribute('style','left: 0px; top: 0px');
	ans2.innerHTML = '?';


	var a1 = escape(gameManager.TOTAL_ANSWER_ARRAY[0]),
		a2 = escape(gameManager.TOTAL_ANSWER_ARRAY[1]);
	if(a1.length === 2 && a2.length === 2){
		questiontxt1.setAttribute('style','left: 86px;');
		questiontxt2.setAttribute('style','right: 95px;');
		grayBox.setAttribute('style','left: 342px;');
	}else if(a1.length === 1 && a2.length === 2 || a2.length === 1 && a1.length === 2){
		questiontxt1.setAttribute('style','left: 100px;');
		questiontxt2.setAttribute('style','right: 104px;');
		grayBox.setAttribute('style','left: 333px;');
	}else if(a1.length === 1 && a2.length === 1){
		questiontxt1.setAttribute('style','left: 121px;');
		questiontxt2.setAttribute('style','right: 125px;');
		grayBox.setAttribute('style','left: 311px;');
	}
	
	for(var i = 2; i < 5; i++){
		var b1 = escape(gameManager.TOTAL_ANSWER_ARRAY[i][1]).length,
			b2 = escape(gameManager.TOTAL_ANSWER_ARRAY[i][2]).length,
			lineTxt = document.querySelector('#lineTxt');

		if(b1 == 2 || b2 == 2 ){
			lineTxt.innerHTML = '-----';
		}
	}


}
function creatChoco(){
	appendCircleElement('ChocoBoxGroup','box',document.querySelector('#ChocoContainer'));
	for(var chocoNum = 1; chocoNum < gameManager.TOTAL_ANSWER_ARRAY[1]+1; chocoNum++){
	appendCircleElement('ChocoBox_'+ chocoNum,'ChocoBox',document.querySelector('#ChocoBoxGroup'));
	var chocoBox = document.querySelector('#ChocoBox_' + chocoNum);
	chocoBox.innerHTML = chocoNum;
	}

	randomChoco = Math.floor(3 * Math.random());
	var chocoImg = ['images/chocobox_choco_'+randomChoco+'.png'];

	appendCircleElement('ChocoGroup','box',document.querySelector('#ChocoContainer'));
	for(var choco = 1; choco < gameManager.TOTAL_ANSWER_ARRAY[0]+1; choco++){
	appendImageElement('choco',chocoImg, document.querySelector('#ChocoGroup'));
	}

	var ChocoGroup = document.querySelector('#ChocoGroup');
	for(var a = 0; a < ChocoGroup.childNodes.length ; a ++){
		var Chocos = ChocoGroup.childNodes[a];

		btnDown = function(e) {
			e.preventDefault();
			streamSound.setSound('media/balloon01.mp3');
		}
		btnUp = function(e) {
			
		}

		Chocos.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
		Chocos.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);
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
			coicetxt.innerHTML=gameManager.TOTAL_ANSWER_ARRAY[2][a-1];
			
			
			var answerValue = gameManager.TOTAL_ANSWER_ARRAY[2][a-1];
			coicetxt.setAttribute('answerValue',answerValue);
		}
	for (var b = 3; b < gameManager.TOTAL_ANSWER_ARRAY.length + 0; b++) {
			appendCircleElement('coicetxt' + b,'coicetxt', document.querySelector('#choiceQuestionGroup_1'));
			var coicetxt = document.querySelector('#coicetxt' + b);
			coicetxt.innerHTML=gameManager.TOTAL_ANSWER_ARRAY[3][b-3];
			var answerValue = gameManager.TOTAL_ANSWER_ARRAY[3][b-3];
			coicetxt.setAttribute('answerValue',answerValue);
		}
	for (var c = 6; c < gameManager.TOTAL_ANSWER_ARRAY.length + 3; c++) {
			appendCircleElement('coicetxt' + c,'coicetxt', document.querySelector('#choiceQuestionGroup_2'));
			var coicetxt = document.querySelector('#coicetxt' + c);
			coicetxt.innerHTML=gameManager.TOTAL_ANSWER_ARRAY[4][c-6];
			var answerValue = gameManager.TOTAL_ANSWER_ARRAY[4][c-6];
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
	choiceTop = 580;
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
		document.querySelector('#answerMark').setAttribute('style', 'display:block; z-index: 11; top:' + (dragObj.offsetTop + 32) + 'px; left:' + (dragObj.offsetLeft + 25) + 'px;');
		
		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[i].style.pointerEvents = "none";
		}
		
		var ChocoGroup = document.querySelector('#ChocoGroup').childNodes;
		for (var i = 0; i < ChocoGroup.length; i++) {
			ChocoGroup[i].style.pointerEvents = "none";
		}
		

		var grayBox = document.querySelector('#grayBox'),
		ans2 = document.querySelector('#ans2');
		appendCircleElement('ans1','txt', grayBox);
		// appendCircleElement('ans2','line', grayBox);
		appendCircleElement('ans3','txt', grayBox);


		ans1.innerHTML = gameManager.CURRENT_ANSWER[0][1];
		ans2.innerHTML = '----';
		ans3.innerHTML = gameManager.CURRENT_ANSWER[0][2];

		ans1.setAttribute('style','top: -29px');
		ans3.setAttribute('style','top: 30px');


		logCounter.tryCounter();
		clearInterval(countTimer);
		logCounter.endTime();
		gameOverAnimation();
		correctSound();
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

function correctSound(){
	streamSound.setSound('../../media/correct.mp3');	
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


function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('question1', 'question_box', document.getElementById('bgCanvas'));
	appendCircleElement('question2', 'question_box', document.getElementById('bgCanvas'));

	appendCircleElement('line1', 'txt', document.getElementById('question1'));
	appendCircleElement('line2', 'txt', document.getElementById('question2'));

	line1.innerHTML='----';
	line2.innerHTML='----';

	appendChoiceQuestion('click', gameManager.choiceQuestion, gameManager.choiceQuestionImg);

	var answer1_1 = escape(gameManager.TOTAL_ANSWER_ARRAY[0]).length,
		answer1_2 = escape(gameManager.TOTAL_ANSWER_ARRAY[1]).length,
		answer2_1 = escape(gameManager.TOTAL_ANSWER_ARRAY[2]).length,
		answer2_2 = escape(gameManager.TOTAL_ANSWER_ARRAY[3]).length;
	if(answer1_1 == 2 || answer1_2 == 2){
		line1.innerHTML='-----';
	}
	if(answer2_1 == 2 || answer2_2 == 2){
		line2.innerHTML='-----';
	}

}

function initMolecules(num, num2) {
	log('initMolecules...');
	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	    Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	    Num3 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[2]),
	    Num4 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[3]),
	    Question1 = document.querySelector('#question1'),
	    Question2 = document.querySelector('#question2');

	Question1.setAttribute('style', 'top:74px; left: 150px;');
	Question2.setAttribute('style', 'top:74px; left: 799px;');

	var a1 = gameManager.TOTAL_ANSWER_ARRAY[1],
	a3 = gameManager.TOTAL_ANSWER_ARRAY[3];

	if(a1 % 2 === 0 && a3 % 2 === 0){
		subStringNumber(Num1, Num2, Question1);
		subStringNumber(Num3, Num4, Question2);

		var a1 = document.querySelector('#question1').childNodes[1];
			a2 = document.querySelector('#question1').childNodes[2];
			b1 = document.querySelector('#question2').childNodes[1];
			b2 = document.querySelector('#question2').childNodes[2];
		a1.setAttribute('style','margin-left: 11px; margin-top: 24px;');
		a2.setAttribute('style','margin-left: 11px; margin-top: 24px;');
		b1.setAttribute('style','margin-left: 11px; margin-top: 24px;');
		b2.setAttribute('style','margin-left: 11px; margin-top: 24px;');

	}else if(a1 % 2 === 1 && a3 % 2 === 1){
		appendImageElement('molecule','images/fraction_compare_pie_' + Num2 + '_' + Num1 + '.png', document.querySelector('#question1'));
		appendImageElement('molecule','images/fraction_compare_pie_' + Num4 + '_' + Num3 + '.png', document.querySelector('#question2'));

		var question1 = document.querySelector('#question1').childNodes[1],
		question2 = document.querySelector('#question2').childNodes[1];
		question1.setAttribute('style','position: absolute; top: 40px; left: 49px;');
		question2.setAttribute('style','position: absolute; top: 40px; left: 49px;');

	}
	appendCircleElement('QTxt1','txt', Question1);
	appendCircleElement('QTxt2','txt', Question1);
	appendCircleElement('QTxt3','txt', Question2);
	appendCircleElement('QTxt4','txt', Question2);
	QTxt1.innerHTML = Num1;
	QTxt2.innerHTML = Num2;
	QTxt3.innerHTML = Num3;
	QTxt4.innerHTML = Num4;



}

function gameOver(dragObj) {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	dragObjID = dragObj.id.split('_'),
	dragImg_0 = document.querySelector('#choiceQuestionGroup_0').childNodes[0];
	dragImg_1 = document.querySelector('#choiceQuestionGroup_1').childNodes[0];
	dragObjselect = dragObj;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	streamSound.setSound('../../media/correct.mp3');
	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();

	if(dragObjID[1] === '0'){
		dragObjselect.childNodes[0].src = 'images/comparehover_'+ dragObjID[1] +'.png';
		dragImg_1.src = 'images/comparenone_1.png';
	}else{
		dragObjselect.childNodes[0].src = 'images/comparehover_'+ dragObjID[1] +'.png';
		dragImg_0.src = 'images/comparenone_0.png';
	}
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);
}

function subStringNumber(num, num2, numContainer) {
	var num = num,
		num2 = num2,
	    numContainer = numContainer.id,
	    molecule;

	var a1 = gameManager.TOTAL_ANSWER_ARRAY[1],
	a3 = gameManager.TOTAL_ANSWER_ARRAY[3];


	if(a1 % 2 === 0 && a3 % 2 === 0){
		off = 'images/fraction_compare_choco_off.png';
		on = 'images/fraction_compare_choco.png';
		molecule = document.createElement('div');
		molecule.setAttribute('id','molecule');
		denominator = document.createElement('div');
		denominator.setAttribute('id','denominator');

		for (var i = 0; i < num; i++) {
			var on;
			createObject(i, on, numContainer, molecule);
		}

		for (var i = 0; i < num2; i++) {
			var off;
			createObject(i, off, numContainer, denominator);
		}
	}

}


function compareCompareAnswer(dragObj) {
	log(dragObj.getAttribute('answerValue'));

	if (gameManager.CURRENT_ANSWER[0] === dragObj.getAttribute('answerValue')) {

		log('@ correct!!');
		gameOver(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}


function createObject(index, parentObjSrc, numContainer, smallContainer) {
	var parentObj = document.createElement('img'),
	    numContainer =
	    numContainer;

	parentObj.src = parentObjSrc;
	parentObj.className = "molecules";

	if (smallContainer) {
		parentObj.className = "molecules";
		smallContainer.appendChild(parentObj);
		document.getElementById(numContainer).appendChild(smallContainer);
	} else {
		document.getElementById(numContainer).appendChild(parentObj);
	}
}


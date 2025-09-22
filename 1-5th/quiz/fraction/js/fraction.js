function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('numberPanel', 'numberPanel', document.querySelector('#question1'));
	appendCircleElement('small00', 'small00', document.querySelector('#numberPanel'));
	appendCircleElement('small01', 'small01', document.querySelector('#numberPanel'));
	appendCircleElement('small02', 'small02', document.querySelector('#numberPanel'));
	appendCircleElement('small03', 'small03', document.querySelector('#numberPanel'));
	appendImageElement('smallFinal', '../../images/num_panel_fountain.png', document.querySelector('#numberPanel'),'smallFinal');

	appendChoiceQuestion('click', gameManager.choiceQuestion);

}


function initFruitsBox() {
	var Num2 = parseInt(gameManager.number) + 1,
	questText1 = document.createElement('div'),
	questText2 = document.createElement('div'),
	// multiplication = document.createElement('div');
	Question1 = document.querySelector('#question1'),
	store = document.querySelector('#store');

	questText1.setAttribute('id','questText1');
	questText2.setAttribute('id','questText2');
	// multiplication.setAttribute('id','multiplication');
	questText1.className = 'txt';
	questText2.className = 'txt';
	// multiplication.className = 'txt';

	store.appendChild(questText1);
	store.appendChild(questText2);
	// store.appendChild(multiplication);

	// questText1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	// questText2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];

	createfruits(Num2, Question1);
}

function createfruits(num, numContainer, eventCallback) {
	var	Num1 = parseInt(gameManager.number),
	numContainer = numContainer.id;
	
	fruitsArray = ['apple','orange','wmelon'];

	var fruitsRandom = parseInt(Math.random() * 3),
	fractCake;
	

	switch (fruitsRandom){
		case 0 :
		fruitsRandom = fruitsArray[0];
		break;
		case 1 :
		fruitsRandom = fruitsArray[1];
		break;
		case 2 :
		fruitsRandom = fruitsArray[2];
		break;
	}


	if(gameManager.circleImg_TYPE < 5){
		fractCake = 'pizza'
	}else if(gameManager.circleImg_TYPE >= 5 && gameManager.circleImg_TYPE <= 8){
		fractCake = 'cake';
	}else if(gameManager.circleImg_TYPE >= 9 && gameManager.circleImg_TYPE <= 12){
		fractCake = 'pie';
	}


	fruits = 'images/fraction_' + fractCake + '.png';

	for (var i = 0; i < num; i++) {
		var right = 12,
		fruits;
		
		eventCallback = function() {
			arguments[0].preventDefault();
			feedBackAnimation(this,fruitsRandom, function() {
			});
		};
		createObject(i, right, fruits, numContainer, eventCallback);
	}

	var parentObjLast = document.querySelector('#parentObj_' + parseInt(gameManager.number));
	parentObjLastSrc = parentObjLast.src;
	// parentObjLastSrcSplit = 
	log(parentObjLastSrc.split('_'));
	// parentObjLastReplace = parentObjLastSrc.replace('.png','_cake_' + gameManager.circleImg_TYPE + '_' + gameManager.circleImg + '.png');

	parentObjLast.setAttribute('src',parentObjLastSrc.replace(fractCake + '.png',fractCake + '_' + gameManager.circleImg_TYPE + '_' + gameManager.circleImg + '.png'));

	

}


function gameOver(currentObj) {
	document.querySelector('#answerMark').setAttribute('style', 'display:block; top:' + (currentObj.offsetTop + 30) + 'px; left:' + (currentObj.offsetLeft + 40) + 'px;');

	streamSound.setSound('../../media/correct.mp3');
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
	question1 = document.querySelector('#question1');

	question1.style.pointerEvents = 'none';

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}



	
	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	gameOverAnimation();

}



function createObject(index, left, parentObjSrc, numContainer,eventCallback, callback) {
	var parentObj = document.createElement('img'),
	ObjBox = document.querySelector('#question1'),
	parentObjAll,
	numContainer;

	parentObj.src = parentObjSrc;

	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObj.className = "fruit";	

	parentObj.setAttribute('style', 'padding-top: 10px;');
	ObjBox.setAttribute('style', 'margin-top: 150px;');

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	parentObj.addEventListener(gameManager.eventSelector.upEvent, function() {
		document.querySelector('#numberPanel').setAttribute('style', 'display:none;');
	}, false);


	document.getElementById('question1').appendChild(parentObj);
}

function feedBackAnimation(parentObj, parentObjSrc, callback) {

	var objId = parentObj.id.split('_'),
	numberPanel = document.querySelector('#numberPanel'),
	small00 = document.querySelector('#small00'),
	small01 = document.querySelector('#small01'),
	small02 = document.querySelector('#small02'),
	small03 = document.querySelector('#small03'),
	smallFinal = document.querySelector('#smallFinal');

	gameManager.selectedQuestion.push(objId[1]);

	numberPanelSrc = numberPanel.src;

	// log(numberPanel);

	for(var i = 0; i < gameManager.circleImg_TYPE+1; i++){

		var parentObjAllSelect = document.querySelectorAll('#parentObj_'+ i); 

		numberPanel.setAttribute('style', 'display:block; top:' + (parentObj.offsetTop + -30) + 'px; left:' + (parentObj.offsetLeft + 83) + 'px;');
	}

	var smallNumBox = document.createElement('div');

	log(numberPanelSrc);

	if(parseInt(objId[1]) === gameManager.number){

		small01.innerHTML = gameManager.circleImg;
		small02.innerHTML = '----';
		small03.innerHTML = gameManager.circleImg_TYPE;

		small00.style.display = 'none';
		small01.style.display = 'block';
		small02.style.display = 'block';
		small03.style.display = 'block';

		numberPanel.setAttribute('style', 'display:block; top:' + (parentObj.offsetTop + -50) + 'px; left:' + (parentObj.offsetLeft + 83) + 'px; background:none;');
		small01.setAttribute('style','position:absolute; top:-10px; letter-spacing:-4px; left:0px; width:52px;');
		small02.setAttribute('style','position:absolute; top:6px; letter-spacing:-4px; left:0px; width:52px;' );
		small03.setAttribute('style','position:absolute; top:20px; letter-spacing:-4px; left:0px; width:52px; text-align:center');

		smallFinal.setAttribute('style','position:absolute; top:-10px; letter-spacing:-4px; left:0px; z-index:-10; display:block;');

	}else{
		small00.innerHTML = 1;
		small01.style.display = 'none';
		small02.style.display = 'none';
		small03.style.display = 'none';
		small00.style.display = 'block';
		smallFinal.setAttribute('style','display:none;');
	}

	streamSound.setSound('media/balloon01.mp3');
	setTimeout(function() {
		callback();

	}, 200);
}


function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceLeft = 0,
	choiceTop = 580;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceLeft = 240;
		break;
		case 2 :
		choiceLeft = 150;
		break;
		case 3 :
		choiceLeft = -65;
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

			appendImageElement('choiceQuestion_' + i, imgSrcArray[0], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
		}

		choiceLeft = choiceLeft + 320;

		currentQuestion.setAttribute('style', 'top:' + choiceTop + 'px; left:' + choiceLeft + 'px;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestion[i];

			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			// currentQuestion.innerHTML = gameManager.choiceQuestion[i];


			imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestion[i],
			className;

			fountainText = document.createElement('div'),
			mixedFractionText = document.createElement('div'),
			fountainLine = document.createElement('div'),
			choiceQuestionAllBox = document.createElement('div');

			choiceQuestionAllBox.id = 'choiceQuestionAllBox'; 

			// 대분수
			mixedFractionText.setAttribute('id','fountainText_' + i);
			mixedFractionText.className = 'mixedFraction';
			mixedFractionText.setAttribute('style','position:absolute;top: 0px; left: 4px;');
			mixedFractionText.innerHTML = gameManager.choiceQuestion[i][0];

			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = 'Text';
			imgObjText.setAttribute('style', 'position:absolute; top: -30px; left: 30px; width:60px;');
			imgObjText.innerHTML = gameManager.choiceQuestion[i][1];

			fountainText.setAttribute('id','fountainText_' + i);
			fountainText.className = 'fountain';
			fountainText.setAttribute('style','position:absolute; top: 30px; left: 30px; width:60px;');
			fountainText.innerHTML = gameManager.choiceQuestion[i][2];

			fountainLine.setAttribute('id','fountainLine');
			fountainLine.className = 'fountainLine';
			fountainLine.setAttribute('style','position:absolute; top: 2px; left: 34px; letter-spacing:-9px');
			fountainLine.innerHTML = '-----';

			currentQuestion.appendChild(choiceQuestionAllBox);

			choiceQuestionAllBox.setAttribute('style','position:absolute; top:15px; left:35px; width:120px; height:125px;');

			choiceQuestionAllBox.appendChild(mixedFractionText);
			choiceQuestionAllBox.appendChild(imgObjText);
			choiceQuestionAllBox.appendChild(fountainText);
			choiceQuestionAllBox.appendChild(fountainLine);

		}

		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
		} else {
			currentQuestion.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				fractionCompareAnswer(this);

				log('이리오니?')

			}, false);
		}

	}
}

function fractionCompareAnswer(dragObj) {
	log(dragObj.getAttribute('answerValue'));

	var dragObjAnswerValue = dragObj.getAttribute('answerValue').split(',');

	if (gameManager.CURRENT_ANSWER[0][0] === parseInt(dragObjAnswerValue[0]) && gameManager.CURRENT_ANSWER[0][1] === parseInt(dragObjAnswerValue[1]) && gameManager.CURRENT_ANSWER[0][2] === parseInt(dragObjAnswerValue[2])) {
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



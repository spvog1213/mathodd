function initScene() {
	log('initScene...');

	log('excute initClockTimer!');
	// CheckButton();
	// parent.window.initClockTimer();
	// appendImageElement('line','images/chocoplate_line.png', bgCanvas);
	// line.setAttribute('style','position: absolute; top: 250px;left: 161px; z-index: 90;');
	// appendImageElement('blankPlate','images/chocoplate_plate.png', bgCanvas);
	
	appendCircleElement('chocoCutArroWidthBox','chocoCutArrowBox', bgCanvas);
	appendCircleElement('chocoCutArroWheightBox','chocoCutArrowBox', bgCanvas);
	appendCircleElement('chocodivideBox','chocodivideBox', bgCanvas);


	chocoCutArroWidthBox.setAttribute('style','position:absolute; top:60px; left:454px;');
	chocoCutArroWheightBox.setAttribute('style','position:absolute; top:185px; left:314px; z-index:10');

	chocodivideBox.setAttribute('style','position:absolute; top:100px; left:390px; width:100px; display:none;');

	appendChoiceQuestion('click', gameManager.choiceQuestion);

}

function initChoco(chocoCounter) {
	log('initChoco...');

	var left = 15,
	chocoOriginal,
	question1 = document.createElement('div'),
	answerObject1 = document.getElementById('answerObject1');

	question1.setAttribute('id', 'question1');
	
	question1.setAttribute('style', 'top:53%; left:31%');
	bgCanvas.appendChild(question1);

	appendCircleElement('questionTop','questionTop', bgCanvas);
	appendCircleElement('num1','questionTop', questionTop);
	appendCircleElement('num2','questionTop', questionTop);
	appendCircleElement('num3','questionTop', questionTop);
	appendCircleElement('num4','questionTop', questionTop);
	appendCircleElement('num5','questionTop', questionTop);
	appendCircleElement('num6','questionTop', questionTop);
	appendCircleElement('num7','questionTop', questionTop);

	

	chocoOriginal = 'images/chocodivide_choco.png';
	// off = 'images/chocoplate_choco_off.png';

	for (var i = 0; i < chocoCounter; i++) {
		var top = 90,
		eventCallback = function() {
			arguments[0].preventDefault();

		};

		createObject(i, top, left, eventCallback, chocoOriginal);
		// blankChoco(i, eventCallback, off);
	}

	// setRand(1, 2, 2);

	var txtInquiry = gameManager.TOTAL_ANSWER_ARRAY[0],
	chocotxt;


	if(txtInquiry === 1 || txtInquiry === 3 || txtInquiry === 6 || txtInquiry === 7 || txtInquiry === 8){
		chocotxt = '은';
	}else{
		chocotxt = '는';
	}

	if(gameManager.chocodivide === 'A'){
		chocoCutArroWidth();
		num1.innerHTML = '12를 4개씩 묶으면';
		num2.innerHTML = '&nbsp;' + gameManager.TOTAL_ANSWER_ARRAY[0];
		num3.innerHTML = chocotxt;
		num4.innerHTML = '&nbsp;12';
		num5.innerHTML = '의';
		num6.innerHTML = '?';
		num7.innerHTML = '입니다.';

	}else{
		chocoCutArroheight();
		num1.innerHTML = '12를 3개씩 묶으면';
		num2.innerHTML = '&nbsp;' + gameManager.TOTAL_ANSWER_ARRAY[0];
		num3.innerHTML = chocotxt;
		num4.innerHTML = '&nbsp;12';
		num5.innerHTML = '의';
		num6.innerHTML = '?';
		num7.innerHTML = '입니다.';	}




	}

	function gameOver(dragObj) {

		log(dragObj);
		document.querySelector('#answerMark').setAttribute('style', 'display:block; top:' + (dragObj.offsetTop + 30) + 'px; left:' + (dragObj.offsetLeft + 25) + 'px;');

		var answerObj1 = document.querySelector('#answerObject1'),
		answerChildNode1 = parseInt(answerObj1.childNodes.length),
		choiceQuestionContainer = document.querySelector('#choiceQuestionContainer'),
		num6 = document.querySelector('#num6'),
		exe01 = document.createElement('div'),
		exe02 = document.createElement('div'),
		exe03 = document.createElement('div'),
		fountainLine = document.createElement('div'),
		exebox = document.createElement('div');

		exebox.id = 'exebox'; 

			// 대분수
			exe01.setAttribute('id','exe01');
			exe01.className = 'mixedFraction';
			
			exe01.innerHTML = gameManager.CURRENT_ANSWER[0][0];

			exe02.setAttribute('id', 'exe02');
			exe02.className = 'Text';
			
			exe02.innerHTML = gameManager.CURRENT_ANSWER[0][1];

			exe03.setAttribute('id','exe03');
			exe03.className = 'fountain';
			exe03.innerHTML = gameManager.CURRENT_ANSWER[0][2];

			fountainLine.setAttribute('id','fountainLine');
			fountainLine.className = 'fountainLine';
			// fountainLine.setAttribute('style','position:absolute; top: 0px; left: 23px; letter-spacing:-5px');

			if(gameManager.CURRENT_ANSWER[0][0].toString().length === 1){
				fountainLine.setAttribute('style','position:absolute; top: 0px; left: 24px; letter-spacing:-6px');
			}else{
				fountainLine.setAttribute('style','position:absolute; top: 0px; left: 24px; letter-spacing:-4px');
			}
			fountainLine.innerHTML = '-----';

			exebox.appendChild(exe02);
			exebox.appendChild(exe03);
			exebox.appendChild(fountainLine);

			if(gameManager.CURRENT_ANSWER[0][0] === 0){
				exebox.setAttribute('style','position:absolute; top:0px; left:8px; width:93px; height:125px;');
				exe01.setAttribute('style','position:absolute;top: 0px; left: 4px;');
				exe02.setAttribute('style', 'position:absolute; top: -25px; width:93px;');
				if(gameManager.CURRENT_ANSWER[0][2].toString().length === 1){
					exe03.setAttribute('style','position:absolute; top: 25px; width:90px;');
				}else{
					exe03.setAttribute('style','position:absolute; top: 25px; width:93px; letter-spacing:-3px');
				}
			}else{
				exebox.appendChild(exe01); //대분수
				exebox.setAttribute('style','position:absolute; top:0px; left:20px; width:120px; height:125px;');
				exe01.setAttribute('style','position:absolute;top: 0px; left: 4px;');
				exe02.setAttribute('style', 'position:absolute; top: -25px; width:96px;');
				if(gameManager.CURRENT_ANSWER[0][2].toString().length === 1){
					exe03.setAttribute('style','position:absolute; top: 25px; width:90px;');
				}else{
					exe03.setAttribute('style','position:absolute; top: 25px; width:93px; letter-spacing:-3px');
				}

			}

			num6.innerHTML = '';
			num6.appendChild(exebox);

			gameOverAnimation();
			streamSound.setSound('../../media/correct.mp3');

			logCounter.tryCounter();
			logCounter.endTime();

			choiceQuestionContainer.style.pointerEvents = "none";

			setTimeout(function() {
				log('excute stampStarIcon!');
			// parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			// parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);

		log('@ incorrect!!');
		// logCounter.tryCounter();
		// streamSound.setSound('../../media/incorrect.mp3');
		
	}

	function createObject(index, top, left, eventCallback, parentObjSrc) {
		var choiceTop = 20,
		choiceLeft = 80,
		parentObj = document.createElement('img');

		parentObj.src = parentObjSrc;

		parentObj.setAttribute('id', 'parentObj_' + index);
		parentObj.className = "chocoplate";

		if (index > 2 && index < 6) {
			index = index - 3;
			choiceTop = (choiceTop + 90);
			choiceLeft = choiceLeft * index + 56;
			parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');
		} else if(index > 5 && index < 9){
			index = index - 6;
			choiceTop = (choiceTop + 170);
			choiceLeft = choiceLeft * index + 56;
			parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');
		} else if(index > 8 && index < 12){
			index = index - 9;
			choiceTop = (choiceTop + 250);
			choiceLeft = choiceLeft * index + 56;
			parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');
		}else{
			choiceLeft = choiceLeft * index + 56;
			parentObj.setAttribute('style', 'left:' + choiceLeft + 'px; ');

		}

		parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);
		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
		document.getElementById('chocoCounter').appendChild(parentObj);

	// new Dragdrop(parentObj);
}

function blankChoco(index, eventCallback, parentObjSrc) {
	var parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;

	parentObj.setAttribute('id', 'blankChoco_' + index);
	parentObj.className = "blankChoco";
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

function chocoCutArroWidth(){

	var chocodivideBox = document.querySelector('#chocodivideBox'),
	choiceLeft = -85,
	chocoLeft = -140;

	for(var i = 0; i<2; i++){

		appendImageElement('ArroWidth_' + i,'images/chocodivide_arrow_up.png', chocoCutArroWidthBox);

		var ArroWidthAll = document.querySelector('#ArroWidth_' + i),
		chocoCounter = document.querySelector('#chocoCounter');
		
		// arrowLeft;

		choiceLeft = choiceLeft + 80;

		ArroWidthAll.setAttribute('style','position:absolute; left:' + choiceLeft + 'px;');
	}


	for(var j = 0; j<3; j++){

		appendImageElement('chocodivide_' + j,'images/chocodivide_1_4.png', chocodivideBox);

		chocoLeft = chocoLeft + 120;

		var chocodivide = document.querySelector('#chocodivide_' + j);

		chocodivide.setAttribute('style','position:absolute; left:' + chocoLeft + 'px;');

	}

	btnDown = function(e) {
		e.preventDefault();
	}

	btnUp = function(e) {
		e.preventDefault();
		chocodivideBox.style.display = 'block';
		chocoCounter.style.display = 'none';
		chocoCutArroWidthBox.style.display = 'none';
		chocodivideBox.setAttribute('style','position:absolute; top:110px; left:350px;');
			// carrot();
			streamSound.setSound('media/chocodivide_click.mp3');
		}

		chocoCutArroWidthBox.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
		chocoCutArroWidthBox.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);
	}

	function chocoCutArroheight(){

		var chocodivideBox = document.querySelector('#chocodivideBox'), 
		choiceTop = -85,
		chocoTop = -130;

		for(var i = 0; i<3; i++){

			appendImageElement('Arrowheight_' + i,'images/chocodivide_arrow_left.png', chocoCutArroWheightBox);

			var ArroheightAll = document.querySelector('#Arrowheight_' + i),
			chocoCounter = document.querySelector('#chocoCounter');

			choiceTop = choiceTop + 80;

			ArroheightAll.setAttribute('style','position:absolute; top:' + choiceTop + 'px;');
		}

		for(var j = 0; j<4; j++){

			appendImageElement('chocodivide_' + j,'images/chocodivide_3_1.png', chocodivideBox);

			chocoTop = chocoTop + 120;

			var chocodivide = document.querySelector('#chocodivide_' + j);

			chocodivide.setAttribute('style','position:absolute; top:' + chocoTop + 'px;');

		}

		btnDown = function(e) {
			e.preventDefault();

		}
		btnUp = function(e) {
			e.preventDefault();
			chocodivideBox.style.display = 'block';
			chocoCounter.style.display = 'none';
			chocoCutArroWheightBox.style.display = 'none';
			// carrot();
			// streamSound.setSound('media/cook_cut.mp3');
			chocodivideBox.setAttribute('style','position:absolute; top:70px; left:370px; width:100px;');

			streamSound.setSound('media/chocodivide_click.mp3');
		}

		chocoCutArroWheightBox.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
		chocoCutArroWheightBox.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);
	}


	function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
		var bgCanvas = document.getElementById('bgCanvas'),
		choiceQuestionContainer = document.createElement('div'),
		choiceTop = 0,
		choiceLeft = 1100;

		switch (gameManager.choiceQuestion.length) {
			case 1 :
			choiceTop = 240;
			break;
			case 2 :
			choiceTop = 150;
			break;
			case 3 :
			choiceTop = -130;
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

				appendImageElement('choiceQuestion_' + i, imgSrcArray[0], choiceQuestionGroup);
				currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
				currentQuestion.className = className[0];

			} else {
				appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
				currentQuestion = document.querySelector('#choiceQuestion_' + i);
			}

			choiceTop = choiceTop + 220;

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
			imgObjText.setAttribute('style', 'position:absolute; top: -30px; width:116px;');
			imgObjText.innerHTML = gameManager.choiceQuestion[i][1];

			fountainText.setAttribute('id','fountainText_' + i);
			fountainText.className = 'fountain';
			fountainText.setAttribute('style','position:absolute; top: 30px; width:116px;');
			fountainText.innerHTML = gameManager.choiceQuestion[i][2];

			fountainLine.setAttribute('id','fountainLine');
			fountainLine.className = 'fountainLine';
			// fountainLine.setAttribute('style','position:absolute; top: 0px; left: 26px; letter-spacing:-7px');

			if(gameManager.choiceQuestion[i][2].toString().length === 1){
				fountainLine.setAttribute('style','position:absolute; top: 0px; left: 28px; letter-spacing:-8px');
			}else{
				fountainLine.setAttribute('style','position:absolute; top: 0px; left: 24px; letter-spacing:-6px');
			}
			fountainLine.innerHTML = '-----';

			currentQuestion.appendChild(choiceQuestionAllBox);

			if(gameManager.choiceQuestion[i][0] === 0){
				choiceQuestionAllBox.setAttribute('style','position:absolute; top:20px; left:10px; width:120px; height:125px;');
			}else{
				choiceQuestionAllBox.appendChild(mixedFractionText); //대분수
				choiceQuestionAllBox.setAttribute('style','position:absolute; top:20px; left:20px; width:120px; height:125px;');
			}

			// choiceQuestionAllBox.setAttribute('style','position:absolute; top:4px; left:8px; width:120px; height:125px;');

			// choiceQuestionAllBox.appendChild(mixedFractionText);
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
				chocoCompareAnswer(this);

			}, false);
		}

	}
}


function chocoCompareAnswer(dragObj) {
	log(dragObj.getAttribute('answerValue'));

	var answerValue = dragObj.getAttribute('answerValue');

	answerValue = answerValue.split(',');

	if (gameManager.CURRENT_ANSWER[0][0] === parseInt(answerValue[0]) && gameManager.CURRENT_ANSWER[0][1] === parseInt(answerValue[1]) && gameManager.CURRENT_ANSWER[0][2] === parseInt(answerValue[2])) {

		log('@ correct!!');
		gameOver(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		
	}

	logCounter.tryCounter();
}




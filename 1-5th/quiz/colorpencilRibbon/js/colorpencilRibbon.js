function initScene() {
	// log('initScene...');
	// log(gameManager.CURRENT_ANSWER[0]);

	var math_1 = document.createElement('div'),
	math_2 = document.createElement('div');

	math_1.setAttribute('id','math_1');
	math_2.setAttribute('id','math_2');

	bgCanvas.appendChild(math_1);
	bgCanvas.appendChild(math_2);

	appendCircleElement('colorpencilRibbonBox','colorpencilRibbonBox', bgCanvas);
	
	appendCircleElement('colorpencilRibbonTXTBox','colorpencilRibbonTXTBox', bgCanvas);

	appendCircleElement('txt01','txt01', colorpencilRibbonTXTBox);
	appendCircleElement('txt02','txt02', colorpencilRibbonTXTBox);
	appendCircleElement('txt03','txt03', colorpencilRibbonTXTBox);
	appendCircleElement('txt04','txt04', colorpencilRibbonTXTBox);
	appendCircleElement('txt05','txt05', colorpencilRibbonTXTBox);

	appendImageElement('colorPen', 'images/colorpencil_ribbon_box.png', document.querySelector('#math_2'));

	var colorpencilAll = ['colorpencil_yellow','colorpencil_red','colorpencil_purple','colorpencil_blue','colorpencil_green','colorpencil_yellow','colorpencil_red','colorpencil_purple','colorpencil_blue','colorpencil_green','colorpencil_yellow','colorpencil_red','colorpencil_purple','colorpencil_blue','colorpencil_green','colorpencil_yellow','colorpencil_red','colorpencil_purple','colorpencil_blue','colorpencil_green'];

	for(var i=0; i<gameManager.TOTAL_ANSWER_ARRAY[0]; i++){
		appendImageElement('colorpencil' + i, 'images/' + colorpencilAll[i] + '.png',colorpencilRibbonBox, 'colorpencilAll');
	}
	colorpencilRibbonBox.setAttribute('style','position:absolute; left:125px; top :90px; z-index:10; width:1065px; text-align: center;');
	colorpencilRibbonTXTBox.setAttribute('style','position:absolute; left:430px; top:320px; width:600px; height:100px; z-index:5; line-height:95px;');

	var num6 = document.querySelector('#num6'),
	exe01 = document.createElement('div'),
	exe02 = document.createElement('div'),
	exe03 = document.createElement('div'),
	fountainLine = document.createElement('div'),
	exebox = document.createElement('div');

	exebox.id = 'exebox'; 

	// 대분수
	exe01.setAttribute('id','exe01');
	exe01.className = 'mixedFraction';

	exe01.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1][0];

	exe02.setAttribute('id', 'exe02');
	exe02.className = 'Text';

	exe02.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1][1];

	exe03.setAttribute('id','exe03');
	exe03.className = 'fountain';
	exe03.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1][2];

	fountainLine.setAttribute('id','fountainLine');
	fountainLine.className = 'fountainLine';

	if(gameManager.TOTAL_ANSWER_ARRAY[1][0].toString().length === 1){
		fountainLine.setAttribute('style','position:absolute; top: 0px; left: 22px;');
	}else{
		fountainLine.setAttribute('style','position:absolute; top: 0px; left: 24px;');
	}
	fountainLine.innerHTML = '-----';

	if(gameManager.TOTAL_ANSWER_ARRAY[1][1].toString().length === 2 || gameManager.TOTAL_ANSWER_ARRAY[1][2].toString().length === 2){
		fountainLine.setAttribute('style','position:absolute; top: 0px; left: 15px; letter-spacing:-8px');
		txt03.setAttribute('style','margin-left:85px;');
	}else{
		fountainLine.setAttribute('style','position:absolute; top: 0px; left: 22px; letter-spacing:-13px');
		txt03.setAttribute('style','margin-left:70px;');
	}

	exebox.appendChild(exe02);
	exebox.appendChild(exe03);
	exebox.appendChild(fountainLine);

	if(gameManager.TOTAL_ANSWER_ARRAY[1][0] === 0){
		exebox.setAttribute('style','position:absolute; top:0px; left:0px; width:93px; height:125px;');
		exe01.setAttribute('style','position:absolute;top: 0px; left: 4px;');
		exe02.setAttribute('style', 'position:absolute; top: -30px; width:93px;');
		exe03.setAttribute('style','position:absolute; top: 27px; width:93px;');
	}else{
			exebox.appendChild(exe01); //대분수
			exebox.setAttribute('style','position:absolute; top:0px; left:10px; width:120px; height:125px;');
			exe01.setAttribute('style','position:absolute;top: 0px; left: 4px;');
			exe02.setAttribute('style', 'position:absolute; top: -30px; width:96px;');
			exe03.setAttribute('style','position:absolute; top: 30px; width:96px; letter-spacing:-3px');
		}

		txt01.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0] + '의';
		txt02.appendChild(exebox);
		if(gameManager.TOTAL_ANSWER_ARRAY[1][1] === 1 || gameManager.TOTAL_ANSWER_ARRAY[1][1] === 3 || gameManager.TOTAL_ANSWER_ARRAY[1][1] === 6 || gameManager.TOTAL_ANSWER_ARRAY[1][1] === 7 || gameManager.TOTAL_ANSWER_ARRAY[1][1] === 8){
			txt03.innerHTML ='은&nbsp;';
		}else{
			txt03.innerHTML ='는&nbsp;';
		}
		txt04.innerHTML = '?';
		txt05.innerHTML = '입니다.';

		colorPen.setAttribute('style','position:absolute; left:110px; top:35px;');
		appendChoiceQuestion('click', gameManager.choiceQuestion, gameManager.choiceQuestionImgArray);
		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

		pencilClickAction();

		for(var i=0; i<3; i++){
			var choiceQuestionText = document.querySelector('#choiceQuestionText_' + i);
			log(choiceQuestionText);
			choiceQuestionText.setAttribute('style','top:25px; left:0px;');
		}	
	}


	function pencilClickAction(){

		switch(gameManager.CURRENT_ANSWER[0]){
			case 1:
			pencilNum = 1;
			pencilEA = 20;
			break;
			case 2:
			pencilNum = 2;
			pencilEA = 10;
			break;
			case 3:
			pencilNum = 3;
			pencilEA = 6;
			break;
			case 4:
			pencilNum = 4;
			pencilEA = 5;
			break;
			case 5:
			pencilNum = 5;
			pencilEA = 4;
			break;
			case 6:
			pencilNum = 6;
			pencilEA = 3;
			break;
			case 7:
			pencilNum = 7;
			pencilEA = 2;
			break;
			case 8:
			pencilNum = 8;
			pencilEA = 2;
			break;
			case 9:
			pencilNum = 9;
			pencilEA = 2;
			break;
			case 10:
			pencilNum = 10;
			pencilEA = 2;
			break;
		}

		appendCircleElement('colorpencilRibbonAnserBox','colorpencilRibbonAnserBox', bgCanvas);
		colorpencilRibbonAnserBox.setAttribute('style','position:absolute; left:130px; top :90px; z-index:10; width:1065px; text-align: center;');

		colorpencilRibbonBox.addEventListener(gameManager.eventSelector.downEvent, function() {

			if(!gameManager.flag){
				Pensilposi();
			}

			streamSound.setSound('media/fruits.mp3');
		});
	}



	function Pensilposi(){

		gameManager.flag=true;

		var divisionNum =  gameManager.TOTAL_ANSWER_ARRAY[0] /gameManager.TOTAL_ANSWER_ARRAY[1][2];

		
		if(gameManager.CURRENT_ANSWER[0]>1){
			for(j=0; j<gameManager.TOTAL_ANSWER_ARRAY[1][2]; j++){

				appendImageElement('colorpencilAnser_' + j, 'images/colorpencil_' + parseInt(divisionNum) +'set_' + j + '.png',colorpencilRibbonAnserBox, 'colorpencilAll');

				colorpencilRibbonBox.style.display = 'none'
				var colorpencilAnser = document.querySelector('#colorpencilAnser_' + j);

			}
		}
	}


	function gameOver(dragObj) {
		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes,
		totalCoinContainer = document.querySelector('#totalCoinContainer'),
		colorpencilRibbonBox = document.querySelector('#colorpencilRibbonBox'),
		txt04 = document.querySelector('#txt04');

		txt04.innerHTML = gameManager.CURRENT_ANSWER[0];

		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[i].style.pointerEvents = "none";
		}

		colorpencilRibbonBox.style.pointerEvents = 'none';

		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');

		document.querySelector('#answerMark').setAttribute('style', 'position: absolute; display: block; top:' + (dragObj.offsetTop + 20) + 'px; left:' + (dragObj.offsetLeft + 10) + 'px;');

		
		logCounter.endTime();

		setTimeout(function() {
			log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);
	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);

}

function riboonCompareAnswer(dragObj) {
	log(dragObj.getAttribute('answerValue'));

	if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))) {
		//getAttribute = 요소의 클래스 속성의 값을 가져옴
		//parseInt = 문자열을 구문 분석하고 정수를 반환합니다.
		
			if(!gameManager.flag){
				Pensilposi();
			}

		log('@ correct!!');
		gameOver(dragObj);
		logCounter.tryCounter();

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');

		logCounter.tryCounter();
	}
}

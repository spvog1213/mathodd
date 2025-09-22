function initScene() {

	var quizObjContainer = document.createElement('div');

	quizObjContainer.setAttribute('id', 'quizObjContainer');
	bgCanvas.appendChild(quizObjContainer);

	createElement('div', bgCanvas, 'backImg');
	var imgWrap = createElement('div', QS('#bgCanvas'), 'imgWrap');
	createElement('div', QS('.imgWrap'), 'imgContainer');


	var shape = gameManager.QUIZ_OPTION[0][2],
		shapePcs = gameManager.QUIZ_OPTION[0][1],
		pcsCount = gameManager.QUIZ_OPTION[1];

	if(shape == 2 || shape == 3 || shape == 4){
		var shapeName = 'pizza';
	}else if(shape == 5|| shape == 6 || shape == 8){
		var shapeName = 'wmelon';
	}else if(shape == 9 || shape == 10 || shape == 12){
		var shapeName = 'pie';
	}

	if(pcsCount % 3 == 1 || pcsCount % 4 == 0 || pcsCount % 11 == 0){
		imgWrap.style.width = '575px';
		imgWrap.style.left = '170px';
	}else{
		imgWrap.style.width = '555px';
		imgWrap.style.left = '180px';

	}
	for(var i = 0; i < pcsCount; i++){

		var shapeImg = createElement('div', QS('.imgContainer'), 'shapeImg ' + shapeName);

		shapeImg.style.background = 'url(../../images/common/fruitPcs/' + shapeName + '_' + shape + '_' + shapePcs + '.png) 0% 0% / cover no-repeat';

	}

	// 문제
	var questionContainer = createElement('div', QS('#bgCanvas'), 'questionContainer');
	var question_0 = createElement('div', questionContainer, 'questionText question_0');
	if(typeof gameManager.QUIZ_OPTION[0] === 'object') makeBunsu(gameManager.QUIZ_OPTION[0].toString(), question_0);
	else question_0.innerHTML = gameManager.QUIZ_OPTION[0];
	replaceSymbol('*', questionContainer);
	var question_1 = createElement('div', questionContainer, 'questionText question_1');
	question_1.innerHTML = gameManager.QUIZ_OPTION[1];
	replaceSymbol('=', questionContainer);
	var drop = createElement('div', questionContainer, 'drop');
	var questionImg = QSAll('.questionContainer img');
	for(var i = 0; i < questionImg.length; i++){
		// questionImg[i].style.margin = '0 10px';
	}

	appendSelectQuestion('drag', gameManager.quizObj);

}

	// 드랍 영역
function dropAreaFNC() {

	var dropArea = createElement('div', QS('#bgCanvas')),
		drop = QS('.drop');
		answerValue = convertBunsuToDec(gameManager.QUIZ_ANSWER[0]).toFixed(3);

	dropArea.setAttribute('answerValue', answerValue);
	gameManager.dropArea.push(dropArea);

	setTimeout(function() {
		dropArea.setAttribute('style','top:'+ drop.offsetTop+"px;"+'left:'+ drop.offsetLeft+'px; width : '+ drop.clientWidth + 'px; height : '+ drop.clientHeight + 'px;');
		dropArea.className = 'dropArea';
	}, 100);

}



function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    answerWrap = createElement('div', bgCanvas, 'answerWrap'),
	    answerContainer = createElement('div', answerWrap, 'answerContainer'),
	    line = document.createElement('div'),
	    choiceTop = -160,
	    choiceLeft = 1012;


	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var dragObj = createElement('div', answerContainer, 'dragObj dragObj_' + i ),
			answerValue = convertBunsuToDec(gameManager.quizObj[i]).toFixed(3);



		choiceTop = choiceTop + 225;

		dragObj.setAttribute('style', 'top: ' + choiceTop + 'px; left: 1012px;');

		// 분수
		if(typeof gameManager.quizObj[i] === 'object') makeBunsu(gameManager.quizObj[i].toString(), dragObj);
		else dragObj.innerHTML = gameManager.quizObj[i];

		dragObj.setAttribute('answerValue', answerValue);

		gameManager.quizPosition.push([choiceTop, choiceLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(dragObj);
		} else {
			dragObj.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}


function dropCompare (dragObj, x, y) {
	var dragObjValue = dragObj.getAttribute('answervalue');

	for (var i = 0; i < gameManager.dropArea.length; i++) {

		var dropValue = gameManager.dropArea[i].getAttribute('answervalue');
		// dropValue = dropValue.split(',');

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth + 10) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight + 10) * gameManager.zoomRate)) {

			// for (var j = 0; j < dropValue.length; j++) {
				// for(var k = 0; k < dragObjValue.length; k++){
					if (dragObjValue === dropValue) {
						gameManager.dropIdx = i;
						return true;
					}
				// }

			// }
			return false;
		}
	}
}


function gameOver(dragObj) {

	var quizObjContainer = document.querySelector('#quizObjContainer').childNodes;

	for (var i = 0; i < quizObjContainer.length; i++) {
		quizObjContainer[i].style.pointerEvents = "none";
	}

	document.querySelector('.drop').style.display = 'none';

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
		gameOverAnimation();
	}, 500);


	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);

	// 완성 후 자리바꿈
	// if(gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length-1].length > 0){
		inversion(dragObj);
	// }


}

function inversion(dragObj) {
	var imgContainer = QS('.imgContainer'),
		shapeImg = QSAll('.shapeImg');

	for(var i = 0; i < shapeImg.length; i++){
		var shapeName = shapeImg[i].classList[1];
		imgContainer.removeChild(shapeImg[i]);
	}

	var questionContainer = QS('.questionContainer');
	questionContainer.appendChild(dragObj);

	QS('.dropArea').style.visibility = 'hidden';
	dragObj.style.display = 'inline-block';
	dragObj.style.position = 'inherit';
	// dragObj.style.margin = '0 10px';

	var shape = gameManager.QUIZ_OPTION[5][2],
		shapePcs = gameManager.QUIZ_OPTION[5][1],
		shapeCom = gameManager.QUIZ_OPTION[5][0];

	// var dapBunsu = [parseInt(shapePcs/shape), shapePcs%shape, shape];
	var dapBunsu = gameManager.QUIZ_OPTION[5];
	console.log('dapBunsu:', dapBunsu);
	// 대분수로 바뀔 경우
	if(dapBunsu[0] != 0){
		for(var i = 0; i < dapBunsu[0]; i++){
			var shapeImg = createElement('div', QS('.imgContainer'), 'shapeImgCom ' + shapeName);
			shapeImg.style.background = 'url(../../images/common/fruitPcs/' + shapeName + '_' + dapBunsu[2] + '_' + dapBunsu[2] + '.png) 0% 0% / cover no-repeat';
		}

		var shapeImg = createElement('div', QS('.imgContainer'), 'shapeImgCom ' + shapeName);

		shapeImg.style.background = 'url(../../images/common/fruitPcs/' + shapeName + '_' + dapBunsu[2] + '_' + dapBunsu[1] + '.png) 0% 0% / cover no-repeat';

		replaceSymbol('=', questionContainer);

		var question_3 = createElement('div', questionContainer, 'questionText question_3');
		if(typeof gameManager.QUIZ_OPTION[5] === 'object') makeBunsu(dapBunsu.toString(), question_3);
		else question_3.innerHTML = gameManager.QUIZ_OPTION[5];
	}else{
		var shapeImg = createElement('div', QS('.imgContainer'), 'shapeImgCom ' + shapeName);

		shapeImg.style.background = 'url(../../images/common/fruitPcs/' + shapeName + '_' + gameManager.QUIZ_ANSWER[0][2] + '_' + gameManager.QUIZ_ANSWER[0][1] + '.png) 0% 0% / cover no-repeat';
	}


	// 대분수로 바뀔경우
	// if(gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length-1].length > 0){
	// 	for(var i = 0; i < dapBunsu[0]; i++){
	// 		var shapeImg = createElement('div', QS('.imgContainer'), 'shapeImgCom ' + shapeName);
	// 		shapeImg.style.background = 'url(../../images/common/fruitPcs/' + shapeName + '_' + dapBunsu[2] + '_' + dapBunsu[2] + '.png) 0% 0% / cover no-repeat';
	// 	}

	// 	var shapeImg = createElement('div', QS('.imgContainer'), 'shapeImgCom ' + shapeName);

	// 	shapeImg.style.background = 'url(../../images/common/fruitPcs/' + shapeName + '_' + dapBunsu[2] + '_' + dapBunsu[1] + '.png) 0% 0% / cover no-repeat';

	// 	replaceSymbol('=', questionContainer);

	// 	var question_3 = createElement('div', questionContainer, 'questionText question_3');
	// 	if(typeof gameManager.QUIZ_OPTION[5] === 'object') makeBunsu(dapBunsu.toString(), question_3);
	// 	else question_3.innerHTML = gameManager.QUIZ_OPTION[5];
	// }else{
	// 	var shapeImg = createElement('div', QS('.imgContainer'), 'shapeImgCom ' + shapeName);

	// 	shapeImg.style.background = 'url(../../images/common/fruitPcs/' + shapeName + '_' + gameManager.QUIZ_ANSWER[0][2] + '_' + gameManager.QUIZ_ANSWER[0][1] + '.png) 0% 0% / cover no-repeat';
	// }
}


function answerTxt() {
	var queTxt = QS('#queTxt'),
		text = gameManager.QUIZ_OPTION[0], // string
		bunsuArray = [],
		bunsuTxt = [],
		beforeTxt = '',
		afterTxt = '';

	queTxt.classList.add('txt');

	if(typeof text === 'object') makeBunsu(text.toString(), textDiv);
	else textDiv.innerHTML = text;
}

// 분수 만드는 함수
function makeBunsu(text, targetElement){
	var bunsuArray = [],
		bunsuTxt = [],
		beforeTxt = '',
		afterTxt = '';

	if(text.indexOf('[') > -1) {
		while(text.indexOf('[') > -1) {
			if(spitBunsuText(text).length === 3) {
				beforeTxt = spitBunsuText(text)[2];
				var bText = createElement('span', targetElement);
				bText.innerHTML = beforeTxt;
			}
			bunsuTxt = spitBunsuText(text)[0];
			afterTxt = spitBunsuText(text)[1];
			bunsuArray = bunsuTxt.split(',');

			drawBunsu(bunsuArray, targetElement);
			text = afterTxt; // console.log(text);
		}
	} else {
		bunsuArray = text.split(',');
		drawBunsu(bunsuArray, targetElement);
		text = afterTxt;
	}

	var aText = createElement('span', targetElement);
	aText.innerHTML = afterTxt;
}

// 분수 그릴 때 필요한 array 만드는 함수
function spitBunsuText(src){
	if(src.indexOf('[') === 0) {
		var startIdx = src.indexOf('['),
			endIdx = src.indexOf(']'),
			bunsuTxt = src.slice(startIdx + 1, endIdx),
			afterTxt = src.slice(endIdx + 1),
			resultArray = [bunsuTxt, afterTxt];
	} else {
		var startIdx = src.indexOf('['),
			endIdx = src.indexOf(']'),
			beforeTxt =  src.slice(0, startIdx),
			bunsuTxt = src.slice(startIdx + 1, endIdx),
			afterTxt = src.slice(endIdx + 1),
			resultArray = [bunsuTxt, afterTxt, beforeTxt]; // console.log('resultArray: ',resultArray);
	}
	return resultArray;
}

// 분수 그리는 함수
function drawBunsu(bunsuArray, parentElement){
	var bunsuDiv = createElement('div', parentElement, 'bunsuDiv'),
		int = createElement('div', bunsuDiv, 'int'),
		prop = createElement('div', bunsuDiv, 'prop'),
		bunja = createElement('div', prop, 'bunja'),
		bunmo = createElement('div', prop, 'bunmo');

	if(bunsuArray[0] != 0) int.innerHTML = bunsuArray[0];

	bunja.innerHTML = bunsuArray[1];
	bunmo.innerHTML = bunsuArray[2];
}

// 분수를 소수로 바꾸는 함수
function convertBunsuToDec(array) { return (Number(array[0]) * Number(array[2]) + Number(array[1])) / Number(array[2]); }

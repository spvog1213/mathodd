function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	attachChoiceQuestion('click', gameManager.TOTAL_ANSWER_ARRAY[1]);
}

function initFruits(fruitsCounter) {
	log('initFruits...');

	var left = 50, //과일 사이 간격
	    eventCallback = function() {

	},
	    fruitsOriginal = 'images/smile_face_sky.png',
	    fruitsSlice = 'images/apple_slice.png';

	for (var i = 0; i < fruitsCounter; i++) {
		var top = 150;
		//과일 클릭했을때 나오는 사운드

		createObject(i, top, left, eventCallback, fruitsOriginal);
	}

	var fruitsQuestion = document.getElementById('fruitsAnswer'),
	    QuestionWidth = (gameManager.TOTAL_ANSWER_ARRAY.length * 95) + 135,
	    bgCanvasLeft = gameManager.bgCanvasWidth - (gameManager.clientWidth * gameManager.zoomRate),
	    QuestionLeft = gameManager.bgCanvasWidth - QuestionWidth;

	fruitsQuestion.setAttribute('style', 'top:' + (top + 250) + 'px; left:' + ((QuestionLeft / 2.1 ) - 320) + 'px;');

	fruitsQuestion.innerHTML = "왼쪽에서부터 <span style='color:#ff5f3a;'>" + gameManager.TOTAL_ANSWER_ARRAY[0] + "째</span>를 선택하세요.";

	var fruitsQuestion = document.getElementById('fruitsQuestion'),
	    QuestionWidth = (gameManager.TOTAL_ANSWER_ARRAY.length * 95) + 135,
	    bgCanvasLeft = gameManager.bgCanvasWidth - (gameManager.clientWidth * gameManager.zoomRate),
	    QuestionLeft = gameManager.bgCanvasWidth - QuestionWidth;

	fruitsQuestion.setAttribute('style', 'top:' + (top - 140) + 'px; left:' + ((QuestionLeft / 2.1 ) - 320) + 'px;');

	fruitsQuestion.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];

	var fruitsContainer = document.getElementById('fruitsContainer'), //fruitsContainer 전체 div
	    containerWidth = (gameManager.CURRENT_ANSWER[0] * 170) + 135, //과일 박스의 width 값을 결정
	    bgCanvasLeft = gameManager.bgCanvasWidth - (gameManager.clientWidth * gameManager.zoomRate),
	    containerLeft = (gameManager.bgCanvasWidth) - containerWidth;

	fruitsContainer.setAttribute('style', 'width:' + containerWidth + 'px; top:' + top + 'px; left:' + (containerLeft / 2.1) + 'px;');
	//과일 박스 위치값 결정

	fruitsQuestion.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
}

function gameOver() {

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');
	logCounter.tryCounter();
	logCounter.endTime();

	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);
}

//정답이 맞으면 사운드와 함께 재생됨

function createObject(index, top, left, eventCallback, parentObjSrc) {
	var parentObj = document.createElement('img');
	//과일이미지 결정
	parentObj.src = parentObjSrc;

	parentObj.setAttribute('id', 'parentObj_' + index);
	//과일을 클릭하면 번호가 매겨짐
	parentObj.className = "fruits";
	//각 이미지 개체에 fruits라는 클래스를 지정해줌

	parentObj.setAttribute('style', 'padding-top: 15px; padding-left : ' + (left / 3) + 'px; padding-right : ' + (left / 3) + 'px;');
	//그림마다 양옆 마진을 줌...

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);
	parentObj.addEventListener(gameManager.eventSelector.upEvent, function() {
		document.querySelector('#numberPanel').setAttribute('style', 'display:none;');
	}, false);
	//붙으면서 이미지 변환

	document.getElementById('fruitsContainer').appendChild(parentObj);
}

function feedBackAnimation(parentObj, parentObjSrc, callback) {
	//이미지에 번호를 매겨주는 부분...
	parentObj.src = parentObjSrc;

	var parentObjId = parentObj.id.split('_'),
	    parentObjId = parentObjId[parentObjId.length - 1];
	// parentObjId = parentObjId.split('_');
	log(parentObjId);

}

function attachChoiceQuestion(buttonType, choiceQuestionLength, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    choiceQuestionContainer = document.createElement('div'),
	    line = document.createElement('div'),
	    choiceLeft = 0,

	    smile = 'images/smile_face_ye.png';

	var containerWidth = (gameManager.CURRENT_ANSWER[0] * 170) + 135, //과일 박스의 width 값을 결정
	    bgCanvasLeft = gameManager.bgCanvasWidth - (gameManager.clientWidth * gameManager.zoomRate),
	    containerLeft = (gameManager.bgCanvasWidth) - containerWidth;

	choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');
	choiceQuestionContainer.setAttribute('style', 'position:absolute; width:' + containerWidth + 'px; top:565px; left:' + (containerLeft / 2.1) + 'px;');

	switch (choiceQuestionLength) {
	case 1 :
		choiceLeft = 340;
		break;
	case 2 :
		choiceLeft = 288;
		break;
	case 3 :
		choiceLeft = 237;
		break;
	case 4 :
		choiceLeft = 187;
		break;
	case 5 :
		choiceLeft = 145;
		break;
	case 6 :
		choiceLeft = 87;
		break;
	case 7 :
		choiceLeft = 37;
		break;
	case 8 :
		choiceLeft = -14;
		break;
	case 9 :
		choiceLeft = -64;
		break;
	}

	choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');
	bgCanvas.appendChild(choiceQuestionContainer);

	choiceQuestionContainer.appendChild(line);

	for (var i = 0; i < choiceQuestionLength; i++) {

		var currentQuestion;

		if (imgSrcArray) {
			var className = imgSrcArray[0].split('/');
			log(imgIndex);
		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'retis', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
		}

		choiceLeft = choiceLeft + 105;
		//버튼간의 간격을 조절
		var left = 50,
		    top = 150;
		currentQuestion.setAttribute('style', 'padding-top: 15px; padding-left : ' + (left / 3) + 'px; padding-right : ' + (left / 3) + 'px;');
		// 버튼의 top 위치값을 조절

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestionText[i];

			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			currentQuestion.innerHTML = '<img src=' + smile + '>';
			//넣어준 값을 받아옴
		}

		currentQuestion.setAttribute('answerValue', i + 1);
		//정답을 판별

		gameManager.choiceQuestionPosition.push([540, choiceLeft]);
		//클릭후 바운스후 제자리로 돌아옴

		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);

		} else {
			currentQuestion.addEventListener(gameManager.eventSelector.downEvent, function(e) {
				e.preventDefault();
				compareAnswerPainting(this);
				//정답을 클릭할경우 반응

			}, false);
		}
	}
}

function compareAnswerPainting(dragObj) {

	var smileGood = 'images/smile_face_green.png',
	    smileBad = 'images/smile_face_red.png',
	    smile = 'images/smile_face_ye.png';

	log(dragObj.getAttribute('answerValue'));
	if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))) {
		//getAttribute = 요소의 클래스 속성의 값을 가져옴
		//parseInt = 문자열을 구문 분석하고 정수를 반환합니다.
		log('@ correct!!');
		setTimeout(function(){
		// dragObj.innerHTML = '<img src=' + smileGood + '>';
			// dragObj.src = smileGood;
			dragObj.childNodes[0].src = smileGood;
		}, 1);
		gameOver(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');

		setTimeout(function(){
		// dragObj.innerHTML = '<img src=' + smileBad + '>';
			dragObj.childNodes[0].src = smileBad;
		}, 1);
		setTimeout(function() {
			// dragObj.innerHTML = '<img src=' + smile + '>';
			dragObj.childNodes[0].src = smile;
		}, 600);

		logCounter.tryCounter();
	}
}


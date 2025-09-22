
function initScene () {
	log('initScene...');
	log('QUIZ_OPTION: ' + gameManager.QUIZ_OPTION);
	log('QUIZ_ANSWER: ' + gameManager.QUIZ_ANSWER);

	// log('excute initClockTimer!');
    // parent.window.initClockTimer();

    answerTxt();

  	appendImageElement('bottom', 'images/dollshooting_bottom.png', bgCanvas);
	bottom.setAttribute('style','position: absolute; bottom: 48px; left: 0px; width: 1336px; z-index: 11;');
    gameManager.choiceBgImgArray = ['images/dollshooting_bear_success_1.png', 'images/dollshooting_rabbit_success_1.png', 'images/dollshooting_panda_success_1.png'];
    appendSelectQuestion('click', gameManager.quizObj, gameManager.choiceBgImgArray);


    appendCircleElement('handGroup' ,'hand', QS('#pierrotboxContainer'));
    for(var i = 0; i < 3; i ++){
    	appendImageElement('hand', 'images/dollshooting_success_hand_0.png', document.querySelector('#handGroup'));
    }

    if(escape(gameManager.QUIZ_ANSWER[1]).length == 2){
    	var quetxtGroup = document.querySelector('#quetxtGroup');
    	quetxtGroup.style.left = '38px';
    }

}

function answerTxt() {
	var queTxt = QS('#queTxt'),
		txtArray = gameManager.QUIZ_OPTION[0].split(' ');

	queTxt.classList.add('txt');

	for (var i = 0; i < txtArray.length; i++) {
		var span = createElement('span', queTxt),
			txt = txtArray[i];
		if(txt.indexOf(']') <= 0) {
			if(txt == '+' || txt == '-' || txt == '/' || txt == '*' || txt == '=') {
				replaceSymbol(txt, span);

				span.querySelector('img').setAttribute('style', 'position: relative; top: -5px; width: 24px; height: 24px;');
			} else {
				span.innerHTML = txt;
			}
		} else {
			makeBunsu(txt, span);
		}
		span.style.margin = '0 5px';
	}
}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = QS('#bgCanvas'),
		choiceQuestionContainer = createElement('div', bgCanvas),
		choiceTop = 230,
		choiceLeft = -130;

	choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		if (imgSrcArray) {

			var choiceQuestionGroup = createElement('div', choiceQuestionContainer, 'rect');

			choiceQuestionGroup.setAttribute('id', 'choiceQuestionGroup_' + i);

			// choiceQuestionGroup.innerHTML = gameManager.quizObj[i];

			console.log(gameManager.quizObj[i]);

			if(typeof gameManager.quizObj[i] !== 'object') choiceQuestionGroup.innerHTML = gameManager.quizObj[i];
			else makeBunsu(gameManager.quizObj[i].toString(), choiceQuestionGroup);

			choiceQuestionGroup.style.top = choiceTop + 'px';
			choiceLeft += 340;
			choiceQuestionGroup.style.left = choiceLeft + 'px';

			appendImageElement('choiceBg', imgSrcArray[i], choiceQuestionGroup);
			appendImageElement('numBox', 'images/dollshooting_numbox_none.png', choiceQuestionGroup);

		} else {
			appendCircleElement('choiceQuestionGroup_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
		}

		choiceQuestionGroup.setAttribute('answerValue', gameManager.quizObj[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);


		if (buttonType === 'drag') {
			new Dragdrop(choiceQuestionGroup);
		} else {
			choiceQuestionGroup.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				clickCompareAnswer(this);
			}, false);
		}
	}
}



function gameOver (dragObj) {

		var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
		for (var i = 0; i < choiceQuestionContainer.length; i++) {
			choiceQuestionContainer[i].style.pointerEvents = "none";
		}
		streamSound.setSound('media/pierrotbox_success.mp3');

		setTimeout(function(){
			gameOverAnimation();
			logCounter.tryCounter();
			clearInterval(countTimer);
			logCounter.endTime();
		}, 450)

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

function correctMotion(dragObj) { console.log(dragObj);
	var ch_img = dragObj.querySelector('#choiceBg'),
		handGroup = document.querySelector('#handGroup'),
		numBox = dragObj.querySelectorAll('img')[1],
		ch_imgSrc = ch_img.src,
		obj = ch_imgSrc.split('_').slice(-3),
		objanimal = obj[0],
		dragIdobj = dragObj.id.split('_').slice(-1);

		animalArray = ['images/dollshooting_' + objanimal +'_success_2.png','images/dollshooting_' + objanimal +'_success_3.png','images/dollshooting_' + objanimal +'_success_4.png','images/dollshooting_' + objanimal +'_success_5.png','images/dollshooting_' + objanimal +'_success_6.png','images/dollshooting_' + objanimal +'_success_7.png'];
		handArray = ['images/dollshooting_success_hand_1.png','images/dollshooting_success_hand_2.png','images/dollshooting_success_hand_3.png','images/dollshooting_success_hand_4.png','images/dollshooting_success_hand_5.png','images/dollshooting_success_hand_0.png'];

		spriteAnimation(animalArray, ch_img);
		spriteAnimation(handArray, handGroup.childNodes[dragIdobj]);

		numBox.src = numBox.src.replace('none', 'on');

}

function clickCompareAnswer(clickObj) {

	var clickObjValue = clickObj.getAttribute('answervalue'),
		clickObjImg = clickObj.querySelector('img'),
		answerIndex;


	for (var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
		var answervalue = gameManager.QUIZ_ANSWER[i];
		if (clickObjValue == answervalue){
			answerIndex = i;
		}
	}

	console.log(gameManager.QUIZ_ANSWER[answerIndex], clickObjValue);
	if (answerIndex!=undefined && gameManager.QUIZ_ANSWER[answerIndex] == clickObjValue) {
		gameManager.dabCount += 1;
		streamSound.setSound(gameManager.soundEffct);
		//체크가 여러개 일 때
		//위에 체크 표시 하면됨
		if (gameManager.dabCount == gameManager.QUIZ_ANSWER.length) {
			gameOver(clickObj);

			clickObjImg.setAttribute('src', clickObjImg.src.replace('_none.png','_on.png'));
			correctMotion(clickObj);

			setTimeout(function(){
				var clickObjLeft = parseInt(clickObj.style.left),
					clickObjTop = parseInt(clickObj.style.top),
					clickObjPaddingLeft = parseInt(clickObj.style.paddingLeft),
					chTop = 200;

				animate({
				delay : 50,
				duration : 500,
				delta : makeEaseInOut(linear),
					step : function(delta) {
						clickObj.setAttribute('style','margin-left :' + clickObjLeft +'px; margin-top:' + clickObjTop + 'px; padding-left:' + clickObjPaddingLeft + 'px;');
						clickObj.style.top = ((chTop * delta)) + 'px';
						clickObj.style.pointerEvents = 'none';
					}
				});
			}, 600)


		}

	} else {
		log('@ incorrect!!');
		incorrectAnimation(clickObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}

function spriteAnimation(spriteArray, spriteObj) {

	var index = 0;
	animate({
		delay : 100,
		duration : 600,
		delta : makeEaseInOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

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
		bunmo = createElement('div', prop, 'bunmo'),
		midLine = createElement('div', prop, 'midLine');

	if (bunsuArray[0] != 0) int.innerHTML = bunsuArray[0];

	bunja.innerHTML = bunsuArray[1];
	bunmo.innerHTML = bunsuArray[2];

	bunsuDiv.style.cssText = 'display: inline-block; vertical-align: middle';
	int.style.cssText = 'display: inline-block; margin-right: 5px; vertical-align: middle';
	prop.style.cssText = 'position: relative; display: inline-block; line-height: 1.25em; vertical-align: middle';
	bunja.style.cssText = 'display: block; vertical-align: middle';
	bunmo.style.cssText = 'display: block; vertical-align: middle';
	midLine.style.cssText = 'position: absolute; top: 50%; left: 0; width: 100%; height: 0; margin-top: -0.05em; border-top: 0.1em solid #000';
}

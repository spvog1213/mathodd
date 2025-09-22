function initScale() {
	log('initScale...');

	var bgCanvas = document.getElementById('bgCanvas');

	gameManager.clientWidth = document.body.clientWidth;
	gameManager.clientHeight = document.body.clientHeight;

	gameManager.bgCanvasWidth = bgCanvas.clientWidth;
	gameManager.bgCanvasHeight = bgCanvas.clientHeight;

	gameManager.zoomVertical = (gameManager.clientHeight / gameManager.bgCanvasHeight) * 0.93;
	gameManager.zoomHorizontal = (gameManager.clientWidth / gameManager.bgCanvasWidth) * 0.93;

	if (gameManager.bgCanvasWidth * gameManager.zoomVertical < gameManager.clientWidth) {
		setScaleCanvas(bgCanvas, gameManager.zoomVertical);
		gameManager.zoomRate = gameManager.zoomVertical;
	} else {
		setScaleCanvas(bgCanvas, gameManager.zoomHorizontal);
		gameManager.zoomRate = gameManager.zoomHorizontal;
	}
}

function setScaleCanvas(targetElement, zoomRate) {
	targetElement.setAttribute('style', '-ms-transform: scale(' + zoomRate + ',' + zoomRate + ');' + '-webkit-transform: scale(' + zoomRate + ',' + zoomRate + ');' + 'transform: scale(' + zoomRate + ',' + zoomRate + ');' + 'transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -ms-transform-origin: 0% 0%;');
}

function appendImageElement(imageId, imageSrc, targetElement, clssName) {

	var imgObj = document.createElement('img');

	imgObj.src = imageSrc;
	imgObj.setAttribute('id', imageId);

	if (clssName)
		imgObj.className = clssName;

	targetElement.appendChild(imgObj);
}

function appendCircleElement(circleId, circleClass, targetElement) {
	var circleObj = document.createElement('div');

	circleObj.setAttribute('id', circleId);
	circleObj.className = circleClass;

	targetElement.appendChild(circleObj);
}

function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    choiceQuestionContainer = document.createElement('div'),
	    blockMax = Math.max.apply(null, gameManager.trainTextArray).toString().length,
	    blockMax2 = gameManager.CURRENT_ANSWER.toString().length,
	    choiceLeft = 0,
	    choiceright = 0,
	    choiceTop;

	switch (gameManager.choiceQuestion.length) {
	case 1 :
		choiceLeft = 240;
		break;
	case 2 :
		choiceLeft = 150;
		if (gameManager.CURRENT_TYPE === 'picture')
			choiceLeft = 960;
		if (gameManager.CURRENT_TYPE === 'basketball')
			choiceLeft = 185;
		if (gameManager.CURRENT_TYPE === 'compare')
			choiceLeft = 604;
		break;
	case 3 :
		gameManager.choiceQuestion
		choiceLeft = 60;
		if (gameManager.CURRENT_TYPE === 'picture')
			choiceLeft = 320;
		if (gameManager.CURRENT_TYPE === 'colorpencilRibbon')
			choiceLeft = 40;
		if (gameManager.CURRENT_TYPE === 'vic_rabbitcave')
			choiceLeft = -42;
		if (gameManager.CURRENT_TYPE === 'fishing')
			choiceLeft = 160;
		if (gameManager.CURRENT_TYPE === 'train')
			choiceLeft = 210;
		if (gameManager.CURRENT_TYPE === 'train2')
			choiceLeft = -80;
		if (gameManager.CURRENT_TYPE === 'vic_submarine')
			choiceLeft = -80;
		if (gameManager.CURRENT_TYPE === 'vic_pea')
			choiceLeft = -6;
		if (gameManager.CURRENT_TYPE === 'numStick')
			choiceLeft = -55;
		if (gameManager.CURRENT_TYPE === 'vic_balloon2')
			choiceLeft = 1080;
		if (gameManager.CURRENT_TYPE === 'dessert')
			choiceLeft = 210;
		if (gameManager.CURRENT_TYPE === 'piggyBank')
			choiceLeft = 1050;
		if (gameManager.CURRENT_TYPE === 'ballon')
			choiceLeft = 1082;
		if (gameManager.CURRENT_TYPE === 'lotto')
			choiceLeft = 912;
		if (gameManager.CURRENT_TYPE === 'vic_basketball')
			choiceLeft = 35;
		if (gameManager.CURRENT_TYPE === 'vic_basketball')
			choiceLeft = 3;
		if (gameManager.CURRENT_TYPE === 'lock')
			choiceLeft = 890;
		if (gameManager.CURRENT_TYPE === 'digital_balance')
			choiceLeft = 1046;
		if (gameManager.CURRENT_TYPE === 'pencil')
			choiceLeft = 1082;
		if (gameManager.CURRENT_TYPE === 'beadRead')
			choiceLeft = -216;
		if (gameManager.CURRENT_TYPE === 'camping')
			choiceLeft = -165;
		if (gameManager.CURRENT_TYPE === 'vic_monkey')
			choiceLeft = 48;
		if (gameManager.CURRENT_TYPE === 'block_multi')
			switch(blockMax2) {
			case 1 :
				choiceLeft = 100;
				break;
			case 2 :
				choiceLeft = 100;
				break;
			case 3 :
				choiceLeft = 70;
				break;
			case 4 :
				choiceLeft = -15;
				break;
			case 5 :
				choiceLeft = -142;
				break;
			case 6 :
				choiceLeft = 100;
				break;
			}
		if (gameManager.CURRENT_TYPE === 'block')
			switch(blockMax) {
			case 1 :
				choiceLeft = 100;
				break;
			case 2 :
				choiceLeft = 70;
				break;
			case 3 :
				choiceLeft = -15;
				break;
			case 4 :
				choiceLeft = -142;
				break;
			case 5 :
				choiceLeft = -100;
				break;
			}
		if (gameManager.CURRENT_TYPE === 'mathToy')
			choiceLeft = 93;
		if (gameManager.CURRENT_TYPE === 'vic_mathToy')
			choiceLeft = 95;
		break;
	case 4 :
		choiceLeft = -50;
		if (gameManager.CURRENT_TYPE === 'vic_scale1' || gameManager.CURRENT_TYPE === 'vic_scale2'){
			choiceLeft = 1075;
		}
		if (gameManager.CURRENT_TYPE === 'vic_squirrel'){
			choiceLeft = 220;
		}
		break;
		
	case 5 :
		choiceLeft = -150;
		break;
	}

	choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');
	bgCanvas.appendChild(choiceQuestionContainer);

	switch (gameManager.CURRENT_TYPE) {
		
	case 'numStick':
		choiceTop = 580;
		break;
	case 'train':
		choiceTop = 570;
		break;
	case 'lotto':
		choiceTop = -115;
		break;
	case 'lock':
		choiceTop = -142;
		break;
	case 'train2':
		choiceTop = 560;
		break;
	case 'vic_submarine':
		choiceTop = 560;
		break;
	case 'vic_rabbitcave':
		choiceTop = 550;
		break;
	case 'vic_pea':
		choiceTop = 580;
		break;
	case 'dessert':
		choiceTop = 598;
		break;
	case 'piggyBank':
		choiceTop = -115;
		break;
	case 'vic_monkey':
		choiceTop = 585;
		break;
	case 'vic_scale1':
		choiceTop = -60;
		break;
	case 'vic_scale2':
		choiceTop = -60;
		break;
	case 'ballon':
		choiceTop = -155;
		break;
	case 'digital_balance':
		choiceTop = -155;
		break;
	case 'pencil':
		choiceTop = -115;
		break;
	case 'colorpencilRibbon':
		choiceTop = 570;
		break;
	case 'picture':
		choiceTop = -20;
		break;
	case 'mathToy':
		choiceTop = 450;
		break;
	case 'vic_mathToy':
		choiceTop = 450;
		break;
	case 'compare':
		choiceTop = -25;
		break;
	case 'camping':
		choiceTop = 525;
		break;
	case 'vic_balloon2':
		choiceTop = -130;
		break;
	case 'fishing':
	default:
		choiceTop = 580;
		break;

	}

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		var currentQuestion;
		if (imgSrcArray) {

			var choiceQuestionGroup = document.createElement('div'),
			    className = imgSrcArray[0].split('/');

			className = className[className.length - 1];
			className = className.split('_');

			choiceQuestionGroup.setAttribute('id', 'choiceQuestionGroup_' + i);
			choiceQuestionContainer.appendChild(choiceQuestionGroup);

			if (gameManager.CURRENT_TYPE === 'camping' || gameManager.CURRENT_TYPE === 'vic_monkey' || gameManager.CURRENT_TYPE === 'vic_balloon2' ) {
				appendImageElement('choiceQuestion_' + i, imgSrcArray[i], choiceQuestionGroup);
				currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
				currentQuestion.className = className[0];

			} else if (gameManager.CURRENT_TYPE === 'block' || gameManager.CURRENT_TYPE === 'block_multi') {
				appendImageElement('choiceQuestion_' + i, imgSrcArray, choiceQuestionGroup);
				currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
				currentQuestion.className = 'block';

			} else if (gameManager.CURRENT_TYPE === 'vic_squirrel') {
				appendImageElement('choiceQuestionBg', imgSrcArray[0], choiceQuestionGroup);
				currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
				currentQuestion.className = 'circle';
				if(i === 1 || i === 3){
					choiceTop = 115;
				}else{
					choiceTop = 190;
				}
			} else if (gameManager.CURRENT_TYPE === 'numStick') {
				appendImageElement('choiceQuestion_' + i, imgSrcArray[i], choiceQuestionGroup);
 				currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
 				currentQuestion.className = 'rect';

			}else if (gameManager.CURRENT_TYPE === 'basketball') {

				appendImageElement('choiceQuestion_' + i, imgSrcArray[i], choiceQuestionGroup);
				currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
				currentQuestion.className = 'basketball';

			} else if (gameManager.CURRENT_TYPE === 'vic_basketball') {

				appendImageElement('choiceQuestion_' + i, imgSrcArray[i], choiceQuestionGroup);
				currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
				currentQuestion.className = 'basketball';

			} else if (gameManager.CURRENT_TYPE === 'vic_scale1' || gameManager.CURRENT_TYPE === 'vic_scale2') {
				appendImageElement('choiceQuestionBg', imgSrcArray[i], choiceQuestionGroup);
				currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
				currentQuestion.className = 'circle';

			}else if (gameManager.CURRENT_TYPE === 'vic_bowling') {

				appendImageElement('choiceQuestion_' + i, imgSrcArray[i], choiceQuestionGroup);
				currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
				currentQuestion.className = 'bowling';

			}else if (gameManager.CURRENT_TYPE === 'compare') {

				appendImageElement('choiceQuestion_' + i, imgSrcArray[i], choiceQuestionGroup);
				currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
				currentQuestion.className = 'compare';

			} else {
				var imgIndex = parseInt(Math.random() * 3);

				log(imgIndex);
				appendImageElement('choiceQuestion_' + i, imgSrcArray[imgIndex], choiceQuestionGroup);
				currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
				currentQuestion.className = className[0];
			}

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
		}

		switch (gameManager.CURRENT_TYPE) {
		case 'vic_squirrel':
			choiceLeft = choiceLeft + 160;
			break;
		case 'piggyBank':
			choiceTop = choiceTop + 220;
			break;
		case 'vic_balloon2':
			choiceTop = choiceTop + 230;
			break;
		case 'ballon':
			choiceTop = choiceTop + 220;
			break;
		case 'digital_balance':
			choiceTop = choiceTop + 230;
			break;
		case 'vic_scale1':
			choiceTop = choiceTop + 170;
			break;
		case 'vic_scale2':
			choiceTop = choiceTop + 170;
			break;
		case 'vic_monkey':
			choiceLeft = choiceLeft + 280;
			break;
		case 'pencil':
			choiceTop = choiceTop + 220;
			break;
		case 'compare':
			choiceTop = choiceTop + 220;
			break;
		case 'picture':
			choiceTop = choiceTop + 260;
			break;
		case 'beadRead':
			choiceLeft = choiceLeft + 370;
			break;
		case 'train2':
			choiceLeft = choiceLeft + 310;
			break;
		case 'vic_submarine':
			choiceLeft = choiceLeft + 320;
			break;
		case 'vic_rabbitcave':
			choiceLeft = choiceLeft + 320;
			break;
		case 'vic_pea':
			choiceLeft = choiceLeft + 300;
			break;
		case 'lotto':
			choiceTop = choiceTop + 220;
			break;
		case 'lock':
			choiceTop = choiceTop + 220;
			break;
		case 'camping':
			choiceLeft = choiceLeft + 350;
			break;
		case 'mathToy':
			choiceLeft = choiceLeft + 230;
			break;
		case 'vic_mathToy':
			choiceLeft = choiceLeft + 230;
			break;
		case 'numStick':
			choiceLeft = choiceLeft + 320;
			break;
		case 'basketball':
			choiceLeft = choiceLeft + 280;
			break;
		case 'vic_basketball':
			choiceLeft = choiceLeft + 27;
			break;
		case 'vic_bowling':
			choiceLeft = choiceLeft + 280;
			break;
		case 'colorpencilRibbon':
			choiceLeft = choiceLeft + 280;
			break;
		case 'block_multi':
			switch(blockMax2) {
			case 1 :
				choiceLeft = choiceLeft + 250;
				break;
			case 2 :
				choiceLeft = choiceLeft + 250;
				break;
			case 3 :
				choiceLeft = choiceLeft + 250;
				break;
			case 4 :
				choiceLeft = choiceLeft + 280;
				break;
			case 5 :
				choiceLeft = choiceLeft + 330;
				break;
			case 6 :
				choiceLeft = choiceLeft + 250;
				break;
			}

			break;

		case 'block':
			switch(blockMax) {
			case 1 :
				choiceLeft = choiceLeft + 250;
				break;
			case 2 :
				choiceLeft = choiceLeft + 250;
				break;
			case 3 :
				choiceLeft = choiceLeft + 280;
				break;
			case 4 :
				choiceLeft = choiceLeft + 330;
				break;
			case 5 :
				choiceLeft = choiceLeft + 250;
				break;
			}

			break;
		default:
			choiceLeft = choiceLeft + 200;
			break;
		}

		if (gameManager.CURRENT_TYPE === 'scale') {
			choiceTop = gameManager.scaleQuestionPosition[i][0];
			choiceLeft = gameManager.scaleQuestionPosition[i][1];
		}

		currentQuestion.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');
		// 버튼의 top 위치값을 조절

		if (gameManager.CURRENT_TYPE === 'vic_basketball') {
			currentQuestion.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + '%;');
		}

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';

			switch (gameManager.CURRENT_TYPE) {
			case 'train':
				imgObjText.setAttribute('style', 'top: 30px; left: 40px;');
				break;
			case 'train2':
				imgObjText.setAttribute('style', 'top: 31px; left: 13px;');
				break;
			case 'piggyBank':
				imgObjText.setAttribute('style', 'top: 30px; left: 40px;');
				break;
			case 'vic_scale1':
				imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
				break;
			case 'vic_scale2':
				imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
				break;
			case 'vic_squirrel':
				imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
				break;
			case 'piggyBank':
				imgObjText.setAttribute('style', 'top: 30px; left: 40px;');
				break;
			case 'lotto':
				imgObjText.setAttribute('style', 'top: 30px; left: 40px;');
				break;
			case 'vic_monkey':
				imgObjText.setAttribute('style', 'top: 0px;');
				break;
			case 'vic_submarine':
				imgObjText.setAttribute('style', 'top: 48px;');
				break;
			case 'vic_rabbitcave':
				imgObjText.setAttribute('style', 'top: 67px;');
				break;
			case 'vic_pea':
				imgObjText.setAttribute('style', 'top: 37px;');
				break;
			case 'block_multi':

				imgObjText.className = 'blockText';

				switch(blockMax2) {
				case 1:
					imgObjText.setAttribute('style', 'top: 30px; text-align:right; letter-spacing:25px; width:70px;');
					break;
				case 2:
					imgObjText.setAttribute('style', 'top: 30px; text-align:right; letter-spacing:25px; width:126px;');
					break;
				case 3:
					imgObjText.setAttribute('style', 'top: 30px; text-align:right; letter-spacing:26px; width:182px;');
					break;
				case 4:
					imgObjText.setAttribute('style', 'top: 30px; text-align:right; letter-spacing:29px; width:242px;');
					break;
				case 5:
					imgObjText.setAttribute('style', 'top: 32px; text-align:right; letter-spacing:28px; width:298px;');
					break;
				case 6:
					imgObjText.setAttribute('style', 'top: 32px; text-align:right; letter-spacing:28px; width:300px;');
					break;
				}

				break;
			case 'block':

				imgObjText.className = 'blockText';

				switch(blockMax) {
				case 1:
					imgObjText.setAttribute('style', 'top: 30px; text-align:right; letter-spacing:25px; width:126px;');
					break;
				case 2:
					imgObjText.setAttribute('style', 'top: 30px; text-align:right; letter-spacing:26px; width:182px;');
					break;
				case 3:
					imgObjText.setAttribute('style', 'top: 30px; text-align:right; letter-spacing:29px; width:242px;');
					break;
				case 4:
					imgObjText.setAttribute('style', 'top: 32px; text-align:right; letter-spacing:28px; width:298px;');
					break;
				}
				
				break;

			case 'camping':
				imgObjText.setAttribute('style', 'top: 63px; left: 0px;');
				break;
			case 'mathToy':
				imgObjText.setAttribute('style', 'top: 17px; left: 25px;');
				break;
			case 'vic_mathToy':
				imgObjText.setAttribute('style', 'top: 22px; left: 2px;');
				break;
			case 'fishing':
			default:
				imgObjText.setAttribute('style', 'top: 40px; left: 0px;');
				break;

			}

			imgObjText.innerHTML = gameManager.choiceQuestionText[i];

			choiceQuestionGroup.appendChild(imgObjText);

		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestionText[i];
			//넣어준 값을 받아옴
		}

		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);
		//정답을 판별

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
		//클릭후 바운스후 제자리로 돌아옴

		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
		} else {
			currentQuestion.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				switch (gameManager.CURRENT_TYPE){
					case 'compare':
						compareCompareAnswer(this);
					break;
					case 'colorpencilRibbon':
						riboonCompareAnswer(this);
					break;
					default : 
						compareAnswer(this);
					break;
				}
				
				//정답을 클릭할경우 반응

			}, false);
		}
	}
}

function compareAnswer(dragObj) {
	log(dragObj.getAttribute('answerValue'));

	if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))) {
		//getAttribute = 요소의 클래스 속성의 값을 가져옴
		//parseInt = 문자열을 구문 분석하고 정수를 반환합니다.

		log('@ correct!!');
		gameOver(dragObj);
		// switch (gameManager.CURRENT_TYPE) {
		// case 'colorpencilRibbon':
		// 	if(!gameManager.flag){
		// 		Pensilposi();
		// 	}
		// 	gameOver(dragObj);
		// 	break;
		// }


	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');


		switch (gameManager.CURRENT_TYPE) {
		case 'frog' :
			log('@ frog!');
			streamSound.setSound('../../media/incorrect.mp3');
			break;
		}

		logCounter.tryCounter();
	}
}



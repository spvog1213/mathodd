function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendCircleElement('answerObject', 'circle', document.getElementById('bgCanvas'));
	appendCircleElement('questionBox', 'txt', document.getElementById('bgCanvas'));
	appendCircleElement('question1', 'question1', document.getElementById('questionBox'));


	
	var circleAnswer = document.querySelector('#answerObject');

	appendChoiceQuestion('click', gameManager.choiceQuestion);
}

function initBus() {
	log('initBus...');

	var Num1 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0]),
	Num2 = parseInt(gameManager.TOTAL_ANSWER_ARRAY[1]),
	Question1 = document.querySelector('#question1'),
	back1 = document.querySelector('#back1'),
	questionBox = document.querySelector('#questionBox'),
	busHi = document.querySelector('#busHi'),
	child = document.createElement('img'),
	catB = document.createElement('img');

	child.setAttribute('id','child');
	catB.setAttribute('id','catB');

	back1.setAttribute('style', 'position: absolute; top: 20px; left: 300px;');
	child.setAttribute('style', 'position: absolute; left: 120px; top: 20px; z-index: 0;');
	catB.setAttribute('style', 'position: absolute; left: 120px; top: 40px; z-index: 0;');

	// var randomChild = Math.floor((Math.random() * 2) + 1);
	child.src = 'images/weighing_cat1_0.png';
	catB.src = 'images/weighing_cat2_0.png';

	choiceQuestion_0.appendChild(child);
	choiceQuestion_1.appendChild(catB);
	Question1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[2];
	appendImageElement('catScaleTxt', 'images/00.png', document.querySelector('#question1'),'catScaleTxTBox');
}	

function childClick() {
	var child = document.querySelector('#child'),
	childSrc = child.src,
	childObj = childSrc.split('_');
	childObj = childObj.slice('-1');

	btnDown = function(e) {
		e.preventDefault();
	}
	btnUp = function(e) {
		e.preventDefault();
		childClickMotion();
		child.style.pointerEvents = 'none';
		streamSound.setSound('media/bus_char_3.wav');

		setTimeout(function(){
			child.src = 'images/busstop_char_' + childObj;
			child.style.pointerEvents = 'auto';
		},1000)
	}
}

function catCorrectAnswerAnimation(dragObj){

	if(dragObj.id === 'choiceQuestion_1'){
		var catB = document.querySelector('#catB'),
		catBSrc = catB.src,
		sadcatB = catBSrc.replace('.png',''),
		catBSplit = sadcatB.slice(0,-2),
		backAnser = dragObj.childNodes[1],
		backAnserSrc = backAnser.src,

		catBArray = [catBSplit + '_success_1.png',catBSplit + '_success_2.png',catBSplit + '_success_3.png',catBSplit + '_success_4.png'];

		setTimeout(function() {
			var bb = parseInt(catBArray.length) * 80;
			var index = 0;
			animate({
				delay : 80,
				duration : bb,
				delta : makeEaseInOut(linear),
				step : function(delta) {
					catB.src = catBArray[index];
					index ++;
				}
			});
			spriteAnimation(catBArray, catB);

			backAnser.setAttribute('src',backAnserSrc.replace('1.png','2.png'));
			


		}, 10);

	}else{
		var child = document.querySelector('#child'),
		childSrc = child.src,
		sadChild = childSrc.replace('.png',''),
		childeSplit = sadChild.slice(0,-2),
		backAnser = dragObj.childNodes[1],
		backAnserSrc = backAnser.src,

		childArray = [childeSplit + '_success_1.png',childeSplit + '_success_2.png',childeSplit + '_success_3.png',childeSplit + '_success_4.png'];

		setTimeout(function() {
			var aa = parseInt(childArray.length) * 80;
			var index = 0;
			animate({
				delay : 80,
				duration : aa,
				delta : makeEaseInOut(linear),
				step : function(delta) {
					child.src = childArray[index];
					index ++;
				}
			});
			spriteAnimation(childArray, child);

			backAnser.setAttribute('src',backAnserSrc.replace('1.png','2.png'));
			streamSound.setSound('media/weighing_success.wav');

			log(backAnser);

		}, 10);
	}
}

function childClickMotion(dragObj){
	var child = document.querySelector('#child'),
	childSrc = child.src,
	sadChild = childSrc.replace('.png',''),
	childeSplit = sadChild.slice(0,-2),
	
	catB = document.querySelector('#catB'),
	catBSrc = catB.src,
	sadcatB = catBSrc.replace('.png',''),
	catBSplit = sadcatB.slice(0,-2);

	dragObj.style.pointerEvents = 'none';

	if(dragObj.id === 'choiceQuestion_0'){
		var childArray = [childeSplit + '_fail_1.png',childeSplit + '_fail_2.png',childeSplit + '_fail_3.png',childeSplit + '_fail_4.png',];
		setTimeout(function() {
			var aa = parseInt(childArray.length) * 80;
			var index = 0;
			animate({
				delay : 80,
				duration : aa,
				delta : makeEaseInOut(linear),
				step : function(delta) {
					child.src = childArray[index];
					index ++;
				}
			});
			spriteAnimation(childArray, child);
		}, 10);

		setTimeout(function() {
			var backCat = childSrc.slice(0, -5),
				childOrigin = child.src;

				child.setAttribute('src',childSrc.replace('fail_4.png','0'));
				dragObj.style.pointerEvents = 'auto';

		}, 1000);


	}else{
		catBArray = [catBSplit + '_fail_1.png',catBSplit + '_fail_2.png',catBSplit + '_fail_3.png',catBSplit + '_fail_4.png'];
		setTimeout(function() {
			var aa = parseInt(catBArray.length) * 80;
			var index = 0;
			animate({
				delay : 80,
				duration : aa,
				delta : makeEaseInOut(linear),
				step : function(delta) {
					catB.src = catBArray[index];
					index ++;
				}
			});
			spriteAnimation(catBArray, catB);
		}, 10);

		setTimeout(function() {
			var backCat = catBSrc.slice(0, -5),
				childOrigin = catB.src;

				catB.setAttribute('src',catBSrc.replace('fail_4.png','0'));
				dragObj.style.pointerEvents = 'auto';

		}, 1000);

	}
	
}


function busBye(){
	var busHi = document.querySelector('#busHi'),
	child = document.querySelector('#child');


	var busHiLeft = parseInt(busHi.style.left),
	childLeft = parseInt(child.style.left),
	left = -1070;

	setTimeout(function() {
		var aa = parseInt(spriteArray.length) * 100;
		var index = 0;
		animate({
			delay : 100,
			duration : aa,
			delta : makeEaseInOut(linear),
			step : function(delta) {
				// log('@ sprite!');
				busMotion.src = spriteArray[index];
				busHi.style.left = ((left * delta) + busHiLeft) + 'px';
				child.style.left = ((left * delta) + childLeft) + 'px';
				index ++;

			}
		});
		spriteAnimation(spriteArray, busMotion);
	}, 100);


}


function gameOver(currentObj, dragObj, x, y) {
	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}

	var child = document.querySelector('#child'),
	childSrc = child.src;

	setTimeout(function(){
		// child.style.display ='none';

	},1200)
	setTimeout(function(){	
		child.style.pointerEvents = 'none';
	},1700)
	// busMotioncorrect();

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	
	setTimeout(function(){
		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');
	},600)

	setTimeout(function() {
		log('excute stampStarIcon!');
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);


}


function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceLeft = 0,
	choiceTop = 300;

	switch (gameManager.choiceQuestion.length) {
		case 1 :
		choiceLeft = 240;
		break;
		case 2 :
		choiceLeft = -430;
		break;
		case 3 :
		choiceLeft = 1041;
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

		var scaleWeightingMachine,
		currentQuestion;
		
		if (imgSrcArray) {

			var choiceQuestionGroup = document.createElement('div'),
			className = imgSrcArray[0].split('/');
			className = className[className.length - 1];
			className = className.split('_');

			choiceQuestionGroup.setAttribute('id', 'choiceQuestionGroup_' + i);
			choiceQuestionContainer.appendChild(choiceQuestionGroup);


			log(imgIndex);
			appendImageElement('choiceQuestion_' + i, imgSrcArray[0], choiceQuestionGroup);
			currentQuestion = document.querySelector('#choiceQuestionGroup_' + i);
			currentQuestion.className = className[0];

		} else {
			appendCircleElement('choiceQuestion_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
			currentQuestion = document.querySelector('#choiceQuestion_' + i);
			log(currentQuestion);
		}

		choiceLeft = choiceLeft + 600;

		currentQuestion.setAttribute('style', 'top:' + choiceTop + 'px;left:' + choiceLeft + 'px; color:#fff;');

		if (imgSrcArray) {
			var imgObjText = document.createElement('div');
			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = className[0] + 'Text';
			imgObjText.setAttribute('style', 'top: 20px; left: 30px;');
			imgObjText.innerHTML = gameManager.choiceQuestion[i];
			choiceQuestionGroup.appendChild(imgObjText);
		} else {
			currentQuestion.innerHTML = gameManager.choiceQuestion[i] + 'kg';
			appendImageElement('scaleWeightingMachine', 'images/weighing_machine_1.png', document.querySelector('#choiceQuestion_' + i));
		}
		currentQuestion.setAttribute('answerValue', gameManager.choiceQuestion[i]);
		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
		if (buttonType === 'drag') {
			new Dragdrop(currentQuestion);
		} else {
			currentQuestion.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				
				catAnswer(this);
			}, false);
		}
	}
}



function catAnswer(dragObj) {
	log(dragObj.getAttribute('answerValue'));

	if (gameManager.CURRENT_ANSWER[0] === parseFloat(dragObj.getAttribute('answerValue'))) {
		//getAttribute = 요소의 클래스 속성의 값을 가져옴
		//parseInt = 문자열을 구문 분석하고 정수를 반환합니다.
		streamSound.setSound('media/weighing_success.wav');
		catCorrectAnswerAnimation(dragObj);

		log('@ correct!!');
		gameOver(dragObj);

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		// streamSound.setSound('../../media/incorrect.mp3');
		streamSound.setSound('media/weighing_fail.wav');


		childClickMotion(dragObj);


		logCounter.tryCounter();
	}
}

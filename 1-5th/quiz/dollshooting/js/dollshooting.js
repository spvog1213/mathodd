
function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
    // parent.window.initClockTimer();

    answerTxt();
  	
  	appendImageElement('bottom', 'images/dollshooting_bottom.png', bgCanvas);
	bottom.setAttribute('style','position: absolute; bottom: 0px; left: 10px; width: 1336px; z-index: 11;');
    gameManager.choiceBgImgArray = ['images/dollshooting_bear_success_1.png', 'images/dollshooting_rabbit_success_1.png', 'images/dollshooting_panda_success_1.png'];
    appendSelectQuestion('click', gameManager.choiceQuestion, gameManager.choiceBgImgArray);


    appendCircleElement('handGroup' ,'hand', document.querySelector('#pierrotboxContainer'));
    for(var i = 0; i < 3; i ++){	
    	appendImageElement('hand', 'images/dollshooting_success_hand_0.png', document.querySelector('#handGroup'));
    }
    
    if(escape(gameManager.TOTAL_ANSWER_ARRAY[1]).length == 2){
    	var quetxtGroup = document.querySelector('#quetxtGroup');
    	quetxtGroup.style.left = '38px';
    }



}

function answerTxt() {
	appendCircleElement('answerText','txt', document.querySelector('#queTxt'));
	appendCircleElement('quetxtGroup','txt', document.querySelector('#queTxt'));
	appendCircleElement('lineTxt' ,'txt', document.querySelector('#quetxtGroup'));

	quetxtGroup.setAttribute('style','left: 48px;');

	lineTxt.innerHTML ='----';
    lineTxt.setAttribute('style','left: -13px; top: 5px');

    answerText.innerHTML = '이 ' + gameManager.TOTAL_ANSWER_ARRAY[1] + '개인 수는?' ;
    answerText.setAttribute('style','width: 523px;');
    
    for(var que = 0; que < 3; que++){
    	appendCircleElement('queText' + que,'txt', document.querySelector('#quetxtGroup'));
		var queText = document.querySelector('#queText' + que);
		queText.setAttribute('answerValue',gameManager.TOTAL_ANSWER_ARRAY[0][que]);
		queText.innerHTML=gameManager.TOTAL_ANSWER_ARRAY[0][que];

		if(que === 0){
			queText.innerHTML = '';
		}
	}

	var queText1 = document.querySelector('#queText1'),
		queText2 = document.querySelector('#queText2'),
		a1 = escape(gameManager.TOTAL_ANSWER_ARRAY[0][1]),
		a2 = escape(gameManager.TOTAL_ANSWER_ARRAY[0][2]);
	if(a1.length == 2 && a2.length == 1){
		queText1.style.left ='-15px';
	}else if(a2.length == 2 && a1.length == 1){
		queText2.style.left ='-15px';
	}else if(a1.length == 2 && a2.length == 2){
		queText1.style.left ='-15px';
		queText2.style.left ='-15px';
	}
	
}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceTop = 280;
	choiceLeft = -130;

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

			var imgIndex = parseInt(Math.random() * 3);
			appendImageElement('choiceBg', imgSrcArray[i], choiceQuestionGroup);
			choiceQuestionGroup = document.querySelector('#choiceQuestionGroup_' + i);
			choiceQuestionGroup.className = 'rect';

			choiceLeft = choiceLeft + 340;

			choiceQuestionGroup.setAttribute('style', 'top:' + choiceTop + 'px;left: ' + choiceLeft + 'px;');

			/*대분수*/
			appendCircleElement('coicetxt' + i,'coicetxt', choiceQuestionGroup);
			appendCircleElement('coicetxt' + i,'coicetxt', choiceQuestionGroup);
			appendCircleElement('lineTxt' ,'txt', choiceQuestionGroup);
			
			var big = choiceQuestionGroup.childNodes[2],
				small = choiceQuestionGroup.childNodes[3],
				line = choiceQuestionGroup.childNodes[4];

				
			for(var a = 2; a < gameManager.TOTAL_ANSWER_ARRAY.length; a++){
				big.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[i+2][0];
				small.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[i+2][1];
				line.innerHTML = '----';

				big.setAttribute('answerValue',gameManager.TOTAL_ANSWER_ARRAY[i+2][0]);
				small.setAttribute('answerValue',gameManager.TOTAL_ANSWER_ARRAY[i+2][1]);

				big.setAttribute('style','position: absolute; left: 55px; top: 61px;');
				small.setAttribute('style','top: 33px; left: 101px;');
				line.setAttribute('style','top: 45px; left: 85px; line-height: 110px;');

				var a1 = escape(gameManager.TOTAL_ANSWER_ARRAY[i+2][1]),
					a2 = escape(gameManager.TOTAL_ANSWER_ARRAY[i+2][2]);

				if(gameManager.TOTAL_ANSWER_ARRAY[i+2][0] === 0 && a1.length == 1 ){
					big.innerHTML = '';
					choiceQuestionGroup.style.paddingLeft = '0px';
					small.style.left = '89px';
					line.style.left = '72px';
				}else if(gameManager.TOTAL_ANSWER_ARRAY[i+2][0] === 0 && a1.length == 2 || gameManager.TOTAL_ANSWER_ARRAY[i+2][0] === 0 && a2.length == 2){
					big.innerHTML = '';
					small.style.left = '73px';
					choiceQuestionGroup.style.paddingLeft = '0px';
					line.style.left = '72px';
				}else if(a1.length == 2|| a2.length == 2){
					small.style.left = '86px';
				}
			}

			appendImageElement('numBox', 'images/dollshooting_numbox_none.png', choiceQuestionGroup);

		} else {
			appendCircleElement('choiceQuestionGroup_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
		}
		
		choiceQuestionGroup.setAttribute('answerValue', gameManager.choiceQuestion[i]);

		gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);


		if (buttonType === 'drag') {
			new Dragdrop(choiceQuestionGroup);
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
		},450)

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

function correctMotion(dragObj) {
	var ch_img = dragObj.childNodes[1],
		handGroup = document.querySelector('#handGroup');
		ch_imgSrc = ch_img.src
		obj = ch_imgSrc.split('_');
		obj = obj.slice(-3);
		objanimal = obj[0];
		dragId = dragObj.id;
		dragIdobj = dragId.split('_');
		dragIdobj = dragIdobj.slice(-1);


		animalArray = ['images/dollshooting_' + objanimal +'_success_2.png','images/dollshooting_' + objanimal +'_success_3.png','images/dollshooting_' + objanimal +'_success_4.png','images/dollshooting_' + objanimal +'_success_5.png','images/dollshooting_' + objanimal +'_success_6.png','images/dollshooting_' + objanimal +'_success_7.png'];
		handArray = ['images/dollshooting_success_hand_1.png','images/dollshooting_success_hand_2.png','images/dollshooting_success_hand_3.png','images/dollshooting_success_hand_4.png','images/dollshooting_success_hand_5.png','images/dollshooting_success_hand_0.png']

		spriteAnimation(animalArray, ch_img);
		spriteAnimation(handArray, handGroup.childNodes[dragIdobj]);


	
}


function spriteAnimation(spriteArray, spriteObj) {
	var index = 0;
	animate({
		delay : 100,
		duration : 600,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}


function compareAnswer(dragObj) {
	var drag1 = dragObj.childNodes[3],
		drag2 = dragObj.childNodes[2];
		drag = dragObj.childNodes[5];
		handGroup = document.querySelector('#handGroup');
		dragSrc = drag.src;

		if (gameManager.CURRENT_ANSWER[0][2] === parseInt(dragObj.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[0][1] === parseInt(drag1.getAttribute('answerValue')) && gameManager.CURRENT_ANSWER[0][0] === parseInt(drag2.getAttribute('answerValue'))) {
		log('@ correct!!');
		gameOver(dragObj);

		drag.setAttribute('src',dragSrc.replace('_none.png','_on.png'));
		correctMotion(dragObj);

		setTimeout(function(){
			var dragobjLeft = parseInt(dragObj.style.left),
			dragobjTop = parseInt(dragObj.style.top),
			dragobjPaddingLeft = parseInt(dragObj.style.paddingLeft);
			chTop = 200;

			animate({
			delay : 50,
			duration : 500,
			delta : makeEaseInOut(linear),
				step : function(delta) {
					dragObj.setAttribute('style','margin-left :' + dragobjLeft +'px; margin-top:' + dragobjTop + 'px; padding-left:' + dragobjPaddingLeft + 'px;');
					dragObj.style.top = ((chTop * delta)) + 'px';
					dragObj.style.pointerEvents = 'none';
				}
			});
		},600)

	} else {
		log('@ incorrect!!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}
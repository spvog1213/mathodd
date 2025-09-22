
function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
    // parent.window.initClockTimer();

  	appendImageElement('bottom', 'images/dollshooting_bottom.png', bgCanvas);
	bottom.setAttribute('style','position: absolute; bottom: 0px; left: 10px; width: 1336px; z-index: 11;');
    gameManager.choiceBgImgArray = ['images/dollshooting_bear_success_1.png', 'images/dollshooting_rabbit_success_1.png', 'images/dollshooting_panda_success_1.png'];
    appendSelectQuestion('click', gameManager.choiceQuestion, gameManager.choiceBgImgArray);

    appendCircleElement('handGroup' ,'hand', document.querySelector('#dollshootingContainer'));
    for(var i = 0; i < 3; i ++){	
    	appendImageElement('hand', 'images/dollshooting_success_hand_0.png', document.querySelector('#handGroup'));
    }
    
    queTxt();
}

function queTxt(){
	appendCircleElement('queTxt_wrap','queTxt_wrap', bgCanvas);
    appendCircleElement('queTxt','queText', document.querySelector('#queTxt_wrap'));
    appendCircleElement('queText1','queText', document.querySelector('#queTxt'));
    appendCircleElement('calculation1','calculation', document.querySelector('#queTxt'));
    appendCircleElement('queText2','queText', document.querySelector('#queTxt'));
    appendCircleElement('calculation2','calculation', document.querySelector('#queTxt'));
    appendCircleElement('queText3','queText', document.querySelector('#queTxt'));

    queText1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
    queText2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
    queText3.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[2];
    


    var cal_1 = gameManager.TOTAL_ANSWER_ARRAY[6],
    	cal_2 = gameManager.TOTAL_ANSWER_ARRAY[7];

    switch(cal_1){
    	case '+':
    		appendImageElement('cal_img', 'images/plus.png', calculation1);
    	break;
    	case '-':
    	appendImageElement('cal_img', 'images/minus.png', calculation1);
    	break;
    	case '/':
    		appendImageElement('cal_img', 'images/division.png', calculation1);
    	break;
    	case '*':
    		appendImageElement('cal_img', 'images/multiplication.png', calculation1);	
    	break;
    }
    switch(cal_2){
    	case '+':
    		appendImageElement('cal_img', 'images/plus.png', calculation2);
    	break;
    	case '-':
    	appendImageElement('cal_img', 'images/minus.png', calculation2);
    	break;
    	case '/':
    		appendImageElement('cal_img', 'images/division.png', calculation2);
    	break;
    	case '*':
    		appendImageElement('cal_img', 'images/multiplication.png', calculation2);	
    	break;
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
	var drag = dragObj.childNodes[2],
		dragSrc = drag.src;
		if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))){
		log('@ correct!!');
		gameOver(dragObj);

		correctMotion(dragObj);

		drag.setAttribute('src',dragSrc.replace('_none.png','_on.png'));

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

function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);

	// log('excute initClockTimer!');
    // parent.window.initClockTimer();

    answerTxt();

    gameManager.choiceBgImgArray = ['images/target_board.png', 'images/target_board.png', 'images/target_board.png'];
    appendSelectQuestion('click', gameManager.choiceQuestion, gameManager.choiceBgImgArray);


    appendCircleElement('handGroup' ,'hand', document.querySelector('#pierrotboxContainer'));
    for(var i = 0; i < 2; i ++){	
    	appendImageElement('hand', 'images/dollshooting_success_hand_0.png', document.querySelector('#handGroup'));
    }
    
}

function answerTxt() {
	appendCircleElement('answerText','txt', document.querySelector('#queTxt'));

	answerText.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length - 1];
	answerText.setAttribute('style','width: 320px; color:#ffea00;');

	appendImageElement('targeTextbox', 'images/target_textbox.png', answerText);

	targeTextbox.setAttribute('style','position:absolute; top:0px; left:0px; z-index:-5;')

}


function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	choiceQuestionContainer = document.createElement('div'),
	choiceTop = 280;
	choiceLeft = -300;

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
			// choiceQuestionGroup.innerHTML = gameManager.choiceQuestionText[i];

			var imgIndex = parseInt(Math.random() * 3);
			appendImageElement('choiceBg', imgSrcArray[i], choiceQuestionGroup);
			choiceQuestionGroup = document.querySelector('#choiceQuestionGroup_' + i);
			choiceQuestionGroup.className = 'rect';

			choiceLeft = choiceLeft + 550;

			// log(gameManager.TOTAL_ANSWER_ARRAY[i].toString().length);

			// log(gameManager.choiceQuestionText[i].toString().length +'뭔데');

			if(parseInt(gameManager.choiceQuestionText[i].toString().length) === 1){
				choiceQuestionGroup.setAttribute('style', 'top:' + choiceTop + 'px;left: ' + choiceLeft + 'px; width:260px;');
			}else{
				choiceQuestionGroup.setAttribute('style', 'top:' + choiceTop + 'px;left: ' + choiceLeft + 'px; width:290px;');
			}

			

			/*대분수*/
			var imgObjText = document.createElement('div');
			fountainText = document.createElement('div'),
			mixedFractionText = document.createElement('div'),
			fountainLine = document.createElement('div'),
			choiceQuestionAllBox = document.createElement('div');

			choiceQuestionAllBox.id = 'choiceQuestionAllBox'; 

			// 대분수
			mixedFractionText.setAttribute('id','fountainText_' + i);
			mixedFractionText.className = 'mixedFraction';
			
			mixedFractionText.innerHTML = gameManager.choiceQuestionText[i] + '의';

			// if(gameManager.choiceQuestionText[i],[1].toString().length === 1){
				
			// }else{
			// 	mixedFractionText.setAttribute('style','position:absolute;top: 0px; left: -30px; font-size:50px;');
			// }

			if(gameManager.choiceQuestionText[i].toString().length === 1){

				mixedFractionText.setAttribute('style','position:absolute;top: 0px; left: 0px; font-size:50px;');

			}else{
				mixedFractionText.setAttribute('style','position:absolute;top: 0px; left: -30px; font-size:50px;');
			}

		

			// log(i + '으악');

			

			imgObjText.setAttribute('id', 'choiceQuestionText_' + i);
			imgObjText.className = 'Text';
			imgObjText.setAttribute('style', 'position:absolute; top: -28px; left: 80px; width: 67px; font-size:50px;');
			imgObjText.innerHTML = gameManager.choiceQuestion[i][1];

			fountainText.setAttribute('id','fountainText_' + i);
			fountainText.className = 'fountain';
			fountainText.setAttribute('style','position:absolute; top: 28px; left: 80px; width:67px; font-size:50px;');
			fountainText.innerHTML = gameManager.choiceQuestion[i][2];

			fountainLine.setAttribute('id','fountainLine');
			fountainLine.className = 'fountainLine';
			fountainLine.innerHTML = '------';



			if(gameManager.choiceQuestion[i][2].toString().length === 1){
				
				fountainLine.setAttribute('style','position:absolute; top: 0px; left: 90px; letter-spacing:-10px');
				choiceQuestionAllBox.setAttribute('style','position:relative; width:140px; height:125px; margin:0 auto;');
				
			}else{
				
				fountainLine.setAttribute('style','position:absolute; top: 0px; left: 84px; letter-spacing:-7px');
				choiceQuestionAllBox.setAttribute('style','position:relative; width:140px; height:125px; margin:0 auto;');

			}



			choiceQuestionAllBox.appendChild(mixedFractionText);
			choiceQuestionAllBox.appendChild(imgObjText);
			choiceQuestionAllBox.appendChild(fountainText);
			choiceQuestionAllBox.appendChild(fountainLine);

			choiceQuestionGroup.appendChild(choiceQuestionAllBox);


		} else {
			appendCircleElement('choiceQuestionGroup_' + i, buttonType === 'drag' ? 'circle' : 'rect', choiceQuestionContainer);
		}
		
		choiceQuestionGroup.setAttribute('answerValue', gameManager.choiceQuestion[[i]]);
		mixedFractionText.setAttribute('targetValue', gameManager.choiceQuestionText[[i]]);

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

	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer');

	choiceQuestionContainer.style.pointerEvents = "none";

	streamSound.setSound('media/target_success.mp3');

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
	// obj = ch_imgSrc.split('_');
	// obj = obj.slice(-3);
	// objanimal = obj[0];
	dragId = dragObj.id;
	dragIdobj = dragId.split('_');
	dragIdobj = dragIdobj.slice(-1);

	var dragObjId = dragObj.id.split('_');


	// log(parseInt(dragObjId[1]) + '뭐니');

	if(parseInt(dragObjId[1]) === 0){
		handArray = ['images/target_success_1_1.png','images/target_success_1_2.png','images/target_success_1_3.png','images/target_success_1_4.png'];
		handGroup.style.left = '110px';
	}else{
		handArray = ['images/target_success_2_1.png','images/target_success_2_2.png','images/target_success_2_3.png','images/target_success_2_4.png'];
		handGroup.style.right = '-40px';
	}
	// spriteAnimation(animalArray, ch_img);
	spriteAnimation(handArray, handGroup.childNodes[dragIdobj]);
}


function spriteAnimation(spriteArray, spriteObj) {
	var index = 0;
	animate({
		delay : 100,
		duration : 400,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}


function compareAnswer(dragObj) {
	var dragObjAnswer = dragObj.getAttribute('answerValue').split(','),
	dragObjChildNodes = dragObj.childNodes[1],
	dragObjDoubleChildNodes = dragObjChildNodes.childNodes[0],
	targetValue = dragObjDoubleChildNodes.getAttribute('targetValue'),
	handGroup = document.querySelector('#handGroup');

	if (gameManager.CURRENT_ANSWER[1][1] === parseInt(dragObjAnswer[1]) && gameManager.CURRENT_ANSWER[1][2] === parseInt(dragObjAnswer[2]) && gameManager.CURRENT_ANSWER[0] === parseInt(targetValue)) {
		log('@ correct!!');
		gameOver(dragObj);

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
					// dragObj.setAttribute('style','margin-left :' + dragobjLeft +'px; margin-top:' + dragobjTop + 'px; padding-left:' + dragobjPaddingLeft + 'px;');
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
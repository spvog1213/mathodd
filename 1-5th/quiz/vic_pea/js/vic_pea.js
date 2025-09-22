
function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
    // parent.window.initClockTimer();
	appendImageElement('peaBg', 'images/vic_pea_pea_bg.png', bgCanvas,'bg');
	appendImageElement('peaFront', 'images/vic_pea_pea_front.png', bgCanvas,'bg');
	appendImageElement('answerObject', 'images/vic_pea_pea_question.png', bgCanvas, 'abso');
	var circleAnswer = document.querySelector('#answerObject');
	circleAnswer.setAttribute('style', 'top: 240px; left: 880px; z-index: 1;');
}

function rabbitcaveInit(){
	var peaContainer = document.getElementById('peaContainer');
	

	setRand(1, 5, 5);
	gameManager.peaArray1 = ['images/vic_pea_pea_'+randResult[0]+'.png','images/vic_pea_pea_'+randResult[1]+'.png','images/vic_pea_pea_'+randResult[2]+'.png','images/vic_pea_pea_'+randResult[3]+'.png'];
	gameManager.choicePeaArray = ['images/vic_pea_pea_'+randResult[4]+'.png','images/vic_pea_pea_'+randResult[4]+'.png','images/vic_pea_pea_'+randResult[4]+'.png'];
	appendChoiceQuestion('drag', gameManager.choiceQuestion, gameManager.choicePeaArray);

	for (var i = 0; i < 4; i++) {
		 appendCircleElement('peaWrap_'+i,'peaImgWrap', peaContainer);
		 appendImageElement('pea_' + i, gameManager.peaArray1[i], document.querySelector('#peaWrap_'+i));
		 appendCircleElement('peaText','peaText', document.querySelector('#peaWrap_'+i));

		 document.querySelector('#peaWrap_'+i).setAttribute('style', 'top:' + gameManager.peaPosition[i][0] + 'px; left:' + gameManager.peaPosition[i][1] + 'px;');
	}
	peaText[0].innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	peaText[2].innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];

	switch(gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length-1]){
    	case '+':
    		appendImageElement('cal_img', 'images/plus.png', peaText[1]);
    	break;
    	case '-':
    	appendImageElement('cal_img', 'images/minus.png', peaText[1]);
    	break;
    	case '/':
    		appendImageElement('cal_img', 'images/division.png', peaText[1]);
    	break;
    	case '*':
    		appendImageElement('cal_img', 'images/multiplication.png', peaText[1]);	
    	break;
    }
	appendImageElement('equals', 'images/equals.png', peaText[3]);

}

function peaClickSound() {
	var peaContainer = document.querySelector('#peaContainer');
	for(var i = 0; i < peaContainer.childNodes.length; i++){
		var peaImgWrap = peaContainer.childNodes[i];
		
		
	peaDown = function(e) {
			e.preventDefault();
			var objId = this.id; 
				objNum = objId.slice(-1),
			streamSound.setSound(gameManager.SoundArray[objNum]);

	}
	peaUp = function(e) {
			e.preventDefault();
			peaClickMotion(this);

	}
		peaImgWrap.addEventListener(gameManager.eventSelector.downEvent, peaDown, false);
		peaImgWrap.addEventListener(gameManager.eventSelector.upEvent, peaUp, false);
	}

}
function gameOver (dragObj) {
var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
	peaContainer = document.querySelector('#peaContainer');

	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		choiceQuestionContainer[i].style.pointerEvents = "none";
	}
	peaContainer.style.pointerEvents = 'none';

	var  peaImgWrap = document.querySelectorAll('.peaImgWrap');

	setTimeout(function(){
		for(var i = 0; i < 4; i++){
			peaGameoverMotion(peaImgWrap[i],(i*400));
		}
		peaGameoverMotion(dragObj,1600);
	},300)

	gameOverAnimation();
	
	logCounter.tryCounter();
	logCounter.endTime();

	setTimeout(function () {
		log('excute stampStarIcon!');
	    // parent.window.stampStarIcon();
	}, 500);
	// save log data 
	setTimeout(function () {
		log('excute insDrillHis!');
	    // parent.window.insDrillHis(logCounter.submitReport());
	}, 2200);


}



function compareAnswer(dragObj) {
	if (gameManager.CURRENT_ANSWER[0] === parseInt(dragObj.getAttribute('answerValue'))) {
		log('@ correct!!');

		document.querySelector("#answerObject").style.display = 'none';

		setTimeout(function(){
			gameOver(dragObj);
		},200)

		streamSound.setSound('media/vic_pea_success.mp3');

	} else {
		log('@ incorrect!!');
		// rabbitIncorrMotion();
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}


function spriteAnimationCustom(spriteArray, spriteObj) {
	var index = 0,
	durationAni = parseInt(spriteArray.length - 1) * 100;

	animate({
		delay : 100,
		duration : durationAni,
		delta : makeEaseOut(quad),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;0
		}
	});

}


function peaGameoverMotion(peass,times){
	var peaTop = 60,
		top = 240;

	setTimeout(function(){
		animate({
			delay : 20,
			duration : 200,
			delta : makeEaseOut(quad),
			step : function(delta) {
				peass.style.top = (+(peaTop * delta) + (-(peaTop - top))) + 'px';
			}
		});
	},times)
}

function peaClickMotion(pea) {
	var top = 240;
	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			pea.style.top = (-(pea.offsetTop * delta) + (+(pea.offsetTop + top))) + 'px';
		}
	});
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

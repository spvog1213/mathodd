
function initScene() {
	log('initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	createElement('div',document.querySelector('#bgCanvas'),'currentAnswer');
	createElement('div',document.querySelector('#bgCanvas'),'quizContainer');
	

	var quizText = createElement('span', document.querySelector('.currentAnswer'),'quizText'),
		currentAnswer = document.querySelector('.currentAnswer');
	
	quizText.innerHTML = '<span>더 ' + '<span class="pointText">' + gameManager.QUIZ_OPTION[0] + '</span>' + ' 것은?</span>';

	appendQuiz('click', gameManager.quizConvertNumber, gameManager.quizImgArray)
}

function gameOver(clickObj) {
	var bgCanvas = document.querySelector('#bgCanvas').childNodes;
	
	for (var i = 0; i < bgCanvas.length; i++) {
 		bgCanvas[i].style.pointerEvents = "none";
 	}

 	logCounter.tryCounter();
	logCounter.endTime();
	gameOverAnimation();

	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
	},40);

	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2300);

}

function appendQuiz(buttonType, quizImgArray, imgSrcArray) {
	var quizContainer = QS('.quizContainer'),
		choiceLeft = 1000,
		choiceTop = 136;

	xRandom = Math.floor((Math.random() * 4) + 1);

	for(var i = 0; i < gameManager.quizConvertNumber.length; i++){
	  	var ruler = createElement('div', quizContainer, 'ruler rulerBox_' + i)
	  	  	ruler.style.background = 'url('+ gameManager.quizImgArray[0][0] +') no-repeat';

	  	var quizObj = createElement('div', quizContainer, 'quizObj quizObj_' + i)
	  		quizObj.style.background =  'url(images/quizObj_' + gameManager.quizConvertNumber[i][0] + '_' + xRandom + '.png) no-repeat';

		  	if(gameManager.quizConvertNumber[i][0] == '1')	{
		  		quizObj.innerHTML = '<span class="rulerNum rulerNum1">' + gameManager.quizConvertNumber[i][1] + '</span><div class="hidden"><img src="images/short_arrow.png" class="arrow1" /><span class=" pointText dap_1">' + gameManager.quizConvertNumber[i][3] +'</span></div><span class="rulerNum rulerNum2">' + gameManager.quizConvertNumber[i][2] + '</span>';
		  	}else if(gameManager.quizConvertNumber[i][0] == '2') {
		  		quizObj.innerHTML = '<span class="rulerNum rulerNum3">' +  gameManager.quizConvertNumber[i][1] + '</span><div class="hidden"><img src="images/long_arrow.png" class="arrow2" /><span class="pointText dap_2">'+ gameManager.quizConvertNumber[i][3] +'</span></div><span class="rulerNum rulerNum4">' +  gameManager.quizConvertNumber[i][2] + '</span>';
		  	}
		  	
	  	var checkObj = createElement('div', quizContainer, 'checkObj checkObj_' + i)
	  		checkObj = document.querySelectorAll('.checkObj');
	  		checkObj[i].style.top = choiceTop + 'px';
	  		checkObj[i].style.left = choiceLeft + 'px';

  		if(i == 1) {
  			checkObj[i].style.top = choiceTop + 260 + 'px';
			gameManager.quizPosition.push([396,choiceLeft]);
  		}

  		appendImageElement('checkImg', 'images/check.png', checkObj[i]);
  		checkObj[i].setAttribute('answerValue', gameManager.quizConvertNumber[i][3]);

  		gameManager.quizPosition.push([choiceTop,choiceLeft]);

	  	checkObj[i].addEventListener('click', function(e) {
	  		e.preventDefault();
	  		clickCompareAnswer(this);

			if(this.getAttribute('answerValue') == gameManager.QUIZ_ANSWER[0]){
			 	this.childNodes[0].src = 'images/check_success.png';

			 	hidden = document.querySelectorAll('.hidden');
	 			console.log('hidden', i, hidden);
	 			for( var j = 0 ; j < hidden.length; j++){	 				
				 	hidden[j].classList.remove('hidden');
	 			}
			}

	  	}, false);
	}

}
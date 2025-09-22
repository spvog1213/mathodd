function initScene() {
	log('initScene...');
	// log(gameManager.QUIZ_OPTION);
	// log(gameManager.QUIZ_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		productTable = createElement('div', bgCanvas, 'productTable'),
		productWrap = createElement('div', productTable, 'productWrap'),
		productCount = gameManager.QUIZ_ANSWER[0] + gameManager.QUIZ_ANSWER[1];

	if(productCount == 9){
		productWrap.style.width = '350px';
		productWrap.style.marginLeft = '59px';
		productWrap.style.marginTop = '35px';
	} else {
		productWrap.style.width = '450px';
		productWrap.style.left = '150px';
		productWrap.style.marginLeft = '7px';
		productWrap.style.marginTop = '35px';
	}
	
	var productArray = [];
	for(var i = 0; i < 2; i ++){
		for(var j = 0; j < gameManager.QUIZ_OPTION[i][1]; j++){
			var product = createElement('div', productWrap, 'product product_' + i + '_'+ j);
			// if(gameManager.QUIZ_OPTION[i][0].length == 3){
			// 	var	productImg = 'url(../../images/common/' + gameManager.QUIZ_OPTION[i][0][0] + '/' + gameManager.QUIZ_OPTION[i][0][1] + '_' + gameManager.QUIZ_OPTION[i][0][2] + '.png)';
			// } else if(gameManager.QUIZ_OPTION[i][0].length == 4){
			// 	var	productImg = 'url(../../images/common/' + gameManager.QUIZ_OPTION[i][0][0] + '/' + gameManager.QUIZ_OPTION[i][0][1] + '_' + gameManager.QUIZ_OPTION[i][0][2] + '_' + gameManager.QUIZ_OPTION[i][0][3] +'.png)';
			// }
			var	productImg = 'url(../../images/common/' + gameManager.QUIZ_OPTION[i][0][0] + '/' + gameManager.QUIZ_OPTION[i][0][1] + '.png)';
			productArray.push(productImg)
			productArray.sort(function() { return 0.5 - Math.random() });

	  	product.addEventListener('click', function(e) {
	  		var target = e.target;
			gameManager.temp = this;
			streamSound.setSound('media/connect.mp3');

			animate({
				delay : 20,
				duration : 800,
				delta : makeEaseOut(elastic),
				step : function(delta) {
					gameManager.temp.style.left = ((-50 * delta) + (50)) + 'px';
				}
			});

	  	}, false);

		}
	}

	productArray.forEach(function (value, idx) {
		productWrap.childNodes[idx].style.background = value;
	});

	var questionTextLeft = -145;

	var questionTextWrap = createElement('div', bgCanvas, 'questionTextWrap'),
		dragWrap = createElement('div', bgCanvas, 'dragWrap');

	for(var i = 2; i < 4; i++){
		var	questionText = createElement('div', questionTextWrap, 'questionText questionText_' + (i - 2));

		if(gameManager.QUIZ_OPTION[i][0] == 'text'){

			questionText.innerHTML = '<span class="textCenter"><span class="verticalMiddle">' + gameManager.QUIZ_OPTION[i][1] + '</span></span>';

		} else if(gameManager.QUIZ_OPTION[i][0] == 'img'){

			if (gameManager.QUIZ_OPTION[i][3]) {
				questionText.innerHTML = '<img src="../../images/common/'+gameManager.QUIZ_OPTION[i][1]+'/'+gameManager.QUIZ_OPTION[i][2]+'.png" width="100px" /><span class="textCenter"><span class="verticalMiddle">'+ gameManager.QUIZ_OPTION[i][3] +'</span></span>';
			} else {
				questionText.innerHTML = '<img src="../../images/common/'+gameManager.QUIZ_OPTION[i][1]+'/'+gameManager.QUIZ_OPTION[i][2]+'.png" width="100px" />';
			}
		}
	}



	var dropLeft = 520;
	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
		var dropArea = createElement('div', bgCanvas, 'dropArea dropArea_' + i),
			blank = document.querySelectorAll('.blank');

		dropLeft = dropLeft + 203;

		dropArea.style.top = '170px';
		dropArea.style.left = dropLeft + 'px';

		var answerValue = gameManager.QUIZ_ANSWER[i];
		dropArea.setAttribute('answerValue', answerValue);
		gameManager.dropArea.push(dropArea);
	}

	appendSelectQuestion('drag', gameManager.quizObj);

}


function gameOver(currentObj) {

	var quizObjContainer = document.querySelector('.quizObjContainer').childNodes;

	for (var i = 0; i < quizObjContainer.length; i++) {
		quizObjContainer[i].style.pointerEvents = "none";
	}

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');
	},500);


	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		parent.window.insDrillHis(logCounter.submitReport());
	}, 2300);

}

function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    quizObjContainer = document.createElement('div'),
	    line = document.createElement('div'),
	    dragContainer = createElement('div', bgCanvas, 'dragContainer'),
	    choiceTop = 300;

	quizObjContainer.setAttribute('class', 'quizObjContainer');
	bgCanvas.appendChild(quizObjContainer);
	for (var i = 0; i < gameManager.quizObj.length; i++) {

		var selectObj,
			dragObj = createElement('div', dragContainer, 'dragObj_' + i),
			X = dragObj.className.split('_')[1];

		if(X % 2 == 1){
		    choiceLeft = 930;
		}else{
			choiceLeft = 725;
			choiceTop = choiceTop + 120;
		}


		selectObj = document.querySelector('.dragObj_' + i)
		selectObj.setAttribute('style', 'left: '+ choiceLeft +'px; Top:' + choiceTop + 'px;');
		selectObj.setAttribute('answerValue', gameManager.quizObj[i]);
		selectObj.innerHTML = gameManager.quizObj[i];
		selectObj.innerHTML                                                                                         

		gameManager.quizPosition.push([choiceTop, choiceLeft]);


		if (buttonType === 'drag') {
			new Dragdrop(selectObj);
		} else {
			selectObj.addEventListener('click', function(e) {
				e.preventDefault();
				log('click');
				compareAnswer(this);

			}, false);
		}
	}
}


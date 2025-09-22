function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	
	var bgCanvas = document.getElementById('bgCanvas'),
		mathTableBg = createElement('div', bgCanvas, 'mathTableBg');
		
	for (var i = 0; i < gameManager.QUIZ_OPTION.length-2; i++) {
		for(var j = 0; j < gameManager.QUIZ_OPTION[0].length; j++){

			quizBox = createElement('div', bgCanvas, 'quizBox quizBox_' + i + '_' + j);
			quizBox.innerHTML = gameManager.QUIZ_OPTION[i][j];	

			quizBox.style.background = 'url(images/spider_waterBox.png)'

			if(gameManager.QUIZ_OPTION[i][j] == ''){
				quizBox.className += ' blank';
				quizBox.style.background = 'url(images/spider_questionBox.png)'
				quizBox.style.textIndent = '-9990px';
				var blankArray = [];
			}
			
			for(var z = 0; z < gameManager.spiderCount.length; z++){
				if(gameManager.spiderCount[z] == gameManager.QUIZ_OPTION[i][j]){
					quizBox.style.background = 'url(images/spider_waterBox.png)';

					quizBox.innerText = '';
					var spiderText = createElement('span', quizBox, 'spiderText hidden');
					spiderText.innerText = gameManager.QUIZ_OPTION[3][z];

					var spider = createElement('div', quizBox, 'spider'),
						spiderImg = createElement('img', spider);
						spiderImg.src = 'images/spider_spider.png';
					spider.style.top = '0px';
					spider.style.left = '0px';

				  	spider.addEventListener('click', function(e) {
				  		e.preventDefault();

						this.childNodes[0].src = 'images/spider_spider_fail.png';

						gameManager.temp = this;
						streamSound.setSound('media/click.mp3');
						animate({
							delay : 20,
							duration : 800,
							delta : makeEaseOut(elastic),
							step : function(delta) {
									gameManager.temp.style.left = ((-40 * delta) + (40)) + 'px';

							}
						});

						setTimeout(function() {
							gameManager.temp.childNodes[0].src = 'images/spider_spider.png';
						}, 500);

				  	}, false);
				}
			}
		}
	}

	if(gameManager.quizObj[0].length < 4){
		mathTableBg.style.background = 'url(images/spider_cobweb_1.png) no-repeat';

		var quizBox_0_0 = QS('.quizBox_0_0'),
			quizBox_0_1 = QS('.quizBox_0_1'),
			quizBox_0_2 = QS('.quizBox_0_2'),
			quizBox_1_0 = QS('.quizBox_1_0'),
			quizBox_1_1 = QS('.quizBox_1_1'),
			quizBox_1_2 = QS('.quizBox_1_2'),
			quizBox_2_0 = QS('.quizBox_2_0'),
			quizBox_2_1 = QS('.quizBox_2_1'),
			quizBox_2_2 = QS('.quizBox_2_2');


		quizBox_0_0.style.top = '35px';
		quizBox_0_0.style.left = '350px';
		quizBox_0_1.style.top = '72px';
		quizBox_0_1.style.left = '560px';
		quizBox_0_2.style.top = '35px';
		quizBox_0_2.style.left = '760px';
		quizBox_1_0.style.top = '160px';
		quizBox_1_0.style.left = '280px';
		quizBox_1_1.style.top = '233px';
		quizBox_1_1.style.left = '560px';
		quizBox_1_2.style.top = '172px';
		quizBox_1_2.style.left = '824px';
		quizBox_2_0.style.top = '321px';
		quizBox_2_0.style.left = '202px';
		quizBox_2_1.style.top = '390px';
		quizBox_2_1.style.left = '560px';
		quizBox_2_2.style.top = '321px';
		quizBox_2_2.style.left = '910px';

	}else {
		mathTableBg.style.background = 'url(images/spider_cobweb_2.png) no-repeat';

		var quizBox_0_0 = QS('.quizBox_0_0'),
			quizBox_0_1 = QS('.quizBox_0_1'),
			quizBox_0_2 = QS('.quizBox_0_2'),
			quizBox_0_3 = QS('.quizBox_0_3'),
			quizBox_1_0 = QS('.quizBox_1_0'),
			quizBox_1_1 = QS('.quizBox_1_1'),
			quizBox_1_2 = QS('.quizBox_1_2'),
			quizBox_1_3 = QS('.quizBox_1_3'),
			quizBox_2_0 = QS('.quizBox_2_0'),
			quizBox_2_1 = QS('.quizBox_2_1'),
			quizBox_2_2 = QS('.quizBox_2_2'),
			quizBox_2_3 = QS('.quizBox_2_3');


		quizBox_0_0.style.top = '22px';
		quizBox_0_0.style.left = '343px';
		quizBox_0_1.style.top = '72px';
		quizBox_0_1.style.left = '480px';
		quizBox_0_2.style.top = '72px';
		quizBox_0_2.style.left = '625px';
		quizBox_0_3.style.top = '22px';
		quizBox_0_3.style.left = '755px';
		quizBox_1_0.style.top = '157px';
		quizBox_1_0.style.left = '234px';
		quizBox_1_1.style.top = '213px';
		quizBox_1_1.style.left = '446px';
		quizBox_1_2.style.top = '213px';
		quizBox_1_2.style.left = '667px';
		quizBox_1_3.style.top = '157px';
		quizBox_1_3.style.left = '875px';
		quizBox_2_0.style.top = '290px';
		quizBox_2_0.style.left = '128px';
		quizBox_2_1.style.top = '378px';
		quizBox_2_1.style.left = '397px';
		quizBox_2_2.style.top = '378px';
		quizBox_2_2.style.left = '705px';
		quizBox_2_3.style.top = '290px';
		quizBox_2_3.style.left = '985px';
	}


	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
		var dropArea = createElement('div', bgCanvas, 'dropArea dropArea_' + i),
			blank = document.querySelectorAll('.blank');

		dropArea.style.top = parseInt(blank[i].style.top) - 21 + 'px'
		dropArea.style.left = parseInt(blank[i].style.left) - 21 + 'px'

		var answerValue = gameManager.QUIZ_ANSWER[i];
		dropArea.setAttribute('answerValue', answerValue);
		gameManager.dropArea.push(dropArea);		
	}
	appendSelectQuestion('drag', dropArea.quizObj);

}


function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    quizObjContainer = document.createElement('div'),
	    line = document.createElement('div'),
	    dragContainer = createElement('div', bgCanvas, 'dragContainer'),
	    choiceTop = 550;

    if(gameManager.quizObj[0].length < 4) choiceLeft = -150;
        else  choiceLeft = -80;

    quizObjContainer.setAttribute('class', 'quizObjContainer');
    bgCanvas.appendChild(quizObjContainer);
    for (var i = 0; i < gameManager.blankCount.length; i++) {

    	var selectObj,
    		dragObj = createElement('div', dragContainer, 'dragObj_' + i),
    		X = dragObj.className.split('_')[1];


    	if(gameManager.quizObj[0].length < 4) choiceLeft = choiceLeft + 350;
    		else choiceLeft = choiceLeft + 250;

		selectObj = document.querySelector('.dragObj_' + i)
		selectObj.setAttribute('style', 'left: '+ choiceLeft +'px; Top:' + choiceTop + 'px;');
		selectObj.style.background = 'url(images/spider_waterBox.png) no-repeat';
		selectObj.setAttribute('answerValue', gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1][i]);
		selectObj.innerHTML = gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1][i];

		gameManager.quizPosition.push([choiceTop, choiceLeft]);

		new Dragdrop(selectObj);
	}
}

function dropCompare (dragObj, x, y) {
	var dragObjValue = dragObj.getAttribute('answervalue');

	for (var i = 0; i < gameManager.dropArea.length; i++) {

		var dropValue = gameManager.dropArea[i].getAttribute('answervalue');
		dropValue = dropValue.split(',');

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight) * gameManager.zoomRate)) {
			for (var j = 0; j < dropValue.length; j++) {
				if (dragObjValue == dropValue[j]) {
					gameManager.dropIdx = i;
					dragObj.style.background = 'url(images/spider_waterBox.png) no-repeat';
					dragObj.style.height = '102px';

					return true;
				}
			}
			return false;
		}
	}
}

function gameOver(currentObj) {

	var quizObjContainer = document.querySelector('.quizObjContainer').childNodes;

	for (var i = 0; i < quizObjContainer.length; i++) {
		quizObjContainer[i].style.pointerEvents = "none";
	}

	spiderMotion();

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
		// parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 2300);
}

function spiderMotion() {
	var spider = document.querySelectorAll('.spider'),
		quizBox = document.querySelectorAll('.quizBox');
	animate({
		delay : 30,
		duration : 400,
		delta : makeEaseOut(linear),
		step : function(delta) {
			console.log(delta)
			for(var j = 0; j < spider.length; j++){
				spider[j].style.opacity = 1 - (1 * delta);
			
				spider[j].parentNode.childNodes[0].classList.remove('hidden');
			}
		}
	});
}
function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		imgTable = createElement('div', bgCanvas, 'imgTable'),
		imgTableinnner= createElement('div', imgTable, 'imgTable'),
		innerImg = createElement('img', imgTable),
		quizTable = createElement('div', bgCanvas, 'quizTable'),
		checkBtn = createElement('div',document.querySelector('#bgCanvas'),'checkBtn'),
		imgTableLeft = 1,
		imgTableTop = 0,
		quizTableTextLeft = 40,
		quizTableTextTop = 5,
		clickBtnLeft = 12,
		clickBtnTop = 0;


	imgTable.setAttribute('style', 'position:absolute; top:150px; left:80px; width:420px; height:364px; background:url(images/dataCategorize_objectBox.png) no-repeat;')
	quizTable.setAttribute('style', 'position:absolute; top:100px; left:530px; width:600px; height:587px; background:url(images/dataCategorize_board.png) no-repeat;')
	imgTableinnner.setAttribute('style', 'width:390px; height:300px; margin-top:53px; margin-left:20px;')
	innerImg.src = "images/dataCategorize_objectBox_light.png";
	innerImg.className = "innerImg";


	var productArray = [];


	for(var i = 0; i < gameManager.QUIZ_OPTION.length-3; i++){

		imgTableLeft = imgTableLeft +50;

		for(var j = 0; j < gameManager.objCount[i]; j++){
			imgBox = createElement('div', imgTableinnner, 'quizBox quizBox_' + i + '_' + j);
			imgBox.style.marginRight = '20px'
			imgBoxinner = 'url(images/'+ gameManager.quizObj[i] +'.png) no-repeat';
			productArray.push(imgBoxinner)
			productArray.sort(function() { return 0.5 - Math.random() });

		  	imgBox.addEventListener('click', function(e) {
		  		e.preventDefault();
				var _this = this;
				streamSound.setSound('media/connect.mp3');

				animate({
					delay : 20,
					duration : 800,
					delta : makeEaseOut(elastic),
					step : function(delta) {
						_this.style.left = ((-50 * delta) + (50)) + 'px';
					}
				});
		  	}, false);
		}

		gaugeBox = createElement('div', quizTable, 'gaugeBox gaugeBox_' + i);

		for(var z = 0; z < 5; z++){
			gauge = createElement('div', gaugeBox, 'gauge gauge_' + i + '_' + z)
		}

		clickBtnLeft = clickBtnLeft + 130;
		clickBtnBox = createElement('div', quizTable, 'clickBtnBox clickBtnBox_' + i);
		clickBtnBox.setAttribute('style', 'position:absolute; display:inline-block; top:368px; left:' + clickBtnLeft + 'px; width:116px; height:102px;');

		var clickBoxDown = createElement('img', clickBtnBox),
			clickBoxBtn = createElement('img', clickBtnBox);

		appendImageElement('clickBoxImg', 'images/' + gameManager.quizObj[i] + '.png', clickBtnBox);

		clickBoxBtn.className = 'clickBoxBtn';
		clickBoxDown.className = 'clickBoxDown';

		clickBoxBtn.src = 'images/dataCategorize_btn_' + i + '.png';
		clickBoxDown.src = 'images/dataCategorize_btn_' + i + '_push.png';

		clickBtnBox.addEventListener(gameManager.eventSelector.downEvent, function(e) {
	  		e.preventDefault();
	  		gameManager.temp = this;
			streamSound.setSound('media/click.mp3');

			gameManager.temp.childNodes[1].style.opacity = 0;
			setTimeout(function(){
				gameManager.temp.childNodes[1].style.opacity = 1;
			}, 100);

			var idx = this.className.split('_')[1],
				colorCode = ['#88cc60', '#64aeeb', '#bf78eb'];


			if(gameManager.count[idx] < 5){
				QS('.gauge_'+ idx + '_' + (4 - gameManager.count[idx])).style.background = colorCode[idx];
				gameManager.count[idx]++; 
			}else{
				for(var i = 0; i < gameManager.count[idx]; i++){
					QS('.gauge_' + idx +'_'+ i).style.background = 'none';
				}
				gameManager.count[idx] = 0;
				streamSound.setSound('../../media/incorrect.mp3');
			}

	  	}, false); 	

	}

	for(var k = 0; k < gameManager.quizTableText.length; k++){
		quizTableTextTop = quizTableTextTop + 63;
		quizTableText = createElement('div', quizTable, 'quizTableText');
		quizTableText.innerText = gameManager.quizTableText[k];
		quizTableText.style.top = quizTableTextTop + 'px';quizTableTextLeft;
		quizTableText.style.left = '75px';
	}

	productArray.forEach(function (value, idx) {
		imgTableinnner.childNodes[idx].style.background = value;
	});
}


function CheckButton() {
	var checkBtn = document.querySelector('.checkBtn');

	btnDown = function(e) {
		e.preventDefault();
		checkBtn.style.background = 'url("../../images/common/checkBtnRed_on.png") no-repeat';

		if(compareDap()){
			// gameOver();
			gameEnd();
			console.log('correct');
			QS('#bgCanvas').style.pointerEvents = 'none';
			// checkBtn.style.background = 'url("../../images/common/checkBtnRed_on.png") no-repeat';
		}else{
			console.log('incorrect');
			gameReset();
			setTimeout(function(){
				checkBtn.style.background = 'url("../../images/common/checkBtnRed.png") no-repeat';
			}, 100);
		}
	}
	checkBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
}

function compareDap () {
	for (var i = 0; i < gameManager.QUIZ_ANSWER.length; i++) {
		if (gameManager.count[i] !== gameManager.QUIZ_ANSWER[i]) {
			return false;
		}			
	}
	return true;
}

function gameEnd() {
	setTimeout(function() {
		
		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');
		logCounter.tryCounter();
		logCounter.endTime();
		clearInterval(countTimer);


		// save starIcon
		setTimeout(function() {
			log('excute stampStarIcon!');
			// parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			// parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);

	}, 100);
}

function gameReset() {
	streamSound.setSound('../../media/incorrect.mp3');
	logCounter.tryCounter();

	var gauge = document.querySelectorAll('.gauge');

	for(var i = 0; i < gauge.length; i++){
		gauge[i].style.background = 'none';
	}

	gameManager.count = [0, 0, 0];
}
function initScene() {
	log('initScene...');
	// parent.window.initClockTimer();

	var bgCanvas = QS('#bgCanvas'),
		doneBtn_on = createElement('div',bgCanvas,'doneBtn_on');

	if(gameManager.QUIZ_OPTION.length === 5 && gameManager.QUIZ_OPTION[4] !== '' && gameManager.QUIZ_OPTION[4] !== undefined)
		drawTitle();
	drawImgs();
	drawSymbols();
	machine();
}

function drawTitle() {
	var title = createElement('div', bgCanvas, 'title'),
		text = gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1];

	title.innerHTML = text;
}

function drawImgs() {
	var bgCanvas = QS('#bgCanvas'),
		questionTop = 270,
		questionLeft = 194,
		questionLeftChange = 217;

	gameManager.imgType = Math.floor(Math.random() * 4);

	switch(gameManager.imgType) {
		case 0:
			gameManager.imgType = 'hat';
			break;
		case 1:
			gameManager.imgType = 'gloves';
			break;
		case 2:
			gameManager.imgType = 'muffler';
			break;
		case 3:
			gameManager.imgType = 'knit';
			break;
	}

	for(var i = 0; i < 2; i++) {
		var questionImg = createElement('div', bgCanvas, 'questionImg'),
			numberDiv = createElement('div', questionImg, 'number'),
			number = gameManager.QUIZ_OPTION[i],
			answerImg = createElement('div', bgCanvas, 'answerImg answerImg_' + i);

		questionImg.style.top = questionTop + 'px';
		questionImg.style.left = questionLeft + 'px';
		numberDiv.innerHTML = number;

		if(i == 0) {
			questionImg.style.backgroundImage = 'url(./images/knittingBall_big.png)';
			questionImg.style.boxSizing = 'border-box';
			questionImg.style.paddingRight = 50 + 'px';
			answerImg.style.backgroundImage = 'url(./images/group_' + gameManager.imgType + '.png)';
		} else {
			questionImg.style.backgroundImage = 'url(./images/' + gameManager.imgType + '.png)';
			if (gameManager.imgType === 'muffler') questionImg.style.backgroundPosition = '-10px bottom';
			else if (gameManager.imgType === 'gloves') questionImg.style.backgroundPosition = '-5px 25px';
			answerImg.style.backgroundImage = 'url(./images/knittingBall_small.png)';
		}

		questionLeft += questionLeftChange;

		var slotBg = document.createElement('div'),
			title = QS('.title');

		slotBg.classList.add('slotBg');
		slotBg.classList.add('slotBg_' + i);

		bgCanvas.insertBefore(slotBg, title);
	}
}

function drawSymbols() {
	var bgCanvas = QS('#bgCanvas'),
		symbolText = '',
		top = 332,
		left = 374,
		leftChange = 289;

	for (var i = 0; i < 3; i++) {
		var symbol = createElement('div', bgCanvas, 'symbol');
		symbol.style.position = 'absolute';
		symbol.style.top = top + 'px';
		symbol.style.left = left + 'px';

		if (i === 2) {
			symbolText = '...';
			symbol.innerHTML = symbolText;
			symbol.style.top = 313 + 'px';
			symbol.style.left = 882 + 'px';
		} else {
			if(i === 0) symbolText = '/';
			else if(i === 1) symbolText = '=';
			replaceSymbol(symbolText, symbol);
			var img = symbol.querySelector('img');
			img.style.width = 30 + 'px';
			img.style.height = 30 + 'px';
		}

		left += leftChange;
	}
}

function machine() {
	var bgCanvas = document.getElementById('bgCanvas'),
		swWrapper = QS('.swWrapper');

	var configs = {
			slot : [],
			doneCallBack : function () {
			var results = SALTGAMER.SpinPicker.getSelectedValues();
			gameManager.value = results.values;
			gameManager.key = results.keys;

			for(var i = 0; i < gameManager.value.length; i++) {
				var slotValues = SALTGAMER.SpinPicker.slotData[i].values;
				if(gameManager.value[i] === slotValues[gameManager.key[i]])
					gameManager.dabCount ++;
			}


			if(gameManager.dabCount == gameManager.key.length){
				logCounter.tryCounter();
				gameOver();
				streamSound.setSound('../../media/correct.mp3');
			}else{
				logCounter.tryCounter();
				setTimeout(function() {
					QS('.doneBtn_on').style.visibility = "hidden";
					QS('.doneBtn').style.visibility = "visible";
				},100);
				gameManager.dabCount = 0;
				streamSound.setSound('../../media/incorrect.mp3');
			}

		}

	};

	for (var i = 0; i < gameManager.quizObj.length; i++) {
		var contents = { data : {}, style : 'spin', default : ''},
			slotData = gameManager.quizObj[i][0][1];
		configs.slot.push(contents);

			for(var j = 0; j < slotData.length; j++){
				configs.slot[i].data[j] =  slotData[j];
			}
			configs.slot[i].style = gameManager.quizObj[i][1];
			configs.slot[i].default = gameManager.quizObj[i][2];
	}

	SALTGAMER.SpinPicker.initSpinPicker(configs);

	for (var i = 0; i < gameManager.quizObj.length; i++) {
		for (var j = 0; j < gameManager.quizObj[i][0][1].length; j++){
			var slot = QS('.slot_' + i);
			if(gameManager.quizObj[i][0][0] == 'image'){//이미지일 경우
				symbolBox (gameManager.quizObj[i][0][1][j][0], gameManager.quizObj[i][0][1][j][1], slot.childNodes[0].childNodes[j]);
			}else if(gameManager.quizObj[i][0][0] == 'number'){//숫자일 경우
				if(isNaN(gameManager.quizObj[i][0][1][j])){//식일 때(문자형)
					var slotRoom = createElement('div', slot.childNodes[0].childNodes[j]);
					slotRoom.classList.add('slotRoom');
					numberSort(String(gameManager.quizObj[i][0][1][j]).split(' '), slotRoom);
					slotRoom.style.paddingTop = '27px';
				}else{
					slot.childNodes[0].childNodes[j].innerHTML ='<div class="slotRoom">'+gameManager.quizObj[i][0][1][j]+'</div>';
				}
			}else if(gameManager.quizObj[i][0][0] == 'text'){//문자일 경우
				slot.childNodes[0].childNodes[j].innerHTML ='<div class="slotRoom">'+gameManager.quizObj[i][0][1][j]+'</div>';
			}
		}
	}
	var doneBtn = document.querySelector('.doneBtn');
	document.querySelector('.doneBtn_on').setAttribute('style','top : ' +getRealOffsetTop(doneBtn)+ 'px; left :' +getRealOffsetLeft(doneBtn)+'px; background:url(../../images/common/checkBtnRed_on.png) no-repeat; background-size:100% 100%;');
}

function symbolBox (folder, fileName, targetElement, className) {
	var symbolBox = CE('img');
	symbolBox.className = className;

	symbolBox.src = '../../images/common/' + folder + '/' + fileName + '.png';
	targetElement.appendChild(symbolBox);

}

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }

function gameOver(currentObj) {

	var bgCanvas = document.querySelector('#bgCanvas');
		// bgGlitter = document.querySelector('.bgGlitter');
		bgCanvas.style.pointerEvents = "none";

	logCounter.endTime();
	// glitterAnimation(bgCanvas, bgGlitter);

	setTimeout(function() {
		gameOverAnimation();
	},100);


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
}

//식 구분
function numberSort(txtArray, slotRoom) {
	for (var i = 0; i < txtArray.length; i++) {
		var span = createElement('span', slotRoom),
			txt = txtArray[i];
		if(txt.indexOf(']') <= 0) {
			if(txt == '+' || txt == '-' || txt == '/' || txt == '*' || txt == '=') {
				replaceSymbol(txt, span);
				span.querySelector('img').setAttribute('style', 'position: relative; top: -5px; width: 24px; height: 24px;');
			} else {
				span.innerHTML = txt;
			}
		} else {
			makeBunsu(txt, span);
		}
		span.style.margin = '0 5px';
	}
}

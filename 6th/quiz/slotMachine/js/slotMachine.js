function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		bgGlitter = createElement('div',bgCanvas,'bgGlitter'),
		quizContainer = createElement('div', bgCanvas,'quizContainer'),
		doneBtn_on = createElement('div',bgCanvas,'doneBtn_on');

	bgGlitter.setAttribute('style','widht:'+bgCanvas.clientWidth+'px; height:'+bgCanvas.clientHeight+'px; visibility:hidden;');
	quizContainer.setAttribute('style', 'position:absolute; top:140px; left:162px;width:878px; height:472px; background:url(images/machine.png)');

	machine();
}

function gameOver(currentObj) {

	var bgCanvas = document.querySelector('#bgCanvas'),
		bgGlitter = document.querySelector('.bgGlitter');
		bgCanvas.style.pointerEvents = "none";

	logCounter.endTime();
	glitterAnimation(bgCanvas, bgGlitter);

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


function machine() {
	var bgCanvas = document.getElementById('bgCanvas'),
		swWrapper = QS('.swWrapper');

	var configs = { slot : [] ,
		doneCallBack : function () {
			var results = SALTGAMER.SpinPicker.getSelectedValues();

			gameManager.value = results.values
			gameManager.key = results.keys

			for(var i = 0; i < results.keys.length; i++){
				if(gameManager.value[i] == gameManager.key[i]){
					gameManager.dabCount ++;
				}
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

	for (var i = 0; i < gameManager.QUIZ_OPTION.length; i++) {
		var contents = { data : {}, style : 'spin', default : ''};
		configs.slot.push(contents);
	}

	for (var i = 0; i < gameManager.QUIZ_OPTION.length; i++) {

		if(gameManager.QUIZ_OPTION[i][0][0] == 'image'){

			for(var j = 0; j < gameManager.QUIZ_OPTION[i][0][1].length; j++){
				configs.slot[i].data[j] =  gameManager.QUIZ_OPTION[i][0][1][j];
			}
		}

		configs.slot[i].style = gameManager.QUIZ_OPTION[i][1];
		configs.slot[i].default = gameManager.QUIZ_OPTION[i][2];
	}

	SALTGAMER.SpinPicker.initSpinPicker(configs);
	for (var i = 0; i < gameManager.QUIZ_OPTION.length; i++) {
		for(var j = 0; j < gameManager.QUIZ_OPTION[i][0][1].length; j++){
			var slot = QS('.slot_'+i);
			symbolBox (gameManager.QUIZ_OPTION[i][0][1][j][0], gameManager.QUIZ_OPTION[i][0][1][j][1], slot.childNodes[0].childNodes[j]);
		}
	}
	var doneBtn = document.querySelector('.doneBtn');
	document.querySelector('.doneBtn_on').setAttribute('style','top : ' +getRealOffsetTop(doneBtn)+ 'px; left :' +getRealOffsetLeft(doneBtn)+'px; background:url(../../images/common/checkBtnRed_on.png) no-repeat;');
}

function symbolBox (folder, fileName, targetElement, className) {

	var symbolBox = CE('img');
	symbolBox.className = className;

	// if(folder === 'figure' && (text === 'circle'||text === 'triangle'||text === 'square'||text === 'hexagon'||text === 'pentagon')){
	//  	symbolBox.src = '../../images/common/' + folder + '/' + text + '_' + figure + '_' + color + '.png';
	//  } else {
	// 	symbolBox.src = '../../images/common/' + folder + '/' + text + '_' + figure + '.png';
	// }

	symbolBox.src = '../../images/common/' + folder + '/' + fileName + '.png';
	targetElement.appendChild(symbolBox);

}



function glitterAnimation(bgCanvas,bgGlitter){
	var bool = true,
	count = 0,
	interval = setInterval(function(){
		if(bool){
			bgGlitter.style.visibility = "visible";
			bool = false;
			count++;
			if(count >= 20){
				bgGlitter.style.visibility = "hidden";
				clearInterval(interval);
			}
		} else {
			bgGlitter.style.visibility = "hidden";
			bool = true;
			count++;
		}
	}, 200);
}

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }


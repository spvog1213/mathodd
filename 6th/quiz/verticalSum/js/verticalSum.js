function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas')
		quizContainer = createElement('div', bgCanvas,'quizContainer')
		doneBtn_on = createElement('div',bgCanvas,'doneBtn_on')
		backgroundGroup = createElement('div',bgCanvas,'backgroundGroup')
		quizContainer.setAttribute('style', 'position:absolute; top:100px;  left:250px; width:702px; height:530px; background:url(images/machine.png) no-repeat');

		machine();
	}

function gameOver(currentObj) {

	var bgCanvas = document.querySelector('#bgCanvas');

	bgCanvas.style.pointerEvents = "none";

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
	}, 1800);
}


function machine() {
	var bgCanvas = document.getElementById('bgCanvas');

	var configs = { slot : [] ,
		doneCallBack : function () {
			var results = SALTGAMER.SpinPicker.getSelectedValues();

			gameManager.value = results.values
			gameManager.key = results.keys
			for(var i = 0; i < results.keys.length; i++){

				if(gameManager.value[i] == gameManager.key[i]){
					gameManager.dabCount ++;
				} else{ }
			}
			 if(gameManager.dabCount == results.keys.length){
				gameOver();
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
		var contents = { data : {}, style : 'spin', default : ''	}
		configs.slot.push(contents);
	}

	for(var i = 0; i < gameManager.QUIZ_TEXT.length; i++){
		var quizText = createElement('div',quizContainer,'quizText_'+i);
		 if(i !==0) {
			quizText.innerHTML = "<span class=num>"+gameManager.QUIZ_TEXT[i]+"</span>";
		}
	}
	var left = 820;
	for (var i = 0; i < gameManager.QUIZ_OPTION.length; i++) {

		if(gameManager.QUIZ_OPTION[i][0][0] == 'text'){

			for(var j = 0; j < gameManager.QUIZ_OPTION[i][0][1].length; j++){

				configs.slot[i].data[0] = gameManager.QUIZ_OPTION[i][0][1][j]

			}
		}else if(gameManager.QUIZ_OPTION[i][0][0] == 'number') {
			for (var l = 0; l < gameManager.QUIZ_OPTION[i][0][1]; l ++) {
				configs.slot[i].data[l] = l;
			}
		}

		configs.slot[i].style = gameManager.QUIZ_OPTION[i][1];
		configs.slot[i].default = gameManager.QUIZ_OPTION[i][2];
		left = left - 103;
		 var slotBack = createElement('div',backgroundGroup,'slotBack_'+i);
		 slotBack.setAttribute('style','position:absolute;left:'+ left +'px; top:343px')
	}

	SALTGAMER.SpinPicker.initSpinPicker(configs);

	appendQuiz();

}
function appendQuiz(){
	var top1 = 50,left = 300,
		top2 = 140,
		quizText_1 = document.querySelector('.quizText_1'),
		quizText_2 = document.querySelector('.quizText_2'),
		doneBtn = document.querySelector('.doneBtn');

	quizText_1.style.top = top1 + 'px';
	quizText_1.style.left = left + 'px';
	quizText_2.style.top = top2 + 'px';
	quizText_2.style.left = left + 'px';

	if(gameManager.QUIZ_TEXT[1].toString().length === 2){
		quizText_1.style.top = top1 + 'px';
		quizText_1.style.left = left + 100 + 'px';
	}
	if(gameManager.QUIZ_TEXT[2].toString().length === 2){
		quizText_2.style.top = top2 + 'px';
		quizText_2.style.left = left + 100 + 'px';
	}
	if(gameManager.QUIZ_TEXT[1].toString().length === 1){
		quizText_1.style.top = top1 + 'px';
		quizText_1.style.left = left + 152 + 'px';
	}
	if(gameManager.QUIZ_TEXT[2].toString().length === 1){
		quizText_2.style.top = top2 + 'px';
		quizText_2.style.left = left + 152 + 'px';
	}

	var swWrapper = QS('.swWrapper');
		swWrapper.style.position = 'absolute';
		swWrapper.style.width = '380px';

	if(gameManager.QUIZ_OPTION.length === 2){
		swWrapper.style.width = '215px'
		swWrapper.style.left = '614px'
	}else if(gameManager.QUIZ_OPTION.length === 1){
		swWrapper.style.width = '108px'
		swWrapper.style.left = '715px'
	}

	document.querySelector('.quizText_0').setAttribute('style','top : 160px; left : 200px; background:url(images/'+gameManager.QUIZ_TEXT[0]+'.png) no-repeat;');

	var doneBtn = document.querySelector('.doneBtn');
	document.querySelector('.doneBtn_on').setAttribute('style','top : ' +getRealOffsetTop(doneBtn)+ 'px; left :' +getRealOffsetLeft(doneBtn)+'px; background:url(../../images/common/checkBtnRed_on.png) no-repeat;');
}

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }

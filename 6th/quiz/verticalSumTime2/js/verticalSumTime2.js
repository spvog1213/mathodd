function initScene() {
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		content =  createElement('div',bgCanvas,'content'),
		doneBtn_on = createElement('div',bgCanvas,'doneBtn_on'),
		backgroundGroup = createElement('div',bgCanvas,'backgroundGroup'),
		configs = { slot : [] ,
			doneCallBack : function () {
				var results = SALTGAMER.SpinPicker.getSelectedValues();
				gameManager.value = results.values;
				gameManager.key = results.keys;

				for(var i = 0; i < gameManager.key.length; i++){
					if(gameManager.value[i] == gameManager.key[i]){
						gameManager.dabCount ++;
					}
				}

				if(gameManager.dabCount == (gameManager.key.length)){
					streamSound.setSound('../../media/correct.mp3');
					gameOver();
				}else{
					setTimeout(function() {
						QS('.doneBtn_on').style.visibility = "hidden";
						QS('.doneBtn').style.visibility = "visible";
					},100);

					gameManager.dabCount = 0;
					streamSound.setSound('../../media/incorrect.mp3');
					logCounter.tryCounter();
				}
			}

		};

	for(var i = 0, max = gameManager.QUIZ_TEXT.length; i < max; i++){
		var quizText = createElement('div',content,'quizText_'+i);
		 if(i !==0 && i !== max-1 ) {
			quizText.innerHTML = "<span class=num>"+(gameManager.QUIZ_TEXT[i])[0]+"</span>"+(gameManager.QUIZ_TEXT[i])[1];
		} else if(i === gameManager.QUIZ_TEXT.length-1){
			quizText.innerHTML = "<span class=text>"+(gameManager.QUIZ_TEXT[i])[0]+"</span>";
			createElement('div',content,'quizText_'+(i+1)).innerHTML = "<span class=text>"+(gameManager.QUIZ_TEXT[i])[1]+"</span>";
		}
	}

	for (var i = 0, max = gameManager.QUIZ_OPTION.length; i < max; i++) {

		for (var j = 0; j < gameManager.QUIZ_OPTION[i].length; j++) {

			var contents = { data : {}, style : 'spin', default : ''},
				quizOptionLength = gameManager.QUIZ_OPTION[i].length;
				count = (i == 0) ? j : j + gameManager.QUIZ_OPTION[i-1].length;
				slotBack = createElement('div',backgroundGroup,'slotBack_'+ count);

			configs.slot.push(contents);

			if(gameManager.QUIZ_OPTION[i][j][0][0] == 'number') {
				for (var l = 0; l < gameManager.QUIZ_OPTION[i][j][0][1]; l ++) {
					configs.slot[count].data[l] = l;
				}
			}

			configs.slot[count].style = gameManager.QUIZ_OPTION[i][j][1];
			configs.slot[count].default = gameManager.QUIZ_OPTION[i][j][2];
		}
	}

	SALTGAMER.SpinPicker.initSpinPicker(configs);
	appendQuiz();
}


function appendQuiz(){
	var top, left = 340,
		swSlotBacks = QS('.backgroundGroup').childNodes,
		doneBtn = document.querySelector('.doneBtn'),
		backgroundGroup = QS('.backgroundGroup'),
		blockBox1 = createElement('div', QS('#bgCanvas'), 'blockBox'),
		blockBox2 = createElement('div', QS('#bgCanvas'), 'blockBox'),
		swWrapper = QS('.swWrapper');


	for (var i = 0; i < swSlotBacks.length; i++) {

		swSlotBacks[0].style.marginLeft = 100 * (3-gameManager.QUIZ_OPTION[0].length) + 'px';

		if (i == gameManager.QUIZ_OPTION[0].length) {
			swSlotBacks[i].style.marginLeft = (100 * (3-gameManager.QUIZ_OPTION[1].length)) + 100 + 'px';
		}
	}

	for(var i = 0; i <= 2; i++){
		if(i === 0){
			document.querySelector('.quizText_'+i).setAttribute('style','top : 240px; left : 260px; background:url(images/'+gameManager.QUIZ_TEXT[0]+'.png) no-repeat;');
		}else{
			top = 140;
			document.querySelector('.quizText_'+i).setAttribute('style','top : ' + top +'px; left : '+ left +'px;');
			top = 220;
			document.querySelector('.quizText_'+(i+2)).setAttribute('style','top : ' + top +'px; left : '+ left +'px;');
			left += 367;
		}
		document.querySelector('.quizText_5').setAttribute('style','left:550px;');
		document.querySelector('.quizText_6').setAttribute('style','left:947px;');

	}


	document.querySelector('.doneBtn_on').setAttribute('style','top : ' +getRealOffsetTop(doneBtn)+ 'px; left :' +getRealOffsetLeft(doneBtn)+'px; background:url(../../images/common/checkBtnRed_on.png) no-repeat; visibility:hidden;');

	backgroundGroup.setAttribute('style','left : ' + swWrapper.style.left+'; top : '+swWrapper.style.top+';');
	blockBox1.setAttribute('style','left : ' + swWrapper.style.left+'; top : '+swWrapper.style.top+';');
	blockBox1.style.width = 100 * (3-gameManager.QUIZ_OPTION[0].length) + 'px';
	blockBox2.setAttribute('style','left : 544px; top : '+swWrapper.style.top+';');
	blockBox2.style.width = (100 * (3-gameManager.QUIZ_OPTION[1].length) + 90) + 'px';
}



function gameOver(currentObj) {

	var bgCanvas = document.getElementById('bgCanvas');
	bgCanvas.style.pointerEvents  = "none";

	setTimeout(function() {
		logCounter.tryCounter();
		logCounter.endTime();
		clearInterval(countTimer);
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

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }


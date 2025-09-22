function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);
	log(gameManager.TOTAL_ANSWER_ARRAY);
	// parent.window.initClockTimer();

	var bgCanvas = document.getElementById('bgCanvas'),
		machineTitle = createElement('div', bgCanvas, 'machineTitle'),
		bgGlitter = createElement('div',bgCanvas,'bgGlitter'),
		quizContainer = createElement('div', bgCanvas,'quizContainer'),
		doneBtn_on = createElement('div',bgCanvas,'doneBtn_on');

	machineTitle.innerHTML ='<span>크기가 같은 것끼리 맞추세요.</span>';

	bgGlitter.setAttribute('style','width:'+bgCanvas.clientWidth+'px; height:'+bgCanvas.clientHeight+'px; visibility:hidden; position: absolute; top: 0;');
	quizContainer.setAttribute('style', 'position:absolute; top: 190px; left:66px; width:1100px; height:472px; background:url(images/machine.png); background-size:100% 100%;');
	console.log('bgCanvas.clientWidth', bgCanvas.clientWidth, bgCanvas.clientHeight)
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

	}

	for (var i = 0; i < gameManager.QUIZ_OPTION.length; i++) {
		var contents = { data : {}, style : 'spin', default : ''};
		configs.slot.push(contents);

			for(var j = 0; j < gameManager.QUIZ_OPTION[i][0][1].length; j++){
				configs.slot[i].data[j] =  gameManager.QUIZ_OPTION[i][0][1][j];
			}
			configs.slot[i].style = gameManager.QUIZ_OPTION[i][1];
			configs.slot[i].default = gameManager.QUIZ_OPTION[i][2];
	}

	SALTGAMER.SpinPicker.initSpinPicker(configs);

	for (var i = 0; i < gameManager.QUIZ_OPTION.length; i++) {
		for(var j = 0; j < gameManager.QUIZ_OPTION[i][0][1].length; j++){
			var slot = QS('.slot_'+i);
			if(gameManager.QUIZ_OPTION[i][0][0] == 'image'){//이미지일 경우
				symbolBox (gameManager.QUIZ_OPTION[i][0][1][j][0], gameManager.QUIZ_OPTION[i][0][1][j][1], slot.childNodes[0].childNodes[j]);
			}else if(gameManager.QUIZ_OPTION[i][0][0] == 'number'){//숫자일 경우
				if(isNaN(gameManager.QUIZ_OPTION[i][0][1][j])){//식일 때(문자형)
					var slotRoom = createElement('div', slot.childNodes[0].childNodes[j]);
					slotRoom.classList.add('slotRoom');
					numberSort(String(gameManager.QUIZ_OPTION[i][0][1][j]).split(' '), slotRoom);
					slotRoom.style.paddingTop = '20px';
				}else{
					slot.childNodes[0].childNodes[j].innerHTML ='<div class="slotRoom">'+gameManager.QUIZ_OPTION[i][0][1][j]+'</div>';	
				}
			}else if(gameManager.QUIZ_OPTION[i][0][0] == 'text'){//문자일 경우
				slot.childNodes[0].childNodes[j].innerHTML ='<div class="slotRoom marginT">'+gameManager.QUIZ_OPTION[i][0][1][j]+'</div>';
			}
		}
	}

	//console.log('slot', QSAll('.slotRoom'));
	var slowRoomW = QSAll('.slotRoom');

	var doneBtn = document.querySelector('.doneBtn');
	document.querySelector('.doneBtn_on').setAttribute('style','top : ' +getRealOffsetTop(doneBtn)+ 'px; left :' +getRealOffsetLeft(doneBtn)+'px; background:url(../../images/common/checkBtnRed_on.png) no-repeat; background-size:100% 100%;');
	QS('.swWrapper').style.left = "108px";
	QS('.swWrapper').style.top = "244px";
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



//식 구분
function numberSort(txtArray, slotRoom) {
	for (var i = 0; i < txtArray.length; i++) {
		var span = createElement('span', slotRoom),
			txt = txtArray[i];
		if(txt.indexOf(']') <= 0) {
			if(txt == '+' || txt == '-' || txt == '/' || txt == '*' || txt == '=') {
				replaceSymbol(txt, span);
				span.querySelector('img').setAttribute('style', 'position: relative; top: 7px; width: 40px; height: 40px;');
			} else {
				span.innerHTML = txt;
			}
		} else {
			makeBunsu(txt, span);
		}
		span.style.margin = '0 5px';
	}
}
// 분수 만드는 함수
function makeBunsu(text, targetElement){
	var bunsuArray = [],
		bunsuTxt = [],
		beforeTxt = '',
		afterTxt = '';

	if(text.indexOf('[') > -1) {
		while(text.indexOf('[') > -1) {
			if(spitBunsuText(text).length === 3) {
				beforeTxt = spitBunsuText(text)[2];
				var bText = createElement('span', targetElement);
				bText.innerHTML = beforeTxt;
			}
			bunsuTxt = spitBunsuText(text)[0];
			afterTxt = spitBunsuText(text)[1];
			bunsuArray = bunsuTxt.split(',');

			drawBunsu(bunsuArray, targetElement);
			text = afterTxt; // console.log(text);
		}
	} else {
		bunsuArray = text.split(',');
		drawBunsu(bunsuArray, targetElement);
		text = afterTxt;
	}

	var aText = createElement('span', targetElement);
	aText.innerHTML = afterTxt;
}


// 분수 그릴 때 필요한 array 만드는 함수
function spitBunsuText(src){
	if(src.indexOf('[') === 0) {
		var startIdx = src.indexOf('['),
			endIdx = src.indexOf(']'),
			bunsuTxt = src.slice(startIdx + 1, endIdx),
			afterTxt = src.slice(endIdx + 1),
			resultArray = [bunsuTxt, afterTxt];
	} else {
		var startIdx = src.indexOf('['),
			endIdx = src.indexOf(']'),
			beforeTxt =  src.slice(0, startIdx),
			bunsuTxt = src.slice(startIdx + 1, endIdx),
			afterTxt = src.slice(endIdx + 1),
			resultArray = [bunsuTxt, afterTxt, beforeTxt]; // console.log('resultArray: ',resultArray);
	}
	return resultArray;
}

// 분수 그리는 함수
function drawBunsu(bunsuArray, parentElement){
	var bunsuDiv = createElement('div', parentElement, 'bunsuDiv'),
		int = createElement('div', bunsuDiv, 'int'),
		prop = createElement('div', bunsuDiv, 'prop'),
		bunja = createElement('div', prop, 'bunja'),
		bunmo = createElement('div', prop, 'bunmo');

	if(bunsuArray[0] != 0) int.innerHTML = bunsuArray[0];

	bunja.innerHTML = bunsuArray[1];
	bunmo.innerHTML = bunsuArray[2];
}

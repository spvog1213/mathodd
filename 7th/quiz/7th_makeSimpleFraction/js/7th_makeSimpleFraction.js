function initScene() {
	var bgCanvas = document.getElementById('bgCanvas'),
		content =  createElement('div',bgCanvas,'content'),
		doneBtn_on = createElement('div',bgCanvas,'doneBtn_on'),
		quizText = createElement('div',bgCanvas,'quizText'),
		equal = createElement('img',bgCanvas,'equal'),

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
					dapOpenImg();

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

	quizText.innerHTML = '기약 분수를 만드세요.';
	equal.src = 'images/equal.png';


	for (var i = 0, max = gameManager.QUIZ_OPTION.length; i < max; i++) {

		for (var j = 0; j < gameManager.QUIZ_OPTION[i].length; j++) {

			var contents = { data : {}, style : 'spin', default : ''},
				quizOptionLength = gameManager.QUIZ_OPTION[i].length;
				count = (i == 0) ? j : j + gameManager.QUIZ_OPTION[i-1].length;
				slotBack = createElement('div',content,'slotBack_'+ count);

			configs.slot.push(contents);

			if(gameManager.QUIZ_OPTION[i][j][0][0] == 'number') {
				for (var l = 0; l < gameManager.QUIZ_OPTION[i][j][0][1]; l ++) {
					configs.slot[count].data[l] = l;
				}
			}
				if(gameManager.QUIZ_OPTION[i][j][0][0] == 'number' && gameManager.QUIZ_OPTION[i][j][0][1] === ''){
					gameManager.QUIZ_OPTION[i][j][0][1] = 10;
					gameManager.QUIZ_OPTION[i][j][1] = 'spin';
					gameManager.QUIZ_OPTION[i][j][2] = 0;

					for (var l = 0; l < 11; l ++) {
						configs.slot[i].data[l] = l-1;
						configs.slot[i].data[0] = '?';
					}
				}

			configs.slot[count].style = gameManager.QUIZ_OPTION[i][j][1];
			configs.slot[count].default = gameManager.QUIZ_OPTION[i][j][2];
		}
	}
	SALTGAMER.SpinPicker.initSpinPicker(configs);
	//makeBunsu(gameManager.QUIZ_TEXT.toString(), bgCanvas);
	var bunja = createElement('div',bgCanvas,'bunja'),
		bunmo = createElement('div',bgCanvas,'bunmo');

		bunmo.innerHTML = gameManager.QUIZ_Number[1];
		bunja.innerHTML = gameManager.QUIZ_Number[0];
		
	appendQuiz();

	var doneBtn = document.querySelector('.doneBtn');
	document.querySelector('.doneBtn_on').setAttribute('style','top : ' +getRealOffsetTop(doneBtn)+ 'px; left :' +getRealOffsetLeft(doneBtn)+'px; background:url(../../images/common/checkBtnRed_on.png) no-repeat; background-size:100% 100%;');

	}

function gameOver(currentObj) {

	var bgCanvas = document.getElementById('bgCanvas');
		bgCanvas.style.pointerEvents  = "none";

	robotAni2();
 	

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

function appendQuiz(){
	for(var i = 0; i < 2; i++){
		var robot = createElement('div',bgCanvas,'robot robot_' + i);
		robot.style.background = 'url(images/robot_'+i+'.png) no-repeat';
		robot.style.top ='220px';
		robot.style.left = 188+(518*i) +'px';
	}
	var makeRobot = QS('.robot_1');
	var robotSuc =createElement('img',makeRobot,'robotSuc');
	var robotSuc2 =createElement('img',makeRobot,'robotSuc2');
	
	robotSuc.src ='images/success_1.png';
	robotSuc2.src ='images/success_2.png';
}

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0;}


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

	bunmo.innerHTML = bunsuArray[1];
	bunja.innerHTML = bunsuArray[2];
}

function dapOpenImg(){
	var bgCanvas = document.getElementById('bgCanvas'),
		imgTop;

	// QS('.robot_0').style.background = 'url(images/robot_2.png) no-repeat';
	// QS('.bunsuDiv').style.color = '#F3C720';

	for(var i = 0; i < 2; i++){
		var dapOpenImg = createElement('div',bgCanvas,'dapOpenImg dapOpenImg_'+i);

		dapOpenImg.style.background = 'url(images/dapOpenImg_' + i + '.png) no-repeat';
		dapOpenImg.style.backgroundSize = '280px 120px';
		dapOpenImg.style.top = 230 +(280*i) +'px';
		dapOpenImg.innerHTML = '<spsn class="dapText dapText_'+i+'">'+gameManager.QUIZ_TEXT2+'</span>';
	}
}


function robotAni(){
	var robot = document.querySelector('.robot_1');

   robot.style.backgroundImage = 'url("images/success_1.png")';

   setInterval(function(){ 
   		robot.style.backgroundImage =  robot.style.backgroundImage == 'url("images/success_1.png")' ? 'url("images/success_2.png")': 'url("images/success_1.png")';
   }, 500);
   
}

function robotAni2(){
	var robot = document.querySelector('.robot_1').getElementsByTagName('img');

	QS('.robot_1').style.background = 'none';
    robot[0].style.display = 'block';


    setInterval(function(){ 
   		for(var i=0; i<robot.length; i++){
   				robot[i].style.display = robot[i].style.display == 'block' ? 'none' : 'block';
   		}
   }, 200);
   
}




/*
function glitterAnimation(){
	var bool = true,
		robot = document.querySelector('.robot_1'),
		count = 0,
	interval = setInterval(function(){
		if(bool){
			robot.style.backgroundImage = 'url("images/success_1.png")';
			bool = false;
			count++;
			if(count >= 20){
				robot.style.backgroundImage = 'url("images/success_2.png")';
				clearInterval(interval);
			}
		} else {
			robot.style.backgroundImage = 'url("images/success_2.png")';
			bool = true;
			count++;
		}
	}, 200);
}*/
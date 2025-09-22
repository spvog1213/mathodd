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
	var quizText_1 = document.querySelector('.quizText_1'),
		quizText_2 = document.querySelector('.quizText_2');

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
		var contents = { data : {}, style : 'spin', default : ''}
		configs.slot.push(contents);
	}

	for(var i = 0; i < gameManager.QUIZ_TEXT.length; i++){
		var quizText = createElement('div',quizContainer,'quizText_'+i);
		 if(i !==0 && gameManager.QUIZ_TEXT[i].toString().indexOf('.') > -1) {
			console.log(gameManager.QUIZ_TEXT[i].toString().split('.'));
			var primeNumRoom = gameManager.QUIZ_TEXT[i].toString().split('.');
			var primeNum = primeNumRoom[0] +'<span class="point">.</span>' + primeNumRoom[1];
			quizText.innerHTML = "<span class=num>"+primeNum+"</span>";
		}else if(i !==0) quizText.innerHTML = "<span class=num>"+gameManager.QUIZ_TEXT[i]+"</span>";
	}

	var left =330;
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
		
	}

	SALTGAMER.SpinPicker.initSpinPicker(configs);

	if(gameManager.QUIZ_TEXT[1].toString().indexOf('.') > -1 || gameManager.QUIZ_TEXT[2].toString().indexOf('.') > -1){
		var str ='';
		for (var i = 0; i < gameManager.QUIZ_OPTION.length; i++) {
			if(i == 1){
				str += '<div class="point">.</div><div class="slotBack_"'+i+'>'+'</div>';
			}else str += '<div class="slotBack_"'+i+'>'+'</div>';
		}
		backgroundGroup.innerHTML = str;
		QS('.slot_0').style.marginRight = '50px';


	}else{
		left = left + 103;
		for (var i = 0; i < gameManager.QUIZ_OPTION.length; i++) {
			var slotBack = createElement('div',backgroundGroup,'slotBack_'+i);
		}
		 slotBack.setAttribute('style','position:relative; display:inline-block;');
	}
	

	

	appendQuiz();
	


}
function appendQuiz(){
	var top1 = 50, left,
		top2 = 140,
		quizText_1 = document.querySelector('.quizText_1'),
		quizText_2 = document.querySelector('.quizText_2'),
		quizText_0 = document.querySelector('.quizText_0');
		doneBtn = document.querySelector('.doneBtn'),
		quizTextToString_1 = gameManager.QUIZ_TEXT[1].toString(),
		quizTextToString_2 = gameManager.QUIZ_TEXT[2].toString();
	
 
	if(gameManager.QUIZ_TEXT[1].toString().indexOf('.') > -1){
		quizText_1.style.letterSpacing = '54px';
		quizTextToString_1 = gameManager.QUIZ_TEXT[1].toString().split('.')[0].concat(gameManager.QUIZ_TEXT[1].toString().split('.')[1]);
	}

	if(gameManager.QUIZ_TEXT[2].toString().indexOf('.') > -1){
		quizText_2.style.letterSpacing = '54px';
		quizTextToString_2 = gameManager.QUIZ_TEXT[2].toString().split('.')[0].concat(gameManager.QUIZ_TEXT[2].toString().split('.')[1]);
	}

	if(quizTextToString_1.length > 3 || quizTextToString_2.length > 3 ){
		left = 200;
		QS('.quizContainer').style.background = 'url(images/machine_1.png) no-repeat'; 
	}else if((quizTextToString_1.length > 2 && quizTextToString_1.length <= 3 ) || (quizTextToString_2.length > 2 && quizTextToString_2.length <= 3)){
		left = 220;
		QS('.quizContainer').style.background = 'url(images/machine_1.png) no-repeat'; 
	}else if((quizTextToString_1.length > 1 && quizTextToString_1.length <= 2) || (quizTextToString_2.length > 1 && quizTextToString_2.length <= 2)){
		left = 290;
	}


	quizText_1.style.top = top1 + 'px';
	quizText_1.style.left = left + 'px';
	quizText_2.style.top = top2 + 'px';
	quizText_2.style.left = left + 'px';

	
	if(quizTextToString_1.length <= 3 || quizTextToString_2.length <= 3){
		QS('.slot_0').style.marginRight = '60px';
		for(var i=0; i<QSAll('.quizContainer .point').length; i++){
			QSAll('.quizContainer .point')[i].style.marginLeft ='-7px';
		}
		QS('.backgroundGroup .point').style.marginRight ='19px';
		QS('.backgroundGroup .point').style.marginLeft ='19px';
		quizText_1.style.letterSpacing = '58px';
		quizText_2.style.letterSpacing = '58px';
	}


	
	quizText_0.setAttribute('style','top : 160px; left : 110px; background:url(images/'+gameManager.QUIZ_TEXT[0]+'.png) no-repeat;');


	var swWrapper = QS('.swWrapper');
		swWrapper.style.position = 'absolute';

	if(gameManager.QUIZ_OPTION.length === 3){
		swWrapper.style.left = '437px';
	}else if(gameManager.QUIZ_OPTION.length === 1){
		swWrapper.style.left = '705px';
	}else if(gameManager.QUIZ_OPTION.length === 2){
		swWrapper.style.left = '512px';
		QS('.backgroundGroup').style.left = '512px';
		quizText_0.style.left = '190px';
	}else if(gameManager.QUIZ_OPTION.length > 3){
		swWrapper.style.left = '421px';
		QS('.backgroundGroup').style.left = '423px';

	}

	var doneBtn = document.querySelector('.doneBtn');
	document.querySelector('.doneBtn_on').setAttribute('style','top : ' +getRealOffsetTop(doneBtn)+ 'px; left :' +getRealOffsetLeft(doneBtn)+'px; background:url(../../images/common/checkBtnRed_on.png) no-repeat;');
}

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.querySelector('#bgCanvas'),
		quizTextBox = createElement('div',bgCanvas,'quizTextBox'),
		explainTextBox = createElement('div',bgCanvas,'explainBox'),
		sampleBuildImage = createElement('div',bgCanvas,'sampleBuildImage'),
		buildBtnConatinerBack = createElement('div',bgCanvas,'buildBtnConatinerBack'),
		btnArray =  ["resetBtnBlue.png","resetBtnBlue_on.png", "checkBtnRed.png",
					"checkBtnRed_on.png"]
		str = "../../images/common/";

	appendImageElement("",str+btnArray[0], bgCanvas,"resetBtn");
	appendImageElement("",str+btnArray[1], bgCanvas,"resetBtn_on");
	appendImageElement("",str+btnArray[2], bgCanvas,"correctBtn");
	appendImageElement("",str+btnArray[3], bgCanvas,"correctBtn_on"),


	document.querySelector('.correctBtn_on').style.visibility= 'hidden';
	document.querySelector('.resetBtn_on').style.visibility= 'hidden';

	appendImageElement("",gameManager.quizImgStr, sampleBuildImage, "quizImg" );

	createElement('div',buildBtnConatinerBack,'buildBtnConatiner');
	quizTextBox.innerHTML = gameManager.quizText[0];
	explainTextBox.innerHTML = gameManager.quizText[1];
	appendQuiz();
}


function initObject() {
	log('initObject...');

	var correctBtn = document.querySelector('.correctBtn'),
		resetBtn = document.querySelector('.resetBtn'),
		blocks = document.querySelectorAll('.block'),
		blockBtns = document.querySelectorAll('.blockBtn');

	correctBtn.addEventListener(gameManager.eventSelector.upEvent, function(){

		var correctBtn = document.querySelector('.correctBtn'),
		correctBtn_on = document.querySelector('.correctBtn_on');

		correctBtn.style.visibility="hidden";
		correctBtn_on.style.visibility = "visible";

		if (compareBlock()) {
			console.log('correct');
			for (var i = 0; i < blockBtns.length; i++) {
					blockBtns[i].removeEventListener(gameManager.eventSelector.upEvent,blockBtnFun);
					gameManager.clickArray[i] = 0;
			}
			gameOver();

		} else {
			console.log('incorrect');
			setTimeout(function(){
				correctBtn.style.visibility="visible";
				correctBtn_on.style.visibility = "hidden";
			}, 100);
			streamSound.setSound('../../media/incorrect.mp3');
			logCounter.tryCounter();
			resetFun(blocks, blockBtns);
		}
	},false);

	resetBtn.addEventListener(gameManager.eventSelector.upEvent, function(){
		var resetBtn = document.querySelector('.resetBtn'),
		resetBtn_on = document.querySelector('.resetBtn_on');

		resetBtn.style.visibility="hidden";
		resetBtn_on.style.visibility ="visible";

		setTimeout(function(){
			resetBtn.style.visibility="visible";
			resetBtn_on.style.visibility = "hidden";
		}, 100);
		streamSound.setSound('media/reset.mp3');
		resetFun(blocks, blockBtns);
	},false)

}


function appendQuiz(){

	var buildBlockArea = document.querySelector('.buildBlockArea');

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 9; j++) {
			var block = document.createElement('div');
			block.className = 'block block_' + i + '_' + j;
			block.style.opacity = 0;

			if (j < 3) {
				block.style.top = (110 - (i * 50)) + (26 * j) + 'px';
				block.style.left = 163 + (43 * j) + 'px';
			} else if (j < 6) {
				block.style.top = (58 - (i * 50)) + (26 * j) + 'px';
				block.style.left = -8+ (43 * j) + 'px';
			} else {
				block.style.top = (6 - (i * 50)) + (26 * j) + 'px';
				block.style.left = -179+ (43 * j) + 'px';
			}

			buildBlockArea.appendChild(block);
		}
	}

	var buildBtnConatiner = document.querySelector('.buildBtnConatiner');
		gameManager.clickArray = [0,0,0,0,0,0,0,0,0];

	for (var i = 0; i < 9; i++) {
		var blockBtn = document.createElement('div');
		blockBtn.className = 'blockBtn btn_' + i;

		if(gameManager.standardNum[0] === i){
			blockBtn.style.background = 'url(images/redbtn.png) no-repeat';
		}

		blockBtn.addEventListener(gameManager.eventSelector.upEvent, blockBtnFun);

		buildBtnConatiner.appendChild(blockBtn);
	}

}


function blockBtnFun(e){

	var target = e.target,
	targetIdx = target.classList[1].split('_')[1],
	viewBlock;

	if (gameManager.clickArray[targetIdx] < 3) {
		gameManager.clickArray[targetIdx]++;
	} else {
		console.log('over')
		gameManager.clickArray[targetIdx] = 3;
	}

	console.log(gameManager.clickArray)
	target.innerHTML = gameManager.clickArray[targetIdx];

	if(gameManager.standardNum[0] === parseInt(targetIdx) && (gameManager.clickArray[targetIdx] - 1) === 0 ){
		viewBlock = document.querySelector('.block_0_' + targetIdx);
		viewBlock.style.background = 'url(images/buildBlock_sampleBlock_red.png) no-repeat'
	} else{
		viewBlock = document.querySelector('.block_' + (gameManager.clickArray[targetIdx] - 1) + '_' + targetIdx);
	}
	viewBlock.style.opacity = 1;
	streamSound.setSound('media/buildBlock.mp3');
}


function resetFun(blocks, blockBtns){
	for (var i = 0; i < blocks.length; i++) {
		if(gameManager.standardNum == i){
			blocks[i].style.background = 'url(images/buildBlock_sampleBlock_red.png) no-repeat';
		}
		blocks[i].style.opacity = 0;
	}
	for (var i = 0; i < blockBtns.length; i++) {
		blockBtns[i].innerHTML = '';
		gameManager.clickArray[i] = 0;
 	}
}


function compareBlock () {

	for (var i = 0; i < gameManager.CURRENT_ANSWER.length; i++) {
		if (gameManager.CURRENT_ANSWER[i] !== gameManager.clickArray[i]){
			return false;
		}
	}
	return true;
}


function gameOver() {

	var bgCanvas = document.querySelector('#bgCanvas');
	bgCanvas.style.pointerEvents = 'none';

	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
		gameOverAnimation();
		logCounter.tryCounter();
		logCounter.endTime();

	}, 100);
	

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
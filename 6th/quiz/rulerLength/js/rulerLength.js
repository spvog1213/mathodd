
function rulerLengthElement() {
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	console.log('sentenceCompleteSceneElement...');
	createElement('div',document.querySelector('#bgCanvas'),'currentAnswer');
	createElement('div',document.querySelector('#bgCanvas'),'quizContainer');

	var rulerBox = createElement('div',document.querySelector('.quizContainer'),'rulerBox');

	for(var i = 1; i < gameManager.QUIZ_OPTION[1].length; i++){
		var rulerNum = createElement('div',document.querySelector('.rulerBox'),'rulerNum' + i);
			rulerNum.innerHTML = gameManager.QUIZ_OPTION[1][i];
	}

  	var quizText = createElement('span', document.querySelector('.currentAnswer'),'quizText'),
  		currentAnswer = document.querySelector('.currentAnswer');
  	
	quizText.innerHTML = '<span>길이는</span><span> <div class="dropArea"></div> 입니다.</span>';

	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
  		var dropArea = QS('.dropArea'),
	  		answerValue = gameManager.QUIZ_ANSWER[i];
		dropArea.setAttribute('answerValue', answerValue);
  		gameManager.dropArea.push(dropArea);
  	}

  	dropArea.setAttribute('style','top:75px; left:294px;');
	appendQuiz('drag'); 
}

function appendQuiz(buttonType) {
	var bgCanvas = document.querySelector('#bgCanvas'),
		quizContainer = document.querySelector('.quizContainer'),
		objectBig = createElement('div',document.querySelector('.quizContainer'),'objectBig'),
		object = createElement('div',document.querySelector('.objectBig'),'object'),
		objectBon = createElement('div',document.querySelector('.quizContainer'),'objectBon'),
		rulerBox = document.querySelector('.rulerBox'),
		rulerNum1 = document.querySelector('.rulerNum1'),
		rulerNum2 = document.querySelector('.rulerNum2'),
		quizObjContainer = createElement('div',bgCanvas, 'quizObjContainer'),
		choiceLeft = 920, choiceTop = 100,
		count = 1, objCount = 1,
		barLeft = 530,
		objRight = 238,
		image = createElement('img', object),
		imageBon = createElement('img', objectBon);


	var zero = createElement('div', quizContainer,'zero')
		zero.setAttribute('style', 'position: absolute;top: 240px;left: 53px;z-index: 10; width: 20px; font-size: 30px;height: 20px;')
		zero.innerText = 0;



	for(var j = 0; j < 18; j++){
		var bar = createElement('div',document.querySelector('.rulerBox'),'bar_' + j);
		bar.setAttribute('style', 'position: absolute;left:' + barLeft +'px; top:59px; width:0px; height:13px; border:3px solid black;');
		count++;
		bar.style.left = barLeft + (count *16) + 'px';
		if(j == 3 ||j == 13) {
			bar.style.height = '33px';
			bar.style.border = '4px solid black';
		}
		if(j == 8) {
			bar.style.height = '23px';
			bar.style.border = '4px solid black';
		}
	}
	
	objCount = objCount * gameManager.QUIZ_OPTION[1][0]
	objRight1 = objRight - (objCount * 16);

	rulerNum1.setAttribute('style', 'position:absolute; top:101px; left:578px; width:72px; font-size:40px; text-align: center;');
	rulerNum2.setAttribute('style', 'position:absolute; top:101px; left:739px; width:72px; font-size:40px; text-align: center;');
	object.setAttribute('style', 'position: absolute; bottom: 130px; right:' + objRight1 +'px;');
	image.src = 'images/obj_' + gameManager.QUIZ_OPTION[0] + '.png';
	objectBon.setAttribute('style', 'position: absolute;  top: -3px; left:67px;');
	imageBon.src = 'images/objBon_' + gameManager.QUIZ_OPTION[0] + '.png';

	appendImageElement('ruler', gameManager.quizImgArray[0], quizContainer);


	appendImageElement('lineBar', 'images/dottedLine.png', object)
	var lineBar = QS('#lineBar'),
		lineBarLeft;
		lineBar.style.position = 'absolute';
		
	switch (gameManager.QUIZ_OPTION[0]) {
		case '버스' :
			lineBarLeft = 250;
			break;
		case '캠핑카' :
			lineBarLeft = 267;
			break;
		case '붓' :
			lineBarLeft = -4;
			break;
		case '크레파스' :
			lineBarLeft = -13;
			break;
		case '포크' :
			lineBarLeft = -3;
			break;
		case '연필' :
			lineBarLeft = -30;
			break;
		case '숟가락' :
			lineBarLeft = 32;
			break;
		case '기차' :
			lineBarLeft = 160;
			break;
	}
	lineBar.style.top = lineBarLeft + 'px';


	for (var i = 0; i < gameManager.QUIZ_OPTION[2].length; i++) {

		createElement('div',quizObjContainer,'choiceQuizText_' + i); 
		var choiceQuizText = document.querySelector('.choiceQuizText_' + i);
		
		choiceQuizText.className = '.choiceQuizText_'+i;
		choiceQuizText.style.top = choiceTop + 'px';
		choiceQuizText.style.left = choiceLeft + 'px';
		choiceQuizText.setAttribute('answerValue', gameManager.QUIZ_OPTION[2][i]);
		choiceQuizText.innerHTML = gameManager.QUIZ_OPTION[2][i];
		
		gameManager.quizPosition.push([choiceTop, choiceLeft]); 
		choiceTop +=200;

		if (buttonType === 'drag') {
			new Dragdrop(choiceQuizText);
		}
	}
}

function gameOver(dragObj) {
	var quizObjContainer = document.querySelector('.quizObjContainer').childNodes;
	for (var i = 0; i < quizObjContainer.length; i++) {
		quizObjContainer[i].style.pointerEvents = "none";
	}
	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);
	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
		gameOverAnimation();  
	}, 500);


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
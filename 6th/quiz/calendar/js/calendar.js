function initScene() {
	console.log('calendarSceneElement...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var canvas =  document.querySelector('#bgCanvas'),
	content = createElement('div',canvas,'content'),
	calendarTable = createElement('div',canvas,'calendarTable'),
	calendar_0 =createElement('div',canvas,'calendar_0'),
	calendar_1 = createElement('div',canvas,'calendar_1');
	createElement('div',content,'question');

	document.querySelector('.calendar_1').setAttribute('style','visibility:hidden');

	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
	  	var dropArea = createElement('div',document.querySelector('#bgCanvas'),'dropArea');
		dropArea.setAttribute('answerValue', gameManager.QUIZ_ANSWER[i]);
  		gameManager.dropArea.push(dropArea);
  	}


	for(var i = 0; i < 5; i++){
		var tableRow = createElement('div',calendarTable,'table-row_'+i);
		tableRow.setAttribute('style','display:table-row')
		for(var j = i*7; j < (i+1)*7; j++){
			var dayElement = createElement('div', tableRow,'cell_'+j);
			if(j%7===0){
				dayElement.setAttribute('style','display:table-cell; color:red;');
			} else if(j%7===6){
				dayElement.setAttribute('style','display:table-cell; color:blue;');
			}
			else {
				dayElement.setAttribute('style','display:table-cell;');
			}

		}
	}

  	for(var i = 0; i < 12 ; i++){
  		var temp = i+gameManager.startPostion;
  		if(temp < 12){
  			document.querySelector( '.cell_'+temp ).innerHTML = gameManager.dayNumArray[i];
  		}
  	}

	appendQuiz('drag', gameManager.quizText);
 }


function initObject() {

	console.log('calendarSceneGetElement...');
	var question = document.querySelector('.question'),
		dropArea = document.querySelector('.dropArea');

	question.innerHTML = gameManager.quizConvert[0]+ "&nbsp;<div class='drop'></div>" +gameManager.quizConvert[1];
	setTimeout(function() {
		var dropElement = document.querySelector('.drop'),
		dropTop = getRealOffsetTop(dropElement);
		dropLeft = getRealOffsetLeft(dropElement);
		dropArea.setAttribute('style','top:'+(dropTop)+"px;"+'left:'+(dropLeft)+'px;');
	}, 100)

}

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }


function appendQuiz(buttonType, quizText) {

	var quizObjContainer = document.createElement('div'),
		choiceLeft = 1045;
		choiceTop = 80;

	quizObjContainer.setAttribute('id', 'quizObjContainer');
	bgCanvas.appendChild(quizObjContainer);

	for (var i = 0; i < quizText.length; i++){

		createElement('div',quizObjContainer,'choiceQuizText_' + i);
		var choiceQuizText = document.querySelector('.choiceQuizText_' + i);
		choiceQuizText.setAttribute('style','background:url("images/dragbox.png") no-repeat;'
			+'top :'+choiceTop+'px; left:' + choiceLeft +'px;');
		choiceQuizText.setAttribute('answerValue', gameManager.quizText[i]);
		choiceQuizText.innerHTML = gameManager.quizText[i];

		gameManager.quizPosition.push([choiceTop, choiceLeft]);
		choiceTop +=140;


		if (buttonType === 'drag') {
			new Dragdrop(choiceQuizText);
		}
	}

}

function gameOver(dragObj) {

	var quizObjContainer = document.querySelector('#quizObjContainer').childNodes;
	document.querySelector('.calendar_0').setAttribute('style','display:none');
	document.querySelector('.calendar_1').setAttribute('style','visibility:visible;');


  	for(var i = 0, max = gameManager.dayNumArray.length; i < max ; i++){
  		var temp = i+ gameManager.startPostion;
  		document.querySelector( '.cell_'+temp ).innerHTML = gameManager.dayNumArray[i];
  	}

	for (var i = 0; i < quizObjContainer.length; i++) {
		quizObjContainer[i].style.pointerEvents = "none";
	}

	document.querySelector('.drop').style.visibility = 'hidden';

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
	}, 700);
	
	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);

}


function weekNum(week){
	var num;
	switch(week){
		case '일':
			num = 0;
			break;
		case '월':
			num = 1;
			break;
		case '화':
			num = 2;
			break;
		case '수':
			num = 3;
			break;
		case '목':
			num = 4;
			break;
		case '금':
			num = 5;
			break;
		default:
			num = 6;
			break;
	}

	return num;
}



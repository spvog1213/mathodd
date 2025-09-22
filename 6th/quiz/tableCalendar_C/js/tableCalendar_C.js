function initScene(val) {
	console.log('>> initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.querySelector('#bgCanvas'),
		content = createElement('div',bgCanvas,'content'),
		eventGroup = createElement('div',bgCanvas,'eventGroup'),
		textArray = ['monthsText_','dayText_','weekText_'],
		btnArray = ['upBtn_','downBtn_'];
		checkBtn_on = createElement('div',eventGroup,'checkBtn_on');
	createElement('div',eventGroup,'checkBtn');
	checkBtn_on.setAttribute('style','visibility:hidden');

	for(var i = 0; i < 2; i++){

		for(var j = 0; j < textArray.length; j++){
			var div = createElement('div', bgCanvas, textArray[j]+i);
			div.innerHTML = gameManager.quizText[j];
		}

		var question = createElement('div',content,'question_'+i);
		createElement('div',question,'textBoard_'+i);
		createElement('div',eventGroup,'btnGroup_'+i);

		for(var j = 0; j < btnArray.length; j++){
			appendImageElement("", gameManager.quizImgArray[i], document.querySelector('.btnGroup_'+i), btnArray[i]+j);
			appendImageElement("", gameManager.quizImgArray[i+2], document.querySelector('.btnGroup_'+i), btnArray[i]+"on_"+j);
		}
	}

	var type = gameManager.QUIZ_TYPE.split('_')[1];
	if(type === "B"){
		document.querySelector('.upBtn_1').setAttribute('style','display:none');
		document.querySelector('.downBtn_1').setAttribute('style','display:none');
	} else if(type === "C"){
		document.querySelector('.upBtn_0').setAttribute('style','display:none');
		document.querySelector('.downBtn_0').setAttribute('style','display:none');
	}

	appendQuiz();
}

function initObject(val) {
	log('initObject...');

	for(var i = 0; i <2; i++){
		document.querySelector('.textBoard_'+i).innerHTML = (val[0])[i];
		document.querySelector('.months_'+i).innerHTML = (val[i+1])[0];
		document.querySelector('.day_'+i).innerHTML =  (val[i+1])[1];
		document.querySelector('.week_'+i).innerHTML =   (val[i+1])[2];
	}
}


function appendQuiz() {

	var quizImgContainer = document.createElement('div'),
		checkBtn =  document.querySelector('.checkBtn'),
		upBtn_0 = document.querySelector('.upBtn_0'),
		downBtn_0 = document.querySelector('.downBtn_0'),
		upBtn_1 = document.querySelector('.upBtn_1'),
		downBtn_1 = document.querySelector('.downBtn_1'),
		tempArray = ['months_','day_','week_'];

	quizImgContainer.setAttribute('id', 'quizImgContainer');
	bgCanvas.appendChild(quizImgContainer);

	for(var i = 0; i < 2; i++){
		for (var j = 0, max = 3; j < max; j++) {
			var div = createElement('div', quizImgContainer, tempArray[j] + i);
			if(i === 1){
				div.setAttribute('answerValue', gameManager.QUIZ_ANSWER[j]);
			}
		}
	}

	upBtn_0.addEventListener(gameManager.eventSelector.upEvent, function() {
		document.querySelector('.upBtn_on_0').style.visibility = "visible";
		setTimeout(function(){
			document.querySelector('.upBtn_on_0').style.visibility = "hidden";
		}, 100);
		streamSound.setSound('media/tableCalendar_C.mp3');
		var day = document.querySelector('.day_1'),
			months = document.querySelector('.months_1'),
			dayNum = parseInt(day.innerHTML),
			monthsNum = parseInt(months.innerHTML);
		dayNum = parseInt(dayNum)+1;

		switch(monthsNum){
			case 1: case 3: case 5: case 7: case 8: case 10: case 12:
			if(dayNum > 31){
				dayNum = 1;
				monthsNum += 1
				if(monthsNum === 13){monthsNum = 1;}
			}
			break;

			case 4: case 6: case 9: case 11:
			if(dayNum > 30){
				dayNum = 1;
				monthsNum += 1
			}
			break;
			default :
			if(dayNum > 24){
				dayNum = 1;
				monthsNum += 1
			}
			break;
		}

		months.innerHTML = monthsNum;
		day.innerHTML = dayNum;

	}, false);




	downBtn_0.addEventListener(gameManager.eventSelector.upEvent, function() {
		document.querySelector('.downBtn_on_0').style.visibility = "visible";
		setTimeout(function(){
			document.querySelector('.downBtn_on_0').style.visibility = "hidden";
		}, 100);
		streamSound.setSound('media/tableCalendar_C.mp3');
		var day = document.querySelector('.day_1'),
			months = document.querySelector('.months_1'),
			dayNum = parseInt(day.innerHTML),
			monthsNum = parseInt(months.innerHTML);
		dayNum = parseInt(dayNum)-1;

		switch(monthsNum-1){
			case 0:
			monthsNum = 12
			dayNum = 31;
			break;
			case 1: case 3: case 5: case 7: case 8: case 10: case 12:
			if(dayNum < 1){
				dayNum = 31;
				monthsNum -= 1;
			}
			break;
			case 4: case 6: case 9: case 11:
			if(dayNum < 1){
				dayNum = 30;
				monthsNum -= 1;
			}
			break;
			default :
			if(dayNum < 1){
				dayNum = 24;
				monthsNum -= 1;
			}
			break;
		}

		months.innerHTML = monthsNum;
		day.innerHTML = dayNum;
	}, false);


	upBtn_1.addEventListener(gameManager.eventSelector.upEvent, function() {
		document.querySelector('.upBtn_on_1').style.visibility = "visible";
		setTimeout(function(){
			document.querySelector('.upBtn_on_1').style.visibility = "hidden";
		}, 100);
		streamSound.setSound('media/tableCalendar_C.mp3');
		var week = document.querySelector('.week_1'),
		weekStr = week.innerHTML;

		for(var i = 0; i< gameManager.week.length; i++){
			if(weekStr === "일"){
				weekStr = gameManager.week[0]
				break;
			}else if(gameManager.week[i] === weekStr){
				weekStr = gameManager.week[i+1]
				break;
			}
		}
		week.innerHTML = weekStr;
	}, false);


	downBtn_1.addEventListener(gameManager.eventSelector.upEvent, function() {
		document.querySelector('.downBtn_on_1').style.visibility = "visible";
		setTimeout(function(){
			document.querySelector('.downBtn_on_1').style.visibility = "hidden";
		}, 100);
		streamSound.setSound('media/tableCalendar_C.mp3');
		var week = document.querySelector('.week_1'),
		weekStr = week.innerHTML;

		for(var i = 0; i< gameManager.week.length; i++){
			if(weekStr === "월"){
				weekStr = gameManager.week[6]
				break;
			}else if(gameManager.week[i] === weekStr){
				weekStr = gameManager.week[i-1]
				break;
			}
		}
		week.innerHTML = weekStr;
	}, false);


	checkBtn.addEventListener(gameManager.eventSelector.upEvent, checkFun, false);

}

function checkFun(){

	var checkBtn = document.querySelector('.checkBtn'),
	checkBtn_on = document.querySelector('.checkBtn_on');

	checkBtn.setAttribute('style','visibility:hidden');
	checkBtn_on.setAttribute('style','visibility:visible');

	clickCompareAnswer();
}


function clickCompareAnswer() {

	var checkBtn = document.querySelector('.checkBtn'),
	checkBtn_on = document.querySelector('.checkBtn_on'),
	day = document.querySelector('.day_1').innerHTML;
	months = document.querySelector('.months_1').innerHTML;
	week = document.querySelector('.week_1').innerHTML;
	temp = [months, day, week],
	count = 0;

	for (var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
		if (temp[i] == gameManager.QUIZ_ANSWER[i]){
			count += 1;
		}
	}

	if(count == 3){
		gameOver();
	} else {
		log('@ incorrect!!');
		setTimeout(function(){
			checkBtn.setAttribute('style','visibility:visible');
			checkBtn_on.setAttribute('style','visibility:hidden');
		}, 100);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}


function gameOver() {

	var bgCanvas = document.querySelector('#bgCanvas');
	bgCanvas.style.pointerEvents = "none";

	setTimeout(function() {
		document.querySelector('.checkBtn_on').style.visibility = 'visible';
		document.querySelector('.checkBtn').style.visibility = 'hidden';
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






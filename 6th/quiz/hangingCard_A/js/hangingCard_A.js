function initScene(val) {
	console.log('hangingCardSceneElement...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var canvas = document.querySelector('#bgCanvas');
	createElement('div', canvas, 'content');
	createElement('div', canvas, 'questionBox');

	for(var i in gameManager.quizConvertNumber){
		var src, shapeName;
		createElement('div', document.querySelector('.questionBox'),'question_'+i);
		createElement('div', document.querySelector('.question_'+i),'back_'+i);

		shapeName = (gameManager.quizConvertNumber[i])[0];

  		// if(shapeName === "figure"){
  		// 	src = "../../images/common/"+shapeName+"/"+(gameManager.quizConvertNumber[i])[1]+"_"+(gameManager.quizConvertNumber[i])[2]+"_"+(gameManager.quizConvertNumber[i])[3]+".png";
  		// } else {
  		// 	src = "../../images/common/"+shapeName+"/"+(gameManager.quizConvertNumber[i])[1]+"_"+(gameManager.quizConvertNumber[i])[2]+"_"+(gameManager.quizConvertNumber[i])[3]+".png";
  		// }
  		src = "../../images/common/"+shapeName+"/"+(gameManager.quizConvertNumber[i])[1]+".png";
		appendImageElement('question_'+i, src, document.querySelector('.question_'+i), 'question_'+i);
		appendImageElement('back_'+i, src, document.querySelector('.back_'+i), 'back_'+i);
	}


	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
		var dropArea = createElement('div',document.querySelector('#bgCanvas'),'dropArea_'+i),
			answerValue = gameManager.QUIZ_ANSWER[i];
		dropArea.setAttribute('answerValue', answerValue);
		gameManager.dropArea.push(dropArea);
	}

	appendQuiz('drag', val[val.length-2]);
}



function initObject() {
	console.log('hangingCardSceneGetElement...');

	var left = 85.5,
		top =  200;

	document.querySelector('.content').setAttribute('style','background:url("images/hangingCard_line.png") no-repeat;');

	for(var index in gameManager.quizConvertNumber){
		var question =  document.querySelector('div.question_'+index),
			backElement = document.querySelector('div.back_'+index);
		question.setAttribute('style','background:url("images/hangingCard_card_'+ gameManager.questionBackNum +'.png")' +'no-repeat; top:'+ top +'px; left:'+ left +'px;');
		backElement.setAttribute('style','background:url("images/hangingCard_card_'+ gameManager.questionBackNum+'_success.png")' +'no-repeat; visibility:hidden;');
		gameManager.quizPosition.push([left, top]);
		left += 183.5;
	}


	for(var i in gameManager.quizIndex){
		var hiddenPosition = document.querySelector('div.question_'+ gameManager.quizIndex[i]),
			dropArea = document.querySelector('.dropArea_'+ i),
			left = hiddenPosition.offsetLeft;

		dropArea.setAttribute('style','top:'+ top +'px; left:'+ left +'px;');
		hiddenPosition.setAttribute('style','visibility:hidden; z-index:1;');
		gameManager.index = gameManager.quizIndex[i];
	}
}


function appendQuiz(buttonType, dragObjArray) {

	var dragObjContainer = document.createElement('div'),
		choiceLeft = 320,
		choiceTop = 510;

	dragObjContainer.setAttribute('id', 'dragObjContainer');
	bgCanvas.appendChild(dragObjContainer);

	for (var i = 0; i < dragObjArray.length; i++) {
		var dragObj = createElement('div', dragObjContainer, 'drag_'+i),
			src = "../../images/common/"+(dragObjArray[i])[0]+"/"+(dragObjArray[i])[1]+".png";
		appendImageElement('drag_'+i, src, dragObj, 'drag_'+i);

		dragObj.setAttribute('style','background:url("images/hangingCard_card_noLine_'+ gameManager.questionBackNum +'.png") no-repeat;'
							+'top:'+ choiceTop +'px; left:'+ choiceLeft +'px;');
		dragObj.setAttribute('answerValue', i);
		gameManager.quizPosition.push([choiceTop, choiceLeft]);
		choiceLeft += 240;

		if (buttonType === 'drag') {
			new Dragdrop(dragObj);
		}
	}

}


function gameOver(dragObj) {

	var dragObjContainer = document.querySelector('#dragObjContainer').childNodes;
		questionBox = document.querySelector('.questionBox').childNodes,
		changeBackImg =  document.querySelector('img.back_'+gameManager.index).src,
		backElementArray = [];

		dragObj.style.background = 'url(images/hangingCard_card_'+gameManager.questionBackNum+'.png) no-repeat';
		for(var i = 0; i < questionBox.length; i++){
			backElementArray.push(document.querySelector('.back_'+i));
		}

		createElement('div', dragObj,'back_ans');
		appendImageElement('back_ans', changeBackImg, document.querySelector('.back_ans'),'back_ans');
		document.querySelector('.back_ans').setAttribute('style','background:url("images/hangingCard_card_'+ gameManager.questionBackNum+'_success.png")'
				+'no-repeat; top:0px; visibility:hidden;');

		backElementArray[backElementArray.length] = document.querySelector('.back_ans');
		questionBox[questionBox.length] = dragObj;

	for(var i = 0; i < gameManager.dropArea.length; i++){
		 document.querySelector('.dropArea_'+i).setAttribute('style','visibility:hidden;');
	}

	for(var i = 0, max = questionBox.length+1; i < max; i++){
			glitterAnimation(backElementArray[i]);
			addIdleAnimation(300, 10, 8, questionBox[i], questionBox[i].offsetTop);
	}

	for (var i = 0; i < dragObjContainer.length; i++) {
		dragObjContainer[i].style.pointerEvents = "none";
	}

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);


	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
		gameOverAnimation();
	}, 800);


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


function glitterAnimation(object){

	var bool = true,
	count = 0,
	interval = setInterval(function(){
		if(bool){
			object.style.visibility = "visible";
			document.querySelector('.back_'+gameManager.index).style.visibility = "hidden";
			bool = false;
			count++;
			if(count >= 50){
				object.style.visibility = "hidden";
				document.querySelector('.back_ans').style.visibility = "hidden";
				clearInterval(interval);
			}
		} else {
			object.style.visibility = "hidden";
			bool = true;
			count++;
		}
	}, 200);
}



function questionArrayMake(val){
	var questionArray = [],
		max = val.length-2;

	Quotient = parseInt(6 / max),
	remainder = parseInt(6 % max);

	for(var i = 0; i < Quotient; i++){
		for(var j = 0; j < max; j++){
			questionArray.push(val[j]);
		}
	}

	if(remainder != 0){
		for(var i = 0; i < remainder; i++){
			questionArray.push(val[i])
		}
	}
	return questionArray;
}



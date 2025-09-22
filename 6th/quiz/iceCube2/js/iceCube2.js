function initScene(val) {
	console.log('icCubeSceneElement...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();


	var canvas = document.querySelector('#bgCanvas');
	createElement('div', canvas, 'content');


	for(var i in gameManager.quizConvertNumber){

  		var questionElement = createElement('div', canvas,'question_'+i),
  			src, shapeName;
  		shapeName = (gameManager.quizConvertNumber[i])[0];


  		// if(shapeName === "figure"){
  		// 	src = "../../images/common/"+shapeName+"/"+(gameManager.quizConvertNumber[i])[1]+"_"+(gameManager.quizConvertNumber[i])[2]+"_"+(gameManager.quizConvertNumber[i])[3]+".png";
  		// } else {
  		// 	src = "../../images/common/"+shapeName+"/"+(gameManager.quizConvertNumber[i])[1]+".png";
  		// }
  		src = "../../images/common/"+shapeName+"/"+(gameManager.quizConvertNumber[i])[1]+".png";
  		appendImageElement('question_'+i, src, questionElement, 'question_'+i);
  	}


	for(var i = 0; i < gameManager.QUIZ_ANSWER.length; i++){
	  	var dropArea = createElement('div',canvas,'dropArea_'+i),
	  		answerValue = gameManager.QUIZ_ANSWER[i];
		dropArea.setAttribute('answerValue', answerValue);
  		gameManager.dropArea.push(dropArea);
  	}

	appendQuiz('drag', val[val.length-2]);
}



function initObject() {
	console.log('iceCubeSceneGetElement...');

	var left = 200,
		top = 115,
		content = document.querySelector('.content'),
		lineNum = 2

	content.setAttribute('style','background:url("images/icecube_icecube_2.png") no-repeat;');

	for(var i = 0; i < lineNum; i++){

		for(var j = ((7*lineNum/lineNum)*i); j < ((7*lineNum/lineNum)*(i+1)); j++){
			document.querySelector('div.question_'+j).setAttribute('style','top:'+top+'px; left:'+left+'px;');
			left += 115;
		}

		left = 200;
		top += 125;
	}


	for(var i in gameManager.quizIndex){
		var hiddenElement = document.querySelector('.question_'+ gameManager.quizIndex[i]),
			left = hiddenElement.offsetLeft,
			top = hiddenElement.offsetTop;
		dropArea = document.querySelector('.dropArea_'+i);
		dropArea.setAttribute('style','top:'+top+'px; left:'+left+'px;');
		hiddenElement.setAttribute('style','visibility:hidden; z-index:1;');
	}

}


function appendQuiz(buttonType, dragObjArray) {

	var dragObjContainer = document.createElement('div'),
		choiceLeft = 330,
		choiceTop = 530;

	dragObjContainer.setAttribute('id', 'dragObjContainer');
	bgCanvas.appendChild(dragObjContainer);

	for (var i = 0; i < dragObjArray.length; i++) {
		var dragObj = createElement('div',dragObjContainer,'drag_'+i),
			src = "../../images/common/"+(dragObjArray[i])[0]+"/"+(dragObjArray[i])[1]+".png";
		appendImageElement('drag_'+i, src, dragObj, 'drag_'+i);

		dragObj.setAttribute('style','top:'+ choiceTop +'px; left:'+ choiceLeft +'px;');
		dragObj.setAttribute('answerValue', i);

		gameManager.quizPosition.push([choiceTop, choiceLeft]);
		choiceLeft +=220;

		if (buttonType === 'drag') {
			new Dragdrop(dragObj);
		}
	}

}


function gameOver(dragObj) {

	var dragObjContainer = document.querySelector('#dragObjContainer').childNodes;

	for (var i = 0; i < dragObjContainer.length; i++) {
		dragObjContainer[i].style.pointerEvents = "none";
	}

	for(var i in gameManager.QUIZ_ANSWER.length){
		bgCanvas.removeChild( document.querySelector('div.dropArea_'+i));
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


function questionArrayMake(lineNum, val){
	var questionArray = [],
		max = val.length-2;

	Quotient = parseInt(7*lineNum / max),
	remainder = parseInt(7*lineNum % max);

	for(var i = 0; i < Quotient; i++){
		for(var j = 0; j < max; j++){
			questionArray.push(val[j])
		}
	}

	if(remainder != 0){
		for(var i = 0; i < remainder; i++){
			questionArray.push(val[i])
		}
	}
	return questionArray;
}



function initScene () {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER[0]);
	log(gameManager.TOTAL_ANSWER_ARRAY);
	// parent.window.initClockTimer();

	appendCircleElement('questionRedStick','red',bgCanvas);
	appendCircleElement('questionGreenStick','green',bgCanvas);

	appendCircleElement('redStick_0','red',bgCanvas);
	appendCircleElement('redStick_1','red',bgCanvas);
	appendCircleElement('redStick_2','red',bgCanvas);
	appendImageElement('answerObject','images/numstick_stick_bg.png',bgCanvas);

	appendCircleElement('wood_green','wood',bgCanvas);
	appendCircleElement('wood_red','wood',bgCanvas);

    appendQuiz(gameManager.choiceQuestion,gameManager.choiceBgImgArray);
 }


 function initObject(buttonType){

	 	var array = new Array();
	 	array.push(document.querySelector('#questionRedStick'));
	 	array.push(document.querySelector('#questionGreenStick'));
	 	array.push(document.querySelector('#redStick_0'));
	 	array.push(document.querySelector('#redStick_1'));
	 	array.push(document.querySelector('#redStick_2'));

	 	var answerObject = document.querySelector('#answerObject'),
	 	wood_green = document.querySelector('#wood_green'),
	 	wood_red = document.querySelector('#wood_red');

	    answerObject.setAttribute('style','top:80px; left:400px;');

	    wood_red.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	    wood_green.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];

	    var left = 150,
	    top = 620;

	    document.querySelector('#wood_green').setAttribute('style','left:' + left +'px; top:'+top+'px;');
	    document.querySelector('#wood_red').setAttribute('style','left:' + (left+250) +'px; top:'+top+'px;');


	    for(var num = 0; num < gameManager.TOTAL_ANSWER_ARRAY.length; num++ ){

			if(num === 1){

				for(var gr = 0; gr < gameManager.TOTAL_ANSWER_ARRAY[num]; gr++){

					if((gr % 2) === 0){
						appendImageElement('green_'+gr,'images/numstick_stick_green1.png', array[num]);
					}else{
						appendImageElement('green_'+gr,'images/numstick_stick_green2.png', array[num]);
					}

				}

				document.querySelector('#questionGreenStick').setAttribute('style','top:80px;');

			} else {

				for(var re = 0; re < gameManager.TOTAL_ANSWER_ARRAY[num]; re++){
					if((re % 2) === 0){
						appendImageElement('red/'+num+'/'+re,'images/numstick_stick_red1.png', array[num]);
					}else{
						appendImageElement('red/'+num+'/'+re,'images/numstick_stick_red2.png', array[num]);
					}

				}

				if (buttonType === 'drag' && num >= 2) {
					new Dragdrop(array[num]);
				}

				var temp = top-(60* gameManager.TOTAL_ANSWER_ARRAY[num]);

				if(num === 0 ){
					document.querySelector('#questionRedStick').setAttribute('style','top:'+temp+'px;');
				} else{

						array[num].setAttribute('style','top:'+temp+'px;');
				}

			}
		}


		var left = 750;
		for(var i = 2; i<=4; i++){
			var index = i;

			array[i].setAttribute('answerValue', gameManager.choiceQuestion[index-2]);
			var top = document.querySelector('#redStick_'+(index-2)).style.top.replace('px', '');
			top = parseInt(top);
			gameManager.choiceQuestionPosition.push([top, left]);
			left += 200;
		}
}


 function appendQuiz(choiceQuestionArray) {

 	var bgCanvas = document.getElementById('bgCanvas'),
 	choiceQuestionContainer = document.createElement('div'),
 	choiceLeft = 0;

	choiceQuestionContainer.setAttribute('id', 'choiceQuestionContainer');
	bgCanvas.appendChild(choiceQuestionContainer);

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		appendCircleElement('choiceQuestion_' + i, 'rect', choiceQuestionContainer);

		var currentQuestion = document.querySelector('#choiceQuestion_' + i);
		currentQuestion.innerHTML = gameManager.choiceQuestion[i];
		choiceLeft += 200;

		var temp = choiceLeft + 550;
		currentQuestion.setAttribute('style','top : 620px; left:' + temp +'px;');
	}

}


function incorrectAnimation (dragObj) {
	var dragObjId = dragObj.id;
		dragObjId = dragObjId.split('_');

		console.log(dragObjId[1]);
		console.log(gameManager.choiceQuestionPosition[dragObjId[1]][1]);

	var top = gameManager.choiceQuestionPosition[dragObjId[1]][0],
		currentTop = parseInt(dragObj.style.top.replace('px', ''));

	animate({
		delay: 20,
		duration: 800,
		delta: makeEaseOut(elastic),
		step: function (delta) {
			dragObj.style.top = ((-100 * delta) + (100) + top)  + 'px';
			dragObj.style.left = gameManager.choiceQuestionPosition[dragObjId[1]][1] + 'px';
		}
	});
}




function gameOver(dragObj) {

 	var choiceQuestionContainer = document.querySelector('#choiceQuestionContainer').childNodes;
 	var bgCanvas = document.getElementById('bgCanvas');
	for (var i = 0; i < choiceQuestionContainer.length; i++) {
		document.querySelector('#redStick_'+i).style.pointerEvents = "none";

	}

	var answerObject = document.querySelector('#answerObject');
	bgCanvas.removeChild(answerObject);

	var answer =  parseInt(document.getElementById('wood_red').innerHTML)+parseInt(dragObj.getAttribute('answerValue'));
	var wood_red = document.getElementById('wood_red');
	wood_red.innerHTML = answer;

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



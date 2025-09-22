function initScene() {
	log('initScene...');
	
	log('excute initClockTimer!');
	// parent.window.initClockTimer();
	CheckButton();
	questionText();
	

	
}
function cardCounterResize(){
	var cardCounter = parseInt(gameManager.TOTAL_ANSWER_ARRAY[0][2]),
		obj = document.querySelector('#cardCounter');
	if(cardCounter === 2 || cardCounter === 3 || cardCounter === 5){
		obj.style.top = '340px';
	}else if(cardCounter === 4){
		obj.style.top = '280px';
		obj.style.left = '477px';
		obj.style.width = '370px';
	}else if(cardCounter === 6){
		obj.style.top = '210px';
		obj.style.left = '477px';
		obj.style.width = '370px';
	}else if(cardCounter === 8){
		obj.style.left = '477px';
		obj.style.width = '370px';
	}else if(cardCounter === 9){
		obj.style.top = '210px';
		obj.style.width = '600px';
		obj.style.left = '350px';
	}

}
function questionText(){
	appendCircleElement('questionBg', 'questionBg', bgCanvas);
	appendCircleElement('bignum', 'num', questionBg);
	appendCircleElement('num', 'numWrap', questionBg);
	appendCircleElement('num1', 'num', num);
	appendCircleElement('line', 'num', num);
	appendCircleElement('num2', 'num', num);
	appendCircleElement('question', 'num', questionBg);
	if(gameManager.TOTAL_ANSWER_ARRAY[0][0] === 0){
		bignum.innerHTML = '';
	}else{
		bignum.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0][0];
	}
	
	num1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0][1];
	line.innerHTML = '----';
	num2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0][2];
	question.innerHTML = '만큼 선택하기';
}
function initCard() {
	log('initCard...');

    var randomAnimal = parseInt(Math.floor(Math.random() * 4)) +1,
		cardOriginal = 'images/vic_selectcard_card'+ randomAnimal +'.png';
	
	for(var i = 0; i < gameManager.TOTAL_ANSWER_ARRAY[0][2]; i++) {
		appendCircleElement('cardWrap_'+i , 'cardWrap', document.querySelector('#cardCounter'));
		var cardWrap = document.querySelector('#cardWrap_'+i);
		appendImageElement('parentObj_' + i, cardOriginal, cardWrap,'parentObj');		
		var parentObj = document.querySelector('#parentObj_'+i);
		

		btnDown = function(e) {
			streamSound.setSound('media/donut.mp3');	
			e.preventDefault();
			this.src = this.src.replace('.png','_on.png');
			this.style.pointerEvents = 'none';
			appendImageElement('answerMark', 'images/checkmark.png', this.parentNode);	
			
		}
		
		parentObj.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	}


}

function gameOver(dragObj) {
		var answerMark = document.querySelectorAll('#answerMark');

	if (gameManager.CURRENT_ANSWER[0] === answerMark.length) {
		 var cardWrap = document.querySelectorAll('.cardWrap'),
		 	checkBtn = document.querySelector('#checkBtn');

		 for (var i = 0; i < cardWrap.length; i++) {
			cardWrap[i].style.pointerEvents = 'none'; 		
			checkBtn.style.pointerEvents = "none";
			}

		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');

		logCounter.tryCounter();
		logCounter.endTime();

		// setTimeout(function() {
		// 	log('excute stampStarIcon!');
		// 	// parent.window.stampStarIcon();
		// }, 500);

		// // save log data
		// setTimeout(function() {
		// 	log('excute insDrillHis!');
		// 	// parent.window.insDrillHis(logCounter.submitReport());
		// }, 1800);
	}else{
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();

		setTimeout(function() {
			gameManager.selectedQuestion = [];
			document.querySelector('#bgCanvas').innerHTML = "<div id='cardCounter'></div><div id='answerObject1'></div><img src='images/checkbtn.png' id = 'checkBtn'/>";
			initCard();
			cardCounterResize();
			CheckButton();
			questionText();
			
		}, 400);
	}
}

function CheckButton() {
	var checkBtn = document.querySelector('#checkBtn');

	btnDown = function(e) {
		e.preventDefault();
		checkBtn.src = 'images/checkbtn_push.png';
	}
	btnUp = function(e) {
		e.preventDefault();
		checkBtn.src = 'images/checkbtn.png';
		gameOver(this);
	}

	checkBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	checkBtn.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);

}


function boundingCircle(dragObj, x, y) {
	log('bounding!');

	var bool = dropCompare(dragObj, x, y);

	console.log('bool[0]:', bool[0]);
	console.log('bool[1]:', bool[1]);
	console.log('dragObj.parentNode:', dragObj.parentNode);
	var answerNumberCardCount = QS('#answerCardAreaContainer').querySelectorAll('.number_card').length;
	console.log('answerNumberCardCount:', answerNumberCardCount);
	dragObj.setAttribute('style','');

	// 드래그 실패했는데 포인트 카드가 아닐경우.
	if(!bool[0] && dragObj.innerHTML != '.'){
		log("드래그 실패.1");
		if(dragObj.parentNode.getAttribute('id').indexOf('list') > -1){
			streamSound.setSound('../../media/incorrect.mp3');
		}
		else{
			dragObj.parentNode.removeChild(dragObj);
			streamSound.setSound(gameManager.soundEffct);
		}


		numCardAreaSum.setPointCardDrag();

		// 숫자 카드 3개 다 찼다가 빠질 때,
		if(answerNumberCardCount === 3) {
			var cardAreas = QS('#answerCardAreaContainer').querySelectorAll('.cardArea');
			for(var i = 0; i < cardAreas.length; i++) {
				if(cardAreas[i].children[0])
					cardAreas[i].children[0].classList.remove('on');
			}
		}
		return;
	}

	// 드래그 실패했는데 포인트 카드 일경우
	if(!bool[0] && dragObj.innerHTML == '.'){
		log("드래그 실패.2");
		streamSound.setSound('../../media/incorrect.mp3');

		numCardAreaSum.setPointCardDrag();
		return;
	}

	if( bool[0].children[0] && dragObj.parentNode.getAttribute('id').indexOf('list') > -1 && bool[0].children[0].classList.contains('point_card_on')) {
		log("드래그 실패.3");
		dragObj.parentNode.removeChild(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');

		numCardAreaSum.setPointCardDrag();
		return;
	}


	// 수식에 있는 카드로 드래그 성공했는데. 해당 카드 area 에 포인트 카드가 있을경우 실패 처리.
	if( bool[0].children[0] && bool[0].children[0].innerHTML == '.' && bool[0].children[0].classList.contains('point_card_off')){
		log("드래그 실패.4");
		dragObj.parentNode.removeChild(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');

		numCardAreaSum.setPointCardDrag();
		return;
	}
	if (bool[0]) {
		// 드래그 성공시
		log("드래그 성공.");
		streamSound.setSound(gameManager.soundEffct);
		if(dragObj.innerHTML == '.'){
			var pointParent = dragObj.parentNode;
			var fromParent = bool[0];
			var swapCard = bool[0].children[0];

			bool[0].appendChild(dragObj);
			pointParent.appendChild(swapCard);
		}
		else{

			//수식에서 수식으로 이동햇는데 카드가 있을경우.
			if( dragObj.parentNode.getAttribute('id').substr(0,6) == 'answer' &&
				bool[0].getAttribute('id').substr(0,6) == 'answer' &&
				bool[0].children.length>0){

				var dragParent = dragObj.parentNode;
				var fromParent = bool[0];
				var swapCard = bool[0].children[0];

				bool[0].appendChild(dragObj);
				dragParent.appendChild(swapCard);
			}
			else {
				var parent, oldChild, newChild;
				parent = bool[0];
				oldChild = bool[0].children[0];
				newChild = dragObj;

				if(oldChild === undefined)
					parent.appendChild(newChild);
				else
					parent.replaceChild(newChild, oldChild);

			}

		}

		numCardAreaSum.setPointCardDrag();
	}
}

function dropCompare (dragObj, x, y) {
	log("@@@@@@@@@@@@@@:dropCompare x:"+x+",y:"+y);

	for (var i = 0; i < gameManager.dropArea.length; i++) {
		log("x:"+gameManager.dropArea[i].offsetLeft * gameManager.zoomRate + "보다 크고.");
		log("x:"+((gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + (gameManager.dropArea[i].clientWidth * gameManager.zoomRate)) + "보다 작을때.");

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight) * gameManager.zoomRate)) {
			return [gameManager.dropArea[i], i];
		}

	}
	return [false];
}

function gameOver() {
	streamSound.setSound('../../media/correct.mp3');

	var canvas = document.querySelector('#bgCanvas');
		canvas.style.pointerEvents = "none";

	setTimeout(function() {
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

function createCard(cardArea,val){
	var card = new Card();
	card.name = "card" + numCardAreaSum.cardCnt;

	var cardElement = createElement('span', cardArea);
	card.setElement(cardElement);
	card.setValue(val);
	card.init();

	numCardAreaSum.addCard(card);
	numCardAreaSum.cardCnt++;
	return card;
}

var Card = function(){
	var _this = this;
	var _element;
	var _value = "";

	var onMouseDown = function(e){
		log(_this.name + " onMouseDown()");
		var cardArea = numCardAreaSum.getCardAreaByEl(_element.parentNode);
		log("cardArea Name:"+cardArea.name);

		if(cardArea.name.substr(0,4) == "list"){
			createCard(cardArea.getElement(),_value);
		}
	}

	var setDefaultStyle = function(){
		_element.setAttribute('class','');
		if(_value === '.'){
			_element.classList.add('point_card_off');
		}
		else{
			_element.classList.add('number_card');
		}
	}

	var setContents = function(){
		if(_value.toString().length > 0){
			_element.innerHTML = _value;
		}
		else{
			_element.innerHTML = "&nbsp;"
		}

		_element.addEventListener(gameManager.eventSelector.downEvent ,onMouseDown);
	}

	this.name = "";

	this.setElement = function(el){
		_element = el;
		setDefaultStyle();
	}

	this.getElement = function(){
		return _element;
	}

	this.setValue = function(val){
		_value = val;
	}

	this.getValue = function(){
		return _value;
	}

	this.init = function(){
		setDefaultStyle();
		setContents();

		new Dragdrop(_element);
	}

	this.reset = function(){
		setDefaultStyle();
		setContents();
	}
}

/**
* CardArea
*/
var CardArea = function(){
	var _this = this;
	var _element;

	var setDefaultStyle = function(){
		if(!_element.classList.contains('cardArea')){
			_element.classList.add('cardArea');
		}
	}

	var setContents = function(){
	}

	this.name = "";

	this.setElement = function(el){
		_element = el;
		setDefaultStyle();
	}

	this.getElement = function(){
		return _element;
	}

	this.init = function(){
		setDefaultStyle();
		setContents();
	}

	this.reset = function(){
		setDefaultStyle();
		setContents();
	}
}

/**
* NumCardAreaSum 게임
*/
var NumCardAreaSum = function(){
	var _this = this;
	var _answer = [];
	var _listCardAreas = [];
	var _answerCardAreas = [];
	var _cards = [];

	var checkAnswer = function(){ console.log('>>checkAnswer');
		var checkAnswerStr = "";
		var answerArray = _answer[0].split('');

		_answerCardAreas.forEach(function(el, i){console.log(el);
			var card = el.getElement().children[0];

			if(card !== undefined) {
				checkAnswerStr += card.innerHTML;

				if(card.innerHTML !== answerArray[i]) {
					if(!el.getElement().classList.contains('wrong')) {
						el.getElement().classList.add('wrong');
						setTimeout(function(){
							el.getElement().classList.remove('wrong');
						}, 600);
					}
				}
			}
			else {
				if(!el.getElement().classList.contains('wrong')) {
					el.getElement().classList.add('wrong');
					setTimeout(function(){
						el.getElement().classList.remove('wrong');
					}, 600);
				}
			}
		});

		console.log(checkAnswerStr, answerArray);

		if(checkAnswerStr == _answer[0] ){
			return true;
		}
		else{
			return false;
		}
	}

	var feedBackWrong = function(){
		log('오답');
		streamSound.setSound('../../media/incorrect.mp3');

		var checkBtn = QS('#checkContainer > div');
		if(checkBtn.classList.contains('on')) {
			window.setTimeout(function() {
				checkBtn.classList.remove('on');
			}, 100);
		}
	}

	var feedBackClear = function(){
		log('정답');
		gameOver();
	}

	/*************************************************************** 설정 관련 start */

	this.name;
	this.cardCnt = 0;

	this.setAnswer = function(answer){
		_answer = answer;
	}

	this.getAnswer = function(){
		return _answer;
	}

	this.setPointCardDrag = function(){
		var cnt = 0;
		for(var i=0,max=_answerCardAreas.length;i<max;i++){
			if ( _answerCardAreas[i].getElement().children.length > 0 ){
				cnt++;
			}
		}

		var pointCardElement = QS('.point_card');
		
		if(cnt === gameManager.QUIZ_ANSWER[0].length){
			console.log('포인트 카드 드래그 활성화');
			var answerCards = QS('#answerCardAreaContainer').querySelectorAll('.cardArea');

			for(var i = 0; i < answerCards.length; i++) {
				answerCards[i].children[0].classList.add('on');
			}

			if(pointCardElement.classList.contains('point_card_off')){
				pointCardElement.classList.remove('point_card_off');
			}
			if(!pointCardElement.classList.contains('point_card_on')){
				pointCardElement.classList.add('point_card_on');
			}
		}
		else{
			log("포인트 카드 드래그 불가능");
			if(pointCardElement.classList.contains('point_card_on')){
				pointCardElement.classList.remove('point_card_on');
			}
			if(!pointCardElement.classList.contains('point_card_off')){
				pointCardElement.classList.add('point_card_off');
			}
		}
	}
	/*************************************************************** 설정 관련 end */

	/*************************************************************** 객체 관련 메소드 start */
	this.addListCardAreas = function(cardArea){
		_listCardAreas.push(cardArea);
	}

	this.getListCardArea = function(index){
		return _listCardAreas[index];
	}

	this.addAnswerCardArea = function(cardArea){
		_answerCardAreas.push(cardArea);
	}

	this.getAnswerCardArea = function(index){
		return _answerCardAreas[index];
	}

	this.getCardAreaByEl = function(el){

		for(var i=0,max=_listCardAreas.length;i<max;i++){
			if ( _listCardAreas[i].getElement() == el){
				return _listCardAreas[i];
			}
		}

		for(var i=0,max=_answerCardAreas.length;i<max;i++){
			if ( _answerCardAreas[i].getElement() == el){
				return _answerCardAreas[i];
			}
		}
	}

	this.addCard = function(card){
		_cards.push(card);
	}

	this.getCard = function(index){
		return _cards[index];
	}

	this.getCardByEl = function(el){
		for(var i=0,max=_cards.length;i<max;i++){
			if(_cards[i].getElement()){
				if ( _cards[i].getElement() == el){
					return _cards[i];
				}
			}
		}
	}
	/*************************************************************** 객체 관련 메소드 end */

	/*************************************************************** 실행 관련 메소드 start */
	this.check = function(){
		log(_this.name + ": check");

		QS('#checkContainer > div').classList.add('on');

		if(checkAnswer()){
			feedBackClear();
		}
		else{
			feedBackWrong();
		}

	}

	this.init = function(){

		for(var i=0,max=_listCardAreas.length;i<max;i++){
			_listCardAreas[i].init();
		}

		for(var i=0,max=_answerCardAreas.length;i<max;i++){
			_answerCardAreas[i].init();
		}
	}
	/*************************************************************** 실행 관련 메소드 end */
}

/**
* 게임 생성.
*/
var numCardAreaSum;
function createNumCardAreaSum(){
	/** numCardAreaSum 게임 생성. */
	numCardAreaSum = new NumCardAreaSum();
	numCardAreaSum.name = "numCardAreaSum";
	numCardAreaSum.setAnswer(gameManager.QUIZ_ANSWER);

	var max = gameManager.QUIZ_ANSWER[0].length;

	/** listCardArea 생성. */
	for(var i=0;i<10;i++){
		var listCardAreaElement = createElement('div', QS('#listCardAreaContainer'));
		listCardAreaElement.setAttribute('id','listCardArea'+i);
		listCardAreaElement.classList.add('listCardArea');

		var cardArea = new CardArea();
		cardArea.name = "listCardArea"+i;
		cardArea.setElement(listCardAreaElement);

		var card = createCard(listCardAreaElement,i);
		numCardAreaSum.addListCardAreas(cardArea);
	}

	/** answerCardArea 생성. */
	for(var i=0;i<max;i++){
		console.log('여기다아앙', gameManager.QUIZ_ANSWER[0].length);
		var answerCardAreaElement = createElement('div', QS('#answerCardAreaContainer'));
		answerCardAreaElement.setAttribute('id','answerCardArea'+i);
		answerCardAreaElement.classList.add('answerCardArea');
		gameManager.dropArea.push(answerCardAreaElement);

		if(gameManager.QUIZ_ANSWER[0].length == 3){
			answerCardAreaElement.classList.add('leftPlus');
		}

		var cardArea = new CardArea();
		cardArea.name = "answerCardArea"+i;
		cardArea.setElement(answerCardAreaElement);

		if(i===max-1){
			var card = createCard(answerCardAreaElement,'.');
			card.getElement().classList.add('point_card');
		}
		numCardAreaSum.addAnswerCardArea(cardArea);
	}

	// 수식 노트 생성..
	var arithmeticNote = createElement('div', QS('#arithmeticContainer'));
	arithmeticNote.classList.add('arithmetic_note');

	// 수식 생성.
	var arithmeticTopElement = createElement('div', QS('#arithmeticContainer'));
	arithmeticTopElement.classList.add('arithmetic_top');
	arithmeticTopElement.innerHTML = '<span>'+gameManager.QUIZ_OPTION[0]+'</span>';

	var arithmeticSignElement = createElement('div', QS('#arithmeticContainer'));
	arithmeticSignElement.classList.add('arithmetic_sign');
	var arithmeticSignElementSpan = createElement('span', arithmeticSignElement);
	replaceSymbol('*', arithmeticSignElementSpan);
	arithmeticSignElementSpan.querySelector('img').style.width = 44 + 'px';
	arithmeticSignElementSpan.querySelector('img').style.height = 44 + 'px';
	//arithmeticSignElement.innerHTML = '<span>×</span>';

	var arithmeticBottomElement = createElement('div', QS('#arithmeticContainer'));
	arithmeticBottomElement.classList.add('arithmetic_bottom');
	arithmeticBottomElement.innerHTML = '<span>'+gameManager.QUIZ_OPTION[1]+'</span>';

	// 수식 bar
	var barElement = createElement('div', QS('#arithmeticContainer'));
	barElement.classList.add('arithmetic_bar');

	// 정답확인 버튼 생성.
	var checkBtn = createElement('div', QS('#checkContainer'));
	checkBtn.classList.add('check_btn');
	checkBtn.addEventListener('click', function(e) {
		e.preventDefault();
		numCardAreaSum.check();
	});

	numCardAreaSum.init();
}

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');
	createNumCardAreaSum();
}

function initObject(val) {
	log('initObject...');
}

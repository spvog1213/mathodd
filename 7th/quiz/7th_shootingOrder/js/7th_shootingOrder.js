function DragdropHorizontal(element) {
	this.element = element;
	this.parentElement = window;
	this.createDragdrop();
}

DragdropHorizontal.prototype.createDragdrop = function() {

	var dragDrop = this,
	startDrag = function(e) {
		e.preventDefault();
		var eventMaster = eventSelector('downEvent', e);
		streamSound.setSound('../../media/silent.mp3');
		//dragDrop.offY = eventMaster.clientY - (dragDrop.element.offsetTop * gameManager.zoomRate);
		dragDrop.offX = eventMaster.clientX - (dragDrop.element.offsetLeft * gameManager.zoomRate);

		this.style.zIndex = 20;
		dragDrop.parentElement.addEventListener(gameManager.eventSelector.moveEvent, drag, true);
	},
	drag = function(e) {
		e.preventDefault();
		var eventMaster = eventSelector('moveEvent', e);

		dragDrop.element.style.position = 'absolute';

		//dragDrop.newY = eventMaster.clientY - dragDrop.offY;
		dragDrop.newX = eventMaster.clientX - dragDrop.offX;

		dragDrop.element.style.left = (dragDrop.newX / gameManager.zoomRate) + 'px';
		//dragDrop.element.style.top = (dragDrop.newY / gameManager.zoomRate) + 'px';
	},
	endDrag = function(e) {
		var eventMaster = eventSelector('upEvent', e);
		dragDrop.parentElement.removeEventListener(gameManager.eventSelector.moveEvent, drag, true);
		if (eventMaster !== undefined)
			boundingCircle(this, eventMaster.clientX, eventMaster.clientY);

		this.style.zIndex = 2;
	}

	outDrag = function(e){
		var eventMaster = eventSelector('upEvent', e);
		dragDrop.parentElement.removeEventListener(gameManager.eventSelector.moveEvent, drag, true);
		if (eventMaster !== undefined)
			boundingOutCircle(this, eventMaster.clientX, eventMaster.clientY);
	}

	dragDrop.element.addEventListener(gameManager.eventSelector.downEvent, startDrag, false);
	dragDrop.element.addEventListener(gameManager.eventSelector.upEvent, endDrag, false);
	dragDrop.element.addEventListener(gameManager.eventSelector.outEvent, outDrag, false);

}

function boundingOutCircle(dragObj, x, y){
	var current = shootingOrder.getShooter().getCurrent();
	var bubble = shootingOrder.getBubble(current);
	dragObj.style.left = (bubble.getElement().offsetLeft - 46) + 'px';
}

function boundingCircle(dragObj, x, y) {
	log('bounding!');

	var bool = dropCompare(dragObj, x, y);

	if (bool[0]) {
		var bubble = shootingOrder.getBubbleByElement(bool[0]);
		var bubbleIndex = bubble.getIndex();
		var shooterCurrent = shootingOrder.getShooter().getCurrent();
		log("####### bubbleIndex:" + bubbleIndex);
		log("####### shooterCurrent:" + shooterCurrent);

		if(bubbleIndex === shooterCurrent){
			shootingOrder.shootRun();
		}
		else{
			shootingOrder.getShooter().setCurrent(bubbleIndex);
		}

		log("############# : " +bool[0].offsetLeft);
		dragObj.style.left = (bool[0].offsetLeft - 46) + 'px';
	}
	else{
		var current = shootingOrder.getShooter().getCurrent();
		var bubble = shootingOrder.getBubble(current);
		dragObj.style.left = (bubble.getElement().offsetLeft - 46) + 'px';
	}
}

function dropCompare (dragObj, x, y) {
	log("@@@@@@@@@@@@@@:dropCompare x:"+x+",y:"+y);

	for (var i = 0; i < gameManager.dropArea.length; i++) {
		log("x:"+gameManager.dropArea[i].offsetLeft * gameManager.zoomRate + "보다 크고.");
		log("x:"+((gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + (gameManager.dropArea[i].clientWidth * gameManager.zoomRate)) + "보다 작을때.");

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth) * gameManager.zoomRate)) {
			return [gameManager.dropArea[i], i];
		}

	}
	return [false];
}

function gameOver() {

	var canvas = document.querySelector('#bgCanvas');
		canvas.style.pointerEvents = "none";

	setTimeout(function() {
		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');
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

var QuestionTitle = function(){
	var _this = this;
	var _element;
	var _value;

	var setDefaultStyle = function(){
	}

	var setContents = function(){
		var txt;
		if(_element.children.length === 0){
			txt = createElement('span', _element);
		}
		else{
			txt = _element.children[0];
		}

		if(typeof _value === 'string'){
			txt.classList.add('txt');
			txt.innerHTML = _value;
		}
		else if(typeof _value === 'object'){
			var bunsu = createElement('span', txt);
			makeBunsu(_value[0].toString(),bunsu);
		}
	}

	this.name;

	this.setElement = function(el){
		_element = el;

		setDefaultStyle();
	}

	this.getElement = function(){
		return _element;
	}

	this.setValue = function(val){
		_value = val;

		setContents();
	}

	this.getValue = function(){
		return _value;
	}

	this.init = function(){
		setContents();
	}

	this.reset = function(){

	}
}

/**
* 수학식 연산자 물방울.
*/
var Bubble = function(){
	var _this = this;
	var _element;
	var _enabled = true;
	var _value;
	var _index;

	var setDefaultStyle = function(){
		if(!_element.classList.contains('bubble')){
			_element.classList.add('bubble');
		}
	}

	var setContents = function(){
		var span = createElement('span',_element);
		replaceSymbol(_value, span);
		span.querySelector('img').style.width = 34 + 'px';
		span.querySelector('img').style.height = 34 + 'px';
		//_element.innerHTML = "<span>" + _value + "</span>";
	}

	this.name = "";

	this.setElement = function(el){
		_element = el;
		setDefaultStyle();
	}

	this.getElement = function(){
		return _element;
	}

	this.setIndex = function(index){
		_index = index;
	}

	this.getIndex = function(){
		return _index;
	}

	this.setEnabled = function(enabled){
		_enabled = enabled;
	}

	this.getEnabled = function(){
		return _enabled;
	}

	this.setValue = function(val){
		_value = val;
	}

	this.getValue = function(){
		return _value;
	}

	this.init = function(){
		setContents();
	}

	this.reset = function(){
		setDefaultStyle();
	}
}

/**
* 수학 식 텍스트
*/
var TextView = function(){
	var _this = this;
	var _value;
	var _element;

	// 스타일 적용.
	var setDefaultStyle = function(){
		if(!_element.classList.contains('textView')){
			_element.classList.add('textView');
		}
	}

	// TextView 내용 적용.
	var setContents = function(){ console.log(_value);
		if(_value){
			if(typeof _value === 'object') makeBunsu(_value.toString(), _element);
			else if(typeof _value === 'string' && _value.indexOf(']') > -1) makeBunsu(_value.toString(), _element);
			else _element.innerHTML = '<span class="noBunsu">' + _value + '</span>';
		}
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
		setContents();
	}
}

/**
* 잠수함
*/
var Shooter = function(){
	var _this = this;
	var _parent;
	var _element;
	var _enabled;
	var _current = 0;
	var _isShoot = false;

	this.name = "";

	var setDefaultStyle = function(){
		if(!_element.classList.contains('shooter')){
			_element.classList.add('shooter');
		}
	}

	var setContents = function(){
		var bodyElement = createElement('span', _element);
		bodyElement.classList.add('shoot_body');
		bodyElement.setAttribute('id','shootBody');

		// bulletElement 생성.
		var bulletElement = createElement('span', _element);
		bulletElement.classList.add('shoot_bullet');
		bulletElement.setAttribute('id','shootBullet');
		// bulletElement.style.top = -120+'px';
	}

	this.setParent = function(parent){
		_parent = parent;
	}

	this.getParent = function(){
		return _parent;
	}

	this.setElement = function(el){
		_element = el;
	}

	this.getElement = function(){
		return _element;
	}

	this.setCurrent = function(index){
		_current = index;

		var bubble = _parent.getBubble(_current);
		var tx = bubble.getElement().offsetLeft - 46;

		log("############# : " +bubble.getElement().offsetLeft);
		_element.style.left = tx + 'px';
	}

	this.getCurrent = function(){
		return _current;
	}

	this.reset = function(){
	}

	this.init = function(){
		setDefaultStyle();
		setContents();

		new DragdropHorizontal(_element);
	}

	this.shoot = function(){
		if(_isShoot){
			return;
		}
		_isShoot = true;

		var redBubble = _parent.getRedBubble(_parent.getQuizIndex());

		var tY = parseInt(redBubble.getElement().style.top);
		var fY = -162;

		log("shoot : ty:" + tY);
		log("shoot : fY:" + fY);
		animate({
				delay : 20,
				duration : 200,
				delta : makeEaseOut(quad),
				step : function(delta) {
					redBubble.getElement().style.top = tY + ( fY * delta ) +"px";
					log('top:'+redBubble.getElement().style.top);
				}
			});
		setTimeout(function(){
			_isShoot = false;

		}, 220);


	}
}

/**
* 수학 식 텍스트
*/
var RedBubble = function(){
	var _this = this;
	var _value;
	var _element;
	var _parent;

	var _enabled = true;

	var setDefaultStyle = function(){
		if(!_element.classList.contains('red_bubble')){
			_element.classList.add('red_bubble');
		}
		_element.style.top = -17 + 'px';
	}

	var setContents = function(){
		if(_element.children.length === 0 ){
			_element.innerHTML = "<span>"+_value+"</span>";
		}
	}

	this.name = "";

	this.setParent = function(parent){
		_parent = parent;
	}

	this.getParent = function(){
		return _parent;
	}

	this.setEnabled = function(enabled){
		_enabled = enabled;
	}

	this.getEnabled = function(){
		return _enabled;
	}

	this.setElement = function(el){
		_element = el;
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

	this.bubblePop = function(){
		// log(this.name + " bubblePop()");
		//
		// _element.classList.remove('red_bubble');
		// _element.classList.add('red_bubble_pop');
		// _element.innerHTML = "";
		//
		// setTimeout(function(){
		// 	_element.classList.remove('red_bubble_pop');
		//
		// }, 300);
	}

	this.show = function(){
		_element.style.display = 'block';
		//_element.style.top = 80 + 'px';
	}

	this.hide = function(){
		_element.style.display = 'none';
	}

	this.reset = function(){
		setDefaultStyle();
		setContents();
	}

	this.init = function(){
		setDefaultStyle();
		setContents();
	}
}

var Quiz = function(){
	var _this = this;
	var _answer;
	var _clear = false;

	this.setAnswer = function(val){
		_answer = val;
	}

	this.getAnswer = function(){
		return _answer;
	}

	this.getClear = function(){
		return _clear;
	}

	this.clear = function(){
		_clear = true;
	}
}

/**
* ShootingOrder 게임
*/
var ShootingOrder = function(){
	var _this = this;
	var _answer = [];
	var _quizs = [];

	var _shooter;
	var _bubbles = [];
	var _textViews = [];
	var _redBubbles = [];
	var _quizIndex =0;

	var checkAnswer = function(){
		var value = _bubbles[_shooter.getCurrent()].getValue();
		var answer = _quizs[_quizIndex].getAnswer();

		if(value === answer){
			return true;
		}
		else{
			return false;
		}
	}

	var feedBackWrong = function(){
		log('오답');
		streamSound.setSound('../../media/incorrect.mp3');
	}

	var feedBackClear = function(){
		log('정답');
	}

	var shootOnBubble = function(){
		var isAnswer = checkAnswer();

		if(isAnswer){
			// 정답
			feedBackClear();
			streamSound.setSound('media/shooting_success.mp3');
			// 레드 물방울 설정.
			var redBubble = _redBubbles[_quizIndex];
			redBubble.setEnabled(false);

			var blueBubble = _bubbles[_shooter.getCurrent()];
			blueBubble.setEnabled(false);

			QS('#shooterContainer').appendChild(redBubble.getElement());
			redBubble.getElement().style.left = (blueBubble.getElement().offsetLeft + 12) + 'px';

			nextQuiz();
		}
		else{
			// 오답
			feedBackWrong();
			streamSound.setSound('media/shooting_pang.mp3');
			var redBubble = _redBubbles[_quizIndex];

			redBubble.getElement().classList.add('red_bubble_pop');
			redBubble.getElement().innerHTML = "";

			setTimeout(function(){
				redBubble.getElement().classList.remove('red_bubble_pop');
				redBubble.reset();
			}, 150);
		}
	}

	var nextQuiz = function(){
		if(_quizIndex < _quizs.length-1){
			_quizIndex++;
			var redBubble = _redBubbles[_quizIndex];
			redBubble.show();
		}
		else{
			// for(var i=0,max=_redBubbles.length;i<max;i++){
			// 	_redBubbles[i].bubblePop();
			// }

			gameOver();
		}
	}

	/*************************************************************** 설정 관련 start */

	this.name;

	this.setAnswer = function(answer){
		_answer = answer;

		if(typeof answer === 'object'){
			if(_answer.length > 0){
				for(var i=0,max=_answer.length;i<max;i++){
					var quiz = new Quiz();
					quiz.setAnswer(_answer[i]);
					_quizs.push(quiz);
				}
			}
		}
		else{
			var quiz = new Quiz();
			quiz.setAnswer(answer);
			_quizs.push(quiz);
		}

	}

	this.getAnswer = function(){
		return _answer;
	}

	this.getQuizIndex = function(){
		return _quizIndex;
	}
	/*************************************************************** 설정 관련 end */

	/*************************************************************** 객체 관련 메소드 start */
	this.addBubble = function(bubble){
		_bubbles.push(bubble);
	}

	this.getBubble = function(index){
		return _bubbles[index];
	}

	this.getBubbles = function(){
		return _bubbles;
	}

	this.getBubbleByElement = function(el){
		for(var i=0,max=_bubbles.length;i<max;i++){
			if(_bubbles[i].getElement() == el){
				return _bubbles[i];
			}
		}
	}

	this.addTextView = function(textView){
		_textViews.push(textView);
	}

	this.getTextView = function(index){
		return _textViews[index];
	}

	this.getTextViews = function(){
		return _textViews;
	}

	this.addRedBubble = function(bubble){
		_redBubbles.push(bubble);
	}

	this.getRedBubble = function(index){
		return _redBubbles[index];
	}

	this.getRedBubbles = function(){
		return _redBubbles;
	}

	this.setShooter = function(shooter){
		_shooter = shooter;
	}

	this.getShooter = function(){
		return _shooter;
	}
	/*************************************************************** 객체 관련 메소드 end */

	/*************************************************************** 실행 관련 메소드 start */
	this.shootRun = function(){
		log('shootingOrder shootRun...');
		var shootCurrent = _shooter.getCurrent();
		var bubbleEnabled = _bubbles[shootCurrent].getEnabled();

		if(bubbleEnabled){
			_shooter.shoot();

			setTimeout(function(){
				shootOnBubble();
			}, 220);
		}
		else{
			// 오답
			feedBackWrong();
		}
	}

	this.init = function(){
		for(var i=0,max=_textViews.length;i<max;i++){
			_textViews[i].init();
		}
		for(var i=0,max=_bubbles.length;i<max;i++){
			_bubbles[i].init();
		}
		for(var i=0,max=_redBubbles.length;i<max;i++){
			_redBubbles[i].init();

			if( i==0){
				_redBubbles[i].show();
			}

		}
		_shooter.init();
	}
	/*************************************************************** 실행 관련 메소드 end */
}

/**
* 게임 생성.
*/
var shootingOrder;
function createShootingOrder(){

	/** 타이틀 설정.*/
	var questionTitle = new QuestionTitle();
	questionTitle.name = "questionTitle";

	var questionTitleElement = QS('#queTxt');
	questionTitle.setElement(questionTitleElement);
	questionTitle.setValue(gameManager.QUIZ_OPTION[0]);
	questionTitle.init();

	/** ShootingOrder 게임 생성. */
	shootingOrder = new ShootingOrder();
	shootingOrder.setAnswer(gameManager.QUIZ_ANSWER);

	var max;
	if(gameManager.QUIZ_OPTION.length === 8){
		max = 4;
	}
	else if(gameManager.QUIZ_OPTION.length === 10){
		max = 5;
	}

	/** Bubble 및 textView 리스트 생성. */
	var bubbleCnt =0;
	for(var i=0;i<max;i++){
		// 문제 옵션이 object 일경우 숫자 (textView)
		var bubbleContainer = QS('#bubbleContainer');
		var textViewElement = createElement('span', bubbleContainer);
		textViewElement.setAttribute('id','textView' + (i + 1));

		var textView = new TextView();
		textView.setElement(textViewElement);
		textView.setValue(gameManager.QUIZ_OPTION[i+1]);
		shootingOrder.addTextView(textView);

		if(i<max-1){
			var bubbleElement = createElement('span', bubbleContainer);
			bubbleElement.setAttribute('id','bubble'+(i+1));

			// 수식 이후 연산자 추가.
			var bubble = new Bubble();
			bubble.setElement(bubbleElement);
			bubble.setValue(gameManager.QUIZ_OPTION[(i+1)+max]);
			bubble.setIndex(bubbleCnt);
			shootingOrder.addBubble(bubble);

			gameManager.dropArea.push(bubbleElement);
			bubbleCnt++;
		}
	}

	/** 잠수함 생성 */
	var shooterElement = createElement('div', QS('#shooterContainer'));
	shooterElement.setAttribute('id','shooter');

	var shooter = new Shooter();
	shooter.name = "shooter";
	shooter.setParent(shootingOrder);
	shooter.setElement(shooterElement);

	/** redBubble 생성 */
	for(var i = 0; i < max - 1; i++) {
		// redbubble 생성.
		var redBubbleElement = createElement('div', shooterElement);
		redBubbleElement.setAttribute('id','redBubble');

		var redBubble = new RedBubble();
		redBubble.setElement(redBubbleElement);
		redBubble.setValue(i + 1);
		redBubble.name = 'redBubble' + (i + 1);
		redBubble.setParent(shootingOrder);
		redBubble.hide();
		shootingOrder.addRedBubble(redBubble);
	}

	// 잠수함 글씨 생성
	var shooterText = createElement('div', shooterElement, 'shooterText');
		shooterText.innerHTML = '누르면 발사';

	// 좌우 이동 아이콘 생성.
	var leftMove = createElement('div', shooterElement);
	leftMove.classList.add('left_move');

	var rightMove = createElement('div', shooterElement);
	rightMove.classList.add('right_move');

	shootingOrder.setShooter(shooter);
	shootingOrder.init();

	setTimeout(function() {
		shooter.setCurrent(1);
	}, 100);
}

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');
	createShootingOrder();
}

function initObject(val) {
	log('initObject...');
}

// 분수 만드는 함수
function makeBunsu(text, targetElement){
	var bunsuArray = [],
		bunsuTxt = [],
		beforeTxt = '',
		afterTxt = '';

	if(text.indexOf('[') > -1) {
		while(text.indexOf('[') > -1) {
			if(spitBunsuText(text).length === 3) {
				beforeTxt = spitBunsuText(text)[2];
				var bText = createElement('span', targetElement);
				bText.innerHTML = beforeTxt;
			}
			bunsuTxt = spitBunsuText(text)[0];
			afterTxt = spitBunsuText(text)[1];
			bunsuArray = bunsuTxt.split(',');

			drawBunsu(bunsuArray, targetElement);
			text = afterTxt; // console.log(text);
		}
	} else {
		bunsuArray = text.split(',');
		drawBunsu(bunsuArray, targetElement);
		text = afterTxt;
	}

	var aText = createElement('span', targetElement);
	aText.innerHTML = afterTxt;
}

// 분수 그릴 때 필요한 array 만드는 함수
function spitBunsuText(src){
	if(src.indexOf('[') === 0) {
		var startIdx = src.indexOf('['),
			endIdx = src.indexOf(']'),
			bunsuTxt = src.slice(startIdx + 1, endIdx),
			afterTxt = src.slice(endIdx + 1),
			resultArray = [bunsuTxt, afterTxt];
	} else {
		var startIdx = src.indexOf('['),
			endIdx = src.indexOf(']'),
			beforeTxt =  src.slice(0, startIdx),
			bunsuTxt = src.slice(startIdx + 1, endIdx),
			afterTxt = src.slice(endIdx + 1),
			resultArray = [bunsuTxt, afterTxt, beforeTxt]; // console.log('resultArray: ',resultArray);
	}
	return resultArray;
}

// 분수 그리는 함수
function drawBunsu(bunsuArray, parentElement){
	var bunsuDiv = createElement('div', parentElement, 'bunsuDiv'),
		int = createElement('div', bunsuDiv, 'int'),
		prop = createElement('div', bunsuDiv, 'prop'),
		bunja = createElement('div', prop, 'bunja'),
		bunmo = createElement('div', prop, 'bunmo');

	if(bunsuArray[0] != 0) int.innerHTML = bunsuArray[0];

	bunja.innerHTML = bunsuArray[1];
	bunmo.innerHTML = bunsuArray[2];
}

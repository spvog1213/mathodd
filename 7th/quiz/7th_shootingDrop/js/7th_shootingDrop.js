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
		dragDrop.element.removeEventListener(gameManager.eventSelector.upEvent, shootingDrop.shootRun);
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
		dragDrop.element.addEventListener(gameManager.eventSelector.upEvent, shootingDrop.shootRun);
		this.style.zIndex = 2;
	},

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
	var current = shootingDrop.getShooter().getCurrent();
	var bubble = shootingDrop.getBubble(current);
	dragObj.style.left = (bubble.getElement().offsetLeft-45) + 'px';
}

function boundingCircle(dragObj, x, y) {
	log('bounding!');

	var bool = dropCompare(dragObj, x, y);

	if (bool[0]) {
		var bubble = shootingDrop.getBubbleByElement(bool[0]);
		var bubbleIndex = bubble.getIndex();
		var shooterCurrent = shootingDrop.getShooter().getCurrent();

		log("####### bubbleIndex:" +bubbleIndex);
		log("####### shooterCurrent:" +shooterCurrent);

		if(bubbleIndex === shooterCurrent){
			//shootingDrop.shootRun();
		}
		else{
			shootingDrop.getShooter().setCurrent(bubbleIndex);
		}


		dragObj.style.left = (bool[0].offsetLeft-45) + 'px';
	}
	else{
		var current = shootingDrop.getShooter().getCurrent();
		var bubble = shootingDrop.getBubble(current);
		dragObj.style.left = (bubble.getElement().offsetLeft-45) + 'px';
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

function wrongBubble(){
	gameManager.isFeedBackWrong = true;
	var wrongBubble = QS('#wrongBubble');
	wrongBubble.style.display = 'block';

	// 가로 이동
	animate({
		delay : 40,
		duration : 400,
		delta : makeEaseInOut(quad),
		step : function(delta) {
			wrongBubble.style.opacity = (0 + delta);
		}
	});

	setTimeout(function() {
		// 가로 이동
		animate({
			delay : 40,
			duration : 400,
			delta : makeEaseInOut(quad),
			step : function(delta) {
				wrongBubble.style.opacity = 1 - (0 + delta);
			}
		});
	}, 500);

	setTimeout(function() {
		wrongBubble.style.display = 'none';
		wrongBubble.style.opacity = 0;
		gameManager.isFeedBackWrong = false;
	}, 1000);
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


/**
* 숫자 물방울.
*/
var Bubble = function(){
	var _this = this;
	var _element;
	var _isClear = false;
	var _value;
	var _clearClassName;
	var _noClearClassName;
	var _index;

	this.isClear = function(){
		return _isClear;
	}

	this.setElement = function(el){
		_element = el;
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

	this.setValue = function(val){
		_value = val;

		if(typeof _value === 'number'){
			_element.innerHTML = '<span class="bubble_val">'+val+'</span>';
		}
		else{
			makeBunsu(val.toString(), _element);
		}
	}

	this.getValue = function(){
		return _value;
	}

	this.setClearClassName = function(className){
		_clearClassName = className;
	}

	this.setNoClearClassName = function(className){
		_noClearClassName = className;
	}

	this.init = function(){
		_element.classList.add(_noClearClassName);
	}

	this.reset = function(){
		_isClear = false;
		if(_element){
			try{_element.classList.add(_noClearClassName)}catch(e){};
			try{_element.classList.remove(_clearClassName)}catch(e){};
		}
	}

	this.clear = function(){
		_isClear = true;
		if(_element){
			try{_element.classList.add(_clearClassName)}catch(e){};
			try{_element.classList.remove(_noClearClassName)}catch(e){};
			_element.classList.add('pop');
			setTimeout(function(){
				_element.classList.remove('pop');
			}, 150);
		}
	}
}

/**
* 잠수함
*/
var Shooter = function(){
	var _this = this;
	var _parent;
	var _element;
	var _body;
	var _bullet;
	var _isShoot = false;
	var _current = 0;
	var _bulletX = 45;

	this.setParent = function(parent){
		_parent = parent;
	}

	this.setElement = function(el){
		_element = el;
	}

	this.getElement = function(){
		return _element;
	}

	this.setBody = function(el){
		_body = el;
	}

	this.getBody = function(){
		return _body;
	}

	this.setBullet = function(el){
		_bullet = el;
	}

	this.getBullet = function(){
		return _bullet
	}

	this.setCurrent = function(index){
		_current = index;

		var bubble = _parent.getBubble(_current);
		var tx = bubble.getElement().offsetLeft - _bulletX;
		_element.style.left = tx + 'px';
	}

	this.getCurrent = function(){
		return _current;
	}

	this.reset = function(){
		var startIndex = parseInt(_parent.getBubbles().length / 2);
		_this.setCurrent(startIndex);
	}

	this.init = function(){
		var startIndex = parseInt(_parent.getBubbles().length / 2);
		_this.setCurrent(startIndex);

		new DragdropHorizontal(_element);
	}

	this.clear = function(){

	}

	this.shoot = function(){
		if(_isShoot){
			return;
		}
		_isShoot = true;

		var tY = parseInt(_bullet.style.top);
		var fY = -100;
		animate({
			delay : 20,
			duration : 400,
			delta : makeEaseOut(quad),
			step : function(delta) {
				_bullet.style.top = tY + ( fY * delta ) +"px";
				log('delta:'+delta);
			}
		});
		setTimeout(function(){
			_isShoot = false;
			_bullet.style.top = -110 +"px";

		}, 450);


	}
}

/**
* ShootingDrop 게임
*/
var ShootingDrop = function(){
	var _this = this;
	var _bubbles = [];
	var _shooter;
	var _answer = [];

	var checkAnswer = function(val){
		var bol = false;
		if(_answer && _answer.length > 0){
			for(var i=0,max=_answer.length;i<max;i++){
				if(_answer[i].toString() == val.toString()){
					bol = true;
				}
			}
		}
		return bol;
	}

	var feedBackWrong = function(){
		log('오답');
		streamSound.setSound('../../media/incorrect.mp3');

		wrongBubble();
	}

	var feedBackClear = function(){
		log('정답');
	}

	var shootOnBubble = function(){
		var bubble = _bubbles[_shooter.getCurrent()];
		var bubbleValue = bubble.getValue();
		var isAnswer = checkAnswer(bubbleValue);

		if(isAnswer){
			// 버블 clear
			_shooter.shoot();

			setTimeout(function(){
				bubble.clear();
				streamSound.setSound('media/shooting_pang.mp3');
			}, 200);

			// 정답
			feedBackClear();

			log("전체 클리어 여부:" + checkAllClear() );

			setTimeout(function(){
				if(checkAllClear()){
					gameOver();
				}
			}, 500);

		}
		else{
			// 오답
			if(gameManager.isFeedBackWrong) return;
			_shooter.shoot();
			feedBackWrong();
		}
	}

	function checkAllClear(){
		var answerCnt = _answer.length;
		var clearCnt = 0;
		log("정답 갯수:" + _answer.length );
		for(var i=0,max=_bubbles.length;i<max;i++){
			var bubble = _bubbles[i];
			if(bubble.isClear()){
				clearCnt++;
			}
		}

		if(answerCnt == clearCnt){
			return true;
		}
		else{
			return false;
		}
	}

	this.addBubble = function(bubble){
		_bubbles.push(bubble);
	}

	this.getBubble = function(index){
		return _bubbles[index];
	}

	this.getBubbleByElement = function(el){
		for(var i=0,max=_bubbles.length;i<max;i++){
			if(_bubbles[i].getElement() == el){
				return _bubbles[i];
			}
		}
	}

	this.getBubbles = function(){
		return _bubbles;
	}

	this.setShooter = function(shooter){
		_shooter = shooter;
	}

	this.getShooter = function(){
		return _shooter;
	}

	this.setAnswer = function(answer){
		_answer = answer;
		log('answer:'+answer);
	}

	this.getAnswer = function(){
		return _answer;
	}

	this.shootRun = function(){
		log('shootingDrop shootRun...');
		var shootCurrent = _shooter.getCurrent();
		var bubbleIsClear = _bubbles[shootCurrent].isClear();

		if(!bubbleIsClear){


			// setTimeout(function(){
				shootOnBubble();

				// _shooter.shoot();
			// }, 150);
		}
		else{
			// 오답
			feedBackWrong();
		}
	}

	this.init = function(){
		_shooter.init();
		for(var i=0,max=_bubbles.length;i<max;i++){
			_bubbles[i].init();
		}
	}
}

/**
* 문제 생성.
*/
function createQuestionText(){
	log('addQuestionText...');
	var queTxt = QS('#queTxt'),
		text = gameManager.QUIZ_OPTION[0]; // string
	var txt = createElement('span', queTxt);

	if(typeof text === 'string'){
		txt.classList.add('txt');
		txt.innerHTML = text;
	}
	else if(typeof text === 'object'){
		var bunsu = createElement('span', txt);
		if(typeof gameManager.QUIZ_OPTION[0][0] === 'object'){
			makeBunsu(gameManager.QUIZ_OPTION[0][0].toString(),bunsu);
		}
		if(typeof gameManager.QUIZ_OPTION[0][1] === 'string'){
			var title = createElement('span', txt);
			title.innerHTML = gameManager.QUIZ_OPTION[0][1];
		}

	}
}

/**
* 게임 생성.
*/
var shootingDrop;
function createShootingDrop(){

	/** ShootingDrop 게임 생성. */
	shootingDrop = new ShootingDrop();
	shootingDrop.setAnswer(gameManager.QUIZ_ANSWER)

	var buContainer = QS('#bubbleContainer');

	/** Bubble 리스트 생성. */
	for(var i=1,max=gameManager.QUIZ_OPTION.length;i<max;i++){
		var bubbleElement = createElement('span', buContainer);
		bubbleElement.setAttribute('id','bubble'+i);
		var bubble = new Bubble();
		bubble.setElement(bubbleElement);
		bubble.setNoClearClassName('bubbles'+((i-1)%6));
		bubble.setClearClassName('bubbles'+((i-1)%6)+'_clear');
		bubble.setValue(gameManager.QUIZ_OPTION[i]);
		bubble.setIndex(i-1);
		shootingDrop.addBubble(bubble);

		gameManager.dropArea.push(bubbleElement);

		if(i%2===0){
			bubbleElement.classList.add('jjak');
		}
		else{
			bubbleElement.classList.add('hol');
		}
	}

	/** 잠수함 생성 */
	var shooter = new Shooter();
	shooter.setParent(shootingDrop);
	var shContainer = QS('#shooterContainer');

	// shooterElement 생성.
	var shooterElement = createElement('div', shContainer, 'shooter');
	shooterElement.setAttribute('id','shooter');
	shooter.setElement(shooterElement);

	// bodyElement 생성.
	var bodyElement = createElement('span', shooterElement, 'shoot_body');
	bodyElement.setAttribute('id','shootBody');
	shooter.setBody(bodyElement);

	// bulletElement 생성.
	var bulletElement = createElement('span', shooterElement, 'shoot_bullet');
	bulletElement.setAttribute('id','shootBullet');
	bulletElement.style.top = -110 + 'px';
	shooter.setBullet(bulletElement);

	// 정답확인 버튼 생성.
	// var checkBtn = createElement('div', shooterElement);
	// checkBtn.classList.add('check_btn');
	// checkBtn.addEventListener('click', function(e) {
	// 	e.preventDefault();
	// 	shootingDrop.shootRun();
	// });

	// 잠수함 글씨 생성
	var shooterText = createElement('div', shooterElement, 'shooterText');
		shooterText.innerHTML = '누르면 발사';

	// 좌우 이동 아이콘 생성.
	var leftMove = createElement('div', shooterElement, 'left_move'),
		rightMove = createElement('div', shooterElement, 'right_move');

	// 오답 버블1
	var wrongBubble = createElement('div', shooterElement);
	wrongBubble.setAttribute('id','wrongBubble');
	wrongBubble.classList.add('wrong_bubble');

	shootingDrop.setShooter(shooter);
	shootingDrop.init();
}

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	createQuestionText();
	createShootingDrop();
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

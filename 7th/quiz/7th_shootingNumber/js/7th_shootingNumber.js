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
	var current = shootingNumber.getShooter().getCurrent();
	var card = shootingNumber.getCard(current);
	dragObj.style.left = (card.getElement().offsetLeft-50) + 'px';
}

function boundingCircle(dragObj, x, y) {
	log('bounding!');

	var bool = dropCompare(dragObj, x, y);

	if (bool[0]) {
		var numberCard = shootingNumber.getCardByElement(bool[0]);
		var numberCardIndex = numberCard.getIndex();
		var shooterCurrent = shootingNumber.getShooter().getCurrent();
		log("####### numberCardIndex:" +numberCardIndex);
		log("####### shooterCurrent:" +shooterCurrent);

		if(numberCardIndex === shooterCurrent){
			shootingNumber.shootRun();
		}
		else{
			shootingNumber.getShooter().setCurrent(numberCardIndex);
		}


		dragObj.style.left = (bool[0].offsetLeft-50) + 'px';
	}
	else{
		var current = shootingNumber.getShooter().getCurrent();
		var card = shootingNumber.getCard(current);
		dragObj.style.left = (card.getElement().offsetLeft-50) + 'px';
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

/**
* 숫자 물방울.
*/
var NumberCard = function(){
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

	this.setValue = function(val){
		_value = val;
	}

	this.getValue = function(){
		return _value;
	}

	this.setIndex = function(index){
		_index = index;
	}

	this.getIndex = function(){
		return _index;
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

			var painter = createElement('span',_element);
			painter.classList.add('painter'+(shootingNumber.getQuizCurrent()+1));

			setTimeout(function(){
				_element.innerHTML = '';
				var span = createElement('span',_element);
				var img = createElement('img',span);
				img.setAttribute('src','images/downNumber_'+_value+'.png');
			}, 200);
		}
	}

	this.wrong = function(){
		log("card wrong");
		var cardspan = _element.childNodes[0];
		animate({
				delay : 20,
				duration : 300,
				delta : makeEaseOut(quad),
				step : function(delta) {
					cardspan.style.left = ( Math.sin(delta * 10)*2 ) +"px";
					log('delta:'+delta);
				}
			});
		setTimeout(function(){
			cardspan.style.left = 0 + 'px';
		}, 320);
	}
}

/**
* 잠수함
*/
var Shooter = function(){
	var _this = this;
	var _parent;
	var _element;
	var _moveSize;
	var _body;
	var _bullet;
	var _isShoot = false;
	var _current = 0;

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

	this.setMoveSize = function(size){
		_moveSize = size;
	}

	this.getMoveSize = function(){
		return _moveSize;
	}

	this.setCurrent = function(index){
		_current = index;

		var card = _parent.getCard(_current);
		var tx = card.getElement().offsetLeft - 50;
		_element.style.left = tx + 'px';
	}

	this.getCurrent = function(){
		return _current;
	}

	this.reset = function(){
		var startIndex = parseInt(_parent.getCards().length / 2);
		_this.setCurrent(startIndex);
	}

	this.init = function(){
		var startIndex = parseInt(_parent.getCards().length / 2);
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
		var fY = parseInt(_bullet.style.top);
		animate({
				delay : 20,
				duration : 200,
				delta : makeEaseOut(quad),
				step : function(delta) {
					_bullet.style.top = tY + ( fY * delta ) +"px";
					log('delta:'+delta);
				}
			});
		setTimeout(function(){
			_isShoot = false;
			_bullet.style.top = -110 + 'px';

		}, 220);


	}
}

var Quiz = function(){
	var _this = this;
	var _clear = false;
	var _answer;
	var _question;

	this.clear = function(){
		_clear = true;
	}

	this.isClear = function(){
		return _clear;
	}

	this.setAnswer = function(value){
		_answer = value;
	}

	this.getAnswer = function(){
		return _answer;
	}

	this.setQuestion = function(str){
		_question = str;
	}

	this.getQuestion = function(){
		return _question;
	}
}

/**
* ShootingNumber 게임
*/
var ShootingNumber = function(){
	var _this = this;
	var _cards = [];
	var _shooter;
	var _quizCurrent = 0;
	var _quizs = [];

	var setQuestion = function(){
		var quiz = _quizs[_quizCurrent];
		var question = quiz.getQuestion();
		QS('#questionText').innerHTML = question;
	}

	var checkAnswer = function(val){
		var quiz = _quizs[_quizCurrent];
		var answer = quiz.getAnswer();

		if(_shooter.getCurrent() === answer){
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
		// 현재 퀴즈가 전체 퀴즈보다 index가 작을경우.
	}

	var shootOnCard = function(){
		var card = _cards[_shooter.getCurrent()];
		var cardValue = card.getValue();
		var isAnswer = checkAnswer(cardValue);

		if(isAnswer){
			// 번호카드 clear
			card.clear();
			streamSound.setSound('media/shooting_success.mp3');
			// 정답
			feedBackClear();

			var quiz = _quizs[_quizCurrent];
			quiz.clear();

			// 다음 퀴즈가 없으면 allC clear
			if(_quizCurrent<_quizs.length-1){
				_this.nextQuiz();
			}
			else{
				gameOver();
			}
		}
		else{
			// 오답
			card.wrong();
			feedBackWrong();
		}
	}

	this.getQuizCurrent = function(){
		return _quizCurrent;
	}

	this.addQuiz = function(quiz){
		_quizs.push(quiz);
	}

	this.getQuiz = function(index){
		return _quizs[index];
	}

	this.addCard = function(card){
		_cards.push(card);
	}

	this.getCard = function(index){
		return _cards[index];
	}

	this.getCards = function(){
		return _cards;
	}

	this.getCardByElement = function(el){
		for(var i=0,max=_cards.length;i<max;i++){
			if(_cards[i].getElement() == el){
				return _cards[i];
			}
		}
	}

	this.setShooter = function(shooter){
		_shooter = shooter;
	}

	this.getShooter = function(){
		return _shooter;
	}

	this.shootRun = function(){
		log('shootingNumber shootRun...');
		var shootCurrent = _shooter.getCurrent();
		var cardIsClear = _cards[shootCurrent].isClear();

		if(!cardIsClear){
			_shooter.shoot();

			setTimeout(function(){
				shootOnCard();
			}, 150);
		}
		else{
			// 오답
			feedBackWrong();
		}
	}

	this.init = function(){
		_shooter.init();
		for(var i=0,max=_cards.length;i<max;i++){
			_cards[i].init();
		}
		setQuestion();
	}

	this.nextQuiz = function(){
		_quizCurrent++;
		setQuestion();
	}
}

/**
* 문제 생성.
*/
function createQuestionText(){
	log('addQuestionText...');
	var queTxt = QS('#queTxt');
	var txt = createElement('span', queTxt);
	txt.setAttribute('id','questionText');
	txt.classList.add('txt');
}

/**
* 게임 생성.
*/
var shootingNumber;
function createshootingNumber(){

	/** shootingNumber 게임 생성. */
	shootingNumber = new ShootingNumber();

	var buContainer = QS('#cardContainer');

	/** quiz 생성 */
	for(var i=1,max=gameManager.QUIZ_OPTION.length;i<max;i++){
		var quiz = new Quiz();
		quiz.setAnswer(gameManager.QUIZ_ANSWER[i-1]);
		quiz.setQuestion(gameManager.QUIZ_OPTION[i]);
		shootingNumber.addQuiz(quiz);
	}

	/** card 리스트 생성. */
	for(var i=0,max=gameManager.QUIZ_OPTION[0].length;i<max;i++){
		var cardElement = createElement('span', buContainer);
		cardElement.setAttribute('id','card'+i);

		var cardWrap = createElement('span', cardElement);

		var cardImg = createElement('img', cardWrap);
		cardImg.setAttribute('src','images/number_'+gameManager.QUIZ_OPTION[0][i]+'.png');

		var card = new NumberCard();
		card.setElement(cardElement);
		card.setIndex(i);
		card.setValue(gameManager.QUIZ_OPTION[0][i]);
		card.setNoClearClassName('number'+gameManager.QUIZ_OPTION[0][i]);
		card.setClearClassName('number'+i+'_clear');

		gameManager.dropArea.push(cardElement);

		shootingNumber.addCard(card);
	}

	/** 잠수함 생성 */
	var shooter = new Shooter();
	shooter.setParent(shootingNumber);
	shooter.setMoveSize(82);
	var shContainer = QS('#shooterContainer');

	// shooterElement 생성.
	var shooterElement = createElement('div', shContainer);
	shooterElement.classList.add('shooter');
	shooterElement.setAttribute('id','shooter');
	shooter.setElement(shooterElement);

	// bodyElement 생성.
	var bodyElement = createElement('span', shooterElement);
	bodyElement.classList.add('shoot_body');
	bodyElement.setAttribute('id','shootBody');
	shooter.setBody(bodyElement);

	// bulletElement 생성.
	var bulletElement = createElement('span', shooterElement);
	bulletElement.classList.add('shoot_bullet');
	bulletElement.setAttribute('id','shootBullet');
	bulletElement.style.top = -110+'px';
	shooter.setBullet(bulletElement);

	// 정답확인 버튼 생성.
	// var checkBtn = createElement('div', shooterElement);
	// checkBtn.classList.add('check_btn');
	// checkBtn.addEventListener('click', function(e) {
	// 	e.preventDefault();
	// 	shootingNumber.shootRun();
	// });

	// 잠수함 글씨 생성
	var shooterText = createElement('div', shooterElement, 'shooterText');
		shooterText.innerHTML = '누르면 발사';

	// 좌우 이동 아이콘 생성.
	var leftMove = createElement('div', shooterElement);
	leftMove.classList.add('left_move');

	var rightMove = createElement('div', shooterElement);
	rightMove.classList.add('right_move');

	shootingNumber.setShooter(shooter);
	shootingNumber.init();
}

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	createQuestionText();
	createshootingNumber();
}

function initObject(val) {
	log('initObject...');
}

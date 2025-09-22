function boundingCircle(dragObj, x, y) {
	var bool = dropCompare(dragObj, x, y);
	dragObj.setAttribute('style','');

	if (bool[0]) {
		console.log("########## : 드래그 성공");
		// 드래그 볼이 힌트볼인지 부호 볼인지
		var dragType;

		if(dragObj.getAttribute('id').substr(0,4) == 'hint'){
			dragType = 'hintBall';
		}
		else{
			dragType = 'signBall';
		}

		if(dragType == 'signBall'){
			// 부호 볼 일경우
			if(bool[0].getAttribute('id') == 'ballArea1' || bool[0].getAttribute('id') == 'ballArea2'){
				console.log("########## : 부호 볼 일경우, 부호위치가 아닐경우 리젝");
				streamSound.setSound('../../media/incorrect.mp3');
				return;
			}

			var ballArea = seesaw.getBallAreaByEl(bool[0]);
			var signBall = seesaw.getBallByEl(dragObj);

			if(seesaw.getAnswer().toString() == signBall.getValue().toString()){
				ballArea.setValue(signBall.getValue());
				ballArea.reset();
				ballArea.getElement().classList.add('sign'+(signBall.getIndex()+1));
				dragObj.style.display = 'none';

				seesaw.check();
			} else {
				streamSound.setSound('../../media/incorrect.mp3');
			}
		}
		else{
			// 힌트 볼 일경우
			if(bool[0].getAttribute('id') == 'ballArea3'){
				console.log("########## : 힌트 볼 일경우, 부호 위치일 경우 리젝");
				streamSound.setSound('../../media/incorrect.mp3');
				return;
			}

			var ballArea = seesaw.getBallAreaByEl(bool[0]);
			var hintBall = seesaw.getHintBallByEl(dragObj);

			console.log("########## ballArea key : " + ballArea.getKey());
			console.log("########## hintBall key : " + hintBall.getKey());

			console.log(ballArea.getKey() , hintBall.getKey())
			if(ballArea.getKey() == hintBall.getKey()){
				streamSound.setSound('./media/dragFigure.mp3');
				ballArea.setValue(hintBall.getValue());
				ballArea.reset();

				// class 교체
				ballArea.getElement().classList.remove(ballArea.getElement().classList[1]);
				ballArea.getElement().classList.add(hintBall.getElement().classList[1]);

				dragObj.style.display = 'none';

				if( seesaw.hintClearCnt < 1){
					seesaw.hintClearCnt++;
				}
				else{
					seesaw.hintClear();
				}
			} else {
				streamSound.setSound('../../media/incorrect.mp3');
			}
		}
	}
	else{
		console.log('drag 실패');
		streamSound.setSound('../../media/incorrect.mp3');
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

// 분수를 소수로 변경.
function convertBunsuToDec(array) {
	return (Number(array[0]) * Number(array[2]) + Number(array[1])) / Number(array[2]);
}

function gameOver() {
	streamSound.setSound(gameManager.soundEffct);
	QS('#bgCanvas').style.pointerEvents = "none";

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

var Ball = function(){
	var _this = this;
	var _element;
	var _value = [];
	var _orgValue = [];
	var _index;
	var _type;
	var _key;

	var setDefaultStyle = function(){
		if(_type && _type == 'number'){
		console.log('여기다1');
			if(!_element.classList.contains('number')){
				_element.classList.add('number');
			}
		}

		if(_type && _type == 'sign'){
		console.log('여기다');
			if(!_element.classList.contains('sign')){
				_element.classList.add('sign');
			}
		}
	}

	var setContents = function(){
		if(_value.length == 0){
			return;
		}

		_element.innerHTML = '';

		if(typeof _value !== 'string'){
			if(typeof _value === 'object') {
				makeBunsu(_value.toString(), _element);
				_key = Math.floor(Number(convertBunsuToDec(_value)) * 1000) / 1000 ;
			} else {
				_key = _value;
				_element.innerHTML = _value;
			}
		}
		else{
			var span = createElement('span',_element);
			if(parseFloat(_value[0]) != NaN ){
				_key = Math.floor(Number(_value[0]) * 1000) / 1000 ;
			}
			else{
				_key = _value[0];
			}
			replaceSymbol(_value, span);
			if(span.querySelector('img'))
				span.querySelector('img').style.cssText = 'width: 30px; height: auto; margin: 0;';
		}
	}

	this.name = "";

	this.setIndex = function(index){
		_index = index;
	}

	this.getIndex = function(){
		return _index;
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

	this.setOrgValue = function(val){
		_orgValue = val;
	}

	this.getOrgValue = function(){
		return _orgValue;
	}

	this.setType = function(type){
		_type = type;
	}

	this.getType = function(){
		return _type;
	}

	this.setKey = function(key){
		_key = key;
	}

	this.getKey = function(){
		return _key;
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
* Seesaw 게임
*/
var Seesaw = function(){
	var _this = this;
	var _answer = [];
	var _ballAreas = [];
	var _balls = [];
	var _hintBalls = [];

	var checkAnswer = function(){
		if(_answer.toString() == _ballAreas[2].getValue().toString()){
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
		gameOver();

		// console.log()
		if(_ballAreas[2].getValue().toString() == '>'){
			QS('#seesawHor').classList.add('left_clear');

			_ballAreas[0].getElement().style.left = 135 + 'px';
			_ballAreas[0].getElement().style.top = 218 + 'px';

			_ballAreas[1].getElement().style.left = 922 + 'px';
			_ballAreas[1].getElement().style.top = 8 + 'px';

		}
		else if(_ballAreas[2].getValue().toString() == '<'){
			QS('#seesawHor').classList.add('right_clear');
			_ballAreas[0].getElement().style.left = 165 + 'px';
			_ballAreas[0].getElement().style.top = 8 + 'px';

			_ballAreas[1].getElement().style.left = 952 + 'px';
			_ballAreas[1].getElement().style.top = 218 + 'px';
		}

		// 정답인 공들 초기화
		for(var i = 0; i < 2; i++) {
			var ball = _ballAreas[i].getElement(),
				bunsuText = gameManager.QUIZ_OPTION[i].toString();

			if(ball.classList[2] === 'number')
				ball.classList.remove(ball.classList[1]);
			else
				ball.classList.remove(ball.classList[2]);

			ball.classList.add('number' + gameManager.randomArray[i]);

			ball.innerHTML = '';
			if(typeof gameManager.QUIZ_OPTION[i] === 'object'){
				makeBunsu(bunsuText, ball);
			}else ball.innerHTML = gameManager.QUIZ_OPTION[i];
		}
	}

	/*************************************************************** 설정 관련 start */

	this.name;
	this.type;
	this.hintClearCnt = 0;

	this.setAnswer = function(answer){
		_answer = answer;
	}

	this.getAnswer = function(){
		return _answer;
	}

	this.getAnswerByIndex = function(index){
		return _answer[index];
	}
	/*************************************************************** 설정 관련 end */

	/*************************************************************** 객체 관련 메소드 start */
	this.addHintBall = function(ball){
		_hintBalls.push(ball);
	}

	this.getHintBall = function(index){
		return _hintBalls[index];
	}

	this.addBallArea = function(ballArea){
		_ballAreas.push(ballArea);
	}

	this.getBallArea = function(index){
		return _ballAreas[index];
	}

	this.addBall = function(ball){
		_balls.push(ball);
	}

	this.getBall = function(index){
		return _balls[index];
	}

	this.getBalls = function(){
		return _balls;
	}

	this.getBallAreaByEl = function(el){
		for(var i=0,max=_ballAreas.length;i<max;i++){
			if ( _ballAreas[i].getElement() == el){
				return _ballAreas[i];
			}
		}
	}

	this.getBallAreaIndexByEl = function(el){
		for(var i=0,max=_ballAreas.length;i<max;i++){
			if ( _ballAreas[i].getElement() == el){
				return i;
			}
		}
	}

	this.getBallByEl = function(el){
		for(var i=0,max=_balls.length;i<max;i++){
			if(_balls[i].getElement()){
				if ( _balls[i].getElement() == el){
					return _balls[i];
				}
			}
		}
	}

	this.getBallIndexByEl = function(el){
		for(var i=0,max=_balls.length;i<max;i++){
			if(_balls[i].getElement()){
				if ( _balls[i].getElement() == el){
					return i;
				}
			}
		}
	}

	this.getHintBallByEl = function(el){
		for(var i=0,max=_hintBalls.length;i<max;i++){
			if(_hintBalls[i].getElement()){
				if ( _hintBalls[i].getElement() == el){
					return _hintBalls[i];
				}
			}
		}
	}
	/*************************************************************** 객체 관련 메소드 end */

	/*************************************************************** 실행 관련 메소드 start */
	this.check = function(obj){
		log(_this.name + ": check");
		if(checkAnswer()){
			feedBackClear();
		}
		else{
			feedBackWrong();
		}
	}

	this.init = function(){
		for(var i=0,max=_balls.length;i<max;i++){
			_balls[i].init();
		}

		for(var i=0,max=_ballAreas.length;i<max;i++){
			_ballAreas[i].init();
		}

		for(var i=0,max=_hintBalls.length;i<max;i++){
			_hintBalls[i].init();
		}
	}

	this.hintShow = function(){
		QS('#hitBox').style.display				= 'block';
		QS('#hintTitle').style.display			= 'block';
		QS('#hintList').style.display			= 'block';
		QS('#hintClose').style.display			= 'block';
		QS('#hintBtn').style.display			= 'none';
	}

	this.hintHide = function(){
		QS('#hitBox').style.display				= 'none';
		QS('#hintTitle').style.display			= 'none';
		QS('#hintList').style.display			= 'none';
		QS('#hintBtn').style.display			= 'block';
	}

	this.hintClear = function(){
		QS('#hitBox').style.display				= 'none';
		QS('#hintTitle').style.display			= 'none';
		QS('#hintList').style.display			= 'none';
		QS('#hintBtn').style.display			= 'none';
	}
	/*************************************************************** 실행 관련 메소드 end */
}

/**
* 게임 생성.
*/
var seesaw;
function createSeesaw(){
	/** numBallAreaSum 게임 생성. */
	seesaw = new Seesaw();
	seesaw.name = "seesaw";
	seesaw.setAnswer(gameManager.QUIZ_ANSWER);

	QS('#bgCanvas').innerHTML = '<div id="seesawContainer"><div class="seesaw_shadow"></div><div class="seesaw_bon2"></div><div id="seesawHor" class="seesaw_hor"></div><div class="seesaw_bon1"></div></div><div id="ballAreaContainer"></div><div id="ballContainer"></div><div id="hintContainer"><div id="hitBox" class="hint_box"></div><div id="hintTitle" class="hint_title"><span>크기가 같은 분수로 바꿔 보세요.</span></div><div id="hintList"></div><div id="hintClose"class="hint_close_btn"></div></div><div id="btnContainer"><div id="hintBtn"></div></div>';

	var ballNameArray, ballNameIdx, randomArray;
	ballNameArray = ['blue', 'green', 'mint', 'red', 'yellow'];
	ballNameIdx = 0;
	randomArray = convertNumberToText(1, 5, ballNameArray);

	/** ballArea 생성. */
	for(var i = 0; i < 3; i++){
		var ballAreaElement = createElement('div', QS('#ballAreaContainer'));
		ballAreaElement.setAttribute('id','ballArea'+(i+1));
		ballAreaElement.classList.add('ballArea'+(i+1));

		var ballArea = new Ball();
		ballArea.name = "ballArea"+i;

		ballArea.setElement(ballAreaElement);
		ballArea.setIndex(i);

		if( i < 2){
			log("############## : " + gameManager.QUIZ_OPTION[i]);
			ballArea.setValue(gameManager.QUIZ_OPTION[i]);
			ballArea.setOrgValue(gameManager.QUIZ_OPTION[i]);

			ballAreaElement.classList.add('number' + gameManager.randomArray[gameManager.imgNumber]);
			// ballAreaElement.style.backgroundImage = 'url(./images/ball_' + randomArray[ballNameIdx] + '.png)';
			gameManager.imgNumber++;
			ballArea.setType('number');
		}
		else{
			ballArea.setType('sign');
		}

		seesaw.addBallArea(ballArea);

		gameManager.dropArea.push(ballAreaElement);
	}


	/** ballList 생성.*/
	var signs = ['>','=','<'];
	for(var i=0;i<signs.length;i++){
		var ballElement = createElement('div', QS('#ballContainer'));
		ballElement.setAttribute('id','sign'+(i+1));
		ballElement.classList.add('ballList'+(i+1));
		ballElement.classList.add('sign'+(i+1));

		var ball = new Ball();
		ball.name = "ball"+i;
		ball.setValue(signs[i]);
		ball.setOrgValue(signs[i]);
		ball.setElement(ballElement);
		ball.setIndex(i);
		ball.setType('sign');

		seesaw.addBall(ball);

		new Dragdrop(ballElement);
	}

	/** hint ball 생성. */
	log("################## : hint ball 생성 ");
	var max = gameManager.QUIZ_OPTION.length - 2;
	for(var i=0;i<max;i++){
		var hintElement = createElement('div', QS('#hintList'));
		hintElement.setAttribute('id','hint'+i);
		hintElement.classList.add('hintList'+(i+1));
		hintElement.classList.add('number' + gameManager.randomArray[gameManager.imgNumber]);
		// hintElement.style.backgroundImage = 'url(./images/ball_' + randomArray[ballNameIdx] + '.png)';
		gameManager.imgNumber++;

		var hintBall = new Ball();
		hintBall.name = "hintBall"+i;
		hintBall.setElement(hintElement);
		hintBall.setValue(gameManager.QUIZ_OPTION[(i+2)]);
		hintBall.setType('number');
		hintBall.setIndex(i);

		seesaw.addHintBall(hintBall);

		new Dragdrop(hintElement);
	}

	// 힌트 버튼 생성.
	var hintBtn = QS('#hintBtn');
	hintBtn.classList.add('hint_btn');
	hintBtn.addEventListener('click', function(e) {
		streamSound.setSound('./media/dragFigure.mp3');
		e.preventDefault();
		seesaw.hintShow();
	});

	/** 힌트 닫기 설정. */
	var hintClose = QS('#hintClose')
	hintClose.addEventListener('click', function(e) {
		streamSound.setSound('./media/dragFigure.mp3');
		e.preventDefault();
		seesaw.hintHide();
	});

	seesaw.hintHide();
	seesaw.init();

}

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	gameManager.randomArray = makeRandomArray(1, 5); console.log('gameManager.randomArray:', gameManager.randomArray);
	gameManager.imgNumber = 0;
	createSeesaw();
}

// randomArray 만들기
function makeRandomArray(min, length) {
	var randomNumber = 0, inspector = '', array = [];

	do {
		randomNumber = Math.floor(Math.random() * length) + min;
		if(inspector.indexOf(randomNumber) < 0) array.push(randomNumber);
		inspector += randomNumber.toString();
	} while (array.length !== length);

	return array;
}

// 랜덤 숫자 text로 변환
function convertNumberToText(min, length, textArray) {
	var input = makeRandomArray(min, length),
		output = [];
	input.forEach(function(el, i){ output.push(textArray[el - 1]); });
	return output;
}

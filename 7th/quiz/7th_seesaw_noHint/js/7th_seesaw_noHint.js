function boundingCircle(dragObj, x, y) {
	log('bounding!');

	var bool = dropCompare(dragObj, x, y);
	dragObj.setAttribute('style','');

	if (bool[0]) { console.log('dropCompare is true');
		log("@@@@@@@@@@@@@@:드래그 성공");
		//dragObj.setAttribute('style','');
		var ball = seesawNoHint.getBallByEl(dragObj);
		var ballIndex = ball.getIndex();

		var ballArea = seesawNoHint.getBallAreaByEl(bool[0]);
		var ballAreaIndex = ballArea.getIndex();

		var answerValue = seesawNoHint.getAnswerByIndex(ballAreaIndex);

		log("@@@@@@@@@@@@@@ answerValue : " + answerValue.toString());
		log("@@@@@@@@@@@@@@ ballValue : " + ball.getValue().toString());

		if(answerValue.toString() == ball.getValue().toString() ){
			ballArea.setValue(ball.getValue());
			ballArea.reset();
			if(seesawNoHint.type == 'number'){
				ballArea.getElement().classList.add('number'+(ballIndex+3));
				ballArea.getElement().querySelector('img').src = dragObj.querySelector('img').src;
			}
			else{
				ballArea.getElement().classList.add('sign'+(ballIndex+1));
				ballArea.getElement().querySelector('img').src = dragObj.querySelector('img').src;
			}

			ballArea.setOrgValue(ball.getValue());

			dragObj.style.display = 'none';
			seesawNoHint.check();
		} else {
			streamSound.setSound('../../media/incorrect.mp3');
		}

	}
	else{ console.log('dropCompare is false');
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

function gameOver() {
	streamSound.setSound(gameManager.soundEffct);

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

var Ball = function(){
	var _this = this;
	var _element;
	var _value = [];
	var _orgValue = [];
	var _index;

	var setDefaultStyle = function(){
	}

	var setContents = function(){
		if(_value.length == 0){
			return;
		}

		// _element.innerHTML = '';
		// console.log(_value);
		if(typeof _value !== 'string'){
			if(typeof _value === 'object') {
				makeBunsu(_value.toString(), _element);
			} else {
				_element.innerHTML += '<span>' + _value + '</span>';
			}
		} else { console.log(_value);
			if(_value === '') return;
			var span = createElement('span',_element);
			replaceSymbol(_value, span);
			if(span.querySelector('img')) {
				span.querySelector('img').style.cssText = 'width: 30px; height: auto; margin: 0;';
				if(_value == '=')
					span.querySelector('img').style.marginBottom = 10 + 'px';
			}
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
* SeesawNoHint 게임
*/
var SeesawNoHint = function(){
	var _this = this;
	var _answer = [];
	var _ballAreas = [];
	var _balls = [];
	var _resultAnswer = [];

	var checkAnswer = function(){
		var ballAreaValues = [];

		for(var i=0,max=_ballAreas.length;i<max;i++){
			ballAreaValues.push(_ballAreas[i].getOrgValue());
		}

		if(_answer.toString() == ballAreaValues.toString()){
			return true;
		}
		else{
			return false;
		}
	}

	var feedBackWrong = function(){
		log('오답');
		if(seesawNoHint.type == "number")
			streamSound.setSound('./media/dragFigure.mp3');
		else
			streamSound.setSound('../../media/incorrect.mp3');
	}

	var feedBackClear = function(){
		log('정답');
		gameOver();

		if(_ballAreas[2].getOrgValue().toString() == '>'){
			QS('#seesawHor').classList.add('left_clear');

			_ballAreas[0].getElement().style.left = 135 + 'px';
			_ballAreas[0].getElement().style.top = 218 + 'px';

			_ballAreas[1].getElement().style.left = 922 + 'px';
			_ballAreas[1].getElement().style.top = 8 + 'px';

		}
		else if(_ballAreas[2].getOrgValue().toString() == '<'){
			QS('#seesawHor').classList.add('right_clear');
			_ballAreas[0].getElement().style.left = 165 + 'px';
			_ballAreas[0].getElement().style.top = 8 + 'px';

			_ballAreas[1].getElement().style.left = 952 + 'px';
			_ballAreas[1].getElement().style.top = 218 + 'px';
		}

	}

	/*************************************************************** 설정 관련 start */

	this.name;
	this.type;

	this.setAnswer = function(answer){
		_answer = answer;
	}

	this.getAnswer = function(){
		return _answer;
	}

	this.getAnswerByIndex = function(index){
		return _answer[index];
	}

	this.addResultAnswer = function(answer){
		_resultAnswer.push(answer);
	}

	this.getResultAnswer = function(){
		return _resultAnswer;
	}
	/*************************************************************** 설정 관련 end */

	/*************************************************************** 객체 관련 메소드 start */
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
	}
	/*************************************************************** 실행 관련 메소드 end */
}

/**
* 게임 생성.
*/
var seesawNoHint;
function createSeesawNoHint(){
	/** numBallAreaSum 게임 생성. */
	seesawNoHint = new SeesawNoHint();
	seesawNoHint.name = "seesawNoHint";
	seesawNoHint.setAnswer(gameManager.QUIZ_ANSWER);

	QS('#bgCanvas').innerHTML = '<div id="seesawContainer"><div class="seesaw_shadow"></div><div class="seesaw_bon2"></div><div id="seesawHor" class="seesaw_hor"></div><div class="seesaw_bon1"></div></div><div id="ballAreaContainer"></div><div id="ballContainer"></div>'

	if(gameManager.QUIZ_OPTION.length === 6){
		seesawNoHint.type = "sign";
	}
	else{
		seesawNoHint.type = "number";
	}

	log("############## : " + gameManager.QUIZ_OPTION[0]);

	var BN_Array, BN_Idx, BN_rArray, CN_Array, CN_Idx, CN_rArray;
	BN_Array = ['blue', 'green', 'yellow', 'mint', 'red'];
	BN_Idx = 0;
	BN_rArray = convertNumberToText(1, 5, BN_Array);
	CN_Array = ['blue', 'green', 'yellow'];
	CN_Idx = 0;
	CN_rArray = convertNumberToText(1, 3, CN_Array);

	/** ballArea 생성. */
	for(var i=0;i<3;i++){
		var ballAreaElement = createElement('div', QS('#ballAreaContainer'));
		ballAreaElement.setAttribute('id','ballArea'+(i+1));
		ballAreaElement.classList.add('ballArea');
		ballAreaElement.classList.add('ballArea'+(i+1));
		var img = createElement('img', ballAreaElement);

		var ballArea = new Ball();
		ballArea.name = "ballArea"+i;
		log("############## : " + gameManager.QUIZ_OPTION[i]);
		ballArea.setValue(gameManager.QUIZ_OPTION[i]);
		ballArea.setOrgValue(gameManager.QUIZ_OPTION[i]);
		ballArea.setElement(ballAreaElement);
		ballArea.setIndex(i);

		seesawNoHint.addBallArea(ballArea);
	}

	if(seesawNoHint.type == "sign"){
		gameManager.dropArea.push(seesawNoHint.getBallArea(2).getElement());
		seesawNoHint.getBallArea(0).getElement().classList.add('number1');
		seesawNoHint.getBallArea(1).getElement().classList.add('number2');

		seesawNoHint.getBallArea(0).getElement().style.backgroundImage = 'url(./images/ball_' + BN_rArray[BN_Idx] + '.png)';
		BN_Idx++;
		seesawNoHint.getBallArea(1).getElement().style.backgroundImage = 'url(./images/ball_' + BN_rArray[BN_Idx] + '.png)';
		BN_Idx++;
	}
	else{
		gameManager.dropArea.push(seesawNoHint.getBallArea(0).getElement());
		gameManager.dropArea.push(seesawNoHint.getBallArea(1).getElement());
		seesawNoHint.getBallArea(2).getElement().classList.add('sign1');
		seesawNoHint.getBallArea(2).getElement().style.left = 548 + 'px';
		seesawNoHint.getBallArea(2).getElement().style.width = 130 + 'px';

		seesawNoHint.getBallArea(2).getElement().style.backgroundImage = 'url(./images/cylinder_' + CN_rArray[CN_Idx] + '.png)';
		CN_Idx++;
	}


	/** ball 생성.*/
	var cnt = gameManager.QUIZ_OPTION.length - 3;
	log("######## : "+cnt);
	var classIdx = 1;
	for(var i=0;i<cnt;i++){
		var ballElement = createElement('div', QS('#ballContainer'));
		var img = createElement('img', ballElement);
		ballElement.setAttribute('id','ball'+(i+1));
		ballElement.classList.add('ball');
		if(seesawNoHint.type == "number") {
			ballElement.classList.add('ball'+ classIdx);
			classIdx += 2;
		}
		else {
			ballElement.classList.add('cylinder');
			ballElement.classList.add('ball'+(i+1));
		}

		// 이미지 설정
		if(seesawNoHint.type == "number") {
			img.src = './images/ball_' + BN_rArray[BN_Idx] + '.png';
			BN_Idx++;
		} else {
			img.src = './images/cylinder_' + CN_rArray[CN_Idx] + '.png';
			CN_Idx++;
		}

		// 위치 설정
		// if(seesawNoHint.type == "number") {
		// 	switch(i) {
		// 		case 0: ballElement.style.left = 312 + 'px'; break;
		// 		case 1: ballElement.style.left = 775 + 'px'; break;
		// 	}
		//
		// }

		var ball = new Ball();
		ball.name = "ball"+i;
		ball.setValue(gameManager.QUIZ_OPTION[3+i]);
		ball.setOrgValue(gameManager.QUIZ_OPTION[3+i]);
		ball.setElement(ballElement);
		ball.setIndex(i);

		seesawNoHint.addBall(ball);

		if(seesawNoHint.type == "sign"){
			ballElement.classList.add('sign'+(i+1));
		}
		else{
			ballElement.classList.add('number'+(3+i));
		}

		new Dragdrop(ballElement);
	}

	seesawNoHint.init();
}

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	console.log('gameManager.QUIZ_OPTION.length:', gameManager.QUIZ_OPTION.length);
	createSeesawNoHint();
}

function initObject(val) {
	log('initObject...');
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

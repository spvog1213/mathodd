var QuestionTitle = function(){
	var _this = this;
	var _element;
	var _value;

	var setDefaultStyle = function(){
	}

	var setContents = function(){
		if(_element.children.length === 0){
			var titleTextArray = [], text = '';
			for(var i = 0; i < 3; i++) {
				var span = document.createElement('span'),
				text = _value[i];
				if(i < 2) {
					text = text.toString().replace(/(,)/g,"");
					span.innerHTML = text;
					_element.appendChild(span);
					titleTextArray.push(span);
				} else {
					replaceSymbol(text, span);
					span.querySelector('img').style.cssText = 'width: 34px; height: 34px; margin: 0 10px';
					_element.insertBefore(span, titleTextArray[1]);
				}
			}
		}
	}

	this.name;

	this.setElement = function(el){
		_element = el;

		setDefaultStyle();
	}

	// this.getElement = function(){
	// 	return _element;
	// }

	this.setValue = function(val){
		_value = val;
	}

	// this.getValue = function(){
	// 	return _value;
	// }

	this.init = function(){
		setContents();
	}

	// this.reset = function(){
	//
	// }
}

/**
* 수학식 연산자 물방울.
*/
var Box = function(){
	var _this = this;
	var _element;
	var _value = null;

	var setDefaultStyle = function(){
		if(!_element.classList.contains('box')){
			_element.classList.add('box');
		}
	}

	var setContents = function(){
		if(_value !== ''){
			if(_element.children.length === 0){
				if(_value === '.'){
					_element.innerHTML = "<span class='point_off'>" + _value + "</span>";
				}
				else{
					_element.innerHTML = "<span class='number'>" + _value + "</span>";
				}

			}
		}
		else{
			_element.innerHTML = "&nbsp;"
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
		setDefaultStyle();
		setContents();
	}

	this.reset = function(){
		setDefaultStyle();
		setContents();
	}

	this.show = function(){
		_element.style.cssText = 'opacity: 1; visibility: visible';
		_element.children[0].style.display = 'block';
	}

	this.hide = function(){
		_element.style.cssText = 'opacity: 0; visibility: hidden';
		_element.children[0].style.display = 'none';
	}
}

/**
* MatchDcPoint 게임
*/
var MatchDcPoint = function(){
	var _this = this;
	var _answer = [];

	var _topBoxs = [];
	var _bottomBoxs = [];
	var _answerBoxs = [];

	var _enabled = true;
	var _vertical;
	var _joinBoxEl;

	var checkAnswer = function(){
		var top_point_index;
		var bottom_point_index;

		for(var i=0,max=_topBoxs.length;i<max;i++){
			var box = _topBoxs[i];
			if(box.getValue() == '.'){
				top_point_index = i;
			}
		}

		for(var i=0,max=_bottomBoxs.length;i<max;i++){
			var box = _bottomBoxs[i];
			if(box.getValue() == '.'){
				bottom_point_index = i;
			}
		}

		if(top_point_index === bottom_point_index){
			return true;
		}
		else{
			return false;
		}
	}

	var feedBackWrong = function(){
		console.log('오답');
		streamSound.setSound('../../media/incorrect.mp3');

		var checkBtn = QS('#checkContainer > div');
		if(checkBtn.classList.contains('on')) {
			window.setTimeout(function() {
				checkBtn.classList.remove('on');
			}, 100);
		}

		var topPointBoxSpan;
		var bottomPointBoxSpan;

		for(var i=0,max=_topBoxs.length;i<max;i++){
			var box = _topBoxs[i];
			if(box.getValue() == '.'){
				topPointBoxSpan = box.getElement().children[0];
			}
		}

		for(var i=0,max=_bottomBoxs.length;i<max;i++){
			var box = _bottomBoxs[i];
			if(box.getValue() == '.'){
				bottomPointBoxSpan = box.getElement().children[0];
			}
		}

		_enabled = false;
		// var cnt = 0;
		// animate({
		// 		delay : 1,
		// 		duration : 2000,
		// 		delta : makeEaseOut(quad),
		// 		step : function(delta) {
		// 			cnt++; console.log(cnt);
		// 			if(cnt%200 === 0){
		// 				if(topPointBoxSpan.classList.contains('point_off')){
		// 					topPointBoxSpan.classList.remove('point_off');
		// 					topPointBoxSpan.classList.add('point_on');
		//
		// 					bottomPointBoxSpan.classList.remove('point_off');
		// 					bottomPointBoxSpan.classList.add('point_on');
		// 				}
		// 				else{
		// 					topPointBoxSpan.classList.remove('point_on');
		// 					topPointBoxSpan.classList.add('point_off');
		//
		// 					bottomPointBoxSpan.classList.remove('point_on');
		// 					bottomPointBoxSpan.classList.add('point_off');
		// 				}
		// 			}
		// 		}
		// 	});

		topPointBoxSpan.classList.add('point_on');
		topPointBoxSpan.classList.remove('point_off');

		bottomPointBoxSpan.classList.add('point_on');
		bottomPointBoxSpan.classList.remove('point_off');

		setTimeout(function(){
			if(topPointBoxSpan.classList.contains('point_on')){
				topPointBoxSpan.classList.remove('point_on');
				topPointBoxSpan.classList.add('point_off');

				bottomPointBoxSpan.classList.remove('point_on');
				bottomPointBoxSpan.classList.add('point_off');
			}
			_enabled = true;
		}, 600);
	}

	var feedBackClear = function(){
		console.log('정답');
		QS('.left_btn').style.pointerEvents = 'none';
		QS('.right_btn').style.pointerEvents = 'none';

		for(var i=0,max=_answerBoxs.length;i<max;i++){
			var box = _answerBoxs[i];
			box.show();
		}
		_enabled = false;
		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');

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

	var setContents = function(value, element){
		if(value !== ''){
			if(element.children.length === 0){
				if(value === '.'){
					element.innerHTML = "<span class='point_off'>" + value + "</span>";
				}
				else{
					element.innerHTML = "<span class='number'>" + value + "</span>";
				}

			}
		}
		else{
			element.innerHTML = "&nbsp;"
		}
	}

	/*************************************************************** 설정 관련 start */

	this.name;

	this.setAnswer = function(answer){
		_answer = answer;
	}

	this.getAnswer = function(){
		return _answer;
	}

	this.setVertical = function(vertical){
		_vertical = vertical;
	}

	this.getVertical = function(){
		return _vertical;
	}
	/*************************************************************** 설정 관련 end */

	/*************************************************************** 객체 관련 메소드 start */
	this.addTopBox = function(box){
		_topBoxs.push(box);
	}

	this.getTopBox = function(index){
		return _topBoxs[index];
	}

	this.addBottomBox = function(box){
		_bottomBoxs.push(box);
	}

	this.getBottomBox = function(index){
		return _bottomBoxs[index];
	}

	this.addAnswerBox = function(box){
		_answerBoxs.push(box);
	}

	this.getAnswerBox = function(index){
		return _answerBoxs[index];
	}

	this.setJoinBoxEl = function(el){
		_joinBoxEl = el
	}

	this.getJoinBoxEl = function(){
		return _joinBoxEl;
	}

	this.setJoinBoxPosition = function(){
		var moveBoxContainer = (_vertical=='top') ? QS('#topBoxContainer') : QS('#bottomBoxContainer'),
			targetBoxs = (_vertical=='top') ? _topBoxs : _bottomBoxs,
			targetBox;
		for(var i=0,max=targetBoxs.length;i<max;i++){	
			if(targetBoxs[i].getValue() !== '') {
				// console.log(targetBoxs[i].getValue());
				targetBox = targetBoxs[i];
				break;
			}
		}

		// console.log('여기다!', moveBoxContainer, targetBox.getElement(), moveBoxContainer.offsetLeft, targetBox.getElement().offsetLeft)
		_joinBoxEl.style.left = (moveBoxContainer.offsetLeft + targetBox.getElement().offsetLeft) - 4 + 'px';
		_joinBoxEl.style.top = 240 + (moveBoxContainer.offsetTop + targetBox.getElement().offsetTop) - 4 + 'px';
	}
	/*************************************************************** 객체 관련 메소드 end */

	/*************************************************************** 실행 관련 메소드 start */
	this.check = function(){
		// console.log(_this.name + ": check");
		if(!_enabled){
			return;
		}

		QS('#checkContainer > div').classList.add('on');

		if(checkAnswer()){
			feedBackClear();
		}
		else{
			feedBackWrong();
		}

	}

	this.left = function(){
		// console.log(_this.name + ": left");
		if(!_enabled){
			return;
		}

		var moveBoxContainer = (_vertical=='top')?QS('#topBoxContainer'):QS('#bottomBoxContainer');
		var moveBoxs = (_vertical=='top')?_topBoxs:_bottomBoxs;

		// 이동 가능 유무 확인
		if(moveBoxs[0].getValue() !== ''){
			console.log("이동 불가.");
			return;
		}

		moveBoxContainer.innerHTML = "";
		var firstBox = moveBoxs.shift();
		moveBoxs.push(firstBox);
		for(var i=0,max=moveBoxs.length;i<max;i++){
			var box = moveBoxs[i];
			// console.log(box.getElement());
			moveBoxContainer.appendChild(box.getElement());
			setContents(box.getValue(), box.getElement());
		}
		_this.setJoinBoxPosition();

	}

	this.right = function(){
		if(!_enabled){
			return;
		}

		// console.log(_this.name + ": right");
		var moveBoxContainer = (_vertical=='top')?QS('#topBoxContainer'):QS('#bottomBoxContainer');
		var moveBoxs = (_vertical=='top')?_topBoxs:_bottomBoxs;

		// 이동 가능 유무 확인
		if(moveBoxs[moveBoxs.length-1].getValue() !== ''){
			console.log("이동 불가.");
			return;
		}

		moveBoxContainer.innerHTML = "";
		var lastBox = moveBoxs.pop();
		moveBoxs.unshift(lastBox);
		for(var i=0,max=moveBoxs.length;i<max;i++){
			var box = moveBoxs[i];
			// console.log(box.getElement());
			moveBoxContainer.appendChild(box.getElement());
			setContents(box.getValue(), box.getElement());
		}
		_this.setJoinBoxPosition();
	}

	this.init = function(){
		for(var i=0,max=_answerBoxs.length;i<max;i++){
			_topBoxs[i].init();
			_bottomBoxs[i].init();
			_answerBoxs[i].init();
		}
		_this.setJoinBoxPosition();
	}
	/*************************************************************** 실행 관련 메소드 end */
}

/**
* 게임 생성.
*/
var matchDcPoint;
function createMatchDcPoint(){

	/** 타이틀 설정.*/
	var questionTitle = new QuestionTitle();
	questionTitle.name = "questionTitle";

	var questionTitleElement = QS('#queTxt');
	questionTitle.setElement(questionTitleElement);
	questionTitle.setValue(gameManager.QUIZ_OPTION);
	questionTitle.init();

	/** MatchDcPoint 게임 생성. */
	matchDcPoint = new MatchDcPoint();
	matchDcPoint.name = "matchDcPoint";
	matchDcPoint.setAnswer(gameManager.QUIZ_ANSWER);

	var max = gameManager.QUIZ_ANSWER.length;
	var boxLength = [];

	gameManager.QUIZ_OPTION[1].forEach(function(value, index){
		if (value !== '') boxLength.push(value);
	});

	/** joinBox 생성. */
	var joinBoxElement = createElement('div', QS('#joinBoxContainer'));
	joinBoxElement.setAttribute('id','joinBox');
	joinBoxElement.classList.add('join_box');
	
	joinBoxElement.style.width = (boxLength.length * 111) + "px";
	matchDcPoint.setJoinBoxEl(joinBoxElement);

	// 문제식 중 작은 쪽으로 좌우 버튼 위치 설정.
	var vertical_align = (gameManager.QUIZ_OPTION[0].toString().length < gameManager.QUIZ_OPTION[1].toString().length)?'top':'bottom';

	/** top box 생성. */
	var topBoxContainerElement = createElement('div', QS('#boxContainer'));
	topBoxContainerElement.setAttribute('id','topBoxContainer');

	for(var i=0;i<max;i++){
		var topBoxElement = createElement('div', topBoxContainerElement);
		topBoxElement.setAttribute('id','topBox'+(i+1));

		var topBox = new Box();
		topBox.setElement(topBoxElement);
		topBox.setValue(gameManager.QUIZ_OPTION[0][i]);
		matchDcPoint.addTopBox(topBox);
	}

	/** bottom box 생성. */
	var bottomBoxContainerElement = createElement('div', QS('#boxContainer'));
	bottomBoxContainerElement.setAttribute('id','bottomBoxContainer');

	for(var i=0;i<max;i++){
		var bottomBoxElement = createElement('div', bottomBoxContainerElement);
		bottomBoxElement.setAttribute('id','bottomBox'+(i+1));

		var bottomBox = new Box();
		bottomBox.setElement(bottomBoxElement);
		bottomBox.setValue(gameManager.QUIZ_OPTION[1][i]);
		matchDcPoint.addBottomBox(bottomBox);
	}

	/** answer box 생성. */
	var answerBoxContainerElement = createElement('div', QS('#boxContainer'));
	answerBoxContainerElement.setAttribute('id','answerBoxContainer');

	for(var i=0;i<max;i++){
		var answerBoxElement = createElement('div', answerBoxContainerElement);
		answerBoxElement.setAttribute('id','answerBox'+(i+1));

		var answerBox = new Box();
		answerBox.setElement(answerBoxElement);
		answerBox.setValue(gameManager.QUIZ_ANSWER[i]);
		matchDcPoint.addAnswerBox(answerBox);
	}

	// 수식 생성.
	var arithmeticElement = createElement('div', QS('#boxContainer'));
	arithmeticElement.classList.add('arithmetic');
	//arithmeticElement.innerHTML = gameManager.QUIZ_OPTION[2];
	replaceSymbol(gameManager.QUIZ_OPTION[2], arithmeticElement);
	arithmeticElement.querySelector('img').style.width = 34 + 'px';
	arithmeticElement.querySelector('img').style.height = 34 + 'px';

	// 수식 bar
	var barElement = createElement('div', QS('#boxContainer'));
	barElement.classList.add('arithmetic_bar');

	// 좌우 버튼 생성.
	var leftBtn = createElement('div', QS('#btnContainer'));
	leftBtn.classList.add('left_btn');
	leftBtn.addEventListener('click', function(e) {
		e.preventDefault();
		streamSound.setSound('media/dragFigure.mp3');
		matchDcPoint.left();
	});

	var rightBtn = createElement('div', QS('#btnContainer'));
	rightBtn.classList.add('right_btn');
	rightBtn.addEventListener('click', function(e) {
		e.preventDefault();
		streamSound.setSound('media/dragFigure.mp3');
		matchDcPoint.right();
	});

	leftBtn.classList.add(vertical_align);
	rightBtn.classList.add(vertical_align);

	// 정답확인 버튼 생성.
	var checkBtn = createElement('div', QS('#checkContainer'));
	checkBtn.classList.add('check_btn');
	checkBtn.addEventListener('click', function(e) {
		e.preventDefault();
		matchDcPoint.check();
	});

	matchDcPoint.setVertical(vertical_align);
	matchDcPoint.init();
}

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');
	createMatchDcPoint();
}

function initObject(val) {
	log('initObject...');
}

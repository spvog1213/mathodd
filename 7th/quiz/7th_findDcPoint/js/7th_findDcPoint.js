function boundingCircle(dragObj, x, y) {
	log('bounding!');

	var bool = dropCompare(dragObj, x, y);
	dragObj.setAttribute('style','');
	if (bool[0]) {
		findDcPoint.swapPeaByEl(dragObj,bool[0]);
		findDcPoint.setView();
		streamSound.setSound(gameManager.soundEffct);
	} else {
		streamSound.setSound('../../media/incorrect.mp3');
	}
}

function dropCompare (dragObj, x, y) {
	log("@@@@@@@@@@@@@@:dropCompare x:"+x+",y:"+y);

	for (var i = 0; i < gameManager.dropArea.length; i++) {
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

/** 타이틀 */
var QuestionTitle = function(){
	var _this = this;
	var _element;
	var _value;

	var setDefaultStyle = function(){
	}

	var setContents = function(){
		if(_element.children.length === 0){
			_element.innerHTML = _value;
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
* 강낭콩.
*/
var Pea = function(){
	var _this = this;
	var _element;
	var _value = null;

	var setDefaultStyle = function(){
		if(!_element.classList.contains('pea')){
			_element.classList.add('pea');
		}
	}

	var setContents = function(){
		if(_element.children.length === 0){
			var txt = createElement('span',_element);
			if(_value === '.'){
				_element.classList.add('point');
				new Dragdrop(_element)
			}
			else{
				_element.classList.add('text');
			}
			txt.innerHTML = _value;
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
}

/**
* FindDcPoint 게임
*/
var FindDcPoint = function(){
	var _this = this;
	var _answer = [];
	var _peas = [];
	var _enabled = true;

	var checkAnswer = function(){
		var pea_point_index;
		var answer_point_index;

		for(var i=0,max=_peas.length;i<max;i++){
			var pea = _peas[i];
			if(pea.getValue() == '.'){
				pea_point_index = i;
			}
		}

		for(var i=0,max=_answer.length;i<max;i++){
			if(_answer[i] == '.'){
				answer_point_index = i;
			}
		}

		if(pea_point_index === answer_point_index){
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
		_enabled = false;
		gameOver();
	}

	/*************************************************************** 설정 관련 start */

	this.name;

	this.setAnswer = function(answer){
		_answer = answer;
	}

	this.getAnswer = function(){
		return _answer;
	}
	/*************************************************************** 설정 관련 end */

	/*************************************************************** 객체 관련 메소드 start */
	this.addPea = function(pea){
		_peas.push(pea);
	}

	this.getPea = function(index){
		return _peas[index];
	}

	this.getPeaByElement = function(el){
		for(var i=0,max=_peas.length;i<max;i++){
			if(_peas[i].getElement() == el){
				return _peas[i];
			}
		}
	}
	this.getPeaIndexByName = function(name){
		for(var i=0,max=_peas.length;i<max;i++){
			if(_peas[i].name == name){
				return i;
			}
		}
	}
	/*************************************************************** 객체 관련 메소드 end */

	/*************************************************************** 실행 관련 메소드 start */
	this.swapPeaByEl = function(pointPeaEl,textPeaEl){
		var pointPea = _this.getPeaByElement(pointPeaEl);
		var pointPeaIndex = _this.getPeaIndexByName(pointPea.name);
		var textPea = _this.getPeaByElement(textPeaEl);
		var textPeaIndex = _this.getPeaIndexByName(textPea.name);

		_peas.splice(pointPeaIndex,1);
		_peas.splice(textPeaIndex,0,pointPea);

		var peaContainer = QS('#peaContainer');
		peaContainer.innerHTML = "";
		for(var i=0,max=_peas.length;i<max;i++){
			var pea = _peas[i];
			log(pea.getElement());
			peaContainer.appendChild(pea.getElement());
		}
	}

	this.setView = function(){
		var valueStr =  '';
		for(var i=0,max=_peas.length;i<max;i++){
			var pea = _peas[i];
			valueStr += pea.getValue();
		}
		log("valueStr:"+parseFloat(valueStr));
		QS('#bottom5').children[0].innerHTML = parseFloat(valueStr);
		QS('#bottom5').style.textAlign='left';
	}

	this.check = function(){
		log(_this.name + ": check");
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

	this.init = function(){
		for(var i=0,max=_peas.length;i<max;i++){
			_peas[i].init();
		}
	}
	/*************************************************************** 실행 관련 메소드 end */
}

/**
* 게임 생성.
*/
var findDcPoint;
function createFindDcPoint(){

	/** 타이틀 설정.*/
	var questionTitle = new QuestionTitle();
	questionTitle.name = "questionTitle";

	var questionTitleElement = QS('#queTxt');
	questionTitle.setElement(questionTitleElement);
	questionTitle.setValue("소수점 <span><img src='./images/btn_point_pea.png' alt=''><span>.</span></span>을 알맞은 자리로 옮기세요.");
	questionTitle.init();

	/** FindDcPoint 게임 생성. */
	findDcPoint = new FindDcPoint();
	findDcPoint.name = "findDcPoint";
	findDcPoint.setAnswer(gameManager.QUIZ_ANSWER[0].split(''));

	/** top 수식 생성. */
	var topFormular = gameManager.QUIZ_OPTION[0][0].split(' ');
	console.log('topFormular:', topFormular);
	for(var i=0,max=topFormular.length;i<max;i++){
		var topElement = createElement('div', QS('#contentContainer'));
		topElement.setAttribute('id','top'+(i+1));
		topElement.classList.add('top');
		topElement.classList.add('text'+(i+1));

		var topSpan = createElement('span', topElement);
		var num = parseInt(topFormular[i]);

		if(num.toString() === 'NaN'){
			replaceSymbol(topFormular[i], topSpan);
			topSpan.querySelector('img').style.width = 24 + 'px';
			topSpan.querySelector('img').style.height = 24 + 'px';

		}
		else{
			topSpan.innerHTML = topFormular[i];
		}
	}

	/** bottom 수식 생성. */
	var bottomFormular = gameManager.QUIZ_OPTION[0][1].split(' ');
	console.log('bottomFormular:', bottomFormular);
	for(var i=0,max=bottomFormular.length;i<max;i++){
		var bottomElement = createElement('div', QS('#contentContainer'));
		bottomElement.setAttribute('id','bottom'+(i+1));
		bottomElement.classList.add('bottom');
		bottomElement.classList.add('text'+(i+1));

		var bottomSpan = createElement('span', bottomElement);
		var num = parseInt(bottomFormular[i]);

		log("############### : " + typeof num + ':' + num);
		if(num.toString() === 'NaN' && bottomFormular[i] !== '?'){
			replaceSymbol(bottomFormular[i], bottomSpan);
			bottomSpan.querySelector('img').style.width = 24 + 'px';
			bottomSpan.querySelector('img').style.height = 24 + 'px';

		}
		else{
			bottomSpan.innerHTML = bottomFormular[i];
		}
	}

	/** pea 생성. */
	for(var i=0,max=gameManager.QUIZ_OPTION[1].length;i<max;i++){
		var peaElement = createElement('div',  QS('#peaContainer'));
		peaElement.setAttribute('id','pea'+(i+1));

		var pea = new Pea();
		pea.name = "pea"+(i+1);
		pea.setElement(peaElement); console.log();
		pea.setValue(gameManager.QUIZ_OPTION[1].split('')[i]);
		findDcPoint.addPea(pea);

		if(pea.getValue() != '.'){
			gameManager.dropArea.push(peaElement);
		}
	}

	// 정답확인 버튼 생성.
	var checkBtn = createElement('div', QS('#checkContainer'));
	checkBtn.classList.add('check_btn');
	checkBtn.addEventListener('click', function(e) {
		e.preventDefault();
		findDcPoint.check();
	});

	findDcPoint.init();
}

function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');
	createFindDcPoint();
}

function initObject(val) {
	log('initObject...');
}

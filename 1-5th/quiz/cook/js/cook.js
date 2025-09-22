function initScene() {
	log('initScene...');

	log('excute initClockTimer!');
	CheckButton();
	createBg();
	// parent.window.initClockTimer();
	
}

function createBg(){
	appendCircleElement('wrap','wrap', document.querySelector('#answerObject1'));
	appendImageElement('pot','images/cook_pot.png', bgCanvas);
	appendCircleElement('cuttingBg','cuttingBg', bgCanvas);
	appendImageElement('cook_arrow','images/cook_arrow.png', cuttingBg);
	appendCircleElement('questionBox','questiontxt',bgCanvas);
	appendCircleElement('questiontxt1','questiontxt',document.querySelector('#questionBox'));
	appendCircleElement('grayBox','grayBox',document.querySelector('#questionBox'));
	appendCircleElement('questiontxt2','questiontxt',document.querySelector('#questionBox'));

	
	questiontxt2.innerHTML ='개를 넣으세요.';

	appendCircleElement('ans1','txt', grayBox);
	appendCircleElement('ans2','line', grayBox);
	appendCircleElement('ans3','txt', grayBox);

	ans1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
	ans2.innerHTML = '----';
	ans3.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];

	questiontxt1.setAttribute('style','left: 101px;');
	questiontxt2.setAttribute('style','right: 37px;');
	ans1.setAttribute('style','top: -37px');
	ans2.setAttribute('style','left: -2px; top: -6px; letter-spacing: -5px;');
	ans3.setAttribute('style','top: 23px');

	var answer = gameManager.TOTAL_ANSWER_ARRAY[1];
	if(answer === 2){
		questiontxt1.innerHTML = '당근';
	}else if(answer === 4 || answer === 6 || answer === 8){
		questiontxt1.innerHTML = '양파';
	}else if(answer === 3 || answer === 5 || answer === 9){
		questiontxt1.innerHTML = '파';
		grayBox.style.left = '166px';
		questiontxt1.style.left = '125px';
		questiontxt2.style.right = '57px';
	}
}

function firstVegetable() {
	var VegetableArray = ['carrot','onion','springonion'];

	var answer = gameManager.TOTAL_ANSWER_ARRAY[1];
	if(answer === 2){
		VegetableRandom = VegetableArray[0];
	}else if(answer === 4 || answer === 6 || answer === 8){
		VegetableRandom = VegetableArray[1];
	}else if(answer === 3 || answer === 5 || answer === 9){
		VegetableRandom = VegetableArray[2];
	}

	appendImageElement('firstVegetable','images/cook_'+ VegetableRandom + '_1.png', document.querySelector('#cuttingBg'));

	if(answer === 3 || answer === 5 || answer === 9){
		var firstVegetable = document.querySelector('#firstVegetable');
		firstVegetable.setAttribute('style','position: absolute; top: 80px; left:76px');
	}
	
	var firstVegetable = document.querySelector('#firstVegetable'),
		vegetableCounter = document.querySelector('#vegetableCounter'),
		cook_arrow = document.querySelector('#cook_arrow'),
		firstVegetable = document.querySelector('#firstVegetable');
	btnDown = function(e) {
		e.preventDefault();
		
	}
	btnUp = function(e) {
		e.preventDefault();
		vegetableCounter.style.display = 'block';
		firstVegetable.style.display = 'none';
		cook_arrow.style.display = 'none';
		carrot();
		streamSound.setSound('media/cook_cut.mp3');
	}

	firstVegetable.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	firstVegetable.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);
}



function initVegetable(vegetableCounter) {
	log('initVegetable...');

	var left = 15,
	   	vegetableOriginal,
	    answerObject1 = document.getElementById('answerObject1'),
	    firstVegetable = document.querySelector('#firstVegetable');
		objSrc = firstVegetable.src;
		obj = objSrc.replace('_1.png','');
		obj = obj.split('_');
		obj = obj.slice(-1);
		answer = gameManager.TOTAL_ANSWER_ARRAY[1];

	
		vegetableOriginal = 'images/cook_' + obj +'_'+ answer +'.png';


		for (var i = 0; i < vegetableCounter; i++) {
			var top = 90,
			    eventCallback = function() {
				arguments[0].preventDefault();

			};

			createObject(i, top, left, eventCallback, vegetableOriginal);
		}

}

function gameOver() {
	var answerObj1 = document.querySelector('#answerObject1'),
	    answerChildNode1 = parseInt(answerObj1.childNodes[0].childNodes.length);

	if (answerChildNode1 === gameManager.CURRENT_ANSWER[0]) {

		var vegetableCounter = document.querySelector('#vegetableCounter');
		vegetableCounter.style.pointerEvents = 'none';

		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');

		logCounter.tryCounter();
		logCounter.endTime();

		var checkBtn = document.querySelector('#checkBtn');
		checkBtn.style.pointerEvents = "none";


		setTimeout(function() {
			log('excute stampStarIcon!');
			// parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			// parent.window.insDrillHis(logCounter.submitReport());
		}, 1800);

	} else {
		log('@ incorrect!!');
		logCounter.tryCounter();
		streamSound.setSound('../../media/incorrect.mp3');
		
		setTimeout(function() {
			gameManager.selectedQuestion = [];
			appendCircleElement('wrap','wrap', document.querySelector('#answerObject1'));
			document.querySelector('#bgCanvas').innerHTML = "<div id='vegetableCounter'></div><div id='answerObject1'></div><img src='images/boxfill_checkbtn.png' id = 'checkBtn'/>";
			createBg();
			firstVegetable();
			initVegetable(gameManager.TOTAL_ANSWER_ARRAY[1]);
			CheckButton();
		}, 400);
	}
	

}

function boundingCircle(dragObj, x, y) {
	switch (gameManager.CURRENT_TYPE) {
	case 'cook':
		var answerObj1 = document.querySelector('#answerObject1'),
		  	answerChildNode1 = parseInt(answerObj1.childNodes[0].childNodes.length)+1,
		  	wrap = document.querySelector('#wrap'),
		  	answer = gameManager.TOTAL_ANSWER_ARRAY[1];

		if (x > answerObj1.offsetLeft * gameManager.zoomRate && x < (answerObj1.offsetLeft * gameManager.zoomRate) + ((answerObj1.clientWidth + 10) * gameManager.zoomRate) && y > answerObj1.offsetTop * gameManager.zoomRate && y < (answerObj1.offsetTop * gameManager.zoomRate) + ((answerObj1.clientHeight + 10) * gameManager.zoomRate) && answerChildNode1) {
			log('bounding!');

			streamSound.setSound('media/cook_water.mp3');
			
			objsrc = dragObj.src;
			
			dragObj.style.top = '0px';
			dragObj.style.left = '0px';

			wrap.appendChild(dragObj);
			if(answer === 2){
				dragObj.setAttribute('src',objsrc.replace('.png','_pot.png'));
				answerObj1.style.paddingTop = '234px';
				dragObj.setAttribute('style','padding-left: 2px; ');
				dragObj.className = 'chage';
			}else if(answer === 3 || answer === 5 ||answer === 9){
				dragObj.setAttribute('src',objsrc.replace('.png','_pot.png'));
				dragObj.setAttribute('style','padding-left: 0px; ');
				dragObj.className = 'chage';
			}else if(answer === 4 || answer === 6 ||answer === 8){
				dragObj.setAttribute('src',objsrc.replace('.png','_' + answerChildNode1 + '_pop.png'));
			}

		} else {
			streamSound.setSound('../../media/incorrect.mp3');
			log('not bounding!');
			logCounter.tryCounter();
			incorrectAnimation(dragObj);
		}
		break;

	default:
	}

}

function createObject(index, top, left, eventCallback, parentObjSrc) {
	var answer = gameManager.TOTAL_ANSWER_ARRAY[1],
		choiceTop = 139,
	    choiceLeft = 102,
	    parentObj = document.createElement('img');

	parentObj.src = parentObjSrc;

	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObj.className = "vegetable";

	if(answer === 6){
		/*양파 6개*/
		    choiceLeft = (choiceLeft-28) * index-17;
		    choiceTop = (choiceTop+70);
		    parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');
	}else if(answer === 8){
		/*양파 8개 */
		    choiceLeft = (choiceLeft-50) * index;
		    choiceTop = (choiceTop+70);
		    parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');
	}else if(answer === 4){
		/*양파4개*/
		choiceLeft = choiceLeft * index;
		choiceTop = (choiceTop + 65);
		parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');
	}else if(answer === 2){
		/*당근*/
		choiceLeft = choiceLeft * index + 115;
		choiceTop = (choiceTop + 65);
		parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');
	}else if(answer === 3){
		/*파 3개*/
		choiceLeft = (choiceLeft+40) * index;
		choiceTop = (choiceTop - 110);
		parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px; padding-top: 220px;');
	}else if(answer === 5){
		/*파 5개*/
		choiceLeft = (choiceLeft-20) * index;
		choiceTop = (choiceTop - 110);
		parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px; padding-top: 220px;');
	}else if(answer === 9){
		/*파 9개*/
		choiceLeft = (choiceLeft-58) * index;
		choiceTop = (choiceTop - 110);
		parentObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px; padding-top: 220px;');
	}

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);
	gameManager.choiceQuestionPosition.push([choiceTop, choiceLeft]);
	document.getElementById('vegetableCounter').appendChild(parentObj);

	new Dragdrop(parentObj);
}


function CheckButton() {
	var checkBtn = document.querySelector('#checkBtn');

	btnDown = function(e) {
		e.preventDefault();
		checkBtn.src = 'images/boxfill_checkbtn_push.png';
	}
	btnUp = function(e) {
		e.preventDefault();
		checkBtn.src = 'images/boxfill_checkbtn.png';
		gameOver();
	}

	checkBtn.addEventListener(gameManager.eventSelector.downEvent, btnDown, false);
	checkBtn.addEventListener(gameManager.eventSelector.upEvent, btnUp, false);

}


function carrot() {
	var answer = gameManager.TOTAL_ANSWER_ARRAY[1],
	vegetableCounter = document.querySelector("#vegetableCounter");

	if(answer === 2){
		for(var a = 0; a < answer; a++){
			vegetableCounter.childNodes[a].src = 'images/cook_carrot_'+ (a+2) +'.png';
		}
	}else if(answer === 3 || answer === 5 || answer === 9){
		for(var a = 0; a < answer; a++){
			vegetableCounter.childNodes[a].src = 'images/cook_springonion_' + answer +'_'+ (a+1) +'.png';
		}
	}
}
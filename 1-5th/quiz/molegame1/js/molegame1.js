function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var machine = document.getElementById('machine');

	appendCircleElement("questionTxt", "questionTxt", machine);
	appendImageElement("questionLight", "images/molegame1_light_0.png", machine);

	var questionTxt = document.querySelector('#questionTxt'),
	    questionLight = document.querySelector('#questionLight');

	questionLight.setAttribute('style', 'position:absolute; top:24px; left:12px');
	questionTxt.innerHTML = gameManager.choiceQuestionText;

}

function initMole() {
	log('initMole...');

	var machine = document.getElementById('machine'),
	    randomCase = parseInt(Math.random() * 2),
	    top = 208,
	    left = 110,
	    moleImg,
	    moleHand,
	    moleHit;

	for (var i = 0; i < 4; i++) {
		appendCircleElement("hole_" + i, "hole", machine);
		document.querySelector('#hole_' + i).setAttribute('style', 'top:' + top + 'px; left:' + left + 'px;');
		left = left + 260;
		if (i == 1) {
			top = top + 171;
			left = 110;
		}
	}

	//Min, Max, Number
	setRand(0, 1, 2);

	for (var z = 0; z < gameManager.TOTAL_ANSWER_ARRAY.length - 1; z++) {

		switch(randResult[z]) {
		case 0 :
			moleImg = 'images/molegame1_mole0_0.png';
			moleHand = 'images/molegame1_mole0_hand.png';
			moleHit = 'images/molegame1_mole0_1.png';
			break;
		case 1 :
			moleImg = 'images/molegame1_mole1_0.png';
			moleHand = 'images/molegame1_mole1_hand.png';
			moleHit = 'images/molegame1_mole1_1.png';
			break;
		}

		createObject(z, gameManager.molePosition[randomCase][z][0], gameManager.molePosition[randomCase][z][1], moleImg, moleHand, moleHit);
	}

}

function gameOver(currentObj) {

	// log(currentObj);

	var currentObjId = currentObj.id
	questionLight= document.querySelector('#questionLight'),
	lightArray=['images/molegame1_light_1.png','images/molegame1_light_2.png','images/molegame1_light_1.png','images/molegame1_light_2.png'];
	currentObjId = currentObjId.split('_');

	var currentTop = gameManager.choiceQuestionPosition[currentObjId[1]][0],
	    currentLeft = gameManager.choiceQuestionPosition[currentObjId[1]][1];

	log("currentTop" + currentTop);

	animate({
		delay : 20,
		duration : 400,
		delta : makeEaseInOut(linear),
		step : function(delta) {
			currentObj.style.top = ((60 * delta)) + 'px';
		}
	});
	
	
	setTimeout(function() {
		switch(currentObjId[1]) {
		case "0":
			document.querySelector('#mole_1').style.top = "60px";
			document.querySelector('#mole_0').style.top = "0px";
			break;

		case "1":
			document.querySelector('#mole_0').style.top = "60px";
			document.querySelector('#mole_1').style.top = "0px";
			break;
		}

	}, 700);
	
	
	

	setTimeout(function() {
		spriteAnimationCustom(lightArray,questionLight);
		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');

		logCounter.tryCounter();
		logCounter.endTime();

		setTimeout(function() {
			log('excute stampStarIcon!');
			parent.window.stampStarIcon();
		}, 500);

		// save log data
		setTimeout(function() {
			log('excute insDrillHis!');
			parent.window.insDrillHis(logCounter.submitReport());
		}, 2200);

	}, 800);
}

function createObject(index, top, left, parentObjSrc, moleHandSrc, moleHitSrc) {
	var moleWrap = document.createElement('div'),
	    moleObjWrap = document.createElement('div'),
	    moleTxt = document.createElement('div'),
	    parentObj = document.createElement('img'),
	    moleHand = document.createElement('img'),
	    holeFront = document.createElement('img');

	holeFront.src = 'images/molegame1_hole_front.png';
	moleHand.src = moleHandSrc;
	parentObj.src = parentObjSrc;

	moleObjWrap.setAttribute('id', 'mole_' + index);
	moleWrap.setAttribute('id', 'moleWrap_' + index);
	parentObj.setAttribute('id', 'parentObj_' + index);

	moleObjWrap.setAttribute('answerValue', gameManager.TOTAL_ANSWER_ARRAY[index]);
	moleTxt.className = "moleTxt";
	moleWrap.className = "moleWrap";
	parentObj.className = "mole";
	moleHand.className = "moleHand";
	holeFront.className = "holeFront";

	moleTxt.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[index];

	moleWrap.setAttribute('style', 'position:absolute; top:' + top + 'px; left : ' + left + 'px;');

	gameManager.choiceQuestionPosition.push([top, left]);

	moleObjWrap.setAttribute('style', 'position:absolute;');

	var eventCallback = function() {
		arguments[0].preventDefault();

		feedBackAnimation(this, moleHitSrc, parentObjSrc, function() {
		});

	};

	moleObjWrap.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	moleObjWrap.appendChild(moleTxt);
	moleObjWrap.appendChild(parentObj);
	moleWrap.appendChild(holeFront);
	moleWrap.appendChild(moleHand);
	moleWrap.appendChild(moleObjWrap);
	document.getElementById('machine').appendChild(moleWrap);
}

function spriteAnimationCustom(spriteArray, spriteObj) {

	var index = 0,
	    durationAni = parseInt(spriteArray.length - 1) * 100;

	animate({
		delay : 200,
		duration : 600,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}

function feedBackAnimation(parentObj, parentObjSrc, parentOriSrc, callback) {

	var parentObjId = parentObj.id;
	parentObjId = parentObjId.split('_');

	var answerValue = parentObj.getAttribute('answervalue'),
	    parenntImg = parentObj.childNodes[1],
	    currentTop = gameManager.choiceQuestionPosition[parentObjId[1]][0],
	    currentLeft = gameManager.choiceQuestionPosition[parentObjId[1]][1],
	    top = 0,
	    hit = document.createElement('img');
	answerValue = parseInt(answerValue);

	hit.src = 'images/molegame1_hit.png';
	parenntImg.src = parentObjSrc;

	hit.setAttribute('style', 'position:absolute; z-index:6; display:block; top:' + currentTop + 'px; left:' + (currentLeft + 30) + 'px;');

	document.querySelector('#machine').appendChild(hit);

	animate({
		delay : 20,
		duration : 300,
		delta : makeEaseOut(bounce),
		step : function(delta) {
			parentObj.style.top = ((-10 * delta) + (+(10 + top))) + 'px';
		}
	});

	setTimeout(function() {

		parenntImg.src = parentOriSrc;
		document.querySelector('#machine').removeChild(hit);

	}, 300);

	if (gameManager.CURRENT_ANSWER[0] === answerValue) {
		var moleWrap = document.querySelectorAll('.moleWrap');

		for (var i = 0; i < moleWrap.length; i++) {
			moleWrap[i].style.pointerEvents = "none";
		}
		streamSound.setSound('media/correctHit.mp3');
		setTimeout(function() {
			gameOver(parentObj);
		}, 500);
	} else {
		streamSound.setSound('media/hit.mp3');
	}
	
	logCounter.tryCounter();

}

function setRand(min, max, number) {
	randResult = new Array();
	randList = new Array();
	for (var z = min; z <= max; z++) {
		randList.push(z);
	}
	for (var x = 0; x < number; x++) {
		getRand();
	}
	return randResult;
}

function getRand() {
	randNumber = Math.floor(Math.random() * randList.length);
	randResult.push(randList[randNumber]);
	randList.splice(randNumber, 1);
}

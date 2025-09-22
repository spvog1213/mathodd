function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var machine = document.getElementById('machine');

	appendCircleElement("questionTxt", "questionTxt", machine);
	appendImageElement("questionTextBox", "images/molegame2_textbox.png", machine);

	var questionTxt = document.querySelector('#questionTxt'),
	    questionTextBox = document.querySelector('#questionTextBox');

	questionTextBox.setAttribute('style', 'position:absolute; top:47px; left:223px');
	questionTxt.innerHTML = gameManager.choiceQuestionText;

}

function initMole() {
	log('initMole...');

	var machine = document.getElementById('machine'),
	    randomCase = parseInt(Math.random() * 2),
	    top = 62,
	    left = 130,
	    moleImg = 'images/molegame2_mole0_0.png',
	    moleHand = 'images/molegame2_mole0_hand.png',
	    moleHit = 'images/molegame2_mole0_1.png',
	    moleImg2 = 'images/molegame2_mole1_0.png',
	    moleHand2 = 'images/molegame2_mole1_hand.png',
	    moleHit2 = 'images/molegame2_mole1_1.png';

	for (var i = 0; i < 9; i++) {
		if (i % 3 === 0) {
			top = top + 171;
			left = 130;
		}
		appendCircleElement("hole_" + i, "hole", machine);
		document.querySelector('#hole_' + i).setAttribute('style', 'top:' + top + 'px; left:' + left + 'px;');

		switch(randomCase) {
		case 0:
			if (i % 2 === 0) {
				createObject(i, top, left, moleImg, moleHand, moleHit);
			} else {
				createObject(i, top, left, moleImg2, moleHand2, moleHit2);
			}
			break;

		case 1:
			if (i % 2 === 0) {
				createObject(i, top, left, moleImg2, moleHand2, moleHit2);
			} else {
				createObject(i, top, left, moleImg, moleHand, moleHit);
			}
			break;
		}

		left = left + 260;

	}

}

function gameOver() {

	var mole = document.querySelectorAll('.mole'),
	    correctMole = document.querySelectorAll('.correctMole');

	setTimeout(function() {

		for (var y = 0; y < mole.length; y++) {
			mole[y].style.top = "100px";
			//mole[y].childNodes[0].style.color = "#999";
			//mole[y].childNodes[0].style.display = "none";
		}

		for (var i = 0; i < correctMole.length; i++) {
			correctMole[i].style.top = "0px";
		}

	}, 700);

	setTimeout(function() {
		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');

		//logCounter.tryCounter();
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

	holeFront.src = 'images/molegame2_hole_front.png';
	moleHand.src = moleHandSrc;
	parentObj.src = parentObjSrc;

	moleObjWrap.setAttribute('id', 'mole_' + index);
	moleWrap.setAttribute('id', 'moleWrap_' + index);
	parentObj.setAttribute('id', 'parentObj_' + index);

	moleObjWrap.setAttribute('answerValue', gameManager.TOTAL_ANSWER_ARRAY[index]);
	moleTxt.className = "moleTxt";
	moleWrap.className = "moleWrap";
	moleObjWrap.className = "mole";
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
		delay : 100,
		duration : durationAni,
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

	hit.src = 'images/molegame2_hit.png';
	parenntImg.src = parentObjSrc;

	hit.setAttribute('style', 'position:absolute; z-index:6; display:block; top:' + (currentTop - 10) + 'px; left:' + (currentLeft + 70) + 'px;');

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

	compareAnswer(parentObj);
	logCounter.tryCounter();
}

function compareAnswer(currentObj) {

	var answerValue = currentObj.getAttribute('answerValue');

	for (var z = 0; z < gameManager.CURRENT_ANSWER.length; z++) {
		if (parseInt(answerValue) === gameManager.CURRENT_ANSWER[z]) {
			gameManager.compareAnswer.push(parseInt(answerValue));

			streamSound.setSound('media/correctHit.mp3');
			currentObj.style.pointerEvents = "none";
			currentObj.className = "correctMole";
			setTimeout(function() {
				animate({
					delay : 20,
					duration : 400,
					delta : makeEaseInOut(linear),
					step : function(delta) {
						currentObj.style.top = ((60 * delta)) + 'px';
					}
				});
			}, 500);

			if (gameManager.compareAnswer.length === gameManager.CURRENT_ANSWER.length) {
				var moleWrap = document.querySelectorAll('.moleWrap');

				for (var i = 0; i < moleWrap.length; i++) {
					moleWrap[i].style.pointerEvents = "none";
				}

				setTimeout(function() {
					gameOver();
				}, 500);
			}

			break;
		} else {
			streamSound.setSound('media/hit.mp3');
		}
	}

}

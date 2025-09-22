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
	questionTxt.innerHTML = '3개 ' + gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length-1] + '&nbsp;' + gameManager.TOTAL_ANSWER_ARRAY[4];

}

function initMole() {
	log('initMole...');

	var machine = document.getElementById('machine'),
	randomCase = parseInt(Math.random() * 2),
	top = 30,
	left = 130,
	moleImg = 'images/molegame1_mole0_0.png',
	moleHand = 'images/molegame1_mole0_hand.png',
	moleHit = 'images/molegame1_mole0_1.png',
	moleImg2 = 'images/molegame1_mole1_0.png',
	moleHand2 = 'images/molegame1_mole1_hand.png',
	moleHit2 = 'images/molegame1_mole1_1.png';

	for (var i = 0; i < 4; i++) {
		if (i % 2 === 0) {
			top = top + 171;
			left = 110;
		}
		appendCircleElement("hole_" + i, "hole", machine);
		document.querySelector('#hole_' + i).setAttribute('style', 'top:' + top + 'px; left:' + left + 'px;');

		switch(randomCase) {
			case 0:
			if (i === 0 || i === 3) {
				createObject(i, top, left, moleImg, moleHand, moleHit);
			} else {
				createObject(i, top, left, moleImg2, moleHand2, moleHit2);
			}
			break;

			case 1:
			if (i === 0 || i === 3) {
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
	var questionLight= document.querySelector('#questionLight');
	lightArray=['images/molegame1_light_1.png','images/molegame1_light_2.png','images/molegame1_light_1.png','images/molegame1_light_2.png'];

	setTimeout(function() {
		spriteAnimationCustom(lightArray,questionLight);
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

	holeFront.src = 'images/molegame1_hole_front.png';
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

	hit.setAttribute('style', 'position:absolute; z-index:6; display:block; top:' + (currentTop - 10) + 'px; left:' + (currentLeft + 30) + 'px;');

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



	gameManager.selectArray.push(answerValue);


	if(gameManager.selectArray.length <= 3){
		parentObj.style.pointerEvents = 'none';
		streamSound.setSound('media/correctHit.mp3');
		setTimeout(function() {
			animate({
				delay : 20,
				duration : 400,
				delta : makeEaseInOut(linear),
				step : function(delta) {
					parentObj.style.top = ((60 * delta)) + 'px';
				}
			});		
		}, 500);


		compareAnswer(parentObj);
	};


}

function sumBallNumber() {
	var totalSumNumber = 0;
	for (var z = 0; z < gameManager.selectArray.length; z++) {
		totalSumNumber = totalSumNumber + parseInt(gameManager.selectArray[z]);
	}
	return totalSumNumber;
}


function compareAnswer(currentObj) {

	var moleWrap = document.querySelectorAll('.moleWrap'),
	mole = document.querySelectorAll('.mole');

	

	if (gameManager.selectArray.length === gameManager.CURRENT_ANSWER.length) {


		
		for (var i = 0; i < moleWrap.length; i++) {
			moleWrap[i].style.pointerEvents = "none";
			mole[i].style.pointerEvents = "none";
		}		
		
		for (var i = 0; i < gameManager.selectArray.length; i++) {
			
			for (var z = 0; z < gameManager.CURRENT_ANSWER.length; z++) {
				if (parseInt(gameManager.selectArray[i]) === gameManager.CURRENT_ANSWER[z]) {
					gameManager.compareAnswer.push(parseInt(gameManager.selectArray[i]));
					
					
					if (gameManager.CURRENT_ANSWER[z] === gameManager.CURRENT_ANSWER[z + 1]) gameManager.compareAnswer.splice(z, 1);

				}
			}
		}


		if (gameManager.compareAnswer.length === gameManager.CURRENT_ANSWER.length) {
				logCounter.tryCounter();
			
			setTimeout(function() {
				for (var a = 0; a < mole.length; a++) {
					if(mole[a].offsetTop != 0){
						mole[a].style.top = "0px";
					}else{
						mole[a].style.top = "100px";
					}

					mole[a].style.pointerEvents = "none";
				}

			},1500);

			setTimeout(function() {
			 	gameOver();
			},500);
		} else {

			gameManager.selectArray=[];
			gameManager.compareAnswer=[];

			
			setTimeout(function() {
				for (var i = 0; i < mole.length; i++) {
					moleWrap[i].style.pointerEvents = "auto";
					mole[i].style.pointerEvents = "auto";

					mole[i].style.top = "0px";
				}

			}, 1500);
			
			setTimeout(function() {
				
				streamSound.setSound('../../media/incorrect.mp3');
			}, 1200);

			logCounter.tryCounter();

		}

	} 

	
	

}

function initScene() {
	log('initScene...');
	log(gameManager.CURRENT_ANSWER);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var machine = document.getElementById('machine');
	appendImageElement("questionLight", "images/molegame1_light_0.png", machine);
	questionLight.setAttribute('style', 'position:absolute; top:24px; left:12px');

	queTxt();
}


function queTxt(){
	appendCircleElement('queTxt_wrap','queTxt_wrap', bgCanvas);
    appendCircleElement('queTxt','queText', document.querySelector('#queTxt_wrap'));
    appendCircleElement('queText1','queText', document.querySelector('#queTxt'));
    appendCircleElement('calculation1','calculation', document.querySelector('#queTxt'));
    appendCircleElement('queText2','queText', document.querySelector('#queTxt'));
    appendCircleElement('calculation2','calculation', document.querySelector('#queTxt'));
    appendCircleElement('queText3','queText', document.querySelector('#queTxt'));

    queText1.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[0];
    queText2.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[1];
    queText3.innerHTML = gameManager.TOTAL_ANSWER_ARRAY[2];
    

    switch(gameManager.TOTAL_ANSWER_ARRAY[6]){
    	case '+':
    		calulation = 'plus';
    	break;
    	case '-':
    		calulation = 'minus';
    	break;
    	case '/':
    		calulation = 'division';
    	break;
    	case '*':
    		calulation = 'multiplication';
    	break;
    }
     switch(gameManager.TOTAL_ANSWER_ARRAY[7]){
    	case '+':
    		calulation2 = 'plus';
    	break;
    	case '-':
    		calulation2 = 'minus';
    	break;
    	case '/':
    		calulation2 = 'division';
    	break;
    	case '*':
    		calulation2 = 'multiplication';
    	break;
    }

  	  appendImageElement('cal_img', 'images/'+ calulation +'.png', calculation1);
  	  appendImageElement('cal_img', 'images/'+ calulation2 +'.png', calculation2);

}

function initMole() {
	log('initMole...');

	var machine = document.getElementById('machine'),
	randomCase = parseInt(Math.random() * 2),
	top = 220,
	left = 70,
	moleImg = 'images/molegame1_mole0_0.png',
	moleHand = 'images/molegame1_mole0_hand.png',
	moleHit = 'images/molegame1_mole0_1.png',
	moleImg2 = 'images/molegame1_mole1_0.png',
	moleHand2 = 'images/molegame1_mole1_hand.png',
	moleHit2 = 'images/molegame1_mole1_1.png';

	for (var i = 0; i < 3; i++) {
		if( i >= 2) {
			top = top + 150;
			left = 245;
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

		left = left + 350;

	}

	for(var a = 0; a < 3; a++){
		var moleTxt = document.querySelectorAll('.moleTxt');
		moleTxt[0].innerHTML = gameManager.TOTAL_ANSWER_ARRAY[3];
		moleTxt[1].innerHTML = gameManager.TOTAL_ANSWER_ARRAY[5];
		moleTxt[2].innerHTML = gameManager.TOTAL_ANSWER_ARRAY[4];
	}

	var mole_0 = document.querySelector('#mole_0')
		mole_1 = document.querySelector('#mole_1')
		mole_2 = document.querySelector('#mole_2');

		mole_0.setAttribute('answerValue', gameManager.TOTAL_ANSWER_ARRAY[3]);
		mole_1.setAttribute('answerValue', gameManager.TOTAL_ANSWER_ARRAY[5]);
		mole_2.setAttribute('answerValue', gameManager.TOTAL_ANSWER_ARRAY[4]);

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

	moleTxt.className = "moleTxt";
	moleWrap.className = "moleWrap";
	moleObjWrap.className = "mole";
	moleHand.className = "moleHand";
	holeFront.className = "holeFront";

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
		streamSound.setSound('media/hit.mp3');

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
				streamSound.setSound('media/correctHit.mp3');

				logCounter.tryCounter();

				setTimeout(function() {
				for (var a = 0; a < mole.length; a++) {
					mole[a].style.pointerEvents = "none";
						if(mole[a].offsetTop != 0){
							mole[a].style.top = "0px";
						}else{
							mole[a].style.top = "100px";
						}
					}
				},1500);

			setTimeout(function() {
				animate({
					delay : 20,
					duration : 400,
					delta : makeEaseInOut(linear),
					step : function(delta) {
						currentObj.style.top = ((60 * delta)) + 'px';
					}
				});		
			}, 700);

			setTimeout(function() {
			 	gameOver();
			},500);
		} else {
			gameManager.selectArray=[];
			gameManager.compareAnswer=[];

			setTimeout(function() {
				for (var i = 0; i < mole.length; i++) {
					mole[i].style.top = "0px";
				}
			}, 1500);
				setTimeout(function() {
				for (var i = 0; i < mole.length; i++) {
					moleWrap[i].style.pointerEvents = "auto";
					mole[i].style.pointerEvents = "auto";
				}
			}, 700);
			
			setTimeout(function() {
				
				// streamSound.setSound('../../media/incorrect.mp3');
			}, 500);

			logCounter.tryCounter();

		}

	} 

	
	

}

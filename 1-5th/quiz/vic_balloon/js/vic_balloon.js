function initScene() {
	log('initScene...');
	// log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	appendImageElement('NumberPanel', 'images/vic_balloon_pan.png', document.getElementById('bgCanvas'));

	var currentAnswerText = document.createElement('div');
	currentAnswerText.setAttribute('style', 'position:absolute; left:0px; width: 354px; text-align:center;');

	currentAnswerText.innerHTML = "<span style='position: relative; top:0px; font-size:50px;'>3개 " + gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length - 1] + "&nbsp;</span> <span style='font-size:50px;'>" + gameManager.TOTAL_ANSWER_ARRAY[gameManager.TOTAL_ANSWER_ARRAY.length - 2] + "</span>";
	document.querySelector('#currentNumber').innerHTML = "0";

	document.getElementById('currentAnswer').appendChild(currentAnswerText);

}

function initBalloon(balloonCounter) {
	log('initBalloon...');

	var left = gameManager.startBallArray.length === 4 ? 180 : 150;
	

	for (var i = 0; i < balloonCounter; i++) {

		var top = (Math.random() * 40) + 80,
		rndIndex = parseInt(Math.random() * 5),
		eventCallback = function(e) {

			e.preventDefault();
			e.stopImmediatePropagation();


			reset(balloonCounter);

			arguments[0].preventDefault();

			var objIndex = this.id.split('_'),
			ballObj = document.getElementById('ball_' + objIndex[1]),
			height = (document.getElementById('bgCanvas').clientHeight - ballObj.clientHeight) - 400,
			currentTop = parseInt(ballObj.style.top.replace('px', ''));

			setTimeout(function(){
				autoBall(balloonCounter);

				gameManager.selectBallArray.push(ballObj.querySelector('.ballText').innerHTML);
			// gameManager.multiSelectBallArray.push(ballObj.querySelector('.ballText').innerHTML);


			gameOver();
		},300);
			streamSound.setSound('media/balloon01.mp3');

			animate({
				delay : 20,
				duration : 1000,
				delta : makeEaseOut(bounce),
				step : function(delta) {
					ballObj.style.top = ((height * delta) + currentTop) + 'px';
				}
			});

			feedBackAnimation(this, 'images/boom_' + this.getAttribute('rndIndex') + '.png', function() {
				var totalBasketNumber = sumBallNumber();

				document.querySelector('#currentNumber').innerHTML = totalBasketNumber;
			});

		};

		createObject(i, top, left, eventCallback, 'images/balloon_' + rndIndex + '.png', 'images/ball_' + rndIndex + '.png', rndIndex);
		left += 180;
	}
}

function sumBallNumber() {
	var totalSumNumber = 0;
	multiTotalSumNumber = 0;
	for (var z = 0; z < gameManager.selectBallArray.length; z++) {
		totalSumNumber = totalSumNumber + parseInt(gameManager.selectBallArray[z]);
	}

	return totalSumNumber;
}


function reset(balloonCounter){
	var ballBox = document.querySelectorAll('.ballBox'),
	balloon = document.querySelectorAll('.balloon');
	for(var i = 0 ; i<balloonCounter ; i++ ){
		console.log(ballBox[i]);
		ballBox[i].style.pointerEvents = "none";
		balloon[i].style.pointerEvents = "none";

	}
}

function autoBall(balloonCounter){
	var ballBox = document.querySelectorAll('.ballBox'),
	balloon = document.querySelectorAll('.balloon');
	for(var i = 0 ; i<balloonCounter ; i++ ){
		console.log(ballBox[i]);
		ballBox[i].style.pointerEvents = "auto";
		balloon[i].style.pointerEvents = "auto";

	}
}


function gameOver() {
	log('@ gameOver!');
	var ballBox = document.querySelectorAll('.ballBox'),
	balloon = document.querySelectorAll('.balloon');

	
	
	//log(gameManager.CURRENT_ANSWER + "gameManager.CURRENT_ANSWER ");
	//log(gameManager.selectBallArray +"gameManager.selectBallArray");
	
	//log(gameManager.CURRENT_ANSWER.length + "gameManager.CURRENT_ANSWER.length");
	//log(gameManager.selectBallArray.length + "gameManager.selectBallArray.length");

	if (gameManager.selectBallArray.length === gameManager.CURRENT_ANSWER.length) {

		log('답비교하자!!안오자나');

		for (var i = 0; i < ballBox.length; i++) {
			ballBox[i].style.pointerEvents = "none";
			balloon[i].style.pointerEvents = "none";
		}		
		
		

		for (var i = 0; i < gameManager.selectBallArray.length; i++) {
			for (var z = 0; z < gameManager.CURRENT_ANSWER.length; z++) {
				if (parseInt(gameManager.selectBallArray[i]) === gameManager.CURRENT_ANSWER[z]) {


					gameManager.compareAnswer.push(parseInt(gameManager.selectBallArray[i]));		

					if (gameManager.CURRENT_ANSWER[z] === gameManager.CURRENT_ANSWER[z + 1]) gameManager.compareAnswer.splice(z, 1);	
						//log(gameManager.CURRENT_ANSWER + '이건뭐임?');
						//log(gameManager.compareAnswer);
					}
				}
			}

			if (gameManager.compareAnswer.length === gameManager.CURRENT_ANSWER.length) {


			//return;
			setTimeout(function() {
				
				gameOverAnimation();
				streamSound.setSound('../../media/correct.mp3');
				logCounter.endTime();
				clearInterval(countTimer);

				setTimeout(function() {
					log('excute stampStarIcon!');
					parent.window.stampStarIcon();
				}, 500);

					// save log data
					setTimeout(function() {
						log('excute insDrillHis!');
						parent.window.insDrillHis(logCounter.submitReport());
					}, 1800);

				}, 1000);
		} else {
			for (var i = 0; i < ballBox.length; i++) {
				ballBox[i].style.pointerEvents = "none";
				balloon[i].style.pointerEvents = "none";
			}
			setTimeout(function() {
				streamSound.setSound('../../media/incorrect.mp3');
			}, 500);
			setTimeout(function() {
				gameManager.selectBallArray = [];
				gameManager.compareAnswer = [];
				document.querySelector('#bgCanvas').innerHTML = "<div id='currentAnswer'></div><div id='currentNumber'></div><div id='countDown'></div>";
				initScene();
				initBalloon(gameManager.startBallArray.length);
			}, 1500);
		}

	}else{
		return;
	} 
	logCounter.tryCounter();

}

function createObject(index, top, left, eventCallback, parentObjSrc, childObjSrc, rndIndex) {
	var parentObj = document.createElement('img'),
	childBox = document.createElement('div'),
	childObj = document.createElement('img');

	parentObj.src = parentObjSrc;
	childObj.src = childObjSrc;
	childObj.className = "ball";

	childBox.setAttribute('id', 'ball_' + index);
	childBox.className = "ballBox";
	childBox.innerHTML = '<div class="ballText">' + gameManager.startBallArray[index] + '</div>';
	childBox.setAttribute('style', 'top : ' + (top + 40) + 'px; left : ' + (left + 45) + 'px;');

	var height = document.getElementById('bgCanvas').clientHeight - childObj.clientHeight - 400,
	width = 100,
	currentTop = parseInt(childObj.style.top.replace('px', ''));

	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObj.setAttribute('rndIndex', rndIndex);
	parentObj.className = "balloon";

	parentObj.setAttribute('style', 'top : ' + top + 'px; left : ' + left + 'px;');

	addIdleAnimation(1000, 10, 4, parentObj, top, childBox);

	parentObj.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	childBox.appendChild(childObj);
	document.getElementById('bgCanvas').appendChild(childBox);
	document.getElementById('bgCanvas').appendChild(parentObj);
}

function feedBackAnimation(parentObj, parentObjSrc, callback) {

	parentObj.src = parentObjSrc;

	setTimeout(function() {

		parentObj.setAttribute('style', 'display: none;');

		callback();

	}, 100);
}

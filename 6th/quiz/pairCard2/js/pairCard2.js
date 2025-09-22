function initScene() {
	log('initScene...');
	log(gameManager.QUIZ_ANSWER[0]);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var bgCanvas = document.querySelector('#bgCanvas'),
		cardContainer = createElement('div', bgCanvas, 'cardContainer');

	if(gameManager.cardArray.length == 8) {
		cardContainer.style.width = '1085px';
		cardContainer.style.left = '50px';
	} else {
		cardContainer.style.width = '815px';
		cardContainer.style.left = '200px';
	}
}

function initPair(cardCounter) {
	log('initPair...');

	var randomCard = Math.floor(3 * Math.random()) + 1,
    cardAlign = document.getElementById('cardAlign');

	for (var i = 0; i < cardCounter; i++) {

		var eventCallback = function() {

			arguments[0].preventDefault();

			var objIndex = this.id.split('_'),
			    objIndex = objIndex.slice(objIndex.length - 1),
			    checkImg = document.createElement('img');

			checkImg.src = 'images/pairCard_card_' + randomCard + '_success.png';
			checkImg.setAttribute('id', 'check_' + objIndex);

			checkImg.setAttribute('style', 'position:absolute; top:0px; left:20px; z-index: -1;');

			if (gameManager.selectCardArray.length <= 1) {
				streamSound.setSound('media/keyClick.mp3');
				this.appendChild(checkImg);
				this.style.pointerEvents = "none";
				gameManager.selectCardArray.push(this);
				compareAnswer();
			} else {
				return;
			}

		};

		createObject(i, eventCallback, 'images/pair_card_' + randomCard + '.png');
	}
}

function createObject(index, eventCallback, parentObjSrc) {
	var parentObj = document.createElement('img'),
	    parentObjBack = document.createElement('img'),
	    cardBox = document.createElement('div');

	parentObj.src = parentObjSrc;
	parentObjSrc.className = "card";

	cardBox.setAttribute('id', 'cardBox_' + index);
	cardBox.className = "cardBox";
	parentObjBack.className = "cardBack";
	parentObj.className = "cardObj";

	if (gameManager.cardArray[index][0] == 'clock') {
		cardBox.innerHTML = '<div class="cardImgC" style="background: url(../../images/common/' + gameManager.cardArray[index][0] + '/' + gameManager.cardArray[index][1] + '_' + gameManager.cardArray[index][2] + '_' +gameManager.cardArray[index][3] + '.png); width: 240px; height: 243px; background-size: cover;  margin: 1px 0 0 19px;"></div>';
	} else if(gameManager.cardArray[index][0] == 'text') {
		cardBox.innerHTML = '<div class="cardText"><div class="cardTextMiddle">' + gameManager.cardArray[index][1] + '</div></div>';
	} else {
		// if (gameManager.cardArray[index].length > 3) {
		// 	cardBox.innerHTML = '<div class="cardImgC" style="background: url(../../images/common/' + gameManager.cardArray[index][0] + '/' + gameManager.cardArray[index][1] + '_' + gameManager.cardArray[index][2] + '_' + gameManager.cardArray[index][3] + '.png); width: 120px; height: 120px; background-size: cover;  margin: 60px 80px;"></div>';
		// } else {
		// 	cardBox.innerHTML = '<div class="cardImgC" style="background: url(../../images/common/' + gameManager.cardArray[index][0] + '/' + gameManager.cardArray[index][1] + '_' + gameManager.cardArray[index][2] + '.png); width: 120px; height: 120px; background-size: cover;  margin: 60px 80px;"></div>';
		// }
		cardBox.innerHTML = '<div class="cardImgC" style="background: url(../../images/common/' + gameManager.cardArray[index][0] + '/' + gameManager.cardArray[index][1] + '.png); width: 120px; height: 120px; background-size: cover;  margin: 60px 80px;"></div>';
	}

	cardBox.setAttribute('answerValue', index);

	parentObj.setAttribute('id', 'parentObj_' + index);

	cardBox.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	cardBox.appendChild(parentObj);

	document.querySelector('.cardContainer').appendChild(cardBox);
}

function compareAnswer() {
	log('@ compareAnswer!');
	if (gameManager.selectCardArray.length === 2) {

		var correct = function() {
			log("@correct!");


			gameManager.compareAnswer.push(gameManager.selectCardArray[0].getAttribute('answerValue'), gameManager.selectCardArray[1].getAttribute('answerValue'));

			setTimeout(function() {
				streamSound.setSound('media/click.mp3');
				for (var i = 0; i < gameManager.selectCardArray.length; i++) {

					fadeOutAnimate(gameManager.selectCardArray[i].childNodes[2], gameManager.selectCardArray[i].childNodes[1]);
					gameManager.selectCardArray[i].childNodes[0].style.display = "none";
					gameManager.selectCardArray[i].childNodes[1].style.display = "none";
					gameManager.selectCardArray[i].removeChild(gameManager.selectCardArray[i].childNodes[2]);

				}

				gameManager.selectCardArray = [];
			}, 300);

		}
		var incorrect = function() {
			log('@incorrect');

			streamSound.setSound('../../media/incorrect.mp3');

			setTimeout(function() {
				for (var i = 0; i < gameManager.selectCardArray.length; i++) {

					gameManager.selectCardArray[i].removeChild(gameManager.selectCardArray[i].childNodes[2]);
					gameManager.selectCardArray[i].style.pointerEvents = "auto";
				}
				gameManager.selectCardArray = [];
			}, 250);
		}

		for (var y = 0; y < gameManager.QUIZ_ANSWER.length; y++) {
			for (var z = 0; z < gameManager.selectCardArray.length; z++) {

				if (gameManager.selectCardArray[0].getAttribute('answerValue') === gameManager.QUIZ_ANSWER[y][z].toString()) {
					if (gameManager.selectCardArray[1].getAttribute('answerValue') === gameManager.QUIZ_ANSWER[y][1].toString()) {
						correct();
						break;
					} else if (gameManager.selectCardArray[1].getAttribute('answerValue') === gameManager.QUIZ_ANSWER[y][0].toString()) {
						correct();
						break;
					} else {
						incorrect();
						break;
					}
				}

			}
		}
		logCounter.tryCounter();

	}

	log("gameManager.compareAnswer.length" + gameManager.compareAnswer.length);
	log("gameManager.QUIZ_ANSWER.length" + gameManager.QUIZ_ANSWER.length * 2);
	if (gameManager.QUIZ_ANSWER.length * 2 === gameManager.compareAnswer.length) {
		setTimeout(function() {
			gameOver();
		}, 350);
	}

}

function fadeOutAnimate(aniObj, displayObj) {

	animate({
		delay : 20,
		duration : 300,
		delta : makeEaseInOut(quint),
		step : function(delta) {
			aniObj.style.opacity = (1 * delta);
		}
	});
}

function gameOver() {
	log('@ gameOver!');

	log(gameManager.QUIZ_ANSWER);
	log(gameManager.selectCardArray);

	gameOverAnimation();
	streamSound.setSound('../../media/correct.mp3');
	logCounter.endTime();
	clearInterval(countTimer);


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

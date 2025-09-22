function initScene() {
	log('initScene...');
	// log(gameManager.CURRENT_ANSWER[0]);

	log('excute initClockTimer!');
	// parent.window.initClockTimer();

}

function initPair(cardCounter) {
	log('initPair...');

	var randomCard = Math.floor(3 * Math.random()) + 1,
	    cardAlign = document.getElementById('cardAlign'),
	    cardWidth = gameManager.cardArray.length === 4 ? 60 : 100;

	cardAlign.style.width = cardWidth + '%';

	for (var i = 0; i < cardCounter; i++) {

		var eventCallback = function() {

			arguments[0].preventDefault();

			var objIndex = this.id.split('_'),
			    objIndex = objIndex.slice(objIndex.length - 1),
			    checkImg = document.createElement('img');

			checkImg.src = 'images/checkmark.png';
			checkImg.setAttribute('id', 'check_' + objIndex);

			checkImg.setAttribute('style', 'position:absolute; top:-5px; left:85px');

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
	parentObjBack.src = 'images/pair_card_0.png';
	parentObjSrc.className = "card";

	cardBox.setAttribute('id', 'cardBox_' + index);
	cardBox.className = "cardBox";
	parentObjBack.className = "cardBack";
	parentObj.className = "cardObj";
	cardBox.innerHTML = '<div class="cardText">' + gameManager.cardArray[index] + '</div>';

	parentObj.setAttribute('id', 'parentObj_' + index);
	parentObjBack.setAttribute('id', 'parentObjBack_' + index);

	cardBox.setAttribute('answerValue', gameManager.cardArray[index]);

	cardBox.addEventListener(gameManager.eventSelector.downEvent, eventCallback, false);

	cardBox.appendChild(parentObj);
	cardBox.appendChild(parentObjBack);
	document.getElementById('cardAlign').appendChild(cardBox);
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
					gameManager.selectCardArray[i].removeChild(gameManager.selectCardArray[i].childNodes[3]);

				}

				gameManager.selectCardArray = [];
			}, 300);

		}
		var incorrect = function() {
			log('@incorrect');

			streamSound.setSound('../../media/incorrect.mp3');

			setTimeout(function() {
				for (var i = 0; i < gameManager.selectCardArray.length; i++) {

					gameManager.selectCardArray[i].removeChild(gameManager.selectCardArray[i].childNodes[3]);
					gameManager.selectCardArray[i].style.pointerEvents = "auto";
				}
				gameManager.selectCardArray = [];
			}, 250);
		}
		for (var y = 0; y < gameManager.CURRENT_ANSWER.length; y++) {
			for (var z = 0; z < gameManager.selectCardArray.length; z++) {

				if (gameManager.selectCardArray[0].getAttribute('answerValue') === gameManager.CURRENT_ANSWER[y][z].toString()) {
					if (gameManager.selectCardArray[1].getAttribute('answerValue') === gameManager.CURRENT_ANSWER[y][1].toString()) {
						correct();
						break;
					} else if (gameManager.selectCardArray[1].getAttribute('answerValue') === gameManager.CURRENT_ANSWER[y][0].toString()) {
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
	log("gameManager.CURRENT_ANSWER.length" + gameManager.CURRENT_ANSWER.length * 2);
	if (gameManager.CURRENT_ANSWER.length * 2 === gameManager.compareAnswer.length) {
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

	setTimeout(function() {
		//displayObj.style.display = "none";
	}, 290);

}

function gameOver() {
	log('@ gameOver!');

	log(gameManager.CURRENT_ANSWER);
	log(gameManager.selectCardArray);

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

}

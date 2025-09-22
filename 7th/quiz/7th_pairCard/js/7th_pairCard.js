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

			checkImg.src = 'images/card_click.png';
			checkImg.setAttribute('id', 'check_' + objIndex);

			if(this.querySelectorAll('.cardText').length > 0){
				console.log('여기다', QSAll('.cardText')[objIndex], objIndex, this.childNodes[0])
				// QSAll('.cardText')[objIndex].style.color = '#fff';
				// QSAll('.cardText')[objIndex].querySelector('.midLine').style.borderColor ='#fff';
				this.childNodes[0].style.color = '#fff';
				this.childNodes[0].querySelector('.midLine').style.borderColor ='#fff';
			}

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

		createObject(i, eventCallback, 'images/pair_card.png');
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
	} else if(gameManager.cardArray[index][0] == 'fraction'){
			var cardText = createElement('div', cardBox),
				cardTextMiddle = createElement('div', cardText),
				fractionArray = String(gameManager.cardArray[index][1]).split(' ');

				cardText.classList.add('cardText');
				cardTextMiddle.classList.add('cardTextMiddle');

				for (var i = 0; i < fractionArray.length; i++){
					var fraction = fractionArray[i];
					makeBunsu(fraction, cardTextMiddle);
				}
	} else{
		// var colorRndIndex = parseInt(Math.random() * 5 + 1);
		// if (gameManager.cardArray[index].length > 3) {
		// 	cardBox.innerHTML = '<div class="cardImgC" style="background: url(../../images/common/' + gameManager.cardArray[index][0] + '/' + gameManager.cardArray[index][1] + '_' + gameManager.cardArray[index][2] + '_' + gameManager.cardArray[index][3] + '.png); width: 120px; height: 120px; background-size: cover;  margin: 60px 80px;"></div>';
		// } else {
		// 	cardBox.innerHTML = '<div class="cardImgC" style="background: url(../../images/common/' + gameManager.cardArray[index][0] + '/' + gameManager.cardArray[index][1] + '_' + gameManager.cardArray[index][2] + '.png); width: 120px; height: 120px; background-size: cover;  margin: 60px 80px;"></div>';
		// }
		cardBox.innerHTML = '<div class="cardImgC" style="background: url(./images/pieceImg/'+ gameManager.cardArray[index][0] + '.png); width: 120px; height: 120px; background-size: cover;  margin: 60px 77px;"></div>';
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
					if(gameManager.selectCardArray[i].querySelectorAll('.cardText').length>0){
						gameManager.selectCardArray[i].querySelector('.cardText').style.color = '#000';
						gameManager.selectCardArray[i].querySelector('.midLine').style.borderColor ='#000';
					}
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


// 분수 만드는 함수
function makeBunsu(text, targetElement){
	var bunsuArray = [],
		bunsuTxt = [],
		beforeTxt = '',
		afterTxt = '';

	if(text.indexOf('[') > -1) {
		while(text.indexOf('[') > -1) {
			if(spitBunsuText(text).length === 3) {
				beforeTxt = spitBunsuText(text)[2];
				var bText = createElement('span', targetElement);
				bText.innerHTML = beforeTxt;
			}
			bunsuTxt = spitBunsuText(text)[0];
			afterTxt = spitBunsuText(text)[1];
			bunsuArray = bunsuTxt.split(',');

			drawBunsu(bunsuArray, targetElement);
			text = afterTxt; // console.log(text);
		}
	} else {
		bunsuArray = text.split(',');
		drawBunsu(bunsuArray, targetElement);
		text = afterTxt;
	}

	var aText = createElement('span', targetElement);
	aText.innerHTML = afterTxt;
}

// 분수 그릴 때 필요한 array 만드는 함수
function spitBunsuText(src){
	if(src.indexOf('[') === 0) {
		var startIdx = src.indexOf('['),
			endIdx = src.indexOf(']'),
			bunsuTxt = src.slice(startIdx + 1, endIdx),
			afterTxt = src.slice(endIdx + 1),
			resultArray = [bunsuTxt, afterTxt];
	} else {
		var startIdx = src.indexOf('['),
			endIdx = src.indexOf(']'),
			beforeTxt =  src.slice(0, startIdx),
			bunsuTxt = src.slice(startIdx + 1, endIdx),
			afterTxt = src.slice(endIdx + 1),
			resultArray = [bunsuTxt, afterTxt, beforeTxt]; // console.log('resultArray: ',resultArray);
	}
	return resultArray;
}

function drawBunsu(bunsuArray, parentElement){
	var bunsuDiv = createElement('div', parentElement, 'bunsuDiv'),
		int = createElement('div', bunsuDiv, 'int'),
		prop = createElement('div', bunsuDiv, 'prop'),
		bunja = createElement('div', prop, 'bunja'),
		bunmo = createElement('div', prop, 'bunmo'),
		midLine = createElement('div', prop, 'midLine');

	if (bunsuArray[0] != 0) int.innerHTML = bunsuArray[0];

	bunja.innerHTML = bunsuArray[1];
	bunmo.innerHTML = bunsuArray[2];

	bunsuDiv.style.cssText = 'display: inline-block; vertical-align: middle';
	int.style.cssText = 'display: inline-block; margin-right: 5px; vertical-align: middle';
	prop.style.cssText = 'position: relative; display: inline-block; line-height: 1.25em; vertical-align: middle';
	bunja.style.cssText = 'display: block; vertical-align: middle';
	bunmo.style.cssText = 'display: block; vertical-align: middle';
	midLine.style.cssText = 'position: absolute; top: 50%; left: 0; width: 100%; height: 0; margin-top: -0.05em; border-top: 0.1em solid; border-color: inherit;';
}
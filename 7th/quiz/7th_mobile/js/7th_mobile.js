function initScene() {
	log('> initScene...');
	log('excute initClockTimer!');

	// gameManager.QUIZ_OPTION.forEach(function(el, i) { console.log('gameManager.QUIZ_OPTION[' + i +']:', el)});
	// gameManager.QUIZ_ANSWER.forEach(function(el, i) { console.log('gameManager.QUIZ_ANSWER[' + i +']:', el)});

	// gameManager 설정
	gameManager.mobileImgNo = Math.floor(Math.random() * 3) + 1;
	gameManager.weightImgArray = makeRandomArray(1, 6);

	gameManager.type = 'weight';
	gameManager.tilt = 'left';
	gameManager.QUIZ_OPTION[4].forEach(function(el, i) {
		if(el[0] === '' || el[1] === '')
			gameManager.tilt = 'right';
		if(el[1] === '')
			gameManager.type = 'hook';
	});
	gameManager.QUIZ_OPTION[5].forEach(function(el, i) {
		if(el[1] === '')
			gameManager.type = 'hook';
	});
	gameManager.quePos = undefined;

	setGameMangerPos(gameManager.tilt);

	drawTitle(gameManager.QUIZ_OPTION[0]);
	drawMobile();
	drawDropArea();
	drawDragObjs();
}

function setGameMangerPos(tilt) {
	switch(tilt) {
		case 'left':
			gameManager.hookPos = { top: 287, left: 120, width: 68, height: 66, degree: -7.7 };
			gameManager.weightPos = { top: 370, left: 112, width: 96, height: 120, degree: 0 };
			break;
		case 'center':
			gameManager.hookPos = { top: 224, left: 122, width: 68, height: 66, degree: 0 };
			gameManager.weightPos = { top: 303, left: 107, width: 96, height: 120, degree: 0 };
			break;
		case 'right':
			gameManager.hookPos = { top: 162, left: 132, width: 68, height: 66, degree: 7.7 };
			gameManager.weightPos = { top: 240, left: 112, width: 96, height: 120, degree: 0 };
			break;
	}
}

// 제목 그리기
function drawTitle(titleText) {
	var title, array, span;
	title = createElement('div', QS('#bgCanvas'), 'title'),
	array = titleText.split(' ');

	array.forEach(function(el, i) {
		span = createElement('span', title);
		// 기호일 경우
		if(findReplaceSymbol(el)) {
			replaceSymbol(el, span);
			span.querySelector('img').style.cssText = 'width: auto; height: 30px; margin: 0 20px 5px; vertical-align: middle;';
		}
		// ?일 경우
		else if(el === '?') {
			span.innerHTML = '?';
			span.classList.add('que');
			gameManager.quePos = i;
		}
		// 숫자일 경우
		else {
			span.innerHTML = el;
			if(gameManager.quePos === i)
				span.classList.add('que');
		}
	});
}

// mobile 그리기
function drawMobile() {
	var canvas, mobile, bar;
	canvas = QS('#bgCanvas');

	mobile = createElement('div', canvas, 'mobile');
	mobile.style.backgroundImage = 'url(./images/mobile_stand_2.png)';

	bar = createElement('img', canvas, 'bar');
	bar.src = './images/mobile_bar_2.png';

	if(gameManager.tilt === 'left') {
		bar.style.WebkitTransform = 'rotate(' + -7.7 + 'deg)';
		bar.style.msTransform = 'rotate(' + -7.7 + 'deg)';
		bar.style.transform = 'rotate(' + -7.7 + 'deg)';
	}
	else if(gameManager.tilt === 'right') {
		bar.style.WebkitTransform = 'rotate(' + 7.7 + 'deg)';
		bar.style.msTransform = 'rotate(' + 7.7 + 'deg)';
		bar.style.transform = 'rotate(' + 7.7 + 'deg)';
	}
	else {
		bar.style.WebkitTransform = 'rotate(' + 0 + 'deg)';
		bar.style.msTransform = 'rotate(' + 0 + 'deg)';
		bar.style.transform = 'rotate(' + 0 + 'deg)';
	}
}
// dropArea 그리기
function drawDropArea() {
	var styleObj = { top: 0, left: 0, width: 0, height: 0, degree: 0 },
		dropArea, textDiv, img, weightArray, dispArray, AnsIdx, isAnsSide, ansArray;
	// 왼쪽
	for(var i = 0; i < 20; i++) {
		dropArea = createElement('div', QS('#bgCanvas'), 'dropArea_' + i);
		// 고리
		if(i < 10) {
			dispArray = [];
			isAnsSide = false;
			dropArea.style.display = 'none';

			img = createElement('img', dropArea);
			img.src = './images/hook1.png';

			textDiv = createElement('div', dropArea, 'text');
			textDiv.innerHTML =  gameManager.QUIZ_OPTION[3][i];
			textDiv.style.lineHeight = 66 + 'px';

			// 왼쪽
			if(i < 5) {
				AnsIdx = i + 1;

				// styleObj 값 입력
				if(i === 0)
					Object.keys(gameManager.hookPos).forEach(function(el) { styleObj[el] = gameManager.hookPos[el]; });

				if(gameManager.tilt === 'left')
					ansArray = gameManager.QUIZ_OPTION[4];
				else {
					isAnsSide = true;
					ansArray = gameManager.QUIZ_ANSWER;
				}
			}
			// 오른쪽
			else {
				AnsIdx = i - 4;

				if(gameManager.tilt === 'left') {
					isAnsSide = true;
					ansArray = gameManager.QUIZ_ANSWER;
				} else
					ansArray = gameManager.QUIZ_OPTION[5];
			}

			// 정답인 것만 보이게 하기
			if(gameManager.type === 'hook') {
				ansArray.forEach(function(el) {
					if(dispArray.indexOf(el[0]) < 0)
						dispArray.push(el[0]);
				});
				dispArray.forEach(function(el) {
					if(el === AnsIdx) {
						if(isAnsSide) {
							img.src = './images/hook2.png';
							dropArea.style.display = 'block';
							textDiv.style.display = 'none';
						} else {
							img.src = './images/hook1.png';
							dropArea.style.display = 'block';
						}
					}
				});
			} else
				dropArea.style.display = 'block';

			dropArea.setAttribute('answervalue', gameManager.QUIZ_OPTION[3][i]);
		}
		else {
			// 왼쪽 추
			if(i < 15) {
				// styleObj 값 입력
				if(i === 10)
					Object.keys(gameManager.weightPos).forEach(function(el) { styleObj[el] = gameManager.weightPos[el]; });

				if(gameManager.tilt === 'left')
					weightArray = gameManager.QUIZ_OPTION[4];
				else
					weightArray = gameManager.QUIZ_ANSWER;

				dropArea.setAttribute('answervalue', '');
				weightArray.forEach(function(el) {
					if(i - 9 === el[0]) {
						if( (gameManager.tilt === 'left' && gameManager.type === 'weight') || gameManager.type === 'hook') {
							img = createElement('img', dropArea);
							img.src = './images/weight' + gameManager.weightImgArray.pop() + '.png';
						}
						if(gameManager.tilt === 'left' || gameManager.type === 'hook') {
							textDiv = createElement('div', dropArea, 'text');
							textDiv.innerHTML = el[1];
						}
						dropArea.setAttribute('answervalue', el[1]);
					}
				});
			}
			// 오른쪽 추
			else {
				if(gameManager.tilt === 'left')
					weightArray = gameManager.QUIZ_ANSWER;
				else
					weightArray = gameManager.QUIZ_OPTION[5];

				dropArea.setAttribute('answervalue', '');
				weightArray.forEach(function(el) {
					if(i - 14 === el[0]) {
						// 추 이미지 생성
						if( (gameManager.tilt === 'right' && gameManager.type === 'weight') || gameManager.type === 'hook') {
							img = createElement('img', dropArea);
							img.src = './images/weight' + gameManager.weightImgArray.pop() + '.png';
						}
						// 글씨 생성
						if(gameManager.tilt === 'right' || gameManager.type === 'hook') {
							textDiv = createElement('div', dropArea, 'text');
							textDiv.innerHTML = el[1];
						}
						dropArea.setAttribute('answervalue', el[1]);
					}
				});
			}
		}
		// 공통
		dropArea = applyStyles(dropArea, styleObj);
		if(gameManager.tilt !== 'center')
			styleObj.top = changeStyle(styleObj.top, 'top', i, gameManager.tilt);
		styleObj.left = changeStyle(styleObj.left, 'left', i, gameManager.tilt);

		gameManager.dropArea.push(dropArea);
	}
}

function changeStyle(pos, type, i, tilt) {
	var pos = pos;
	if (type === 'top') {
		if (tilt === 'left') {
			if (i === 4 || i === 14) {
				pos += -5;
			}
			pos += -13.5;
		} else {
			if (i === 4) {
				pos += 4;
			} else if (i === 14) {
				pos += 5;
			}
			pos += 13.3;
		}
	} else if (type === 'left') {
		if (tilt === 'left') {
			if (i < 10) {
				if (i === 4) {
					pos += 29;
				}
				pos += 99.5;
			} else {
				if (i === 14) {
					pos += 38;
				}
				pos += 98.5;
			}
		}
		else if (tilt === 'right') {
			pos += 98.5;
			if (i === 4) {
				pos += 37;
			} else if (i === 14) {
				pos += 38;
			}
		} else {
			if (i === 4) {
				pos += 37;
			} else if (i === 14) {
				pos += 38;
			}
			pos += 99.3;
		}
	}
	return pos;
}

// element에 style 값 적용
function applyStyles(HTMLelement, styleObject) {
	HTMLelement.style.top = styleObject.top + 'px';
	HTMLelement.style.left = styleObject.left + 'px';
	HTMLelement.style.width = styleObject.width + 'px';
	HTMLelement.style.height = styleObject.height + 'px';
	HTMLelement.style.WebkitTransform = 'rotate(' + styleObject.degree + 'deg)';
	HTMLelement.style.msTransform = 'rotate(' + styleObject.degree + 'deg)';
	HTMLelement.style.transform = 'rotate(' + styleObject.degree + 'deg)';
	return HTMLelement;
}

// dragObj 그리기
function drawDragObjs() {
	var canvas = QS('#bgCanvas'),
		styleObj = { top: 540, left: 200, width: 0, height: 0 },
		idx = 0, array = [];

	if(gameManager.type === 'weight') {
		styleObj.width = 96;
		styleObj.height = 120;
	} else {
		styleObj.width = 68;
		styleObj.height = 66;
	}

	for(var j = 0; j < 2; j++) {
		// 왼쪽
		if(j === 0)
			array = gameManager.QUIZ_OPTION[4];
		// 오른쪽
		else {
			array = gameManager.QUIZ_OPTION[5];
			styleObj.left = 750;
		}
		// 공통
		array.forEach(function(el, i) {
			var dragObj = createElement('div', canvas, 'dragObj dragObj_' + idx),
			img = createElement('img', dragObj),
			textDiv = createElement('div', dragObj, 'text');

			Object.keys(styleObj).forEach(function(el) { dragObj.style[el] = styleObj[el] + 'px'; });

			// 추일 경우
			if(gameManager.type === 'weight') {
				dragObj.style.backgroundImage = 'url(./images/weight' + gameManager.weightImgArray.pop() + '.png)';
				textDiv.innerHTML = el[1];
				if(el[0] === '') {
					gameManager.quizPosition.push([styleObj.top, styleObj.left]);
					gameManager.dragObjs.push(dragObj);
					styleObj.left += 108;
					dragObj.setAttribute('answervalue', el[1]);

					new Dragdrop(dragObj);
					idx++;
				} else
					dragObj.style.display = 'none';
			}
			// 고리일 경우
			else {
				dragObj.style.backgroundImage = 'url(./images/hook1.png)';
				textDiv.innerHTML = el[0];
				textDiv.style.lineHeight = 66 + 'px';
				if(el[1] === '') {
					gameManager.quizPosition.push([styleObj.top, styleObj.left]);
					gameManager.dragObjs.push(dragObj);
					styleObj.left += 108;
					dragObj.setAttribute('answervalue', el[0]);

					new Dragdrop(dragObj);
					idx++;
				} else
					dragObj.style.display = 'none';
			}
			dragObj.style.cursor = 'pointer';
		});
	}
}

function boundingCircle(dragObj, x, y) {
	var compareArea = dropCompare(dragObj, x, y)[0],
		compareValue = dropCompare(dragObj, x, y)[1];

	if (compareArea) {
		streamSound.setSound('./media/dragFigure.mp3');

		gameManager.endedDrags.push(dragObj);
		midAnimation(dragObj);

			if (compareValue) {
				gameManager.dapCount++;
				if (gameManager.dapCount === gameManager.QUIZ_ANSWER.length) {
					log('@ correct!!');
					gameOver(dragObj);
				}

			} else {
				setTimeout(function(){
					delayedIcorrectAnimation(dragObj, gameManager.tilt);
					incorrectAnimation(dragObj);
					streamSound.setSound('../../media/incorrect.mp3');
					gameManager.endedDrags = [];
					gameManager.dapCount = 0;
				}, 300);
			}

		boundingCounter = true;
	} else {
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}

function dropCompare (dragObj, x, y) {
	gameManager.dropIdx = undefined;

	var dragValue = dragObj.getAttribute('answervalue'),
		returnValue = [false, false];
		compareValue = false;

	checkReturnValue :
	for (var i = 0; i < gameManager.dropArea.length; i++) {
		if( (gameManager.type === 'weight' && i > 0 && i < 10) || (gameManager.type === 'hook' && i >= 10)) {
			continue checkReturnValue;
		}
		var dropArea = gameManager.dropArea[i],
			dropValue = dropArea.getAttribute('answervalue'),
			compareArea = x > dropArea.offsetLeft * gameManager.zoomRate &&
						  x < (dropArea.offsetLeft * gameManager.zoomRate) + ((dropArea.clientWidth + 10) * gameManager.zoomRate) &&
						  y > dropArea.offsetTop * gameManager.zoomRate &&
						  y < (dropArea.offsetTop * gameManager.zoomRate) + ((dropArea.clientHeight + 10) * gameManager.zoomRate),
			compareValue = dragValue == dropValue;

		if(returnValue[0] === false) {
			returnValue[0] = compareArea;
		}

		if(compareArea) {
			if(gameManager.dropIdx === undefined) {
				gameManager.dropIdx = i;
			}

			if(compareValue) {
				returnValue[1] = true;
				return returnValue;
			}
		}
	}
	return returnValue;
}

function incorrectAnimation(dragObj) {
	if(gameManager.dabCount === gameManager.bunsuCount) {
		var idx = gameManager.dragObjs.indexOf(dragObj),
			top = gameManager.quizPosition[idx][0],
			left = gameManager.quizPosition[idx][1];
	} else {
		var dragObjClass = dragObj.className.split('_'),
			top = gameManager.quizPosition[dragObjClass[1]][0],
			left = gameManager.quizPosition[dragObjClass[1]][1];
	}

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			if (gameManager.BOUNDING_TYPE === 'left') {
				dragObj.style.left = ((-100 * delta) + (100) + left) + 'px';
				dragObj.style.top = top + 'px';
			} else {
				dragObj.style.top = ((-100 * delta) + (100) + top)  + 'px';
				dragObj.style.left = left + 'px';
			}
		}
	});
}

function midAnimation(dragObj) {
	var dragValue = dragObj.getAttribute('answervalue'),
		styleObj = { top: 0, left: 0, width: 0, height: 0, degree: 0 };
	barPositioning('center');
	setGameMangerPos('center');

	gameManager.dropArea.forEach(function(dropArea, i) {
		dropValue = Number(dropArea.getAttribute('answervalue'));
		if(i === 0)
			Object.keys(gameManager.hookPos).forEach(function(dropArea) { styleObj[dropArea] = gameManager.hookPos[dropArea]; });
		else if(i === 10)
			Object.keys(gameManager.weightPos).forEach(function(dropArea) { styleObj[dropArea] = gameManager.weightPos[dropArea]; });

		gameManager.endedDrags.forEach(function(endedDrag, j) {
			if(i === gameManager.dropIdx) {
				if((gameManager.tilt === 'right' && (i < 4 || (i >= 10 && i < 15))) || (gameManager.tilt === 'left' && (i >= 5) || (i >= 15))) {
					applyStyles(endedDrag, styleObj);
				}
			}
		});

		applyStyles(dropArea, styleObj);
		styleObj.left = changeStyle(styleObj.left, 'left', i, 'center');
	});
}

function delayedIcorrectAnimation(dragObj) {
	var dragValue = dragObj.getAttribute('answervalue'),
		styleObj = { top: 0, left: 0, width: 0, height: 0, degree: 0 };
	barPositioning(gameManager.tilt);
	setGameMangerPos(gameManager.tilt);

	gameManager.dropArea.forEach(function(dropArea, i) {
		dropValue = Number(dropArea.getAttribute('answervalue'));
		if(i === 0)
			Object.keys(gameManager.hookPos).forEach(function(dropArea) { styleObj[dropArea] = gameManager.hookPos[dropArea]; });
		else if(i === 10)
			Object.keys(gameManager.weightPos).forEach(function(dropArea) { styleObj[dropArea] = gameManager.weightPos[dropArea]; });

		gameManager.endedDrags.forEach(function(endedDrag, j) {
			if(i === gameManager.dropIdx) {
				if((gameManager.tilt === 'right' && (i < 4 || (i >= 10 && i < 15))) || (gameManager.tilt === 'left' && (i >= 5) || (i >= 15))) {
					applyStyles(endedDrag, styleObj);
					if(gameManager.type === 'hook') {
						endedDrag.style.WebkitTransform = 'rotate(' + 0 + 'deg)';
						endedDrag.style.msTransform = 'rotate(' + 0 + 'deg)';
						endedDrag.style.transform = 'rotate(' + 0 + 'deg)';
					}
					gameManager.endedDrags.splice(j, 1);
				}
			}
		});


		applyStyles(dropArea, styleObj);
		styleObj.top = changeStyle(styleObj.top, 'top', i, gameManager.tilt);
		styleObj.left = changeStyle(styleObj.left, 'left', i, gameManager.tilt);
	});
}

function gameOver(dragObj) {
	var canvas, title, bar, styleObj, dropValue, tilt;
	canvas = QS('#bgCanvas');
	canvas.style.pointerEvents = "none";

	title = gameManager.QUIZ_OPTION[1];
	drawTitle(title);

	setTimeout(function() {
		gameOverAnimation();
		logCounter.tryCounter();
		logCounter.endTime();
		streamSound.setSound(gameManager.soundEffct);
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

function barPositioning(tilt) {
	var bar = QS('.bar');

	if(tilt === 'left') {
		bar.style.WebkitTransform = 'rotate(' + -7.7 + 'deg)';
		bar.style.msTransform = 'rotate(' + -7.7 + 'deg)';
		bar.style.transform = 'rotate(' + -7.7 + 'deg)';
	}
	else if(tilt === 'right') {
		bar.style.WebkitTransform = 'rotate(' + 7.7 + 'deg)';
		bar.style.msTransform = 'rotate(' + 7.7 + 'deg)';
		bar.style.transform = 'rotate(' + 7.7 + 'deg)';
	}
	else {
		bar.style.WebkitTransform = 'rotate(' + 0 + 'deg)';
		bar.style.msTransform = 'rotate(' + 0 + 'deg)';
		bar.style.transform = 'rotate(' + 0 + 'deg)';
	}
}

// symbol 있는지 찾아주는 함수
function findReplaceSymbol(text) { return (text.indexOf('+') > -1 || text.indexOf('-') > -1 || text.indexOf('*') > -1 || text.indexOf('/') > -1 || text.indexOf('=') > -1 || text.indexOf('...') > -1 || text.indexOf('divBox') > -1 || text.indexOf('invisibleBox') > -1) }

// randomArray 만들기
function makeRandomArray(min, length) {
	var randomNumber = 0, inspector = '', array = [];

	do {
		randomNumber = Math.floor(Math.random() * length) + min;
		if(inspector.indexOf(randomNumber) < 0) array.push(randomNumber);
		inspector += randomNumber.toString();
	} while (array.length !== length);

	return array;
}

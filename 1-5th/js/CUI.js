function initContentsUI(scaleWidth, scaleHeight, currentType, iconName) {
	console.log('setContentsUIScale...');

	var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	    screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
	    container = document.querySelector('#contentsContainer'),
	    zoomVertical = screenHeight / container.clientHeight,
	    zoomHorizontal = screenWidth / container.clientWidth;

	if (!eventCheck) {
		document.body.style.height = scaleHeight * zoomHorizontal + "px";
		document.body.style.width = scaleWidth * zoomHorizontal + "px";
		setScaleContiner(container, zoomHorizontal);
	} else {
		if (screenWidth < screenHeight)	{
			document.body.style.height = scaleHeight * zoomHorizontal + "px";
			document.body.style.width = scaleWidth * zoomHorizontal + "px";
			setScaleContiner(container, zoomHorizontal);

		} else {
			
			document.body.style.height = scaleHeight * zoomVertical + "px";
			document.body.style.width = (scaleWidth * zoomVertical) + ((screen.width - scaleWidth * zoomVertical) / 2) + "px";
			setScaleContiner(container, zoomVertical);

			console.log(screen.width - scaleWidth * zoomVertical);
			container.style.left = (screen.width - scaleWidth * zoomVertical) / 2 + 'px';
			
		}
	}

	setTimeout(function() {

		document.querySelector('#topMenuBar').innerHTML = '<div id="buttonBack"><img src="images/buttonBack.png"></div><div id="contentUITitle"></div><div><button id="fullScreenBtn">전체화면</button></div><div id=' + iconName +'><img src="images/'+ iconName +'_empty.png"><img src="images/'+ iconName +'_empty.png"><img src="images/'+ iconName +'_empty.png"><img src="images/'+ iconName +'_empty.png"><img src="images/'+ iconName +'_empty.png"><img src="images/'+ iconName +'_empty.png"><img src="images/'+ iconName +'_empty.png"><img src="images/'+ iconName +'_empty.png"><img src="images/'+ iconName +'_empty.png"><img src="images/'+ iconName +'_empty.png"></div><div id="clock"></div>';			

		var frameObj = document.createElement('iframe');
		frameObj.setAttribute('id', 'frame');
		frameObj.setAttribute('scrolling', 'no');
		frameObj.setAttribute('frameborder', '0');
		frameObj.setAttribute('style', 'width:' + scaleWidth + 'px; height:' + scaleHeight + 'px; overflow: hidden');

		if (currentType.indexOf('beadCountClick') !== -1)
			frameObj.src = 'quiz/' + currentType.replace(/[0-9]/, '') + '/' + currentType + '.html';
		else
			frameObj.src = 'quiz/' + currentType + '/' + currentType + '.html';

		document.querySelector('#contentFrame').appendChild(frameObj);

		setContentType(currentType);

		document.querySelector('#buttonBack').addEventListener(gameManager.eventSelector.downEvent, function() {
			log('click back button!');
			window.history.back();
		}, false);

		document.querySelector('#fullScreenBtn').addEventListener(gameManager.eventSelector.downEvent, function() {
			log('click fullScreen button!');
			setFullScreen();
		}, false);

	}, 10);
}

function setScaleContiner(targetElement, zoomRate) {
	targetElement.setAttribute('style', '-ms-transform: scale(' + zoomRate + ',' + zoomRate + ');' + '-webkit-transform: scale(' + zoomRate + ',' + zoomRate + ');' + 'transform: scale(' + zoomRate + ',' + zoomRate + ');' + 'transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -ms-transform-origin: 0% 0%;');
}

function getURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
	    sURLVariables = sPageURL.split('&');

	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}

function stopClockTimer() {
	clearInterval(gameManager.clockTimerInterval);
}

/*function initClockTimer(limitTime) {
 setTimeout(function() {
 log('@ initClockTimer ...');

 var clockBox = document.querySelector('#clock'),
 timerNumber = document.createElement('div'),
 minuteCircle = document.createElement('div'),
 clockTimer = document.createElement('img'),
 timeCounter = 0,
 visibleTimerNumber = 0,
 minute;

 clockTimer.src = 'images/clockTimer_0.png';
 timerNumber.setAttribute('id', 'timerNumber');
 timerNumber.innerHTML = visibleTimerNumber;

 minuteCircle.setAttribute('id', 'minuteCircle');

 clockBox.appendChild(clockTimer);
 clockBox.appendChild(timerNumber);
 clockBox.appendChild(minuteCircle);

 gameManager.clockTimerInterval = setInterval(function() {

 timeCounter++;
 visibleTimerNumber++;
 timerNumber.innerHTML = visibleTimerNumber;

 if (timeCounter === limitTime) {
 clearInterval(gameManager.clockTimerInterval);
 }

 minute = timeCounter / 60;
 if (minute >= 1) {
 minuteCircle.innerHTML = parseInt(minute);
 minuteCircle.style.display = 'block';

 if (minute === 1 || minute === 2 || minute === 3 || minute === 4 || minute === 5 || minute === 6 || minute === 7 || minute === 8 || minute === 9 || minute === 10) {
 visibleTimerNumber = 0;
 timerNumber.innerHTML = 0;

 }
 }

 log(timeCounter);

 }, 1000);

 }, 20);
 }*/

function initClockTimer() {
	setTimeout(function() {
		log('@ initClockTimer ...');

		var clockBox = document.querySelector('#clock'),
		    timerNumber = document.createElement('div'),
		    minuteCircle = document.createElement('div'),
		    clockTimer = document.createElement('img'),
		    timeCounter = 0,
		    visibleTimerNumber = 0,
		    minute;

		clockTimer.src = 'images/clockTimer_0.png';
		timerNumber.setAttribute('id', 'timerNumber');
		timerNumber.innerHTML = visibleTimerNumber;

		minuteCircle.setAttribute('id', 'minuteCircle');

		clockBox.appendChild(clockTimer);
		clockBox.appendChild(timerNumber);
		clockBox.appendChild(minuteCircle);

		gameManager.clockTimerInterval = setInterval(function() {

			timeCounter++;
			visibleTimerNumber++;
			timerNumber.innerHTML = visibleTimerNumber;

			minute = timeCounter / 60;
			if (minute >= 1) {
				minuteCircle.innerHTML = parseInt(minute);
				minuteCircle.style.display = 'block';

				if (minute === 1 || minute === 2 || minute === 3 || minute === 4 || minute === 5 || minute === 6 || minute === 7 || minute === 8 || minute === 9 || minute === 10) {
					visibleTimerNumber = 0;
					timerNumber.innerHTML = 0;

				}
			}

			log(timeCounter);

		}, 1000);

	}, 20);
}

function stampStarIcon(currentStar,iconName) {
	log('stampStarIcon!');

	var starBox = document.querySelector('#'+ iconName),
	    starDustObj = document.createElement('img'),
	    adjustLeft = -25,
	    adjustTop = -20,
	    top = 0,
	    left = currentStar * 62,
	    lastTop = top + adjustTop,
	    lastLeft = left + adjustLeft;

	starDustObj.src = 'images/'+ iconName +'Stamp.png';
	starDustObj.setAttribute('style', 'position: absolute; top:' + lastTop + 'px; left:' + lastLeft + 'px; opacity:0;');

	starBox.appendChild(starDustObj);

	var starStampAlpha = 1,
	    stampScale = 1,
	    starStampScaleInterval = setInterval(function() {
		starDustObj.style.WebkitTransform = 'scale(' + stampScale + ',' + stampScale + ')';
		starDustObj.style.msTransform = 'scale(' + stampScale + ',' + stampScale + ')';
		starDustObj.style.transform = 'scale(' + stampScale + ',' + stampScale + ')';
		starDustObj.style.WebkitTransformOrigin = '50 50';
		starDustObj.style.msTransformOrigin = '50 50';
		starDustObj.style.transformOrigin = '50 50';

		starStampAlpha = starStampAlpha - 0.01;
		stampScale = stampScale + 0.01;
		starDustObj.style.opacity = starStampAlpha;

		if (stampScale > 4) {
			clearInterval(starStampScaleInterval);
			starDustObj.style.display = 'none';
		}

	}, 3);

	starBox.childNodes[currentStar].src = 'images/'+ iconName +'.png';

}

function setFullScreen() {
	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
		if (document.documentElement.requestFullscreen)
			document.documentElement.requestFullscreen();
		else if (document.documentElement.msRequestFullscreen)
			document.body.msRequestFullscreen();
		else if (document.documentElement.mozRequestFullScreen)
			document.documentElement.mozRequestFullScreen();
		else if (document.documentElement.webkitRequestFullscreen)
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	} else {

		if (document.exitFullscreen)
			document.exitFullscreen();
		else if (document.msExitFullscreen)
			document.msExitFullscreen();
		else if (document.mozCancelFullScreen)
			document.mozCancelFullScreen();
		else if (document.webkitExitFullscreen)
			document.webkitExitFullscreen();
	}
}

function showPopUpLayer(topScore) {
	log('@ showPopUpLayer!');

	var popUpLayer = document.querySelector('#popUpLayer');
	log(popUpLayer);

	if (popUpLayer) {
		popUpLayer.innerHTML = '';
	} else {
		var popUpLayer = document.createElement('div');
	}

	popUpLayer.setAttribute('id', 'popUpLayer');
	popUpLayer.innerHTML = '<div id="topScoreTitle"></div><div id="popUpContainer"><img src="images/popUp.png"><div id="popUpTextTitle"></div><div id="popUpTextContent"></div><img id="confirmBtn" src="images/confirmBtn.png" ><img id="retryBtn" src="images/retryBtn.png" ></div>';

	document.querySelector('#contentsContainer').appendChild(popUpLayer);

	if (topScore) {
		var topScoreTitle = document.createElement('img');
		topScoreTitle.src = 'images/topScore.png';
		document.querySelector('#topScoreTitle').appendChild(topScoreTitle);
	}

	document.querySelector('#popUpTextTitle').innerHTML = '받아내림이 없는 (몇십 몇) - (몇십 몇)';
	document.querySelector('#popUpTextContent').innerHTML = '평가 총 소요시간 : <span style="color:red">3분 27초</span>';

	document.querySelector('#confirmBtn').addEventListener(gameManager.eventSelector.downEvent, function() {
		log('@confirmBtn');

	}, false);
	document.querySelector('#retryBtn').addEventListener(gameManager.eventSelector.downEvent, function() {
		log('@retryBtn');

	}, false);

	stopClockTimer();
}

function setContentType(type) {

	var title;

	switch (type) {
	case 'fruitsCountClick':
		title = '그림의 수 읽고 쓰기';
		break;
	case 'fruitsCountClick2':
		title = '색칠하기_10까지의 수';

		break;
	case 'fishing':
		title = '낚시하기';

		break;
	case 'Train3Row':
		title = '기차 연결하기 - 3열';
		break;
	case 'Train4Row':
		title = '기차 연결하기 - 4열';
		break;
	case 'numberCardClick':
		title = '숫자 카드';
		break;
	case 'paintingCountClick':
		title = '색칠하기_개수와순서 스마일';

		break;
	case 'keypadCountClickH':
		title = '가로셈';

		break;
	case 'keypadCountClickV':
		title = '세로셈';
		break;
	case 'xylophone':
		title = '실로폰';
		break;
	case 'numberCutDrag':
		title = '가르기';

		break;
	case 'numberCollectDrag':
		title = '모으기';
		break;
	case 'handCountClick':
		title = '짤짤이';
		break;
	case 'finNum':
		title = '손가락셈';
		break;
	case 'beadCountDrag':
		title = '구슬계산';
		break;
	case 'balance':
		title = '양팔저울';
		break;
	case 'balance2':
		title = '양팔저울';
		break;
	case 'donutDevideDrag':
		title = '나누어 담기';
		break;
	case 'fruitsCountDrag1':
		title = '과일 가르기';
		break;
	case 'fruitsCountDrag2':
		title = '과일 모으기';
		break;
	case 'balloon':
		title = '주머니셈';

		break;
	case 'dessertCountDrag':
		title = '그림보고 문장완성';
		break;
	case 'numberCutDragB':
		title = '가르기';

		break;
	case 'fruitsCountDrag1B':
		title = '과일 가르기';

		break;
	case 'fruitsCountDrag1C':
		title = '과일 가르기';

		break;
	case 'fruitsCountDrag2B':
		title = '과일 모으기';

		break;
	case 'fruitsCountDrag2C':
		title = '과일 모으기';

		break;
	case 'piggyBank':
		title = '돼지 저금통';

		break;
	case 'boxfillDrag':
		title = '상자 채우기';

		break;

	case 'fruitsSumDrag':
		title = '과일 계산';

		break;
	case 'parking':
		title = '주차하기';

		break;

	case 'numberCandleDrag':
		title = '숫자초 - 2개';

		break;

	case 'beadCountClick':
		title = '그림의 수 읽고 쓰기';
		break;
	case 'beadCountClick1':
		title = '그림의 수 읽고 쓰기(2개)';
		break;

	case 'beadCountClick2':
		title = '그림의 수 읽고 쓰기(1개)';
		break;

	case 'skeweredDrag':
		title = '과일꼬치';
		break;
	case 'heightLengthBlock':
		title = '세로셈 블록';
		break;
	case 'heightLengthBlock_multi':
		title = '세로셈 블록';
		break;
	case 'vic_heightLengthBlock_multi':
		title = '세로셈 블록';
		break;
	case 'vic_heightLengthBlock':
		title = '세로셈 블록';
		break;
	case 'campingcar':
		title = '가로셈 캠핑카';
		break;

	case 'scale':
		title = '눈금 저울';
		break;

	case 'lockClick':
		title = '자물쇠';
		break;

	case 'lotto':
		title = '로또';
		break;

	case 'coloredPencilClick':
		title = '색연필 셈';
		break;

	case 'mathToy':
		title = '매스토이';
		break;

	case 'vic_mathToy':
		title = '매스토이';
		break;

	case 'vendingmachine':
		title = '세로셈 음료만들기';
		break;

	case 'frog':
		title = '가로셈 개구리';
		break;

	// case 'train':
	// 	title = '기차2';
	// 	break;

	case 'handCountClick2':
		title = '짤짤이(합)';
		break;

	case 'flyballon':
		title = '풍선 날리기';
		break;

	case 'pair':
		title = '짝찾기';
		break;

	case 'flyballon2':
		title = '풍선 날리기2';
		break;

	case 'Train5Row':
		title = '기차5열';
		break;
	case 'molegame1':
		title = '두더지게임1 ';
		break;

	case 'molegame2':
		title = '두더지게임2';
		break;

	case 'numberCandleDragThree':
		title = '숫자초-3개';
		break;

	case 'numberCandleDragThree':
		title = '그림보고 선택하기';
		break;
	case 'fruitsBasket':
		title = '그림보고 셈하기';
		break;
	case 'Train':
		title = '기차2';
		break;
	case 'completeClick':
		title = '그림보고 문장완성2';
		break;
	case 'frogJump1':
		title = '개구리 점프1';
		break;
	case 'frogJump2':
		title = '개구리 점프2';
		break;
	case 'pictureSelect':
		title = '그림보고 선택하기';
		break;
	case 'comparePencil':
		title = '그림보고 비교하기';
		break;
	case 'archery':
		title = '과녁 맞추기';
		break;
	case 'archery2':
		title = '과녁 맞추기2';
		break;
	case 'busStop':
		title = '버스 정류장';
		break;
	case 'basketball':
		title = '농구';
		break;
	case 'numberCardKeypad':
		title = '숫자카드 문자인식';
		break;
	case 'gameMachine2':
		title = '오락기2';
		break;
	case 'gameMachine':
		title = '오락기';
		break;
	case 'bus':
		title = '버스타기';
		break;
	case 'soccerScore':
		title = '축구';
		break;
	case 'soccerScore2':
		title = '축구-3개';
		break;
	case 'puzzle1':
		title = '퍼즐1';
		break;
	case 'puzzle2':
		title = '퍼즐2';
		break;
	case 'parking2':
		title = '주차하기2';
		break;
	case 'animalfence':
		title = '동물 울타리';
		break;
	case 'hanger':
		title = '옷걸이1';
		break;
	case 'hangerTwo':
		title = '행거2';
		break;
	case 'hangerTwoB':
		title = '행거2';
		break;
	case 'weight':
		title = '분동';
		break;
	case 'digital_balance':
		title = '디지털 저울';
		break;
	case 'spacecraft':
		title = '우주선';
		break;
	case 'catScale':
		title = '체중계';
		break;
	case 'fruitstree':
		title = '과일 나무';
		break;	
	case 'dandelion':
		title = '민들레';
		break;	
	case 'fraction_compare':
		title = '분수 크기비교(짝수)';
		break;
	case 'fraction_compare2':
		title = '분수 크기비교(홀수)';
		break;
	case 'hammergame_drag':
		title = '망치';
		break;
	case 'pierrotbox':
		title = '용수철 장난감';
		break;
	case 'chocoplate':
		title = '초콜릿 담기';
		break;
	case 'fraction':
		title = '그림보고 수쓰기_분수';
		break;
	case 'dogFood':
		title = '분수의 크기비교';
		break;
	case 'fraction_bit':
		title = '분수 조각';
		break;
	case 'chocobox':
		title = '초콜릿 상자';
		break;
	case 'dogFoodTwo':
		title = '분수의 크기비교-3개';
		break;
	case 'cook':
		title = '분수 나타내기';
		break;
	case 'divide_selection':
		title = '똑같이 나누기';
		break;
	case 'chocodivideOne':
		title = '초코렛 쪼개기_묶음';
		break;
	case 'chocodivideTwo':
		title = '초코렛 쪼개기_묶음';
		break;
	case 'dollshooting':
		title = '인형 사격장';
		break;
	case 'chocodivideThree':
		title = '초코렛 쪼개기_묶음';
		break;
	case 'butterfly':
		title = '나비와 꽃';
		break;
	case 'grapetree':
		title = '포도 나무';
		break;
	case 'colorpencilRibbon':
		title = '색연필 묶기';
		break;
	case 'candle':
		title = '초 꽂기';
		break;
	case 'robot1':
		title = '로봇';
		break;
	case 'robot2':
		title = '로봇2';
		break;
	case 'dogCatFoodA':
		title = '먹이주기 - 2개';
		break;
	case 'dogCatFoodB':
		title = '먹이주기 - 2개';
		break;	
	case 'dogCatFoodTwoA':
		title = '먹이주기 - 3개';
		break;	
	case 'dogCatFoodTwoB':
		title = '먹이주기 - 3개';
		break;	
	case 'seeSaw':
		title = '시소';
		break;	
	case 'mart':
		title = '장보기';
		break;
	case 'target':
		title = '과녁판';
		break;	
	case 'vic_digital_balance':
		title = '디지털 저울';
		break;
	case 'vic_dollshooting':
		title = '인형 사격장';
		break;	
	case 'vic_busStop':
		title = '버스 정류장';
		break;		
	case 'vic_Train':
		title = '가로셈 기차';
		break;	
	case 'vic_keypadCountClickH':
		title = '가로셈';
		break;
	case 'vic_keypadCountClickV':
		title = '세로셈';	
		break;
	case 'vic_lockClick':
		title = '자물쇠';
		break;
	case 'vic_lotto':
		title = '로또';
		break;
	case 'vic_lotto':
		title = '로또';
		break;
	case 'vic_balloon':
		title = '주머니셈 3개';
		break;
	case 'vic_numberCollectDrag':
		title = '모으고 모으기';
		break;
	case 'vic_numberCutDrag':
		title = '가르고 가르기';
		break;
	case 'vic_target2':
		title = '과녁판2';
		break;	
	case 'vic_target3':
		title = '과녁판3';
		break;	
	case 'vic_busStop_A':
		title = '버스 정류장A';
		break;
	case 'vic_busStop_B':
		title = '버스 정류장B';
		break;
	case 'vic_busStop_C':
		title = '버스 정류장C';
		break;
	case 'vic_busStop_D':
		title = '버스 정류장D';
		break;
	case 'vic_basketball2':
		title = '농구2';
		break;
	case 'vic_basketball3':
		title = '농구3';
		break;
	case 'vic_donutDevideDragA':
		title = '도넛 나누기A';
		break;
	case 'vic_donutDevideDragB':
		title = '도넛 나누기B';
		break;
	case 'vic_dogCatFoodA':
		title = '먹이먹이기A';
		break;
	case 'vic_dogCatFoodB':
		title = '먹이먹이기B';
		break;
	case 'vic_molegame1':
		title = '두더지 게임1';
		break;
	case 'vic_molegame2':
		title = '두더지 게임2';
		break;
	case 'vic_numstick':
		title = '수막대 연산';
		break;
	case 'vic_selectcard':
		title = '카드 뒤집기';
		break;
	case 'vic_frog':
		title = '가로셈 개구리';
		break;
	case 'vic_rabbit':
		title = '토끼';
		break;
	case 'vic_pizza':
		title = '피자담기';
		break;
	case 'vic_soccerScore':
		title = '축구';
		break;
	case 'vic_carterpillar':
		title = '애벌레';
		break;
	case 'vic_fancylamp':
		title = '장식전구';
		break;
	case 'vic_motorcycle':
		title = '오토바이 타기';
		break;
	case 'vic_monkey':
		title = '원숭이';
		break;
	case 'vic_balloon2':
		title = '열기구';
		break;
	case 'vic_bowling':
		title = '볼링';
		break;
	case 'vic_scale1':
		title = '디지털 저울1';
		break;
	case 'vic_scale2':
		title = '디지털 저울2';
		break;
	case 'vic_submarine':
		title = '잠수함';
		break;
	case 'vic_slide':
		title = '미끄럼틀';
		break;
	case 'vic_rabbitcave':
		title = '토끼굴';
		break;
	case 'vic_tv':
		title = 'TV';
		break;
	case 'vic_pea':
		title = '완두콩';
		break;
	case 'vic_squirrel':
		title = '다람쥐';
		break;
		
		
	}
	contentsContainer.style.backgroundImage = 'url(quiz/' + type + '/images/bgImg.png)';
	document.querySelector('#contentUITitle').innerHTML = title;
}


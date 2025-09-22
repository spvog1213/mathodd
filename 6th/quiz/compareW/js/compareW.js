function initScene() {
	log('initScene...');
	log(gameManager.QUIZ_ANSWER);
	log('excute initClockTimer!');
	// parent.window.initClockTimer();


	var questionBox = createElement('div', bgCanvas, 'questionBox');
     questionBox.innerHTML = gameManager.QUIZ_OPTION[0];

	var currentQuestion = document.getElementById("currentQuestion");
	
	appendChoiceQuestion('click', gameManager.quizObj);
}

function gameOver(currentObj) {

	var clickContainer = document.querySelector('.clickContainer').childNodes,
		boom = document.querySelectorAll('.boom'),
		ballon = document.querySelectorAll('.ballon'),
		floor = currentObj.className.split('_')[1];


	for (var i = 0; i < clickContainer.length; i++) {
		clickContainer[i].style.pointerEvents = "none";
	}

	currentTop = parseInt(currentObj.style.top.replace('px', ''));

	animate({
		delay : 120,
		duration : 250,
		delta : makeEaseOut(elastic),
		step : function(delta) {
	  	if(currentObj.getAttribute('answerValue') == 3) {
	  		console.log('test1')
				currentObj.style.top = (currentTop + (243 * delta)) + 'px';
	  	} else if(currentObj.getAttribute('answerValue') == 1) {
	  		console.log('test2')
				currentObj.style.top = (currentTop + (363 * delta)) + 'px';
			}
		}
	});

	setTimeout(function() {
		streamSound.setSound('media/balloon01.mp3');
		for(var i = 0; i < boom.length; i++) {
			if(currentObj.className.split('_')[1] == boom[i].className.split('_')[1]){
				boom[i].style.display = 'block'
				boom[i].style.zIndex = 3;
				ballon[i].style.background = 'none'
			}
		}
	}, 120);

	setTimeout(function() {
		for(var i = 0; i < boom.length; i++) {
			if(currentObj.className.split('_')[1] == boom[i].className.split('_')[1]){
				ballon[i].style.display = 'none'
			}
		}
	}, 160);

	setTimeout(function() {
		gameOverAnimation();
		logCounter.tryCounter();
		logCounter.endTime();
		streamSound.setSound('../../media/correct.mp3');

	}, 1000);


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

function appendChoiceQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
		bgBar = createElement('div', bgCanvas, 'bgBar'),
		springLeft,
	    clickContainer = createElement('div', bgCanvas, 'clickContainer');

console.log(gameManager.quizObj.length)
	switch (gameManager.quizObj.length) {
	case 2 :
		springLeft = 180;
		choiceLeft = -5;
		bgBar.style.background = "url('images/compareW_bg_bar2.png')";
		break;
	case 3 :
		springLeft = 40;
		choiceLeft = -5;
		bgBar.style.background = "url('images/compareW_bg_bar3.png')";
		break;
	}
 
	var x = Math.floor((Math.random() * 3) + 1),
		y = Math.floor((Math.random() * 5) + 1);

	for (var i = 0; i < choiceQuestionArray.length; i++) {

		springLeft = springLeft + 280;


	  	var spring = createElement('div', clickContainer, 'spring spring_' + i),
	  		imgHeight, weighTop;

	  	if(gameManager.quizObj[i] == 3) {
		  	weighTop = '123';  
		  	imgHeight = '130px';		
	  	} else if(gameManager.quizObj[i] == 2) {
		  	weighTop = '95';  		
		  	imgHeight = '102px';		
	  	} else if(gameManager.quizObj[i] == 1) {
		  	weighTop = '77';  		
		  	imgHeight = '84px';		
	  	}
	  		
	    spring.innerHTML = '<img src="images/compareW_spring_' + gameManager.quizObj[i] + '.png" height = ' + imgHeight + '></img>';
	  	spring.style.left = springLeft + 'px';


	  	var weigh = createElement('div', spring, 'weigh weigh_' + i);
	    weigh.style.background =  'url(images/compareW_weigh_' + gameManager.quizObj[i] + '_' + x + '.png) no-repeat';
	  	weigh.style.left = '-47px';
	  	weigh.style.top = weighTop + 'px'; 

	  	var ballon = createElement('div', clickContainer, 'ballon ballon_' + i);
  		ballon.style.background = 'url(images/compareW_balloon_' + y + '.png) no-repeat';
  		ballon.style.left = springLeft -40 + 'px';

	  	var boom = createElement('div', ballon, 'boom boom_' + i);
	  	boom.style.display = 'none'
  		boom.style.left = '17px'

		var	weigh = document.querySelectorAll('.weigh');
		weigh[i].setAttribute('answerValue', gameManager.quizObj[i]);
		gameManager.quizPosition.push([parseInt(weigh[i].style.top), springLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(spring);
		} else {
			weigh[i].addEventListener('click', function() {
				log('click');
				clickCompareAnswer(this);

			}, false);
		}
	}
}

function incorrectAnimation(dragObj) {
	var dragObjClass = dragObj.className;
	dragObjClass = dragObjClass.split('_');
	var top = gameManager.quizPosition[dragObjClass[1]][0];
	var img = dragObj.previousSibling,
			height = parseInt(img.getAttribute('height'));

	if (gameManager.BOUNDING_TYPE === 'left') {
    	var left = gameManager.quizPosition[dragObjClass[1]][1];
    	currentLeft = 100;
	}

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			if (gameManager.BOUNDING_TYPE === 'left') {
				dragObj.style.left = ((-100 * delta) + (100) + left) + 'px';
				dragObj.style.top = gameManager.quizPosition[dragObjClass[1]][0] + 'px';

			} else {
				dragObj.style.top = ((-100 * delta) + (100) + top)  + 'px';
				img.style.height = ((-100 * delta) + 100 + height) + 'px';
				img.style.width = '32px';
			}

		}
	});
}

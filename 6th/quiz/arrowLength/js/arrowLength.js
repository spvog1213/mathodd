
function initScene() {
	console.log('arrowLengthSceneElement...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();


	var bgCanvas = document.querySelector('#bgCanvas');
	createElement('div',bgCanvas,'question1');
	createElement('div',bgCanvas,'content');
	createElement('div',document.querySelector('.content'),'question2');
	createElement('div',bgCanvas,'dropArea');
	appendQuiz('drag', gameManager.quizText);
}


function initObject() {
	console.log('arrowLengthSceneGetElement...');
	var content = document.querySelector('.content'),
	question1 = document.querySelector('.question1'),
	question2 = document.querySelector('.question2'),
	dropArea =  document.querySelector('.dropArea');
	question1.innerHTML = gameManager.quizConvertNumber[0];
	dropArea.setAttribute('style','left:260px; top:275px;');
}


function appendQuiz(buttonType, quizText) {

	var quizImgContainer = document.createElement('div'),
		choiceLeft = 850,
		choiceTop = (gameManager.quizText.length > 2) ? 180 : 220;

	quizImgContainer.setAttribute('id', 'quizImgContainer');
	bgCanvas.appendChild(quizImgContainer);

	for (var i = 0; i < quizText.length; i++) {

		var id ='arrowImg_'+gameManager.quizText[i],
			className = id;

		createElement('div', quizImgContainer, 'choiceQuizImg_'+i);
		appendImageElement(id, gameManager.quizImgArray[i], document.querySelector('.choiceQuizImg_'+i), className);

		var choiceQuizImg = document.querySelector('.choiceQuizImg_' + i);
			choiceQuizImg.setAttribute('style','top:'+choiceTop+'px; left:' + choiceLeft +'px; transform: rotate(0deg);');
			choiceQuizImg.setAttribute('answervalue', gameManager.quizText[i]);

		gameManager.quizPosition.push([choiceTop, choiceLeft]);
		choiceTop +=120;


		choiceQuizImg.addEventListener(gameManager.eventSelector.upEvent, function() {
			clickCompareAnswer(this);
		}, false);
	}
}



function gameOver(clickObj) {

	var clickObjClassName = clickObj.className,
		clickObjClassName = clickObjClassName.split('_'),
		quizImgContainer = document.querySelector('#quizImgContainer').childNodes,
		index = clickObjClassName[1];

	var clickImg = clickObj.childNodes[0],
		clickImgClassName = clickImg.className,
		clickObjClass = clickImgClassName.split('_');

	setTimeout(function() {
		arrowAnimate(clickObj, index);
	}, 100)

	setTimeout(function() {
		streamSound.setSound("media/arrowLength.mp3");
	}, 600)


	for (var i = 0; i < quizImgContainer.length; i++) {
		quizImgContainer[i].style.pointerEvents = "none";
	}

	logCounter.tryCounter();
	logCounter.endTime();
	clearInterval(countTimer);

	setTimeout(function() {
		streamSound.setSound('../../media/correct.mp3');
		gameOverAnimation();
	}, 800)


	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 1200);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);

}


function animate(opts) {
	var start = new Date,
	    id = setInterval(function() {
		var timePassed = new Date - start,
		    progress = timePassed / opts.duration;
		if (progress > 1)
			progress = 1;

		var delta = opts.delta(progress);
		opts.step(delta);

		if (progress === 1) {
			clearInterval(id)
		}
	}, opts.delay);

	 gameManager.id.push(id);
}




var arrowAnimate = function(clickObj , index){

	var currentTop = parseInt(clickObj.style.top.replace('px', '')),
		currentLeft = parseInt(clickObj.style.left.replace('px', '')),
		dropArea =  document.querySelector('.dropArea');

	animate({
		delay : 40,
		duration :800,
		delta : makeEaseInOut(quint),
		step : function(delta) {
			var left, top, leftDown, topDown, rotate;


			if(index != "2"){
				rotate = (index =="0") ? -5 : 0;
				top = ( gameManager.angle[index] * (currentTop * delta) + (currentTop) );
			}else{
				rotate = 5;
				top = ((currentTop)-(180 * delta));
			}

			left = (-(currentLeft * delta) + (currentLeft));

			clickObj.style.left = left + 'px';
			clickObj.style.top = top + 'px';
			clickObj.style.transform = "rotate("+ rotate +"deg)";


			if ( left < 310){
				var animation = (index != "2") ? function(){ for(var i = 0; i < gameManager.id.length-2; i++ ){clearInterval(gameManager.id[i]);} }
				: function(){clearInterval(gameManager.id[gameManager.id.length-1])};
				animation();

				if(parseInt(index) === 2){
					clickObj.style.left = 305 + 'px';
					clickObj.style.top  = 305 + 'px';
				} else {
					clickObj.style.top =  (parseInt(index) === 0) ? "280px" : "290px";
					clickObj.style.left = 305 + 'px';
				}

				var clickObjImg = clickObj.childNodes[0];
				console.log(gameManager.quizImgArray[parseInt(index)+3]);

				clickObjImg.src = gameManager.quizImgArray[parseInt(index)+3];
				clickObjImg.style.padding ='0px';

				clickObj.style.transform =  (index != "2") ? "rotate("+(rotate-5)+"deg)" : "rotate("+(rotate)+"deg)";

			}
		}
	});

}


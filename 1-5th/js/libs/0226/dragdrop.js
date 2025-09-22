function Dragdrop(element) {
	this.element = element;
	this.parentElement = window;
	this.createDragdrop();
}

Dragdrop.prototype.createDragdrop = function() {

	var dragDrop = this,
	startDrag = function(e) {
		e.preventDefault();
		var eventMaster = eventSelector('downEvent', e);

		dragDrop.offY = eventMaster.clientY - (dragDrop.element.offsetTop * gameManager.zoomRate);
		dragDrop.offX = eventMaster.clientX - (dragDrop.element.offsetLeft * gameManager.zoomRate);

		this.style.zIndex = 20;
		dragDrop.parentElement.addEventListener(gameManager.eventSelector.moveEvent, drag, true);
	},
	drag = function(e) {
		e.preventDefault();
		var eventMaster = eventSelector('moveEvent', e);

		dragDrop.element.style.position = 'absolute';

		dragDrop.newY = eventMaster.clientY - dragDrop.offY;
		dragDrop.newX = eventMaster.clientX - dragDrop.offX;

		dragDrop.element.style.left = (dragDrop.newX / gameManager.zoomRate) + 'px';
		dragDrop.element.style.top = (dragDrop.newY / gameManager.zoomRate) + 'px';
	},
	endDrag = function(e) {
		var eventMaster = eventSelector('upEvent', e);
		dragDrop.parentElement.removeEventListener(gameManager.eventSelector.moveEvent, drag, true);
		if (eventMaster !== undefined)
			boundingCircle(this, eventMaster.clientX, eventMaster.clientY);

		this.style.zIndex = 2;
		switch (gameManager.CURRENT_TYPE) {
			case 'seeSaw':
				this.style.zIndex = 10;
			break;
		}
	}

	dragDrop.element.addEventListener(gameManager.eventSelector.downEvent, startDrag, false);
	dragDrop.element.addEventListener(gameManager.eventSelector.upEvent, endDrag, false);

}
function boundingCircle(dragObj, x, y) {
	var adjustPosition = 100;

	switch (gameManager.CURRENT_TYPE) {
		case 'donut':
		var answerObj1 = document.querySelector('#answerObject1'),
		answerObj2 = document.querySelector('#answerObject2'),
		answerChildNode1 = parseInt(answerObj1.childNodes.length) + 1,
		answerChildNode2 = parseInt(answerObj2.childNodes.length) + 1,
		currentAnswer1 = parseInt(gameManager.CURRENT_ANSWER[0]),
		currentAnswer2 = parseInt(gameManager.CURRENT_ANSWER[1]);

		if (x + adjustPosition > answerObj1.offsetLeft * gameManager.zoomRate && x < ((answerObj1.offsetLeft + adjustPosition) * gameManager.zoomRate) + ((answerObj1.clientWidth + 10) * gameManager.zoomRate) && y + adjustPosition > answerObj1.offsetTop * gameManager.zoomRate && y < ((answerObj1.offsetTop + adjustPosition) * gameManager.zoomRate) + ((answerObj1.clientHeight + 10) * gameManager.zoomRate) && answerChildNode1 <= currentAnswer1) {
			log('bounding!');

			dragObj.style.position = 'static';
			answerObj1.appendChild(dragObj);

			donutCompareAnswer(dragObj);
			boundingCounter = true;

			streamSound.setSound('media/donut.mp3');

		} else if (x + adjustPosition > answerObj2.offsetLeft * gameManager.zoomRate && x < ((answerObj2.offsetLeft + adjustPosition) * gameManager.zoomRate) + ((answerObj2.clientWidth + 10) * gameManager.zoomRate) && y + adjustPosition > answerObj2.offsetTop * gameManager.zoomRate && y < ((answerObj2.offsetTop + adjustPosition) * gameManager.zoomRate) + ((answerObj2.clientHeight + 10) * gameManager.zoomRate) && answerChildNode2 <= currentAnswer2) {
			log('bounding!');

			dragObj.style.position = 'static';
			answerObj2.appendChild(dragObj);
			streamSound.setSound('media/donut.mp3');
			donutCompareAnswer(dragObj);
			boundingCounter = true;

		} else {
			log('not bounding!');
			logCounter.tryCounter();
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;
		case 'cake':

		var dragObjAnser = parseInt(dragObj.getAttribute('answervalue')),
		answerObject1 = document.querySelector('#answerObject1'),
		circleAnswer = parseInt(answerObject1.getAttribute('candleValue')),
		choiceQuestion_0 = document.querySelector('#choiceQuestion_0'),
		question1 = document.querySelector('#question1'),
		question2 = document.querySelector('#question2'),
		answerObject2 = document.querySelector('#answerObject2'),
		triangleAnswer = parseInt(answerObject2.getAttribute('candleValue')),
		choiceQuestion_1 = document.querySelector('#choiceQuestion_1'),
		adjustPositionCake = 40,
		adjustLeft = 0,
		adjustTop = 0,
		imgSrc1,
		imgSrc2,
		answerObj,
		top;

		question1 = question1.childNodes[0];
		imgSrc1 = question1.getAttribute('src');

		question2 = question2.childNodes[0];
		imgSrc2 = question2.getAttribute('src');

		if (x + adjustPositionCake > answerObject1.offsetLeft * gameManager.zoomRate && x < ((answerObject1.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject1.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject1.offsetTop * gameManager.zoomRate && y < ((answerObject1.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject1.clientHeight + 10) * gameManager.zoomRate) && circleAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject1.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject1.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject1.setAttribute('answervalue', dragObjAnser);

			contrastAnswer(dragObj);

			dragObj.style.pointerEvents = 'none';

			question1.setAttribute('src', imgSrc1.replace('.png', '_on.png'));

			streamSound.setSound('./media/candle.mp3');

			// log(question1);

		} else if (x + adjustPositionCake > answerObject2.offsetLeft * gameManager.zoomRate && x < ((answerObject2.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject2.offsetTop * gameManager.zoomRate && y < ((answerObject2.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientHeight + 10) * gameManager.zoomRate) && triangleAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject2.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject2.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject2.setAttribute('answervalue', dragObjAnser);

			contrastAnswer(dragObj);

			dragObj.style.pointerEvents = 'none';

			question2.setAttribute('src', imgSrc2.replace('.png', '_on.png'));

			streamSound.setSound('./media/candle.mp3');

		} else {

			logCounter.tryCounter();
			boundingCounter = true;
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;

		case 'cakeThree':

		var dragObjAnser = parseInt(dragObj.getAttribute('answervalue')),
		answerObject1 = document.querySelector('#answerObject1'),
		answerObject2 = document.querySelector('#answerObject2'),
		answerObject3 = document.querySelector('#answerObject3'),
		circleAnswer = parseInt(answerObject1.getAttribute('candleValue')),
		triangleAnswer = parseInt(answerObject2.getAttribute('candleValue')),
		finalAnswer = parseInt(answerObject3.getAttribute('candleValue')),
		choiceQuestion_0 = document.querySelector('#choiceQuestion_0'),
		choiceQuestion_1 = document.querySelector('#choiceQuestion_1'),
		choiceQuestion_2 = document.querySelector('#choiceQuestion_2'),
		question1 = document.querySelector('#question1'),
		question2 = document.querySelector('#question2'),
		question3 = document.querySelector('#question3'),
		adjustPositionCake = 40,
		adjustLeft = 0,
		adjustTop = 0,
		imgSrc1,
		imgSrc2,
		imgSrc3,
		answerObj,
		top;

		question1 = question1.childNodes[0];
		imgSrc1 = question1.getAttribute('src');

		question2 = question2.childNodes[0];
		imgSrc2 = question2.getAttribute('src');

		question3 = question3.childNodes[0];
		imgSrc3 = question3.getAttribute('src');

		if (x + adjustPositionCake > answerObject1.offsetLeft * gameManager.zoomRate && x < ((answerObject1.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject1.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject1.offsetTop * gameManager.zoomRate && y < ((answerObject1.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject1.clientHeight + 10) * gameManager.zoomRate) && circleAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject1.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject1.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject1.setAttribute('answervalue', dragObjAnser);

			contrastAnswer(dragObj);

			dragObj.style.pointerEvents = 'none';

			question1.setAttribute('src', imgSrc1.replace('.png', '_on.png'));

			streamSound.setSound('./media/candle.mp3');

			// log(question1);

		} else if (x + adjustPositionCake > answerObject2.offsetLeft * gameManager.zoomRate && x < ((answerObject2.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject2.offsetTop * gameManager.zoomRate && y < ((answerObject2.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientHeight + 10) * gameManager.zoomRate) && triangleAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject2.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject2.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject2.setAttribute('answervalue', dragObjAnser);

			contrastAnswer(dragObj);

			dragObj.style.pointerEvents = 'none';

			question2.setAttribute('src', imgSrc2.replace('.png', '_on.png'));

			streamSound.setSound('./media/candle.mp3');

		} else if (x + adjustPositionCake > answerObject3.offsetLeft * gameManager.zoomRate && x < ((answerObject3.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject3.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject3.offsetTop * gameManager.zoomRate && y < ((answerObject3.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject3.clientHeight + 10) * gameManager.zoomRate) && finalAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject3.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject3.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject3.setAttribute('answervalue', dragObjAnser);

			contrastAnswer(dragObj);

			dragObj.style.pointerEvents = 'none';

			question3.setAttribute('src', imgSrc3.replace('.png', '_on.png'));

			streamSound.setSound('./media/candle.mp3');

		} else {

			logCounter.tryCounter();
			boundingCounter = true;
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;

		case 'soccer':

		var spriteArray = ['images/soccer_goalpost_0.png', 'images/soccer_goalpost_1.png', 'images/soccer_goalpost_2.png', 'images/soccer_goalpost_3.png', 'images/soccer_goalpost_2.png', 'images/soccer_goalpost_3.png', 'images/soccer_goalpost_4.png'],
		dragObjPosition =
		dragObj,
		dragObjAnser = parseInt(dragObj.getAttribute('answervalue')),
		question1 = document.querySelector('#question1'),
		question2 = document.querySelector('#question2'),
		answerObject1 = document.querySelector('#answerObject1'),
		answerObject2 = document.querySelector('#answerObject2'),
		triangleAnswer = parseInt(answerObject2.getAttribute('candleValue')),
		circleAnswer = parseInt(answerObject1.getAttribute('candleValue')),
		choiceQuestion_1 = document.querySelector('#choiceQuestion_1'),
		choiceQuestion_0 = document.querySelector('#choiceQuestion_0'),
		dragObjId = dragObj.id,
		adjustPositionCake = 40,
		adjustLeft = 0,
		adjustTop = 0,
		currentLeft = 100,
		imgSrc1,
		imgSrc2,
		answerObj,
		left = 380,
		top;

		question1 = question1.childNodes[0];
		// imgSrc1 = question1.getAttribute('src');

		// question2 = question2.childNodes[0];
		// imgSrc2 = question2.getAttribute('src');

		if (x + adjustPositionCake > answerObject1.offsetLeft * gameManager.zoomRate && x < ((answerObject1.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject1.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject1.offsetTop * gameManager.zoomRate && y < ((answerObject1.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject1.clientHeight + 10) * gameManager.zoomRate) && circleAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject1.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject1.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject1.setAttribute('answervalue', dragObjAnser);
			dragObjPosition.setAttribute('style', 'position:apsolute; top:360px; left:320px;');

			contrastAnswer(dragObj);

			dragObj.style.pointerEvents = 'none';

			animate({

				delay : 20,
				duration : 800,
				delta : makeEaseOut(elastic),
				step : function(delta) {
					dragObj.style.top = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
					// dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[0]][0] + 'px';
				}
			});

			// question1.setAttribute('src', imgSrc1.replace('.png', '_on.png'));

			streamSound.setSound('./media/soccerScore_ball.mp3');

			spriteAnimationCustom(spriteArray, goalpost01);

			// log(question1);

		} else if (x + adjustPositionCake > answerObject2.offsetLeft * gameManager.zoomRate && x < ((answerObject2.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject2.offsetTop * gameManager.zoomRate && y < ((answerObject2.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientHeight + 10) * gameManager.zoomRate) && triangleAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject2.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject2.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject2.setAttribute('answervalue', dragObjAnser);
			dragObjPosition.setAttribute('style', 'position:apsolute; top:360px; left:870px;');

			contrastAnswer(dragObj);

			dragObj.style.pointerEvents = 'none';

			animate({

				delay : 20,
				duration : 800,
				delta : makeEaseOut(elastic),
				step : function(delta) {
					dragObj.style.top = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
					// dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[0]][0] + 'px';
				}
			});

			// question2.setAttribute('src', imgSrc2.replace('.png', '_on.png'));

			streamSound.setSound('./media/soccerScore_ball.mp3');

			spriteAnimationCustom(spriteArray, goalpost02);

		} else {

			logCounter.tryCounter();
			boundingCounter = true;
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;

		case 'soccer2':

		var spriteArray = ['images/soccer_goalpost_0.png', 'images/soccer_goalpost_1.png', 'images/soccer_goalpost_2.png', 'images/soccer_goalpost_3.png', 'images/soccer_goalpost_2.png', 'images/soccer_goalpost_3.png', 'images/soccer_goalpost_4.png'],
		dragObjPosition =
		dragObj,
		dragObjAnser = parseInt(dragObj.getAttribute('answervalue')),
		question1 = document.querySelector('#question1'),
		question2 = document.querySelector('#question2'),
		question3 = document.querySelector('#question3'),
		answerObject1 = document.querySelector('#answerObject1'),
		answerObject2 = document.querySelector('#answerObject2'),
		answerObject3 = document.querySelector('#answerObject3'),
		circleAnswer = parseInt(answerObject1.getAttribute('candleValue')),
		triangleAnswer = parseInt(answerObject2.getAttribute('candleValue')),
		finalAnswer = parseInt(answerObject3.getAttribute('candleValue')),
		choiceQuestion_0 = document.querySelector('#choiceQuestion_0'),
		choiceQuestion_1 = document.querySelector('#choiceQuestion_1'),
		choiceQuestion_2 = document.querySelector('#choiceQuestion_2'),
		dragObjId = dragObj.id,
		adjustPositionCake = 40,
		adjustLeft = 0,
		adjustTop = 0,
		currentLeft = 100,
		imgSrc1,
		imgSrc2,
		answerObj,
		left = 380,
		top;

		question1 = question1.childNodes[0];
		// imgSrc1 = question1.getAttribute('src');

		// question2 = question2.childNodes[0];
		// imgSrc2 = question2.getAttribute('src');

		if (x + adjustPositionCake > answerObject1.offsetLeft * gameManager.zoomRate && x < ((answerObject1.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject1.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject1.offsetTop * gameManager.zoomRate && y < ((answerObject1.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject1.clientHeight + 10) * gameManager.zoomRate) && circleAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject1.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject1.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject1.setAttribute('answervalue', dragObjAnser);
			dragObjPosition.setAttribute('style', 'position:apsolute; top:360px; left:186px;');

			contrastAnswer(dragObj);

			dragObj.style.pointerEvents = 'none';

			animate({
				delay : 20,
				duration : 800,
				delta : makeEaseOut(elastic),
				step : function(delta) {
					dragObj.style.top = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
					// dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[0]][0] + 'px';
				}
			});

			// question1.setAttribute('src', imgSrc1.replace('.png', '_on.png'));

			streamSound.setSound('./media/soccerScore_ball.mp3');

			spriteAnimationCustom(spriteArray, goalpost01);

			// log(question1);

		} else if (x + adjustPositionCake > answerObject2.offsetLeft * gameManager.zoomRate && x < ((answerObject2.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject2.offsetTop * gameManager.zoomRate && y < ((answerObject2.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientHeight + 10) * gameManager.zoomRate) && triangleAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject2.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject2.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject2.setAttribute('answervalue', dragObjAnser);
			dragObjPosition.setAttribute('style', 'position:apsolute; top:360px; left:593px;');

			contrastAnswer(dragObj);

			dragObj.style.pointerEvents = 'none';

			animate({
				delay : 20,
				duration : 800,
				delta : makeEaseOut(elastic),
				step : function(delta) {
					dragObj.style.top = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
					// dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[0]][0] + 'px';
				}
			});

			// question2.setAttribute('src', imgSrc2.replace('.png', '_on.png'));

			streamSound.setSound('./media/soccerScore_ball.mp3');

			spriteAnimationCustom(spriteArray, goalpost02);

		} else if (x + adjustPositionCake > answerObject3.offsetLeft * gameManager.zoomRate && x < ((answerObject3.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject2.offsetTop * gameManager.zoomRate && y < ((answerObject3.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject3.clientHeight + 10) * gameManager.zoomRate) && finalAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject3.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject3.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject3.setAttribute('answervalue', dragObjAnser);
			dragObjPosition.setAttribute('style', 'position:apsolute; top:360px; left:994px;');

			contrastAnswer(dragObj);

			dragObj.style.pointerEvents = 'none';

			animate({
				delay : 20,
				duration : 800,
				delta : makeEaseOut(elastic),
				step : function(delta) {
					dragObj.style.top = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
					// dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[0]][0] + 'px';
				}
			});

			// question2.setAttribute('src', imgSrc2.replace('.png', '_on.png'));

			streamSound.setSound('./media/soccerScore_ball.mp3');

			spriteAnimationCustom(spriteArray, goalpost03);

		} else {

			logCounter.tryCounter();
			boundingCounter = true;
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;

		case 'ballon2':

		var dragObjAnser = parseInt(dragObj.getAttribute('answervalue')),
		answerObject1 = document.querySelector('#answerObject1'),
		circleAnswer = parseInt(answerObject1.getAttribute('candleValue')),
		choiceQuestion_0 = document.querySelector('#choiceQuestion_0'),
		question1 = document.querySelector('#question1'),
		question2 = document.querySelector('#question2'),
		answerObject2 = document.querySelector('#answerObject2'),
		triangleAnswer = parseInt(answerObject2.getAttribute('candleValue')),
		choiceQuestion_1 = document.querySelector('#choiceQuestion_1'),
		adjustPositionCake = 40,
		adjustLeft = 0,
		adjustTop = 0,
		imgSrc1,
		imgSrc2,
		answerObj,
		top;

		question1 = question1.childNodes[0];

		question2 = question2.childNodes[0];

		if (x + adjustPositionCake > answerObject1.offsetLeft * gameManager.zoomRate && x < ((answerObject1.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject1.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject1.offsetTop * gameManager.zoomRate && y < ((answerObject1.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject1.clientHeight + 10) * gameManager.zoomRate) && circleAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject1.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject1.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject1.setAttribute('answervalue', dragObjAnser);

			contrastAnswer(dragObj);

			dragObj.style.pointerEvents = 'none';
			answerObject1.appendChild(dragObj);
			dragObj.style.position = 'static';
			answerObject1.style.background = 'none';

			streamSound.setSound('./media/candle.mp3');

			// log(question1);

		} else if (x + adjustPositionCake > answerObject2.offsetLeft * gameManager.zoomRate && x < ((answerObject2.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject2.offsetTop * gameManager.zoomRate && y < ((answerObject2.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientHeight + 10) * gameManager.zoomRate) && triangleAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject2.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject2.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject2.setAttribute('answervalue', dragObjAnser);

			contrastAnswer(dragObj);

			dragObj.style.pointerEvents = 'none';
			answerObject2.appendChild(dragObj);
			dragObj.style.position = 'static';
			answerObject2.style.background = 'none';

			streamSound.setSound('./media/candle.mp3');

		} else {

			logCounter.tryCounter();
			boundingCounter = true;
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;
		case 'train5Row':

		var dragObjAnser = parseInt(dragObj.getAttribute('answervalue')),
		answerObject1 = document.querySelector('#answerObject1'),
		circleAnswer = parseInt(answerObject1.getAttribute('candleValue')),
		choiceQuestion_0 = document.querySelector('#choiceQuestion_0'),
		question1 = document.querySelector('#question1'),
		question2 = document.querySelector('#question2'),
		answerObject2 = document.querySelector('#answerObject2'),
		triangleAnswer = parseInt(answerObject2.getAttribute('candleValue')),
		choiceQuestion_1 = document.querySelector('#choiceQuestion_1'),
		adjustPositionCake = 40,
		adjustLeft = 0,
		adjustTop = 0,
		imgSrc1,
		imgSrc2,
		answerObj,
		top;

		question1 = question1.childNodes[0];

		question2 = question2.childNodes[0];

		if (x + adjustPositionCake > answerObject1.offsetLeft * gameManager.zoomRate && x < ((answerObject1.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject1.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject1.offsetTop * gameManager.zoomRate && y < ((answerObject1.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject1.clientHeight + 10) * gameManager.zoomRate) && circleAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject1.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject1.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject1.setAttribute('answervalue', dragObjAnser);

			dragObj.style.pointerEvents = 'none';
			answerObject1.appendChild(dragObj);
			dragObj.style.position = 'static';
			answerObject1.style.background = 'none';

			streamSound.setSound('./media/candle.mp3');
			contrastAnswer(dragObj);

			// log(question1);

		} else if (x + adjustPositionCake > answerObject2.offsetLeft * gameManager.zoomRate && x < ((answerObject2.offsetLeft + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientWidth + 10) * gameManager.zoomRate) && y + adjustPositionCake > answerObject2.offsetTop * gameManager.zoomRate && y < ((answerObject2.offsetTop + adjustPositionCake) * gameManager.zoomRate) + ((answerObject2.clientHeight + 10) * gameManager.zoomRate) && triangleAnswer === dragObjAnser) {

			dragObj.style.top = (parseInt(answerObject2.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObject2.style.left.replace('px', '')) + adjustLeft) + 'px';

			boundingCounter = true;
			answerObject2.setAttribute('answervalue', dragObjAnser);

			dragObj.style.pointerEvents = 'none';
			answerObject2.appendChild(dragObj);
			dragObj.style.position = 'static';
			answerObject2.style.background = 'none';

			streamSound.setSound('./media/candle.mp3');
			contrastAnswer(dragObj);

		} else {

			logCounter.tryCounter();
			boundingCounter = true;
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;

		case 'basketball':
		var answerObj = document.querySelector('#answerObject');

		var adjustPosition2 = 200;

		if (x + adjustPosition > answerObj.offsetLeft * gameManager.zoomRate && x < ((answerObj.offsetLeft + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientWidth + 10) * gameManager.zoomRate) && y + adjustPosition > answerObj.offsetTop * gameManager.zoomRate && y < ((answerObj.offsetTop + adjustPosition2) * gameManager.zoomRate) + ((answerObj.clientHeight + 10) * gameManager.zoomRate)) {
			log('bounding!');

			var dragObjTop = answerObj.style.top.replace('px', '');
			dragObjTop = parseInt(dragObjTop) + 110,
			adjustLeft = 0,
			adjustTop = 0;


			dragObj.style.top = (parseInt(answerObj.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObj.style.left.replace('px', '')) + adjustLeft) + 'px';

			ballCompareAnswer(dragObj);
			boundingCounter = true;

		} else {

			log('not bounding!');
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

			

		}

		break;

		case 'puzzle':
		var answerObj = returnCurrentObj(dragObj),
		adjustPosition=50,
		answerObjId =answerObj.id;
		answerObjId= answerObjId.split('_');


		if (x + adjustPosition > answerObj.offsetLeft * gameManager.zoomRate && x < ((answerObj.offsetLeft + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientWidth + 10) * gameManager.zoomRate) && y + adjustPosition > answerObj.offsetTop * gameManager.zoomRate && y < ((answerObj.offsetTop + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientHeight + 10) * gameManager.zoomRate)) {
			log('bounding!');

			var dragObjTop = answerObj.style.top.replace('px', '');
			dragObjTop = parseInt(dragObjTop) + 110,
			adjustLeft = 0,
			adjustTop = 0;
			
			
			dragObj.style.top = (parseInt(answerObj.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObj.style.left.replace('px', '')) + adjustLeft) + 'px';

			puzzleCompareAnswer(dragObj, answerObjId[1]);
			boundingCounter = true;
			streamSound.setSound('media/keyClick.mp3');

		} else {
			logCounter.tryCounter();
			log('not bounding!');
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;

		case 'hanger':
		var answerObj = returnCurrentObj(dragObj),
		adjustPosition = 50,
		answerObjId =answerObj.id;
		answerObjId= answerObjId.split('_');
		// if()

		
		// return;
		if (x + adjustPosition > answerObj.offsetLeft * gameManager.zoomRate && x < ((answerObj.offsetLeft + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientWidth + 10) * gameManager.zoomRate) && y + adjustPosition > answerObj.offsetTop * gameManager.zoomRate && y < ((answerObj.offsetTop + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientHeight + 10) * gameManager.zoomRate) ) {
			log('bounding!');

			var dragObjTop = answerObj.style.top.replace('px', '');
			dragObjTop = parseInt(dragObjTop) + 110,
			adjustLeft = 0,
			adjustTop = 0;
			
			
			dragObj.style.top = (parseInt(answerObj.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObj.style.left.replace('px', '')) + adjustLeft) + 'px';

			dragObj.style.pointerEvents = 'none';

			for(var i = 0; i < gameManager.hangerpoint; i++) {
				
				var hanger = document.querySelector('#hanger_' + i);

				hanger.style.zIndex = '20';
			}

			puzzleCompareAnswer(dragObj, answerObjId[1]);
			boundingCounter = true;
			streamSound.setSound('media/keyClick.mp3');

		} else {
			logCounter.tryCounter();
			log('not bounding!');
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;

		case 'butterfly':
		var answerObj = returnCurrentObj(dragObj),
		adjustPosition = 50;

		if(answerObj != null){
			answerObjId =answerObj.id;
			answerObjId= answerObjId.split('_');
		}

		if (answerObj != null &&x + adjustPosition > answerObj.offsetLeft * gameManager.zoomRate && x < ((answerObj.offsetLeft + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientWidth + 10) * gameManager.zoomRate) && y + adjustPosition > answerObj.offsetTop * gameManager.zoomRate && y < ((answerObj.offsetTop + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientHeight + 10) * gameManager.zoomRate) ) {
			log('bounding!');

			var dragObjTop = answerObj.style.top.replace('px', '');
			dragObjTop = parseInt(dragObjTop) + 110,
			adjustLeft = 0,
			adjustTop = 0;
			
			
			dragObj.style.top = (parseInt(answerObj.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObj.style.left.replace('px', '')) + adjustLeft) + 'px';

			dragObj.style.pointerEvents = 'none';

			puzzleCompareAnswer(dragObj, answerObjId[1]);
			boundingCounter = true;
			streamSound.setSound('media/keyClick.mp3');

		} else {
			logCounter.tryCounter();
			log('not bounding!');
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;

		case 'numberDrag':
		var answerObj = returnCurrentObj(dragObj),
		adjustPosition = 50;

		if(answerObj != null){
			answerObjId =answerObj.id;
			answerObjId= answerObjId.split('_');
		}

		if (answerObj != null &&x + adjustPosition > answerObj.offsetLeft * gameManager.zoomRate && x < ((answerObj.offsetLeft + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientWidth + 10) * gameManager.zoomRate) && y + adjustPosition > answerObj.offsetTop * gameManager.zoomRate && y < ((answerObj.offsetTop + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientHeight + 10) * gameManager.zoomRate) ) {
			log('bounding!');

			var dragObjTop = answerObj.style.top.replace('px', '');
			dragObjTop = parseInt(dragObjTop) + 110,
			adjustLeft = 0,
			adjustTop = 0;
			
			
			dragObj.style.top = (parseInt(answerObj.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObj.style.left.replace('px', '')) + adjustLeft) + 'px';

			dragObj.style.pointerEvents = 'none';

			puzzleCompareAnswer(dragObj, answerObjId[1]);
			boundingCounter = true;
			streamSound.setSound('media/keyClick.mp3');

		} else {
			logCounter.tryCounter();
			log('not bounding!');
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;

		
		case 'mart':
		var answerObj = returnCurrentObj(dragObj),
		adjustPosition = 50;

		if(answerObj != null){
			answerObjId =answerObj.id;
			answerObjId= answerObjId.split('_');
		}

		if (answerObj != null && x + adjustPosition > answerObj.offsetLeft * gameManager.zoomRate && x < ((answerObj.offsetLeft + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientWidth + 70) * gameManager.zoomRate) && y + adjustPosition > answerObj.offsetTop * gameManager.zoomRate && y < ((answerObj.offsetTop + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientHeight + 70) * gameManager.zoomRate)) {
			log('bounding!');
			var dragObjTop = answerObj.style.top.replace('px', '');
			dragObjTop = parseInt(dragObjTop) + 110,
			adjustLeft = 0,
			adjustTop = 0;
			
			
			dragObj.style.top = (parseInt(answerObj.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObj.style.left.replace('px', '')) + adjustLeft) + 'px';

			dragObj.style.pointerEvents = 'none';

			puzzleCompareAnswer(dragObj, answerObjId[1]);
			boundingCounter = true;
			correctMotion();
			streamSound.setSound('media/keyClick.mp3');

		}else{
			incorrectMotion();
			logCounter.tryCounter();
			log('not bounding!');
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');
			

		}

		break;

		case 'seeSaw':
		var answerObj = returnCurrentObj(dragObj),
		adjustPosition = 100;

		if(answerObj != null){
			answerObjId =answerObj.id;
			answerObjId= answerObjId.split('_');
		}

		// answerObj.style.zIndex = '20';

		log(adjustPosition);

		if (answerObj != null && x + adjustPosition > answerObj.offsetLeft * gameManager.zoomRate && x < ((answerObj.offsetLeft + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientWidth + 10) * gameManager.zoomRate) && y + adjustPosition > (answerObj.offsetTop + 450) * gameManager.zoomRate && y < (((answerObj.offsetTop +300) + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientHeight + 10) * gameManager.zoomRate) ) {
			log('bounding!');

			var dragObjTop = answerObj.style.top.replace('px', '');
			dragObjTop = parseInt(dragObjTop) + 180,
			adjustLeft = -15,
			adjustTop = 165;
			
			
			dragObj.style.top = (parseInt(answerObj.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObj.style.left.replace('px', '')) + adjustLeft) + 'px';

			dragObj.style.pointerEvents = 'none';

			puzzleCompareAnswer(dragObj, answerObjId[1]);
			boundingCounter = true;
			streamSound.setSound('media/keyClick.mp3');

		} else {
			logCounter.tryCounter();
			log('not bounding!');
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;

		case 'robot2':
		var answerObj = returnCurrentObj(dragObj),
		adjustPosition = 50;


		if(answerObj != null){
			answerObjId =answerObj.id;
			answerObjId= answerObjId.split('_');
		}

		if (answerObj != null &&x + adjustPosition > answerObj.offsetLeft * gameManager.zoomRate && x < ((answerObj.offsetLeft + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientWidth + 10) * gameManager.zoomRate) && y + adjustPosition > answerObj.offsetTop * gameManager.zoomRate && y < ((answerObj.offsetTop + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientHeight + 10) * gameManager.zoomRate) ) {
			log('bounding!');

			var dragObjTop = answerObj.style.top.replace('px', ''),
			dragObjTop = parseInt(dragObjTop) + 110,
			adjustLeft = 0,
			adjustTop = 0;
			
			
			dragObj.style.top = (parseInt(answerObj.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObj.style.left.replace('px', '')) + adjustLeft) + 'px';

			dragObj.style.pointerEvents = 'none';
			dragObj.style.zIndex = 10;

			puzzleCompareAnswer(dragObj, answerObjId[1]);
			boundingCounter = true;
			streamSound.setSound('media/keyClick.mp3');

		} else {
			logCounter.tryCounter();
			log('not bounding!');
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;


		case 'hanger1':
		var answerObj = returnCurrentObj(dragObj),
		adjustPosition = 50,
		answerObjId =answerObj.id;
		answerObjId= answerObjId.split('_');
		

		if (x + adjustPosition > answerObj.offsetLeft * gameManager.zoomRate && x < ((answerObj.offsetLeft + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientWidth + 10) * gameManager.zoomRate) && y + adjustPosition > answerObj.offsetTop * gameManager.zoomRate && y < ((answerObj.offsetTop + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientHeight + 10) * gameManager.zoomRate)) {
			log('bounding!');

			var dragObjTop = answerObj.style.top.replace('px', '');
			dragObjTop = parseInt(dragObjTop) + 110,
			adjustLeft = 0,
			adjustTop = 0;
			
			dragObj.style.top = (parseInt(answerObj.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObj.style.left.replace('px', '')) + adjustLeft) + 'px';
			dragObj.style.pointerEvents = 'none';

			puzzleCompareAnswer(dragObj, answerObjId[1]);
			boundingCounter = true;
			streamSound.setSound('media/keyClick.mp3');

		} else {
			logCounter.tryCounter();
			log('not bounding!');
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

		}

		break;

		default:
		var answerObj = document.querySelector('#answerObject');

		if (gameManager.CURRENT_TYPE === 'parking')
			adjustPosition = 0;

		if (x + adjustPosition > answerObj.offsetLeft * gameManager.zoomRate && x < ((answerObj.offsetLeft + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientWidth + 10) * gameManager.zoomRate) && y + adjustPosition > answerObj.offsetTop * gameManager.zoomRate && y < ((answerObj.offsetTop + adjustPosition) * gameManager.zoomRate) + ((answerObj.clientHeight + 10) * gameManager.zoomRate)) {
			log('bounding!');

			var dragObjTop = answerObj.style.top.replace('px', '');
			dragObjTop = parseInt(dragObjTop) + 110,
			adjustLeft = 0,
			adjustTop = 0;

			switch (gameManager.CURRENT_TYPE) {
				case 'bead':
				adjustLeft = 4;
				adjustTop = 4;
				break;
			}

			dragObj.style.top = (parseInt(answerObj.style.top.replace('px', '')) + adjustTop) + 'px';
			dragObj.style.left = (parseInt(answerObj.style.left.replace('px', '')) + adjustLeft) + 'px';

			switch (gameManager.CURRENT_TYPE) {
				case 'basketball':
				ballCompareAnswer(dragObj);
				break;
				case 'dogFoodTwo':
				// if(gameManager.dogFlag){
					// gameManager.dogFlag=false;
					dogCompareAnswer(dragObj);
				// }

				break;
				default:
				compareAnswer(dragObj);
				break;
			}
			boundingCounter = true;

		} else {

			log('not bounding!');
			incorrectAnimation(dragObj);
			streamSound.setSound('../../media/incorrect.mp3');

			switch (gameManager.CURRENT_TYPE) {
				case 'archery':
				streamSound.setSound('../../media/incorrect.mp3');
				break;
			}
			switch (gameManager.CURRENT_TYPE) {
				case 'frog':
				streamSound.setSound('../../media/incorrect.mp3');
				break;
			}

		}

		break;
	}

}
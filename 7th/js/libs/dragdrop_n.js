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
		streamSound.setSound('../../media/silent.mp3');
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
	}

	dragDrop.element.addEventListener(gameManager.eventSelector.downEvent, startDrag, false);
	dragDrop.element.addEventListener(gameManager.eventSelector.upEvent, endDrag, false);

}


function boundingCircle(dragObj, x, y) {

	var idx = dragObj.className.split('_')[1];
	var dragObjValue = dragObj.getAttribute('answerValue');
	if (dropCompare(dragObj, x, y)) {

		log('bounding!');
		console.log("/..............");

		streamSound.setSound(gameManager.soundEffct);

		gameManager.dabCount += 1;
		correctPosition(dragObj);

		if (gameManager.dabCount == gameManager.QUIZ_ANSWER.length) {
			log('@ correct!!');
			gameOver(dragObj);
		}


		boundingCounter = true;
	} else {
		log('>>>>> not bounding!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
	}
}


function dropCompare (dragObj, x, y) {
	var dragObjValue = dragObj.getAttribute('answervalue');

	for (var i = 0; i < gameManager.dropArea.length; i++) {

		var dropValue = gameManager.dropArea[i].getAttribute('answervalue');
		dropValue = dropValue.split(',');

		if (x > gameManager.dropArea[i].offsetLeft * gameManager.zoomRate &&
			x < (gameManager.dropArea[i].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[i].clientWidth + 10) * gameManager.zoomRate) &&
			y > gameManager.dropArea[i].offsetTop * gameManager.zoomRate &&
			y < (gameManager.dropArea[i].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[i].clientHeight + 10) * gameManager.zoomRate)) {

			for (var j = 0; j < dropValue.length; j++) {

				if (dragObjValue == dropValue[j]) {
					gameManager.dropIdx = i;
					return true;
				}
			}
			return false;
		}
	}
}

function correctPosition (dragObj) {
// console.log("correctPosition 호출!!!");
	if (gameManager.QUIZ_TYPE == 'connectTrain') {
		dragObj.style.top = (parseInt(gameManager.dropArea[gameManager.dropIdx].style.top.replace('px', ''))) + 'px';
		dragObj.style.left = (parseInt(gameManager.dropArea[0].style.left.replace('px', '')) + (315 * (gameManager.dabCount - 1))) + 'px';

	} else {
		dragObj.style.top = (parseInt(gameManager.dropArea[gameManager.dropIdx].style.top.replace('px', ''))) + 'px';
		dragObj.style.left = (parseInt(gameManager.dropArea[gameManager.dropIdx].style.left.replace('px', ''))) + 'px';
	}

	dragObj.style.pointerEvents = 'none';

}

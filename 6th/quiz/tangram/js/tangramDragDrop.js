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

		var dropObj = QSAll('.dropObj')


		for(var i = 0; i < dropObj.length; i++){
			dropObj[i].style.display = 'none';
			var dropArea = dropObj[i].getAttribute('answerValue').split(',');

			for(var j in dropArea){
				if(dragDrop.element.getAttribute("answerValue") == dropArea[j]){
					dropObj[i].style.display = 'inline';

					var temp = dragDrop.element.className.split(' ');
					if(gameManager.QUIZ_OPTION[0] == 'triangle4'&& temp[1] !== 'dragObj_0'){

						var dropObj_1 = document.querySelector('.dropObj_1'),
							dropObj_2 = document.querySelector('.dropObj_2');

						if( getRealOffsetLeft(dropObj_1) < getRealOffsetLeft(dragDrop.element)&& getRealOffsetLeft(dropObj_2) > getRealOffsetLeft(dragDrop.element)){
								gameManager.dragInt = 1;
						} else if(getRealOffsetLeft(dropObj_2) < getRealOffsetLeft(dragDrop.element)&& getRealOffsetLeft(dropObj_2) + 150 > getRealOffsetLeft(dragDrop.element)){
								gameManager.dragInt = 2;
						}
					}else{
						gameManager.dragInt = i;

					}
				}
			}



		}


	},
	endDrag = function(e) {
		var eventMaster = eventSelector('upEvent', e);
		dragDrop.parentElement.removeEventListener(gameManager.eventSelector.moveEvent, drag, true);
		if (eventMaster !== undefined)
			boundingCircle(this, eventMaster.clientX, eventMaster.clientY, gameManager.dragInt);

		this.style.zIndex = 2;
	}

	dragDrop.element.addEventListener(gameManager.eventSelector.downEvent, startDrag, false);
	dragDrop.element.addEventListener(gameManager.eventSelector.upEvent, endDrag, false);

}


function boundingCircle(dragObj, x, y, dragInt) {

	if (dropCompare(dragObj, x, y, dragInt)) {

		log('bounding!');
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


function dropCompare (dragObj, x, y, dragInt) {

		if(dragInt !== undefined){
			var dragObjValue = dragObj.getAttribute('answervalue'),
				dropValue = gameManager.dropArea[dragInt].getAttribute('answervalue');
			dropValue = dropValue.split(',');


			if (x > gameManager.dropArea[dragInt].offsetLeft * gameManager.zoomRate &&
				x < (gameManager.dropArea[dragInt].offsetLeft * gameManager.zoomRate) + ((gameManager.dropArea[dragInt].clientWidth + 10) * gameManager.zoomRate) &&
				y > gameManager.dropArea[dragInt].offsetTop * gameManager.zoomRate &&
				y < (gameManager.dropArea[dragInt].offsetTop * gameManager.zoomRate) + ((gameManager.dropArea[dragInt].clientHeight + 10) * gameManager.zoomRate)) {

				if(gameManager.dropIdx == dragInt){
					return false;
				}

				for (var j = 0; j < dropValue.length; j++) {

						if (dragObjValue == dropValue[j]) {
							gameManager.dropIdx = dragInt;
							return true;
						}
					}
					return false;
				}
		}

		return false;
}


function correctPosition (dragObj) {
	dragObj.style.top = (parseInt(gameManager.dropArea[gameManager.dropIdx].style.top.replace('px', ''))) + 'px';
	dragObj.style.left = (parseInt(gameManager.dropArea[gameManager.dropIdx].style.left.replace('px', ''))) + 'px';
	dragObj.style.pointerEvents = 'none';
}


function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }
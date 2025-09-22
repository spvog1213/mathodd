
function Dragdrop (element) {
	this.element = element;
	this.parentElement = window;
	this.createDragdrop();
}

Dragdrop.prototype.createDragdrop = function () {

	var dragDrop = this,
		startDrag = function (e) {
			
			var eventMaster = eventSelector('downEvent', e);
		
			dragDrop.offY = eventMaster.clientY - (dragDrop.element.offsetTop * gameManager.zoomRate);
			dragDrop.offX = eventMaster.clientX - (dragDrop.element.offsetLeft * gameManager.zoomRate);
			
			dragDrop.parentElement.addEventListener(gameManager.eventSelector.moveEvent, drag, true);
		},
		drag = function (e) {
			e.preventDefault();
			var eventMaster = eventSelector('moveEvent', e);
		
			dragDrop.element.style.position = 'absolute';

			dragDrop.newY = eventMaster.clientY - dragDrop.offY;
			dragDrop.newX = eventMaster.clientX - dragDrop.offX;

			dragDrop.element.style.left = (dragDrop.newX / gameManager.zoomRate) + 'px';
			dragDrop.element.style.top = (dragDrop.newY / gameManager.zoomRate) + 'px';
		},
		endDrag = function (e) {
			var eventMaster = eventSelector('upEvent', e);
			dragDrop.parentElement.removeEventListener(gameManager.eventSelector.moveEvent, drag, true);
			if (eventMaster !== undefined) boundingCircle(this, eventMaster.clientX, eventMaster.clientY);
		}

	dragDrop.element.addEventListener(gameManager.eventSelector.downEvent, startDrag, false);
	dragDrop.element.addEventListener(gameManager.eventSelector.upEvent, endDrag, false);

}

function boundingCircle (dragObj, x, y) {

	var answerObj = document.querySelector('#answerObject');

	if (x > answerObj.offsetLeft * gameManager.zoomRate && x < (answerObj.offsetLeft * gameManager.zoomRate) + ((answerObj.clientWidth + 10) * gameManager.zoomRate)
		&& y > answerObj.offsetTop * gameManager.zoomRate && y < (answerObj.offsetTop * gameManager.zoomRate) + ((answerObj.clientHeight + 10) * gameManager.zoomRate)) {
		log('bounding!');
		
		var dragObjTop = answerObj.style.top.replace('px', '');
			dragObjTop = parseInt(dragObjTop) + 110;

		setTimeout(function () {
			dragObj.style.top = answerObj.style.top;
			dragObj.style.left = answerObj.style.left;

			compareAnswer(dragObj);
			boundingCounter = true;
		}, 100);

	} else {
		log('not bounding!');
		
		incorrectAnimation(dragObj);

	}

}
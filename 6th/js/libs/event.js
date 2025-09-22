
function log (logdata) {
	var console = window.console || { log : function () {} };
	console.log(logdata);
}

var eventCheck = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;

log(eventCheck);

var gameManager = {
		eventSelector : {
		downEvent : eventCheck ? 'touchstart' : 'mousedown',
		moveEvent : eventCheck ? 'touchmove' : 'mousemove',
		upEvent : eventCheck ? 'touchend' : 'mouseup',
		outEvent : eventCheck ? 'touchleave' : 'mouseout'
	}
}	
/*하트*/
// gameManager.iconName = 'heart';
/*별*/
gameManager.iconName = 'star';

function eventSelector (eventType, e) {
	var eventMaster;
	
	if (eventType === 'downEvent') {
		switch (gameManager.eventSelector.downEvent) {
			case "mousedown":
				eventMaster = e;
				break;
			case "touchstart":
				e.preventDefault();
				eventMaster = e.touches.item(0);
				break;
		}
	} else if (eventType === 'moveEvent') {
		switch (gameManager.eventSelector.moveEvent) {
			case "mousemove":
				eventMaster = e;
				break;
			case "touchmove":
				eventMaster = e.touches.item(0);
				break;
		}
	} else if (eventType === 'upEvent') {
		switch (gameManager.eventSelector.upEvent) {
			case "mouseup":
				eventMaster = e;
				break;
			case "touchend":
				eventMaster = e.changedTouches[0];
				break;
		}
	} else if (eventType === 'outEvent') {
		switch (gameManager.eventSelector.outEvent) {
			case "mouseout":
				eventMaster = e;
				break;
			case "touchleave":
				eventMaster = e.touches.item(0);
				break;
		}
	}

	return eventMaster;
}
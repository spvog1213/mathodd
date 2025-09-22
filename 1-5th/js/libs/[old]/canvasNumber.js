
var isGameOver = false, startDraw = false, checkPoint = [];

function initDrawNumber () {
	var numberPathValue, numberPathX, numberPathY, start, move, end, canvasMove,
		start = function () {
			log('start drag!');
			startDraw = true;

		},
		end = function (e) {
			log('end drag!');
			gameManager.drawPath = [];
			startDraw = false;

		},
		move = function (e) {
			log('canvasMove!');
			if (startDraw) {
				e.preventDefault();
				var eventMaster = eventSelector('moveEvent', e);
				var x = (eventMaster.clientX / gameManager.zoomRate) - 250, 
					y = (eventMaster.clientY / gameManager.zoomRate) - 250;
				gameManager.drawPath.push([x, y]);
				document.querySelector('#circleButton').setAttribute('style', 'left:' + ((eventMaster.clientX / gameManager.zoomRate) - 30) + 'px; top:' + ((eventMaster.clientY / gameManager.zoomRate) - 15) + 'px;');
			
				drawCanvasMove();		
				boundingCheckPoint(checkPoint, x, y);

			}

		},
		initContext = function () {
			gameManager.ctx.lineJoin = 'round';
			gameManager.ctx.lineCap = 'round';
			gameManager.ctx.lineWidth = 45;
			gameManager.ctx.strokeStyle = '#FFFFFF';
			gameManager.ctx.globalAlpha = 1;

		};

	switch (gameManager.CURRENT_ANSWER) {
		case 0 :
			numberPathValue = "C100,100 250,100 250,200 S400,300 400,200";
			numberPathX = 100;
			numberPathY = 200;

			break;
		case 1 :
			numberPathValue = "l0, 200";
			numberPathX = 250;
			numberPathY = 100;

			break;
		case 2 :
			numberPathValue = "C150,100 300,100 300,200 S170,360, 120,380 L350, 380";
			numberPathX = 140;
			numberPathY = 200;
			// checkPoint = [[140, 188, 'notChecked'], [220, 120, 'notChecked'], [296, 177, 'notChecked'], [ 255, 290, 'notChecked'], [140, 370, 'notChecked'], [240, 380,'notChecked'], [335, 380, 'notChecked']];
			checkPoint = [[127, 185, 158, 190, 'notChecked'], [334, 363, 335, 397, 'notChecked']];
			break;
		case 3 :
			numberPathValue = ",200 C100,100 250,100 250,200 S400,300 400,200";
			numberPathX = 100;
			break;
	}

	var canvasElement = document.createElement('canvas');
		canvasElement.setAttribute('id', 'canvas');
		canvasElement.width = 500;
		canvasElement.height = 500;
		document.getElementById('bgCanvas').appendChild(canvasElement);

	var canvas = document.getElementById("canvas");
		gameManager.ctx = canvas.getContext('2d');

		initContext();

	var number = Raphael("number", 500, 500),
		numberPath = number.path("M" + numberPathX + "," + numberPathY + numberPathValue).attr({"stroke":"#CCCCCC","stroke-width": 35, "stroke-opacity": 1});
	
		appendCircleButton(numberPathX + 230, numberPathY + 220);

		numberPath[0].addEventListener(gameManager.eventSelector.downEvent, start, false);		
		numberPath[0].addEventListener(gameManager.eventSelector.moveEvent, move, false);
		numberPath[0].addEventListener(gameManager.eventSelector.upEvent, end, false);
		numberPath[0].addEventListener(gameManager.eventSelector.outEvent, end, false);

}

function drawCanvasMove () {
	gameManager.ctx.beginPath();
	for (var i = 0; i < gameManager.drawPath.length; i++) {
		var p = gameManager.drawPath[i];
		gameManager.ctx.lineTo(p[0], p[1]);	
	}
	gameManager.ctx.stroke();
}

function boundingCheckPoint (checkPointArray, x, y) {
	log('@ boundingCheckPoint!');

	log(checkPointArray[0][0]);
	log(x);
	log('----------------');
	log(checkPointArray[0][1]);
	log(y);

	for (var i = 0; i < checkPointArray.length; i++) {
		if (checkPointArray[i][0] < x && checkPointArray[i][1] > x && checkPointArray[i][2] < y && checkPointArray[i][3] > y)  {
			log("=====boundingCheckPoint========================================================================================");
			checkPointArray[i][4] = 'checked';
		}	
	}
	var isComplete = true;
	for (var j = 0; j < checkPointArray.length; j++) {
		if (checkPointArray[j][4] === 'notChecked') {
			isComplete = false;
		} 
		log(checkPointArray[j][4]);
	}

	log(isComplete);

	if (isComplete && !isGameOver) {
		gameOver();
		isGameOver = true;
	}
}

function appendCircleButton (left, top) {
	var circleButton = document.createElement('div');
		circleButton.setAttribute('id', 'circleButton');
		circleButton.setAttribute('style', 'left:' + left + 'px; top:' + top + 'px;');

	document.getElementById('bgCanvas').appendChild(circleButton);
}


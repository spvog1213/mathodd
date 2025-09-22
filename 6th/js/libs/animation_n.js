// animation functions

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

}

function elastic(progress) {
	return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * 1.5 / 3 * progress);
}

function linear(progress) {
	return progress;
}

function quad(progress) {
	return Math.pow(progress, 2);
}

function quint(progress) {
	return Math.pow(progress, 5);
}

function circ(progress) {
	return 1 - Math.sin(Math.acos(progress));
}

function back(progress) {
	return Math.pow(progress, 2) * ((1.5 + 1) * progress - 1.5);
}

function bounce(progress) {
	for (var a = 0,
	    b = 1; 1; a += b, b /= 2) {
		if (progress >= (7 - 4 * a) / 11) {
			return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
		}
	}
}

function makeEaseInOut(delta) {
	return function(progress) {
		if (progress < .5)
			return delta(2 * progress) / 2;
		else
			return (2 - delta(2 * (1 - progress))) / 2;
	}
}

function makeEaseOut(delta) {
	return function(progress) {
		return 1 - delta(1 - progress);
	}
}

function addIdleAnimation(delay, fps, bounceValue, parentObj, top, childObj) {

	var oriTop = top,
	    idelSeq = 1,
	    bounce = Math.round((Math.random() * bounceValue) + bounceValue),
	    idle = setInterval(function() {

		if (idelSeq === 1 && top < oriTop + bounce) {
			top++;
			if (top === oriTop + bounce)
				idelSeq = 2;
		}

		if (idelSeq === 2 && top > oriTop - bounce) {
			top--;
			if (top === oriTop - bounce)
				idelSeq = 1;
		}

		parentObj.style.top = top + 'px';

		if (childObj)
			if (parentObj.src.indexOf('boom') === -1)
				childObj.style.top = (top + 40) + 'px';

	}, delay / fps);

}

function gameOverAnimation() {
	var bgCanvasElement = document.querySelector('#bgCanvas'),
	    starObj = document.createElement('img');

	switch(gameManager.iconName){
		case "heart":
			starObj.src = "../../images/heartBig.png";
			break;
		case "star":
			starObj.src = "../../images/starBig.png";
			break;
	}

	console.log(gameManager.iconName);

	starObj.setAttribute('id', 'starObj');
	starObj.className = "starObj";
	starObj.style.top = "760px";

	var bgCanvasElementStyle = window.getComputedStyle(bgCanvasElement, ''),
	    bgCanvasElementStyleLeft = parseInt(bgCanvasElementStyle.left.replace('px', ''));

	if (bgCanvasElementStyleLeft !== 285)
		bgCanvasElementStyleLeft = 350;

	starObj.style.left = bgCanvasElementStyleLeft + 'px';

	var currentTop = parseInt(starObj.style.top.replace('px', '')),
	    currentLeft = parseInt(starObj.style.left.replace('px', '')),
	    top = -100,
	    left = 250,
	    angle = 0,
	    scaleVar = 0,
	    objAlpha = 1;

	bgCanvasElement.appendChild(starObj);


	/**
	 *  가로 세로 두가지를 조합하여 사용하면 곡선 이동
	 */
	// 세로 이동
	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(quad),
		step : function(delta) {
			starObj.style.top = ((-currentTop * delta) + ((currentTop + top))) + 'px';

			starObj.style.WebkitTransform = 'scale(' + delta + ',' + delta + ')';
			starObj.style.msTransform = 'scale(' + delta + ',' + delta + ')';
			starObj.style.transform = 'scale(' + delta + ',' + delta + ')';
			starObj.style.WebkitTransformOrigin = '50 50';
			starObj.style.msTransformOrigin = '50 50';
			starObj.style.transformOrigin = '50 50';

			starDust(starObj);
		}
	});


	// 가로 이동
	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseInOut(quad),
		step : function(delta) {
			starObj.style.left = ((currentLeft * delta) + ((currentLeft + left))) + 'px';
		}
	});


	// 도는것
	setTimeout(function() {
		var starSpinInterval = setInterval(function() {
			starObj.style.WebkitTransform = 'rotate(' + (angle) + 'deg)';
			starObj.style.msTransform = 'rotate(' + (angle) + 'deg)';
			starObj.style.transform = 'rotate(' + (angle) + 'deg)';

			angle = angle + 3;
			objAlpha = objAlpha - 0.01;
			starObj.style.opacity = objAlpha;
			if (angle > 360) {
				clearInterval(starSpinInterval);
			}

		}, 1);

	}, 450);
}

function addIdleSprite(delay, spriteObj, spriteArray) {
	var index = 0,
	    idle = setInterval(function() {

		if (index < spriteArray.length - 1)
			index++;
		else
			index = 0;

		spriteObj.src = spriteArray[index];

	}, delay);
}

function starDust(starObj) {
	log('@ starDust');
	var starDustRnd = parseInt(Math.random() * 4),
	    starDustObj = document.createElement('img'),
	    top = parseInt(starObj.style.top.replace('px', '')),
	    left = parseInt(starObj.style.left.replace('px', ''));

    switch(gameManager.iconName){
	case "heart":
		starDustObj.src = '../../images/heartDust_' + starDustRnd + '.png';
		break;
	case "star":
		starDustObj.src = '../../images/starDust_' + starDustRnd + '.png';
		break;
	}


	starDustObj.setAttribute('style', 'position: absolute; z-index: 10; top:' + (top + 100) + 'px; left:' + (left + 100) + 'px;');

	var objAlpha = 1,
	    starDustOblSetInterval = setInterval(function() {

		switch (starDustRnd) {
		case 0:
			starDustObj.style.left = (parseInt(starDustObj.style.left.replace('px', '')) - 1) + 'px';
			break;
		case 1:
			starDustObj.style.top = (parseInt(starDustObj.style.top.replace('px', '')) + 1) + 'px';
			break;
		case 2:
			starDustObj.style.left = (parseInt(starDustObj.style.left.replace('px', '')) - 1) + 'px';
			starDustObj.style.top = (parseInt(starDustObj.style.top.replace('px', '')) + 1) + 'px';
			break;
		case 3:
			starDustObj.style.left = (parseInt(starDustObj.style.left.replace('px', '')) - 2) + 'px';
			starDustObj.style.top = (parseInt(starDustObj.style.top.replace('px', '')) + 1) + 'px';
			break;
		}

		objAlpha = objAlpha - 0.01;
		starDustObj.style.opacity = objAlpha;

		if (objAlpha === 0) {
			clearInterval(starDustOblSetInterval);
			starDustObj.style.display = 'none';
		}

	}, 5);

	if (parseInt(Math.random() * 10) < 1 && top < 400)
		document.querySelector('#bgCanvas').appendChild(starDustObj);

}


function incorrectAnimation(dragObj) {
	var dragObjClass = dragObj.className;
	dragObjClass = dragObjClass.split('_');
	console.log("dragObjClass : " + dragObjClass)
	var top = gameManager.quizPosition[dragObjClass[1]][0];

	if (gameManager.BOUNDING_TYPE === 'left') {
    	var left = gameManager.quizPosition[dragObjClass[1]][1];
    	currentLeft = 100;
	}

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			// console.log(delta)
			if (gameManager.BOUNDING_TYPE === 'left') {
				dragObj.style.left = ((-100 * delta) + (100) + left) + 'px';
				dragObj.style.top = gameManager.quizPosition[dragObjClass[1]][0] + 'px';

			} else {
				dragObj.style.top = ((-100 * delta) + (100) + top)  + 'px';
				dragObj.style.left = gameManager.quizPosition[dragObjClass[1]][1] + 'px';
			}

		}
	});
}

function spriteAnimation(spriteArray, spriteObj) {

	var index = 0;
	animate({
		delay : 100,
		duration : 400,
		delta : makeEaseOut(linear),
		step : function(delta) {
			log('@ sprite!');
			spriteObj.src = spriteArray[index];
			index++;
		}
	});

}
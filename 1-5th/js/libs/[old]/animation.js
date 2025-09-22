
// animation functions 

function animate (opts) {
	var start = new Date,
		id = setInterval(function () {
			var timePassed = new Date- start,
				progress = timePassed / opts.duration;
	
			if (progress > 1) progress = 1;

			var delta = opts.delta(progress);
			opts.step(delta);
			
			if (progress === 1) {
				clearInterval(id)
			}
		}, opts.delay);
}


function elastic (progress) {
	return Math.pow(2,10 * (progress - 1)) * Math.cos(20 * Math.PI * 1.5 / 3 * progress);
}

function linear (progress) {
	return progress;
}

function quad (progress) {
	return Math.pow(progress, 2);
}

function quint (progress) {
	return Math.pow(progress, 5);
}

function circ (progress) {
	return 1- Math.sin(Math.acos(progress));
}

function back (progress) {
	return Math.pow(progress,2)*((1.5+ 1)*progress- 1.5);
}

function bounce (progress) {
	for (var a = 0, b = 1; 1; a += b, b /= 2) {
		if (progress >= (7 - 4 * a) / 11) {
			return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
		}
	}
}

function makeEaseInOut (delta) {
	return function (progress) {
		if(progress < .5)
			return delta( 2 * progress) / 2;
		else
			return(2 - delta(2 * (1 - progress))) / 2;
	}
}

function makeEaseOut (delta) {
	return function (progress) {
		return 1 - delta(1 - progress);
	}
}

function addIdleAnimation (delay, fps, bounceValue, parentObj, top, childObj) {

	var oriTop = top,
		idelSeq = 1,
		bounce = Math.round((Math.random() * bounceValue) + bounceValue),
		idle = setInterval(function () {

		if (idelSeq === 1 && top < oriTop + bounce) {
			top++;
			if (top === oriTop + bounce) idelSeq = 2;
		}

		if (idelSeq === 2 && top > oriTop - bounce) {
			top--;
			if (top === oriTop - bounce) idelSeq = 1;
		}
			
		parentObj.style.top = top + 'px';

		if (childObj) if (parentObj.src.indexOf('boom') === -1) childObj.style.top = (top + 40) + 'px';


	}, delay / fps);
			
}

function gameOverAnimation () {
	var starObj = document.createElement('img');

	starObj.src = "images/star.png";

	starObj.setAttribute('id', 'starObj');
	starObj.className = "starObj";
	
	starObj.style.top = "760px";
	starObj.style.left = "200px";

	var currentTop = parseInt(starObj.style.top.replace('px', '')),
		currentLeft = parseInt(starObj.style.left.replace('px', '')),
		top = -100, left = 250;
	
	document.getElementById('bgCanvas').appendChild(starObj);
	
	animate({
		delay: 20,
		duration: 800,
		delta: makeEaseOut(quad), 
		step: function (delta) {
			// log(delta);
			starObj.style.top = ((-currentTop * delta) + ((currentTop + top)))  + 'px';	
			
			// log(starObj.style.top);
		}
	});

	animate({
		delay: 20,
		duration: 800,
		delta: makeEaseInOut(quad), 
		step: function (delta) {
			// log(delta);
			starObj.style.left = ((currentLeft * delta) + ((currentLeft + left)))  + 'px';	
			
			// log(starObj.style.top);
		}
	});

}

function incorrectAnimation (dragObj) {
	var dragObjId = dragObj.id;
		dragObjId = dragObjId.split('_');

	var top = gameManager.choiceQuestionPosition[dragObjId[1]][0],
		currentTop = parseInt(dragObj.style.top.replace('px', ''));
	
	animate({
		delay: 20,
		duration: 800,
		delta: makeEaseOut(elastic), 
		step: function (delta) {
			dragObj.style.top = ((-currentTop * delta) + (+(currentTop + top)))  + 'px';				
			dragObj.style.left = gameManager.choiceQuestionPosition[dragObjId[1]][1] + 'px';
		}
	});
}
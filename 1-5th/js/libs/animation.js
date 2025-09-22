// animation functions

function animate(opts) {
	var start = new Date,
	    id = setInterval(function() {
		var timePassed = new Date - start,
		    progress = timePassed / opts.duration;
		    console.log("progress : " + progress);
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

	log(gameManager.iconName);
	


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

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseInOut(quad),
		step : function(delta) {
			starObj.style.left = ((currentLeft * delta) + ((currentLeft + left))) + 'px';
		}
	});

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


function incorrectAnimation(dragObj) {
	var dragObjId = dragObj.id;
	dragObjId = dragObjId.split('_');

	var top = gameManager.choiceQuestionPosition[dragObjId[1]][0],
	    currentTop = parseInt(dragObj.style.top.replace('px', ''));

	if (gameManager.CURRENT_TYPE === 'click' || gameManager.CURRENT_TYPE === 'fraction_bti'|| gameManager.CURRENT_TYPE === 'vic_squirrel' || gameManager.CURRENT_TYPE === 'grapetree' || gameManager.CURRENT_TYPE === 'chocobox'|| gameManager.CURRENT_TYPE === 'numStick' || gameManager.CURRENT_TYPE === 'divide_selection' || gameManager.CURRENT_TYPE === 'train' || gameManager.CURRENT_TYPE === 'archery' || gameManager.CURRENT_TYPE === 'train2'|| gameManager.CURRENT_TYPE === 'vic_submarine'|| gameManager.CURRENT_TYPE === 'vic_rabbitcave'|| gameManager.CURRENT_TYPE === 'vic_pea' || gameManager.CURRENT_TYPE === 'train5Row'|| gameManager.CURRENT_TYPE === 'vic_monkey' || gameManager.CURRENT_TYPE === 'bead' || gameManager.CURRENT_TYPE === 'donut' || gameManager.CURRENT_TYPE === 'vic_donutA' || gameManager.CURRENT_TYPE === 'vic_donutB' || gameManager.CURRENT_TYPE === 'chocoplate' || gameManager.CURRENT_TYPE === 'vic_pizza' || gameManager.CURRENT_TYPE === 'candle' || gameManager.CURRENT_TYPE === 'beadRead' || gameManager.CURRENT_TYPE === 'dessert' || gameManager.CURRENT_TYPE === 'camping' || gameManager.CURRENT_TYPE === 'block' || gameManager.CURRENT_TYPE === 'block_mult' || gameManager.CURRENT_TYPE === 'picture' || gameManager.CURRENT_TYPE === 'basketball'|| gameManager.CURRENT_TYPE === 'vic_basketball'|| gameManager.CURRENT_TYPE === 'vic_bowling'|| gameManager.CURRENT_TYPE === 'colorpencilRibbon' ||  gameManager.CURRENT_TYPE === 'dogFoodTwo' ||  gameManager.CURRENT_TYPE === 'vic_dogCatFoodA' ||  gameManager.CURRENT_TYPE === 'vic_rabbit' ||  gameManager.CURRENT_TYPE === 'vic_balloon2' ||  gameManager.CURRENT_TYPE === 'vic_soccer' ||  gameManager.CURRENT_TYPE === 'vic_carterp' ||  gameManager.CURRENT_TYPE === 'vic_fancylamp' ||  gameManager.CURRENT_TYPE ===  'block_multi')
		currentTop = 100;

	if (gameManager.CURRENT_TYPE === 'scale'  || gameManager.CURRENT_TYPE === 'mathToy'  || gameManager.CURRENT_TYPE === 'vic_mathToy' )
		currentTop = 20;

	if (gameManager.CURRENT_TYPE === 'piggyBank' || gameManager.CURRENT_TYPE === 'lotto' || gameManager.CURRENT_TYPE === 'lock' || gameManager.CURRENT_TYPE === 'pencil' || gameManager.CURRENT_TYPE === 'busstop' || gameManager.CURRENT_TYPE === 'busstop_A'|| gameManager.CURRENT_TYPE === 'vic_scale1' || gameManager.CURRENT_TYPE === 'vic_scale2' || gameManager.CURRENT_TYPE === 'puzzle' || gameManager.CURRENT_TYPE === 'ballon2' || gameManager.CURRENT_TYPE === 'fruitsBox' || gameManager.CURRENT_TYPE === 'animalFence'|| gameManager.CURRENT_TYPE === 'bus'|| gameManager.CURRENT_TYPE === 'motorcycle'|| gameManager.CURRENT_TYPE === 'vic_slide' || gameManager.CURRENT_TYPE === 'chocodivide' || gameManager.CURRENT_TYPE === 'seeSaw') {
		var left = gameManager.choiceQuestionPosition[dragObjId[1]][1];
		currentLeft = 100;
	}

	if (gameManager.CURRENT_TYPE === 'twoBead') {
		var left = gameManager.choiceQuestionPosition[dragObjId[1]][1];
		currentLeft = 20;
	}

	if (gameManager.CURRENT_TYPE === 'soccer') {
		currentTop = 100;
		dragObj.style.pointerEvents = 'none';
		setTimeout(function() {
			dragObj.style.pointerEvents = 'auto';
		},1000);
	}

	if (gameManager.CURRENT_TYPE === 'soccer2') {
		currentTop = 100;
		dragObj.style.pointerEvents = 'none';
		setTimeout(function() {
			dragObj.style.pointerEvents = 'auto';
		},1000);
	}

	if (gameManager.CURRENT_TYPE === 'cake' || gameManager.CURRENT_TYPE === 'cakeThree') {
		var top = gameManager.choiceQuestionPosition[dragObjId[1]][0];
		var left = gameManager.choiceQuestionPosition[dragObjId[1]][0];
		currentTop = 80;
		currentLeft = 20;
	}

	if (gameManager.CURRENT_TYPE === 'catScale' || gameManager.CURRENT_TYPE === 'dandelion' ) {
		currentTop = 0;
	}

	if (gameManager.CURRENT_TYPE === 'frog') {
		currentTop = 100;
	}

	if (gameManager.CURRENT_TYPE === 'spacecraft') {
		currentTop = 500;
	}
	if (gameManager.CURRENT_TYPE === 'fraction') {
		currentTop = 100;
	}

	if (gameManager.CURRENT_TYPE === 'hanger1') {
		currentTop = 100;
	}

	if (gameManager.CURRENT_TYPE === 'hanger') {
		currentTop = 100;
	}
	
	if (gameManager.CURRENT_TYPE === 'frog2' ) {
		currentTop = 100;
		frogMotionIncorrect();
	}
	if (gameManager.CURRENT_TYPE === 'vic_frog' ) {
		currentTop = 100;
		frogMotionIncorrect();

	}

	if (gameManager.CURRENT_TYPE === 'compare') {
		var left = gameManager.choiceQuestionPosition[dragObjId[1]][1];
		top = 604;
		currentTop = 100;
	}

	if (gameManager.CURRENT_TYPE === 'ballon') {
		var left = gameManager.choiceQuestionPosition[dragObjId[1]][1];
		currentLeft = 100;
		ballonIncorrect();
	}

	if (gameManager.CURRENT_TYPE === 'digital_balance') {
		var left = gameManager.choiceQuestionPosition[dragObjId[1]][1];
		currentLeft = 100;
	}
	if (gameManager.CURRENT_TYPE === 'pierrotbox' || gameManager.CURRENT_TYPE === 'hammergame_drag') {
		var left = gameManager.choiceQuestionPosition[dragObjId[1]][1];
		currentLeft = 100;
	}

	if (gameManager.CURRENT_TYPE === 'butterfly') {
		var left = gameManager.choiceQuestionPosition[dragObjId[1]][1];
		currentLeft = 50;
	}

	if (gameManager.CURRENT_TYPE === 'numberDrag') {
		var left = gameManager.choiceQuestionPosition[dragObjId[1]][1];
		currentLeft = 50;
	}

	if (gameManager.CURRENT_TYPE === 'mart') {
		var left = gameManager.choiceQuestionPosition[dragObjId[1]][1];
		currentLeft = 50;
	}


	if (gameManager.CURRENT_TYPE === 'robot1' || gameManager.CURRENT_TYPE === 'robot2' || gameManager.CURRENT_TYPE === 'dogFoodTwo' || gameManager.CURRENT_TYPE === 'vic_dogCatFoodA'|| gameManager.CURRENT_TYPE === 'vic_rabbit'|| gameManager.CURRENT_TYPE === 'vic_balloon2') {
		var left = gameManager.choiceQuestionPosition[dragObjId[1]][1];
		currentLeft = 100;
	}

	if (gameManager.CURRENT_TYPE === 'dollshooting' ||gameManager.CURRENT_TYPE === 'vic_submarine'||gameManager.CURRENT_TYPE === 'vic_rabbitcave' || gameManager.CURRENT_TYPE === 'target' || gameManager.CURRENT_TYPE === 'target2' || gameManager.CURRENT_TYPE === 'target3'|| gameManager.CURRENT_TYPE === 'vic_pea') {
		var left = gameManager.choiceQuestionPosition[dragObjId[1]][1];
		currentLeft = 100;
	}

	animate({
		delay : 20,
		duration : 800,
		delta : makeEaseOut(elastic),
		step : function(delta) {
			switch (gameManager.CURRENT_TYPE) {
			case 'piggyBank':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'bus':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'motorcycle':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'vic_slide':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'ballon':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'digital_balance':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'pierrotbox':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'hammergame_drag':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'butterfly':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'numberDrag':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'mart':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'robot1':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'robot2':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'seeSaw':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'dogFoodTwo':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'vic_dogCatFoodA':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'vic_rabbit':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'vic_balloon2':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'dollshooting':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'target':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'target2':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'target3':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'ballon2':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'lotto':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'lock':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'fruitsBox':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'animalFence':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'busstop':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'busstop_A':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'vic_scale1':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'vic_scale2':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'puzzle':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'pencil':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
			case 'chocodivide':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
			case 'twoBead':
				dragObj.style.left = ((-currentLeft * delta) + (+(currentLeft + left))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;
			case 'frog':
				dragObj.style.top = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
				dragObj.style.left = gameManager.choiceQuestionPosition[dragObjId[1]][1] + 'px';
				break;
			case 'spacecraft':
				dragObj.style.top = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
				dragObj.style.left = gameManager.choiceQuestionPosition[dragObjId[1]][1] + 'px';
				break;
			case 'hanger1':
				dragObj.style.top = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
				dragObj.style.left = gameManager.choiceQuestionPosition[dragObjId[1]][1] + 'px';
				break;
			case 'archery':
				dragObj.style.top = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
				dragObj.style.left = gameManager.choiceQuestionPosition[dragObjId[1]][1] + 'px';
				break;
			case 'compare':
				dragObj.style.left = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
				dragObj.style.top = gameManager.choiceQuestionPosition[dragObjId[1]][0] + 'px';
				break;

			default:
				dragObj.style.top = ((-currentTop * delta) + (+(currentTop + top))) + 'px';
				dragObj.style.left = gameManager.choiceQuestionPosition[dragObjId[1]][1] + 'px';
				break;
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

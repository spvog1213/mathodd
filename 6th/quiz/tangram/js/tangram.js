function initScene() {

	log('> initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	var agent = navigator.userAgent.toLowerCase();
	var bgCanvas = document.getElementById('bgCanvas'),
	tangramWrap = createElement('div', bgCanvas, 'tangramWrap'),
	board = createElement('div', bgCanvas, 'board'),
	intX = Math.floor((Math.random() * 5) +1),
	tangram = document.createElement('img'),
	colorNum = [1,2],
	random = [1,2],
	array = new Array();

	tangramWrap.appendChild(tangram);
	tangram.setAttribute('src', 'images/tangram_' + gameManager.QUIZ_OPTION[0] + '.png');
	tangram.setAttribute('class', 'tangram');

	colorNum = colorNum.sort(function() { return 0.5 - Math.random() });
	random = random.sort(function() { return 0.5 - Math.random() });


	switch (gameManager.QUIZ_OPTION[0]) {
		case 'square1':
		case 'square2':
		array = ['big_triangle_'+colorNum[0], 'big_triangle_'+colorNum[1]];
		break;

		case 'square3':
		case 'square4':
		case 'square5':
		case 'square6':
		array = ['big_triangle_'+random[1], 'middle_triangle_'+colorNum[0],'middle_triangle_'+colorNum[1]];
		break;

		case 'square7':
		array = ['small_triangle_'+colorNum[0], 'small_triangle_'+colorNum[1]];
		break;

		case 'square8':
		array = ['small_triangle_'+colorNum[0],'parallelogram_'+random[0],'small_triangle_'+colorNum[1]];
		break;
		case 'triangle1':
		array = ['middle_triangle_'+colorNum[0],'middle_triangle_'+colorNum[1]];
		break;

		case 'triangle2':
		case 'triangle3':
		array = ['middle_triangle_'+colorNum[0],'small_triangle_'+colorNum[1],'small_triangle_'+colorNum[0]];
		break;
		case 'triangle4':
		array = ['square_'+colorNum[0],'small_triangle_'+colorNum[1],'small_triangle_'+colorNum[0]];
		break;
		case 'house' :
		array = ['big_triangle_'+colorNum[0],'big_triangle_'+colorNum[1],'middle_triangle_'+colorNum[0]];
		break;
		case 'candleLight':
		array = ['big_triangle_'+colorNum[0],'middle_triangle_'+colorNum[1],'small_triangle_'+colorNum[0],'small_triangle_'+colorNum[1],'parallelogram_'+colorNum[0]];		break;
		case 'tree' :
		array = ['big_triangle_'+colorNum[0],'big_triangle_'+colorNum[1],'square_'+colorNum[0],'middle_triangle_'+colorNum[0]];
		break;
		case 'bat':
		array = ['big_triangle_'+colorNum[0],'big_triangle_'+colorNum[1],'middle_triangle_'+colorNum[0],'small_triangle_'+colorNum[0],'square_'+colorNum[0]];
		break;
		case 'ship':
		array = ['big_triangle_'+colorNum[0],'big_triangle_'+colorNum[1],'middle_triangle_'+colorNum[0],'parallelogram_'+colorNum[0],'square_'+colorNum[0]];
		break;


	}

	gameManager.QUIZ_ANSWER = array;
	gameManager.quizObj = gameManager.QUIZ_ANSWER;

	for(var i = 0; i < array.length; i++){
		var dropObj = createElement('div', bgCanvas, 'dropObj dropObj_' + i);
		var answerValue = gameManager.QUIZ_ANSWER[i];

		dropObj.setAttribute('answerValue', answerValue);
		switch (gameManager.QUIZ_OPTION[0]) {
			case 'square1' :

			if(i == 0){
				dropObj.style.top = '350px';
				dropObj.style.left = '280px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
				dropObj.style.borderRadius = '276px';
				dropObj.style.webkitTransform  = 'rotate(45deg)';
				dropObj.style.MozTransform  = 'rotate(45deg)';
				dropObj.style.msTransform = 'rotate(45deg)';
				dropObj.style.OTransform  = 'rotate(45deg)';
				dropObj.style.transform = 'rotate(45deg)';
			}else if(i == 1){
				console.log(i)
				dropObj.style.top = '260px';
				dropObj.style.left = '370px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
				dropObj.style.webkitTransform = 'rotate(45deg)';
				dropObj.style.MozTransform  = 'rotate(45deg)';
				dropObj.style.msTransform = 'rotate(45deg)';
				dropObj.style.OTransform  = 'rotate(45deg)';
				dropObj.style.transform = 'rotate(45deg)';
			}
			break;

			case 'square2' :
			if(i == 0){
				dropObj.style.top = '260px';
				dropObj.style.left = '280px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
				dropObj.style.borderRadius = '276px';
				dropObj.style.webkitTransform = 'rotate(-45deg)';
				dropObj.style.MozTransform  = 'rotate(-45deg)';
				dropObj.style.msTransform = 'rotate(-45deg)';
				dropObj.style.OTransform  = 'rotate(-45deg)';
				dropObj.style.transform = 'rotate(-45deg)';
			}else if(i == 1){
				console.log(i)
				dropObj.style.top = '349px';
				dropObj.style.left = '369px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
				dropObj.style.webkitTransform = 'rotate(-45deg)';
				dropObj.style.MozTransform  = 'rotate(-45deg)';
				dropObj.style.msTransform = 'rotate(-45deg)';
				dropObj.style.OTransform  = 'rotate(-45deg)';
				dropObj.style.transform = 'rotate(-45deg)';
			}
			break;

			case 'square3' :
			if(i == 0){
				dropObj.style.top = '350px';
				dropObj.style.left = '277px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px'
				dropObj.style.webkitTransform = 'rotate(45deg)';
				dropObj.style.MozTransform  = 'rotate(45deg)';
				dropObj.style.msTransform = 'rotate(45deg)';
				dropObj.style.OTransform  = 'rotate(45deg)';
				dropObj.style.transform = 'rotate(45deg)';
			}else if(i == 1){
				console.log(i)
				dropObj.style.top = '278px';
				dropObj.style.left = '359px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
			}else if(i == 2){
				console.log(i)
				dropObj.style.top = '323px';
				dropObj.style.left = '404px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
				dropObj.style.webkitTransform = 'rotate(-90deg)';
				dropObj.style.MozTransform  = 'rotate(-90deg)';
				dropObj.style.msTransform = 'rotate(-90deg)';
				dropObj.style.OTransform  = 'rotate(-90deg)';
				dropObj.style.transform = 'rotate(-90deg)';
			}
			break;

			case 'square4' :
			if(i == 0){
				dropObj.style.top = '350px';
				dropObj.style.left = '367px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px'
				dropObj.style.webkitTransform = 'rotate(135deg)';
				dropObj.style.MozTransform  = 'rotate(135deg)';
				dropObj.style.msTransform = 'rotate(135deg)';
				dropObj.style.OTransform  = 'rotate(135deg)';
				dropObj.style.transform = 'rotate(135deg)';
			}else if(i == 1){
				dropObj.style.top = '322px';
				dropObj.style.left = '315px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
				dropObj.style.webkitTransform = 'rotate(90deg)';
				dropObj.style.MozTransform  = 'rotate(90deg)';
				dropObj.style.msTransform = 'rotate(90deg)';
				dropObj.style.OTransform  = 'rotate(90deg)';
				dropObj.style.transform = 'rotate(90deg)';
			}else if(i == 2){
				dropObj.style.top = '277px';
				dropObj.style.left = '360px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
				dropObj.style.webkitTransform = 'rotate(180deg)';
				dropObj.style.MozTransform  = 'rotate(180deg)';
				dropObj.style.msTransform = 'rotate(180deg)';
				dropObj.style.OTransform  = 'rotate(180deg)';
				dropObj.style.transform = 'rotate(180deg)';
			}
			break;

			case 'square5' :
			if(i == 0){
				dropObj.style.top = '258px';
				dropObj.style.left = '367px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px'
				dropObj.style.webkitTransform = 'rotate(45deg)';
				dropObj.style.MozTransform  = 'rotate(45deg)';
				dropObj.style.msTransform = 'rotate(45deg)';
				dropObj.style.OTransform  = 'rotate(45deg)';
				dropObj.style.transform = 'rotate(45deg)';
			}else if(i == 1){
				dropObj.style.top = '322px';
				dropObj.style.left = '315px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
				dropObj.style.webkitTransform = 'rotate(90deg)';
				dropObj.style.MozTransform  = 'rotate(90deg)';
				dropObj.style.msTransform = 'rotate(90deg)';
				dropObj.style.OTransform  = 'rotate(90deg)';
				dropObj.style.transform = 'rotate(90deg)';
			}else if(i == 2){
				dropObj.style.top = '367px';
				dropObj.style.left = '360px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
				dropObj.style.webkitTransform = 'rotate(0deg)';
				dropObj.style.MozTransform  = 'rotate(0deg)';
				dropObj.style.msTransform = 'rotate(0deg)';
				dropObj.style.OTransform  = 'rotate(0deg)';
				dropObj.style.transform = 'rotate(0deg)';
			}
			break;

			case 'square6' :
			if(i == 0){
				dropObj.style.top = '258px';
				dropObj.style.left = '278px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px'
				dropObj.style.webkitTransform = 'rotate(-45deg)';
				dropObj.style.MozTransform  = 'rotate(-45deg)';
				dropObj.style.msTransform = 'rotate(-45deg)';
				dropObj.style.OTransform  = 'rotate(-45deg)';
				dropObj.style.transform = 'rotate(-45deg)';
			}else if(i == 1){
				dropObj.style.top = '322px';
				dropObj.style.left = '405px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
				dropObj.style.webkitTransform = 'rotate(-90deg)';
				dropObj.style.MozTransform  = 'rotate(-90deg)';
				dropObj.style.msTransform = 'rotate(-90deg)';
				dropObj.style.OTransform  = 'rotate(-90deg)';
				dropObj.style.transform = 'rotate(-90deg)';
			}else if(i == 2){
				dropObj.style.top = '367px';
				dropObj.style.left = '360px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
				dropObj.style.webkitTransform = 'rotate(0deg)';
				dropObj.style.MozTransform  = 'rotate(0deg)';
				dropObj.style.msTransform = 'rotate(0deg)';
				dropObj.style.OTransform  = 'rotate(0deg)';
				dropObj.style.transform = 'rotate(0deg)';
			}
			break;

			case 'square7' :
			if(i == 0){
				dropObj.style.top = '358px';
				dropObj.style.left = '363px';
				dropObj.style.width = '127px';
				dropObj.style.height = '63px'
				dropObj.style.webkitTransform = 'rotate(135deg)';
				dropObj.style.MozTransform  = 'rotate(135deg)';
				dropObj.style.msTransform = 'rotate(135deg)';
				dropObj.style.OTransform  = 'rotate(135deg)';
				dropObj.style.transform = 'rotate(135deg)';
			}else if(i == 1){
				dropObj.style.top = '312px';
				dropObj.style.left = '408px';
				dropObj.style.width = '127px';
				dropObj.style.height = '63px'
				dropObj.style.webkitTransform = 'rotate(-45deg)';
				dropObj.style.MozTransform  = 'rotate(-45deg)';
				dropObj.style.msTransform = 'rotate(-45deg)';
				dropObj.style.OTransform  = 'rotate(-45deg)';
				dropObj.style.transform = 'rotate(-45deg)';
			}
			break;

			case 'square8' :
			if(i == 0){
				dropObj.style.top = '313px';
				dropObj.style.left = '320px';
				dropObj.style.width = '127px';
				dropObj.style.height = '63px'
				dropObj.style.webkitTransform = 'rotate(-45deg)';
				dropObj.style.MozTransform  = 'rotate(-45deg)';
				dropObj.style.msTransform = 'rotate(-45deg)';
				dropObj.style.OTransform  = 'rotate(-45deg)';
				dropObj.style.transform = 'rotate(-45deg)';
			}else if(i == 1){
				dropObj.style.top = '322px';
				dropObj.style.left = '361px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
				dropObj.style.webkitTransform = 'rotate(180deg)';
				dropObj.style.MozTransform  = 'rotate(180deg)';
				dropObj.style.msTransform = 'rotate(180deg)';
				dropObj.style.OTransform  = 'rotate(180deg)';
				dropObj.style.transform = 'rotate(180deg)';
			}
			else if(i == 2){
				dropObj.style.top = '358px';
				dropObj.style.left = '454px';
				dropObj.style.width = '127px';
				dropObj.style.height = '63px'
				dropObj.style.webkitTransform = 'rotate(135deg)';
				dropObj.style.MozTransform  = 'rotate(135deg)';
				dropObj.style.msTransform = 'rotate(135deg)';
				dropObj.style.OTransform  = 'rotate1355deg)';
				dropObj.style.transform = 'rotate(135deg)';
			}
			break;

			case 'triangle1' :
			if(i == 0){
				dropObj.style.webkitTransform = 'rotate(135deg)'
				dropObj.style.MozTransform  = 'rotate(135deg)'
				dropObj.style.msTransform = 'rotate(135deg)'
				dropObj.style.OTransform  = 'rotate(135deg)'
				dropObj.style.transform = 'rotate(135deg)'
				dropObj.style.top = '355px';
				dropObj.style.left = '328px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
			}else if(i == 1){
				dropObj.style.webkitTransform = 'rotate(225deg)'
				dropObj.style.MozTransform  = 'rotate(225deg)'
				dropObj.style.msTransform = 'rotate(225deg)'
				dropObj.style.OTransform  = 'rotate(225deg)'
				dropObj.style.transform = 'rotate(225deg)'
				dropObj.style.top = '355px';
				dropObj.style.left = '392px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
			}
			break;

			case 'triangle2' :
			if(i == 0){
				dropObj.style.webkitTransform = 'rotate(135deg)'
				dropObj.style.MozTransform  = 'rotate(135deg)'
				dropObj.style.msTransform = 'rotate(135deg)'
				dropObj.style.OTransform  = 'rotate(135deg)'
				dropObj.style.transform = 'rotate(135deg)'
				dropObj.style.top = '355px';
				dropObj.style.left = '328px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
			}else if(i == 1){
				dropObj.style.webkitTransform = 'rotate(90deg)'
				dropObj.style.MozTransform  = 'rotate(90deg)'
				dropObj.style.msTransform = 'rotate(90deg)'
				dropObj.style.OTransform  = 'rotate(90deg)'
				dropObj.style.transform = 'rotate(90deg)'
				dropObj.style.top = '336px';
				dropObj.style.left = '418px';
				dropObj.style.width = '122px';
				dropObj.style.height = '58px';
			}else if(i == 2){
				dropObj.style.top = '368px';
				dropObj.style.left = '450px';
				dropObj.style.width = '122px';
				dropObj.style.height = '58px';
			}
			break;

			case 'triangle3' :
			if(i == 0){
				dropObj.style.webkitTransform = 'rotate(225deg)'
				dropObj.style.MozTransform  = 'rotate(225deg)'
				dropObj.style.msTransform = 'rotate(225deg)'
				dropObj.style.OTransform  = 'rotate(225deg)'
				dropObj.style.transform = 'rotate(225deg)'
				dropObj.style.top = '355px';
				dropObj.style.left = '392px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
			}else if(i == 1){
				console.log(i)
				dropObj.style.webkitTransform = 'rotate(90deg)'
				dropObj.style.MozTransform  = 'rotate(90deg)'
				dropObj.style.msTransform = 'rotate(90deg)'
				dropObj.style.OTransform  = 'rotate(90deg)'
				dropObj.style.transform = 'rotate(90deg)'
				dropObj.style.top = '336px';
				dropObj.style.left = '354px';
				dropObj.style.width = '122px';
				dropObj.style.height = '58px';
			}else if(i == 2){
				console.log(i)
				dropObj.style.top = '369px';
				dropObj.style.left = '324px';
				dropObj.style.width = '122px';
				dropObj.style.height = '58px';
				// dropObj.style.transform = 'rotate(-45deg)'
			}
			break;

			case 'triangle4' :
			if(i == 0){
				dropObj.style.webkitTransform = 'rotate(45deg)'
				dropObj.style.MozTransform  = 'rotate(45deg)'
				dropObj.style.msTransform = 'rotate(45deg)'
				dropObj.style.OTransform  = 'rotate(45deg)'
				dropObj.style.transform = 'rotate(45deg)'
				dropObj.style.top = '322px';
				dropObj.style.left = '405px';
				dropObj.style.width = '90px';
				dropObj.style.height = '90px';
			}else if(i == 1){
				dropObj.style.top = '367px';
				dropObj.style.left = '324px';
				dropObj.style.width = '122px';
				dropObj.style.height = '58px';
				dropObj.setAttribute('answerValue', 'small_triangle_1,small_triangle_2');
			}else if(i == 2){
				dropObj.style.top = '367px';
				dropObj.style.left = '450px';
				dropObj.style.width = '162px';
				dropObj.style.height = '118px';
				dropObj.setAttribute('answerValue','small_triangle_1,small_triangle_2');
			}
			break;

			case 'house' :
			if(i == 0){
				dropObj.style.webkitTransform = 'rotate(225deg)'
				dropObj.style.MozTransform  = 'rotate(225deg)'
				dropObj.style.msTransform = 'rotate(225deg)'
				dropObj.style.OTransform  = 'rotate(225deg)'
				dropObj.style.transform = 'rotate(225deg)'
				dropObj.style.top = '393px';
				dropObj.style.left = '277px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
			}else if(i == 1){
				dropObj.style.webkitTransform = 'rotate(225deg)'
				dropObj.style.MozTransform  = 'rotate(225deg)'
				dropObj.style.msTransform = 'rotate(225deg)'
				dropObj.style.OTransform  = 'rotate(225deg)'
				dropObj.style.transform = 'rotate(225deg)'
				dropObj.style.top = '302px';
				dropObj.style.left = '369px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
			}else if(i == 2){
				console.log(i)
				dropObj.style.top = '231px';
				dropObj.style.left = '359px';
				dropObj.style.width = '180px';
				dropObj.style.height = '88px';
			}
			break;

			case 'candleLight' :
			tangramWrap.setAttribute('style', 'width:450px; height: 450px; top: 142px; left:225px;');

			if(i == 0){
				dropObj.style.top = '444px';
				dropObj.style.left = '323px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
			}else if(i == 1){
				dropObj.style.top = '355px';
				dropObj.style.left = '360.5px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
			}else if(i == 2){
				dropObj.style.webkitTransform = 'rotate(90deg)'
				dropObj.style.MozTransform  = 'rotate(90deg)'
				dropObj.style.msTransform = 'rotate(90deg)'
				dropObj.style.OTransform  = 'rotate(90deg)'
				dropObj.style.transform = 'rotate(90deg)'
				dropObj.style.top = '413px';
				dropObj.style.left = '354px';
				dropObj.style.width = '122px';
				dropObj.style.height = '58px';
			}else if(i == 3){
				dropObj.style.webkitTransform = 'rotate(90deg)'
				dropObj.style.MozTransform  = 'rotate(90deg)'
				dropObj.style.msTransform = 'rotate(90deg)'
				dropObj.style.OTransform  = 'rotate(90deg)'
				dropObj.style.transform = 'rotate(90deg)'
				dropObj.style.top = '413px';
				dropObj.style.left = '418px';
				dropObj.style.width = '122px';
				dropObj.style.height = '58px';
			}else if(i == 4){
				dropObj.style.webkitTransform = 'rotate(255deg)'
				dropObj.style.MozTransform  = 'rotate(255deg)'
				dropObj.style.msTransform = 'rotate(255deg)'
				dropObj.style.OTransform  = 'rotate(255deg)'
				dropObj.style.transform = 'rotate(255deg)'
				dropObj.style.top = '212px';
				dropObj.style.left = '380px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
			}
			break;

			case 'tree' :
			if(i == 0){
				dropObj.style.webkitTransform = 'rotate(135deg)'
				dropObj.style.MozTransform  = 'rotate(135deg)'
				dropObj.style.msTransform = 'rotate(135deg)'
				dropObj.style.OTransform  = 'rotate(135deg)'
				dropObj.style.transform = 'rotate(135deg)'
				dropObj.style.top = '349px';
				dropObj.style.left = '278px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
			}else if(i == 1){
				dropObj.style.webkitTransform = 'rotate(225deg)'
				dropObj.style.MozTransform  = 'rotate(225deg)'
				dropObj.style.msTransform = 'rotate(225deg)'
				dropObj.style.OTransform  = 'rotate(225deg)'
				dropObj.style.transform = 'rotate(225deg)'
				dropObj.style.top = '351px';
				dropObj.style.left = '370px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
			}else if(i == 2){
				dropObj.style.top = '458px';
				dropObj.style.left = '406px';
				dropObj.style.width = '90px';
				dropObj.style.height = '90px';
			}else if(i == 3){
				dropObj.style.top = '189px';
				dropObj.style.left = '360px';
				dropObj.style.width = '180px';
				dropObj.style.height = '88px';
			}
			break;

			case 'bat' :
			if(i == 0){
				dropObj.style.webkitTransform = 'rotate(270deg)'
				dropObj.style.MozTransform  = 'rotate(270deg)'
				dropObj.style.msTransform = 'rotate(270deg)'
				dropObj.style.OTransform  = 'rotate(270deg)'
				dropObj.style.transform = 'rotate(270deg)'
				dropObj.style.top = '348px';
				dropObj.style.left = '452px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
			}else if(i == 1){
				dropObj.style.webkitTransform = 'rotate(225deg)'
				dropObj.style.MozTransform  = 'rotate(225deg)'
				dropObj.style.msTransform = 'rotate(225deg)'
				dropObj.style.OTransform  = 'rotate(225deg)'
				dropObj.style.transform = 'rotate(90deg)'
				dropObj.style.top = '348px';
				dropObj.style.left = '196px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
			}else if(i == 2){
				dropObj.style.webkitTransform = 'rotate(135deg)'
				dropObj.style.MozTransform  = 'rotate(135deg)'
				dropObj.style.msTransform = 'rotate(135deg)'
				dropObj.style.OTransform  = 'rotate(135deg)'
				dropObj.style.transform = 'rotate(135deg)'
				dropObj.style.top = '272px';
				dropObj.style.left = '329px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
			}else if(i == 3){
				dropObj.style.webkitTransform = 'rotate(90deg)'
				dropObj.style.MozTransform  = 'rotate(90deg)'
				dropObj.style.msTransform = 'rotate(90deg)'
				dropObj.style.OTransform  = 'rotate(90deg)'
				dropObj.style.transform = 'rotate(90deg)'
				dropObj.style.top = '317.5px';
				dropObj.style.left = '420px';
				dropObj.style.width = '122px';
				dropObj.style.height = '58px';
			}else if(i == 4){
				console.log(i)
				dropObj.style.top = '195px';
				dropObj.style.left = '405px';
				dropObj.style.width = '90px';
				dropObj.style.height = '90px';
			}
			break;

			case 'ship' :
			tangramWrap.setAttribute('style', 'width:450px; height: 450px; top: 142px; left:225px;');

			if(i == 0){
				dropObj.style.top = '425px';
				dropObj.style.left = '233px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
			}else if(i == 1){
				dropObj.style.webkitTransform = 'rotate(135deg)';
				dropObj.style.MozTransform  = 'rotate(135deg)';
				dropObj.style.msTransform = 'rotate(135deg)';
				dropObj.style.OTransform  = 'rotate(135deg)';
				dropObj.style.transform = 'rotate(135deg)';
				dropObj.style.top = '445px';
				dropObj.style.left = '367px';
				dropObj.style.width = '254px';
				dropObj.style.height = '127px';
			}else if(i == 2){
				dropObj.style.webkitTransform = 'rotate(135deg)';
				dropObj.style.MozTransform  = 'rotate(135deg)';
				dropObj.style.msTransform = 'rotate(135deg)';
				dropObj.style.OTransform  = 'rotate(135deg)';
				dropObj.style.transform = 'rotate(135deg)';
				dropObj.style.top = '412px';
				dropObj.style.left = '481px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
			}else if(i == 3){
				dropObj.style.webkitTransform = 'rotate(225deg)';
				dropObj.style.MozTransform  = 'rotate(225deg)';
				dropObj.style.msTransform = 'rotate(225deg)';
				dropObj.style.OTransform  = 'rotate(225deg)';
				dropObj.style.transform = 'rotate(225deg)';
				dropObj.style.top = '232px';
				dropObj.style.left = '418px';
				dropObj.style.width = '180px';
				dropObj.style.height = '90px';
			}else if(i == 4){
				console.log(i)
				dropObj.style.top = '334px';
				dropObj.style.left = '289px';
				dropObj.style.width = '90px';
				dropObj.style.height = '90px';
			}
			break;
		}

		gameManager.dropArea.push(dropObj);

	}
	appendSelectQuestion('drag', gameManager.quizObj);

}



function appendSelectQuestion(buttonType, choiceQuestionArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	quizObjContainer = createElement('div', bgCanvas, 'quizObjContainer'),
	line = document.createElement('div'),
	choiceTop = 0;

	for (var i = 0; i < gameManager.quizObj.length; i++) {

		var dragObj = document.createElement('img');

		quizObjContainer.appendChild(dragObj)
		dragObj.setAttribute('src', 'images/tangram_' + gameManager.quizObj[i] + '.png');
		dragObj.setAttribute('class', 'dragObj dragObj_' + i);
		dragObj.setAttribute('answerValue', gameManager.quizObj[i]);
		switch (gameManager.QUIZ_OPTION[0]) {
			case 'square1' :
			if(i == 0){
				dragObj.style.webkitTransform = 'rotate(-135deg)';
				dragObj.style.MozTransform  = 'rotate(-135deg)';
				dragObj.style.msTransform = 'rotate(-135deg)';
				dragObj.style.OTransform  = 'rotate(-135deg)';
				dragObj.style.transform = 'rotate(-135deg)';
				dragObj.style.left = '890px';
				dragObj.style.top = '195px'
			}else if(i == 1){
				dragObj.style.webkitTransform = 'rotate(45deg)';
				dragObj.style.MozTransform  = 'rotate(45deg)';
				dragObj.style.msTransform = 'rotate(45deg)';
				dragObj.style.OTransform  = 'rotate(45deg)';
				dragObj.style.transform = 'rotate(45deg)';
				dragObj.style.left = '980px';
				dragObj.style.top = '390px'
			}
			break;

			case 'square2' :
			if(i == 0){
				dragObj.style.webkitTransform = 'rotate(-45deg)'
				dragObj.style.MozTransform  = 'rotate(-45deg)'
				dragObj.style.msTransform = 'rotate(-45deg)'
				dragObj.style.OTransform  = 'rotate(-45deg)'
				dragObj.style.transform = 'rotate(-45deg)'
				dragObj.style.left = '920px'
				dragObj.style.top = '135px'
			}else if(i == 1){
				dragObj.style.webkitTransform = 'rotate(135deg)'
				dragObj.style.MozTransform  = 'rotate(135deg)'
				dragObj.style.msTransform = 'rotate(135deg)'
				dragObj.style.OTransform  = 'rotate(135deg)'
				dragObj.style.transform = 'rotate(135deg)'
				dragObj.style.left = '1000px'
				dragObj.style.top = '370px'
			}
			break;

			case 'square3' :
			if(i == 0){
				dragObj.style.webkitTransform =  'rotate(-135deg)';
				dragObj.style.MozTransform  =  'rotate(-135deg)';
				dragObj.style.msTransform = 'rotate(-135deg)';
				dragObj.style.OTransform  = 'rotate(-135deg)';
				dragObj.style.transform =  'rotate(-135deg)';
				dragObj.style.left = '950px'
				dragObj.style.top = '125px'
			}else if(i == 1){
				dragObj.style.webkitTransform =  'rotate(180deg)';
				dragObj.style.MozTransform  =  'rotate(180deg)';
				dragObj.style.msTransform = 'rotate(180deg)';
				dragObj.style.OTransform  = 'rotate(180deg)';
				dragObj.style.transform =  'rotate(180deg)';
				dragObj.style.left = '1000px'
				dragObj.style.top = '340px'
			}else if(i == 2){
				dragObj.style.webkitTransform =  'rotate(-90deg)';
				dragObj.style.MozTransform  =  'rotate(-90deg)';
				dragObj.style.msTransform = 'rotate(-90deg)';
				dragObj.style.OTransform  = 'rotate(-90deg)';
				dragObj.style.transform =  'rotate(-90deg)';
				dragObj.style.left = '1000px'
				dragObj.style.top = '530px'
			}
			break;

			case 'square4' :
			if(i == 0){
				dragObj.style.webkitTransform =  'rotate(135deg)';
				dragObj.style.MozTransform  =  'rotate(135deg)';
				dragObj.style.msTransform = 'rotate(135deg)';
				dragObj.style.OTransform  = 'rotate(135deg)';
				dragObj.style.transform =  'rotate(135deg)';
				dragObj.style.left = '1000px'
				dragObj.style.top = '120px'
			}else if(i == 1){
				dragObj.style.webkitTransform =  'rotate(90deg)';
				dragObj.style.MozTransform  =  'rotate(90deg)';
				dragObj.style.msTransform = 'rotate(90deg)';
				dragObj.style.OTransform  = 'rotate(90deg)';
				dragObj.style.transform =  'rotate(90deg)';
				dragObj.style.left = '1000px'
				dragObj.style.top = '350px'
			}else if(i == 2){
				dragObj.style.webkitTransform =  'rotate(180deg)';
				dragObj.style.MozTransform  =  'rotate(180deg)';
				dragObj.style.msTransform = 'rotate(180deg)';
				dragObj.style.OTransform  = 'rotate(180deg)';
				dragObj.style.transform =  'rotate(180deg)';
				dragObj.style.left = '1000px'
				dragObj.style.top = '530px'
			}
			break;

			case 'square5' :
			if(i == 0){
				dragObj.style.webkitTransform =  'rotate(45deg)';
				dragObj.style.MozTransform  =  'rotate(45deg)';
				dragObj.style.msTransform = 'rotate(45deg)';
				dragObj.style.OTransform  = 'rotate(45deg)';
				dragObj.style.transform =  'rotate(45deg)';
				dragObj.style.left = '980px'
				dragObj.style.top = '50px'
			}else if(i == 1){
				dragObj.style.webkitTransform =  'rotate(90deg)';
				dragObj.style.MozTransform  =  'rotate(90deg)';
				dragObj.style.msTransform = 'rotate(90deg)';
				dragObj.style.OTransform  = 'rotate(90deg)';
				dragObj.style.transform =  'rotate(90deg)';
				dragObj.style.left = '1000px'
				dragObj.style.top = '300px'
			}else if(i == 2){
				dragObj.style.left = '1000px'
				dragObj.style.top = '500px'
			}
			break;

			case 'square6' :
			if(i == 0){
				dragObj.style.webkitTransform =  'rotate(-45deg)';
				dragObj.style.MozTransform  =  'rotate(-45deg)';
				dragObj.style.msTransform = 'rotate(-45deg)';
				dragObj.style.OTransform  = 'rotate(-45deg)';
				dragObj.style.transform =  'rotate(-45deg)';
				dragObj.style.left = '930px'
				dragObj.style.top = '50px'
			}else if(i == 1){
				dragObj.style.webkitTransform =  'rotate(-90deg)';
				dragObj.style.MozTransform  =  'rotate(-90deg)';
				dragObj.style.msTransform = 'rotate(-90deg)';
				dragObj.style.OTransform  = 'rotate(-90deg)';
				dragObj.style.transform =  'rotate(-90deg)';
				dragObj.style.left = '970px'
				dragObj.style.top = '300px'
			}else if(i == 2){
				dragObj.style.left = '1000px'
				dragObj.style.top = '500px'
			}
			break;

			case 'square7' :
			if(i == 0){
				dragObj.style.webkitTransform = 'rotate( 135deg )';
				dragObj.style.MozTransform  = 'rotate( 135deg )';
				dragObj.style.msTransform = 'rotate( 135deg )';
				dragObj.style.OTransform  = 'rotate( 135deg )';
				dragObj.style.transform =  'rotate( 135deg )';
				dragObj.style.left = '1030px'
				dragObj.style.top = '230px'
			}else if(i == 1){
				dragObj.style.webkitTransform =  'rotate(-45deg)';
				dragObj.style.MozTransform  =  'rotate(-45deg)';
				dragObj.style.msTransform = 'rotate(-45deg)';
				dragObj.style.OTransform  = 'rotate(-45deg)';
				dragObj.style.transform =  'rotate(-45deg)';
				dragObj.style.left = '990px'
				dragObj.style.top = '350px'
			}
			break;

			case 'square8' :
			if(i == 0){
				dragObj.style.webkitTransform =  'rotate(-45deg)';
				dragObj.style.MozTransform  =  'rotate(-45deg)';
				dragObj.style.msTransform = 'rotate(-45deg)';
				dragObj.style.OTransform  = 'rotate(-45deg)';
				dragObj.style.transform =  'rotate(-45deg)';
				dragObj.style.left = '980px'
				dragObj.style.top = '120px'
			}else if(i == 1){
				dragObj.style.webkitTransform = 'rotateX( 180deg )';
				dragObj.style.MozTransform  = 'rotateX( 180deg )';
				dragObj.style.msTransform = 'rotateX( 180deg )';
				dragObj.style.OTransform  = 'rotateX( 180deg )';
				dragObj.style.transform =  'rotateX( 180deg )';
				dragObj.style.left = '980px'
				dragObj.style.top = '280px'
			}else if(i == 2){
				dragObj.style.webkitTransform = 'rotate( 135deg )';
				dragObj.style.MozTransform  = 'rotate( 135deg )';
				dragObj.style.msTransform = 'rotate( 135deg )';
				dragObj.style.OTransform  = 'rotate( 135deg )';
				dragObj.style.transform =  'rotate( 135deg )';
				dragObj.style.left = '1000px'
				dragObj.style.top = '470px'
			}
			break;

			case 'triangle1' :
			if(i == 0){
				dragObj.style.webkitTransform = 'rotate(135deg)'
				dragObj.style.MozTransform  = 'rotate(135deg)'
				dragObj.style.msTransform = 'rotate(135deg)'
				dragObj.style.OTransform  = 'rotate(135deg)'
				dragObj.style.transform = 'rotate(135deg)'
				dragObj.style.left = '1010px'
				dragObj.style.top = '195px'
			}else if(i == 1){
				dragObj.style.webkitTransform = 'rotate(-135deg)'
				dragObj.style.MozTransform  = 'rotate(-135deg)'
				dragObj.style.msTransform = 'rotate(-135deg)'
				dragObj.style.OTransform  = 'rotate(-135deg)'
				dragObj.style.transform = 'rotate(-135deg)'
				dragObj.style.left = '950px'
				dragObj.style.top = '470px'
			}
			break;

			case 'triangle2' :
			if(i == 0){
				dragObj.style.webkitTransform = 'rotate(135deg)'
				dragObj.style.MozTransform  = 'rotate(135deg)'
				dragObj.style.msTransform = 'rotate(135deg)'
				dragObj.style.OTransform  = 'rotate(135deg)'
				dragObj.style.transform = 'rotate(135deg)'
				dragObj.style.left = '1010px'
				dragObj.style.top = '185px'
			}else if(i == 1){
				dragObj.style.webkitTransform = 'rotate(90deg)'
				dragObj.style.MozTransform  = 'rotate(90deg)'
				dragObj.style.msTransform = 'rotate(90deg)'
				dragObj.style.OTransform  = 'rotate(90deg)'
				dragObj.style.transform = 'rotate(90deg)'
				dragObj.style.left = '1000px'
				dragObj.style.top = '370px'
			}else if(i == 2){
				dragObj.style.left = '1000px'
				dragObj.style.top = '530px'
			}
			break;

			case 'triangle3' :
			if(i == 0){
				dragObj.style.webkitTransform = 'rotate(225deg)'
				dragObj.style.MozTransform  = 'rotate(225deg)'
				dragObj.style.msTransform = 'rotate(225deg)'
				dragObj.style.OTransform  = 'rotate(225deg)'
				dragObj.style.transform = 'rotate(225deg)'
				dragObj.style.left = '950px'
				dragObj.style.top = '185px'
			}else if(i == 1){
				dragObj.style.webkitTransform = 'rotate(-90deg)'
				dragObj.style.MozTransform  = 'rotate(-90deg)'
				dragObj.style.msTransform = 'rotate(-90deg)'
				dragObj.style.OTransform  = 'rotate(-90deg)'
				dragObj.style.transform = 'rotate(-90deg)'
				dragObj.style.left = '1000px'
				dragObj.style.top = '370px'
			}else if(i == 2){
				dragObj.style.left = '1000px'
				dragObj.style.top = '530px'
			}
			break;

			case 'triangle4' :
			if(i == 0){
				dragObj.style.webkitTransform = 'rotate(225deg)'
				dragObj.style.MozTransform  = 'rotate(225deg)'
				dragObj.style.msTransform = 'rotate(225deg)'
				dragObj.style.OTransform  = 'rotate(225deg)'
				dragObj.style.transform = 'rotate(225deg)'
				dragObj.style.left = '1020px'
				dragObj.style.top = '185px'
			}else if(i == 1){
				dragObj.style.left = '1000px'
				dragObj.style.top = '370px'
			}else if(i == 2){
				dragObj.style.left = '1000px'
				dragObj.style.top = '530px'
			}
			break;

			case 'house' :
			if(i == 0){
				dragObj.style.webkitTransform = 'rotate(225deg)';
				dragObj.style.MozTransform  = 'rotate(225deg)';
				dragObj.style.msTransform = 'rotate(225deg)';
				dragObj.style.OTransform  = 'rotate(225deg)';
				dragObj.style.transform = 'rotate(225deg)';
				dragObj.style.left = '912px';
				dragObj.style.top = '160px';
			}else if(i == 1){
				dragObj.style.webkitTransform = 'rotate(45deg)';
				dragObj.style.MozTransform  = 'rotate(45deg)';
				dragObj.style.msTransform = 'rotate(45deg)';
				dragObj.style.OTransform  = 'rotate(45deg)';
				dragObj.style.transform = 'rotate(45deg)';
				dragObj.style.left = '1000px';
				dragObj.style.top = '335px';
			}else if(i == 2){
				dragObj.style.left = '990px';
				dragObj.style.top = '540px';
			}
			break;

			case 'candleLight' :
			if(i == 0){
				dragObj.style.left = '950px';
				dragObj.style.top = '85px';
			}else if(i == 1){
				dragObj.style.webkitTransform = 'rotate(180deg)';
				dragObj.style.MozTransform  = 'rotate(180deg)';
				dragObj.style.msTransform = 'rotate(180deg)';
				dragObj.style.OTransform  = 'rotate(180deg)';
				dragObj.style.transform = 'rotate(180deg)';
				dragObj.style.left = '990px';
				dragObj.style.top = '240px';
			}else if(i == 2){
				dragObj.style.webkitTransform = 'rotate(-270deg)';
				dragObj.style.MozTransform  = 'rotate(-270deg)';
				dragObj.style.msTransform = 'rotate(-270deg)';
				dragObj.style.OTransform  = 'rotate(-270deg)';
				dragObj.style.transform = 'rotate(-270deg)';
				dragObj.style.left = '945px';
				dragObj.style.top = '380px';
			}else if(i == 3){
				dragObj.style.webkitTransform = 'rotate(270deg)';
				dragObj.style.MozTransform  = 'rotate(270deg)';
				dragObj.style.msTransform = 'rotate(270deg)';
				dragObj.style.OTransform  = 'rotate(270deg)';
				dragObj.style.transform = 'rotate(270deg)';
				dragObj.style.left = '1080px';
				dragObj.style.top = '380px';
			}else if(i == 4){
				dragObj.style.webkitTransform = 'rotate(255deg)';
				dragObj.style.MozTransform  = 'rotate(255deg)';
				dragObj.style.msTransform = 'rotate(255deg)';
				dragObj.style.OTransform  = 'rotate(255deg)';
				dragObj.style.transform = 'rotate(255deg)';
				dragObj.style.left = '970px';
				dragObj.style.top = '530px';
			}
			break;

			case 'tree' :
			if(i == 0){
				dragObj.style.webkitTransform = 'rotate(135deg)';
				dragObj.style.MozTransform  = 'rotate(135deg)';
				dragObj.style.msTransform = 'rotate(135deg)';
				dragObj.style.OTransform  = 'rotate(135deg)';
				dragObj.style.transform = 'rotate(135deg)';
				dragObj.style.left = '980px';
				dragObj.style.top = '100px';
			}else if(i == 1){
				dragObj.style.webkitTransform = 'rotate(225deg)';
				dragObj.style.MozTransform  = 'rotate(225deg)';
				dragObj.style.msTransform = 'rotate(225deg)';
				dragObj.style.OTransform  = 'rotate(225deg)';
				dragObj.style.transform = 'rotate(225deg)';
				dragObj.style.left = '930px';
				dragObj.style.top = '300px';
			}else if(i == 2){
				dragObj.style.left = '1030px';
				dragObj.style.top = '450px';
			}else if(i == 3){
				dragObj.style.left = '990px';
				dragObj.style.top = '580px';
			}
			break;

			case 'bat' :
			if(i == 0){
				dragObj.style.webkitTransform = 'rotate(-270deg)';
				dragObj.style.MozTransform  = 'rotate(-270deg)';
				dragObj.style.msTransform = 'rotate(-270deg)';
				dragObj.style.OTransform  = 'rotate(-270deg)';
				dragObj.style.transform = 'rotate(-270deg)';
				dragObj.style.left = '900px';
				dragObj.style.top = '90px';
			}else if(i == 1){
				dragObj.style.webkitTransform = 'rotate(270deg)';
				dragObj.style.MozTransform  = 'rotate(270deg)';
				dragObj.style.msTransform = 'rotate(270deg)';
				dragObj.style.OTransform  = 'rotate(270deg)';
				dragObj.style.transform = 'rotate(270deg)';
				dragObj.style.left = '1010px';
				dragObj.style.top = '240px';
			}else if(i == 2){
				dragObj.style.webkitTransform = 'rotate(-45deg)';
				dragObj.style.MozTransform  = 'rotate(-45deg)';
				dragObj.style.msTransform = 'rotate(-45deg)';
				dragObj.style.OTransform  = 'rotate(-45deg)';
				dragObj.style.transform = 'rotate(-45deg)';
				dragObj.style.left = '905px';
				dragObj.style.top = '410px';
			}else if(i == 3){
				dragObj.style.webkitTransform = 'rotate(270deg)';
				dragObj.style.MozTransform  = 'rotate(270deg)';
				dragObj.style.msTransform = 'rotate(270deg)';
				dragObj.style.OTransform  = 'rotate(270deg)';
				dragObj.style.transform = 'rotate(270deg)';
				dragObj.style.left = '1070px';
				dragObj.style.top = '480px';
			}else if(i == 4){
				dragObj.style.left = '1030px';
				dragObj.style.top = '590px';
			}
			break;

			case 'ship' :
			if(i == 0){
				dragObj.style.webkitTransform = 'rotate(180deg)';
				dragObj.style.MozTransform  = 'rotate(180deg)';
				dragObj.style.msTransform = 'rotate(180deg)';
				dragObj.style.OTransform  = 'rotate(180deg)';
				dragObj.style.transform = 'rotate(180deg)';
				dragObj.style.left = '950px';
				dragObj.style.top = '35px';
			}else if(i == 1){
				dragObj.style.webkitTransform = 'rotate(135deg)';
				dragObj.style.MozTransform  = 'rotate(135deg)';
				dragObj.style.msTransform = 'rotate(135deg)';
				dragObj.style.OTransform  = 'rotate(135deg)';
				dragObj.style.transform = 'rotate(135deg)';
				dragObj.style.left = '990px';
				dragObj.style.top = '230px';
			}else if(i == 2){
				dragObj.style.webkitTransform = 'rotate(-45deg)';
				dragObj.style.MozTransform  = 'rotate(-45deg)';
				dragObj.style.msTransform = 'rotate(-45deg)';
				dragObj.style.OTransform  = 'rotate(-45deg)';
				dragObj.style.transform = 'rotate(-45deg)';
				dragObj.style.left = '895px';
				dragObj.style.top = '400px';
			}else if(i == 3){
				dragObj.style.webkitTransform = 'rotate(225deg)';
				dragObj.style.MozTransform  = 'rotate(225deg)';
				dragObj.style.msTransform = 'rotate(225deg)';
				dragObj.style.OTransform  = 'rotate(225deg)';
				dragObj.style.transform = 'rotate(225deg)';
				dragObj.style.left = '1070px';
				dragObj.style.top = '430px';
			}else if(i == 4){
				dragObj.style.left = '1030px';
				dragObj.style.top = '590px';
			}
			break;
		}
		var offsetLeft = parseInt(dragObj.style.left),
		offsetTop = parseInt(dragObj.style.top);

		gameManager.quizPosition.push([offsetTop, offsetLeft]);

		if (buttonType === 'drag') {
			new Dragdrop(dragObj);
		}
	}
}


function gameOver(currentObj) {

	setTimeout(function() {
		logCounter.tryCounter();
		logCounter.endTime();
		clearInterval(countTimer);
		streamSound.setSound('../../media/correct.mp3');
		gameOverAnimation();
	},100);

	// save starIcon
	setTimeout(function() {
		log('excute stampStarIcon!');
		// parent.window.stampStarIcon();
	}, 500);

	// save log data
	setTimeout(function() {
		log('excute insDrillHis!');
		// parent.window.insDrillHis(logCounter.submitReport());
	}, 1800);
}

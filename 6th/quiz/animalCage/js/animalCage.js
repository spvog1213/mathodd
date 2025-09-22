
function initScene() {
	log('initScene...');
	log('excute initClockTimer!');
	// parent.window.initClockTimer();

	// log(gameManager.CURRENT_ANSWER[0]);


	var currentAnswerText = document.createElement('div');
		currentAnswerText.innerHTML = "<span class='quizText'>더&nbsp;" + '<span class="colorText">' + gameManager.QUIZ_OPTION[gameManager.QUIZ_OPTION.length - 1] + '</span>' + "&nbsp;쪽으로 넣으세요.</span>";
		document.getElementById('currentAnswer').appendChild(currentAnswerText);


	var cage_big = createElement ('div', document.getElementById('bgCanvas'), 'cage_big'),
		cage_small = createElement ('div', document.getElementById('bgCanvas'), 'cage_small');

		cage_big.setAttribute('style', 'position:absolute; top: 210px; left: 120px; width:500px; height:340px;');
		cage_small.setAttribute('style', 'position:absolute; top:232px; left:812px; width:300px; height:300px;');


	if(gameManager.QUIZ_ANSWER[0] === '넓은'){
		cage_big.classList.add('dropArea');
		cage_small.classList.add('notDropArea');
	}else if(gameManager.QUIZ_ANSWER[0] === '좁은'){
		cage_small.classList.add('dropArea');
		cage_big.classList.add('notDropArea');
	}

	appendQuiz('drag', gameManager.quizConvertNumber, gameManager.quizImgArray);
}

function appendQuiz(buttonType, quizImgArray, imgSrcArray) {
	var bgCanvas = document.getElementById('bgCanvas'),
	    quizContainer = document.createElement('div'),
	    choiceTop;

	    imgIndex = parseInt(Math.random() * 3);

	choiceLeft = 230;

	quizContainer.setAttribute('id', 'quizContainer');
	bgCanvas.appendChild(quizContainer);

	choiceTop = 510;

	for (var i = 0; i < quizImgArray.length; i++) {

		var selectObj;
		if (imgSrcArray) {

			var quizObj = document.createElement('div'),
			    className = imgSrcArray[0].split('/');

			className = className[className.length - 1];
			className = className.split('_');

			quizObj.setAttribute('id', 'quizObj_' + i);
			quizContainer.appendChild(quizObj);

			appendImageElement('quizImg_' + i, imgSrcArray[imgIndex], quizObj);
			selectObj = document.querySelector('#quizObj_' + i);
			selectObj.className = className[0];
			selectObj.classList.add('dragObj_' + i);

		}

		choiceLeft = choiceLeft + 400;
		selectObj.setAttribute('style', 'top: ' + choiceTop + 'px; left:' + choiceLeft + 'px;');

		gameManager.quizPosition.push([choiceTop, choiceLeft]);

		new Dragdrop(selectObj);

	}
}

function gameOver(dragObj) {

	var quizContainer = document.querySelector('#quizContainer').childNodes;

	for (var i = 0; i < quizContainer.length; i++) {
		quizContainer[i].style.pointerEvents = "none";
	}

	setTimeout(function() {
		gameOverAnimation();
		streamSound.setSound('../../media/correct.mp3');
		logCounter.tryCounter();
		logCounter.endTime();

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
	}, 1000);

}

function boundingCircle(dragObj, x, y) {

	var dropArea = document.querySelector('.dropArea'),
		notDropArea = document.querySelector('.notDropArea'),
		quizObj = QS('#quizObj_0');

	if (x > dropArea.offsetLeft * gameManager.zoomRate &&
		x < (dropArea.offsetLeft * gameManager.zoomRate) + ((dropArea.clientWidth + 10) * gameManager.zoomRate) &&
		y > dropArea.offsetTop * gameManager.zoomRate &&
		y < (dropArea.offsetTop * gameManager.zoomRate) + ((dropArea.clientHeight + 10) * gameManager.zoomRate)) {
		log('bounding!');

		dropAreaa(dragObj);
		streamSound.setSound(gameManager.soundEffct);
		gameOver(dragObj);

	}else {
		log('>>>>> not bounding!');
		incorrectAnimation(dragObj);
		streamSound.setSound('../../media/incorrect.mp3');
		logCounter.tryCounter();
		animalDapAnimation(dragObj.childNodes[0], 'incorrect');

	}
}

function dropAreaa(target){
	var dropArea = QS('.dropArea');

	animalDapAnimation(target.childNodes[0], 'correct');

	if(gameManager.QUIZ_ANSWER[0] === '넓은'){
		target.style.top = '340px';
		target.style.left = '300px';
		for(var i = 0; i < 4; i++){
			var addanimal = document.createElement('img');
				addanimal.className = 'aaad_' + i;
				addanimal.src = 'images/animal_'+imgIndex+'_success_1.png'
				addanimal.style.position = 'relative';
			document.querySelector('.dropArea').appendChild(addanimal);
			animalDapAnimation(addanimal, 'correct');
		}
	}else{
		target.style.top = '303px';
		target.style.left = '838px';
		for(var i = 0; i < 2; i++){
			var addanimal = document.createElement('img');
				addanimal.className = 'aaad2_' + i;
				addanimal.src = 'images/animal_'+imgIndex+'_success_1.png'
				addanimal.style.position = 'relative';
			document.querySelector('.dropArea').appendChild(addanimal);
			animalDapAnimation(addanimal, 'correct');
		}
	}
}

function animalDapAnimation(target, corIncor){
	if(corIncor === 'correct'){
		var spriteArray = ['images/animal_'+imgIndex+'_success_1.png', 'images/animal_'+imgIndex+'_success_2.png', 'images/animal_'+imgIndex+'_success_3.png', 'images/animal_'+imgIndex+'_success_4.png'];

		spriteAnimation(spriteArray, target);
	}else if(corIncor === 'incorrect'){
		var spriteArray = ['images/animal_' + imgIndex + '_fail_1.png', 'images/animal_'+imgIndex+'_fail_2.png', 'images/animal_'+imgIndex+'_fail_3.png', 'images/animal_' + imgIndex + '.png'];

		spriteAnimation(spriteArray, target);
	}
}


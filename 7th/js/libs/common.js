
function QS (target) {return document.querySelector(target);}
function QSAll (target) {return document.querySelectorAll(target);}
function CE (target) {return document.createElement(target);}
function CESVG (target) {return document.createElementNS('http://www.w3.org/2000/svg', target);}

function createElement (type, targetElement, className, width, height) {

	// console.log("요소 생성 실행");
	switch (type) {
		case 'div':
			var createDIV = CE('div');
				if (className)
					createDIV.className = className;
				if (width)
					createDIV.style.width = width + 'px';
				if (height)
					createDIV.style.height = height + 'px';
			targetElement.appendChild(createDIV);
			return createDIV;
		break;
		case 'input':
			var createINPUT = CE('input');
				if (className)
					createINPUT.className = className;
				if (width)
					createINPUT.style.width = width + 'px';
				if (height)
					createINPUT.style.height = height + 'px';
			targetElement.appendChild(createINPUT);
			return createINPUT;
		break;
		case 'img':
			var createIMG = CE('img');
				if (className)
					createIMG.className = className;
				if (width)
					createIMG.style.width = width + 'px';
				if (height)
					createIMG.style.height = height + 'px';
			targetElement.appendChild(createIMG);
			return createIMG;
		break;
		case 'span':
			var createSPAN = CE('span');
				if (className)
				createSPAN.className = className;
			targetElement.appendChild(createSPAN);
			return createSPAN;
		break;
	}

}

function replaceSymbol (text, targetElement, width, margin) {

	var symbolBox = CE('img');
		symbolBox.setAttribute('style', 'width: 24px; height: 24px; margin: 0 3px;');
	var divBox = CE('div');
		divBox.setAttribute('style', 'width: 26px; height: 24px; margin: 0px 3px -2px 3px; display: inline-block')

	switch (text) {
		case '+':
			symbolBox.src = './images/plus.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
		case '-':
			symbolBox.src = './images/minus.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
		case '*':
			symbolBox.src = './images/multiplication.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
		case '/':
			symbolBox.src = './images/division.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
		case '=':
			symbolBox.src = './images/equal.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
		case '<':
			symbolBox.src = './images/inequal_right.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
		case '>':
			symbolBox.src = './images/inequal_left.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
		case '...':
			symbolBox.src = './images/remainder.png';
			var replaceText = targetElement.appendChild(symbolBox);
			break;
		case 'divBox': //0705 border Box add p47
			divBox.style.border = '1px solid #222';
			var replaceText = targetElement.appendChild(divBox);
			break;
		case 'invisibleBox': //0712 invisible Box add p99~100
			// divBox.style.border = '1px solid #222';
			var replaceText = targetElement.appendChild(divBox);
			break;
		default:
			var textBox = createElement('span', targetElement)
			textBox.innerText = text;
			break;
	}
}

function appendImageElement(imageId, imageSrc, targetElement, clssName) {

	var imgObj = document.createElement('img');

	imgObj.src = imageSrc;
	imgObj.setAttribute('id', imageId);

	if (clssName)
		imgObj.className = clssName;

	targetElement.appendChild(imgObj);
}

function appendCircleElement(circleId, circleClass, targetElement) {
	var circleObj = document.createElement('div');

	circleObj.setAttribute('id', circleId);
	circleObj.className = circleClass;

	targetElement.appendChild(circleObj);
}


/*
	create date : 2016.09.06
	creator : saltgamer
	license : MIT license
*/

var SALTGAMER = SALTGAMER || {};

var now = 0;

SALTGAMER.SpinPicker = (function (cellHeight) {
	console.log('>> create SpinPicker...');
	var eventCheck = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
		spinPicker = {
			cellHeight: cellHeight,
			friction: 0.003,
			slotData: [],
			eventSelector2 : {
				downEvent2 : eventCheck ? 'touchstart' : 'mousedown',
				moveEvent2 : eventCheck ? 'touchmove' : 'mousemove',
				upEvent2 : eventCheck ? 'touchend' : 'mouseup',
				outEvent2 : eventCheck ? 'touchleave' : 'mouseout'
			},

		// Event handler
	handleEvent: function (e) {
		if (e.type == this.eventSelector2.downEvent2) {
			this.lockScreen(e);
				this.scrollStart(e);
		} else if (e.type == this.eventSelector2.moveEvent2) {
			this.lockScreen(e);

			if (e.currentTarget.className == 'doneBtn') {
				this.tapCancel(e);
			} else if (e.currentTarget.className == 'swBg') {



                    this.scrollMove(e);
         
            }
		} else if (e.type == this.eventSelector2.upEvent2) {

			if (e.currentTarget.className == 'doneBtn') {
				this.tapUp(e);
			} else if (e.currentTarget.className == 'swBg') {
                
				this.scrollEnd(e);
			}


		} else if (e.type == this.eventSelector2.outEvent2) {

			this.scrollEnd(e);

		} else if (e.type == 'webkitTransitionEnd') {
			if (e.target.className == 'swWrapper') {
				this.destroy();
			} else {
				this.backWithinBoundaries(e);
			}
		} else if (e.type == 'orientationchange') {
			this.onOrientationChange(e);
		} else if (e.type == 'scroll') {
			this.onScroll(e);
		}
	},

	// Global events
	onOrientationChange: function (e) {
		window.scrollTo(0, 0);
		this.swWrapper.style.top = window.innerHeight + window.pageYOffset + 'px';
		this.calculateSlotsWidth();
	},

	onScroll: function (e) {
		this.swWrapper.style.top = window.innerHeight + window.pageYOffset + 'px';
	},

	lockScreen: function (e) {
		e.preventDefault();
		e.stopPropagation();
	},


		initSpinPicker: function (config) {
			config.slot.forEach(function (value, idx) {
				SALTGAMER.SpinPicker.addSlot(value.data, value.style, value.default);
			});

			this.setCancelAction(config.cancelCallBack);
			this.setDoneAction(config.doneCallBack);
			this.open();
			this.selectOpacity();
		},

	reset: function () {
		this.slotEl = [];

		this.activeSlot = null;

		this.swWrapper = undefined;
		this.swSlotWrapper = undefined;
		this.swSlots = undefined;
		this.swFrame = undefined;
	},

	calculateSlotsWidth: function () {
		var div = this.swSlots.getElementsByTagName('div');
		for (var i = 0; i < div.length; i += 1) {
			this.slotEl[i].slotWidth = div[i].offsetWidth;
		}
	},

	create: function () {
		var i, l, out, ul, div;

		this.reset();	

		var bgCanvas = document.querySelector('#bgCanvas'),
				swWrapper = createElement('div', bgCanvas, 'swWrapper'),
				swSlotsWrapper = createElement('div', swWrapper, 'swSlotsWrapper'),
				swSlots = createElement('div', swSlotsWrapper, 'swSlots'),
				swBg = createElement('div', swWrapper, 'swBg'),
				doneBtn = createElement('div', bgCanvas, 'doneBtn');

		this.swWrapper = QS('.swWrapper');						
		this.swSlotWrapper = QS('.swSlotsWrapper');				
		this.swSlots = QS('.swSlots');							
		this.swBg = QS('.swBg');
		this.doneBtn = QS('.doneBtn');


		// Create HTML slot elements
		for (l = 0; l < this.slotData.length; l += 1) {

			ul = document.createElement('ul');
			out = '';
			for (i in this.slotData[l].values) {
				out += '<li><span>' + this.slotData[l].values[i] + '<span></li>';
			}
			ul.innerHTML = out;

			div = document.createElement('div');		
			div.className = 'slot_' + l;			
			div.appendChild(ul);

			this.swSlots.appendChild(div);

			ul.slotPosition = l;		
			ul.slotYPosition = 0;
			ul.slotWidth = 0;
			ul.slotMaxScroll = -(cellHeight * (ul.childNodes.length-1));
			ul.style.webkitTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';	

			this.slotEl.push(ul);		

			if (this.slotData[l].defaultValue) {
				this.scrollToValue(l, this.slotData[l].defaultValue);
			}
		}

		this.calculateSlotsWidth();

		// Global events
		document.addEventListener(this.eventSelector2.downEvent2, this, false);
		document.addEventListener(this.eventSelector2.moveEvent2, this, false);		
		window.addEventListener('orientationchange', this, true);
		window.addEventListener('scroll', this, true);
		document.querySelector('.doneBtn').addEventListener(this.eventSelector2.upEvent2, this, false);

		// Add scrolling to the slots
		this.swBg.addEventListener(this.eventSelector2.downEvent2, this, false);
	},

		open: function () {
			this.create();
			this.swWrapper.style.top = gameManager.wrapperPos[0].top + 'px';
			this.swWrapper.style.left = gameManager.wrapperPos[0].left + 'px';
		},

		// Unload
		destroy: function () {
			
            this.swWrapper.removeEventListener('webkitTransitionEnd', this, false);

			this.swBg.removeEventListener(this.eventSelector2.downEvent2, this, false);

			document.removeEventListener(this.eventSelector2.downEvent2, this, false);
			document.removeEventListener(this.eventSelector2.moveEvent2, this, false);
			window.removeEventListener('orientationchange', this, true);
			window.removeEventListener('scroll', this, true);

			this.slotData = [];
			this.cancelAction = function () {
				return false;
			};

			this.cancelDone = function () {
				return true;
			};

			this.reset();
            
		},

		close: function () {
			this.swWrapper.style.webkitTransitionTimingFunction = 'ease-in';
			this.swWrapper.style.webkitTransitionDuration = '400ms';
			this.swWrapper.style.webkitTransform = 'translate3d(0, 0, 0)';

			this.swWrapper.addEventListener('webkitTransitionEnd', this, false);


		},

		// Generic methods
		addSlot: function (values, style, defaultValue) {
			if (!style) {
				style = 'readonly';
			}

			var obj = { 'values': values, 'style': style, 'defaultValue': defaultValue };
			this.slotData.push(obj);
		},

		selectOpacity: function (slot, idx) {

			if (slot !== undefined) {

				for (var i = 0; i < this.slotEl[slot].childNodes.length; i++) {
					var slotLi = this.slotEl[slot].childNodes[i];
					selectLiChild(slotLi, 0.2);
				}
				selectLiChild(this.slotEl[slot].childNodes[idx], 1);
			}
			else {

				var slots = QS('.swSlots').childNodes;
				for (var i = 0; i < slots.length; i++) {
					slot = slots[i].childNodes[0].childNodes;
					idx = this.slotData[i].defaultValue;
					selectLiChild(slot[idx], 1);
				}
			}

			function selectLiChild (slotLi, opacity) {
				for (var i = 0; i < slotLi.childNodes.length; i++) {
					slotLi.childNodes[i].style.opacity = opacity;
				}
			}

		},

		getSelectedValues: function () {
			var index, count,
			    i, l,
				keys = [], values = [];

			for (i in this.slotEl) {

				this.slotEl[i].removeEventListener('webkitTransitionEnd', this, false);
				this.slotEl[i].style.webkitTransitionDuration = '0';
				if (this.slotEl[i].slotYPosition > 0) {
					this.setPosition(i, 0);
				} else if (this.slotEl[i].slotYPosition < this.slotEl[i].slotMaxScroll) {
					this.setPosition(i, this.slotEl[i].slotMaxScroll);
				}

				index = -Math.round(this.slotEl[i].slotYPosition / this.cellHeight);

				count = 0;
				for (l in this.slotData[i].values) {
					if (count == index && this.slotData[i].style == 'spin') {
						keys.push(l-1);
						values.push(gameManager.QUIZ_ANSWER[i]);
						break;
					}

					count += 1;
				}
			}
			return { 'keys': keys, 'values': values };
		},


		setPosition: function (slot, pos) {

            
            console.log("slot=" + slot);
            console.log("pos=" + pos);

                this.slotEl[slot].slotYPosition = pos;
//			    //this.slotEl[slot].style.transform = 'translate3d(0, ' + pos + 'px, 0)';
//                this.slotEl[slot].style.transform = 'translateY(' + pos + 'px)';
//                //this.slotEl[slot].style.transform = 'translateY(-200px)';

                this.slotEl[slot].style.position = 'absolute';
                this.slotEl[slot].style.top = pos +'px';

                now = pos;
            

		},

		getSelectEvent : function (e) {
			var eventType;
			if (eventCheck) eventType = e.targetTouches[0];
			else eventType = e;

			return eventType;
		},

		scrollStart: function (e) {
			var event = this.getSelectEvent(e);
			var xPos = event.clientX - (this.swSlots.parentNode.parentNode.offsetLeft * gameManager.zoomRate);
			var slot = 0;
			var temp;
			for (var i = 0; i < this.slotEl.length; i += 1) {
				slot += (this.slotEl[i].slotWidth * gameManager.zoomRate);
				if (xPos < slot) {
					this.activeSlot = i;
					break;
				}else if (xPos < 0 || xPos > slot) {
					 this.activeSlot = null;
				}
			}

			if(this.activeSlot !== null){
				if (this.slotData[this.activeSlot].style.match('readonly')) {
					this.swBg.removeEventListener(this.eventSelector2.moveEvent2, this, false);
					this.swBg.removeEventListener(this.eventSelector2.upEvent2, this, false);
					return false;
				}

				this.slotEl[this.activeSlot].removeEventListener('webkitTransitionEnd', this, false);
				this.slotEl[this.activeSlot].style.webkitTransitionDuration = '0';
                this.slotEl[this.activeSlot].style.position = 'absolute';

				var theTransform = now;

                //theTransform = new WebKitCSSMatrix(theTransform).m42;
				if (theTransform != this.slotEl[this.activeSlot].slotYPosition) {
					this.setPosition(this.activeSlot, theTransform);
				}

				this.startY = event.clientY;
				this.scrollStartY = this.slotEl[this.activeSlot].slotYPosition;
				this.scrollStartTime = e.timeStamp;

				this.swBg.addEventListener(this.eventSelector2.moveEvent2, this, false);
				this.swBg.addEventListener(this.eventSelector2.upEvent2, this, false);


				return true;
			}
		},

	scrollMove: function (e) {
        

		var event = this.getSelectEvent(e);
        var topDelta = event.clientY - this.startY;

		if (this.activeSlot !== null) {
			if (this.slotEl[this.activeSlot].slotYPosition > 0 || this.slotEl[this.activeSlot].slotYPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
				topDelta /= 2;
			}

			//this.setPosition(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition + topDelta);

            this.setPosition(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition + topDelta);

			this.startY = event.clientY;

			if (e.timeStamp - this.scrollStartTime > 80) {
				this.scrollStartY = this.slotEl[this.activeSlot].slotYPosition;
				this.scrollStartTime = e.timeStamp;
			}
			this.swBg.addEventListener(this.eventSelector2.outEvent2, this, false);
		}


	},

		scrollEnd: function (e) {

            console.log("스크롤엔드");
			streamSound.setSound('../../media/spinSound.mp3');
			
			this.swBg.removeEventListener(this.eventSelector2.moveEvent2, this, false);
			this.swBg.removeEventListener(this.eventSelector2.upEvent2, this, false);

			this.swBg.removeEventListener(this.eventSelector2.outEvent2, this, false);

			if (this.slotEl[this.activeSlot].slotYPosition > 0 || this.slotEl[this.activeSlot].slotYPosition < this.slotEl[this.activeSlot].slotMaxScroll) {

				this.scrollTo(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition > 0 ? 0 : this.slotEl[this.activeSlot].slotMaxScroll);
				return false;
			}

			var scrollDistance = this.slotEl[this.activeSlot].slotYPosition - this.scrollStartY;

			if (scrollDistance < this.cellHeight / 1.5 && scrollDistance > -this.cellHeight / 1.5) {
				if (this.slotEl[this.activeSlot].slotYPosition % this.cellHeight) {

					this.scrollTo(this.activeSlot, Math.round(this.slotEl[this.activeSlot].slotYPosition / this.cellHeight) * this.cellHeight, '100ms');
				}

				return false;
			}

			var scrollDuration = e.timeStamp - this.scrollStartTime;

			var newDuration = (2 * scrollDistance / scrollDuration) / this.friction;
			var newScrollDistance = (this.friction / 2) * (newDuration * newDuration);

			if (newDuration < 0) {
				newDuration = -newDuration;
				newScrollDistance = -newScrollDistance;
			}

			var newPosition = this.slotEl[this.activeSlot].slotYPosition + newScrollDistance;

			if (newPosition > 0) {
				newPosition /= 2;
				newDuration /= 3;

				if (newPosition > this.swSlotWrapper.clientHeight / 4) {
					newPosition = this.swSlotWrapper.clientHeight / 4;
				}
			} else if (newPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
				newPosition = (newPosition - this.slotEl[this.activeSlot].slotMaxScroll) / 2 + this.slotEl[this.activeSlot].slotMaxScroll;
				newDuration /= 3;

				if (newPosition < this.slotEl[this.activeSlot].slotMaxScroll - this.swSlotWrapper.clientHeight / 4) {
					newPosition = this.slotEl[this.activeSlot].slotMaxScroll - this.swSlotWrapper.clientHeight / 4;
				}
			} else {
				newPosition = Math.round(newPosition / this.cellHeight) * this.cellHeight;
			}

			if (this.slotEl[this.activeSlot].slotMaxScroll > newPosition) {
				newPosition = this.slotEl[this.activeSlot].slotMaxScroll;
			} else if (newPosition > 0) {
				newPosition = 0;
			}
			this.scrollTo(this.activeSlot, Math.round(newPosition), Math.round(newDuration) + 'ms');

			return true;
		},

		scrollTo: function (slotNum, dest, runtime) {

			this.slotEl[slotNum].style.webkitTransitionDuration = runtime ? runtime : '100ms';
			this.setPosition(slotNum, dest ? dest : 0);
			var idx = (Math.round(dest / this.cellHeight) == 0) ? 0 : Math.round(dest / this.cellHeight) * (-1);
			if(idx > this.slotEl[slotNum].childNodes.length-1){
				idx = this.slotEl[slotNum].childNodes.length-1
			}

			this.selectOpacity (slotNum, idx);
			if (this.slotEl[slotNum].slotYPosition > 0 || this.slotEl[slotNum].slotYPosition < this.slotEl[slotNum].slotMaxScroll) {
				this.slotEl[slotNum].addEventListener('webkitTransitionEnd', this, false);
			}
		},

		scrollToValue: function (slot, value) {
			var yPos, count, i;

			this.slotEl[slot].removeEventListener('webkitTransitionEnd', this, false);
			this.slotEl[slot].style.webkitTransitionDuration = '0';


			count = 0;
			for (i in this.slotData[slot].values) {
				if (i == value) {
					yPos = count * this.cellHeight;
					this.setPosition(slot, yPos);
					break;
				}

				count -= 1;
			}
		},

		backWithinBoundaries: function (e) {
			e.target.removeEventListener('webkitTransitionEnd', this, false);
			this.scrollTo(e.target.slotPosition, e.target.slotYPosition > 0 ? 0 : e.target.slotMaxScroll, '150ms');
			return false;
		},


		tapUp: function (e) {

			this.swBg.removeEventListener(this.eventSelector2.moveEvent2, this, false);
			this.swBg.removeEventListener(this.eventSelector2.upEvent2, this, false);
			this.swBg.removeEventListener(this.eventSelector2.outEvent2, this, false);

			QS('.doneBtn').style.visibility = "hidden"
			QS('.doneBtn_on').style.visibility = "visible"

			this.doneAction();


		},

		setCancelAction: function (action) {
			this.cancelAction = action;
		},

		setDoneAction: function (action) {
			this.doneAction = action;
		},

		cancelAction: function () {
			return false;
		},

		cancelDone: function () {
			return true;
		}

	};

	return spinPicker;

})(cellHeight);

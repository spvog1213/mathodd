
function initSound () {
	var audioElement = document.createElement('audio');
							
	audioElement.setAttribute('id', 'audioStream');
	audioElement.setAttribute('style', 'display:none;');

	document.body.appendChild(audioElement);

	streamSound = new StreamSound('audioStream');
}

function StreamSound (elementId) {

	var streamSound = this;

	streamSound.element = document.getElementById(elementId);
	streamSound.isPlaying = false;
	streamSound.soundArray = [];

	streamSound.soundEnd = function () {
		
		streamSound.isPlaying = false;
		streamSound.element.removeEventListener('ended', streamSound.soundEnd);
		
		if (streamSound.soundArray.length > 1) {
			streamSound.autoPlay();
		}
	}

	streamSound.loadedAndPlay = function () {

		streamSound.element.removeEventListener('loadeddata', streamSound.loadedAndPlay);
		streamSound.element.removeEventListener('ended', streamSound.soundEnd);
		streamSound.element.addEventListener('ended', streamSound.soundEnd);
		streamSound.element.play();

	}

	streamSound.setSound = function (src, seqId) {

		streamSound.element.src = src;
		streamSound.element.addEventListener('loadeddata', streamSound.loadedAndPlay);
		streamSound.element.load();

	}

}



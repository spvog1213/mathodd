
var countTimer, tryCount = 0;
function LogCounter () {

	var logCounter = this;

	logCounter.resultReport = {};

	logCounter.startTime = function () {
		console.log('startTime!');
		var currentDateTime = dateFormat();

		logCounter.resultReport.startTime = currentDateTime;

		console.log(logCounter.resultReport);
	}

	logCounter.endTime = function () {
		console.log('endTime!');
		var currentDateTime = dateFormat();

		logCounter.resultReport.endTime = currentDateTime;
		clearInterval(countTimer);
		console.log(logCounter.resultReport);
	}

	logCounter.onTimer = function () {
		console.log('onTimer!');
		var time = 0;

		logCounter.resultReport.onTimer = time;

		countTimer = setInterval(function () {
			time = time + 0.1;
			logCounter.resultReport.onTimer = time.toFixed(1);
			// log(logCounter.resultReport.onTimer);

		}, 100);
	}

	logCounter.tryCounter = function () {
		log('tryCounter!');
		tryCount++;
		logCounter.resultReport.tryCount = tryCount;


		log('=================================');
		log(logCounter.resultReport.tryCount);
		log('=================================');
	}

	logCounter.submitReport = function () {
		log('submitReport');

		return JSON.stringify(logCounter.resultReport);
	}

}

function dateFormat () {
	var dateTime = new Date(),
	yyyy = dateTime.getFullYear().toString(),
	mm = (dateTime.getMonth() + 1).toString(),
	dd = dateTime.getDate().toString(),
	hh24 = dateTime.getHours().toString(),
	mi = dateTime.getMinutes().toString(),
	ss = dateTime.getSeconds().toString(),
	convertedDateTime = yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0]) + ' ' + (hh24[1] ? hh24 : '0' + hh24[0]) + ':' + (mi[1] ? mi : '0' + mi[0]) + ':' + (ss[1] ? ss : '0' + ss[0]);

	return convertedDateTime;
}

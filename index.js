var Chrome = require('chrome-remote-interface');

var options = {
	chooseTab: function(tabs) {
		var indexToReturn = 0;
		if (!tabs) {
			return indexToReturn;
		}
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].url.indexOf('github.com') !== -1) {
				indexToReturn = i;
				break;
			}
		}
		return indexToReturn;
	}
};

Chrome(options, function(chrome) {
	with (chrome) {
		Network.requestWillBeSent(function (params) {
			console.log(require('util').inspect(params, { depth: null }));
		});
		Network.requestServedFromCache(function(requestId) {
			console.log('Served from cache: ' + requestId);
		});
		Network.responseReceived(function(params) {
			console.log(require('util').inspect(params, { depth: null }));
		})
		Network.setMonitoringXHREnabled(true);

		//Page.loadEventFired(close);
		Network.enable();
		Page.enable();

	}
}).on('error', function() {
	console.error('Cannot connect to Chrome');
});

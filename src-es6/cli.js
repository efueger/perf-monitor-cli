import Chrome from 'chrome-remote-interface';
import util from 'util';
import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'perf-monitor'
});

const options = {
  chooseTab(tabs) {
    let indexToReturn = 0;
    if (!tabs) {
      return indexToReturn;
    }
    const matchingTabs = tabs.map((tab, index) => {
      if (tab.url.indexOf('github.com') !== -1) {
        return index;
      }
    }).filter(index => true);

    indexToReturn = matchingTabs[0];
    const matchingTab = tabs[indexToReturn];

    if (matchingTabs.length > 1) {
      logger.log(`More than one tab found, using the tab with url: ${matchingTab.url}`);
    }
     return indexToReturn;
  }
};

  Chrome(options, function(chrome) {
    chrome.Network.requestWillBeSent(function (params) {
      logger.log(util.inspect(params, { depth: null }));
    });
    chrome.Network.requestServedFromCache(function(requestId) {
      logger.log(`Served from cache: ${requestId}`);
    });
    chrome.Network.responseReceived(function(params) {
      logger.log(util.inspect(params, { depth: null }));
    })
    chrome.Network.setMonitoringXHREnabled(true);

    //chrome.Page.loadEventFired(chrome.close);
    chrome.Network.enable();
    chrome.Page.enable();

  }).on('error', function() {
    logger.error('Cannot connect to Chrome');
  });

import Chrome from 'chrome-remote-interface';
import util from 'util';

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
      console.log(`More than one tab found, using the tab with url: ${matchingTab.url}`);
    }
    return indexToReturn;
    }
};

Chrome(options, function(chrome) {
  chrome.Network.requestWillBeSent(function (params) {
    console.log(util.inspect(params, { depth: null }));
  });
  chrome.Network.requestServedFromCache(function(requestId) {
    console.log(`Served from cache: ${requestId}`);
  });
  chrome.Network.responseReceived(function(params) {
    console.log(util.inspect(params, { depth: null }));
  })
  chrome.Network.setMonitoringXHREnabled(true);

  //chrome.Page.loadEventFired(chrome.close);
  chrome.Network.enable();
  chrome.Page.enable();

}).on('error', function() {
  console.error('Cannot connect to Chrome');
});

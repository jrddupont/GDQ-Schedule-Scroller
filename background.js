

// Called when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {

  // If we are not currently on the GDQ page, navigate there and run script
  if (! ~tab.url.indexOf('://gamesdonequick.com/schedule')) {

    // Navigate to GDQ page, add callback function
    chrome.tabs.update(null, {url: "https://gamesdonequick.com/schedule"}, function(updateTab){

      // add listener so callback executes only if page loaded. otherwise calls instantly
      var listener = function(tabId, changeInfo, listenerTab) {

        // When the page is loaded, run the script
        if (tabId == updateTab.id && changeInfo.status === 'complete') {

          // Remove listener and perform scroll
          chrome.tabs.onUpdated.removeListener(listener)
          performScroll()
        }
      }
      chrome.tabs.onUpdated.addListener(listener)
    });
  } else {
    // If we are on the GDQ page, just perform the scroll
    performScroll()
  }
});

// Enable the badge on all pages
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { 
  chrome.pageAction.show(tabId)
});


function performScroll() {
  chrome.tabs.executeScript(null, {file: "scroll.js"}, function() {
    chrome.tabs.executeScript(null, {code: "scroll();"})
  });
}

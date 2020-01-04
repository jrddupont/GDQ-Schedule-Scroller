

// Called when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  chrome.tabs.executeScript(null, {file: "scroll.js"}, function() {
    chrome.tabs.executeScript(null, {code: "scroll();"});
  });
});

// Check if we're on the correct page and un-dither the button
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { 
  if (~tab.url.indexOf('://gamesdonequick.com/schedule')) {
    chrome.pageAction.show(tabId);
  }
});
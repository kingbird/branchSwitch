chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var url = window.location.href;
    chrome.cookies.get({url: url, name: 'p_skey'}, function(cookie) {
        var cookie = cookie || 'hii';
        chrome.tabs.sendMessage(tabs[0].id, {greeting: cookie}, function(response) {
            // console.log(response.farewell);
        });
    });

});
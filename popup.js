chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.cookies.get({url: tabs[0].url, name: 'ptui_loginuin'}, function(cookie) {
        var cookie = cookie.value || 'hi';
        chrome.tabs.sendMessage(tabs[0].id, {greeting: cookie}, function(response) {
            console.log(response);
        });
    });

});
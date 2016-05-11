chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // chrome.cookies.get({url: tabs[0].url, name: 'ptui_loginuin'}, function(cookie) {
    //     var cookie = cookie.value || 'hi';
    //     chrome.tabs.sendMessage(tabs[0].id, {greeting: cookie}, function(response) {
    //         console.log(response);
    //     });
    // });
    chrome.cookies.set({url: tabs[0].url, name: 'version', value: 'trunk'}, function(ret) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: ret}, function(response) {
            console.log(response);
        });
    });
});
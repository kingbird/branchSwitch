chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.cookies.get({url: tabs[0].url, name: 'version'}, function(cookie) {
        if(cookie) {
            $('.mod-switch').find('li').each(function() {
                var text = $(this).text();
                if(text == cookie.value) {
                    $(this).addClass('current');
                }
            });
        } else {
            $('.mod-switch').find('li').eq(0).addClass('current');
        }
        // chrome.tabs.sendMessage(tabs[0].id, {greeting: cookie.value}, function(response) {
        //     console.log(response);
        // });
    });
    $('.mod-switch').find('li').on('click', function() {
        if(!$(this).hasClass('current')) {
            var branchName = $(this).text(),
                self = $(this),
                expireTime = (+new Date() + (60 * 60 * 24 * 7 * 1000)) / 1000;
            if(branchName != 'trunk') {
                chrome.cookies.set({url: tabs[0].url, name: 'version', path: '/', value: branchName, expirationDate: expireTime}, function(ret) {
                    // chrome.tabs.sendMessage(tabs[0].id, {greeting: ret}, function(response) {
                    //     console.log(response);
                    // });
                    if(ret) {
                        $('.mod-switch').find('li').removeClass('current');
                        self.addClass('current');
                        if(branchName != 'release') {
                            chrome.browserAction.setBadgeText({text: branchName.toUpperCase().substr(-1, 1)});
                        } else {
                            chrome.browserAction.setBadgeText({text: 'R'});
                        }
                    } else {
                        console.log('error');
                    }
                });
            } else {
                chrome.cookies.remove({url: tabs[0].url, name: 'version'}, function(ret) {
                    // chrome.tabs.sendMessage(tabs[0].id, {greeting: ret}, function(response) {
                    //     console.log(response);
                    // });
                    if(ret) {
                        $('.mod-switch').find('li').removeClass('current');
                        self.addClass('current');
                        chrome.browserAction.setBadgeText({text: 'T'});
                    } else {
                        console.log('error');
                    }
                });
            }
        }
    });
});
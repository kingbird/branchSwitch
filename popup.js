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
    });
    $('.mod-switch').find('li').on('click', function() {
        if(!$(this).hasClass('current')) {
            var branchName = $(this).text(),
                self = $(this),
                expireTime = (+new Date() + (60 * 60 * 24 * 7 * 1000)) / 1000;
            if(branchName != 'trunk') {
                chrome.cookies.set({url: tabs[0].url, name: 'version', path: '/', value: branchName, expirationDate: expireTime}, function(ret) {
                    if(ret) {
                        $('.error').text('');
                        $('.mod-switch').find('li').removeClass('current');
                        self.addClass('current');
                        if(branchName != 'release') {
                            chrome.browserAction.setBadgeText({text: branchName.toUpperCase().substr(-1, 1)});
                        } else {
                            chrome.browserAction.setBadgeText({text: 'R'});
                        }
                    } else {
                        $('.error').text('切换失败');
                    }
                });
            } else {
                chrome.cookies.remove({url: tabs[0].url, name: 'version'}, function(ret) {
                    if(ret) {
                        $('.error').text('');
                        $('.mod-switch').find('li').removeClass('current');
                        self.addClass('current');
                        chrome.browserAction.setBadgeText({text: 'T'});
                    } else {
                        $('.error').text('切换失败');
                    }
                });
            }
        }
    });
});
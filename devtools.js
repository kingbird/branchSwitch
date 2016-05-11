// var url = window.location.href;
// chrome.cookies.get({url: url, name: 'p_skey'}, function(cookie) {
//     console.log(cookie);
// });
chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    port.postMessage({counter: msg.counter+1});
  });
});

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    sendResponse({counter: request.counter+1});
  });
var doc = document;
function getCookie(name) {
    var carr = doc.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (carr != null){
        return unescape(carr[2]);
    }

    return null;
}
$('body').append('<div style="position:fixed;z-index:5000000;bottom:0;left:0;padding:10px;line-height:1;border-radius:10px;text-align:center;font-size:20px;background:rgba(255,255,255,.6);color:black;">'+getCookie('version')+'</div>');
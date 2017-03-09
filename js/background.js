var speedArray = ['0.5', '1', '1.25', '1.5', '2'];
var initSpeed = '1';

function setSpeed(speed) {
    if (!speed) return;
    console.log(speed);

    initSpeed = speed;

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {
            speed: speed
        }, function(response) {});
    });
}

// 处理按键请求
chrome.commands.onCommand.addListener(function(command) {
    var nextIndex = '';
    switch (command) {
        case 'speed_up':
            nextIndex = speedArray.indexOf(initSpeed) + 1;
            nextIndex < speedArray.length && setSpeed(speedArray[nextIndex]);
            break;
        case 'speed_down': 
            nextIndex = speedArray.indexOf(initSpeed) - 1;
            nextIndex >= 0 && setSpeed(speedArray[nextIndex]);
            break; 
        default: return;
    }
});

// 处理content script请求
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (!request.greeting) return;

    request.greeting === "initSpeed" && sendResponse({initSpeed: initSpeed});
});
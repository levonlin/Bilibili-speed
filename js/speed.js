function changeSpeed(speed) {
    console.log(speed);
    var selectItem = document.querySelector('.bilibili-player-setting-videospeed [data-value="' + speed + '"]');
    selectItem ? selectItem.click() : console.log('No player.');
}

window.onload = function() {
    // 获取初始状态
    chrome.extension.sendRequest({greeting: "initSpeed"}, function(response) {
        if (!response.initSpeed) return; 
        changeSpeed(response.initSpeed);
    });

    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        if (!request.speed) return;
        changeSpeed(request.speed);
    });
}
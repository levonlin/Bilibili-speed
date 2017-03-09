var bg = chrome.extension.getBackgroundPage();
var speedList = document.querySelector('.speed-list');

function render(speed) {
    if (!speed) return;

    speedList.innerHTML = '';
    bg.speedArray.forEach(function(item) {
        if (item === speed) {
            speedList.innerHTML += '<li data-value="' + item + '" class="active">' + item + '</li>';
        } else {
            speedList.innerHTML += '<li data-value="' + item + '">' + item + '</li>';
        }
    });
}

// 渲染初始状态
render(bg.initSpeed);

speedList.addEventListener('click', function(e) {
    var target = e.target;
    var speed = target.getAttribute("data-value");
    
    bg.setSpeed(speed, bg.speedArray);
    render(speed);
});
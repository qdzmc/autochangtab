document.getElementById('startButton').addEventListener('click', () => {
    let interval = document.getElementById('intervalInput').value;
    interval = interval ? parseInt(interval) * 1000 : 5000; // 默认为 5 秒
    chrome.runtime.sendMessage({command: "start", interval: interval});
    document.documentElement.requestFullscreen().catch(err => {
        console.log(err.message);
    });
});

document.getElementById('stopButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({command: "stop"});
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => {
            console.log(err.message);
        });
    }
});

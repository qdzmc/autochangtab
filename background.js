let tabRotationInterval;
let currentIndex = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "start") {
        chrome.tabs.query({currentWindow: true}, function(tabs) {
            if (tabRotationInterval) clearInterval(tabRotationInterval);
            tabRotationInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % tabs.length;
                for (let i = 0; i < tabs.length; i++) {
                    if (i === currentIndex) {
                        // 解除当前标签的静音并激活该标签
                        chrome.tabs.update(tabs[i].id, {muted: false, active: true});
                    } else {
                        // 静音非活动的标签
                        chrome.tabs.update(tabs[i].id, {muted: true});
                    }
                }
            }, request.interval);
        });
    } else if (request.command === "stop") {
        clearInterval(tabRotationInterval);
        tabRotationInterval = null;
        // 停止后解除所有标签的静音
        chrome.tabs.query({currentWindow: true}, function(tabs) {
            for (let tab of tabs) {
                chrome.tabs.update(tab.id, {muted: false});
            }
        });
    }
});

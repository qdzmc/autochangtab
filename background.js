let intervalId;

function switchTabs() {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    const activeTab = tabs.find(tab => tab.active);
    const nextTab = tabs[(activeTab.index + 1) % tabs.length];

    chrome.tabs.update(nextTab.id, { active: true }, function () {
      // 切换标签后，将当前窗口全屏
      chrome.windows.getCurrent(function (currentWindow) {
        chrome.windows.update(currentWindow.id, { state: 'fullscreen' });
      });
    });
  });
}


function startSwitchingTabs(interval) {
  stopSwitchingTabs(); // 确保只有一个定时器在运行
  intervalId = setInterval(switchTabs, interval);
}

function stopSwitchingTabs() {
  clearInterval(intervalId);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === 'startSwitchingTabs') {
    startSwitchingTabs(message.interval || 10000); // 默认切换间隔为10秒
  } else if (message.command === 'stopSwitchingTabs') {
    stopSwitchingTabs();
  }
});

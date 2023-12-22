document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');
  const intervalInput = document.getElementById('intervalInput');

  startButton.addEventListener('click', function () {
    const interval = parseInt(intervalInput.value, 10) * 1000; // 转换为毫秒
    chrome.runtime.sendMessage({ command: 'startSwitchingTabs', interval });
  });

  stopButton.addEventListener('click', function () {
    chrome.runtime.sendMessage({ command: 'stopSwitchingTabs' });
  });
});

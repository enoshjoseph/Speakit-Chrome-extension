chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "speak",
        title: "Speak",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "speak" && info.selectionText) {
        chrome.tts.stop();
        chrome.tts.speak(info.selectionText, {
            rate: 0.7,
            pitch: 1.0,
            volume: 1.0
        });
    }
});

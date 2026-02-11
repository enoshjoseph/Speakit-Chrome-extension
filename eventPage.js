chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "speak",
        title: "Speak",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "speak" && info.selectionText) {

        chrome.storage.local.get("voiceName", (data) => {

            chrome.tts.stop();

            chrome.tts.speak(info.selectionText, {
                voiceName: data.voiceName || undefined,
                rate: 1.0
            });

        });
    }
});

// 🔥 Listen for Stop message
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "stopSpeech") {
        chrome.tts.stop();
    }
});

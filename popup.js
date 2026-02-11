const voiceSelect = document.getElementById("voices");
const stopBtn = document.getElementById("stopBtn");

// Load voices
chrome.tts.getVoices((voices) => {
    voices.forEach((voice) => {
        let option = document.createElement("option");
        option.value = voice.voiceName;
        option.textContent = `${voice.lang} - ${voice.voiceName}`;
        voiceSelect.appendChild(option);
    });

    chrome.storage.local.get("voiceName", (data) => {
        if (data.voiceName) {
            voiceSelect.value = data.voiceName;
        }
    });
});

// Save selected voice
voiceSelect.addEventListener("change", () => {
    chrome.storage.local.set({ voiceName: voiceSelect.value });
});

// 🔥 Stop Button
stopBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "stopSpeech" });
});

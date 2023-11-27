chrome.runtime.onInstalled.addListener(async () => {
  setNewImage();

  await chrome.alarms.create("fetchImage", { periodInMinutes: 60 });

  chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(new Date());
    if (alarm.name === "fetchImage") {
      setNewImage();
    }
  });
});

async function setNewImage() {
  console.log("whoop");
  const response = await fetch(
    "https://api.unsplash.com/photos/random?query=nature&orientation=landscape",
    {
      headers: {
        "Accept-Version": "v1",
        Authorization: `Client-ID ngoIXRslSroE6YZZNdOCRTVgJqBi_Ch_VdpkAoBkqZ8`,
      },
    }
  );
  const json = await response.json();

  chrome.storage.local.set({ imageUrl: json.urls.full });
}

const channelId = "UCJ6Hx95RAjXplGcqnlLufzw";
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)}`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.status === "ok" && data.items && data.items.length > 0) {
      const latestVideoUrl = data.items[0].link;
      const linkElement = document.getElementById("videoLink");
      linkElement.href = latestVideoUrl;
      linkElement.textContent = "🎬 Zum neuesten YouTube-Video!";
    } else {
      throw new Error("No videos available.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("videoLink").textContent = "Fehler beim Laden 😢";
  });

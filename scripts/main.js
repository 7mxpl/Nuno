const channelId = "UCJ6Hx95RAjXplGcqnlLufzw";
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml&channel_id=${channelId}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (data.items && data.items.length > 0) {
      const latestVideoUrl = data.items[0].link;
      const linkElement = document.getElementById("videoLink");
      linkElement.href = latestVideoUrl;
      linkElement.textContent = "🎬 Zum neuesten YouTube-Video!";
    } else {
      document.getElementById("videoLink").textContent = "Keine Videos verfügbar.";
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("videoLink").textContent = "Fehler beim Laden 😢";
  });

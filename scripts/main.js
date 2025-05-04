const channelId = "UCJ6Hx95RAjXplGcqnlLufzw";
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)}`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    if (data.status === "ok" && data.items && data.items.length > 0) {
      const video = data.items[0];
      const videoUrl = video.link;

      document.getElementById("videoTitle").textContent = video.title;
      document.getElementById("thumbnail").src = video.thumbnail;
      const link = document.getElementById("videoLink");
      link.href = videoUrl;

      document.getElementById("videoInfo").classList.remove("hidden");

      // Redirect countdown
      let countdown = 5;
      const countdownElement = document.getElementById("countdown");
      const interval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown === 0) {
          clearInterval(interval);
          window.location.href = videoUrl;
        }
      }, 1000);

    } else {
      throw new Error("No videos available.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("error").classList.remove("hidden");
  });

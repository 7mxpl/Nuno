const channelId = "UCJ6Hx95RAjXplGcqnlLufzw";

// Using a free CORS proxy to bypass CORS restrictions
const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Fetched data:", data); // Debug: Check the fetched data
    if (data.items && data.items.length > 0) {
      const latestVideoUrl = data.items[0].link;
      const linkElement = document.getElementById("videoLink");
      const spinner = document.getElementById("spinner");

      // Hide spinner and show the link
      spinner.style.display = "none";
      linkElement.href = latestVideoUrl;
      linkElement.textContent = "🎬 Zum neuesten YouTube-Video!";
      linkElement.style.visibility = "visible"; // Ensure the link is visible
    } else {
      throw new Error("No videos found.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    const linkElement = document.getElementById("videoLink");
    const spinner = document.getElementById("spinner");

    // Hide spinner and show error message
    spinner.style.display = "none";
    linkElement.textContent = "Fehler beim Laden 😢";
    linkElement.style.visibility = "visible"; // Ensure error message is visible
  });

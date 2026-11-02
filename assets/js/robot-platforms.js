document.querySelectorAll(".robot-full-runs").forEach((details) => {
  details.addEventListener("toggle", () => {
    if (!details.open) {
      details.querySelectorAll("video").forEach((video) => video.pause());
    }
  });
});

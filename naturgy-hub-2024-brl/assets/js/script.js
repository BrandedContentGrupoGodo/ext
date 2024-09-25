document.addEventListener("DOMContentLoaded", function() {
    const videos = document.querySelectorAll(".custom-video");
  
    videos.forEach((video, index) => {
      setTimeout(() => {
        video.classList.add("fade-in");
      }, index * 400); // Staggered animation, 400ms delay between each video
    });
  });
  
if (localStorage.getItem("hasPlayed") === "true") {
  document.querySelector(".spotify-link").classList.remove("hidden");
}

let playing = false;

window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById("embed-iframe");
  const options = {
    uri: "spotify:playlist:7uJNZzR5dVnt97yQkHbDjY",
  };
  const callback = (EmbedController) => {
    document.querySelector(".cd").addEventListener("click", (event) => {
      togglePlaying(EmbedController);
    });
    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        togglePlaying(EmbedController);
      }
    });
  };
  IFrameAPI.createController(element, options, callback);
};

function togglePlaying(EmbedController) {
  playing = !playing;
  document.querySelector(".hint").classList.add("hidden");
  document.querySelector(".spotify-link").classList.remove("hidden");
  localStorage.setItem("hasPlayed", "true");
  if (playing) {
    document.querySelector(".cd").classList.remove("paused");
  } else {
    document.querySelector(".cd").classList.add("paused");
  }
  EmbedController.togglePlay();
}

setTimeout(() => {
  if (!(localStorage.getItem("hasPlayed") === "true")) {
    document.querySelector(".hint").classList.remove("hidden");
  }
}, 10000);

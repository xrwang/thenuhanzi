$(document).ready(function() {
  var audio = document.getElementById('audio');
  var audioBtn = document.getElementById('audio-btn');
  var audioBtnImg = audioBtn.children[0];
  var updateBtnText = function () {
    if (audio.paused) {
      audioBtnImg.src = "/assets/images/mute.png";
      audioBtnImg.alt = "Unmute";
    } else {
      audioBtnImg.src = "/assets/images/audio.png";
      audioBtnImg.alt = "Mute";
    }
  };

  audioBtn.onclick = function () {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  audio.onplay = updateBtnText;
  audio.onpause = updateBtnText;

  // init button state
  updateBtnText();
});

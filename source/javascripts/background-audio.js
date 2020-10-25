$(document).ready(function() {
  var audio = document.getElementById('audio');
  var audioBtn = document.getElementById('audio-btn');
  var updateBtnText = function () {
    if (audio.paused) {
      audioBtn.innerHTML = '<img src="/assets/images/mute.png" alt="Unmute" />';
    } else {
      audioBtn.innerHTML = '<img src="/assets/images/audio.png" alt="Mute" />';
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

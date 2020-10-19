let playing = false;
let audioInit = false;

$(document).ready(function() {
  $('body').append('<audio loop id="music" src="/assets/FOM-YBCA.mp3" type="audio/mpeg"></audio>');
  $('body').click(play);

  $('#vol').click(toggle);
});

function play() {
  if (!audioInit) {
    $('#music').trigger('play');
    $('#music').prop('volume', 0.1);
    $('#vol').attr('src', '/assets/images/icons/vol-on.png');
    audioInit = true;
    playing = true;
  }
}

function toggle() {
  console.log('tog', playing)
  if (playing) {
    console.log('stop')
    $('#vol').attr('src', '/assets/images/icons/vol-off.png');
    $('#music').trigger('pause');
    playing = false;
  } else {
    $('#vol').attr('src', '/assets/images/icons/vol-on.png');
    $('#music').trigger('play');
    playing = true;
  }
}
const soundCache = {};

function preloadSounds(soundList) {
  soundList.forEach(name => {
    const audio = new Audio(`assets/sounds/${name}.mp3`);
    audio.preload = 'auto';
    soundCache[name] = audio;
    console.log(name);
  });
}

preloadSounds(['half-squeak','yey','hallway','reboot','error']);

function playSound(name) {
  const sound = soundCache[name];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}


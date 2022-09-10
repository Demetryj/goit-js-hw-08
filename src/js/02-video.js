import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlayerTimeupdate, 1000));

function onPlayerTimeupdate({ duration, percent, seconds }) {
  // console.log('played the video!');
  const valueOfPlayer = {
    duration,
    percent,
    seconds,
  };

  const localStorageValue = JSON.stringify(valueOfPlayer);

  localStorage.setItem(STORAGE_KEY, localStorageValue);
}
saveTimeForPlayer();

function saveTimeForPlayer() {
  if (localStorage.getItem(STORAGE_KEY)) {
    const curretnValueSecondsInlocalStorage = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ).seconds;
    player.setCurrentTime(curretnValueSecondsInlocalStorage);
  }
  localStorage.removeItem('videoplayer-current-time');
}

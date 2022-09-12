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
}

// import throttle from 'lodash.throttle'; // згідно 7 пункту, підключаю бібліотеку "lodash.trottle"
// import Player from '@vimeo/player';
// const iframe = document.querySelector('iframe');
// const player = new Player(iframe);
// // пункт 5 завдання. Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
// const LOCALSTORAGE_KEY = 'videoplayer-current-time';
// player.on(
//   'timeupdate',
//   throttle(function () {
//     // код взято з інструкції "getCurrentTime(): Promise<number, Error>"
//     player
//       .getCurrentTime()
//       .then(function (seconds) {
//         // код взято з конспекту (Модуль 8, заняття 16, "Зберігаємо повідомлення")
//         localStorage.setItem(LOCALSTORAGE_KEY, seconds);
//       })
//       .catch(function (error) {
//         // конспект. Модуль 8, заняття 16 "Сервіс для localStorage"
//         console.error('Get state error: ', error.message);
//       });
//   }, 1000)
// ); // тут встановлюю, що згідно 7 пункту, час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.
// // код взято з інструкції setCurrentTime(seconds: number): Promise<number, (RangeError|Error)>
// player.on('loaded', function () {
//   const savedTime = localStorage.getItem(LOCALSTORAGE_KEY);
//   player
//     .setCurrentTime(savedTime)
//     .then(function (seconds) {
//       console.log(seconds);
//     })
//     .catch(function (error) {
//       switch (error.name) {
//         case 'RangeError':
//           // the time was less than 0 or greater than the video’s duration
//           break;
//         default:
//           // some other error occurred
//           break;
//       }
//     });
// });
